function areaKyushu(replyToken, userMessage) {
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
        "altText": "areaKyushuSelecter",
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
              "label": "福岡",
              "text": "福岡県"
            },
            {
              "type": "message",
              "label": "佐賀",
              "text": "佐賀県"
            },
            {
              "type": "message",
              "label": "長崎",
              "text": "長崎県"
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
              "label": "熊本",
              "text": "熊本県"
            },
            {
              "type": "message",
              "label": "大分",
              "text": "大分県"
            },
            {
              "type": "message",
              "label": "宮崎",
              "text": "宮崎県"
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
              "label": "鹿児島",
              "text": "鹿児島県"
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
