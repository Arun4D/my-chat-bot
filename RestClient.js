
module.exports = {
    createJiraIssue: function (applicationName, incidentType, priority, summary, description) {

        console.log(applicationName + ':' + incidentType + ':' + priority + ':' + summary + ':' + description)

        var response = createjiraAction(applicationName, incidentType, priority, summary, description).then(response => {

            return response;
        }).catch(e => {
            console.log('There has been a problem with your fetch operation: ' + e.message);
        });
    }
}

const createjiraAction = async (applicationName, incidentType, priority, summary, description) => {


    const response = await fetch('https://arun4d.atlassian.net/rest/api/3/issue', {
        method: 'POST',
        body: `{
            "fields": {
                "summary": "${summary}",
                "issuetype": {
                    "id": "10001"
                },
                "project": {
                    "key": "BT"
                },
                "customfield_10037": {
                    "value": "${applicationName}"
                },
                "customfield_10038": {
                    "value": "${incidentType}"
                },
                "description": {
                    "type": "doc",
                    "version": 1,
                    "content": [
                      {
                        "type": "paragraph",
                        "content": [
                          {
                            "text": "${description}",
                            "type": "text"
                          }
                        ]
                      }
                    ]
                  }
                }
            }
        }`,
        headers: {
            'Authorization': `Basic ${Buffer.from(
                'arungce***@gmail.com:**'
            ).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    console.log(response)
    return myJson;
}
