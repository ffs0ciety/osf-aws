import { APIGatewayEvent } from 'aws-lambda';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import _ from 'lodash';
import { DatabaseDynamoDb } from '../../plugins/Databases/DatabaseDynamoDb';
import { Error } from '../../plugins/Errors/Error';
import { Response } from '../../plugins/Responses/Response';
import login from '../../utils/auth/login'

// import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import

export const handler = async (event: APIGatewayEvent) => {
    const {email,password} = JSON.parse(_.get(event, 'body'))
    try {
        const auth = await login(email, password)
        return new Response(200,'logIn', auth)
    } catch (error) {
        return new Response(error.statusCode || 400,'signUp', error)
    }
}
