import { Injectable } from '@angular/core';
import axios from 'axios';
import { apiRES } from '../interfaces/apiRES';
import { enviroment } from '../../enviorments/enviorment'

@Injectable({
  providedIn: 'root'
})
export class APIservice{
    SERVER = enviroment.serverUrl
    constructor() { }

    async SelectAll(table: string): Promise<apiRES>{
        try{
          const res = await axios.get(`${this.SERVER}/${table}`)
        return {
          status:200,
          data : res.data
        }
        }
        catch (err : any){
          return {
            status:500,
            message: "Hiba történt az adatok lekéréskor"
          }
        }
        
      }

    async sendMail(data:object):Promise<apiRES>{
        try{
          const res = await axios.post(`${this.SERVER}/sendmail`,data)
        return {
          status:200,
          message: res.data.message
        }
        }
        catch (err : any){
          return {
            status:500,
            message: "Hiba történt az adatok lekéréskor"
          }
        }
      }

    async Registration(table: string, data: any){
        try{
          const res = await axios.post(`${this.SERVER}/${table}/registration` , data)
        return {
          status:200,
          message: "A regisztráció sikeres",
          data : res.data
        }
        }
        catch (err : any){
          return {
            status:500,
            message: err.response.data.error
            
          }
        }
      }
      
    async Login(table: string, data: any){
        try{
          const res = await axios.post(`${this.SERVER}/${table}/login` , data)
        return {
          status:200,
          message: "A bejelentkezés sikeres",
          data : res.data
        }
        }
        catch (err : any){
          return {
            status:500,
            message: err.response.data.error
            
          }
        }
      }  
}