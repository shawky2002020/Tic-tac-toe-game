import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent {
  constructor(private toast:ToastrService){}
  @Input() value!: string; // 'X', 'O', or ''
  @Input() row!: number;   // Row index
  @Input() col!: number;   // Column index
  @Output() cellClicked = new EventEmitter<void>();

  onCellClick(): void {
    if (!this.value) { // Prevent click if cell is already filled
      this.cellClicked.emit();
    }
    else{
      this.toast.warning(`Choose empty cell`,`Invalid move`)
    }
  }
}
