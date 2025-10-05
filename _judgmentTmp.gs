function judgmentTmp(replyToken, userMessage) {
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      "messages": [{
        "type": "text",
        "text": userMessage,
        'quickReply': {
        'items': [{
            'type': 'action',
            'action': {
              'type': 'message',
              'label': 'はい',
              "text": 'はい',
            }
          },
          {
            'type': 'action',
            'action': {
              'type': 'message',
              'label': 'いいえ',
              "text": 'いいえ',
            }
          },
                    {
            'type': 'action',
            'action': {
              "type": "datetimepicker",
              "label": "datetime",
              "data": "action=settime",
              "mode": "date",
              "initial": "2023-07-15",
              "max": "2024-12-31",
              "min": "2023-06-01",
            }
          }
        ]}
      }]
    })
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
