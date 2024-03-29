
import AWS from 'aws-sdk';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import { Error } from '../Errors/Error';
import { Database } from './Database';

const documentClient = new AWS.DynamoDB.DocumentClient();

export class DatabaseDynamoDb extends Database {

  constructor() {
    super()
  }

  async get(tableName: string, _id: string, select?: object) {
    var params = {
      TableName: `osf_${tableName}`,
      Key: { _id: _id }
    }
    try {
      return await documentClient.get(params).promise();
    } catch (error) {
      throw new Error(_.get(error, 'statusCode', 500), 'DatabaseDynamo - get', error);
    }


  }


  async getAll(tableName: string, select?: object) {
    var params;


    select ? params = {
      TableName: `osf_${tableName}`,
      FilterExpression: '',
      ExpressionAttributeValues: {}
    } : params = {
      TableName: `osf_${tableName}`
    }

    if (select) {
      for (const query in select) {
        if (query != undefined) {
          params.FilterExpression += `${query}=:${query} AND `;
          var querydots = `:${query}`
          params.ExpressionAttributeValues[querydots] = select[query]
        }
      }
      params.FilterExpression = params.FilterExpression.slice(0, -5)
    }

    try {
      return await documentClient.scan(params).promise();
      return params
    } catch (error) {
      throw new Error(_.get(error, 'statusCode', 500), 'DatabaseDynamo - getAll', error);
    }
  }

  async put(tableName: string, item: Object) {
    if (!_.has(item, '_id')) {
      _.assign(item, { _id: nanoid() })
    }
    var params = {
      TableName: `osf_${tableName}`,
      Item: item
    }
    try {
      return await documentClient.put(params).promise()
    } catch (error) {
      throw new Error(_.get(error, 'statusCode', 500), 'DatabaseDynamo - put', error);
    }
  }

  async update(tableName: string, item: Object) {
    if (!_.has(item, '_id')) {
      _.assign(item, { _id: nanoid() })
    }
    var params = {
      TableName: `osf_${tableName}`,
      Item: item
    }
    try {
      return await documentClient.put(params).promise()
    } catch (error) {
      throw new Error(_.get(error, 'statusCode', 500), 'DatabaseDynamo - update', error);
    }
  }
}