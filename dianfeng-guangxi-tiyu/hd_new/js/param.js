//JavaScript Document
var hostUrl = "http://10.0.4.46";//"http://222.68.210.60";
var serverUrl  = hostUrl +":8088/dfManage";//:81/shanghai/index/
var imgBasePath = '';//hostUrl +":8088/df";  //:81/shanghai/基于首页栏目的图片
var req = null; // ajax requset对象

var loadingDiv = null;
function showLoadingDiv(){
	if(!!!loadingDiv) return;
	loadingDiv.style.visibility = "visible";
}
function hideLoadingDiv(){
	if(!!!loadingDiv) return;
	loadingDiv.style.visibility = "hidden";
}