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
    this.mode = 'human-vs-human';
    this.modeclicked.emit(this.mode);
  }
  PxC() {
    this.mode = 'human-vs-ai';
    this.modeclicked.emit(this.mode);
  }
  CxC() {
    this.mode = 'ai-vs-ai';
    this.modeclicked.emit(this.mode);
  }
}
