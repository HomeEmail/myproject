<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	pageContext.setAttribute("basePath", basePath);
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache"/>
<meta http-equiv="expires" content="0"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<base href="<%=basePath%>">
<title>测试</title>
<link rel="stylesheet" href="${basePath}tvutvgo/res/css/index.css" />
<style type="text/css">
	.menu{ 
		margin-top:50px;
		height: 630px;
		overflow: hidden;
		position: relative;
	}

	.menu-list{ 
		position: absolute;
		left:100px;
	}
	.menu-list li{ 
		color:#fff;
		text-align:center;
		line-height:60px;
		height:60px;width:200px;
		font-size:20px;
		/* background:#f00;
		border:1px solid #f00; */
	}

	.menu-list li.focus{ 
		border-color:#fff;
		  border: 1px #ff0 solid;
	}

	.sub-list{ 
		left:200px;
		display:none; 
	}
	.sub-list li{
		background:#00f; 
		border:1px solid #00f;
	}
	a,a:active,a:focus,a:link,a:hover,a:visited{
		outline: none;
		outline-width: 0;
	}
</style>

<%@include file="/WEB-INF/common/tvJs.jsp"%>

</head>
<body>
	<div class="menu clearfix">
		<ul class="clearfix menu-list" id="mainMenu">
			<li class="focus" style="background-image:url(/tvutvgo/res/images/search/menu_bg.png);">贺卡市场</li>
			<li style="background-image:url(/tvutvgo/res/images/search/menu_bg.png);">收件箱</li>
			<li style="background-image:url(/tvutvgo/res/images/search/menu_bg.png);">已发送</li>
		</ul>


		<ul class="clearfix menu-list sub-list" id="subMenu">
		
		
			<li style="background-image:url(/tvutvgo/res/images/search/menu_bg.png);">分类1</li>
			<li style="background-image:url(/tvutvgo/res/images/search/menu_bg.png);">分类2</li>
			<li style="background-image:url(/tvutvgo/res/images/search/menu_bg.png);">分类3</li>
			<li style="background-image:url(/tvutvgo/res/images/search/menu_bg.png);">分类4</li>
			<li style="background-image:url(/tvutvgo/res/images/search/menu_bg.png);">分类5</li> 
			<!-- <li>分类6</li>
			<li>分类7</li>
			<li>分类8</li>
			<li>分类9</li>
			<li>分类10</li>
			<li>分类11</li>
			<li>分类12</li>
			<li>分类13</li>   -->
		</ul>
	</div>


	<!-- <div id="gostagingrecommend">
		<a href="http://172.16.146.6:84/tvutvgo/index/pushContent.action#recommend">go 84 staging recommend</a>
	
	</div>
	<div id="gostagingsearch">
		<a href="http://172.16.146.6:84/tvutvgo/index/pushContent.action#search">go 84 staging search</a>
	
	</div> 
<div>
Email: <input type="text" name="email" />
<br/>
Pin: <input type="text" name="pin" />
</div>-->

	<script src='${basePath}tvutvgo/res/js/tvc.js'></script>
	<script>
		//订阅
		keObs.subscribe(keyEvent);
		function keyEvent(keycode){
			switch(keycode){
				case utv.keyboard.keyUp:{//上
					tvPad.turnUp();
					break;
				}
				case utv.keyboard.keyDown:{//下
					tvPad.turnDown();
					break;
				}
				case utv.keyboard.keyLeft:{//左
					tvPad.turnLeft();
					break;
				}
				case utv.keyboard.keyRight:{//右
					tvPad.turnRight();
					break;
				}
				case utv.keyboard.back:{//返回
					location.href='${basePath}tvutvgo/index/pushContent.action#recommend';
					break;
				}
				default:break;
			}
		}


		var tvPad = { 
			turnUp:function(){ 
				var _self = this;
				if(_self.contentRem === 'mainMenu'){ 
					mainMenu.turnUp();
				}else{ 
					subMenu.turnUp();
				}
			}
			,turnDown:function(){ 
				var _self = this;
				if(_self.contentRem === 'mainMenu'){ 
					mainMenu.turnDown();
				}else{ 
					subMenu.turnDown();
				}
			}
			,turnLeft:function(){
				var _self = this; 
				if(_self.contentRem === 'subMenu'){
					aniPad.hide();
				}else{ 
					//
				}
			}
			,turnRight:function(){ 
				var _self = this;
				if(_self.contentRem === 'mainMenu'){ 
					//mainMenu.turnRight();
					if(mainMenu.index === 1){ 
						aniPad.show();
					}
				}else{ 
					//
				}
			}
			,contentRem:'mainMenu'
		}

		function menuList(opt){
			this.list = $$(opt.list);
			this.index = 1;
			this.prevArr = {};
			this.nextArr = {};

			//初始化
			this.init();
		}
		menuList.prototype = {
			init:function(){
				var _self = this
					,_elems = utv.childElem(_self.list)
					,_onIndex = 0
					,_item
					,i=0
					,_onItem
					,parentDiv = _self.list.parentNode.parentNode
					,prevArr
					,nextArr
				;
				_self.items = _elems;
				_self.count =  _elems.length;
				for(;i<_elems.length;i++){
					_item = _elems[i];
					if(utv.className.has(_item,'on')){
						_onIndex = i;
						_onItem = _item;
					}
				}
				_self.index = _onIndex+1;
				utv.className.add(_onItem,'focus');

				//加入上下图标
				prevArr = utv.toDom('<div class="arr_up arr_com"></div>')[0];
				nextArr = utv.toDom('<div class="arr_down arr_com"></div>')[0];
				parentDiv.appendChild(prevArr);
				parentDiv.appendChild(nextArr);

				_self.prevArr = prevArr;
				_self.nextArr = nextArr;


				_self.changePos(_onIndex,'init');
			}
			,move:function(oldIndex,newIndex,dir){
				var _self = this
					,_elems = _self.items
				;
				if(oldIndex && oldIndex>0){
					utv.className.remove(_elems[oldIndex-1],'focus');
				}

				if(newIndex && newIndex<=_self.count){
					utv.className.add(_elems[newIndex-1],'focus');
					_self.changePos(newIndex-1,dir);
				}
			}
			,clear:function(_index){
				var _self = this
					 ,_index = _self.index
				;
				utv.className.remove(_self.items[_index-1],'focus');
			}
			,turnUp:function(){
				var _self = this
					,_oldIndex = _self.index
					,_newIndex
				;
				_newIndex = _oldIndex-1;
				if(_newIndex>0){
					_self.move(_oldIndex,_newIndex,'up');
					_self.index = _newIndex;
				}else if(_newIndex === 0){
					_self.move(0,1,'up');
					_self.index = 1;
				}

			}
			,turnDown:function(){
				 var _self = this
					,_oldIndex = _self.index
					,_newIndex
					,_newItem
					,_img
				;
				_newIndex = _oldIndex+1;
				if(_newIndex<=_self.count){
					_newItem= _self.items[_newIndex-1];
					_img = utv.getElem(_newItem,'img');
					if(_newIndex===_self.count && _img.length===0 && utv.className.has(_newItem,'adRem')){
						return false;
					}

					_self.move(_oldIndex,_newIndex,'down');
					_self.index = _newIndex;
				}
			}
			,changePos:function(index,type){//修改列表的top   index是即将要移动到的item的index
				var _self = this
					,_list = _self.list
					,_top = _list.style.top
					,_newTop = 0
				;
				_top = (!_top)?0:parseInt(_top,10);
				if(type === 'init'){
					if(index+1>8 && (index*62-_top>= (8*62))){//8 为页面上显示的个数  62为item的高度
						_newTop = (7-index) * 62;
						_list.style.top = _newTop +'px';
					}
				}else if(type === 'up'){
					if(_top<0 && (index*62)+_top<= -62){
						_newTop = _top+62;
						_list.style.top = _newTop +'px';
					}
				}else if(type === 'down'){
					if(index+1>8 && ((index-7)*62+_top>= 62)){//8 为页面上显示的个数  62为item的高度
						_newTop = _top - 62;
						_list.style.top = _newTop +'px';
					}
				}

				//上下图标判断
				_top = _list.style.top
				_top = (!_top)?0:parseInt(_top,10);
				if(_top<0){
					utv.className.add(_self.prevArr,'on');
				}else{
					utv.className.remove(_self.prevArr,'on');
				}

				if(_top>(8-_self.count)*62){
					utv.className.add(_self.nextArr,'on');
				}else{
					utv.className.remove(_self.nextArr,'on');
				}
			}
		};





		//原生手动实现的动画
/*
//这里move2要这样赋值，因为当调用stop之后，还要从当前位置要继续运行的话，就得保持对象不变，如果此时重新new个对象会导致原来的timeout失效，除非销毁move2对象重新new对象就可以
	var move2=move2||new utv.animate({
		el:el,//dom
		times:800,//时间，毫秒
		cssprop:'left',//css属性（js属性写法),只支持一个属性
		//begin:100,//可以不设置
		end:200,//结束值
		unit:'px',//css属性值的单位
		afterFinish:function(){
			//alert('complete');
			//this.destroy();//销毁此动画对象
			this.reverse({
				afterFinish:function(){
					//运动结束后，调用以下三句销毁运动对象
					this.destroy();
					move2=null;
					delete move2;
					console.log(move2);
				},
				startBegin:function(){
					console.log('reverse');
				}
			});//反转运动
		},
		startBegin:function(){
			alert('ready move');
		}
	});
	console.log(move2);
	move2.execMove();
	//move2.gotoEnd();
	//move2.gotoWhere(600);
	//move2.stop();
*/
utv.animate=function(o){
	//times 毫秒计算; cssprop 改变的css属性js写法； begin 开始值； end 结束值; unit 值得单位px还是其他
	if(typeof o != 'object'){
		throw new error("arguments are not object.");
		return;
	}
	this.el=o.el;//节点dom
	this.frames=o.frames||75;//每秒多少帧，对于pc,每秒60帧,这样每帧的时间是16.6666毫秒，与浏览器的渲染时间相同，看起来运动就平滑,jquery用的是75帧，每帧13.3333毫秒；对于性能低下的机顶盒，需要降低帧数达到运动效果基本满意，这里设置为38帧
	this.totalFS=parseInt((o.times||300)/1000*this.frames,10);//总帧数,o.times以毫秒计算
	this.currentFS=0;//当前帧
	this.cssprop=o.cssprop;//css属性(js对象写法)
	this.begin=parseInt((o.begin||this.getStyle(this.el,this.cssprop)),10);//开始值，没有则从当前状态拿
	this.end=parseInt(o.end,10);//结束值，必须
	this.unit=o.unit||'';
	this.intervalTime=1000/this.frames;//每帧用时
	this.intervalPropV=parseInt((this.end-this.begin)/this.totalFS,10);//每帧移动的距离
	this.newV=this.begin;//当前状态值，不能大于或小于结束值
	this.afterFinish=o.afterFinish||null;//运动结束后的回调函数
	this.startBegin=o.startBegin||null;//运动开始前的回调函数
	this.moving=false;//是否在运动
	this.newVOri=this.end>=this.begin;//状态值方向，递增为true，递减为false
	this.timeId=null;//setTimeout 标记
};
utv.animate.prototype.reset=function(o){
	//times 毫秒计算; cssprop 改变的css属性js写法； begin 开始值； end 结束值; unit 值得单位px还是其他
	
	this.el=this.el||o.el;//节点dom
	this.frames=this.frames||o.frames||38;//每秒多少帧，对于pc,每秒60帧,这样每帧的时间是16.6666毫秒，与浏览器的渲染时间相同，看起来运动就平滑,jquery用的是75帧，每帧13.3333毫秒；对于性能低下的机顶盒，需要降低帧数达到运动效果基本满意，这里设置为38帧
	this.totalFS=this.totalFS||parseInt((o.times||300)/1000*this.frames,10);//总帧数,o.times以毫秒计算
	this.currentFS=0;//当前帧
	this.cssprop=this.cssprop||o.cssprop;//css属性(js对象写法)
	this.begin=this.begin||parseInt((o.begin||this.getStyle(this.el,this.cssprop)),10);//开始值，没有则从当前状态拿
	this.end=this.end||parseInt(o.end,10);//结束值，必须
	this.unit=this.unit||(o.unit||'');
	this.intervalTime=this.intervalTime||1000/this.frames;//每帧用时
	this.intervalPropV=this.intervalPropV||parseInt((this.end-this.begin)/this.totalFS,10);//每帧移动的距离
	this.newV=this.begin;//当前状态值，不能大于或小于结束值
	this.afterFinish=this.afterFinish||(o.afterFinish||null);//运动结束后的回调函数
	this.startBegin=this.startBegin||(o.startBegin||null);//运动开始前的回调函数
	this.moving=false;//是否在运动
	this.newVOri=this.newVOri||(this.end>=this.begin);//状态值方向，递增为true，递减为false
	this.stop();
	this.setStyle(this.el,this.cssprop,this.newV+this.unit);
};
//注意，反向运动的时候留意下开始前和结束后的函数，保证正确运行
utv.animate.prototype.reverse=function(o){
	var temp=this.begin;
	this.begin=this.end;
	this.end=temp;
	this.newVOri=this.end>=this.begin;//状态值方向，递增为true，递减为false
	this.currentFS=0;//当前帧
	this.intervalPropV=parseInt((this.end-this.begin)/this.totalFS,10);//每帧移动的距离
	this.newV=this.begin;//当前状态值，不能大于或小于结束值
	this.startBegin=!!o&&!!o.startBegin ? o.startBegin : this.startBegin;
	this.afterFinish=!!o&&!!o.afterFinish ? o.afterFinish : this.afterFinish;
	this.execMove();
};
utv.animate.prototype.setStyle=function(el,cssprop,value){
	utv.setStyle(el,cssprop,value);
};
utv.animate.prototype.getStyle=function(el,cssprop){
	return utv.getStyle(el,cssprop);
};
utv.animate.prototype.destroy=function(){
	this.el=null;
	this.frames=null;
	this.totalFS=null;
	this.currentFS=null;
	this.cssprop=null;
	this.begin=null;
	this.end=null;
	this.unit=null;
	this.intervalTime=null;
	this.intervalPropV=null;
	this.newV=null;
	this.afterFinish=null;
	this.startBegin=null;
	this.moving=null;
	this.newVOri=null;
	this.stop();
	//this=null;
	delete this;
	//console.log('destroy');
};
//注意，运动的时候留意下开始前和结束后的函数，保证正确运行
utv.animate.prototype.execMove=function(o){
	if(!!this.moving) return;
	this.startBegin=!!o&&!!o.startBegin ? o.startBegin : this.startBegin;
	this.afterFinish=!!o&&!!o.afterFinish ? o.afterFinish : this.afterFinish;
	this.moving=true;
	if(!!this.startBegin) this.startBegin();
	this.execMoveAction();
};
utv.animate.prototype.gotoEnd=function(){
	if(!!this.startBegin) this.startBegin();
	this.newV=this.end;
	this.setStyle(this.el,this.cssprop,this.newV+this.unit);
	if(!!this.afterFinish) this.afterFinish();
};
utv.animate.prototype.gotoWhere=function(val){
	if(!!this.startBegin) this.startBegin();
	this.newV=val||this.end;
	this.setStyle(this.el,this.cssprop,this.newV+this.unit);
	if(!!this.afterFinish) this.afterFinish();
};
utv.animate.prototype.stop=function(){
	clearTimeout(this.timeId);
	this.timeId=null;
	this.moving=false;
}
utv.animate.prototype.execMoveAction=function(){
	if((this.newVOri&&this.newV>=this.end)||(!!!this.newVOri&&this.newV<=this.end)){
		this.moving=false;
		if(!!this.afterFinish) this.afterFinish();
		return;
	}
	this.newV=this.begin+(this.currentFS*this.intervalPropV);
	if((this.newVOri&&this.newV>=this.end)||(!!!this.newVOri&&this.newV<=this.end)){
		this.newV=this.end;
	}
	this.setStyle(this.el,this.cssprop,this.newV+this.unit);
	this.currentFS++;	
	//this.execMoveAction();
	//console.log(this.intervalTime);
	this.timeId=setTimeout(function(_self){
		return function(){
			_self.execMoveAction();
		}
	}(this),this.intervalTime);//注意this的指向,通过闭包把实例化对象传到execMove里去
};





		var mainMenu = new menuList({
			list:'mainMenu'
		})
		,mainElem = new utv.Elem('#mainMenu')
		;

		var subMenu = new menuList({
			list:'subMenu'
		})
		,subElem = new utv.Elem('#subMenu')
		;
		var move1='aa';
		var aniPad = {
			moving:false
			,el:$$('mainMenu')
			,show:function(){ 
				// $('#mainMenu').animate({'left':0},300,function(){ 
				// 	mainMenu.clear();
				// 	subMenu.move(-1,subMenu.index);
				// 	tvPad.contentRem = 'subMenu';
				// 	subElem.setStyle('display','block');
				// 	//$('#subMenu').fadeIn();
				// });
				if(this.moving) return;
				this.moving=true;
				var move1=new utv.animate({
					el:aniPad.el,//dom
					times:100,//时间，毫秒
					cssprop:'left',//css属性（js属性写法),只支持一个属性
					//begin:100,//可以不设置
					end:0,//结束值
					unit:'px',//css属性值的单位
					afterFinish:function(){
						mainMenu.clear();
						subMenu.move(-1,subMenu.index);
						tvPad.contentRem = 'subMenu';
						subElem.setStyle('display','block');
						this.destroy();
						move1=null;
						delete move1;
						aniPad.moving=false;
					},
					startBegin:function(){
						//alert('ready move');
					}
				});
				move1.execMove();
				
				
			}
			,hide:function(){ 
				// subElem.setStyle('display','none');
				// // $('#subMenu').fadeOut('',function(){
				// // });
				// $('#mainMenu').animate({'left':100},300,function(){ 
				// 	subMenu.clear();
				// 	mainMenu.move(-1,mainMenu.index);
				// 	tvPad.contentRem = 'mainMenu';
					
				// });
				if(this.moving) return;
				this.moving=true;
				subElem.setStyle('display','none');
				var move1=new utv.animate({
					el:aniPad.el,//dom
					times:100,//时间，毫秒
					cssprop:'left',//css属性（js属性写法),只支持一个属性
					//begin:100,//可以不设置
					end:100,//结束值
					unit:'px',//css属性值的单位
					afterFinish:function(){
						subMenu.clear();
						mainMenu.move(-1,mainMenu.index);
						tvPad.contentRem = 'mainMenu';
						this.destroy();
						move1=null;
						delete move1;
						aniPad.moving=false;
					},
					startBegin:function(){
						//alert('ready move');
					}
				});
				move1.execMove();
				
			}
		};

		




	</script>
</body>
</html>
