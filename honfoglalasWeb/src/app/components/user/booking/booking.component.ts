import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumberFormatPipe } from '../../../pipes/number-format.pipe';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { APIservice } from '../../../services/api.service';
import { Booking } from '../../../interfaces/booking';
import { Accommodation } from '../../../interfaces/accommodation';
import { User } from '../../../interfaces/user';
import { enviroment } from '../../../../enviorments/enviorment';
declare var bootstrap: any;

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,FormsModule,NumberFormatPipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit{
    selectedUser: User | null = null
    isAdmin = false
    bookedAccoms: Booking[] = []
    MyBookings: Booking [] =[]
    accomms:Accommodation[]=[];
    currency=enviroment.currency;
    deleteModal:any
    torlendo=0;
    

    //Lapozásos miújságok---- freakster was freaking here 😜😜👅👅👅😛😛👅😜😜
    currentPage = 1;
    pageSize = 8;
    totalPages = 1;
    pagedAccomm:Accommodation[] = []
    filteredAccomms:Accommodation[] = [];
    modId=0
     searchTerm:string = ""
    //-----------------------
    
    ngOnInit(): void {
      this.isAdmin = this.auth.isAdmin()
      this.getHotels()
      this.getMyBookings()
      this.deleteModal = new bootstrap.Modal('#deleteModal')
    }
    constructor(
      private Api: APIservice,
      private mess: MessageService,
      private auth: AuthService
      
    ){}

      newHotel:Accommodation = {
        name:"",
        descrip:"",
        address:"",
        capacity:0,
        basePrice:0,
        active:false,
        createdAt:""
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
            console.log(this.newHotel) 
              })
      })
    }
    setPage(page:number){    
      this.currentPage = page;
      const startIndex = (page -1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.pagedAccomm = this.accomms.slice(startIndex,endIndex)
    }

    getMyBookings(){
      this.Api.SelectAll("bookings").then(res =>{
        this.bookedAccoms = res.data
        for(let i = 0; i < this.bookedAccoms.length; i++){
        console.log("a")
        if(this.bookedAccoms[i].userId == localStorage.getItem("loggedUserId")){
          console.log("b")
          this.bookedAccoms[i].endDate = this.bookedAccoms[i].endDate.toString().split("T")[0]
          this.MyBookings.push(this.bookedAccoms[i])
        }
      }
        console.log(this.bookedAccoms)
      })

    }

    getDeleteId(id:any){
      this.torlendo = id
    }
    Lemondas(idx:any){
      this.deleteModal.hide()
      alert(this.MyBookings[this.torlendo].accommodationId)
      this.MyBookings[idx].status = 0;
      this.Api.Delete("bookings",idx)
      this.torlendo = 0;
    }
}
