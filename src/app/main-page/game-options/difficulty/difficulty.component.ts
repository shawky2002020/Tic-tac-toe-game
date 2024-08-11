import { Component, EventEmitter, Input } from '@angular/core';
import { Output } from '@angular/core';
import { GameService } from '../../../services/ai.service';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.css'
})
export class DifficultyComponent {
  constructor(public gameservice:GameService){}

  @Output() diffclicked = new EventEmitter<void>();

  displayXO(){
    this.gameservice.displayxo=false;
  }
 
 
  

}


   