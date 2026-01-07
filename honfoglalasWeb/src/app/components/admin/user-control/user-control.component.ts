import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user';
import { APIservice } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
declare var bootstrap: any;

@Component({
  selector: 'app-user-control',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './user-control.component.html',
  styleUrl: './user-control.component.scss'
})
export class UserControlComponent implements OnInit{
    Users:User[]=[]
    formModal:any
    selectedUser: User | null = null
    banMessage: string = "";

    newUser:User = {
        name:"",
        email:"",
        password:"",
        role:"",
        createdAt: new Date(),
        latestLogin: new Date(),
        status:true,
        banMessage: ""
    }

    //Lapozásos miújságok---- freakster was freaking here 😜😜👅👅👅😛😛👅😜😜
    currentPage = 1;
    pageSize = 8;
    totalPages = 1;
    pagedUser:User[] = []
    setPage(page:number){
      this.currentPage = page;
      const startIndex = (page -1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.pagedUser = this.Users.slice(startIndex,endIndex)
    }
    //-----------------------

      constructor(
        private Api: APIservice,
        private mess: MessageService,
        private auth: AuthService
      ){}

    ngOnInit(): void {
      this.formModal = new bootstrap.Modal('#formModal')
      this.getUsers();
    }
    getUsers(){
        this.Api.SelectAll('users').then(res =>{
        this.Users = res.data;
        this.totalPages = Math.ceil(this.Users.length/this.pageSize)
        console.log(this.Users);
        this.setPage(1)
    })
  }
  getUser(idx:any){
      this.Api.Select('users', idx).then(res =>{
      this.newUser  = res.data[0];
      this.selectedUser = res.data[0]
      this.Api.Select('users/id/eq',idx).then(res=>{
        this.Users = res.data,
        this.formModal.show()
        console.log(this.newUser) 
      })
    })
    this.formModal.show()
  }

  banUser(id:any){
      let idx = this.Users.findIndex(user => user.id == id)
      this.Users[idx].status = !this.Users[idx].status;
      this.Api.Update('users',id,{status:this.Users[idx].status ? 1: 0})
      this.Api.Update('users',id,{banMessage:this.Users[idx].banMessage})
      this.formModal.hide()
      this.getUsers()
  }
}
