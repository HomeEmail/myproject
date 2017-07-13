function $(id) {
	return document.getElementById(id);
}

function $append(n,node){
	if(!!!node){
		node=document.body;
	}
	node.appendChild(n);
}

var utv={};
(function(){
	var doc = document;
	var obj_type={},core_toString=obj_type.toString,hasOwn = obj_type.hasOwnProperty;;
	var type_arr = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
	for(var i in type_arr){
		obj_type[ "[object " + type_arr[i] + "]" ] = type_arr[i].toLowerCase();
	};
	//常用方法
	utv={
		type:function(obj){
			if ( obj == null ) {
				return String( obj );
			}
			return (typeof obj === "object" || typeof obj === "function")?(obj_type[ core_toString.call(obj) ] || "object") :typeof obj;
		},
		isStr:function(obj){
			return utv.type(obj)==="string";
		},
		isFn:function(obj){
			return utv.type(obj)==="function";
		},
		isObj:function(obj){
			return utv.type(obj) === "object";
		},
		isDate:function(obj){
			return utv.type(obj) === "date";
		},
		isEmptyObj:function(obj){
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},
		isNum:function(obj){
			return !isNaN( parseFloat(obj) ) && isFinite( obj );
		},
		isArr:function(obj){
			return utv.type(obj) === "array";
		},
		trim:function(obj){
			return obj.replace(/^\s+|\s+$/g, "");
		},
		now:function(){
			return new Date().getTime();
		}
	};
	
	utv.version = "1.1";//版本号

	utv.extend = function(_destination,_source) {
		  for (var property in _source) {
		    _destination[property] = _source[property];
		  }
		  return _destination;
	};
	/*
		针对cookie的操作
	*/
	utv.cookie = {
		set:function(name, value){
			var expires = (arguments.length > 2) ? arguments[2] : null,strExpires = "";
			if(expires && utv.isDate(expires)){
				strExpires =  "; expires=" + expires.toGMTString();
			}else if(expires && utv.isObj(expires)){
				var nD = utv.now(),
					nObj = {
						day:0,hours:0,minutes:0,seconds:0
					},
					dArr={
						secondes:1000,
						minutes:1000*60,
						hours:1000*60*60,
						day:1000*60*60*24
					},
					_val;
				nObj = utv.extend(nObj,expires);
				for(var n in expires){
					_val = nObj[n];
					if(utv.isNum(_val) && _val>0){
						nD = nD + _val * dArr[n];
					}
				}
				if(utv.isNum(nD) && nD>0){
					nD = new Date(nD);
					strExpires =  "; expires=" + nD.toGMTString();
				}
			}else{
				strExpires = "";
			}

			doc.cookie = name + "=" + encodeURIComponent(value) + strExpires + ";path=/" ;
		},
		get:function(name){
			var value = doc.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
			if (value != null) {
				return decodeURIComponent(value[2]);
			} else {
				return null;
			}
		},
		remove:function(name){
			var expires = new Date();
			expires.setTime(expires.getTime() - 1000 * 60);
			this.set(name, "", expires);
		}
	};

	/**
		将json对象转换成url参数
	**/
	utv.obj2query=function(o){
		if(!!!o){
			return '';
		}
		var key,ary=[];
		for(key in o){
			ary.push(key+'='+o[key]);
		}
		if(ary.length>0){
			return ary.join('&');
		}
		return '';
	};
	/*
		从URL中获取参数 返回object
		参数rem为截取字符的标记，从哪个字符之后截取参数
	*/
	utv.getRequest=function(rem,href){
		var url = href||window.location.href //获取url
			,request = {}
			,str=''
			,remStr = rem || '?' 
			,index = url.indexOf(remStr)
		;
	   if (index != -1) {
	   	  url=url.slice(index);
	      str = url.substr(1);
	      strs = str.split("&");
	      for(var i = 0; i < strs.length; i ++) {
	         request[strs[i].split("=")[0]]=strs[i].split("=")[1];
	      }
	   }
	   return request;
	};

	/*
	获取字符串的真实长度（px）;
	engLen:单个英文字母所占的宽度;
	chiLen:单个中文字母所占的宽度
	*/
	utv.getStrTrueLength = function(str,engLen,chiLen){
		var str=str||''
			,len = str.length
			,engLen = engLen || 16
			,chiLen = chiLen || 26
			,truelen = 0
		;
		for(var x = 0; x < len; x++){
			if(str.charCodeAt(x) > 128){
				truelen += chiLen;
			}else{
				truelen += engLen;
			}
		}
		return truelen;
	};
	utv.getStringTrueSize=function(str){
		var str=str||''
			,len = str.length
			,engLen = 1
			,chiLen = 2
			,truelen = 0
		;
		for(var x = 0; x < len; x++){
			if(str.charCodeAt(x) > 128){
				truelen += chiLen;
			}else{
				truelen += engLen;
			}
		}
		return truelen;
	};

})();





// ---------------------------------------------------
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
// ---------------------------------------------------
Date.prototype.Format = function(formatStr) {
	var str = formatStr;
	var Week = [ '日', '一', '二', '三', '四', '五', '六' ];

	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/,(this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

	str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
	str = str.replace(/M/g, this.getMonth());

	str = str.replace(/w|W/g, Week[this.getDay()]);

	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());

	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());

	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());

	return str;
}

/**
* Marquee Beta 0.8版
* 
* @args.list      数据列表 []
* @args.start     起始位置
* @args.speed     滚动速度
* @args.time      移动的时间间隔
* @args.onStart   每一个滚动文字开始的监听函数
* @args.onFinsh   每一个滚动文字结束的监听函数
*/
function Marquee(args){
	args = args || {};
	this._marqDiv = document.getElementById(args.div || "");
	this._txtList = args.list || ["　"];
	this._index   = args.start|| 0;
	this._speed   = args.speed|| 1;
	this._time    = args.time || 20;
	this._onStart = typeof(args.onStart) == "function" ? args.onStart : function(){};
	this._onFinsh = typeof(args.onFinsh) == "function" ? args.onFinsh : function(){};
	this._pause = false;
	
	this._initAttr = function(){
		this._index = (this._index + this._txtList.length) % this._txtList.length;
		this._marqDiv.style.whiteSpace = "nowrap";
		this._marqDiv.style.overflow = "hidden";
		this._setTxt();
		this._startScroll();
	};
	this._setTxt = function(){
		this._marqDiv.innerHTML = this._padText(this._txtList[this._index]);
		if(this._index > this._txtList.length - 1){ this._index = 0; }
	}
	this.show  = function(){
		this._initAttr();
		return this;
	};
	this.start = function(){
		if(this._pause){
			this._pause = false;
			this._scroll();
		}
	};
	this.stop  = function(){
		this._pause = true;
	};
	this.setSpeed = function(speed){
		this._speed = speed;
	};
	this._next = function(){
		this._index = (this._index + 1) % this._txtList.length;
		this._setTxt();
		this._startScroll();
	},
	this._startScroll = function(){
		this._onStart({index:this._index,data:this._txtList[this._index]});
		this._scroll();
	},
	this._scroll = function(){
		this._marqDiv.scrollLeft += this._speed;
		if (this._marqDiv.scrollLeft >= this._marqDiv.firstChild.offsetWidth - this._marqDiv.clientWidth){
			this._onFinsh({index:this._index,data:this._txtList[this._index]});
			this._marqDiv.scrollLeft = 0;
			this._next();
		}else if(!this._pause){
			setTimeout(function(self){return function(){self._scroll();}}(this),this._time);
		}
	};
	this._padText = function(txt){ //前后填充空白字符
		var width = this._marqDiv.clientWidth;
		var fontSize = this._marqDiv.style.fontSize;
		if(typeof(fontSize) != "number"){
			fontSize = parseInt(fontSize.substring(0, fontSize.lastIndexOf("px")));
		}
		var blank = "";
		for(var i = 0, amount = Math.ceil(width / fontSize); i < amount; i++){blank += "　";};
		return "<span>" + blank + txt + blank + "&nbsp;</span>";
	};
}

var Util = {
	/**
	 * util.date对象，用来放置与Date有关的工具
	 */
	date: {
		/**
		 * util.date.format方法，将传入的日期对象d格式化为formatter指定的格式
		 * @param {object} d 传入要进行格式化的date对象
		 * @param {string} formatter 传入需要的格式，如“yyyy-MM-dd hh:mm:ss”
		 * @return {string} 格式化后的日期字符串，如“2008-09-01 14:00:00”							
		 */
		format: function(d, formatter) {
		    if(!formatter || formatter == "")
		    {
		        formatter = "yyyy-MM-dd";
		    }
			
			var weekdays = {
				chi: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
				eng: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
			};
		    var year = d.getFullYear().toString();
		    var month = (d.getMonth() + 1).toString();
		    var date = d.getDate().toString();
		    var day = d.getDay();
			var hour = d.getHours().toString();
			var minute = d.getMinutes().toString();
			var second = d.getSeconds().toString();

			var yearMarker = formatter.replace(/[^y|Y]/g,'');
			if(yearMarker.length == 2) {
				year = year.substring(2,4);
			} else if (yearMarker.length == 0) {
				year = "";
			}

			var monthMarker = formatter.replace(/[^M]/g,'');
			if(monthMarker.length > 1) {
				if(month.length == 1) {
					month = "0" + month;
				}
			} else if (monthMarker.length == 0) {
				month = "";
			}

			var dateMarker = formatter.replace(/[^d]/g,'');
			if(dateMarker.length > 1) {
				if(date.length == 1) {
					date = "0" + date;
				}
			} else if (dateMarker.length == 0) {
				date = "";
			}

			var hourMarker = formatter.replace(/[^h]/g, '');
			if(hourMarker.length > 1) {
				if(hour.length == 1) {
					hour = "0" + hour;
				}
			} else if (hourMarker.length == 0) {
				hour = "";
			}

			var minuteMarker = formatter.replace(/[^m]/g, '');
			if(minuteMarker.length > 1) {
				if(minute.length == 1) {
					minute = "0" + minute;
				}
			} else if (minuteMarker.length == 0) {
				minute = "";
			}

			var secondMarker = formatter.replace(/[^s]/g, '');
			if(secondMarker.length > 1) {
				if(second.length == 1) {
					second = "0" + second;
				}
			} else if (secondMarker.length == 0) {
				second = "";
			}
			
			var dayMarker = formatter.replace(/[^w]/g, '');
			var lang = typeof(user) != "undefined" ? user.UILanguage:"chi";
			var result = formatter.replace(yearMarker,year).replace(monthMarker,month).replace(dateMarker,date).replace(hourMarker,hour).replace(minuteMarker,minute).replace(secondMarker,second); 
			if (dayMarker.length != 0) {
				result = result.replace(dayMarker,weekdays[lang][day]);
			}
		    return result;
		},
        
        getDate: function(offset) {
            var d = new Date();
            var year = d.getYear();
            var month = d.getMonth();
            var date = d.getDate();
            var hour = d.getHours();
            var minute = d.getMinutes();
            var second = d.getSeconds();
            
            var dd = new Date(year, month, (date+offset), hour, minute, second);
            return dd;
        }
	},
	str: {
		addZero: function(__str, __num){
			__str = __str.toString();
			for(var i = __str.length; i < __num; i++){
				__str = "0"+__str;
			}
			return __str;
		},
		
		getDuration: function(__t1, __t2){
			var t1 = __t1.split(":");
			var t2 = __t2.split(":");
			var duration = 0;
			duration = (Math.floor(t2[0])*60+Math.floor(t2[1])) - (Math.floor(t1[0])*60+Math.floor(t1[1]));
			if(t1[0] > t2[0]) duration = duration + 1440;
			return duration;
		},
		
		millisecondToMinute: function(__mili){			
			return parseInt((__mili/1000)/60);		
		},

		secondToStringTime: function(__sec){
			var hour = Math.floor(__sec/3600);
			var minute = Math.floor((__sec - hour*3600)/60);
			var second = __sec - hour*3600 - minute*60;
			hour = hour>9?hour:"0"+hour;
			minute = minute>9?minute:"0"+minute;
			second = second>9?second:"0"+second;
			return hour+":"+minute+":"+second;
		},
		
		/**
		 * 根据传入的字符串日期和时间格式转换为毫秒的整数格式时间
		 * @param string __str : 格式为“2008-09-01 14:00:00”的日期和时间字符串
		 * @return long int : 毫秒的时间格式
		 */
		stringDateTimeToMiliTime: function(__str){
			var y = Math.floor(__str.substring(0,4));
			var m = Math.floor(__str.substring(5,7))-1;
			var d = Math.floor(__str.substring(8,10));
			var t_h = Math.floor(__str.substring(11,13));
			var t_m = Math.floor(__str.substring(14,16));
			var t_s = Math.floor(__str.substring(17,19));
			var my_date = new Date();
			my_date.setYear(y);
			my_date.setMonth(m);
			my_date.setDate(d);
			my_date.setHours(t_h);
			my_date.setMinutes(t_m);
			my_date.setSeconds(t_s);
			my_date.setMilliseconds(0);
			return my_date.getTime();
		},

		/* ---------------------------
		 功能 - 将输入字串前补add_string至设定宽度
		 参数 -
			arg1: 输入, 可以是字符串或数字
			arg2: 欲补到多宽的字串
			arg3: 欲补的字串，一般为一个字符
		---------------------------*/
		toPaddedString: function(input,width,add_string){
			var str = input.toString();
			while(str.length<width){
				str = add_string + str;
			}
			return str;
		},
		subString:function(str, len, hasDot){
			var newLength = 0;
			var newStr = "";
			var chineseRegex = /[^\x00-\xff]/g;
			var singleChar = "";
			var strLength = str.replace(chineseRegex, "**").length;
			for ( var i = 0; i < strLength; i++) {
				singleChar = str.charAt(i).toString();
				if (singleChar.match(chineseRegex) != null) {
					newLength += 2;
				} else {
					newLength++;
				}
				if (newLength > len) {
					break;
				}
				newStr += singleChar;
			}

			if (hasDot && strLength > len) {
				newStr += "...";
			}
			return newStr;
		}		
	},
	img:{
		preload:function(imgArr) {
			if(document.images){
				for(var i = 0; i < imgArr.length; i++){
					(new Image()).src = imgArr[i];
				}
			}
		}
	}
};
var Q = Query = {
	getFromURL: function(url,parameter){
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
	},
	createQueryString:function(obj){
		var a = [];
		for(var p in obj){
			if(typeof(obj[p]) == "function" || obj[p] == null || typeof(obj[p])=="undefined") continue;
			a.push(p + "=" + obj[p]);
		}
		return a.join("&");	
	}
};