'use strict';

import handler from "../util/handler";
import dynamodb from "../util/dynamodb";

export const main = handler(async event => {
    const params = {
        TableName: process.env.TABLE_NAME,
        // 'Key' defines the partition key and sort key of the item to be retrieve
        Key: {
            userId: '123',
            noteId: event.pathParameters.id
        }
    };
    const result = await dynamodb.get(params);
    if (!result.Item) {
        throw new Error('Item not found');
    }
    // Return the retrieved item
    return result.Item;
});