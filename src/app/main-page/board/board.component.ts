import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/ai.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { Init } from 'v8';

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
export class BoardComponent implements OnInit {
 
  
  constructor(public gameService: GameService, private toastr: ToastrService) {
    const savedGameMode = localStorage.getItem('gamemode');
    const savedPlayerXDifficulty = parseInt(localStorage.getItem('playerXDifficulty') || '0', 10);
    const savedPlayerODifficulty = parseInt(localStorage.getItem('playerODifficulty') || '0', 10);
    const savedXScore = parseInt(localStorage.getItem('xScore') || '0', 10);
    const savedOScore = parseInt(localStorage.getItem('oScore') || '0', 10);
    // Restore game mode and difficulties if they exist
    if (savedGameMode) {
      this.gameService.gameMode = savedGameMode;
    }
    this.gameService.aiDifficultyPlayerX = savedPlayerXDifficulty;
    this.gameService.aiDifficultyPlayerO = savedPlayerODifficulty;
    this.gameService.Xscore = savedXScore;
    this.gameService.Oscore = savedOScore;

    // Store the current game mode and difficulties in local storage
    if (this.gameService.gameMode) {
      localStorage.setItem('gamemode', this.gameService.gameMode);
    }
    localStorage.setItem('playerXDifficulty', this.gameService.aiDifficultyPlayerX.toString());
    localStorage.setItem('playerODifficulty', this.gameService.aiDifficultyPlayerO.toString());
    localStorage.setItem('xScore', this.gameService.Xscore.toString());
    localStorage.setItem('oScore', this.gameService.Oscore.toString());



    if (gameService.gameMode !== 'ai-vs-ai') {
      setTimeout(() => {
        this.toastr.info(`To win, get 4 in a row (horizontally, vertically, or diagonally).`, `Rules`, {
          timeOut: 7000,
          positionClass: 'toast-bottom-center',
        });
      }, 1000);
    }

 
  }
      
    
  
  private notificationShown = false;
  ngOnInit(): void {
    this.startNewGame();
  }
  displaywon() {
    localStorage.setItem('xScore', this.gameService.Xscore.toString());
    localStorage.setItem('oScore', this.gameService.Oscore.toString());
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
    localStorage.setItem('xScore', this.gameService.Xscore.toString());
    localStorage.setItem('oScore', this.gameService.Oscore.toString());
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
    localStorage.setItem('xScore', this.gameService.Xscore.toString());
    localStorage.setItem('oScore', this.gameService.Oscore.toString());
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
    localStorage.setItem('xScore', this.gameService.Xscore.toString());
    localStorage.setItem('oScore', this.gameService.Oscore.toString());
    this.notificationShown = false;
    this.toastr.clear();
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
  trackByCell(index: number, cell: any): any {
    return index; // or use a unique identifier if available
  }
}
