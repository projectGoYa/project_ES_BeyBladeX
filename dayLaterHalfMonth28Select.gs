function dayLaterHalfMonth28Select(replyToken, userMessage) {
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
        "altText": "dayLaterHalfMonth28Selecter",
        "template": {
         "type": "carousel",
          "actions": [],
          "columns": [
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "16日",
              "text": "16日"
            },
            {
              "type": "message",
              "label": "17日",
              "text": "17日"
            },
            {
              "type": "message",
              "label": "18日",
              "text": "18日"
            }]
          },
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "19日",
              "text": "19日"
            },
            {
              "type": "message",
              "label": "20日",
              "text": "20日"
            },
            {
              "type": "message",
              "label": "21日",
              "text": "21日"
            }]
          },
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "22日",
              "text": "22日"
            },
            {
              "type": "message",
              "label": "23日",
              "text": "23日"
            },
            {
              "type": "message",
              "label": "24日",
              "text": "24日"
            }]
          },
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "25日",
              "text": "25日"
            },
            {
              "type": "message",
              "label": "26日",
              "text": "26日"
            },
            {
              "type": "message",
              "label": "27日",
              "text": "27日"
            }]
          },
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "28日",
              "text": "28日"
            },
            {
              "type": "message",
              "label": "　",
              "text": "　"
            },
            {
              "type": "message",
              "label": "　",
              "text": "　"
            }]
          },
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "もどる",
              "text": "15日以前選択にもどる"
            },
            {
              "type": "message",
              "label": "キャンセル",
              "text": "キャンセル"
            },
                        {
              "type": "message",
              "label": "　",
              "text": "　"
            }]
          }]
        }
      }]
    })
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}
