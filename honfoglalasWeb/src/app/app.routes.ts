import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/system/notfound/notfound.component';

export const routes: Routes = [
    {path: '', redirectTo: "/main", pathMatch: 'full'},
    {path: '**', component:NotfoundComponent}
    
];
