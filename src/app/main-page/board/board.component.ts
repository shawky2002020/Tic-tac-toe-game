import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  cells: string[] = Array(7*7).fill('');
  currentPlayer: string = 'X';

  handleCellClick(index: number): void {
    if (!this.cells[index]) {
      this.cells[index] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  

}
