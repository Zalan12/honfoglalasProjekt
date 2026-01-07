export interface Booking{
    id?:number;
    userId:any;
    accommodationId:number;
    startDate:Date;
    endDate:Date;
    persons:number;
    totalPrice?:number;
    status:boolean;
    createdAt:Date;
}