import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { enviroment } from '../../../../enviorments/enviorment';
import { AuthService } from '../../../services/auth.service';
import { APIservice } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-updateprofile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.scss'
})
export class UpdateprofileComponent implements OnInit{

    constructor(
      private api: APIservice,
      private auth: AuthService,
      private message: MessageService,
      private router: Router
    ){}
  
user: User ={
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: '',
    createdAt: new Date()
  }

  ngOnInit(): void {
    this.getProfile(Number(localStorage.getItem("loggedUserId")));
  }

  getProfile(id:number)
  {
    this.api.Select('users',id).then(res=>{
      if(res.status == 500){
        this.message.show('danger','Hiba',"Hiba van a rendszerben")
        return
      }
      this.user=res.data;
      console.log(this.user)
    })
  }
}
