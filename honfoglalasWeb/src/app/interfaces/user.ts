export interface User{
    id?: number,
    name: string,
    email: string,
    password: string,
    confirm?: string,
    role: string,
    createdAt: Date,
    latestLogin?: Date,
    status:boolean,
    banMessage?:string
}