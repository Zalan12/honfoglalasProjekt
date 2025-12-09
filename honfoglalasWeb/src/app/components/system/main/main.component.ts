import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { APIservice } from '../../../services/api.service';
import { Accommodation } from '../../../interfaces/accommodation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent  implements OnInit{

  
  accomms:Accommodation[]=[]

  constructor(
    private Api: APIservice,
    private mess: MessageService
  ){}

ngOnInit(): void {
  this.getHotels();
}
getHotels(){
  this.Api.SelectAll('accommodations').then(res =>{
    this.accomms = res.data;
    console.log(this.accomms);
  })
}
}
