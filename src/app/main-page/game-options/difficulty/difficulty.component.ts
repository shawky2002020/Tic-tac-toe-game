import { Component, EventEmitter, Input } from '@angular/core';
import { Output } from '@angular/core';
import { GameService } from '../../../services/ai.service';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrl: './difficulty.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  
})
export class DifficultyComponent {
  constructor(public gameservice:GameService){
    gameservice.resetGame();
    const savedPlayerXDifficulty = parseInt(localStorage.getItem('playerXDifficulty') || '0', 10);
    const savedPlayerODifficulty = parseInt(localStorage.getItem('playerODifficulty') || '0', 10);
    this.gameservice.aiDifficultyPlayerX = savedPlayerXDifficulty;
    this.gameservice.aiDifficultyPlayerO = savedPlayerODifficulty;
    console.log(`diff constuctor`);
    

  }
  bool=false;
  @Output() diffclicked = new EventEmitter<void>();

  displayXO(){
    this.gameservice.displayxo=false;
  }
  
  save(diff1:number,diff2?:number){
    this.gameservice.saveDifficulty(diff1,diff2);
    this.bool=true;
  }


  
}


   