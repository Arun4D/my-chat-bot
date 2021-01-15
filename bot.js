// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, CardFactory, MessageFactory, TurnContext } = require('botbuilder');
const card = require('./resources/InputFormCard.json');
const { createJiraIssue } = require('./RestClient.js');

class EchoBot extends ActivityHandler {
    
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            var modifiedText = TurnContext.removeMentionText(context.activity, context.activity.recipient.id);

            if(context.activity.value)
            {
                createJiraIssue(context.activity.value.applicationName, context.activity.value.incidentType, context.activity.value.priority, context.activity.value.summary, context.activity.value.description);
                await context.sendActivity(`Application Name: ${context.activity.value.applicationName}\n\n\n\Incident Type: ${context.activity.value.incidentType}\n\n\n\nPriority: ${context.activity.value.priority}\n\n\n\description: ${context.activity.value.description}`);;
            }
            if (modifiedText && modifiedText == "@createjira") {
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
                    await context.sendActivity('Welcome to Incident Logger Channel !');
                    await context.sendActivity({ attachments: [inputCard] });
                }
            }
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
