import { CognitoIdentityServiceProvider } from 'aws-sdk';

export default async function logIn( email: string, password: string){
    console.log('etestssssssss........',process.env.USER_POOL_ID)
    var userPoolId = process.env.USER_POOL_ID;
    var clientId = process.env.CLIENT_ID;

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