//JavaScript Document
var hostUrl = "http://10.0.4.46";//"http://222.68.210.60";
var serverUrl  = hostUrl +":80/index/";//:81/shanghai/index/
var imgBasePath = hostUrl +":80/";  //:81/shanghai/基于首页栏目的图片
var req = null; // ajax requset对象

var loadingDiv = null;
function showLoadingDiv(){
	document.onkeydown = null;
	loadingDiv.style.visibility = "visible";
}
function hideLoadingDiv(){
	document.onkeydown = grabEvent;
	loadingDiv.style.visibility = "hidden";
}