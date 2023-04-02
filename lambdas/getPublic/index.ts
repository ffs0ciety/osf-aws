import { APIGatewayEvent } from 'aws-lambda';
import _ from 'lodash';
import { DatabaseDynamoDb } from '../../plugins/Databases/DatabaseDynamoDb';
import { Error } from '../../plugins/Errors/Error';
import { Response } from '../../plugins/Responses/Response';

export const handler = async (event: APIGatewayEvent) => {
  var db = new DatabaseDynamoDb();
  const API = _.get(event,'path').split('/')[1]
  
  if(_.has(event,'pathParameters._id')){
    return db.get(API, _.get(event,'pathParameters._id')).then( (result) => {
      return new Response(200,'getPublic', result)
    }).catch((error : Error) => {
      return new Response(error.statusCode,'getPublic', error)
    });
  }

  return db.getAll(API, _.get(event,'queryStringParameters')).then( (result) => {
    return new Response(200,'getPublic', result)
  }).catch((error : Error) => {
    return new Response(error.statusCode,'getPublic', error)
  });
  

}
