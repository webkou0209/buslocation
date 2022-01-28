<?php
// csvファイル読み込み
 


?>
  
<?php

    $request = json_decode(file_get_contents("php://input"), true);
    $value = 0;

    switch ($request['code']) {
        case "A":
            $rootAFile = "csv/RootA.csv";
            $f1 = fopen($rootAFile, "r");
            $data1 = fgetcsv($f1);

            $time_value = $data1[0];;
            $lat_value = $data1[1];
            $lng_value = $data1[2];
            $rosen_value = $data1[3];
            $type_value = $data1[4];
            fclose($f1);
            break;


        case "B":
            $rootBFile = "csv/RootB.csv";
            $f2 = fopen($rootBFile, "r");
            $data2 = fgetcsv($f2);

            $time_value = $data2[0];
            $lat_value = $data2[1];
            $lng_value = $data2[2];
            $rosen_value = $data2[3];
            $type_value = $data2[4];
            fclose($f2);
            break;


        case "C":
            $rootCFile = "csv/RootC.csv";
            $f3 = fopen($rootCFile, "r");
            $data3 = fgetcsv($f3);

            $time_value = $data3[0];
            $lat_value = $data3[1];
            $lng_value = $data3[2];
            $rosen_value = $data3[3];
            $type_value = $data3[4];;
            break;


            case "D":
                $rootDFile = "csv/RootD.csv";
                $f4 = fopen($rootDFile, "r");
                $data4 = fgetcsv($f4);

                $time_value = $data4[0];
                $lat_value =$data4[1];
                $lng_value = $data4[2];
                $rosen_value = $data4[3];
                $type_value = $data4[4];
                break;


        case "none";
            $time_value = "none";
            $lat_value = 0;
            $lng_value = 0;
            $type_value = "none";
            break;
    }
    $result =[
        "time_value"=> $time_value,
        "lat_value" => $lat_value,
        "lng_value" => $lng_value,
        "rosen_value" => $rosen_value,
        "type_value" => $type_value,
    ];


    $json = json_encode($result, JSON_UNESCAPED_UNICODE);
    header("Content-Type: application/json; charset=UTF-8");
    echo $json;
    exit;
    ?>