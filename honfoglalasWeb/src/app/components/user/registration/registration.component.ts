import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { APIservice } from '../../../services/api.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule],
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
    if(!this.acceptTerms)
      {
        this.message.show('danger','Hiba','Nem fogadtad el a szabályzatot!')
        return
      }
  }
}
