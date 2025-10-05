function areaSelect(replyToken, userMessage) {
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
        "altText": "areaSelecter",
        "template": {
         "type": "carousel",
          "actions": [],
          "columns": [
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
              "label": "北海道",
              "text": "北海道"
            },
            {
              "type": "message",
              "label": "東北地方",
              "text": "東北地方"
            },
            {
              "type": "message",
              "label": "関東地方",
              "text": "関東地方"
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
              "label": "中部地方",
              "text": "中部地方"
            },
            {
              "type": "message",
              "label": "関西地方",
              "text": "関西地方"
            },
            {
              "type": "message",
              "label": "中国地方",
              "text": "中国地方"
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
              "label": "四国地方",
              "text": "四国地方"
            },
            {
              "type": "message",
              "label": "九州地方",
              "text": "九州地方"
            },
            {
              "type": "message",
              "label": "沖縄",
              "text": "沖縄県"
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
              "text": "都道府県検索選択にもどる"
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
