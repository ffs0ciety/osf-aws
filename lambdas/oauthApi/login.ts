import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import { Response } from '../../plugins/Responses/Response';
import login from '../../utils/oauth/login'


// import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import

export const handler = async (event: APIGatewayEvent) => {
    const {email,password} = JSON.parse(_.get(event, 'body'))

    if(!email || !password){
        return new Response(400,'login', {
            message: 'Missing parameters'
        })
    }


    try {
        const auth = await login(email, password)
        return new Response(200,'login', auth)
    } catch (error) {
        return new Response(error.statusCode || 400,'login', error)
    }
}
