// ロードマップ、登録フォーム　テスト用アカウントへ移行　本番アカウントの準備

var ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('LINE_TOKEN');
var userProperties = PropertiesService.getUserProperties();  // データ一時保存用

var count = 0;
var year = 0;
var month = 0;
var day = 0;
var area = "";
var getToday = new Date();
var datetime;
var datetimeArray = new Array();

let es_BeyBladeX = SpreadsheetApp.openById("1MzrtAXF9dvKUp8IGSOPvkpKTMyQE2-dfuk0QOqG3M8w");  // シート初期化
let es_BeyBladeX_sheet = es_BeyBladeX.getSheetByName("Sort");  // 検索対象のシートを取得
let es_BeyBladeX_data = es_BeyBladeX_sheet.getDataRange().getValues();  // シート内容を全て配列に格納
var es_BeyBladeX_date = "";  // シートから読み取った日付を格納する
var es_BeyBladeX_area = ""; // シートから読み取った都道府県を格納する
var es_BeyBladeX_message = "";


// 応答メッセージ用のAPI URL
var url = 'https://api.line.me/v2/bot/message/reply';

function doPost(e) {
  var event = JSON.parse(e.postData.contents).events[0];
  var userId = event.source.userId;

  // 応答トークン
  var replyToken = event.replyToken;

  // ユーザーからのメッセージ
  var userMessage = event.message.text;

  if (userMessage === '検索') {
    userMessage = "日程を入力して検索しますか？\n日程を指定しない場合、本日の日付で検索いたします";
    yearJudgment(replyToken, userMessage);
  }

  else if (userMessage === '年数を検索する') {
    userMessage = "年数を選んでください";
    yearSelect(replyToken, userMessage);
  }

  else if (userMessage === '年数を検索しない') {
    userMessage = "都道府県で検索しますか？\n都道府県を指定しない場合、日程のみで検索いたします";

    // 今日の日付を入れる
    userProperties.setProperty(userId + '_key_year',getToday.getFullYear());
    userProperties.setProperty(userId + '_key_month',getToday.getMonth()+1);
    userProperties.setProperty(userId + '_key_day',getToday.getDate());
    areaJudgment(replyToken, userMessage);
  }


  // 取得したテキストが 0年以上であること、年が含まれていることを確認する
  else if (parseInt(userMessage.replace("年", "")) >= 0 && userMessage.includes('年')) {
    userProperties.setProperty(userId + '_key_year',userMessage.replace("年", ""));  // プロパティに保存する
    userMessage = "月を選んでください";
    monthSelect(replyToken, userMessage);
  }

  // 取得したテキストが 1以上、12以下であること、月が含まれていることを確認する
  else if ((parseInt(userMessage.replace("月", "")) >= 1 || parseInt(userMessage.replace("月", "")) <= 12) && userMessage.includes('月')) {
    userProperties.setProperty(userId + '_key_month',userMessage.replace("月", ""));  // プロパティに保存する
    userMessage = "日を選んでください";
    dayFirstHalfSelect(replyToken, userMessage);
  }

  else if (userMessage === '15日以降を探す') {
    year = parseInt(userProperties.getProperty(userId + '_key_year'));  // 保存した内容を変数に格納する
    month = parseInt(userProperties.getProperty(userId + '_key_month'));  // 保存した内容を変数に格納する
    if (month === 4 || month === 6 || month === 9 || month === 11) {
      userMessage = "日を選んでください";
      dayLaterHalfMonth30Select(replyToken, userMessage);
    }

    else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
      userMessage = "日を選んでください";
      dayLaterHalfMonth31Select(replyToken, userMessage);
    }

    else if (month === 2 && (year%4) != 0) {  // 閏年でない場合
      userMessage = "日を選んでください";
      dayLaterHalfMonth28Select(replyToken, userMessage);
    }

    else if (month === 2 && (year%4) == 0) {  // 閏年である場合
      userMessage = "日を選んでください";
      dayLaterHalfMonth29Select(replyToken, userMessage);
    }

    else {
      userMessage = "入力された値が不正です\nやり直してください";
      sendMessage(replyToken, userMessage);
    }
  }

  else if (userMessage === '15日以前選択にもどる') {
    userMessage = "日を選んでください";
    dayFirstHalfSelect(replyToken, userMessage);
  }


  // 取得したテキストが 1以上、31以下であること、日が含まれていることを確認する
  else if ((parseInt(userMessage.replace("日", "")) >= 1 || parseInt(userMessage.replace("日", "")) <= 31) && userMessage.includes('日')) {
    userProperties.setProperty(userId + '_key_day',userMessage.replace("日", ""));  // プロパティに保存する
    userMessage = "都道府県で検索しますか？\n都道府県を指定しない場合、日程のみで検索いたします"
    areaJudgment(replyToken, userMessage);
  }

  else if (userMessage === '都道府県を検索する') {
    userMessage = "都道府県のエリアを選んでください\n画像が見えにくい場合は画像をタップしてください";
    areaSelect(replyToken, userMessage);
  }

  else if (userMessage === '都道府県を検索しない') {
    userProperties.setProperty(userId + '_key_area',"都道府県指定なし");  // プロパティに指定なしを保存する
    matchSheetReady();  // シート検索へ
  }



  else if (userMessage === '日程検索選択にもどる') {
    userMessage = "日程を入力して検索しますか？";
    yearJudgment(replyToken, userMessage);
  }

  else if (userMessage === '年選択にもどる') {
    userMessage = "年数を選んでください";
    yearSelect(replyToken, userMessage);
  }

  else if (userMessage === '月選択にもどる') {
    userMessage = "月を選んでください";
    monthSelect(replyToken, userMessage);
  }

  else if (userMessage === '日選択にもどる') {
    userMessage = "日を選んでください";
    dayFirstHalfSelect(replyToken, userMessage);
  }

  else if (userMessage === 'エリア選択にもどる') {
    userMessage = "都道府県のエリアを選んでください";
    areaSelect(replyToken, userMessage);
  }

  else if (userMessage === '都道府県検索選択にもどる') {
    userMessage = "都道府県で検索しますか？"
    areaJudgment(replyToken, userMessage);
  }


  else if (userMessage === 'キャンセル') {  // ToDo プロパティを削除機能を実装する（メニューに追加でもいいかも）
    userMessage = "キャンセルを受け付けました\n最初からやり直してください";
    
    // プロパティ削除（null になる）
    userProperties.deleteProperty(userId + '_key_year');
    userProperties.deleteProperty(userId + '_key_month');
    userProperties.deleteProperty(userId + '_key_day');
    userProperties.deleteProperty(userId + '_key_area');
    sendMessage(replyToken, userMessage);
  }


  else if (userMessage === 'このアカウントについて') {
    userMessage = "本アカウントは、BEYBLADEX の交流会等のイベントにおける情報を、戦いに飢える戦士たちに共有する非公式のアカウントです\n\nまた、こちらはベイブレードチームとは一切の関係はなく、本アカウント外で起きた事態に制作側は、一切の責任を負いかねますのでご了承ください";
    sendMessage(replyToken, userMessage);
  }

  else if (userMessage === 'ヘルプ') {
    userMessage = "本アカウントは、projectGoYa 制作です\n利用方法はこちらです\nhttps://goyalab.hatenablog.com/entry/2023/08/10/060000\n\nお困りの方は、こちらのトークに直接ご入力ください\n担当者が確認して返答いたします";
    sendMessage(replyToken, userMessage);
  }

  // 地方を含む場合
  else if (userMessage.includes('地方')) {
    if (userMessage.replace("地方", "") === '東北') {
      userMessage = "東北地方の都道府県を検索します\n画像が見えにくい場合は画像をタップしてください";
      areaTohoku(replyToken, userMessage);
    }

    else if (userMessage.replace("地方", "") === '関東') {
      userMessage = "関東地方の都道府県を検索します\n画像が見えにくい場合は画像をタップしてください";
      areaKanto(replyToken, userMessage);
    }

    else if (userMessage.replace("地方", "") === '中部') {
      userMessage = "中部地方の都道府県を検索します\n画像が見えにくい場合は画像をタップしてください";
      areaChubu(replyToken, userMessage);
    }

    else if (userMessage.replace("地方", "") === '関西') {
      userMessage = "関西地方の都道府県を検索します\n画像が見えにくい場合は画像をタップしてください";
      areaKansai(replyToken, userMessage);
    }

    else if (userMessage.replace("地方", "") === '中国') {
      userMessage = "中国地方の都道府県を検索します\n画像が見えにくい場合は画像をタップしてください";
      areaChugoku(replyToken, userMessage);
    }

    else if (userMessage.replace("地方", "") === '四国') {
      userMessage = "四国地方の都道府県を検索します\n画像が見えにくい場合は画像をタップしてください";
      areaShikoku(replyToken, userMessage);
    }

    else if (userMessage.replace("地方", "") === '九州') {
      userMessage = "九州地方の都道府県を検索します\n画像が見えにくい場合は画像をタップしてください";
      areaKyushu(replyToken, userMessage);
    }

    else {
      userMessage = "入力された値が不正です\nやり直してください";
      sendMessage(replyToken, userMessage);
    }
  }

  else if (userMessage.includes('都') || userMessage.includes('道') || userMessage.includes('府') || userMessage.includes('県')) {
    userProperties.setProperty(userId + '_key_area',userMessage);  // プロパティに保存する
    matchSheetReady();
  }

  else if (userMessage === '検索を開始する') {
    // データを解放する
    year = parseInt(userProperties.getProperty(userId + '_key_year'));
    month = parseInt(userProperties.getProperty(userId + '_key_month'));
    day = parseInt(userProperties.getProperty(userId + '_key_day'));
    area = userProperties.getProperty(userId + '_key_area');

    // 0埋め
    // month = ( '00' + month ).slice(-2);
    // day = ( '00' + day ).slice(-2);

    // 持ってきた日付を datetime に変換する
    // datetime = new Date(year + '/' + month + '/' + day);

    // // 持ってきた日付を 1週間取得して、配列に格納する
    // for (var i = 0; i < 7; i++) {
    //   datetimeArray[i] = new Date(datetime).setDate(datetime.getDate()+i);
    //   userMessage += Utilities.formatDate(datetimeArray[i], 'Asia/Tokyo', 'yyyy-MM-dd'); // ここ治す
    // }

    // 検索
    matchSheet();   
  }

  else if (userMessage === '条件を見直す') {
    // ToDo 終了機能実装
    userMessage = "見直す項目を選択してください\n終了後はメニューから「終了」をお選びください\n\n現在この機能は準備中のため、初めからやり直してください";
    sendMessage(replyToken, userMessage);
  }



  function matchSheetReady() {
    // データを解放する
    year = parseInt(userProperties.getProperty(userId + '_key_year'));
    month = parseInt(userProperties.getProperty(userId + '_key_month'));
    day = parseInt(userProperties.getProperty(userId + '_key_day'));
    area = userProperties.getProperty(userId + '_key_area');

    // 日付がきちんと入っている場合（日付は入れない or 入れるを選択、都道府県を入れるを選択）
    if (year != null && month != null && day != null && area != null) {
      // その日付から１週間検索かつ都道府県でフィルタ？当日のみでもいいかも？
      userMessage = "以下の内容で検索を行いますが、よろしいでしょうか？\n" + year + "年" + month + "月" + day + "日" + "\n" + area;
      sheetReadyJudgment(replyToken, userMessage);
    }

    // 日付がきちんと入っている場合（日付は入れない or 入れるを選択、都道府県を入れないを選択）
    else if (year != null && month != null && day != null) {
      userMessage = "以下の内容で検索を行いますが、よろしいでしょうか？\n" + year + "年" + month + "月" + day + "日" + "\n" + area;
      sheetReadyJudgment(replyToken, userMessage);
    }

    else {
      userMessage = "どこかしらに不備があるようです\n以下に、ご入力いただいている情報を表示いたしますのでご確認ください\n※「null」と表示されている箇所が不備箇所になります\n年月日：" + year + "年" + month + "月" + day + "日" + "\n都道府県：" + area;
      sendMessage(replyToken, userMessage);
    }
  }



  function matchSheet() {
    for(let j = 1; j < es_BeyBladeX_data.length; j++){
      // シートから取得した値を組み立てて、日付にする
      es_BeyBladeX_date = es_BeyBladeX_data[j][0].getFullYear() + "/" + parseInt(es_BeyBladeX_data[j][0].getMonth()+1) + "/" + es_BeyBladeX_data[j][0].getDate();

      // シートから都道府県を抽出する
      es_BeyBladeX_area = es_BeyBladeX_data[j][3];

      // 入力した値を組み立てて、日付にする
      var inputDate = year + "/" + month + "/" + day;

      if (area != "都道府県指定なし") {  // 都道府県を指定した場合
        // 一致しているか
        if (es_BeyBladeX_area == area && es_BeyBladeX_date == inputDate) {
          for(let k = 0; k < es_BeyBladeX_data[0].length; k++) {  // 一番上の項目分繰り返し、一致したデータを出力する
            switch (k) {
              case 0:
                es_BeyBladeX_message += "日付\n　" + es_BeyBladeX_data[j][k].getFullYear() + "/" + parseInt(es_BeyBladeX_data[j][k].getMonth()+1).toString().padStart(2, '0') + "/" + es_BeyBladeX_data[j][k].getDate().toString().padStart(2, '0') + "\n\n";
                break;
                
              case 1:
                es_BeyBladeX_message += "開始時間\n　" + es_BeyBladeX_data[j][k].getHours().toString().padStart(2, '0') + ":" + es_BeyBladeX_data[j][k].getMinutes().toString().padStart(2, '0') + "\n\n";
                break;

              case 2:
                es_BeyBladeX_message += "終了時間\n　" + es_BeyBladeX_data[j][k].getHours().toString().padStart(2, '0') + ":" + es_BeyBladeX_data[j][k].getMinutes().toString().padStart(2, '0') + "\n\n";
                break;

              case 3:
                es_BeyBladeX_message += "開催場所 都道府県\n　" + es_BeyBladeX_data[j][k] + "\n\n";
                break;

              case 4:
                es_BeyBladeX_message += "開催場所 詳細\n　" + es_BeyBladeX_data[j][k] + "\n\n";
                break;

              case 5:
                es_BeyBladeX_message += "定員\n　" + es_BeyBladeX_data[j][k] + "人\n\n";
                break;

              case 6:
                es_BeyBladeX_message += "申込先\n　" + es_BeyBladeX_data[j][k] + "\n\n";
                break;

              case 7:
                es_BeyBladeX_message += "代表者名・連絡先など\n　" + es_BeyBladeX_data[j][k] + "\n\n";
                break;
                
              case 8:
                es_BeyBladeX_message += "その他連絡事項\n　" + es_BeyBladeX_data[j][k] + "\n\n---------------------\n\n";
                break;
              }
            }
          userMessage = es_BeyBladeX_message;
        }
      }

      else {  // 都道府県を指定しない場合
        // 一致しているか
        if (es_BeyBladeX_date == inputDate) {
          for(let k = 0; k < es_BeyBladeX_data[0].length; k++) {  // 一番上の項目分繰り返し、一致したデータを出力する
            switch (k) {
              case 0:
                es_BeyBladeX_message += "日付\n　" + es_BeyBladeX_data[j][k].getFullYear() + "/" + parseInt(es_BeyBladeX_data[j][k].getMonth()+1).toString().padStart(2, '0') + "/" + es_BeyBladeX_data[j][k].getDate().toString().padStart(2, '0') + "\n\n";
                break;
              
              case 1:
                es_BeyBladeX_message += "開始時間\n　" + es_BeyBladeX_data[j][k].getHours().toString().padStart(2, '0') + ":" + es_BeyBladeX_data[j][k].getMinutes().toString().padStart(2, '0') + "\n\n";
                break;

              case 2:
                es_BeyBladeX_message += "終了時間\n　" + es_BeyBladeX_data[j][k].getHours().toString().padStart(2, '0') + ":" + es_BeyBladeX_data[j][k].getMinutes().toString().padStart(2, '0') + "\n\n";
                break;

              case 3:
                es_BeyBladeX_message += "開催場所 都道府県\n　" + es_BeyBladeX_data[j][k] + "\n\n";
                break;

              case 4:
                es_BeyBladeX_message += "開催場所 詳細\n　" + es_BeyBladeX_data[j][k] + "\n\n";
                break;

              case 5:
                es_BeyBladeX_message += "定員\n　" + es_BeyBladeX_data[j][k] + "人\n\n";
                break;

              case 6:
                es_BeyBladeX_message += "申込先\n　" + es_BeyBladeX_data[j][k] + "\n\n";
                break;

              case 7:
                es_BeyBladeX_message += "代表者名・連絡先など\n　" + es_BeyBladeX_data[j][k] + "\n\n";
                break;
              
              case 8:
                es_BeyBladeX_message += "その他連絡事項\n　" + es_BeyBladeX_data[j][k] + "\n\n---------------------\n\n";
                break;
            }
          }
          userMessage = es_BeyBladeX_message;
        }
      }

      if (es_BeyBladeX_message.length < 1) {  // 何も情報を得られなかったとき
        userMessage = "出力完了しました\n何も表示されない場合は、一致したデータがありませんでした\n\n検索した条件\n" + year + "年" + month + "月" + day + "日" + "\n" + area;
      }
    }
    sendMessage(replyToken, userMessage);
  }

  // todo 終わったとき、何も表示されなかったとき、もう一回やるかの質問

  function sendMessage(replyToken, userMessage){  
    UrlFetchApp.fetch(url, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': replyToken,
        'messages': [{
          'type': 'text',
          'text': userMessage,
        }]
      })
    });
    return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
  }
}
