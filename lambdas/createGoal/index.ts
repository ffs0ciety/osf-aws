import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import { DatabaseDynamoDb } from '../../plugins/Databases/DatabaseDynamoDb';
import { Response } from '../../plugins/Responses/Response';
import { Error } from '../../plugins/Errors/Error';
import jwtDecoder from '../../utils/jwtDecoder'

export const handler = async (event: APIGatewayEvent) => {
  var userInfo = jwtDecoder(_.get(event,'headers.Authorization',''));

  if(!userInfo){
    return new Response(400, 'createGoal', {message:'Missing credentials'})
  }


  var obj = JSON.parse(event.body);
  _.assign(obj,{
    ownerId: _.get(userInfo,'sub'),
    created: String(new Date(Date.now())),
    entrances: []
  })

  
  var db = new DatabaseDynamoDb();
  return db.put('goals', obj).then( (result) => {
    return new Response(200,'createGoal', result)
  }).catch((error : Error) => {
    return new Response(400, 'createGoal', error)
  });

}
