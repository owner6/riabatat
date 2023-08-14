const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const dynamoDB = new DynamoDBClient({ region: "eu-central-1" });

module.exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { fromYear, toYear, marka, model } = requestBody;
    const userId = "userId";

    const params = {
      TableName: "riabatat-dev-users",
      Key: marshall({
        id: userId,
      }),
      UpdateExpression: 'SET #fy = :fy, #ty = :ty, #mk = :mk, #mdl = :mdl',
      ExpressionAttributeNames: {
        '#fy': 'fromYear',
        '#ty': 'toYear',
        '#mk': 'marka',
        '#mdl': 'model',
      },
      ExpressionAttributeValues: marshall({
        ':fy': fromYear,
        ':ty': toYear,
        ':mk': marka,
        ':mdl': model,
      }),
      ReturnValues: 'ALL_NEW',
    };

    const updateItemCommand = new UpdateItemCommand(params);
    const updateData = await dynamoDB.send(updateItemCommand);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Settings saved successfully',
          updateData: updateData,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error saving settings',
      }),
    };
  }
};
