<?php
  if(isset($_GET["lat"]) && isset($_GET["lon"])){
   $lat = $_GET["lat"];
   $lon = $_GET["lon"];
  $list = array(
    array(date("Y/m/d H:i:s"),$lat, $lon),
  );
  // chmodで書き込み権限を付与
  //$filename = chmod('./csv/data.csv', 0666);
  // test.csvファイルを開く
  $fp = fopen('./csv/data1.csv', 'a');
  // foreach文の繰り返し処理で配列の値をファイルに書き込む
  foreach($list as $value){
    fputcsv($fp, $value);
  }
  fclose($fp);
  $fp = fopen('./csv/data2.csv', 'w');
  foreach($list as $value){
    fputcsv($fp, $value);
  }
  // ファイルを閉じる
  fclose($fp);
  echo "書き込み成功";
  echo "<a href='./index.html'>csvファイル中身確認リンク</a>";
  }
  else {
    echo "データなし";
  }
  phpinfo();
  set_ni('error_log', '/var/')
  ?>