// バス停に関する記述(今はbusstop[4]しか使ってない)
function display_busstop() {
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
        33.057259, 132.444115, '漁家'
    ];

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
        33.056416, 132.557193, '上槙'
    ];

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
        33.088665, 132.625331, '谷郷'
    ];

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
        33.120938, 132.566831, '長野橋'
    ];

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
        33.849325, 132.764628, '清水町'
    ];


// バス停を表示
    for (i = 0; i < buscount; i++) {
        for (j = 0; j < busstop[i].length; j += 3) {
            var busstop_marker = new google.maps.Marker({
                position: new google.maps.LatLng(busstop[i][j], busstop[i][j + 1]),
                map: map,
                title: busstop[i][j + 2],
                icon: 'img/busstop.png'
            });
            attachMessage(busstop_marker, busstop[i][j + 2]);
        }
    }

}

function attachMessage(marker, msg) {
    google.maps.event.addListener(marker, 'click', function(event) {
        new google.maps.InfoWindow({
            content: msg
        }).open(marker.getMap(), marker);
    });
    10
}

// 現在時刻の取得
function UTCtime(dat) {
    var year;
    var month;
    var day;
    var hour;
    var min;
    var sec;
    var msec;
    year = dat.substr(0, 4);
    month = dat.substr(5, 2);
    month = month - 1;
    day = dat.substr(8, 2);
    hour = dat.substr(11, 2);
    min = dat.substr(14, 2);
    sec = dat.substr(17, 2);
    msec = dat.substr(20, 3);
    var time = Date.UTC(year, month, day, hour, min, sec, msec);
    return time;
}