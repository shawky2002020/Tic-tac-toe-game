import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { GameOptionsComponent } from './main-page/game-options/game-options.component';
import { AppComponent } from './app.component';
import { TrialComponent } from './trial/trial.component';
import { DifficultyComponent } from './main-page/game-options/difficulty/difficulty.component';
import { ModeComponent } from './main-page/game-options/mode/mode.component';
import { BoardComponent } from './main-page/board/board.component';


const routes: Routes = [
  {path:'',component:MainPageComponent},
  {path:'mode',component:ModeComponent},
  {path:'difficulty',component:DifficultyComponent},
  {path:'game',component:BoardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
