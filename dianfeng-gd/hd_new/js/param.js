//JavaScript Document
var hostUrl = "http://172.16.130.108";//"http://222.68.210.60";//http://222.68.210.136:81/dfManage/
var serverUrl  = hostUrl +":8080/df";//:81/shanghai/index/
var imgBasePath = hostUrl +":8080/df";  //:81/shanghai/基于首页栏目的图片
var req = null; // ajax requset对象

var keyNo=(typeof (CA) != 'undefined' && CA.icNo) || "8002003646694252";

var regionCodeInt =  (typeof (CA) != 'undefined' && CA.regionCode) || 1;

var portalUrl=(typeof (SysSetting) != 'undefined' && SysSetting.getEnv("PORTAL_ADDR")) || '';

var loadingDiv = null;
function showLoadingDiv(){
	if(!!!loadingDiv) return;
	loadingDiv.style.visibility = "visible";
}
function hideLoadingDiv(){
	if(!!!loadingDiv) return;
	loadingDiv.style.visibility = "hidden";
}