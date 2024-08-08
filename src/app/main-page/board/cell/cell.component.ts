import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
  @Input() value!: string; // 'X', 'O', or ''
  @Output() cellClicked = new EventEmitter<void>();
  onCellClick(): void {
    if (!this.value) { // Prevent click if cell is already filled
      this.cellClicked.emit();
    }
  }
}
