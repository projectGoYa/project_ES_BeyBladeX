function daySelectTmp(replyToken, userMessage){
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
         "altText": "datetime_picker",
          "template": {
            "type": "buttons",
            "title": "日程入力",
            "text": "入力いただいた日程から１週間分が出力対象です",
            "actions": [
              {
                "type": "datetimepicker",
                "label": "日程入力を開く",
                "mode": "date",
                "data": "action=settime",
                "initial": "2023-07-15",
                "max": "2024-12-31",
                "min": "2023-06-01"
              }
            ]
          }
      }]
    })
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

