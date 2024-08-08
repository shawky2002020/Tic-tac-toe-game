import { Component, EventEmitter, Input } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.css'
})
export class DifficultyComponent {
  difficult!:boolean; // true=>hard false=>easy

  @Output() diffclicked = new EventEmitter<void>();
  clickedhard():void{
    this.difficult=true;
    this.diffclicked.emit();
  }
  clickedeasy():void{
    this.difficult=false;
    this.diffclicked.emit();
  }
 
  

}


   