//JavaScript Document
var hostUrl = "http://222.68.210.60";
var serverUrl  = hostUrl +":81/shanghai/index/";
var imgBasePath = hostUrl +":81/shanghai/";  //基于首页栏目的图片
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