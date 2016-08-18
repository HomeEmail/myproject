/***base on zepto.js**/
//test refresh
// $('.header-title').on('tap',function(e){
// 	location.reload(true);
// });
// $('#Footer').on('tap',function(e){
// 	location.reload(true);
// });
// $(window).on('scroll',function(e){
// 	//console.log(e);
// 	//console.log($(window).scrollTop());
// });
//返回顶部动画
function goTop(times){
	$(window).scrollTop(0);
	
}

//tap event 封装
function tapOn(el,con,callback){
	var isTouch=("ontouchend" in document ? true : false) || !!window.navigator.msPointerEnabled;
	if(isTouch){
		if(typeof con == 'string'){
			el.on('tap',con,callback);
		} else {
			el.on('tap',con);
		}
		
	} else {
		if(typeof con == 'string'){
			el.on('click',con,callback);
		} else {
			el.on('click',con);
		}
	}
}
function tapOff(el,con,callback){
	var isTouch=("ontouchend" in document ? true : false) || !!window.navigator.msPointerEnabled;
	if(isTouch){
		if(typeof con == 'string'){
			el.off('tap',con,callback);
		} else {
			el.off('tap',con);
		}
		
	} else {
		if(typeof con == 'string'){
			el.off('click',con,callback);
		} else {
			el.off('click',con);
		}
	}
}


/**实现与pc端同样的el:active效果只需要额外添加下面一行代码即可**/
document.body.addEventListener('touchstart', function () { }); 

//back bt
function goBack(url){
	if(!!url){
		location.href=url;
	} else {
		window.history.back();
		
	}
}
$('#backBt').on('tap',function(e){
	goBack();
});

//alert(window.innerWidth);

/***订购数量操作功能
new goodOrderNumAction({
	delId:'#detailDelCountBt'//减按钮
	,addId:'#detailAddCountBt'//加按钮,dom里增加个data-maxnum表示最大值,不定义或空则无穷大
	,numInit:1//初始值
	,minNum:1//最小值
	,showId:'#goodsOrderCountInput'//input框
	,id:'33'//代表此对象的id唯一值
	,callback:function(num,id){}
});
**/
function goodOrderNumAction(o){
	var 
		num=o.numInit||1
		,maxNum=0
		,minNum=o.minNum||1
		,id=o.id||null
		,showEl=$(o.showId)
		,showHandler
		,changeCallback=o.callback||function(count,id){}
	;
	this.delEl=$(o.delId);
	this.addEl=$(o.addId);
	maxNum=this.addEl.attr('data-maxnum');
	if(maxNum==null||maxNum==''||!!!/\d+/g.test(parseInt(maxNum,10))){
		maxNum=-1;//-1代表无穷大
	}
	if(num>=maxNum&&maxNum>=0){
		num=maxNum;//初始值不能大于最大值
	}
	this.delHandler=function(e){
		if(num<=minNum) return;
		num--;
		showHandler();
	}
	this.addHandler=function(e){
		if(num>=maxNum&&maxNum>=0){
			return;
		}
		num++;
		showHandler();
	}
	this.showChangeHandler=function(e){
		var v=parseInt(showEl.val(),10);
		if(/\d+/g.test(v)){
			v=v<=minNum ? minNum : v;
		} else {
			v=minNum;
		}
		num=v||minNum;
		if(num>=maxNum&&maxNum>=0){
			num=maxNum;
		}
		showHandler();
	}
	showHandler=function(){
		showEl.val(num);
		changeCallback(num,id);
	}
	this.getId=function(){
		return id;
	}
	this.getNum=function(){
		return num;
	}
	this.getMaxNum=function(){
		return maxNum;//-1表示无穷
	}
	this.init=function(){
		//showHandler();
		showEl.val(num);
		
		//注册事件
		this.delEl.on('tap',this.delHandler);
		this.addEl.on('tap',this.addHandler);
		showEl.on('input',this.showChangeHandler);
	}
	this.destroy=function(){
		this.delEl.off('tap',this.delHandler);
		this.addEl.off('tap',this.addHandler);
		showEl.off('input',this.showChangeHandler);
		this.delEl=null;
		this.addEl=null;
		num=null;
		id=null;
		showEl=null;
		showHandler=null;
		changeCallback=null;
	}
	this.init();
	return this;
}


/***
checkbox选择功能操作
html里o.selector的孩子需包含o.checkClass

new superCheckBox({
	selector:'#cartGoodsSelectBt-'+key
	,id:key
	,callback:cartGoodsSelectCallback
})
**/
function superCheckBox(o){
	this.el=$(o.selector);
	var selected=o.selected||false//这里赋值要注意默认false好
		,id=o.id||null
		,selectedClass=o.selectedClass||'selected'
		,elUi=$(this.el.children(o.checkClass||'.checkBox')[0])
		,changeCallback=o.callback||function(isSelected,id){}
	;
	//console.log(elUi);
	this.handlerUi=function(e){
		//check 是否停止事件传递
		
		if(!!selected){
			selected=false;
			elUi.removeClass(selectedClass);
		} else{
			selected=true;
			elUi.addClass(selectedClass);
		}
		changeCallback(selected,id);
	}
	this.setSelected=function(b,execCallback){
		if(!!!b){
			selected=false;
			elUi.removeClass(selectedClass);
		} else{
			selected=true;
			elUi.addClass(selectedClass);
		}
		if(!!execCallback) changeCallback(selected,id);
	}
	this.init=function(){
		//console.log(id+'|'+selected);
		if(selected===true){
			elUi.addClass(selectedClass);
		} else{
			elUi.removeClass(selectedClass);
		}
		
		this.el.on('tap',this.handlerUi);
		
	}
	this.destroy=function(){
		this.el.off('tap',this.handlerUi);
		elUi=null;
		this.el=null;
		changeCallback=null;
		selectedClass=null;
		id=null;
		selected=null;
	}
	this.init();
	return this;
}
/**
得到高宽，补充插件,修复当display为none是el.width()为0的bug
usage:
el.getW();//33
el.getH();//332
el.getSize();//{width:33,height:332}
**/
;(function($){
  $.extend($.fn, {
    getW: function(){
      // `this` refers to the current Zepto collection.
      // When possible, return the Zepto collection to allow chaining.
      //position: "absolute", visibility: "hidden", display: "block" 
      var pos=this.css('position')
      	  ,vis=this.css('visibility')
      	  ,dis=this.css('display')
      	  ,w=0
      ;
      this.css({
      	"position": "absolute", "visibility": "hidden", "display": "block"
      });
      w=this.width();

      this.css({
      	"position": pos, "visibility": vis, "display": dis
      });
      return w;
    }
    ,getH: function(){
    	var pos=this.css('position')
      	  ,vis=this.css('visibility')
      	  ,dis=this.css('display')
      	  ,h=0
      ;
      this.css({
      	"position": "absolute", "visibility": "hidden", "display": "block"
      });
      h=this.height();

      this.css({
      	"position": pos, "visibility": vis, "display": dis
      });
      return h;
    }
    ,getSize: function(){
    	var pos=this.css('position')
      	  ,vis=this.css('visibility')
      	  ,dis=this.css('display')
      	  ,w=0
      	  ,h=0
      ;
      this.css({
      	"position": "absolute", "visibility": "hidden", "display": "block"
      });
      w=this.width();
      h=this.height();
      this.css({
      	"position": pos, "visibility": vis, "display": dis
      });
      return {
      	width:w
      	,height:h
      };
    }
  })
})(Zepto)
/**
overlay js

**/
function overlay(o){
	var mask=$('.overlay-mask')||null
		,id=o.overlayId
		,box=$('#'+id)||null
		,ww=null
		,wh=null
		,elSize=null
		,bw=null
		,bh=null
		,mt=null
		,ml=null
	;
	if(!!!box){
		return;
	}
	this.resetPos=function(o){
		var o=o||{};
		ww=$(window).width();
		wh=$(window).height();
		elSize=box.getSize();
		bw=o.w||elSize.width;
		bh=o.h||elSize.height;
		mt=Math.floor((wh-bh)/2);
		ml=Math.floor((ww-bw)/2);
		
		box.css({
			'margin-top':mt+'px'
			,'margin-left':ml+'px'
			,'width':bw+'px'
			,'height':bh+'px'
		});
	}
	this.init=function(o){

		this.resetPos(o)
	}
	this.show=function(){
		box.show();
		if(!!mask) mask.show();
		return this;
	}
	this.hide=function(){
		box.hide();
		if(!!mask) mask.hide();
		return this;
	}
	this.init(o);
	return this;
	//console.log(ww+":"+wh+"||"+bw+':'+bh+box.css('display'));
	//console.log(box.getSize());

}