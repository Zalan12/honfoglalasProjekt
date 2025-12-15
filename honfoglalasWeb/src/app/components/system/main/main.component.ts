import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { APIservice } from '../../../services/api.service';
import { Accommodation } from '../../../interfaces/accommodation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { enviroment } from '../../../../enviorments/enviorment';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AccommodationImages } from '../../../interfaces/accommodation-images';
import { User } from '../../../interfaces/user';
import { NumberFormatPipe } from '../../../pipes/number-format.pipe';
declare var bootstrap: any;

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,FormsModule,NumberFormatPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent  implements OnInit{

  selectedFile: File | null = null;
  selectedUser: User | null = null
  accomms:Accommodation[]=[];
  accomimgs: AccommodationImages[] = []
  isAdmin = false
  editmode = false;
  newHotelM: any
  formModal:any

  //Lapozásos miújságok---- freakster was freaking here 😜😜👅👅👅😛😛👅😜😜
  currentPage = 1;
  pageSize = 4;
  totalPages = 1;
  pagedAccomm:Accommodation[] = []
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
  this.formModal = new bootstrap.Modal('#formModal')
  this.newHotelM = new bootstrap.Modal('#newHotelM')
  this.getHotels();
  this.isAdmin = this.auth.isAdmin()
}
getHotels(){
  this.Api.SelectAll('accommodations').then(res =>{
    this.accomms = res.data;
    this.totalPages = Math.ceil(this.accomms.length/this.pageSize)
    console.log(this.accomms);
    this.setPage(1)
  })
}
getHotel(idx:any){
 this.Api.Select('accommodations', idx).then(res =>{
      this.newHotel  = res.data[0];
      this.selectedUser = res.data[0]
      this.Api.Select('accommodations/id/eq',idx).then(res=>{
        this.accomms = res.data,
        this.formModal.show()
        console.log(this.newHotel) 
      })
    })
    this.formModal.show()
}

setPage(page:number){
    
  this.currentPage = page;
  const startIndex = (page -1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.pagedAccomm = this.accomms.slice(startIndex,endIndex)
}
onFileSelected(event:any){
  this.selectedFile = event.target.files[0];
  
}


async ujHotelFelvetele() {
  if(!this.newHotel.name || !this.newHotel.address || !this.newHotel.basePrice || !this.newHotel.capacity){
    this.mess.show('danger','Hiba','Nem adtál meg minden adatot!')
    alert("Nem adtál meg minden adatot!")
    return
  }
  if(this.selectedFile){
    const formData = new FormData();
    formData.append('image',this.selectedFile)
    const res = await this.Api.upload(formData).then(res=>{
      if(res.status != 200){
        this.mess.show('danger','Hiba',res.message!)
      }
      else{
        this.newaccomimg = res.data.filename;
      }
      
    })
  }

  if(this.editmode){
    //Ja
  }
  else{
    this.Api.SelectAll('accommodations/name/eq/' + this.newHotel.name).then(res =>{  
      this.Api.Insert('accommodations',this.newHotel).then(res => {
        this.mess.show('success','Sikeres','A pizza sikeresen fel lett véve a listába!')
        this.newHotelM.hide();
        this.newHotel = 
        {
          id: 0,
          name: "",
          descrip: "",
          address: "",
          capacity: 0,
          basePrice: 0,
          active: false,
          createdAt: ""
        };
        this.newaccomimg ={
          id:0,
          accommodationId : 0,
          imagePath : ""
        }
        this.getHotels()
      });

    })
  }

}
}

