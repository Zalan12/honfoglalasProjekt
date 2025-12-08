import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

export const routes: Routes = [
    {path: 'registration', component:RegistrationComponent},

    {path: '', redirectTo: "/main", pathMatch: 'full'},
    {path: '**', component:NotfoundComponent}
    
];
