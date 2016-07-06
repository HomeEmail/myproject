// JavaScript Document
var Event = function(_event){
    var keycode = _event.which;
    var code = "";
    switch (keycode) {
        case 1:
        case 38: //other browsers
        case 65362: //上
        case 87: //上
            code = "KEY_UP";
            break;
        case 2:
        case 40: //other browsers
        case 83: //other browsers
        case 65364: //下
            code = "KEY_DOWN";
            break;
        case 3:
        case 37: //other browsers
        case 65: //确定
        case 65361: //左
            code = "KEY_LEFT";
            break;
        case 4:
        case 39: //other browsers
        case 68: //other browsers
        case 65363: //右
            code = "KEY_RIGHT";
            break;
        case 13:
        case 65293: //确定
            code = "KEY_SELECT";
            break;
        case 340:
        case 8: //other browsers
        case 640: 
		case 283: 
        case 65367: //返回
            code = "KEY_BACK";
            break;
        case 27: //谷歌浏览器返回键返回页面问题，用ESC键
		case 339:
			code = "KEY_EXIT";
		break;
        case 372:
        case 25: //向前翻页
        case 33: //向前翻页
        case 306: //向前翻页
            code = "KEY_PAGE_UP";
            break;
        case 373:
        case 26: //向后翻页
        case 34: //向后翻页
        case 307: //向后翻页
            code = "KEY_PAGE_DOWN";
            break;
        case 513: //right [Ctrl]
        case 65360: //菜单
            code = "KEY_MENU";
            break;
        case 61: //
		case 595: //
        case 63561: //音量加
            code = "KEY_VOLUME_UP";
            break;
		case 45: //
        case 596: //[-]
        case 63562: //音量减
            code = "KEY_VOLUME_DOWN";
            break;
		case 67: //GD
        case 597: 
        case 63563: //静音
            code = "KEY_VOLUME_MUTE";
            break;
        case 32:
            code = "KEY_F1";
            break;
        case 33:
            code = "KEY_F2";
            break;
        case 34:
            code = "KEY_F3";
            break;
        case 35:
            code = "KEY_F4";
            break;
        case 49:
            code = "KEY_NUMBER1";
            break;
        case 50:
            code = "KEY_NUMBER2";
            break;
        case 51:
            code = "KEY_NUMBER3";
            break;
        case 52:
            code = "KEY_NUMBER4";
            break;
        case 53:
            code = "KEY_NUMBER5";
            break;
        case 54:
            code = "KEY_NUMBER6";
            break;
        case 55:
            code = "KEY_NUMBER7";
            break;
        case 56:
            code = "KEY_NUMBER8";
            break;
        case 57:
            code = "KEY_NUMBER9";
            break;
        case 48:
            code = "KEY_NUMBER0";
            break;
        case 65307:
            code = "KEY_TRACK";
            break;
        case 36: // 喜爱
            code = "KEY_FAV";
            break;
        case 72: // 回看
            code = "KEY_PALYBACK";
            break;
		case 514:						//导视
			code = "KEY_EPG";
			break;
		case 517:						//点播
			code = "KEY_VOD";
			break;
		case 518:						//影院
			code = "KEY_NVOD";
			break;
		case 520:						//股票
			code = "KEY_STOCK";
			break;
		case 562:						//资讯
			code = "KEY_BROADCAST";
			break;
        case 563:						//电视/广播
			code = "KEY_AUDIO";
			break;
        case 564:						//电视/广播
			code = "KEY_AUDIO";
			break;
        case 567:						//短信
			code = "KEY_INFO";
			break;
        case 573:						//频道
			code = "KEY_PLAYLIST";
			break;
        case 574:						//分类
			code = "KEY_PROGRAM_TYPE";
			break;
        case 834:						//黄键
			code = "KEY_YELLOW";
			break;
        case 1056:						//营业厅
			code = "KEY_BUSINESS_HALL";
			break;
        case 1057:						//高清电视
			code = "KEY_HDTV";				
			break;
        case 1058:						//电视回看
			code = "KEY_TSTV";			
			break;
		case 5202:						//播放准备成功
			code = "EIS_VOD_RERADY_SUCCESS";
			break;
        case 5210:						//播放结束
			code = "EIS_VOD_PROGRAM_END";
			break;
		default :
			code = keycode;
         	break;
    }
	return code;
};


function $(element) {
	var element = document.getElementById(element);
	return element;
    return extend(element,domMethod);
}
//DOM����---����----//
var Q = Query = {
	get: function(parameter) {
		if (typeof (parameter) == "undefined" || parameter == "") {
			return null;
		}
		var url = window.location.href;		
		var index = url.indexOf("?");
		if (index != -1) {
			var parameterString = url.substr(index + 1);
			var reg = new RegExp("(^|&)" + parameter + "=([^&]*)(&|$)", "i");
			var r = parameterString.match(reg);
			if (r != null){
				return r[2];
			}
		}
		return null;
	},
	getInt:function(parameter,defaultValue){
		var value = parseInt(this.get(parameter));
		return isNaN(value) ? (typeof(defaultValue) == "undefined" ? 0 : defaultValue) : value;
	},
	getDecoded:function(parameter){
		return this.decode(this.get(parameter));
	},
	decode:function(srcStr){
		if(typeof(srcStr) == "undefined"){return null;}
		return decodeURIComponent(srcStr);
	},
	encode:function(srcStr){
		if(typeof(srcStr) == "undefined"){return null;}
		return encodeURIComponent(srcStr);
	},
	getSymbol:function(url){
		return url.indexOf("?") == -1 ? "?" : "&";
	},
	joinURL:function(url,queryString){
		return url + this.getSymbol(url) + queryString;
	}
};