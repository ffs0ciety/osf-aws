import { STATUS_CODES } from "http";
import * as _ from "lodash";

export class Error  {
    public error : object;
    public statusCode : number;
    public status: any;
    public caller : string;

    constructor(statusCode:number, caller : string, error?: object){
        this.error = error;

        if(STATUS_CODES[statusCode]){
            this.statusCode = statusCode
            this.status = STATUS_CODES[statusCode];
        } else {
            this.statusCode = 500
            this.status = STATUS_CODES[500];
        }
    
        this.caller = caller;
    }

}