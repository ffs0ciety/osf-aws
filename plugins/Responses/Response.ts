import _ from 'lodash';
import { Error } from '../Errors/Error';
import { Header } from '../Headers/Header'
export class Response {
    private statusCode: number;
    private headers: Header;
    private body: Object

    constructor(statusCode: number, caller:string, result?: object) {
       this.headers = new Header();
       this.statusCode = statusCode;
       
       if(_.inRange(statusCode, 300,599)){
        this.body = JSON.stringify(new Error(statusCode, caller, result))
       } else {
        this.body = JSON.stringify(result);
       }
    }
} 