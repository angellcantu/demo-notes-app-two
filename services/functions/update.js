'use strict';

import handler from "../util/handler";
import dynamodb from "../util/dynamodb";

export const main = handler(async event => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME,
        // 'Key' defines the partition key and sort key of the item to be updated
        Key: {
            userId: '123',
            noteId: event.pathParameters.id // The id of note from the path
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ':content': data.content || null,
            ':attachment': data.attachment || null
        },
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: 'ALL_NEW'
    };
    await dynamodb.update(params);
    return { success: true };
});