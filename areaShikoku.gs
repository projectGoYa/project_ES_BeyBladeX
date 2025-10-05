function areaShikoku(replyToken, userMessage) {
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
        "altText": "areaShikokuSelecter",
        "template": {
         "type": "carousel",
          "actions": [],
          "columns": [
          {
            "thumbnailImageUrl": "https://cdn-ak.f.st-hatena.com/images/fotolife/g/goyalab/20230803/20230803004021.jpg",
            "title": "検索したい都道府県を選択してください",
            "text": userMessage,
            "defaultAction": {
              "type": "uri",
              "label": "View detail",
              "uri": "https://cdn-ak.f.st-hatena.com/images/fotolife/g/goyalab/20230803/20230803004021.jpg"
            },            
            "actions": [
            {
              "type": "message",
              "label": "徳島",
              "text": "徳島県"
            },
            {
              "type": "message",
              "label": "香川",
              "text": "香川県"
            },
            {
              "type": "message",
              "label": "愛媛",
              "text": "愛媛県"
            }]
          },
          {
            "thumbnailImageUrl": "https://cdn-ak.f.st-hatena.com/images/fotolife/g/goyalab/20230803/20230803004021.jpg",
            "title": "検索したい都道府県を選択してください",
            "text": userMessage,
            "defaultAction": {
              "type": "uri",
              "label": "View detail",
              "uri": "https://cdn-ak.f.st-hatena.com/images/fotolife/g/goyalab/20230803/20230803004021.jpg"
            },            
            "actions": [
            {
              "type": "message",
              "label": "高知",
              "text": "高知県"
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
            "thumbnailImageUrl": "https://cdn-ak.f.st-hatena.com/images/fotolife/g/goyalab/20230803/20230803004021.jpg",
            "title": "検索したい都道府県のエリアを選択してください",
            "text": userMessage,
            "defaultAction": {
              "type": "uri",
              "label": "View detail",
              "uri": "https://cdn-ak.f.st-hatena.com/images/fotolife/g/goyalab/20230803/20230803004021.jpg"
            },            
            "actions": [
            {
              "type": "message",
              "label": "もどる",
              "text": "エリア選択にもどる"
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
