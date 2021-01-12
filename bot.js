// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, CardFactory, MessageFactory, TurnContext } = require('botbuilder');
const card = require('./resources/InputFormCard.json');

class EchoBot extends ActivityHandler {
    
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            var modifiedText = TurnContext.removeMentionText(context.activity, context.activity.recipient.id);

            if(context.activity.value)
            {
                await context.sendActivity(`Application Name: ${context.activity.value.applicationName}\n\n\n\Incident Type: ${context.activity.value.incidentType}\n\n\n\nPriority: ${context.activity.value.priority}\n\n\n\ddescription: ${context.activity.value.description}`);;
            }
            if (modifiedText && modifiedText.includes("@create") == true) {
                const inputCard = CardFactory.adaptiveCard(card);
                await context.sendActivity({ attachments: [inputCard] });
            }
            await next();
        });
 
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    const inputCard = CardFactory.adaptiveCard(card);
                    await context.sendActivity('Hello world!');
                    await context.sendActivity({ attachments: [inputCard] });
                }
            }
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
