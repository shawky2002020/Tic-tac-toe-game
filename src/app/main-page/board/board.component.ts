import { Component } from '@angular/core';
import { GameService } from '../../services/ai.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class BoardComponent {
  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.gameService.resetGame();
     if(this.gameService.gameMode==='ai-vs-ai'){
      
      
      setTimeout(() => {
        this.gameService.aiMove();
      }, 2000); // Small delay for better user experience
    }
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
