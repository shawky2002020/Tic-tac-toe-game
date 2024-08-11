import { Component, EventEmitter, Output } from '@angular/core';
import { log } from 'console';
import { GameService } from '../../services/ai.service';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.css'
})
export class GameOptionsComponent {
  mode!:string;
  diffbool:boolean=true; //to show playgame button after selecting mode
  togglediff(){this.diffbool=!this.diffbool}
  constructor(gameservice:GameService){
    console.log(gameservice.gameMode);
    
  }


  modesave($event:string){
    this.mode=$event;
    this.toogle();
    
  }
  bool:boolean=true;
  toogle(){
    this.bool=!this.bool;
  }


  @Output () playnow = new EventEmitter<void>();
  play(){
    this.playnow.emit();
  }
}
