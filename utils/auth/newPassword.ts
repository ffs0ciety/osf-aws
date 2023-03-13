import { CognitoIdentityServiceProvider } from 'aws-sdk';

export default async function logIn(session:string, email: string, password: string) {
    var userPoolId = 'eu-west-1_q0MX0V3eD';
    var clientId = '3pj8l2jcgsdod5mm4tqce1g3u7';
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