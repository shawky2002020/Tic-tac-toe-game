import { Component } from '@angular/core';
import { GameService } from '../../services/ai.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.gameService.resetGame();
  }

  onCellClick(row: number, col: number): void {
    if (!this.gameService.gameOver && this.gameService.board[row][col] === '') {
      this.gameService.makeMove(row, col);

      // Check if game is over after the player's move
      if (!this.gameService.gameOver) {
        if (this.gameService.currentPlayer === 'O' && this.gameService.gameMode !== 'human-vs-human') {
          // Trigger AI move after player's move
          setTimeout(() => {
            this.gameService.aiMove();
          }, 100); // Small delay for better user experience
        }
      }
    }
  }
}
