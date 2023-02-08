import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import { DatabaseDynamoDb } from '../../plugins/Databases/DatabaseDynamoDb';
import { Error } from '../../plugins/Errors/Error';
import { Response } from '../../plugins/Responses/Response';

export const handler = async (event: APIGatewayEvent) => {
  var db = new DatabaseDynamoDb();

  if(_.has(event,'pathParameters._id')){
    return db.get('users', _.get(event,'pathParameters._id')).then( (result) => {
      return new Response(200,'getUsers', result)
    }).catch((error : Error) => {
      return new Response(error.statusCode,'getUsers', error)
    });
  }

  return db.getAll('users').then( (result) => {
    return new Response(200,'getUsers', result)
  }).catch((error : Error) => {
    return new Response(error.statusCode,'getUsers', error)
  });
  

}
