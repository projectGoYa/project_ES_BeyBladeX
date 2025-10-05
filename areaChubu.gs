function areaChubu(replyToken, userMessage) {
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
        "altText": "areaChubuSelecter",
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
              "label": "新潟",
              "text": "新潟県"
            },
            {
              "type": "message",
              "label": "富山",
              "text": "富山県"
            },
            {
              "type": "message",
              "label": "石川",
              "text": "石川県"
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
              "label": "福井",
              "text": "福井県"
            },
            {
              "type": "message",
              "label": "山梨",
              "text": "山梨県"
            },
            {
              "type": "message",
              "label": "長野",
              "text": "長野県"
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
              "label": "岐阜",
              "text": "岐阜県"
            },
            {
              "type": "message",
              "label": "静岡",
              "text": "静岡県"
            },
            {
              "type": "message",
              "label": "愛知",
              "text": "愛知県"
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
