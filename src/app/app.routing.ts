import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {GameComponent} from './game/game.component';
import {AuthGuardService} from './shared/services/auth-guard.service';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: GameComponent, canActivate: [AuthGuardService] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
