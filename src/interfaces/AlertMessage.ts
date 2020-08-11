export class AlertMessage{
   

   type: 'error'| 'warning' | 'success'
   code?: string
   message: string
   component?: Object



    constructor(type, message: string, code: string){
        this.type = type
        this.message = message
        this.code = code
    }



}