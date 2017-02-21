//JavaScript Document
var hostUrl = "http://222.68.210.136";//"http://222.68.210.60";//http://222.68.210.136:81/dfManage/
var serverUrl  = hostUrl +":81/dfManage";//:81/shanghai/index/
var imgBasePath = hostUrl +":81/df";  //:81/shanghai/基于首页栏目的图片
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