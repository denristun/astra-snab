import { BankRequest } from "./BankRequest";
import { BankRequestType } from "./BankRequestType";

const hash = require('object-hash');

export class BankDocument{
    date: string
    income: number
    outcome: number
    destination: string
    client: string
    organization: string
    requests: BankRequest[]
    id:string

    constructor(date: string, income: number , outcome: number, destination: string, client: string, organization: string, comment: string){
        this.date = date
        this.income = income ? income : 0
        this.outcome = outcome ? outcome : 0
        this.destination = destination 
        this.client = client
        this.organization = organization
        this.requests = []
        this.id = hash({destination:this.destination, date: this.date, value: this.income || this.outcome})
        this.setRequests = comment
    }
//Обработка ячейки комментарий
  set setRequests(comment: string){
    //Проверка заполненности ячейки
    if (comment){
        const requests = comment.split(';')
        requests.forEach((request: string)=>{
            let [requestNumber, value, client] = request.trim().split(' ')
            if (requestNumber){
                let valueInt = value ? Number.parseFloat(value.replace(/,/g,'.')) : this.income || this.outcome
                client = client ? client: this.client
                let type: BankRequestType = this.income ? 'income' : 'outcome'
                const bankRequest = new BankRequest(requestNumber, valueInt, type, this.id, client, this.destination, this.date, this.client)
                this.requests.push(bankRequest)
            }
        })
        }
    //Необходимо реализовать проверку ячейки на ошибки
    else{
        this.requests = []
        }
    }
     

}