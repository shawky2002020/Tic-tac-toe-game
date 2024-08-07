import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './board/cell/cell.component';
import { GameStatusComponent } from './game-status/game-status.component';
import { GameOptionsComponent } from './game-options/game-options.component';
import { ModeComponent } from './game-options/mode/mode.component';
import { DifficultyComponent } from './game-options/difficulty/difficulty.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    GameStatusComponent,
    GameOptionsComponent,
    ModeComponent,
    DifficultyComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
