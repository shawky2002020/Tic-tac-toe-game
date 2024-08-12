import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  board!: string[][];
  currentPlayer!: string;
  gameOver!: boolean;
  aiDifficultyPlayerX: number = 1;
  aiDifficultyPlayerO: number= 1;
  gameMode: string= 'human-vs-human';
  displayxo:boolean=true;
  Xscore:number=0;
  Oscore:number=0;

 

  constructor() { }

  resetGame(): void {
    this.board = Array(7).fill(null).map(() => Array(7).fill(''));
    this.currentPlayer = 'X';
    this.gameOver = false;
    // this.aiDifficultyPlayerO = 3; // Default AI difficulty for player O
    // this.aiDifficultyPlayerX = 1; // Default AI difficulty for player X
    // this.gameMode = 'human-vs-human'; // Default game mode
  }

  makeMove(row: number, col: number): void {
    if (!this.board[row][col] && !this.gameOver) {
      console.log(`Player ${this.currentPlayer} making move at (${row}, ${col})`);
      this.board[row][col] = this.currentPlayer;

      if (this.isWinningMove(this.board, this.currentPlayer)) {
        
        this.gameOver = true;
        console.log(`Player ${this.currentPlayer} wins!`);
        //update score
        if(this.currentPlayer==='X'){
          this.Xscore++;
        }
        else if(this.currentPlayer==='O'){
          this.Oscore++;
        }
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        console.log(`Now it's ${this.currentPlayer}'s turn`);
        console.log(this.gameMode);


        if (this.currentPlayer === 'O' && this.gameMode === 'human-vs-ai') {
          setTimeout(() => this.aiMove(), 500);
        } else if (this.gameMode === 'ai-vs-ai') {
          setTimeout(() => this.aiMove(), 500);
        }
      }
    } else {
      console.log(`Invalid move attempted at (${row}, ${col})`);
    }
  }

  aiMove(): void {
    if (this.gameOver || (this.currentPlayer !== 'O' && this.gameMode!=='ai-vs-ai') ) {
      console.log('returned');
       //if gameover or current player is X
      return;
    }
    

    let bestMove: [number, number] | null = null;

    // Check for immediate winning move or blocking move
    bestMove = this.getImmediateMove('O') || this.getImmediateMove('X');

    if (!bestMove) {
      // Use iterative deepening search if no immediate move found
      if(this.currentPlayer==='O')
        bestMove = this.iterativeDeepeningSearch(this.aiDifficultyPlayerO);
      if(this.currentPlayer==='X')
        bestMove = this.iterativeDeepeningSearch(this.aiDifficultyPlayerX);

    
    }

    if (bestMove) {
      this.makeMove(bestMove[0], bestMove[1]);
    }
  }

  getImmediateMove(player: string): [number, number] | null {
    for (const move of this.getAvailableMoves()) {
      const [row, col] = move;
      this.board[row][col] = player;
      const isWinning = this.isWinningMove(this.board, player);
      this.board[row][col] = '';

      if (isWinning) {
        return move;
      }
    }
    return null;
  }

  isWinningMove(board: string[][], player: string): boolean {
    const size = 7;
    const winCondition = 4;

    // Check rows, columns, and diagonals
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - winCondition; col++) {
        if (this.checkLine(board, player, row, col, 0, 1)) return true;
      }
    }

    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - winCondition; row++) {
        if (this.checkLine(board, player, row, col, 1, 0)) return true;
      }
    }

    for (let row = 0; row <= size - winCondition; row++) {
      for (let col = 0; col <= size - winCondition; col++) {
        if (this.checkLine(board, player, row, col, 1, 1)) return true;
      }
    }

    for (let row = winCondition - 1; row < size; row++) {
      for (let col = 0; col <= size - winCondition; col++) {
        if (this.checkLine(board, player, row, col, -1, 1)) return true;
      }
    }

    return false;
  }

  checkLine(board: string[][], player: string, row: number, col: number, dRow: number, dCol: number): boolean {
    for (let i = 0; i < 4; i++) {
      if (board[row + i * dRow][col + i * dCol] !== player) {
        return false;
      }
    }
    return true;
  }

  getAvailableMoves(): [number, number][] {
    const moves: [number, number][] = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (!this.board[i][j]) {
          moves.push([i, j]);
        }
      }
    }
    return moves;
  }

  iterativeDeepeningSearch(difficulty: number): [number, number] | null {
    let bestMove: [number, number] | null = null;
    let depth = 1;
    const startTime = performance.now();
    const timeLimit = 4200; // 2.2 seconds time limit

    console.log("Starting Iterative Deepening Search");

    while (true) {
      const currentTime = performance.now();
      if (currentTime - startTime > timeLimit) {
        console.error("Time limit exceeded, breaking out of search");
        break;
      }

      console.log(`Searching at depth: ${depth}`);

      const [move, _] = this.alphaBetaPruning(this.board, depth, -Infinity, Infinity, true);
      if (move) {
        console.log(`Best move found at depth ${depth}: ${move}`);
        bestMove = move;
      }

      if (this.gameOver || depth >= difficulty) {
        console.log(`Stopping search at depth ${depth}`);
        break;
      }
      depth++;
    }

    console.log("Finished Iterative Deepening Search");

    return bestMove;
  }

  alphaBetaPruning(board: string[][], depth: number, alpha: number, beta: number, maximizingPlayer: boolean): [[number, number] | null, number] {
    if (depth === 0 || this.isGameOver(board)) {
      const evalScore = this.evaluateBoard(board);
      console.log(`Depth: ${depth}, Board evaluated with score: ${evalScore}`);
      return [null, evalScore];
    }

    let bestMove: [number, number] | null = null;
    const availableMoves = this.getAvailableMoves();

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (const move of availableMoves) {
        const [row, col] = move;
        board[row][col] = 'O';
        const [_, evalScore] = this.alphaBetaPruning(board, depth - 1, alpha, beta, false);
        board[row][col] = '';

        console.log(`Maximizing player, Depth: ${depth}, Evaluating move: ${move}, Eval score: ${evalScore}`);

        if (evalScore > maxEval) {
          maxEval = evalScore;
          bestMove = move;
          console.log(`New best move for maximizing player: ${bestMove} with score ${maxEval}`);
        }

        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) {
          console.log("Alpha cutoff");
          break; // Beta cutoff
        }
      }
      return [bestMove, maxEval];
    } else {
      let minEval = Infinity;
      for (const move of availableMoves) {
        const [row, col] = move;
        board[row][col] = 'X';
        const [_, evalScore] = this.alphaBetaPruning(board, depth - 1, alpha, beta, true);
        board[row][col] = '';

        console.log(`Minimizing player, Depth: ${depth}, Evaluating move: ${move}, Eval score: ${evalScore}`);

        if (evalScore < minEval) {
          minEval = evalScore;
          bestMove = move;
          console.log(`New best move for minimizing player: ${bestMove} with score ${minEval}`);
        }

        beta = Math.min(beta, evalScore);
        if (beta <= alpha) {
          console.log("Beta cutoff");
          break; // Alpha cutoff
        }
      }
      return [bestMove, minEval];
    }
  }

  evaluateBoard(board: string[][]): number {
    // Initialize the score for the board
    let score = 0;
    
    // Check if there's an immediate winning move for either player
    if (this.isWinningMove(board, 'O')) return 100000; // High value for AI winning
    if (this.isWinningMove(board, 'X')) return -100000; // Low value for Player winning
  
    // Evaluate control of the board for both players and adjust the score
    score += this.evaluateBoardControl(board, 'O'); // Add points for AI control
    score -= this.evaluateBoardControl(board, 'X'); // Subtract points for Player control
  
    return score; // Return the final evaluation score for the board
  }
  
  evaluateBoardControl(board: string[][], player: string): number {
    // Initialize the score for the player's board control
    let score = 0;
  
    // Heuristic: Check control of the center, corners, and edges
    const center = board[3][3];
    const corners = [board[0][0], board[0][6], board[6][0], board[6][6]];
    const edges = [
      board[0][3], board[3][0], board[3][6], board[6][3], // Mid edges
      board[1][1], board[1][5], board[5][1], board[5][5]  // Near corners
    ];
  
    // Add points if the player controls the center, corners, or edges
    if (center === player) score += 100;
    corners.forEach(corner => {
      if (corner === player) score += 60;
    });
    edges.forEach(edge => {
      if (edge === player) score += 40;
    });
  
    // Add points based on the player's control of rows, columns, and diagonals
    score += this.evaluateLines(board, player);
  
    return score; // Return the score for the player's board control
  }
  
  evaluateLines(board: string[][], player: string): number {
    // Initialize the score for the player's control of lines
    let score = 0;
    const size = 7;
    const winCondition = 4;
  
    // Evaluate horizontal lines
    for (let row = 0; row < size; row++) {
      for (let col = 0; col <= size - winCondition; col++) {
        score += this.evaluateLine(board, player, row, col, 0, 1);
      }
    }
  
    // Evaluate vertical lines
    for (let col = 0; col < size; col++) {
      for (let row = 0; row <= size - winCondition; row++) {
        score += this.evaluateLine(board, player, row, col, 1, 0);
      }
    }
  
    // Evaluate diagonal lines (top-left to bottom-right)
    for (let row = 0; row <= size - winCondition; row++) {
      for (let col = 0; col <= size - winCondition; col++) {
        score += this.evaluateLine(board, player, row, col, 1, 1);
      }
    }
  
    // Evaluate diagonal lines (top-right to bottom-left)
    for (let row = winCondition - 1; row < size; row++) {
      for (let col = 0; col <= size - winCondition; col++) {
        score += this.evaluateLine(board, player, row, col, -1, 1);
      }
    }
  
    return score; // Return the total score for the player's control of lines
  }
  
  evaluateLine(board: string[][], player: string, row: number, col: number, dRow: number, dCol: number): number {
    let countPlayer = 0;
    let countOpponent = 0;
    let countEmpty = 0;

    // Identify the opponent
    const opponent = player === 'O' ? 'X' : 'O';

    for (let i = 0; i < 4; i++) {
        const current = board[row + i * dRow][col + i * dCol];
        if (current === player) countPlayer++;
        if (current === '') countEmpty++;
        if (current === opponent) countOpponent++;
    }

    // Block immediate opponent threats with higher priority
    if (countOpponent === 3 && countEmpty === 1) return -10000; // Block opponent's strong chance to win

    // Evaluate AI's chances to win or create opportunities
    if (countPlayer === 3 && countEmpty === 1) return 1000; // Strong chance to win
    if (countPlayer === 2 && countEmpty === 2) return 500; // Good control

    // Evaluate opponent's potential threats and apply blocking
    if (countOpponent === 2 && countEmpty === 2) return -800; // Block opponent's potential setup

    return 0;
}

  
  isGameOver(board: string[][]): boolean {
    return this.getAvailableMoves().length === 0 || this.isWinningMove(board, 'O') || this.isWinningMove(board, 'X');
  }
}
