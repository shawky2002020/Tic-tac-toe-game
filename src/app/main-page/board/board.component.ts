import { Component } from '@angular/core';
import { GameService } from '../../services/ai.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '1s ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class BoardComponent {
  constructor(public gameService: GameService, private toastr: ToastrService) {}
  private notificationShown = false;
  ngOnInit(): void {
    this.startNewGame();
  }
  displaywon() {
    if (!this.notificationShown) {
      if (this.gameService.gameMode === 'human-vs-ai') {
        this.toastr.success('Congratulations genius😎', 'You won!🎉', {
          progressBar: false,
        });
      } else {
        this.toastr.success(
          `Player ${this.gameService.currentPlayer} is smarter😎`,
          `Player ${this.gameService.currentPlayer} won !`,
          { progressBar: false }
        );
      }
      setTimeout(() => {
        this.toastr.info(`Press on New game`, `Play again?`, {
          timeOut: 7000,
          positionClass: 'toast-top-center',
        });
      }, 4000);
    }
    this.notificationShown = true;
  }

  displaylose() {
    if (!this.notificationShown) {
      this.toastr.error('Try again', 'You lost 😐', { progressBar: false });
      setTimeout(() => {
        this.toastr.info(`Press on New game`, `Play again?`, {
          timeOut: 7000,
          positionClass: 'toast-top-center',
        });
      }, 4000);
    }
    this.notificationShown = true;
  }
  displaydraw() {
    if (!this.notificationShown) {
      this.toastr.warning(`Nice game ✔`, `Draw`, { progressBar: false });
      setTimeout(() => {
        this.toastr.info(`Press on New game`, `Play again?`, {
          timeOut: 7000,
          positionClass: 'toast-top-center',
        });
      }, 4000);
    }
    this.notificationShown = true;

  }

  startNewGame(): void {
    this.notificationShown = false;
    this.gameService.resetGame();
    if (this.gameService.gameMode === 'ai-vs-ai') {
      setTimeout(() => {
        this.gameService.aiMove();
      }, 2000); // Small delay for better user experience
    }
  }

  onCellClick(row: number, col: number): void {
    if (this.gameService.gameMode !== 'ai-vs-ai')
      if (
        !this.gameService.gameOver &&
        this.gameService.board[row][col] === ''
      ) {
        this.gameService.makeMove(row, col);

        // Check if game is over after the player's move
        if (!this.gameService.gameOver) {
          if (
            this.gameService.currentPlayer === 'O' &&
            this.gameService.gameMode !== 'human-vs-human'
          ) {
            // Trigger AI move after player's move
            setTimeout(() => {
              this.gameService.aiMove();
            }, 200); // Small delay for better user experience
          }
        }
      }
  }
}
