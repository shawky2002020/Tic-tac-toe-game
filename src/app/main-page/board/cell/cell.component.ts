import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from '../../../services/ai.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
  constructor(public gameservice:GameService){}
  @Input() value!: string; // 'X', 'O', or ''
  @Output() cellClicked = new EventEmitter<void>();
  onCellClick(): void {
    if (!this.value) { // Prevent click if cell is already filled
      this.cellClicked.emit();
    }
  }
}
