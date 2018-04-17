import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {LoginComponent} from './login/login.component';
import {GameComponent} from './game/game.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {InGameScreenComponent} from './in-game-screen/in-game-screen.component';


const appRoutes: Routes = [
    // { path: 'login', component: LoginComponent },
    { path: 'game', component: InGameScreenComponent },
    // otherwise redirect to home
    // { path: '**', redirectTo: 'main-menu' }
];

// export const routing = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouting { }
