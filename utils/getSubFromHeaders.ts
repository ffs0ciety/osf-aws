import _ from 'lodash';
import jwt_decode from "jwt-decode";

export default function getSubFromHeaders(headers:Object){
    var token = _.get(headers, `Authorization`);
    var decoded = ''
    if(String(token).includes('Bearer')){
        var splitted = String(token).split(' ')[1];
        return {
            jamon : jwt_decode(splitted)
        }
    }
    
    return token;
}