import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { APIservice } from '../../../services/api.service';
import { Accommodation } from '../../../interfaces/accommodation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { enviroment } from '../../../../enviorments/enviorment';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent  implements OnInit{

  
  accomms:Accommodation[]=[];


  //Lapozásos miújságok---- freakster was freaking here 😜😜👅👅👅😛😛👅😜😜
  currentPage = 1;
  pageSize = 4;
  totalPages = 1;
  pagedAccomm:Accommodation[] = []
  //-----------------------
  
  rand=Math.floor(Math.random() * 8) + 1;


  currency=enviroment.currency;

  constructor(
    private Api: APIservice,
    private mess: MessageService,
    private auth: AuthService
  ){}

ngOnInit(): void {
  this.getHotels();
}
getHotels(){
  this.Api.SelectAll('accommodations').then(res =>{
    this.accomms = res.data;
    this.totalPages = Math.ceil(this.accomms.length/this.pageSize)
    console.log(this.accomms);
    this.setPage(1)
  })
}

setPage(page:number){
    
  this.currentPage = page;
  const startIndex = (page -1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.pagedAccomm = this.accomms.slice(startIndex,endIndex)
}
}
