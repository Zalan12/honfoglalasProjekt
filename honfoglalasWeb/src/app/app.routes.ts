import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { MainComponent } from './components/system/main/main.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';

export const routes: Routes = [
    {path: 'registration', component:RegistrationComponent},
    {path: 'login', component:LoginComponent},
    {path: 'logout', component:LogoutComponent},
    {path:'main',component:MainComponent},
    {path: '', redirectTo: "/main", pathMatch: 'full'},
    {path: '**', component:NotfoundComponent}
    
];
