
/**实现与pc端同样的el:active效果只需要额外添加下面一行代码即可**/
document.body.addEventListener('touchstart', function () { }); 

function getBrowserW(){
	return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//可见区域宽度
}
function getBrowserH(){
	//alert(document.documentElement.clientHeight);
	return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//可见区域高度		
}

//tap event 封装
/***
某些手机阻止不了tap事件的传递，会导致触发重叠元素上的事件,可以使用mousedown 或touchstart事件代替即可阻止，或者在写事件时都判断下事件来源是否是绑定的本元素(e.target)
***/
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
})(Zepto);

tapOn($('.tpl-wrapper'),'.tpl-item',function(e){
	//console.log(this);
	var $el=$(this);
	//var tplId=$el.attr('data-tpl');
	$('.tpl-item.on').find('img').animate({opacity:'0.5'},200,'ease-out');
	$('.tpl-item.on').removeClass('on');

	$el.addClass('on');
	$el.find('img').animate({opacity:'1'},200,'ease-out');
});
tapOn($('#selectOKBt'),function(e){
	var tplId=$('.tpl-item.on').attr('data-tpl');
	if(!!!tplId) tplId=2;
	location.href='liuyan.html'+'#'+tplId;

});