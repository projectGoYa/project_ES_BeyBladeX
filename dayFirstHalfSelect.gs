function dayFirstHalfSelect(replyToken, userMessage) {
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
        "altText": "dayFirstHalfSelecter",
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
              "label": "1日",
              "text": "1日"
            },
            {
              "type": "message",
              "label": "2日",
              "text": "2日"
            },
            {
              "type": "message",
              "label": "3日",
              "text": "3日"
            }]
          },
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "4日",
              "text": "4日"
            },
            {
              "type": "message",
              "label": "5日",
              "text": "5日"
            },
            {
              "type": "message",
              "label": "6日",
              "text": "6日"
            }]
          },
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "7日",
              "text": "7日"
            },
            {
              "type": "message",
              "label": "8日",
              "text": "8日"
            },
            {
              "type": "message",
              "label": "9日",
              "text": "9日"
            }]
          },
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "10日",
              "text": "10日"
            },
            {
              "type": "message",
              "label": "11日",
              "text": "11日"
            },
            {
              "type": "message",
              "label": "12日",
              "text": "12日"
            }]
          },
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "13日",
              "text": "13日"
            },
            {
              "type": "message",
              "label": "14日",
              "text": "14日"
            },
            {
              "type": "message",
              "label": "15日",
              "text": "15日"
            }]
          },
          {
            "title": "検索したい日を選択してください",
            "text": userMessage,
            "actions": [
            {
              "type": "message",
              "label": "15日以降を探す",
              "text": "15日以降を探す"
            },
            {
              "type": "message",
              "label": "もどる",
              "text": "月選択にもどる"
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
