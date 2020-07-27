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

    constructor(date, income , outcome, destination, client, organization, comment){
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

  set setRequests(comment: string){
    //Проверка заполненности ячейки
    if (comment){
        const requests = comment.split(';')
        requests.forEach((request: string)=>{
            let [requestNumber, value, client] = request.trim().split(' ')
            const valueInt = value ? Number.parseFloat(value.replace(/,/g,'.')) : this.income || this.outcome
            client = client ? client: this.client
            let type: BankRequestType = this.income ? 'income' : 'outcome'
            const bankRequest = new BankRequest(requestNumber, valueInt, type, this.id, client)
            this.requests.push(bankRequest)
        })
        }
    //Необходимо реализовать проверку ячейки на ошибки
    else{
        this.requests = []
        }
    }
     

}

export class BankRequest{
    request: string
    value: number
    type: BankRequestType
    bankId: string
    comment: string
    
    constructor (request, value, type, bankId, comment){
        
        this.request = request
        this.value = value
        this.type = type
        this.bankId = bankId
        this.comment = comment

    }
}

type BankRequestType = 'income' | 'outcome'

