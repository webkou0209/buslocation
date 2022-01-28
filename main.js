
var center_lat,center_lng;
  var map;
  var bus, busA,busB,busC,busD; //バスの位置情報を格納
  var markerA, markerB, markerC, markerD, marker; //マーカーオブジェクト
  var kA, kB, kC, kD; //csv取得回数カウント
  var break_flag = 0; //1がピン表示状態，0が非表示状態
  var locA = [];
  var locB = [];
  var locC = [];
  var locD = [];
  var myIntervalA, myIntervalB, myIntervalC, myIntervalD;
  var diffSecondA, diffSecondB, diffSecondC, diffSecondD;
  var typeTextA, typeTextB, typeTextC, typeTextD;

  var buscount = "5";
  var busstop = new Array(buscount);

  //設定初期値
  var settingTime = 30;
  var color_selectA = "./img/red.png";
  var color_selectB = "./img/black.png";
  var color_selectC = "./img/blue.png";
  var color_selectD = "./img/green.png";

  var labelcolor_selectA = "#ff0000";
  var labelcolor_selectB = "#000000";
  var labelcolor_selectC = "#0000ff";
  var labelcolor_selectD = "#008000";



  //画面ロード時
  window.onload = function(){
    kA = 0;
    kB = 0;
    kC = 0;
    kD = 0;
    kE = 0;
    center_lat = 33.846200614669385;
    center_lng = 132.76481941424774;

      map = new google.maps.Map(document.getElementById("canvas"), {
          zoom: 15,
          center: new google.maps.LatLng(center_lat, center_lng),
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      display_busstop(); //バス停の表示

      display_information(); //運行情報の表示(初回)
      setInterval(display_information,3000); //運行情報の表示

  }


//チェエクボックスバリデーション
  function isCheck() {
    var arr_checkBoxes = document.getElementsByClassName("check");
    var count = 0;
    for (var i = 0; i < arr_checkBoxes.length; i++) {
        if (arr_checkBoxes[i].checked) {
            count++;
        }
    }
    if (count > 0) {
       display();
    } else {
        window.alert("表示する路線を1つ以上選択してください。");
        return false;
    };
}


//運行情報
function display_information(){ 

    getData("A");
    getData("B");
    getData("C");
    getData("D");

    setTimeout(function(){ 

        document.getElementById('informationA').innerHTML = "<b>運行中</b>";
        document.getElementById('informationB').innerHTML = "<b>運行中</b>";
        document.getElementById('informationC').innerHTML = "<b>運行中</b>";
        document.getElementById('informationD').innerHTML = "<b>運行中</b>";

        if(locA[0] == -1 && locA[1] == -1){
            document.getElementById('informationA').innerHTML="<b style='color:red;'>現在運行しておりません</b>";
        }
        if(locB[0] == -1 && locB[1] == -1){
        document.getElementById('informationB').innerHTML="<b style='color:red;'>現在運行しておりません</b>";
        } 
        if(locC[0] == -1 && locC[1] == -1){
            document.getElementById('informationC').innerHTML="<b style='color:red;'>現在運行しておりません</b>";
        }
        if(locD[0] == -1 && locD[1] == -1){
            document.getElementById('informationD').innerHTML="<b style='color:red;'>現在運行しておりません</b>";   
        }
    

    }, 500);





}

//アイコン表示
function display(){
    var checked_bus = [];  

    center_lat = 33.846200614669385;
    center_lng = 132.76481941424774;

      map = new google.maps.Map(document.getElementById("canvas"), {
          zoom: 15,
          center: new google.maps.LatLng(center_lat, center_lng),
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      display_busstop(); //バス停の表示


    if(break_flag == 0){
      break_flag = 1; 
    }
    else if( break_flag = 1){
      break_flag = 0;
    }
   
    console.log( break_flag );

    checked_bus  = document.querySelectorAll("input[name=bus_selection]:checked");

      if( 0 < checked_bus.length ) {
        for(var checked_data of checked_bus) {
          console.log(checked_data.value);
          if(checked_data.value == "A"){
            if(break_flag ==1){
              myIntervalA = setInterval(location_update,2000,"A");
            }
          }
          else if(checked_data.value == "B"){
            if(break_flag ==1){
              myIntervalB = setInterval(location_update,2000,"B");
            }
          }
          else if(checked_data.value == "C"){
            if(break_flag ==1){
              myIntervalC = setInterval(location_update,2000,"C");
            }
          }
          else if(checked_data.value == "D"){
            if(break_flag ==1){
              myIntervalD = setInterval(location_update,2000,"D");
            }
          }
        }
      }

      
}




function location_update(checked_bus){
      if(checked_bus == "A"){
          getData("A");

          if(locA[3] == 1){
            typeTextA="上り";
          }
          else if(locA[3] == 2){
            typeTextA = "下り";
          }

          //1つ前のAピンを消す
          if(kA != 0){
            markerA.setMap(null);
          }
          kA++;

      setTimeout(function(){ // 処理の実行に1秒の遅延(getData待ち)
            busA = new google.maps.LatLng(locA[0], locA[1]);
            //路線ピン
            markerA = new google.maps.Marker({
              position: busA,
              map: map,
              icon: {
                url: color_selectA,
                labelOrigin: new google.maps.Point(10, -20)  //ラベルの基点
            },
              label: {
                text: '路線A('+ typeTextA + ')',         //ラベル文字
                color: labelcolor_selectA,          //ラベル文字の色
                fontFamily: 'sans-serif',  //フォント 
                fontWeight: 'bold',        //フォントの太さ 
                fontSize: '20px'           //フォントのサイズ 
             } 
            });
            getDiffSecond("A");
        //透過処理
        if(diffSecondA >= settingTime){
            markerA.setOpacity(0.5);
        }

        }, 500);
    }



      else if(checked_bus == "B"){
        getData("B");

        if(locB[3] == 1){
          typeTextB="上り";
        }
        else if(locB[3] == 2){
          typeTextB = "下り";
        }

        //1つ前のBピンを消す
        if(kB != 0){
          markerB.setMap(null);
        }
        kB++;

        setTimeout(function(){ // 処理の実行に1秒の遅延
        busB = new google.maps.LatLng(locB[0], locB[1]);
        //Bピン設置
        markerB = new google.maps.Marker({
          position: busB,
          map: map,
          icon: {
            url: color_selectB,
            labelOrigin: new google.maps.Point(10, -20)  //ラベルの基点
        },
          label: {
            text: '路線B('+ typeTextB + ')',         //ラベル文字
            color: labelcolor_selectB,          //ラベル文字の色
            fontFamily: 'sans-serif',  //フォント 
            fontWeight: 'bold',        //フォントの太さ 
            fontSize: '20px'           //フォントのサイズ 
         } 
        });
        
        getDiffSecond("B");
        //透過処理
        if(diffSecondB >= settingTime){
            markerB.setOpacity(0.5);
        }
      }, 500);
      }



      else if(checked_bus == "C"){
        getData("C");

        if(locC[3] == 1){
          typeTextC="上り";
        }
        else if(locD[3] == 2){
          typeTextC = "下り";
        }

        //1つ前のCピンを消す
        if(kC != 0){
          markerC.setMap(null);
        }
        kC++;

        setTimeout(function(){ // 処理の実行に1秒の遅延
        busC = new google.maps.LatLng(locC[0], locC[1]);
        //路線ピン
        markerC = new google.maps.Marker({
          position: busC,
          map: map,
          icon: {
            url: color_selectC,
            labelOrigin: new google.maps.Point(10, -20)  //ラベルの基点
        },
          label: {
            text: '路線C('+ typeTextC + ')',         //ラベル文字
            color: labelcolor_selectC,          //ラベル文字の色
            fontFamily: 'sans-serif',  //フォント 
            fontWeight: 'bold',        //フォントの太さ 
            fontSize: '20px'           //フォントのサイズ 
         } 
        });
        getDiffSecond("C");
        //透過処理
        if(diffSecondC >= settingTime){
            markerC.setOpacity(0.5);
        }

      }, 500);
      }



      else if(checked_bus == "D"){
        getData("D");

        if(locD[3] == 1){
          typeTextD="上り";
        }
        else if(locD[3] == 2){
          typeTextD = "下り";
        }

        //1つ前のDピンを消す
        if(kD != 0){
          markerD.setMap(null);
        }
        kD++;

        setTimeout(function(){ // 処理の実行に1秒の遅延
        busD = new google.maps.LatLng(locD[0], locD[1]);
        //路線Dピン
        markerD = new google.maps.Marker({
          position: busD,
          map: map,
         
          icon: {
            url: color_selectD,
            labelOrigin: new google.maps.Point(10, -20)  //ラベルの基点
        },
          label: {
            text: '路線D('+ typeTextD + ')',         //ラベル文字
            color: labelcolor_selectD,          //ラベル文字の色
            fontFamily: 'sans-serif',  //フォント 
            fontWeight: 'bold',        //フォントの太さ 
            fontSize: '20px'           //フォントのサイズ 
         } 
        });

        getDiffSecond("D");
        //透過処理
        if(diffSecondD >= settingTime){
            markerD.setOpacity(0.5);
        }
 
      }, 500);
      }

     
 
      if(break_flag == 0){
        clearInterval(myIntervalA);
        clearInterval(myIntervalB);
        clearInterval(myIntervalC);
        clearInterval(myIntervalD);
        setTimeout(function(){ 
          display();
      }, 1000);
      }
}




function getData(checked_value) {
    
    var data = {
      "code": checked_value,//選択されている路線を代入
    }

    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "ajax.php");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhr.send(json);
    xhr.onreadystatechange = function () {
      try {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            var result = JSON.parse(xhr.response);
            var location = [result.lat_value, result.lng_value, result.time_value, result.type_value, result.rosen_value];
            console.log(location);

            if(checked_value == "A"){
              locA = location;
            }
            else if(checked_value == "B"){
              locB = location;
            }
            else if(checked_value == "C"){
              locC = location;
            }
            else if(checked_value == "D"){
              locD = location;
            }
          } else {
          }
        } else {
        }
      } catch (e) {
      }
    };
  }


    
function getDiffSecond(rosen){
    var now = new Date(); //時刻保存用
    var Year = now.getFullYear();
    var Month = now.getMonth()+1;
    var Dates = now.getDate();
    var Hour = now.getHours();
    var Min = now.getMinutes();
    var Sec = now.getSeconds();
    
    var now_time = new Date(Year + "/" + Month + "/" +Dates + " " + Hour + ":" + Min + ":" + Sec);
    

    
      //現在時刻とcsv取得時刻の差分(秒)

    switch (rosen){
        case 'A':
            var get_time = new Date(locA[2]);
            var diffTime = now_time.getTime() - get_time.getTime();
            diffSecondA = diffTime / 1000;
          break;
        case 'B':
            var get_time = new Date(locB[2]);
            var diffTime = now_time.getTime() - get_time.getTime();
            diffSecondB = diffTime / 1000;
          break;
        case 'C':
            var get_time = new Date(locC[2]);
            var diffTime = now_time.getTime() - get_time.getTime();
            diffSecondC = diffTime / 1000;
            break;
        case 'D':
            var get_time = new Date(locD[2]);
            var diffTime = now_time.getTime() - get_time.getTime();
            diffSecondD = diffTime / 1000;
            break;
      }
  }


  function change_setting(){
    //時間
    settingTime = document.getElementById("judge_time").value;
    document.getElementById("display_judgetime").innerHTML = settingTime;
    //アイコン色
     color_selectA = document.getElementById("color_selectionA").value;
     color_selectB = document.getElementById("color_selectionB").value;
     color_selectC = document.getElementById("color_selectionC").value;
     color_selectD = document.getElementById("color_selectionD").value;
  

     //ラベル色
     labelcolor_selectA = document.getElementById("label_color_selectionA").value;
     labelcolor_selectB = document.getElementById("label_color_selectionB").value;
     labelcolor_selectC = document.getElementById("label_color_selectionC").value;
     labelcolor_selectD = document.getElementById("label_color_selectionD").value;
     
    dialog.close();
  }


  var dialog = document.querySelector('dialog');
  var btn_show = document.getElementById('show');
  var btn_close = document.getElementById('close');

  btn_show.addEventListener('click', function() {
    dialog.showModal();
  }, false);
  btn_close.addEventListener('click', function() {
    dialog.close();
  }, false);



function display_busstop(){
busstop[0] = [33.125966, 132.521684, '岩松公民館',
    33.124072, 132.520879, '岩松',
    33.122401, 132.520330, '津島病院前',
    33.075990, 132.486157, '嵐',
    33.059761, 132.483100, '柿之浦',
    33.060301, 132.471503, '大浦',
    33.060276, 132.469657, '盆ヶ裏',
    33.060417, 132.465384, '曲烏',
    33.056684, 132.455898, '平井分校前',
    33.055710, 132.452636, '佐治ヶ浦',
    33.055303, 132.448814, '平井',
    33.057259, 132.444115, '漁家'];

busstop[1] = [33.125966, 132.521684, '岩松公民館',
    33.124072, 132.520879, '岩松',
    33.132233, 132.524471, '久保津',
    33.128120, 132.536093, '稲中',
    33.125833, 132.540508, '相生橋',
    33.125582, 132.545714, '下芋地谷',
    33.123311, 132.551639, '岩淵',
    33.124218, 132.553132, '清満公民館前',
    33.115073, 132.546658, '吉井',
    33.112397, 132.545467, '豊田',
    33.108762, 132.543481, '追ノ川',
    33.105448, 132.541275, '海前',
    33.100984, 132.538496, '元屋敷',
    33.099049, 132.534744, '音地',
    33.095993, 132.531807, '繁近',
    33.088238, 132.531455, '本俵',
    33.056416, 132.557193, '上槙'];

busstop[2] = [33.125966, 132.521684, '岩松公民館',
    33.124072, 132.520879, '岩松',
    33.132233, 132.524471, '久保津',
    33.128120, 132.536093, '稲中',
    33.125833, 132.540508, '相生橋',
    33.125582, 132.545714, '下芋地谷',
    33.123311, 132.551639, '岩淵',
    33.124218, 132.553132, '清満公民館前',
    33.123295, 132.563435, '颪部',
    33.118813, 132.567155, '清重',
    33.115475, 132.568593, '山財芋地谷',
    33.110618, 132.571283, '又治郎',
    33.108580, 132.574853, '馬の渕',
    33.097743, 132.579616, '横吹',
    33.099653, 132.597223, '狩場',
    33.101422, 132.601721, '大道川',
    33.100062, 132.610116, '道の川',
    33.098501, 132.617731, '池の駄馬',
    33.097829, 132.623342, '御内',
    33.098487, 132.626518, '休養村管理センター',
    33.098328, 132.631250, '東谷口',
    33.097977, 132.634149, '御槙学校前',
    33.099361, 132.636745, '加塚橋',
    33.098883, 132.642086, '金比羅橋',
    33.091285, 132.646624, '犬除',
    33.083548, 132.654727, '祓川温泉',
    33.090751, 132.636295, '下槙',
    33.090903, 132.630159, '槙川',
    33.088665, 132.625331, '谷郷'];

busstop[3] = [33.125966, 132.521684, '岩松公民館',
    33.124072, 132.520879, '岩松',
    33.128845, 132.528708, '三島',
    33.126956, 132.535213, 'ふれあい荘',
    33.125833, 132.540508, '相生橋',
    33.125582, 132.545714, '下芋地谷',
    33.123311, 132.551639, '岩淵',
    33.124218, 132.553132, '清満公民館前',
    33.130939, 132.556676, '野井集会所',
    33.133922, 132.555303, '野井',
    33.126842, 132.565667, '寺ノ下',
    33.124264, 132.568291, '五郎丸',
    33.120938, 132.566831, '長野橋'];

busstop[4] = [33.848096, 132.769104, '鉄砲町',
    33.847998, 132.772909, '赤十字病院前',
    33.847675, 132.77443, '平和通一丁目',
    33.846582, 132.775459, '上一万',
    33.844337, 132.775298, '警察署前',
    33.841728, 132.774827, '勝山町',
    33.84114, 132.770327, '大街道駅',
    33.841055, 132.766259, '県庁前',
    33.839843, 132.764671, '市役所前',
    33.839273, 132.762439, '南堀端',
    33.835637, 132.761495, '松山市駅',
    33.839594, 132.759392, '南堀端(愛媛)',
    33.840022, 132.753813, '大手町',
    33.840984, 132.751882, 'JR松山駅前',
    33.843836, 132.751496, '宮田町',
    33.847044, 132.755015, '古町',
    33.851356, 132.756130, '萱町六丁目駅',
    33.853459, 132.757675, '本町六丁目',
    33.853673, 132.760465, '木屋町',
    33.849360, 132.763598, '高砂町',
    33.849325, 132.764628, '清水町'];



for(i=0;i<buscount;i++){
for(j=0;j<busstop[i].length;j+=3){
var busstop_marker = new google.maps.Marker({
  position: new google.maps.LatLng(busstop[i][j], busstop[i][j+1]),
  map: map,
  title: busstop[i][j+2],
  icon : 'img/busstop.png'
});
attachMessage(busstop_marker, busstop[i][j+2]);
}
}

}

function attachMessage(marker, msg) {
google.maps.event.addListener(marker, 'click', function(event) {
new google.maps.InfoWindow({
content: msg
}).open(marker.getMap(), marker);
});10
}


function UTCtime(dat){
    var year;
    var month;
    var day;
    var hour;
    var min;
    var sec;
    var msec;
    year = dat.substr(0,4);
    month = dat.substr(5,2);
    month = month - 1;
    day = dat.substr(8,2);
    hour = dat.substr(11,2);
    min = dat.substr(14,2);
    sec = dat.substr(17,2);
    msec = dat.substr(20,3);
    var time = Date.UTC(year, month, day, hour, min, sec, msec);
    return time;
}

