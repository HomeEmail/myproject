
function tplObj(){
	this.tplHtml = {};
	this.icoData=['','jx','zr','zx'];//0对应空  1对应精选 2对应最热 3对应最新
}

tplObj.prototype = {
	setTpl:function(name,str){
		var _self = this;
		_self.tplHtml[name] = str;
	}
	,getTpl:function(name){
		return this.tplHtml[name];
	}
	,tpl:function(str,data){
		var vs = str.match(/\{{(\w+)}}/ig);
		var vstr = str,varr=[];
		for(var i=0;i<vs.length;i++){
			varr[i] = vs[i].replace('{{','').replace('}}','');
			vstr = vstr.replace(vs[i],data[varr[i]]);
		}
		return vstr;
	}
	//样式合并
	,combineStyle:function(obj){
		var str = '',n='';
		for(n in obj){
			if(n && obj[n]){
				str = str + ' '+n+':'+obj[n]+';';
			}
		}
		str = ' style="' + str + '" ';

		return str;
	}

	//转换  针对于首页改版
	,dataToHtml:function(name,data,tplAll){//对应的名称
		if(!name || !data) return false;// 判断

		var _self = this
			,resultStr = ''
			,_data = ''
		;
		if(!data ) return false;

		_data = _self.trJSON(name,data);
		var strTpl = _self.getTpl(name);
		resultStr = _self.tpl(strTpl, _data);

		return resultStr;
	}
	,trJSON:function(name,data){
		var _self = this
			,_trData = {}
			,_obj = {}

			,href = ''//链接
			,topShow = 'hide' //hide表示隐藏  留空则表示显示  顶部 ‘更新至20集’  是否显示  通过判断topCorner
			,topCorner = ''//顶部的内容
			,img = '' //图片路径
			,corner = '' // 右上角的ico标签
			,titleShow = 'hide'// hide表示隐藏  留空则表示显示  showStatus 1为显示
			,coverStyle = ''//标题遮罩层样式 主要是 colorTemplates（模板颜色） bgColor（选择的背景颜色） transparency（透明度）优先 colorTemplates 如果colorTemplates为'#'则使用bgColor
			,titleStyle = '' //设置标题字体样式
			,title = '' //标题
			,colorTpl = ''// 模板颜色
			,bgColor = ''//背景色
			,transparency = ''//透明度
			,titleColor = ''//标题字体颜色
			,titleBold = ''//标题字体是否加粗
			,imgType = 'cms' //通过这个字段来判断读取的图片路径

			,_json = {}
		;
		data = data.length?data:[{}];

		for(var i=0;i<data.length;i++){
			_obj = data[i];
			img = _obj['img'] || "";//图片
			href = _obj['href'] || "";//链接

			topCorner = _obj['topCorner'] || "";//顶部内容
			if(topCorner && topCorner != ''){
				topShow = '';
			}else{
				topShow = 'hide';
			}

			corner = _self.icoData[_obj['leftCorner']] || "";//右上角标签

			title = _obj['title'] || "";//标题
			colorTpl = _obj['colorTemplates'] || "#";//模板颜色
			bgColor = _obj['bgColor'] || "";//背景颜色
			transparency = _obj['transparency'] || "";//透明度
			titleColor = _obj['titleColor'] || "";//字体颜色
			titleBold = _obj['btitle'] || "";//字体是否加粗 0表示不加粗
			imgType = _obj['imgType'] ;//图片路径
			if(!titleBold){
				titleBold = '';
			}
			if(_obj['showStatus']){
				titleShow = '';
			}else{
				titleShow = 'hide';
			}

			//如果模板颜色为'#' 则表示没有选择模板颜色
			if(colorTpl === '#'){
				colorTpl = bgColor;
			}
			coverStyle = _self.combineStyle({'background-color':colorTpl,'opacity':transparency});
			titleStyle = _self.combineStyle({'color':titleColor,'font-weight':titleBold});

			//
			_trData = {
				'img':((imgType==="cms")?pageAdminUrlUploadfile:adminUrlUploadfile)+img
				,'href':href?href:''
				,'topCorner':topCorner
				,'topShow':topShow
				,'corner':corner
				,'titleShow':titleShow
				,'coverStyle':coverStyle
				,'titleStyle':titleStyle
				,'title':title
			};

			//转换数据
			for(_j in _trData){
				_json[_j+(i+1)] = _trData[_j];
			}

		}


		return _json;
	}


};

function $$(id){
	return id?document.getElementById(id):'';
}

function child(elem){
	if(!elem || (elem.nodeType && elem.nodeType !=1)) return false;
	var _elems = [],_child = elem.childNodes,len = elem.childNodes.length;
	for(var i=0;i<len;i++){
		if(_child[i].nodeType === 1){
			_elems.push(_child[i]);
		}
	}
	return _elems;
}

//菜单
function subMenu(opt){
	//判断
	if(!opt) return false;

	this.timer = null; //时间标记
	this.nav = $$(opt.nav);//列表
	this.wrp = $$(opt.wrp);//外层
	this.menuCount = 0;//菜单个数
	this.menuIndex = opt.mIndex;//一开始选中第几个选项
	this.mHeight = opt.mHeight;//每项的高度
	this.showCount = opt.showCount;//显示的个数
	this.aniStart = 0;//动画起始值
	this.aniEnd = 0;//动画结束值
	this.aniStatus = false;//动画状态
	this.endPlay = opt.endPlay || new Function;//动画结束后执行的方法
	this.beforePlay = opt.beforePlay || new Function;//动画结束后执行的方法

	this.init();//初始化
}
subMenu.prototype = {
	init:function(){
		var _self = this
			,_elems = child(_self.nav)
		;
		_self.menuCount = _elems.length;
		_self.menuItems = _elems;

		//复制
		var _html = _self.nav.innerHTML;
		_self.nav.innerHTML = _html + _html;

		//child(_self.nav)[_self.menuIndex-1].className = 'focus';
		utv.className.add(child(_self.nav)[_self.menuIndex-1],'focus');
	}

	//滚动
	,slide:function(dir,init){
		//先停止动画
		if(this.aniStatus){
			this.stop();
		}

		var _self = this
			,_top = _self.nav.style.top
			,_start = 0
			,_end
			,_oldIndex = _self.menuIndex
		;
		_top = (_top==="")?0:parseInt(_top,10);

		if(init){

			if(_oldIndex<=Math.ceil(_self.showCount/2)){
				_top = -(_self.mHeight * ( _oldIndex-Math.ceil(_self.showCount/2)+_self.menuCount));
			}else{
				_top = -(_self.mHeight * ( _oldIndex-Math.ceil(_self.showCount/2) ));
			}
		}

		//上移到顶 判断
		if(_top === 0 && dir==="up"){
			_top = -(_self.mHeight * _self.menuCount);
		}

		//下移到底 判断
		if(_top === -(_self.mHeight*(_self.menuCount*2-_self.showCount)) && dir==='down'){
			_top = -(_self.mHeight * (_oldIndex-Math.ceil(_self.showCount/2)));
		}

		_start = _top;
		_self.nav.style.top = _top+'px'

		//方向判断
		if(dir === 'up'){
			_top = _top + _self.mHeight;
			_self.menuIndex--;
		}else{
			_top = _top - _self.mHeight;
			_self.menuIndex++;
		}
		_end = _top;

		//menuIndex 判断
		if(_self.menuIndex<1){
			_self.menuIndex = _self.menuCount;
		}else if(_self.menuIndex>_self.menuCount){
			_self.menuIndex = 1
		}


		//执行动画前
		_self.beforePlay.call(_self,_oldIndex);

		//执行动画
		_self.play(_start,_end,500,function(){
			_self.endPlay.apply(_self);//执行完成回调
		},init);
		_self.aniStart = _start;
		_self.aniEnd = _end;
	}

	//动画
	,play:function(start,end,dur,endAni,init){
		var _self = this
			,elem = _self.nav
			,startTime = (new Date()).getTime()
			,per = 0
		;

		_self.aniStatus = true;//正在动画中

		/*初始化不需要执行动画*/
		if(init){
			dur = 1;
		}

		_self.timer = setTimeout(function(){
			ani();
		},50);

		function ani(){
			if(_self.timer){
				clearTimeout(_self.timer);
			}

			per = Math.min(1.0, ((new Date()).getTime() - startTime) / dur);

			//判断是否执行完毕
			if(per>=1){
				_self.stop();

				var _type = typeof(endAni);
				if(_type.toLowerCase() === 'function'){
					endAni();
				}
			}else{
				elem.style.top = start+Math.round((end-start) * per)+'px';
				_self.timer = setTimeout(function(){ani();},50);
			}
		}

	}

	//停止动画
	,stop:function(){
		var _self = this;

		//立刻停止则执行完效果
		_self.nav.style.top = _self.aniEnd+'px';

		clearTimeout(_self.timer);
		_self.aniStatus = false;//停止动画
	}

	//上翻
	,turnUp:function(){
		this.slide('up');
	}

	//下翻
	,turnDown:function(){
		this.slide('down');
	}
};

//列表
function subList(opt){
	//判断
	if(!opt) return false;

	this.list = $$(opt.list); //列表
	this.listItems = '';//列表项
	this.listCount = 0;//列表项数量
	this.index = (opt.index>-1)?opt.index:-1;//索引,从0开始
	this.afterMove  = opt.afterMove || new Function;//移动之后执行的方法
	this.beforeMove  = opt.beforeMove || new Function;//移动之前执行的方法

	this.init();//初始化
}
subList.prototype = {
	//初始化
	init:function(){
		var _self = this;
		//var _$list = $(_self.list);
		//_self.listItems = child(_self.list);
		//_self.listItems = _$list.find('.con_tab');
		_self.listItems = utv.getElem(_self.list,'.con_tab');
		_self.listCount = _self.listItems.length;
		if(_self.index>-1){
			utv.className.add(_self.listItems[_self.index],'focus');
		}
	}

	,move:function(oldIndex,newIndex,dir){
		var _self = this;

		//移动前执行的方法
		var rmove = _self.beforeMove.call(_self,oldIndex,newIndex,dir);
		if(!rmove) return false;//如果返回false 则终止下面的操作

		_self.index = newIndex;
		if(oldIndex>=0 && oldIndex<=(_self.listCount-1)){
			utv.className.remove(_self.listItems[oldIndex],'focus');
		}
		utv.className.add(_self.listItems[newIndex],'focus');

		//移动后执行的方法
		_self.afterMove.call(_self,oldIndex,newIndex,dir);
	}

	//左边移动
	,turnLeft:function(){
		var _self = this
			,_oldIndex = _self.index
			,_elem = _self.listItems[_oldIndex]
			,_newIndex = _oldIndex-1;
		;
		if(_elem && _elem.getAttribute && _elem.getAttribute('data-left')){
			_newIndex = parseInt(_elem.getAttribute('data-left'))-1;
		}
		if(_newIndex<0){
			//_newIndex = _self.listCount-1;
			_newIndex = 0;
		}
		_self.move(_oldIndex,_newIndex,'left');
	}

	//右移动
	,turnRight:function(){
		var _self = this
			,_oldIndex = _self.index
			,_elem = _self.listItems[_oldIndex]
			,_newIndex = _oldIndex+1;
		;
		if(_elem && _elem.getAttribute && _elem.getAttribute('data-right')){
			_newIndex = parseInt(_elem.getAttribute('data-right'))-1;
		}

		if(_newIndex>_self.listCount-1){//移动到最后一个
			//_newIndex = 0;
			_newIndex = _self.listCount-1;
		}
		_self.move(_oldIndex,_newIndex,'right');
	}

	//上移动
	,turnUp:function(){
		var _self = this
			,_oldIndex = _self.index
			,_elem = _self.listItems[_oldIndex]
			,_newIndex = 0
		;
		if(_elem && _elem.getAttribute){
			_newIndex = parseInt(_elem.getAttribute('data-up'))-1;
			if(_newIndex>=0 && _newIndex<_self.listCount){
				_self.move(_oldIndex,_newIndex,'up');
			}else{
				return false;
			}
		}
	}

	//下移动
	,turnDown:function(){
		var _self = this
			,_oldIndex = _self.index
			,_elem = _self.listItems[_oldIndex]
			,_newIndex = 0
		;
		if(_elem && _elem.getAttribute){
			_newIndex = parseInt(_elem.getAttribute('data-down'))-1;
			if(_newIndex>=0 && _newIndex<_self.listCount){
				_self.move(_oldIndex,_newIndex,'down');
			}else{
				return false;
			}
		}
	}

	,reset:function(){
		var _self = this;
		/*
		_self.listItems = child(_self.list);
		_self.listCount = _self.listItems.length;
		_self.index = -1;//索引
		*/
		_self.index = -1;//索引
		_self.init();

	}
	//清理状态 将样式清理  索引初始化
	,clear:function(){
		var _self = this;
		utv.className.remove(_self.listItems[_self.index],'focus');
		_self.index = -1;//索引
	}
};

//ajax 事件列表
function ajaxEvent(opt){
	this.data = {};//获取到的数据
	this.cacheTime = 10000;//缓存时间 默认10s 即如果在10s内重复请求 则读取缓存的数据
	this.list = [];//事件列表
	this.status = false;//是否在执行ajax请求 false表示没有在执行
	this.req = {};//缓存的请求对象
}

ajaxEvent.prototype = {
	get:function(name,data,pdata){}

	,done:function(url,name,pdata){
		var _self = this
			,_data = _self.getData(name)
			,_now = (new Date).getTime()
		;

		/**/
		if(_data && _data.time ){//缓存时间判断
			_self.get(name,_data.data,pdata);//执行方法
			return false;
		}


		if(_self.status && _self.req.abort){// $.ajax() 返回其创建的 XMLHttpRequest 对象，通过对象的abort方法可以中断请求
			_self.req.abort();
		}

		_self.req = new utv.ajax.json(url,{
			success:function(backdata){
				_self.get(name,backdata,pdata);
				_self.status = false;
				_self.setData(name,backdata);
			}
			,failure:function(xhr,str){
				//_self.done();
			}
		});

		_self.status = true;
	}

	,setData:function(name,data){
		this.data[name] = {
			'data':data
			,'time':(new Date()).getTime()
		}
	}
	,getData:function(name){
		return this.data[name];
	}
};


//测试专用方法
var testEng = {
	log:function(name,str){
		var _self = this
			,_obj = _self.obj
			,_text = _obj.innerHTML
		;
		var reg = new RegExp('\{'+name+':([^\{^\{^}]*)\}'),_match;
		if(_text.match(reg)){
			_match = _text.match(reg);
			_obj.innerHTML = _text.replace(_match[1],str);
		}else{
			_obj.innerHTML = _text+'{'+name+':'+str+'}';
		}
	}
	,obj:$$('testEng')
};

	//返回到上一页
function goBack(goBackURL) {
	// typeof 返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined"
	if (typeof(goBackURL) != "undefined" && goBackURL != null && goBackURL != "") {
		window.location.href = goBackURL;
		// window.location.href=document.referrer;
	} else {
		window.history.go(-1);
	}

}

//跳转到指定页面
function gotoPage(url) {
	window.location.href = url;
}


/*
网站 按键操作 配置 --可以动态修改
*/
var keyPadConfig = {
		keyTimeout:250//按键延时
		,keyStatus:1//1表示可执行按键事件  0表示不可执行
	}
; 

//遥控器按键事件-观察者模式  start
var keObs = new utv.observer()
	,keObsFn = function(event){
		var keycode = event.which;
		if(keyPadConfig.keyStatus === 1){
			keyPadConfig.keyStatus = 0;
			setTimeout(function(){
				keyPadConfig.keyStatus = 1;
			},keyPadConfig.keyTimeout);
		}else{
			return false;
		}

		keObs.update(keycode,event);

		//如果是返回、上下翻页事件
		if(keycode === 8 || keycode === 306 || keycode=== 307){
			//执行完事件后返回false  阻止默认事件
			return false;
		}
		
	}
;
//按键监听
var keListener = {
	start:function(){
		this.set(keObsFn);
	}
	,stop:function(){
		document.onirkeypress = null;
		document.onkeypress = null;
		document.onsystemevent = null;

		if(typeof (SysSetting) === 'undefined'){
			document.removeEventListener('keydown',this.dataFn,false);//浏览器测试
		}

		this.status = false;
	}
	,set:function(fn){
		if(utv.isFn(fn)){
			if(this.dataFn){
				this.stop();
			}

			document.onirkeypress = fn;
			document.onkeypress = fn;
			document.onsystemevent = fn;

			if(typeof (SysSetting) === 'undefined'){
				document.addEventListener('keydown',fn,false);//浏览器测试
			}

			this.dataFn = fn;
			this.status = true;
		}
	}
	,dataFn:null
	,status:false
};
keListener.start();
//遥控器按键事件-观察者模式  end 