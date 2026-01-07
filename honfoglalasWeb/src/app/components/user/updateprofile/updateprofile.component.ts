import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { enviroment } from '../../../../enviorments/enviorment';
import { AuthService } from '../../../services/auth.service';
import { APIservice } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { User } from '../../../interfaces/user';
import { SHA1 } from 'crypto-js';




@Component({
  selector: 'app-updateprofile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateprofile.component.html',
  styleUrl: './updateprofile.component.scss'
})
export class UpdateprofileComponent implements OnInit {

  constructor(
    private api: APIservice,
    private auth: AuthService,
    private message: MessageService,
    private router: Router
  ) { }
  user: User = {
    name: '',
    email: '',
    password: '',
    role: 'user',
    createdAt: new Date(),
    latestLogin:new Date(),
    status:true
  }




  oldPass: string = "";
  newPass: string = "";
  confPass: string = "";


  ngOnInit(): void {
    this.getProfile(Number(localStorage.getItem("loggedUserId")));
  }

  getProfile(id: number) {
    this.api.Select('users', id).then(res => {
      if (res.status == 500) {
        this.message.show('danger', 'Hiba', "Hiba van a rendszerben")
        return
      }
      this.user = res.data[0];



    })
  }
  modProfile() {
    this.api.Update("users", Number(localStorage.getItem("loggedUserId")), this.user).then(res => {
      if (res.status == 500) {
        this.message.show('danger', 'Hiba', "Hiba van a rendszerben")
        return
      }
      if (res.status == 200) {
        this.message.show('success', 'Siker!', 'Sikeres adat módosítás')
      }

    })
  }

  modPass() {
    if (this.newPass != this.confPass) {
      alert("A jelszavak nem egyeznek!");
      return;
    }


    if (this.oldPass == this.newPass) {
      alert("Nem adhatsz meg régi jelszót!");
      return;
    }


    this.newPass = SHA1(this.newPass).toString();
    console.log(this.newPass)
    this.user.password = this.newPass;
    this.api.Update("users", Number(localStorage.getItem("loggedUserId")), this.user).then(res => {
      if (res.status == 500) {
        alert("Hiba a módosítás során!");
      }
      if (res.status == 200) {
        alert("Sikeres jelszó módosítás!");
        this.user =
        {
          name: '',
          email: '',
          password: '',
          role: 'user',
          createdAt: new Date(),
          latestLogin: new Date(),
          status: true
        }
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
    })



  }
}
