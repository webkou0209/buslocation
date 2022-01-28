// バスのマーカー生成
var bus;
var dat_latest = new Array(18);

/* これだと動作重い
function create(){
  _d = (new Date()).getTime(); // キャッシュ回避のため
  $.get('getimage.php?r='+_d, function(data){
    bus = new Array(Number(data));
    for(var i = 0; i < bus.length; i++){
 　  　 bus[i] = new google.maps.Marker({
      　  map: map,
    　  　icon: new google.maps.MarkerImage("image/" + i + ".png")
       });
    }
    update();
  });
}
*/

function create(){
    bus = new Array(18);
    for(var i = 0; i < bus.length; i++){
	bus[i] = new google.maps.Marker({
		map: map,
       		icon: new google.maps.MarkerImage("image/" + i + ".png")
	    });
    }
    update();
}

function update(){
    var lat = new Array(18);
    var lng = new Array(18);
    var sos = new Array(18);
    var flg;
    _d = (new Date()).getTime(); // キャッシュ回避のため
    var dat_now = _d + 32400000;
    $.get('getloc.php?r='+_d, function(data,status){
	    var lines = data.split("\n");
	    for (var i = 0 ; i < lines.length-1 ; i++){
		var vals = lines[i].split(",");
		if( vals[0].substr(1,1)=='_' ) id = vals[0].substr(0,1);
		else id = vals[0].substr(0,2);
		var dat = vals[1];
		lat[id] = vals[2];
		lng[id] = vals[3];
		sos[id] = vals[4];
		dat_latest[id] = UTCtime(dat);
	    }
	    for (var i = 0 ; i < lines.length-1 ; i++){
		var vals = lines[i].split(",");
		if ( vals[0].substr(1,1)=='_' ) id = vals[0].substr(0,1);
		else id = vals[0].substr(0,2);
		if( !isNaN(id) ){
		    bus[id].setPosition(new google.maps.LatLng(lat[id], lng[id]));
		    bus[id].setOpacity(1.0);
		    if(!isNaN(dat_latest[id])){
			if( sos[id]==1 ){ // SOS発信中の場合
			    bus[id].setOptions({icon: new google.maps.MarkerImage('image/bus_sos.png')});
			}else{ //変更　目印
			    bus[id].setOptions({icon: new google.maps.MarkerImage('image/'+ id +'.png')});
			    if(id == 0 || id == 1 || id == 10){
				flg = next(id, 0, 1, 10);
			    }else if(id == 2 || id == 3 || id == 11){
				flg = next(id, 2, 3, 11);
			    }else if(id == 4 || id == 5 || id == 12){
				flg = next(id, 4, 5, 12);
			    }else if(id == 6 || id == 7 || id == 13){
				flg = next(id, 6, 7, 13);
			    }else if(id == 8 || id == 9 || id == 14){
				flg = next(id, 8, 9, 14);
			    }else if(id == 15 || id == 16 || id == 17){
				flg = next(id, 15, 16, 17);
			    }
			    if(flg){
				bus[id].setOpacity(0.0);
			    }else{
				if(dat_now - dat_latest[id] >= 60000){
				    if(end_point(id, lat[id], lng[id])){
					bus[id].setOpacity(0.0);
				    }else{
					bus[id].setOpacity(0.5);
				    }
				}
			    }
			}
		    }
		}
	    }
	    setTimeout("update()", 3000);
	});
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

function next(id_now, num1, num2, num3){
    var latest = null;
    var flg = null;
    if((((dat_latest[num2] == undefined) || (isNaN(dat_latest[num2]))) && ((dat_latest[num3] == undefined) || (isNaN(dat_latest[num3])))) ||
       (((dat_latest[num2] == undefined) || (isNaN(dat_latest[num2]))) && (dat_latest[num1] > dat_latest[num3])) ||
       ((dat_latest[num1] > dat_latest[num2]) && ((dat_latest[num3] == undefined) || (isNaN(dat_latest[num3])))) ||
       ((dat_latest[num1] > dat_latest[num2]) && (dat_latest[num1] > dat_latest[num3]))){
	latest = num1;
    }else if((((dat_latest[num1] == undefined) || (isNaN(dat_latest[num1]))) && ((dat_latest[num3] == undefined) || (isNaN(dat_latest[num3])))) ||
	     (((dat_latest[num1] == undefined) || (isNaN(dat_latest[num1]))) && (dat_latest[num2] > dat_latest[num3])) ||
	     ((dat_latest[num2] > dat_latest[num1]) && ((dat_latest[num3] == undefined) || (isNaN(dat_latest[num3])))) ||
	     ((dat_latest[num2] > dat_latest[num1]) && (dat_latest[num2] > dat_latest[num3]))){
	latest = num2;
    }else if((((dat_latest[num1] == undefined) || (isNaN(dat_latest[num1]))) && ((dat_latest[num2] == undefined) || (isNaN(dat_latest[num2])))) ||
	     (((dat_latest[num1] == undefined) || (isNaN(dat_latest[num1]))) && (dat_latest[num3] > dat_latest[num2])) ||
	     ((dat_latest[num3] > dat_latest[num1]) && ((dat_latest[num2] == undefined) || (isNaN(dat_latest[num2])))) ||
	     ((dat_latest[num3] > dat_latest[num1]) && (dat_latest[num3] > dat_latest[num2]))){
	latest = num3;
    }
    if(id_now != latest){
	return true;
    }else{
	return false;
    }
}

function end_point(id, lat, lng){
    if(id == 1 || id == 3 || id == 5 || id == 7 || id == 9){
	if((33.125466 <= lat && lat <= 33.126466) &&
	   (132.521184 <= lng && lng <= 132.522184)){
	    return true;
	}
    }else if(id == 0){
	if((33.087738 <= lat && lat <= 33.088738) &&
	   (132.530955 <= lng && lng <= 132.531955)){
	    return true;
	}
    }else if(id == 2){
	if((33.056759 <= lat && lat <= 33.057759) &&
	   (132.443615 <= lng && lng <= 132.444615)){
	    return true;
	}
    }else if(id == 4){
	if((33.088165 <= lat && lat <= 33.089165) &&
	   (132.624831 <= lng && lat <= 132.625831)){
	    return true;
	}
    }else if(id == 6){
       if((33.055916 <= lat && lat <= 33.056916) &&
	   (132.556693 <= lng && lng <= 132.557693)){
	    return true;
	}
    }else if(id == 8){
	if((33.120438 <= lat && lat <= 33.121438) &&
	   (132.566331 <= lng && lng <= 132.567331)){
	    return true;
	}
    }else if(id == 10){
	if(((33.125466 <= lat && lat <= 33.126466) &&
	    (132.521184 <= lng && lng <= 132.522184)) ||
	   ((33.087738 <= lat && lat <= 33.088738) &&
	    (132.530955 <= lng && lng <= 132.531955))){
	    return true;
	}
    }else if(id == 11){
	if(((33.125466 <= lat && lat <= 33.126466) &&
	    (132.521184 <= lng && lng <= 132.522184)) ||
	   ((33.056759 <= lat && lat <= 33.057759) &&
	    (132.443615 <= lng && lng <= 132.444615))){
	    return true;
	}
    }else if(id == 12){
	if(((33.125466 <= lat && lat <= 33.126466) &&
	    (132.521184 <= lng && lng <= 132.522184)) ||
	   ((33.088165 <= lat && lat <= 33.089165) &&
	    (132.624831 <= lng && lat <= 132.625831))){
	    return true;
	}
    }else if(id == 13){
	if(((33.125466 <= lat && lat <= 33.126466) &&
	    (132.521184 <= lng && lng <= 132.522184)) ||
	   ((33.055916 <= lat && lat <= 33.056916) &&
	    (132.556693 <= lng && lng <= 132.557693))){
	    return true;
	}
    }else if(id == 14){
	if(((33.125466 <= lat && lat <= 33.126466) &&
	    (132.521184 <= lng && lng <= 132.522184)) ||
	   ((33.120438 <= lat && lat <= 33.121438) &&
	    (132.566331 <= lng && lng <= 132.567331))){
	    return true;
	}
    }else if(id == 15){
	if((33.84064 <= lat && lat <= 33.84164) &&
	   (132.769827 <= lng && lng <= 132.770827)){
	    return true;
	}
    }else if(id == 16){
	if((33.847596 <= lat && lat <= 33.848596) &&
	   (132.768604 <= lng && lng <= 132.769604)){
	    return true;
	}
    }else if(id == 17){
	if(((33.84064 <= lat && lat <= 33.84164) &&
	    (132.769827 <= lng && lng <= 132.770827)) ||
	   ((33.847596 <= lat && lat <= 33.848596) &&
	    (132.768604 <= lng && lng <= 132.769604))){
	    return true;
	}
    }
    return false;
}
//以上、追加*/
create();
