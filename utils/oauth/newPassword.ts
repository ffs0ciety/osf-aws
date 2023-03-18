import { CognitoIdentityServiceProvider } from 'aws-sdk';

export default async function logIn(session:string, email: string, password: string) {
    var userPoolId = process.env.USER_POOL_ID;
    var clientId = process.env.CLIENT_ID;
    var cognito = new CognitoIdentityServiceProvider();

    return await cognito.adminRespondToAuthChallenge({
        ChallengeName: 'NEW_PASSWORD_REQUIRED',
        ClientId: clientId,
        UserPoolId: userPoolId,
        ChallengeResponses: {
          USERNAME: email,
          NEW_PASSWORD: password,
        },
        Session: session
      }).promise()
}