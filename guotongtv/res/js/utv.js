/*
	utv 基本操作类
	author:subying
*/
(function(win,undefined){
	var utv = {}
		,doc = document
	;


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
	utv.utv = "1.1"

	utv.extend = function() {
		var _clone= {},i=0,_obj,
		_arg=arguments,_co='',len=_arg.length,j=1;
		if(!_arg[1] && j===len){
			_clone=this;
		};
		for(;i<len;i++){
			_co = _arg[i];
			for(var name in _co){
				//深度拷贝
				_obj = _co[name];
				if( ( utv.isArr(_obj) || utv.isObj(_obj)) && (!_obj.nodeType) ){
					_clone[name] = utv.isArr(_obj)?[]:{};
					if(! utv.isEmptyObj(_obj)){
						_clone[name] = utv.extend(_obj,_clone[name]);
					}
				}else{
					_clone[name] = _obj;
				}
			}
		}

		return _clone;
	};


	//each封装方法
	utv.each = function(obj,fn){
		if(obj.length == undefined){
			for ( var i in obj )fn.apply( obj[i],[i,obj[i]]);
		}else{
			for(var i=0;i<obj.length;i++)fn.apply( obj[i],[i,obj[i]]);
		}
	};

	/*
		element 类
		params:  expression 为表达式  目前只支持#id(ID)  div(TagName)  .class(class)  暂不支持 复合的选择器  比如："div.abc" 和 "div img"
						context 为上下文
	*/
	var selectorRegExp = /^([#.]?)((?:[\w-]+|\*))$/;//判断的正则表达式
	var elemSearch= function(expression,context){//查询方法
		var reElement = [];
		//判断  context
		context = context || doc;
		if(context.navigator){//如果输入的是window
			context = context.doc;
		}else if(!context.nodeType){//如果不包含nodeType属性
			context = doc;
		}

		//如果表达式是字符串
		if( (typeof(expression)).toLowerCase() === "string"){
			var reSelector = expression.match(selectorRegExp);
			if(reSelector){
				var symbol = reSelector[1]
					,name = reSelector[2]
					,node, nodes=[]
					,elem
				;

				if(!symbol){//如果是tagName
					nodes = context.getElementsByTagName(name);
				}else if(symbol === '#'){//如果是id
					nodes = [];
					elem = context.getElementById(name);
					if(elem && elem.nodeType){
						nodes[0] = elem;
					}
				}else if(symbol === '.'){//如果是class
					if(context.getElementsByClassName){
						nodes = context.getElementsByClassName(name);
					}else{
						var matchClass = new RegExp('(^|\\s)'+ name +'(\\s|$)')
							,_nodes = []
						;
						nodes = context.getElementsByTagName('*');
						for (i = 0; node = nodes[i++];){
							className = node.className;
							if (!(className && matchClass.test(className))) continue;
							_nodes.push(node);
						}
						nodes = _nodes;
					}
				}
				reElement = nodes;
			}
		}

		return reElement;
	};

	utv.Elem = function(expression,context){
		var nodes = [];

		if(expression.nodeType && expression.nodeType ===1){
			nodes[0] = expression;
		}else if(expression.utv){
			nodes = expression.toElem();
		}else if(utv.isObj(expression) && expression.length){
			utv.each(expression,function(i,n){
				if(n.nodeType && n.nodeType ===1){
					nodes.push(n);
				}
			});
		}else{
			nodes = elemSearch(expression,context);
		}

		if(nodes.length===0){
			return false;
		}

		this.elems = nodes;
		this.init();//初始化方法
	}
	utv.Elem.prototype = {
		init:function(){
			var _self = this;
			_self.length = _self.elems.length;
		}
		,toElem:function(){//转换成element
			var _self = this;
			if(_self.length === 1){
				return _self.elems[0];
			}else{
				return _self.elems;
			}
		}
		,setAttr:function(attr,value){//设置属性
			utv.each(this.elems,function(i,n){
				utv.Attr.set(n,attr,value);
			});

			return this;
		}
		,getAttr:function(attr){//获取属性
			var _self = this
				,elem = _self.elems[0]
			;
			return utv.Attr.get(elem,attr);
		}
		,removeAttr:function(attr){//移除属性
			utv.each(this.elems,function(i,n){
				utv.Attr.remove(n,attr);
			});

			return this;
		}
		,hasClass:function(classname){//判断是否有该class
			var _self = this
				,elem = _self.elems[0]  //如果elems有多个也是返回第一个，对第一个进行判断（仿jquery）
			;
			return utv.className.has(elem,classname);
		}
		,addClass:function(classname){//添加样式
			utv.each(this.elems,function(i,n){
				utv.className.add(n,classname);
			});

			return this;
		}
		,removeClass:function(classname){//移除样式
			utv.each(this.elems,function(i,n){
				utv.className.remove(n,classname);
			});

			return this;
		}
		,childElem:function(){//查找子元素
			var _self = this
				,elem = _self.elems[0]
			;
			return utv.childElem(elem);
		}
		,getElem:function(expression){//查找所有元素
			var _self = this
				,elem = _self.elems[0]
			;
			return utv.getElem(elem,expression);
		}
		,siblingElem:function(){
			var _self = this
				,elem = _self.elems[0]
			;
			return utv.siblingElem(elem);
		}
		,parentElem:function(){//查找父级元素
			var _self = this
				,elem = _self.elems[0]
			;
			return utv.parentElem(elem);
		}
		,append:function(a){
			utv.domCrtl(this.elems[0],a,function(elem){
				this.appendChild(elem);
			});

			return this;
		}
		//在第一个孩子前插入
		,insert:function(el){
			utv.insert(this.elems[0],el);
			return this;
		}
		//移除第一个孩子，返回移除的孩子
		,removeFirstDom:function(el){
			var childs=this.childElem();
			if(childs.length<=0) return false;
			return utv.removeDom(this.elems[0],childs[0]);
		}
		//移除最后一个孩子，返回移除的孩子
		,removeLastDom:function(el){
			var childs=this.childElem();
			if(childs.length<=0) return false;
			return utv.removeDom(this.elems[0],childs.pop());
		}
		,getStyle:function(name){
			var _self = this
				,elem = _self.elems[0]
			;
			return utv.getStyle(elem,name);
		}
		,setStyle:function(name,value){
			var _self = this;
			utv.each(_self.elems,function(i,n){
				utv.setStyle(n,name,value);
			});

			return this;	
		}
		,getHTML:function(){
			var _self = this
				,elem = _self.elems[0]
			;
			return elem.innerHTML;
		}
		,setHTML:function(str){
			var _self = this;
			utv.each(_self.elems,function(i,n){
				n.innerHTML= str;
			});

			return this;
		}
		,utv:"1.0"
	};

	//针对className的操作
	utv.className = {
		has:function(elem,classname){
			if(elem && (elem.nodeType === 1) ){
				return !!elem.className.match(new RegExp('(^|\\s)'+classname+'(\\s|$)'));
			}
		}
		,add:function(elem,classname){
			if(elem && !this.has(elem,classname)){
				elem.className = (!!elem.className?elem.className+' ':'') +classname;
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
	}

	//针对Attribute的操作
	utv.Attr = {
		set:function(elem,attr,value){
			if(elem && elem.setAttribute){
				elem.setAttribute(attr,value);
				return true;
			}
			return false;
		}
		,get:function(elem,attr){
			if(elem && elem.getAttribute){
				return elem.getAttribute(attr);
			}
			return '';
		}
		,remove:function(elem,attr){
			if(elem && elem.removeAttribute){
				elem.removeAttribute(attr);
				return true;
			}
			return false;
		}
	}

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

	//在第一个子元素前插入,返回插入的节点
	utv.insert = function(parentEl,el){
		var existingnode=utv.childElem(parentEl);
		return parentEl.insertBefore(el,existingnode[0]);
	};
	//在最后一个子元素后插入,返回插入的节点
	utv.append = function(parentEl,el){
		return parentEl.appendChild(el);
	};
	//移除指定的子节点
	utv.removeDom=function(parentEl,el){
		return parentEl.removeChild(el);
	};

	//查找父级元素
	utv.parentElem = function(elem){
		var _parent = {};
		if(elem && elem.parentNode){
			_parent = elem.parentNode;
		}

		return _parent;
	}

	//查找所有元素
	utv.getElem = function(elem,expression){
		return elemSearch(expression,elem);
	};

	//获取元素的样式
	utv.getStyle = function(elem,name){
		var _attr = elem.currentStyle ? elem.currentStyle[name] : window.getComputedStyle(elem, false)[name];
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
		/*
		while ((elem = elem.previousSibling)){
			if(elem.nodeType === 1){
				_nodes.push(elem);
				break;
			}
		}

		elem = _elem;
		while ((elem = elem.nextSibling)){
			if(elem.nodeType === 1){
				_nodes.push(elem);
				break;
			}
		}
		*/

		return _nodes;
	}

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

	/*
		dom ready
	*/
	var dom = []
		,isReady = false
		,domReady
		,fireReady
		,initReady
	;
	domReady = function(fn){
		initReady();//如果没有完成dom分析，则先存储
		if(utv.isFn(fn)){
			if(isReady){
				fn();//如果已经完成dom分析 则直接运行
			}else{
				dom.push(fn);//存储加载事件
			}
		}
	}
	fireReady =function(){//执行方法
		if (isReady)  return false;
		isReady = true;
		for(var i=0,n=dom.length;i<n;i++){
			var fn = dom[i];
			fn();
		}
		dom.length = 0;//清空事件
	}
	initReady= function(){
		if(doc.addEventListener) {//机顶盒一般都支持这个
			if(doc.readyState && doc.readyState === 'complete'){
				isReady = true;
				return false;
			}

			doc.addEventListener( "DOMContentLoaded", function(){
				doc.removeEventListener( "DOMContentLoaded", arguments.callee, false );//清除加载函数
				fireReady();
			}, false );
		}else{//如果不支持则直接执行
			isReady = true;
		}
	}
	utv.ready = domReady;


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
			var s = xhr.status, result;
			if(s>= 200 && s < 300){
				switch(type){
					case 'text':
						result = xhr.responseText;
						break;
					case 'json':
						// http://snandy.javaeye.com/blog/615216

						result = function(str){
							try{
								//return JSON.parse(str);
								return strToJson(str);
							}catch(e){
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
				success(result)

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
	}
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
	}

	//简单的解析
	utv.tpl = function(str,data){
		var vs = str.match(/\{{(\w+)}}/ig) || [];
		var vstr = str,varr=[];
		if(vs.length){
			for(var i=0;i<vs.length;i++){
				varr[i] = vs[i].replace('{{','').replace('}}','');
				vstr = vstr.replace(vs[i],data[varr[i]]);
			}
		}
		return vstr;
	};

	//keyboard 机顶盒按键
	utv.keyboard = {
		num0:48 //数字0
		,num1:49 //数字1
		,num2:50 //数字2
		,num3:51 //数字3
		,num4:52 //数字4
		,num5:53 //数字5
		,num6:54 //数字6
		,num7:55 //数字7
		,num8:56 //数字8
		,num9:57 //数字9
		,back:8 //返回键
		,pound:319 //#键   
		,asterisk:318 //*键
		,enter:13// 确定键
		,pageUp:306 //上翻
		,pageDown:307 //下翻
		,keyUp:87 //向上键
		,keyDown:83 //向下键
		,keyLeft:65 //向左键
		,keyRight:68 //向右键
		,volUp:61 //加声音
		,volDown:45 //减声音
		,mute:67 //静音
		,exit:27 //退出
		,tv:80 //tv
		,keyRed:320 //红色按键 （功能键）
		,keyGreen:321 //绿色按键 （功能键）
		,keyYellow:322 //黄色按键 （功能键）
		,keyBlue:323 //蓝色按键 （功能键）
	}

	win.utv = utv;

})(window,undefined);
