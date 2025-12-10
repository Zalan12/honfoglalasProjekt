import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../interfaces/message';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit{
  message:Message | null = null;

  constructor(private messageServ:MessageService){}

  ngOnInit(): void {

    this.messageServ.message$.subscribe(msg =>{
      this.message = msg;
      switch(this.message?.severity){
        case 'info':
          this.message.icon = 'bi bi-check-circle-fill'
          break;
        case 'success':
          this.message.icon = 'bi bi-check-lg'
          break;
        case 'danger':
          this.message.icon = 'bi bi-exclamation-circle'
          break;
        case 'warning':
          this.message.icon = 'bi bi-exclamation-triangle-fill'
          break;
      }
    });


  }
}

//Vártalak 
//Elhagytá'
//Csengő
//Zoliva
//Megcsatá'