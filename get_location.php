<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>コミュニティバス(運転手用)</title>
</head>
<body>
    <header><h1>バスロケーションシステム(運転手用)</h1></header>


    <input onclick="click_button()" type="button" value="位置情報取得開始" id="start_button"></input>

    <div class="displayArea">
        <div id = "lat_area">
            <p>緯度：</P>
        </div>
        <div id = "lng_area">
            <p>経度：</P>
        </div>
        <div id ="time_area">
            <p>取得日時：</P>
        </div>
        <div id ="direction_area">
            <p>移動方向：</P>
        </div>
        <div id ="velocity_area">
            <p>移動速度：</P>
        </div>
    </div>



<script type="text/javascript">
    var button_flag = 0; //0：取得してない,1：取得中

function click_button(){
    if(button_flag == 0){
        console.log("ボタンフラグ：" + button_flag);
        button_flag = 1;
        navigator.geolocation.getCurrentPosition(test2); //最初の一回目
        setInterval(function start (){navigator.geolocation.getCurrentPosition(test2);},3000); //2回目以降は2sの間隔開けて
        document.getElementById("start_button").value = "取得終了";
       }
       else if(button_flag == 1){
            console.log("ボタンフラグ："+button_flag);
            sendData(0,0);
            button_flag = 0;
            document.getElementById("start_button").value = "位置情報取得開始";
       }


}




function test2(position) {

    var geo_text = "緯度:" + position.coords.latitude + "\n";
    geo_text += "経度:" + position.coords.longitude + "\n";
    geo_text += "高度:" + position.coords.altitude + "\n";
    geo_text += "位置精度:" + position.coords.accuracy + "\n";
    geo_text += "高度精度:" + position.coords.altitudeAccuracy  + "\n";
    geo_text += "移動方向:" + position.coords.heading + "\n";
    geo_text += "速度:" + position.coords.speed + "\n";

    var date = new Date(position.timestamp);

var lat = position.coords.latitude;
var lng = position.coords.longitude;

if(button_flag == 1){
    document.getElementById("lat_area").innerHTML = "<p>緯度：" +  lat + "</p>";
    document.getElementById("lng_area").innerHTML = "<p>経度：" +  lng  + "</p>";
    document.getElementById("time_area").innerHTML = "<p>取得日時：" +  date.toLocaleString() + "</p>";
    document.getElementById("direction_area").innerHTML = "<p>移動方向：" +  position.coords.heading + "</p>";
    document.getElementById("velocity_area").innerHTML = "<p>移動速度：" +  position.coords.speed + "</p>";
    sendData(lat, lng);
}
else if(button_flag == 0){
    document.getElementById("lat_area").innerHTML = "<p>緯度：</p>";
    document.getElementById("lng_area").innerHTML = "<p>経度：</p>";
    document.getElementById("time_area").innerHTML = "<p>取得日時：</p>";
    document.getElementById("direction_area").innerHTML = "<p>移動方向：</p>";
    document.getElementById("velocity_area").innerHTML = "<p>移動速度：</p>";
}

}


function sendData(lat_data, lng_data){
    var url = "test.php?lat=" + lat_data + "&lon=" + lng_data ;
    var request = createXMLHttpRequest();
    request.open("GET", url, true);
    request.send("");
}



function createXMLHttpRequest() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
        return null;
      }
    }
  } else {
    return null;
  }
}
</script>
</script>
</body>
</html>