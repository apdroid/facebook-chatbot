 const fetch = require('node-fetch');

    // You can find your project ID in your Dialogflow agent settings
    const projectId = 'newagent-4f39e'; //https://dialogflow.com/docs/agents#settings
    const sessionId = '123456';
    const languageCode = 'en-US';

    const dialogflow = require('dialogflow');

    const config = {
      credentials: {
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDhNYMI7LZxtf0N\nYMoo90pDkZizixymMeiMc6sKpR6ayfdg9b8Pap5u1WzRUIsOK4ZO6rnKX7NV0UBi\nagJ9yt/jv4tB5EZXPjeCAl3fYOVfbZhOYh2KTgVA9twU0bbNi9B6+1VEbw6Rsv4l\nz8aX94SkfdGLwwOn8ejzkcRIBw7fKuDmvJVYxtT1lMUVcQTI5YDr9VQQXFcAaoMu\njbHCYkc/6fNmDGWUUZ1p5/fBw4GO6xpCeVXqUeAe0mB3pg5McGp5HWWOwYVcG/l6\nD0CY/M9Eq6Kvad1GNrAql3IgJOZW9o0FQ8QcL+sLFoP+kYG46xNsshQGfZbDxqEL\nlYyQA8WtAgMBAAECggEAYE+dMSTiRTDZ/m2lJu3SgaDzV90nLF/tnpscy5mfw/yZ\nYYrW4YXsKWP2fHFgdnfgoUE6oTRaIloxmaTSWe933hMdP9max1ahMGVIte3fSfc5\nilPlZC9HiefIaNLixXaEewOfDHweE+sjSxJXUMgWnq37/jQxDRKkV/2/njn+fysu\nkVF/fwCEmbBJJFoHpZnxX3M0DJvPIeFZlDlqgnBSi9AdQlr0OC7z1QWcFEG9GDn2\n6cA6RoN/HB5cGP/nffpPuEaskY32ttJ2Oxy6B7D/2+Cz4VzJtBbxf9Lvrfdd4KaX\n9CAe2sQUZa8YkNBDJJzWD3bQQPAWPMOTrQARl5uF9QKBgQD8VGS0vPS9lrG8XaFh\ncKxPMilsMFa0+p2cMY+1JK+a0s0FHvnbkSF58464XSq+/GNXXszC1fPU6FKfMCSs\nTGftLa7imO5ypAVBnWo8on7UmDSk46W6eeayqiBVZ5VQM2M1lawaRRBcj+93ZV0/\nz4Bx0OnMeH6M+jMmKnHIEmZkIwKBgQDkfCDwEWviiZSXpqMzcAfOghUqWGRM8Rt8\nymFizMkWsMWi0SQI4hWtUp8O6R/ScESY68ZVEiQHGygTRbu+sYvLTZ7JU65evA95\nc+xQh59sTWknz97Q3eYTV+ylAHkLiesT5GXiD7pCKxHfy/kGB7SJsV4EPS8noTSO\nEJfrek6j7wKBgQCJK6uvYUU+x2wJtXCkkubpCqDgEosgSVli7sJru+zGorAXh5ZW\nmVf0fsXoTaWOO5AZkAyKIlsyM7WumjJlhAe/NOVsg6ykn6vH1rZJDiEamz+LH8IZ\nVGloWPnI082k0rqtB5eOlFrnpsuMQYtmw/vUY7ilkh9hriYeKla+Z9pHtwKBgAhm\nC6vnaAjOt9iPNoaIgrDzlSWWVDGD11fR9Jx2HJop60nd2C4/aT6Sv+gDZ7kLiWn5\nmLO90/cy51k2Af2zdwkFFGYgHlO7I/J58WDQa2rGuavN90nELlXdsIQsLUbgTfTQ\nO3KA037lKGYKkF/JXriE/Yi4Wwhg45apQ3xTZZqfAoGBAOGmgXtXkyLGSE4s/Iwi\nt7Vauu36N+BHnWrjl+o6ZtFsP/cxXOsHEgTobhHunMdJHKhEuelaF8PEfEf2SDww\njggOYSc1YAGLobEsIPtreAcrCMlC3+777THuo0Xjsqob1lsASCGmxK9EcX/AsavT\n81oCollYW1f4AXg/ZbicXJUU\n-----END PRIVATE KEY-----\n',
        client_email: 'dialogflow-actsbi@newagent-4f39e.iam.gserviceaccount.com'
      }
    };

    const sessionClient = new dialogflow.SessionsClient(config);

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // Remember the Page Access Token you got from Facebook earlier?
    // Don't forget to add it to your `variables.env` file.
    const FACEBOOK_ACCESS_TOKEN  = 'EAAEj7oN7J3IBABCwB7YDuOpfLotQuirbDiZADfOSOXMRubw0FSuGLR65YZB4ltHna9wwWTJ7Oqir61jXDOAaf886ASN94l1xiPZC0Jskv64QIUW2PcFQLmpnsZBHegDjrb9j5U1kNLerv2CTYgYV7vcnGB5F8gYbaE3LYLJ3TgZDZD';

    const sendTextMessage = (userId, text) => {
      return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            messaging_type: 'RESPONSE',
            recipient: {
              id: userId,
            },
            message: {
              text,
            },
          }),
        }
      );
    }

    module.exports = (event) => {
      const userId = event.sender.id;
      const message = event.message.text;

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: languageCode,
          },
        },
      };

      sessionClient
        .detectIntent(request)
        .then(responses => {
          const result = responses[0].queryResult;
          return sendTextMessage(userId, result.fulfillmentText);
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }