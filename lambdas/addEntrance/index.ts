import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import { DatabaseDynamoDb } from '../../plugins/Databases/DatabaseDynamoDb';
import { Response } from '../../plugins/Responses/Response';
import { Error } from '../../plugins/Errors/Error';

export const handler = async (event: APIGatewayEvent) => {
    var goal = _.get(event, 'pathParameters._id')

    var db = new DatabaseDynamoDb();

    return db.get('goals', goal).then(response => {
        var goal = _.get(response, 'Item');
        var entrances: Array<string> = _.get(goal, 'entrances');
        var today = new Date(Date.now());
        var lastEntrance = new Date(entrances.slice(-1)[0]);

        var isSameDay = today.getDate() == lastEntrance.getDate() && today.getMonth() == lastEntrance.getMonth() && today.getFullYear() == lastEntrance.getFullYear();

        if(_.get(goal,'daily') && isSameDay){
            return new Response(400, 'addEntrance', {message:'you already added an entrance today'})
        }
     
        entrances.push(String(today));
        _.assign(goal, { entrances: entrances });

        return db.put('goals', goal).then(result => {
            return new Response(200, 'addEntrance', goal)
        }).catch(error => {
            return new Response(400, 'addEntrance', error)
        })

    })
}

