import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { Router, RouterLink } from '@angular/router';
import { APIservice } from '../../../services/api.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  acceptTerms: boolean = false;
  newUser: User={
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: 'user',
    createdAt: new Date()
  }

  constructor(
    private api: APIservice,
    private message: MessageService,
    private router: Router
  ){}

  register(){
    alert('a')
    if(!this.acceptTerms)
      {
        this.message.show('danger','Hiba','Nem fogadtad el a szabályzatot!')
        return
      }
    this.api.Registration('users', this.newUser).then(res =>{
        if(res.status == 500){
          this.message.show('danger','Hiba',"Hiba van a rendszerben")
          return
        }
        let data =
        {
            "template" : "registration",
            "to" : this.newUser.email,
            "subject" : "Sikeres regisztráció",
            "data":{
                "username":this.newUser.name,
                "email": this.newUser.email,
                "password" : this.newUser.password,
                "url" : "https://localhost:4200",
                "csapat" : "Pizzapityu"
        }}
        this.api.sendMail(data)

        this.message.show('success','OK','Woohooo')
        this.router.navigate(['login'])
      }) 
  }
}
