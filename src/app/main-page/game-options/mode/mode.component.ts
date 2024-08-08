import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrl: './mode.component.css',
})
export class ModeComponent {
  mode: string = '';
  @Output() modeclicked = new EventEmitter<string>();

  PxP() {
    this.mode = 'PxP';
    this.modeclicked.emit(this.mode);
  }
  PxC() {
    this.mode = 'PxC';
    this.modeclicked.emit(this.mode);
  }
  CxC() {
    this.mode = 'CxC';
    this.modeclicked.emit(this.mode);
  }
}
