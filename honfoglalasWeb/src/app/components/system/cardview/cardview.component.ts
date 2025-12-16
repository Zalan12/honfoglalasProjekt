import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accommodation } from '../../../interfaces/accommodation';
import { AccommodationImages } from '../../../interfaces/accommodation-images';
import { enviroment } from '../../../../enviorments/enviorment';
import { APIservice } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';
import { NumberFormatPipe } from '../../../pipes/number-format.pipe';
declare var bootstrap: any;

@Component({
  selector: 'app-cardview',
  standalone: true,
  imports: [CommonModule,FormsModule, NumberFormatPipe],
  templateUrl: './cardview.component.html',
  styleUrl: './cardview.component.scss'
})
export class CardviewComponent {
    selectedUser: User | null = null
    selectedFile: File | null = null;
    accomms:Accommodation[]=[];
    accomimgs: AccommodationImages[] = []
    isAdmin = false
    editmode = false;
    newHotelM: any
    formModal2:any
  
    //Lapozásos miújságok---- freakster was freaking here 😜😜👅👅👅😛😛👅😜😜
    currentPage = 1;
    pageSize = 8;
    totalPages = 1;
    pagedAccomm:Accommodation[] = []
    filteredAccomms:Accommodation[] = [];
    torlendo=0;
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
      this.formModal2 = new bootstrap.Modal('#formModal')
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
    getHotel(idx:any){
    this.Api.Select('accommodations', idx).then(res =>{
      this.newHotel  = res.data[0];
      this.selectedUser = res.data[0]
      this.Api.Select('accommodations/id/eq',idx).then(res=>{
        this.accomms = res.data,
        this.formModal2.show()
        console.log(this.newHotel) 
          })
      })
      this.formModal2.show()
    }
    
    setPage(page:number){
        
      this.currentPage = page;
      const startIndex = (page -1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.pagedAccomm = this.accomms.slice(startIndex,endIndex)
    }

      filterAccomms(){
      const term =this.searchTerm.toLowerCase().trim();
      if(term=="67")
      {
         let hathet:any=document.getElementById('hathet');
         hathet.style.display="block";
      }
      else
        {
          let hathet:any=document.getElementById('hathet');
          hathet.style.display="none";
        }
       this.filteredAccomms = this.accomms.filter(p => p.name.toLowerCase().includes(term) ||p.address?.toLowerCase().includes(term))
       this.pagedAccomm=this.filteredAccomms;
       if(term=="")
       {
        this.setPage(1);
       }
  }

  deleteAccom(id:any)
  {
      this.Api.Delete("accommodations",id).then(res=>{

        this.mess.show('success','Siker','Sikeres törlés');
      })
      this.setPage(1);
  }

  getDeleteId(id:any)
  {
     this.torlendo=id;
  }
}
