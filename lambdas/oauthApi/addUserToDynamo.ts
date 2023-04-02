
const documentClient = new AWS.DynamoDB.DocumentClient();



exports.handler = async (event) => {
    var response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": true,
            "X-Requested-With": "*"
        },
        body: JSON.stringify({
            error: false,
            event: event,
            code: 200
        }),
    };
    return response;
};
   