var center_lat, center_lng;
var map;
var bus, busA, busB, busC, busD; //バスの位置情報を格納
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
window.onload = function() {
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
    setInterval(display_information, 3000); //運行情報の表示

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
function display_information() {

    getData("A");
    getData("B");
    getData("C");
    getData("D");

    setTimeout(function() {

        document.getElementById('informationA').innerHTML = "<b>運行中</b>";
        document.getElementById('informationB').innerHTML = "<b>運行中</b>";
        document.getElementById('informationC').innerHTML = "<b>運行中</b>";
        document.getElementById('informationD').innerHTML = "<b>運行中</b>";

        if (locA[0] == -1 && locA[1] == -1) {
            document.getElementById('informationA').innerHTML = "<b style='color:red;'>現在運行しておりません</b>";
        }
        if (locB[0] == -1 && locB[1] == -1) {
            document.getElementById('informationB').innerHTML = "<b style='color:red;'>現在運行しておりません</b>";
        }
        if (locC[0] == -1 && locC[1] == -1) {
            document.getElementById('informationC').innerHTML = "<b style='color:red;'>現在運行しておりません</b>";
        }
        if (locD[0] == -1 && locD[1] == -1) {
            document.getElementById('informationD').innerHTML = "<b style='color:red;'>現在運行しておりません</b>";
        }


    }, 500);





}

//アイコン表示
function display() {
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


    if (break_flag == 0) {
        break_flag = 1;
    } else if (break_flag = 1) {
        break_flag = 0;
    }

    console.log(break_flag);

    checked_bus = document.querySelectorAll("input[name=bus_selection]:checked");

    if (0 < checked_bus.length) {
        for (var checked_data of checked_bus) {
            console.log(checked_data.value);
            if (checked_data.value == "A") {
                if (break_flag == 1) {
                    myIntervalA = setInterval(location_update, 2000, "A");
                }
            } else if (checked_data.value == "B") {
                if (break_flag == 1) {
                    myIntervalB = setInterval(location_update, 2000, "B");
                }
            } else if (checked_data.value == "C") {
                if (break_flag == 1) {
                    myIntervalC = setInterval(location_update, 2000, "C");
                }
            } else if (checked_data.value == "D") {
                if (break_flag == 1) {
                    myIntervalD = setInterval(location_update, 2000, "D");
                }
            }
        }
    }


}




function location_update(checked_bus) {
    if (checked_bus == "A") {
        getData("A");

        if (locA[3] == 1) {
            typeTextA = "上り";
        } else if (locA[3] == 2) {
            typeTextA = "下り";
        }

        //1つ前のAピンを消す
        if (kA != 0) {
            markerA.setMap(null);
        }
        kA++;

        setTimeout(function() { // 処理の実行に1秒の遅延(getData待ち)
            busA = new google.maps.LatLng(locA[0], locA[1]);
            //路線ピン
            markerA = new google.maps.Marker({
                position: busA,
                map: map,
                icon: {
                    url: color_selectA,
                    labelOrigin: new google.maps.Point(10, -20) //ラベルの基点
                },
                label: {
                    text: '路線A(' + typeTextA + ')', //ラベル文字
                    color: labelcolor_selectA, //ラベル文字の色
                    fontFamily: 'sans-serif', //フォント 
                    fontWeight: 'bold', //フォントの太さ 
                    fontSize: '20px' //フォントのサイズ 
                }
            });
            getDiffSecond("A");
            //透過処理
            if (diffSecondA >= settingTime) {
                markerA.setOpacity(0.5);
            }

        }, 500);
    } else if (checked_bus == "B") {
        getData("B");

        if (locB[3] == 1) {
            typeTextB = "上り";
        } else if (locB[3] == 2) {
            typeTextB = "下り";
        }

        //1つ前のBピンを消す
        if (kB != 0) {
            markerB.setMap(null);
        }
        kB++;

        setTimeout(function() { // 処理の実行に1秒の遅延
            busB = new google.maps.LatLng(locB[0], locB[1]);
            //Bピン設置
            markerB = new google.maps.Marker({
                position: busB,
                map: map,
                icon: {
                    url: color_selectB,
                    labelOrigin: new google.maps.Point(10, -20) //ラベルの基点
                },
                label: {
                    text: '路線B(' + typeTextB + ')', //ラベル文字
                    color: labelcolor_selectB, //ラベル文字の色
                    fontFamily: 'sans-serif', //フォント 
                    fontWeight: 'bold', //フォントの太さ 
                    fontSize: '20px' //フォントのサイズ 
                }
            });

            getDiffSecond("B");
            //透過処理
            if (diffSecondB >= settingTime) {
                markerB.setOpacity(0.5);
            }
        }, 500);
    } else if (checked_bus == "C") {
        getData("C");

        if (locC[3] == 1) {
            typeTextC = "上り";
        } else if (locD[3] == 2) {
            typeTextC = "下り";
        }

        //1つ前のCピンを消す
        if (kC != 0) {
            markerC.setMap(null);
        }
        kC++;

        setTimeout(function() { // 処理の実行に1秒の遅延
            busC = new google.maps.LatLng(locC[0], locC[1]);
            //路線ピン
            markerC = new google.maps.Marker({
                position: busC,
                map: map,
                icon: {
                    url: color_selectC,
                    labelOrigin: new google.maps.Point(10, -20) //ラベルの基点
                },
                label: {
                    text: '路線C(' + typeTextC + ')', //ラベル文字
                    color: labelcolor_selectC, //ラベル文字の色
                    fontFamily: 'sans-serif', //フォント 
                    fontWeight: 'bold', //フォントの太さ 
                    fontSize: '20px' //フォントのサイズ 
                }
            });
            getDiffSecond("C");
            //透過処理
            if (diffSecondC >= settingTime) {
                markerC.setOpacity(0.5);
            }

        }, 500);
    } else if (checked_bus == "D") {
        getData("D");

        if (locD[3] == 1) {
            typeTextD = "上り";
        } else if (locD[3] == 2) {
            typeTextD = "下り";
        }

        //1つ前のDピンを消す
        if (kD != 0) {
            markerD.setMap(null);
        }
        kD++;

        setTimeout(function() { // 処理の実行に1秒の遅延
            busD = new google.maps.LatLng(locD[0], locD[1]);
            //路線Dピン
            markerD = new google.maps.Marker({
                position: busD,
                map: map,

                icon: {
                    url: color_selectD,
                    labelOrigin: new google.maps.Point(10, -20) //ラベルの基点
                },
                label: {
                    text: '路線D(' + typeTextD + ')', //ラベル文字
                    color: labelcolor_selectD, //ラベル文字の色
                    fontFamily: 'sans-serif', //フォント 
                    fontWeight: 'bold', //フォントの太さ 
                    fontSize: '20px' //フォントのサイズ 
                }
            });

            getDiffSecond("D");
            //透過処理
            if (diffSecondD >= settingTime) {
                markerD.setOpacity(0.5);
            }

        }, 500);
    }



    if (break_flag == 0) {
        clearInterval(myIntervalA);
        clearInterval(myIntervalB);
        clearInterval(myIntervalC);
        clearInterval(myIntervalD);
        setTimeout(function() {
            display();
        }, 1000);
    }
}




function getData(checked_value) {

    var data = {
        "code": checked_value, //選択されている路線を代入
    }

    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "ajax.php");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhr.send(json);
    xhr.onreadystatechange = function() {
        try {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var result = JSON.parse(xhr.response);
                    var location = [result.lat_value, result.lng_value, result.time_value, result.type_value, result.rosen_value];
                    console.log(location);

                    if (checked_value == "A") {
                        locA = location;
                    } else if (checked_value == "B") {
                        locB = location;
                    } else if (checked_value == "C") {
                        locC = location;
                    } else if (checked_value == "D") {
                        locD = location;
                    }
                } else {}
            } else {}
        } catch (e) {}
    };
}



function getDiffSecond(rosen) {
    var now = new Date(); //時刻保存用
    var Year = now.getFullYear();
    var Month = now.getMonth() + 1;
    var Dates = now.getDate();
    var Hour = now.getHours();
    var Min = now.getMinutes();
    var Sec = now.getSeconds();

    var now_time = new Date(Year + "/" + Month + "/" + Dates + " " + Hour + ":" + Min + ":" + Sec);



    //現在時刻とcsv取得時刻の差分(秒)

    switch (rosen) {
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


function change_setting() {
    popupImage();
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


}



// ポップアップ
function popupImage() {
    var popup = document.getElementById('js-popup');

    if (!popup) return;

    var blackBg = document.getElementById('js-black-bg');
    var closeBtn = document.getElementById('js-close-btn');
    var showBtn = document.getElementById('js-show-popup');
    var settingBtn = document.getElementById('setting_button');

    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);
    closePopUp(settingBtn);

    function closePopUp(elem) {

        if (!elem) return;
        elem.addEventListener('click', function() {
            popup.classList.toggle('is-show');
        });
    }
}

popupImage();