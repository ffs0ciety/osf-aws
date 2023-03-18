import { CognitoIdentityServiceProvider } from 'aws-sdk';

export default async function signUp(email: string, password: string) {
    var userPoolId = process.env.USER_POOL_ID;
    var cognito = new CognitoIdentityServiceProvider();

    return await cognito.adminCreateUser(
        {
            UserPoolId: userPoolId,
            Username: email,
            MessageAction: 'SUPPRESS',
            TemporaryPassword: password
        }).promise();
}