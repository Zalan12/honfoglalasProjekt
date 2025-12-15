import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accommodation } from '../../../interfaces/accommodation';
import { AccommodationImages } from '../../../interfaces/accommodation-images';
import { enviroment } from '../../../../enviorments/enviorment';
import { APIservice } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
declare var bootstrap: any;

@Component({
  selector: 'app-cardview',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cardview.component.html',
  styleUrl: './cardview.component.scss'
})
export class CardviewComponent {
  selectedFile: File | null = null;
    accomms:Accommodation[]=[];
    accomimgs: AccommodationImages[] = []
    isAdmin = false
    editmode = false;
    newHotelM: any
  
    //Lapozásos miújságok---- freakster was freaking here 😜😜👅👅👅😛😛👅😜😜
    currentPage = 1;
    pageSize = 8;
    totalPages = 1;
    pagedAccomm:Accommodation[] = []
    filteredAccomms:Accommodation[] = []
     searchTerm:string = ""
    //-----------------------
    

    newaccomimg: AccommodationImages ={
        accommodationId: 0,
        imagePath: "",
      }
      newHotel:Accommodation = {
        name:"",
        descrip:"",
        address:"",
        capacity:0,
        basePrice:0,
        active:false,
        createdAt:""
      }
    
      currency=enviroment.currency;
    
      constructor(
        private Api: APIservice,
        private mess: MessageService,
        private auth: AuthService
      ){}
    
    ngOnInit(): void {
      this.getHotels();
      this.isAdmin = this.auth.isAdmin()
    }
    getHotels(){
      this.Api.SelectAll('accommodations').then(res =>{
        this.accomms = res.data;
        this.totalPages = Math.ceil(this.accomms.length/this.pageSize)
        console.log(this.accomms);
        this.filteredAccomms = this.accomms
        this.setPage(1)
      })
    }
    
    setPage(page:number){
        
      this.currentPage = page;
      const startIndex = (page -1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.pagedAccomm = this.accomms.slice(startIndex,endIndex)
    }

      filterAccomms(){
      const term =this.searchTerm.toLowerCase().trim();
       this.filteredAccomms = this.accomms.filter(p => p.name.toLowerCase().includes(term) ||p.address?.toLowerCase().includes(term))
  }
}
