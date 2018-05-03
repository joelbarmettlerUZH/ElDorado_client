import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {BoardComponent} from './in-game-screen/map/board/board.component';
import {InGameScreenComponent} from './in-game-screen/in-game-screen.component';
import {WinnerScreenComponent} from './in-game-screen/winner-screen/winner-screen.component';
import {EldoradoReachedScreenComponent} from './in-game-screen/eldorado-reached-screen/eldorado-reached-screen.component';

// import {AuthGuardService} from './shared/services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/main-menu', pathMatch: 'full'},
  {path: 'winner-screen', component: WinnerScreenComponent},
  {path: 'eldorado-reached-screen', component: EldoradoReachedScreenComponent},
  // // otherwise redirect to home
  // { path: '**', redirectTo: '' },
  {path: 'main-menu', component: MainMenuComponent},
  {path: 'game', component: InGameScreenComponent},
  { path: 'board', component: BoardComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
