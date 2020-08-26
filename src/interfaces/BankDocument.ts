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
    error?: boolean
    requestsSum?: number

    constructor(date: string, income: number , outcome: number, destination: string, client: string, organization: string, comment: string){
        this.date = date
        this.income = income ? income : 0
        this.outcome = outcome ? outcome : 0
        this.destination = destination 
        this.client = client
        this.organization = organization
        this.requests = []
        this.id = hash({destination:this.destination, date: this.date, value: this.income || this.outcome, organization: this.organization, client:this.client})
        this.setRequests = comment
    }
//Обработка ячейки комментарий
  set setRequests(comment: string){
    //Проверка заполненности ячейки
   this.requestsSum = 0
    if (comment){
       
        const requests = comment.split(';')
        requests.forEach((request: string)=>{
            let [requestNumber, value, client] = request.trim().split(' ')
            if (requestNumber){
                let valueFloat = value ? Number.parseFloat(value.replace(/,/g,'.')) : this.income || this.outcome
                let valueInt = value && !Number.isNaN(+valueFloat) ? valueFloat : this.income || this.outcome
                client = client ? client: this.client
                let type: BankRequestType = this.income ? 'income' : 'outcome'
                const correctRequestNumber = requestNumber.match(/[а-я,А-Я]{3}-[0-9]{1,2}\/[0-9]{1,6}/g)[0]
                this.requestsSum += valueInt
                const bankRequest = new BankRequest(correctRequestNumber, valueInt, type, this.id, client, this.destination, this.date, this.client, "", this.organization)
                console.log("bankRequests", bankRequest)
                this.requests.push(bankRequest)
            }
        })
    
        if (this.requests.length > 1){
            console.log(this.requests)
            this.error = Math.round((this.requestsSum + Number.EPSILON) * 100) / 100 === (this.income || this.outcome)? false : true
            
        }
        else{
            this.error = this.requests[0].value === (this.income || this.outcome)? false : true
        }
        }

    //Необходимо реализовать проверку ячейки на ошибки
    else{
        this.requests = []
        }
    }

     

}