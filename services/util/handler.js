'use strict';

export default function handler(lambda) {
    return async function(event, context) {
        let body, statusCode;

        try {
            // Run the lambda
            body = await lambda(event, context);
            statusCode = 200;
        } catch (e) {
            console.error(e);
            statusCode = 500;
            body = { error: e.message };
        }
        return {
            statusCode,
            body: JSON.stringify(body)
        };
    };
};