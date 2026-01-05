import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user';
import { APIservice } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { enviroment } from '../../../../enviorments/enviorment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: User ={
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: 'user',
    createdAt: new Date(),
    status:true
  }
  rememberMe : boolean = false;

  constructor(
    private api: APIservice,
    private auth: AuthService,
    private message: MessageService,
    private router: Router
  ){}

  login(){
    this.api.Login('users',this.user).then(res=>{
      if(res.status == 500){
        this.message.show('danger','Hiba',"Hiba van a rendszerben")
        return
      }
      if(res.data[0].status == false){
        this.message.show('danger','Hiba','Sajnáljuk, ez a fiók tiltva van!')
        alert("Sajnáljuk, a fiók tiltva van! Indok: " + res.data[0].banMessage)
        return
      }
      if(this.rememberMe){
        this.auth.storeUser(JSON.stringify(res.data))
      }

      this.auth.login(JSON.stringify(res.data));
      this.router.navigate(['/main'])
      alert("SIKERULT");
      localStorage.setItem("loggedUserId",res.data[0].id);
      localStorage.setItem("loggedUserName",res.data[0].name)
      
    })
  }
}
