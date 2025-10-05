function areaChugoku(replyToken, userMessage) {
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
        "altText": "areaChugokuSelecter",
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
              "label": "鳥取",
              "text": "鳥取県"
            },
            {
              "type": "message",
              "label": "島根",
              "text": "島根県"
            },
            {
              "type": "message",
              "label": "岡山",
              "text": "岡山県"
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
              "label": "広島",
              "text": "広島県"
            },
            {
              "type": "message",
              "label": "山口",
              "text": "山口県"
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
