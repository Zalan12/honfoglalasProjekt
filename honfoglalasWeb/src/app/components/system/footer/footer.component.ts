import { Component, input, Input } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { enviroment } from '../../../../enviorments/enviorment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  address=enviroment.address;
  email=enviroment.email;
  phone=enviroment.phone;
  date=enviroment.date;
  author=enviroment.author;
  repo=enviroment.repo;
  jira=enviroment.jira;
}
