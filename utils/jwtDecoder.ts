import _ from 'lodash';
import jwt_decode from "jwt-decode";

export default function getSubFromHeaders(token:String){
    
    
    var decoded = {};
    
    if(String(token).includes('Bearer')){
        var splitted = String(token).split(' ')[1];
        console.log(token)
        decoded = jwt_decode(splitted)
    } 

    // console.log(decoded)
    return decoded;
}