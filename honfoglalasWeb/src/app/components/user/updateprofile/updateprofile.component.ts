import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { enviroment } from '../../../../enviorments/enviorment';
import { AuthService } from '../../../services/auth.service';
import { APIservice } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
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
  email: string="";
  name:string="";
  createdAt:string="";

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
      this.email=res.data[0].email;
      this.name=res.data[0].name;
      this.createdAt=res.data[0].createdAt;

      
    })
  }
}
