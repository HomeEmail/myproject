/*
	utv 基本操作类
	author:ivan
*/
var $=function(){};
(function(win,undefined){
	var utv = {}
		,doc = document
	;

	utv.version = "1.1";//版本号
	utv.utv = "1.1";

	utv.extend = function(_destination,_source) {
		  for (var property in _source) {
		    _destination[property] = _source[property];
		  }
		  return _destination;
	};


	//each封装方法
	utv.each = function(obj,fn){
		if(obj.length == undefined){
			for ( var i in obj )fn.apply( obj[i],[i,obj[i]]);
		}else{
			for(var i=0;i<obj.length;i++)fn.apply( obj[i],[i,obj[i]]);
		}
	};

	//针对className的操作
	utv.className = {
		has:function(elem,classname){
			if(elem && (elem.nodeType === 1) ){
				var arr=elem.className.split(' ');
				for(var i=0, len=arr.length; i<len; i++){
					if(arr[i]==classname){
						return true;
					}
				}
				return false;
			}
		}
		,add:function(elem,classname){
			if(elem && !this.has(elem,classname)){
				elem.className = (elem.className=='' ? elem.className : elem.className+ ' ')+classname;
				return true;
			}
			return false;
		}
		,remove:function(elem,classname){
			if(elem && this.has(elem,classname)){
				//elem.className = elem.className.replace(new RegExp("(^|\\s*\\b[^-])"+classname+"($|\\b(?=[^-]))", "g"),'');
				var _class = elem.className.split(' '),i=0,_classStr='',_cn;
				for(;i<_class.length;i++){
					_cn = _class[i]
					if(_cn != classname && _cn!=""){
						_classStr = _classStr + ' '+_cn;
					}
				}
				elem.className = _classStr;
				return true;
			}
			return false;
		}
		,get:function(elem){
			return elem.className||'';
		}
	};

	$=utv.Elem=function(idStr){
		var n=null;
		try{
			if(typeof idStr == 'string'){
				n = document.getElementById(idStr);
			}
			if(typeof idStr == 'object'){
				n = idStr;
			}
			utv.extend(n,utv.ElemMethod);
		} catch(err){
			n = null;//'获取元素失败 '+idStr;
		}
		return n;
	};
	
	utv.ElemMethod={
		childElem :	function(){return utv.childElem(this);}
		,parentElem : function(){return utv.parentElem(this);}
		,siblingElem : function(){return utv.siblingElem(this);}
		,$parent : function(){
			return $(utv.parentElem(this));
		}
		,$child : function(){
			var ary=utv.childElem(this);
			for(var i=0,len=ary.length;i<len;i++){
				ary[i]=$(ary[i]);
			}
			return ary;
		}
		,$sibling : function(){
			var ary=utv.siblingElem(this);
			for(var i=0,len=ary.length;i<len;i++){
				ary[i]=$(ary[i]);
			}
			return ary;
		}
		,getStyle : function(strName){return utv.getStyle(this,strName);}
		,setStyle : function(strName,strValue){return utv.setStyle(this,strName,strValue);}
		,css : function(strName,strValue){
			if(!!strName && !!strValue){
				return utv.setStyle(this,strName,strValue);
			}
			if(!!strName){
				return utv.getStyle(this,strName);
			}
		}
		,setHidden : function(){
			utv.setStyle(this,'visibility','hidden');
			return this;
		}
		,setVisible : function(){
			utv.setStyle(this,'visibility','visible');
			return this;
		}
		,hide : function(){
			utv.setStyle(this,'display','none');
			return this;
		}
		,show : function(){
			utv.setStyle(this,'display','block');
			return this;
		}
		,setHTML : function(str){return utv.setHTML(this,str);}
		,getHTML : function(){return utv.getHTML(this);}
		,html : function(str){
			if((typeof str == 'undefined') || str==''){
				return utv.getHTML(this);
			} else {
				return utv.setHTML(this,str);
			}
		}
		,append:function(a){
			utv.domCrtl(this,a,function(elem){
				this.appendChild(elem);
			});

			return this;
		}
		,addClass : function(className){ 
			utv.className.add(this,className);
			return this;
		}
		,removeClass : function(className){
			utv.className.remove(this,className);
			return this;
		}
		,hasClass : function(className){return utv.className.has(this,className);}
		,getClass : function(){return utv.className.get(this);}
	};
	

	//查找子元素
	utv.childElem = function(elem){
		var _nodes = elem.childNodes
			,_child = []
		;
		utv.each(_nodes,function(i,n){
			if(n && n.nodeType===1){
				_child.push(n);
			}
		});
		return _child;
	};

	//查找父级元素
	utv.parentElem = function(elem){
		var _parent = {};
		if(elem && elem.parentNode){
			_parent = elem.parentNode;
		}

		return _parent;
	}

	//获取元素的样式
	utv.getStyle = function(elem,name){
		//return elem.style[name] || 'noFound style';
		var _attr = elem.currentStyle ? elem.currentStyle[name] : (elem.style[name] || window.getComputedStyle(elem, false)[name]);
		return name === 'opacity' ? Math.round(_attr)*100:_attr;
	};

	//设置元素的样式  如果是margin-top 要写成marginTop  
	utv.setStyle = function(elem,name,value){
		elem.style[name] = value;
	};

	//查找附近元素
	utv.siblingElem = function(elem){
		var _nodes = []
			,_elem = elem
			,_pareNode = _elem.parentNode
			,_chidNodes = _pareNode.childNodes
		;
		utv.each(_chidNodes,function(i,n){
			if(n.nodeType === 1 && n != elem){
				_nodes.push(n);
			}		
		})

		return _nodes;
	}

	
	
	utv.setHTML = function(node,str){
		node.innerHTML=str;
	};
	utv.getHTML = function(node){
		return node.innerHTML;
	};

	
	//字符串转换成dom节点、元素
	utv.toDom = function(str){
		var div = doc.createElement("div")
			,i = 0
			,_nodes
			,len = 0
			,re = []
		;
		div.innerHTML = str;
		_nodes = div.childNodes;
		len = _nodes.length;
		for(;i<len;i++){
			re.push(_nodes[i]);
		}
		return re;
	};

	//dom 操作
	utv.domCrtl = function(elem,a,fn){
		if(!elem || (elem.nodeType && elem.nodeType != 1)) return false;
		if(a && a.nodeType){
			fn.apply(elem,[a]);
		}else if((typeof(a)).toLowerCase() === 'string'){
			var _nodes = utv.toDom(a);
			for(var i=0;i<_nodes.length;i++){
				fn.apply(elem,[_nodes[i]]);
			}
		}else if(a && a.length){
			for(var i=0;i<a.length;i++){
				fn.apply(elem,[a[i]]);
			}
		}
	};

	/*
		针对cookie的操作
	*/
	utv.cookie = {
		set:function(name, value,timeObj){
			var expires = (arguments.length > 2) ? arguments[2] : null,strExpires = "";
			if(!!expires){
				try{
					expires.getTime();
					strExpires =  "; expires=" + expires.toGMTString();
				} catch(err) {
					var nD = new Date().getTime(),
						nObj = {
							days:0,hours:0,minutes:0,seconds:0
						},
						dArr={
							seconds:1000,
							minutes:1000*60,
							hours:1000*60*60,
							days:1000*60*60*24
						},
						_val;
					nObj = utv.extend(nObj,expires);
					for(var n in expires){
						_val = nObj[n];
						if(_val>0){
							nD = nD + _val * dArr[n];
						}
					}
					if(nD>0){
						nD = new Date(nD);
						strExpires =  "; expires=" + nD.toGMTString();
					}
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




	/*
		AJAX 类  收录
	*/
	var Ajax =function(){
		function request(url,opt){
			function fn(){}
			opt = opt || {};
			var async   = opt.async !== false,
				method  = opt.method 	|| 'POST',
				type    = opt.type 		|| 'text',
				encode  = opt.encode 	|| 'UTF-8',
				timeout = opt.timeout 	|| 0,//设置超时  默认0为不设置
				data    = opt.data 		|| null,
				success = opt.success 	|| fn,
				failure = opt.failure 	|| fn,
				contentType = opt.contentType 	  || null,
				contentLength = opt.contentLength || null;
				method  = method.toUpperCase();
			if(data && typeof data == 'object'){
				data = _serialize(data);
			}
			if(method == 'GET' && data){
				url += (url.indexOf('?') == -1 ? '?' : '&') + data;
				data = null;
			}
			//document.getElementById('testEng').innerHTML='调试：这个机顶盒碉堡了*520*1413*ajax';
			var xhr = function(){
				try{
					return new XMLHttpRequest();
				}catch(e){
					try{
						return new ActiveXObject('Msxml2.XMLHTTP');
					}catch(e){
						try{
							return new ActiveXObject('Microsoft.XMLHTTP');
						}catch(e){
							failure(null,'create xhr failed',e);
						}
					}
				}
			}();
			if(!xhr){return;}
			var isTimeout = false, timer;
			if(async && timeout>0){
				timer = setTimeout(function(){
					xhr.abort();
					isTimeout = true;
				},timeout);
			}
			xhr.onreadystatechange = function(){
				//document.getElementById('testEng').innerHTML='调试：这个机顶盒碉堡了*520*1413*ajaxchange';
				if (xhr.readyState == 4){
					_onStateChange(xhr, type, success, failure);
					clearTimeout(timer);
				}else{}
			};

			xhr.open(method,url,async);
			if(method == 'POST'){
				if(contentType == null){
					xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=' + encode);
				}else{
					xhr.setRequestHeader('Content-type', contentType+';charset=' + encode);
				}

				if(contentLength != null){
					xhr.setRequestHeader('Content-Length', contentLength);
				}
			}

			xhr.send(data);
			return xhr;
		}
		function _serialize(obj){
			var a = [];
			for(var k in obj){
				var val = obj[k];
				if(val.constructor == Array){
					for(var i=0,len=val.length;i<len;i++){
						a.push(k + '=' + encodeURIComponent(val[i]));
					}
				}else{
					a.push(k + '=' + encodeURIComponent(val));
				}
			}
			return a.join('&');
		}
		function strToJson(str){
			var json = eval('(' + str + ')');
			return json;
	   }
		function _onStateChange(xhr,type,success,failure){
			//document.getElementById('testEng').innerHTML='调试：这个机顶盒碉堡了*520*1413*readyState 4';
			var s = xhr.status, result;
			if(s>= 200 && s < 300){
				switch(type){
					case 'text':
						result = xhr.responseText;
						break;
					case 'json':
						// http://snandy.javaeye.com/blog/615216
						//document.getElementById('testEng').innerHTML='responseText: '+xhr.responseText;
						result = function(str){
							try{
								//return JSON.parse(str);
								//document.getElementById('testEng').innerHTML='调试：这个机顶盒碉堡了*520*1413*json<br/>'+str;
								return strToJson(str);
							}catch(e){
								//document.getElementById('testEng').innerHTML=document.getElementById('testEng').innerHTML+'<br/>json error '+urlGolbal;//urlGolbal
								try{
									return (new Function('return (' + str + ")"))();
								}catch(e){
									failure(xhr,'parse json error',e);
								}
							}
						}(xhr.responseText);
						break;
					case 'xml':
						result = xhr.responseXML;
						break;
				}


				//typeof result !== 'undefined' && success(result);
				success(result);

			}else if(s===0){
				failure(xhr,'request timeout');
			}else{
				failure(xhr,xhr.status);
			}
			xhr = null;
		}
		return (function(){
			var Ajax = {request:request}, types = ['text','json','xml'];
			for(var i=0,len=types.length;i<len;i++){
				Ajax[types[i]] = function(i){
					return function(url,opt){
						opt = opt || {};
						opt.type = types[i];
						return request(url,opt);
					}
				}(i);
			}
			return Ajax;
		})();
	}();
	utv.ajax = Ajax;

	/*观察者模式*/
	utv.observer = function(){
		this.fns = [];
	};
	utv.observer.prototype = {
		subscribe:function(fn){
			this.fns.push(fn);
		}
		,unsubscribe:function(fn){
			var _fns = [];
			utv.each(this.fns,function(i,n){
				if(n!=fn) _fns.push(n);
			});
			this.fns = _fns;
		}
		,update:function(msg,e){
			utv.each(this.fns,function(i,n){
				n(msg,e);
			});
		}
	};

	/*
		从URL中获取参数 返回object
		参数rem为截取字符的标记，从哪个字符之后截取参数
	*/
	utv.getRequest=function(rem){
		var url = win.location.href //获取url
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
	         request[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
	      }
	   }
	   return request;
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

	//简单的解析
	utv.tpl = function(str,data){
		var vs = str.match(/\{\{(\w+)\}\}/ig) || [];
		var vstr = str,varr=[];
		if(vs.length){
			for(var i=0;i<vs.length;i++){
				if(vs[i].indexOf('{{')<=-1){
					continue;//此项不是{{aa}},跳过
				}
				varr[i] = vs[i].replace('{{','').replace('}}','');
				vstr = vstr.replace(vs[i],data[varr[i]]);
			}
		}
		return vstr;
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

	utv.keyboard = {//在电脑上要开启大写键盘
		code:""
		,getKeyValue : function(keyCode){
			 switch (keyCode) {
		        case 1:
		        case 38: //other browsers
		        case 65362: //上
				case 87:
					this.code = 'up';
		            break;
		        case 2:
		        case 40: //other browsers
		        case 65364: //下
				case 83:
					this.code = 'down';
		            break;
		        case 3:
		        case 37: //other browsers
		        case 65361: //左
				case 65:
					this.code = 'left';
		            break;
		        case 4:
		        case 39: //other browsers
		        case 65363: //右
				case 68:
					this.code = 'right';
		            break;
		        case 13:
		        case 65293: //确定
		        	this.code = 'enter';
		            break;
		        case 340:
		        case 8: //other browsers
		        case 27: //谷歌浏览器返回键返回页面问题，用ESC键暂代
		        case 65367: //返回
		        	this.code = 'back';
		            break;
				case 339:
					this.code = 'exit';
					break;
		        case 372:
		        case 25: //向前翻页
				case 306:
					this.code = 'pageUp';
		            break;
		        case 373:
		        case 26: //向后翻页
				case 307:
					this.code = 'pageDown';
		            break;
		        case 513: //right [Ctrl]
		        case 65360: //菜单
				case 72:
					this.code = 'menu';
		            break;
		        case 595: //[+]
		        case 63561: //音量加
				case 61:
					this.code = 'volUp';
		            break;
		        case 596: //[-]
		        case 63562: //音量减
				case 45:
					this.code = 'volDown';
		            break;
		        case 597: //[.]
		        case 63563: //静音
				case 67:
					this.code = 'mute';
		            break;
		        case 32:
		        	this.code = 'f1';
		            break;
		        case 33:
		        	this.code = 'f2';
		            break;
		        case 34:
		        	this.code = 'f3';
		            break;
		        case 35:
		        	this.code = 'f4';
		            break;
		        case 49:
		        	this.code = 'num1';
		            break;
		        case 50:
		        	this.code = 'num2';
		            break;
		        case 51:
		        	this.code = 'num3';
		            break;
		        case 52:
		        	this.code = 'num4';
		            break;
		        case 53:
		        	this.code = 'num5';
		            break;
		        case 54:
		        	this.code = 'num6';
		            break;
		        case 55:
		        	this.code = 'num7';
		            break;
		        case 56:
		        	this.code = 'num8';
		            break;
		        case 57:
		        	this.code = 'num9';
		            break;
		        case 48:
		        	this.code = 'num0';
		            break;
		        case 65307:
		        	this.code = 'track';
		            break;
		        case 36: // 喜爱
				case 76:
					this.code = 'fav';
		            break;
		        case 72: // 回看
		        	this.code = 'playBack';
		            break;
				case 320://red
				case 832:
					this.code = 'keyRed';
					break;
				case 321://green
				case 833:
					this.code = 'keyGreen';
					break;
				case 322://yellow
				case 834:
					this.code = 'keyYellow';
					break;
				case 323: //蓝键
				case 835:
					this.code = 'keyBlue';
					break;
				case 11001:
				case 10901:
					this.code = 'playEnd';
					break;
				case 5210:
				case 5209:
					this.code = 'ipanelPlay';
					break;
				case 5226:
					this.code = 'ipPlay5226';
					break;
				case 318:
					this.code = 'asterisk';//*
					break;
				case 319:
					this.code = 'pound';//#
					break;
				default:
					this.code = keyCode;
					break;
		    };
		    utv.log(this.code+'=>'+keyCode);
			return this.code;
		}
	};
	

	utv.eventCallback=function(keyCode){
		//自定义事件回调

	};
	//按键监听
	utv.keListener = {
		off:function(){
			//document.onkeydown = null;//在广东的机顶盒上，为了避免移动光标移动2次，去掉改行代码
			document.onirkeypress = null;
			document.onkeypress = null;
			document.onsystemevent = null;
			if(typeof (SysSetting) === 'undefined'){
				//解决电脑浏览器上大小写keycode不同的问题
				document.removeEventListener('keydown',this.dataFn,false);//浏览器测试
			}
			this.status = false;
		}
		,on:function(fn){
			if(!!fn){
				
				if(this.dataFn){
					this.off();
				}
				
				if(typeof (SysSetting) === 'undefined'){
					//解决电脑浏览器上大小写keycode不同的问题
					document.addEventListener('keydown',fn,false);//浏览器测试
				} else {
					//document.onkeydown = fn;//在广东的机顶盒上，为了避免移动光标移动2次，去掉改行代码
					document.onirkeypress = fn;
					document.onkeypress = fn;
					document.onsystemevent = fn;
				}
				this.dataFn = fn;
				this.status = true;
			}
		}
		,reon:function(){
			if(this.dataFn){
				this.on(this.dataFn);
			}
		}
		,dataFn:null
		,status:false
	};
	utv.keListener.on(function(){
		var event = arguments[0] || window.event;
		var keyCode = event.keyCode || event.which;
		return utv.eventCallback(keyCode);
	});

	//调试输出
	utv.log=function(s){
		if(!!console && !!console.log){
			console.log(s);
		}
		return 0;
	};

	win.utv = utv;

})(window,undefined);


