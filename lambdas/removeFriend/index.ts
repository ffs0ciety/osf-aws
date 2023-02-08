import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import { DatabaseDynamoDb } from '../../plugins/Databases/DatabaseDynamoDb';
import { Response } from '../../plugins/Responses/Response';
import { Error } from '../../plugins/Errors/Error';

export const handler = async (event: APIGatewayEvent) => {
    var user = _.get(event, 'pathParameters._id')
    var friend = _.get(JSON.parse(_.get(event, 'body')), 'friend')

    
    var db = new DatabaseDynamoDb();
    if (user && friend && (user != friend)) {
        return db.get('users', user).then((response) => {

            if (_.isEmpty(response)) {
                return new Response(406, 'addFriend', { message: 'User doesnt exist' })
            }

            var userData = response;
            var friendList : Array<string> = _.get(userData, 'Item.friends');
            if(friendList.includes(friend)) {
                
                _.assign(userData.Item, {friends: friendList.filter( x => {return x!=friend})})
                // // //TODO: use update instead
                return db.put('users', userData.Item).then( result => {
                    return new Response(200, 'removeFriend', userData)
                }).catch((error: Error) => {
                    return new Response(400, 'removeFriend', error)
                })
            }

            return new Response(406, 'removeFriend', { message: 'Friend wasnt in the list' })

        }).catch((error: Error) => {
            throw new Response(404, 'removeFriend')
        });
    }

    return new Response(400, 'removeFriend')

}
