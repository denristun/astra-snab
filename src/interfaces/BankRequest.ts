import { BankRequestType } from "./BankRequestType"

export class BankRequest{
    request: string
    value: number
    type: BankRequestType
    bankId: string
    comment: string
    destination: string
    date: string
    client: string
    status: boolean
    _id?: string
    organization: string
    
    constructor (request: string, value: number, type: BankRequestType, bankId: string, 
        comment: string, destination: string, date: string,   client: string, status: boolean, organization:string){
        
        this.request = request
        this.value = value
        this.type = type
        this.bankId = bankId
        this.comment = comment
        this.destination = destination
        this.date = date
        this.client = client
        this.status = status
        this.organization = organization

    }
}