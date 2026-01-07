export interface Booking{
    id?:number;
    userId:any;
    accommodationId:number;
    startDate:Date | string;
    endDate:Date | string;
    persons:number;
    totalPrice?:number;
    status:number;
    createdAt:Date;
}