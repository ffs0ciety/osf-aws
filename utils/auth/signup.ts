import { CognitoIdentityServiceProvider } from 'aws-sdk';

export default async function signUp(email: string, password: string) {
    var userPoolId = 'eu-west-1_q0MX0V3eD';
    var cognito = new CognitoIdentityServiceProvider();

    return await cognito.adminCreateUser(
        {
            UserPoolId: userPoolId,
            Username: email,
            MessageAction: 'SUPPRESS',
            TemporaryPassword: password
        }).promise();
}