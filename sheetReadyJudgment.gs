function sheetReadyJudgment(replyToken, userMessage) {
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
        "altText": "sheetReadyJudge",
        "template": {
          "type": "confirm",
          "text": userMessage,
          "actions": [
          {
            "type": "message",
            "label": "はい",
             "text": "検索を開始する"
          },
          {
            "type": "message",
            "label": "いいえ",
            "text": "条件を見直す"
          }
          ],
        }
      }]
    })
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}


