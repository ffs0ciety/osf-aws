export class Header {
    private 'Content-type': string;
    private 'Access-Control-Allow-Headers': string;
    private "Access-Control-Allow-Methods": string;
    private "Access-Control-Allow-Credentials": string;
    private "X-Requested-With": string;

    constructor() {
        this["Content-type"] = "application/json";
        this["Access-Control-Allow-Headers"] = "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token";
        this["Access-Control-Allow-Methods"] = "OPTIONS,POST,GET,PUT";
        this["Access-Control-Allow-Origin"] = "http://localhost:5173"
        this["X-Requested-With"] = "X-Request-With";
    }
} 