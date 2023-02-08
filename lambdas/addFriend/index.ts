import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import { DatabaseDynamoDb } from '../../plugins/Databases/DatabaseDynamoDb';
import { Response } from '../../plugins/Responses/Response';
import { Error } from '../../plugins/Errors/Error';

export const handler = async (event: APIGatewayEvent) => {
    var user = _.get(event, 'pathParameters._id')
    var friend = _.get( JSON.parse(_.get(event,'body')),'friend')

    var db = new DatabaseDynamoDb();
    if (user && friend && (user!=friend)) {

        return Promise.all([
            db.get('users', user),
            db.get('users', friend),
        ]).then((responses) => {

            if(_.isEmpty(responses[0]) || _.isEmpty(responses[1])){
                return new Response(406, 'addFriend', {message: 'Users doesnt exist'})
            }

            var userData = responses[0];
            var friendList : Array<string> = _.get(userData, 'Item.friends');
            if(!friendList.includes(friend)) {
                friendList.push(friend);
                _.assign(userData.Item, {friends:friendList})
                // //TODO: use update instead
                return db.put('users', userData.Item).then( result => {
                    return new Response(200, 'addFriend', userData)
                }).catch((error: Error) => {
                    return new Response(400, 'addFriend', error)
                })
            }

            return new Response(406, 'addFriend', {message: 'Friend already in the list'})
        
        }).catch((error: Error) => {
           throw new Response(400, 'addFriend')
        });
    }

    return new Response(400, 'addFriend')

}
