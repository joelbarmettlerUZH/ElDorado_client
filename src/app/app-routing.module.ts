import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {BoardComponent} from './in-game-screen/map/board/board.component';
import {InGameScreenComponent} from './in-game-screen/in-game-screen.component';
import {WinnerScreenComponent} from './in-game-screen/winner-screen/winner-screen.component';

// import {AuthGuardService} from './shared/services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/main-menu', pathMatch: 'full'},
  // // otherwise redirect to home
  // { path: '**', redirectTo: '' },
  {path: 'main-menu', component: MainMenuComponent},
  {path: 'games/:gameId', component: InGameScreenComponent},
  {path: 'board', component: BoardComponent},
  {path: 'winner-screen', component: WinnerScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
