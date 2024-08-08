import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  board!: string[][];
  currentPlayer!: string;
  gameOver!: boolean;
  aiDifficulty!: number; // Higher values mean deeper search

  constructor() {
    this.resetGame();
  }

  resetGame(): void {
    this.board = Array(7).fill(null).map(() => Array(7).fill(''));
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.aiDifficulty = 3; // Default AI difficulty level
  }

  getAvailableMoves(): number[][] {
    const moves: number[][] = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.board[i][j] === '') {
          moves.push([i, j]);
        }
      }
    }
    return moves;
  }

  isWinningMove(board: string[][], player: string): boolean {
    const size = 7;
    const winCondition = 4; // Number of consecutive pieces needed to win

    // Check rows for win
    for (let row = 0; row < size; row++) {
        for (let col = 0; col <= size - winCondition; col++) {
            let win = true;
            for (let i = 0; i < winCondition; i++) {
                if (board[row][col + i] !== player) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }
    }

    // Check columns for win
    for (let col = 0; col < size; col++) {
        for (let row = 0; row <= size - winCondition; row++) {
            let win = true;
            for (let i = 0; i < winCondition; i++) {
                if (board[row + i][col] !== player) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }
    }

    // Check diagonals (top-left to bottom-right) for win
    for (let row = 0; row <= size - winCondition; row++) {
        for (let col = 0; col <= size - winCondition; col++) {
            let win = true;
            for (let i = 0; i < winCondition; i++) {
                if (board[row + i][col + i] !== player) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }
    }

    // Check diagonals (bottom-left to top-right) for win
    for (let row = winCondition - 1; row < size; row++) {
        for (let col = 0; col <= size - winCondition; col++) {
            let win = true;
            for (let i = 0; i < winCondition; i++) {
                if (board[row - i][col + i] !== player) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }
    }

    // No win found
    return false;
}


  makeMove(row: number, col: number): void {
    if (this.board[row][col] === '' && !this.gameOver) {
      this.board[row][col] = this.currentPlayer;
      if (this.isWinningMove(this.board, this.currentPlayer)) {
        this.gameOver = true;
        // Display win message for this.currentPlayer
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  aiMove(): void {
    const bestMove = this.iterativeDeepeningSearch();
    if (bestMove) {
      this.makeMove(bestMove[0], bestMove[1]);
    }
  }

  iterativeDeepeningSearch(): number[] | null {
    let bestMove: number[] | null = null;
    let depth = 1;
    const startTime = performance.now();
    const timeLimit = 2000; // 2 seconds

    while (true) {
      const timeElapsed = performance.now() - startTime;
      if (timeElapsed > timeLimit) break;

      bestMove = this.alphaBetaPruning(this.board, depth, -Infinity, Infinity, true);

      depth++;
    }

    return bestMove;
  }

  alphaBetaPruning(board: string[][], depth: number, alpha: number, beta: number, maximizingPlayer: boolean): number[] | null {
    if (depth === 0 || this.gameOver) {
      return null;
    }

    const availableMoves = this.getAvailableMoves();

    if (maximizingPlayer) {
      let maxevaluate = -Infinity;
      let bestMove: number[] | null = null;
      for (const move of availableMoves) {
        board[move[0]][move[1]] = 'X';
        const evaluate = this.minimax(board, depth - 1, alpha, beta, false);
        board[move[0]][move[1]] = '';
        if (evaluate > maxevaluate) {
          maxevaluate = evaluate;
          bestMove = move;
        }
        alpha = Math.max(alpha, evaluate);
        if (beta <= alpha) break;
      }
      return bestMove;
    } else {
      let minevaluate = Infinity;
      let bestMove: number[] | null = null;
      for (const move of availableMoves) {
        board[move[0]][move[1]] = 'O';
        const evaluate = this.minimax(board, depth - 1, alpha, beta, true);
        board[move[0]][move[1]] = '';
        if (evaluate < minevaluate) {
          minevaluate = evaluate;
          bestMove = move;
        }
        beta = Math.min(beta, evaluate);
        if (beta <= alpha) break;
      }
      return bestMove;
    }
  }

  minimax(board: string[][], depth: number, alpha: number, beta: number, maximizingPlayer: boolean): number {
    if (this.isWinningMove(board, 'X')) return 10;
    if (this.isWinningMove(board, 'O')) return -10;
    if (depth === 0 || this.getAvailableMoves().length === 0) return 0;

    if (maximizingPlayer) {
      let maxevaluate = -Infinity;
      for (const move of this.getAvailableMoves()) {
        board[move[0]][move[1]] = 'X';
        const evaluate = this.minimax(board, depth - 1, alpha, beta, false);
        board[move[0]][move[1]] = '';
        maxevaluate = Math.max(maxevaluate, evaluate);
        alpha = Math.max(alpha, evaluate);
        if (beta <= alpha) break;
      }
      return maxevaluate;
    } else {
      let minevaluate = Infinity;
      for (const move of this.getAvailableMoves()) {
        board[move[0]][move[1]] = 'O';
        const evaluate = this.minimax(board, depth - 1, alpha, beta, true);
        board[move[0]][move[1]] = '';
        minevaluate = Math.min(minevaluate, evaluate);
        beta = Math.min(beta, evaluate);
        if (beta <= alpha) break;
      }
      return minevaluate;
    }
  }

  // Additional methods for managing game state, scoring, etc.
}
