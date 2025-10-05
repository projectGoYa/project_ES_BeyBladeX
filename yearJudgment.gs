function yearJudgment(replyToken, userMessage) {
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      "messages": [{
        "type": "template",
        "altText": "yearJudge",
        "template": {
          "type": "confirm",
          "text": userMessage,
          "actions": [
          {
            "type": "message",
            "label": "はい",
             "text": "年数を検索する"
          },
          {
            "type": "message",
            "label": "いいえ",
            "text": "年数を検索しない"
          }
          ],
        }
      }]
    })
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
