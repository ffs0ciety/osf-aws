import { APIGatewayEvent } from 'aws-lambda';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import _ from 'lodash';
import { Response } from '../../plugins/Responses/Response';
import login from '../../utils/oauth/login'
import signup from '../../utils/oauth/signup'
import newPassword from '../../utils/oauth/newPassword'

// import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import

export const handler = async (event: APIGatewayEvent) => {

    var cognito = new CognitoIdentityServiceProvider();

    const {email,password} = JSON.parse(_.get(event, 'body'))
    
    try {
        await signup(email, password)

        const initAuthResponse = await login(email, password)
        
        if (initAuthResponse.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
            const auth = await newPassword(initAuthResponse.Session, email, password)

            //TODO: add user to dynamodb
            return new Response(200,'signUp', auth)
        }

        
        return new Response(400,'signUp', null)
    } catch (error) {
        return new Response(error.statusCode || 400,'signUp', error)
    }
}
