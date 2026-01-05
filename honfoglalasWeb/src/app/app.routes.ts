import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { MainComponent } from './components/system/main/main.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { CardviewComponent } from './components/system/cardview/cardview.component';
import { UpdateprofileComponent } from './components/user/updateprofile/updateprofile.component';
import { BookingComponent } from './components/user/booking/booking.component';

export const routes: Routes = [
    {path: 'registration', component:RegistrationComponent},
    {path:'profile', component:UpdateprofileComponent},
    {path:'cardview',component:CardviewComponent},
    {path: 'login', component:LoginComponent},
    {path: 'logout', component:LogoutComponent},
    {path:'main',component:MainComponent},
    {path:'booking',component:BookingComponent},
    {path: '', redirectTo: "/main", pathMatch: 'full'},
    {path: '**', component:NotfoundComponent}
    
];
