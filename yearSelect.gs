function yearSelect(replyToken, userMessage) {
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
        "altText": "yearSelecter",
        "template": {
         "type": "carousel",
          "actions": [],
          "columns": [
          {
            "title": "検索したい年を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "2023年",
              "text": "2023年"
            },
            {
              "type": "message",
              "label": "2024年",
              "text": "2024年"
            }]
          },
          {
            "title": "検索したい年を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "もどる",
              "text": "日程検索選択にもどる"
            },
            {
              "type": "message",
              "label": "キャンセル",
              "text": "キャンセル"
            }]
          }]
        }
      }]
    })
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
