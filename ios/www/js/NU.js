function checkConnection(){
//  document.addEventListener('offline', offlineCallback, false);

    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
  
    if (networkState == Connection.NONE || networkState == "none" || states[networkState] == undefined) {
        //navigator.notification.activityStop();
        alert("You appear to be offline currently.  Please try your request again later.");
        return false;
    }
    else {
        return true;
    }
}

function showLoader(msg){
    //navigator.notification.activityStart('Genesis',msg);
    document.getElementById('progress').style.display='block';
}

function hideLoader(){
    //navigator.notification.activityStop();
    document.getElementById('progress').style.display='none';
}

function getQuerystring(key, default_)
{
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}
function redirect(url) {
  window.location.href= "./" + url;
}
function showAlert() {
/*  navigator.notification.alert(
        "Tap the refresh button in the top right corner if the data seems out of date.",
        k,
        'Tip:',
        'GO CATS!'
    );*/
}
    
function k() {return false;}

function createMBP(myid,myfcn,myparameter){
  if(myparameter==='')
    new MBP.fastButton(document.getElementById(myid), function(){ window[myfcn]();  });
  else 
    new MBP.fastButton(document.getElementById(myid), function(){x$('#' + myid).setStyle('backgroundColor', '#EFEFEF'); window[myfcn](myparameter);  });
}

function doLink(url){
		window.open(url, '_blank');
}

function xmlToJson(xml) {
var i = 0;

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = '';
			if (item != null)
				nodeName = item.nodeName;
			if (obj != null && typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	
	return obj;
};
		
function toHHMMSS(sec){
	var sec_numb = parseInt(sec);
	var hours   = Math.floor(sec_numb / 3600);
	var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
	var seconds = sec_numb - (hours * 3600) - (minutes * 60);
	
	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	var time = hours + ':' + minutes + ':' + seconds;
	return time;
}

//Text resizer used on Bible page
function resizeText(multiplier) {
	var myItem = document.getElementById('schedules');
	
	if (myItem.style.fontSize == "") 
		myItem.style.fontSize = "1.0em";
	
	myItem.style.fontSize = parseFloat(myItem.style.fontSize) + (multiplier * 0.2) + "em";
}

