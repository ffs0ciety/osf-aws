import { APIGatewayEvent } from 'aws-lambda';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import _ from 'lodash';
import { Response } from '../../plugins/Responses/Response';
import login from '../../utils/auth/login'
import signup from '../../utils/auth/signup'
import newPassword from '../../utils/auth/newPassword'

// import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import

export const handler = async (event: APIGatewayEvent) => {

    var cognito = new CognitoIdentityServiceProvider();

    const {email,password} = JSON.parse(_.get(event, 'body'))
    var clientId = '3pj8l2jcgsdod5mm4tqce1g3u7';
    var userPoolId = 'eu-west-1_q0MX0V3eD';
    
    try {
        await signup(email, password)

        const initAuthResponse = await login(email, password)
        
        if (initAuthResponse.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
            const auth = await newPassword(initAuthResponse.Session, email, password)
            return new Response(200,'signUp', auth)
        }

        return new Response(400,'signUp', null)
    } catch (error) {
        return new Response(error.statusCode || 400,'signUp', error)
    }
}
