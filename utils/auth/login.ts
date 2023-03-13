import { CognitoIdentityServiceProvider } from 'aws-sdk';

export default async function logIn( email: string, password: string){
    var clientId = '3pj8l2jcgsdod5mm4tqce1g3u7';
    var userPoolId = 'eu-west-1_q0MX0V3eD';

    var cognito = new CognitoIdentityServiceProvider();
    
    return await cognito.adminInitiateAuth({
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        UserPoolId: userPoolId,
        ClientId: clientId,
        AuthParameters : {
            USERNAME: email,
            PASSWORD: password
        }
    }).promise()
}