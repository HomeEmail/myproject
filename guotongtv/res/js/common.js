
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

//返回到上一页,或者参数指定回到哪页
function goBack(goBackURL) {
	// typeof 返回的是字符串，
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

/***元素是否display：none了**/
function isNone(el){
	return utv.className.has(el,'none') || utv.getStyle(el,'display')=='none';
}


/*
网站 按键操作 配置 --可以动态修改
*/
var keyPadConfig = {
		keyTimeout:150//按键延时
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









//菜单,适用于菜单个数比可见个数多2个的情况,如菜单个数不够，需手动在html里按倍数复制菜单，凑够个数
/*
var indexMenu=new SubMenu({
	//菜单,适用于菜单个数比可见个数多2个的情况
	nav:'indexListLeftMenuContentBox'//列表id
	,menuInitIndex:3//数组中第几个选项被选中，从0计数
	//,selectFixedIndex:3
	,mHeight:140//每项的高度
	,showCount:4//显示的个数
	,endPlay:function(){
		this.selectAction();//自定义菜单处理
	}
	,beforePlay:function(){}
	,focusClass:'focus'
	,hoverClass:'on'
	,moveCssProp:'marginTop'
});
*/
function SubMenu(opt){
	//判断
	if(!opt) return false;

	this.nav = $$(opt.nav);//列表
	this.menuCount = 0;//菜单个数
	this.menuCurIndex = opt.menuCurIndex||1;//数组中第几个选项被选中，从1计数,
	this.mHeight = opt.mHeight;//每项的高度
	this.showCount = opt.showCount;//显示的个数
	this.aniStart = 0;//动画起始值
	this.aniEnd = 0;//动画结束值
	this.aniStatus = false;//动画状态
	this.endPlay = opt.endPlay || new Function;//动画结束后执行的方法
	this.beforePlay = opt.beforePlay || new Function;//动画结束后执行的方法
	this.toToped = opt.toToped || new Function;//到顶部了 执行的方法
	this.toBottomed = opt.toBottomed || new Function;//到底部了 执行的方法
	this.menuItemFocusClass=opt.focusClass||'';
	this.menuItemHoverClass=opt.hoverClass||'';
	this.upTipsBt=opt.upTipsBt||null;//dom
	this.downTipsBt=opt.downTipsBt||null;//dom
	this.upTipsOnClass=opt.upTipsOnClass||'';
	this.upTipsOffClass=opt.upTipsOffClass||'';
	this.downTipsOnClass=opt.downTipsOnClass||'';
	this.downTipsOffClass=opt.downTipsOffClass||'';

	this.moveCssProp=opt.moveCssProp||'top';//改变哪个css属性,填写css的js对象属性
	this.menuItems=[];//菜单列表
	this.offsetUp=0;//上偏移个数
	this.offsetDown=0;//下偏移个数
	this.init();//初始化
}
SubMenu.prototype = {
	init:function(){
		var _self = this
			,_elems = child(_self.nav)
		;
		_self.menuCount = _elems.length;

		_self.menuItems = _elems;

		this.offsetUp=this.menuCurIndex-this.showCount;
		if(this.offsetUp<=0){
			this.offsetUp=0;
		}
		this.offsetDown=_self.menuCount-this.showCount-this.offsetUp;
		this.nav.style[this.moveCssProp]=0+'px';
		//utv.className.add(_self.menuItems[_self.menuCurIndex-1],'focus');
		this.addFHClass();
		this.downTipsBtChange();
		this.upTipsBtChange();
	}
	,selectAction:function(){}//预留的选中操作接口，用户自定义
	,getSelectItem:function(){
		return this.menuItems[this.menuCurIndex-1];
	}
	,addFocusClass:function(i){
		var item=(parseInt(i,10)>=0 ? this.menuItems[i] : this.getSelectItem());
		utv.className.add(item,this.menuItemFocusClass);
	}
	,addHoverClass:function(i){
		var item=(parseInt(i,10)>=0 ? this.menuItems[i] : this.getSelectItem());
		utv.className.add(item,this.menuItemHoverClass);
	}
	,removeFocusClass:function(i){
		var item=(parseInt(i,10)>=0 ? this.menuItems[i] : this.getSelectItem());
		utv.className.remove(item,this.menuItemFocusClass);
	}
	,removeHoverClass:function(i){
		var item=(parseInt(i,10)>=0 ? this.menuItems[i] : this.getSelectItem());
		utv.className.remove(item,this.menuItemHoverClass);
	}
	,addFHClass:function(i){
		this.addFocusClass(i);
		this.addHoverClass(i);
	}
	,removeFHClass:function(i){
		this.removeFocusClass(i);
		this.removeHoverClass(i);
	}
	,downTipsBtChange:function(){
		if(this.offsetDown<=0){
			this.toBottomed();
			if(this.downTipsBt){
				utv.className.remove(this.downTipsBt,this.downTipsOnClass);
				utv.className.add(this.downTipsBt,this.downTipsOffClass);
			}
		} else {
			if(this.downTipsBt){
				utv.className.remove(this.downTipsBt,this.downTipsOffClass);
				utv.className.add(this.downTipsBt,this.downTipsOnClass);
			}
		}
	}
	,upTipsBtChange:function(){
		if(this.offsetUp<=0){
			this.toToped();
			if(this.upTipsBt){
				utv.className.remove(this.upTipsBt,this.upTipsOnClass);
				utv.className.add(this.upTipsBt,this.upTipsOffClass);
			}
		} else {
			if(this.upTipsBt){
				utv.className.remove(this.upTipsBt,this.upTipsOffClass);
				utv.className.add(this.upTipsBt,this.upTipsOnClass);
			}
		}
	}
	,slide:function(dir){
		var oldIndex=this.menuCurIndex

		;
		
		if(dir=='up'){
			if(oldIndex>=this.menuCount){
				//已到底部
				return;
			}
			this.beforePlay();
			this.menuCurIndex++;
			if(this.menuCurIndex>(this.showCount+this.offsetUp)){
				//需要移动列表,
				var tv=utv.getStyle(this.nav,this.moveCssProp);
				tv=parseInt(tv,10);
				//console.log(tv);
				this.nav.style[this.moveCssProp]=(tv-this.mHeight)+'px';
				this.offsetUp++;
				this.offsetDown--;
			}
			//focus下走
			//console.log(this.offsetUp+'|'+this.offsetDown);
			//utv.className.remove(this.menuItems[oldIndex-1],'focus');
			this.removeFHClass(oldIndex-1);
			//utv.className.add(this.menuItems[this.menuCurIndex-1],'focus');
			this.addFHClass();

			
			this.endPlay();

		} else {
			if(oldIndex<=1){
				//已到顶部
				
				return;
			}
			this.beforePlay();
			this.menuCurIndex--;
			if(this.menuCurIndex<=(this.menuCount-(this.showCount+this.offsetDown))){
				//需要移动列表，
				var tv=utv.getStyle(this.nav,this.moveCssProp);
				tv=parseInt(tv,10);
				//console.log(tv);
				this.nav.style[this.moveCssProp]=(tv+this.mHeight)+'px';
				this.offsetUp--
				this.offsetDown++
			}
			//focus上走
			//console.log(this.offsetUp+'|'+this.offsetDown);
			//utv.className.remove(this.menuItems[oldIndex-1],'focus');
			this.removeFHClass(oldIndex-1);
			//utv.className.add(this.menuItems[this.menuCurIndex-1],'focus');
			this.addFHClass();

			
			this.endPlay();
		}

		this.downTipsBtChange();
		this.upTipsBtChange();

	}
	//上翻
	,turnUp:function(){
		this.slide('down');
		//this.slide('up');
	}

	//下翻
	,turnDown:function(){
		this.slide('up');
		//this.slide('down');
	}
};


//菜单
//两种动画方式play与play1，play1好点
function subMenu(opt){
	//判断
	if(!opt) return false;

	this.timer = null; //时间标记
	this.nav = $$(opt.nav);//列表
	this.wrp = $$(opt.wrp);//外层
	this.menuCount = 0;//菜单个数
	this.menuIndex = opt.mIndex;//选中第几个选项
	this.mHeight = opt.mHeight;//每项的高度
	this.showCount = opt.showCount;//显示的个数
	this.aniStart = 0;//动画起始值
	this.aniEnd = 0;//动画结束值
	this.aniStatus = false;//动画状态
	this.endPlay = opt.endPlay || new Function;//动画结束后执行的方法
	this.beforePlay = opt.beforePlay || new Function;//动画结束后执行的方法
	this.duration=opt.duration||300;
	this.perTime=opt.perTime||33;//每帧耗时
	this.totalFS=opt.totalFS||5;//每次运动执行的帧数
	this.menuItemFocusClass=opt.focusClass||'';
	this.menuItemHoverClass=opt.hoverClass||'';
	this.posing=0;//正在运动的位置
	this.init();//初始化
}
subMenu.prototype = {
	init:function(){
		var _self = this
			,_elems = child(_self.nav)
		;
		_self.menuCount = _elems.length;
		//_self.menuItems = _elems;

		//复制
		var _html = _self.nav.innerHTML;
		_self.nav.innerHTML = _html + _html;

		_self.menuItems = child(_self.nav);
		//child(_self.nav)[_self.menuIndex-1].className = 'focus';
		utv.className.add(_self.menuItems[_self.menuIndex-1],'focus');
	}
	,selectAction:function(){}//预留的选中操作接口，用户自定义
	,getSelectItem:function(){
		return this.menuItems[this.menuIndex-1];
	}
	,addFocusClass:function(){
		utv.className.add(this.getSelectItem(),this.menuItemFocusClass);
	}
	,addHoverClass:function(){
		utv.className.add(this.getSelectItem(),this.menuItemHoverClass);
	}
	,removeFocusClass:function(){
		utv.className.remove(this.getSelectItem(),this.menuItemFocusClass);
	}
	,removeHoverClass:function(){
		utv.className.remove(this.getSelectItem(),this.menuItemHoverClass);
	}
	//滚动
	,slide:function(dir){
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
		////console.log(_oldIndex);
		

		//上移到顶 判断
		if(_top === 0 && dir==="up"){
			_top = -(_self.mHeight * _self.menuCount);
		}

		//下移到底 判断
		if(_top === -(_self.mHeight*(_self.menuCount*2-_self.showCount)) && dir==='down'){
			//_top = -(_self.mHeight * (_oldIndex-Math.ceil(_self.showCount/2)));
			_top = -(_self.mHeight * (_self.menuCount-_self.showCount));
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
		_self.play1(_start,_end,_self.duration,function(){
			_self.endPlay.apply(_self);//执行完成回调
		});
		_self.aniStart = _start;
		_self.aniEnd = _end;
	}
	,play1:function(start,end,dur,endAni){
		var _self = this
			,elem = _self.nav
			,startTime = (new Date()).getTime()
			,per = 0
		;

		_self.aniStatus = true;//正在动画中


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
				_self.timer = setTimeout(function(){ani();},_self.perTime);
			}
		}
		ani();

	}
	//动画
	,play:function(start,end,dur,endAni){
		var _self = this
			,elem = _self.nav
			,tempTotalFs=_self.totalFS
			,_start=start
			,_perAdd=Math.floor((end-start)/tempTotalFs)
			
		;

		_self.aniStatus = true;//正在动画中

		function ani(){
			if(_self.timer){
				clearTimeout(_self.timer);
				_self.timer=null;
			}
			//console.log(tempTotalFs);
			//判断是否执行完毕
			if(tempTotalFs<=0){
				_self.stop();

				var _type = typeof(endAni);
				if(_type.toLowerCase() === 'function'){
					endAni();
				}

				_self=null;elem=null;tempTotalFs=null;_start=null;_perAdd=null;
			} else {
				--tempTotalFs;
				_start=_start+_perAdd;
				elem.style.top = _start+'px';
				_self.timer = setTimeout(ani,_self.perTime);
			}
		}
		ani();

	}

	//停止动画
	,stop:function(){
		var _self = this;

		//立刻停止则执行完效果
		_self.nav.style.top = _self.aniEnd+'px';

		clearTimeout(_self.timer);
		_self.timer=null;
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




//ajax 事件列表,一个页面最好只有一个ajax事件控制着
/***
var ajax1=new AjaxEvent({
	cacheTime:30000//缓存时间
});
ajax1.dataAction=function(data,pdata){
	//自定义获得数据后数据处理函数,data数据，pdata额外的参数
};
ajax1.exec(url,name,pdata,ajaxOpt,newFetch);//执行ajax请求;name为数据键名,pdata额外数据，ajaxOpt 为ajax参数包含{ajaxOpt.data，ajaxOpt.method，ajaxOpt.timeout；newFetch跳过缓存强制加载
**/
function AjaxEvent(opt){
	this.data = {};//获取到的数据
	this.cacheTime = opt.cacheTime||30000;//缓存时间 默认30s 即如果在30s内重复请求 则读取缓存的数据
	this.list = [];//事件列表
	this.status = false;//是否在执行ajax请求 false表示没有在执行
	this.req = {};//缓存的请求对象
}

AjaxEvent.prototype = {
	dataAction:function(data,pdata){}//获得数据后如何处理，用户自定义; data数据，pdata额外的参数
	,fail:function(xhr,str){}//获得数据失败后的处理，用户自定义
	,exec:function(url,name,pdata,ajaxOpt,newFetch){
		var _self = this
			,_data = _self.getData(name)
			,_now = (new Date).getTime()
			,newFetch = newFetch || false
			,ajaxData=ajaxOpt ? (ajaxOpt.data||null) :null
			,ajaxMethod=ajaxOpt ? (ajaxOpt.method||'POST') :'POST'
			,ajaxTimeout=ajaxOpt ? (ajaxOpt.timeout||0) :0
		;

		/**/
		if(!!!newFetch && !!_data && (_now-_data.time)<_self.cacheTime ){//缓存时间判断
			_self.dataAction(_data.data,pdata);//执行方法
			return false;
		}


		if(_self.status && _self.req.abort){// $.ajax() 返回其创建的 XMLHttpRequest 对象，通过对象的abort方法可以中断请求
			_self.req.abort();
		}

		if(utv.cookie.get('token')!=null){
			ajaxData=utv.extend(ajaxData,{token:utv.cookie.get('token')});
		}
		
	
		_self.req = new utv.ajax.json(url,{
			data:ajaxData
			,method:ajaxMethod
			,timeout:ajaxTimeout
			,success:function(backdata){
				_self.dataAction(backdata,pdata);
				_self.status = false;
				_self.setData(name,backdata);
			}
			,failure:function(xhr,str){
				_self.fail();
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




//列表操作类
/*******
var list1=new SubList({
	listId:'con_tabid'//列表id
	,itemClass:'con_tab'//列表项类
	,index:0//当前选中哪项
	,afterMove:function(oldIndex,newIndex,dir){
		//oldIndex:前一个选中,newIndex:新选中,dir:方向,up,down,left,right
	}
	,begoreMove:function(oldIndex,newIndex,dir){
		//oldIndex:前一个选中,newIndex:新选中,dir:方向

		//return false;//返回false终止接下来的操作
	}
});

***/
function SubList(opt){
	//判断
	if(!opt) return false;

	this.list = $$(opt.listId); //列表
	this.itemClass = opt.itemClass||'.con_tab';
	this.listItems = '';//列表项
	this.listCount = 0;//列表项数量
	this.index = (opt.index>-1)?opt.index:-1;//索引,从0开始
	this.afterMove  = opt.afterMove || new Function;//移动之后执行的方法
	this.beforeMove  = opt.beforeMove || new Function;//移动之前执行的方法

	this.init();//初始化
}
SubList.prototype = {
	//初始化
	init:function(){
		var _self = this;
		//var _$list = $(_self.list);
		//_self.listItems = child(_self.list);
		//_self.listItems = _$list.find('.con_tab');
		_self.listItems = utv.getElem(_self.list,_self.itemClass);
		_self.listCount = _self.listItems.length;
		if(_self.index>-1){
			utv.className.add(_self.listItems[_self.index],'focus');
		}
	}
	,getSelectItem:function(){
		//if(this.index<=-1) return false;//没选中项，返回false
		//return this.listItems[this.index];
		return this.getItem(this.index);
	}
	,getItem:function(i){
		if(i<=-1 || i>=this.listItems.length) return false;//没选中项，返回false
		return this.listItems[i];
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
		if(_newIndex>=0&&!!!_self.listItems[_newIndex]){
			return;
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
		if(_newIndex>=0&&!!!_self.listItems[_newIndex]){
			return;
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
		if(_elem && _elem.getAttribute && _elem.getAttribute('data-up')){
			_newIndex = parseInt(_elem.getAttribute('data-up'))-1;
			if(_newIndex>=0 && _newIndex<_self.listCount && !!_self.listItems[_newIndex]){
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
		if(_elem && _elem.getAttribute && _elem.getAttribute('data-down')){
			_newIndex = parseInt(_elem.getAttribute('data-down'))-1;
			if(_newIndex>=0 && _newIndex<_self.listCount && !!_self.listItems[_newIndex]){
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



/***弹出层类***/
var overlayObj = {
	wrapper:''//最外包层
	,cover:''//遮罩
	,comTips:''//通用
	,tpl:{
		comTips : [//通用消息提示tpl
			'<div class="upTips">'
				,'<div class="" id="comTipsText"></div>'
				,'<div class="" id="comTipsBtn"></div>'
				,'<div class="" id="comTipsTips"></div>'
			,'</div>'
		]

	}
	,getTemplate:function(tplName){
		return !!this.tpl[tplName] ? this.tpl[tplName].join(''):'';
	}
	,createDiv:function(tplName){//创建层
		if(!!!this.tpl[tplName]){
			//没有定义这个弹出层
			alert('请先定义弹出层模板对象');
			return;
		}
		if(!!!this.wrapper){
			this.wrapper=new utv.Elem('.wrapper');
			////console.log(this.wrapper);
		}

		if(!!!this.cover){
			this.cover = utv.toDom('<div class="allCover"></div>')[0];
			////console.log(this.cover);//console.log(this.wrapper);
			this.wrapper.append(this.cover);//
		}
		////console.log(this.wrapper);	
		if(!!!this[tplName]){
			this[tplName] = utv.toDom(this.getTemplate(tplName))[0];
			this.wrapper.append(this[tplName]);
		}
		////console.log(this[tplName]);
		return this;
	}
	,showOverlay:function(tplName){
		this[tplName].style.display = 'block';
		this.cover.style.display = 'block';

		return this;

	}
	,hideOverlay:function(tplName){
		this[tplName].style.display = 'none';
		this.cover.style.display = 'none';


		return this;
	}
};
function LoadingUpTips(id){
	this.tpl='<div class="loadingUpTips" id="'+(id||'')+'"><img src="../res/images/loading.gif" /></div>';
	this.wrapper=new utv.Elem('.wrapper');
	this.loading = utv.toDom(this.tpl)[0];
			
	this.wrapper.append(this.loading);//
	this.show=function(){
		this.loading.style.display='block';
	}
	this.hide=function(){
		this.loading.style.display='none';
	}
};