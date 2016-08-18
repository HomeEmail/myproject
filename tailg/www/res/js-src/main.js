/**main.js base on zepto.js**/

$('.wx-bt').on('click',function(e){
	if(!!!document.getElementById('weixinShowDiv')){
		var content='<div style="width: 80%;background-color: #fff;margin: 0 auto;margin-top: 40%;color: #222;padding: 15px;position: relative; "><span style="position: absolute;right: 5px;top: 2px;color: #888;">x</span>  <p style="margin-bottom: 9px;">关注台铃微信</p>  <div class="text-ac" style="margin-bottom: 10px;"><img src="#" style="width: 200px;"></div>  <p>打开微信，使用扫一扫，关注台铃微信公众号</p></div>';
		var html='<div id="weixinShowDiv" style="position:fixed;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,0.8);display:none;z-index: 9999999;" onmousedown="$(this).hide();">'+content+'</div>';
		$('body').append(html);
	}
	$('#weixinShowDiv').show();

});




$('#header').on('tap',function(e){
	//location.reload(true);
});

/**实现与pc端同样的el:active效果只需要额外添加下面一行代码即可**/
document.body.addEventListener('touchstart', function () { }); 


/**基础函数*/
if(!!!String.prototype.trim){
	String.prototype.trim = function(){
		return this.replace(/(^[\\s]*)|([\\s]*$)/g, "");
	}
	String.prototype.lTrim = function(){
		return this.replace(/(^[\\s]*)/g, "");
	}
	String.prototype.rTrim = function(){
		return this.replace(/([\\s]*$)/g, "");
	}
}

//批量替换超链接的#号，防止页面跳动
function a_void(){
	$("a").each(function(index, element) {
        if ($(this).attr("href")=="#"){
			$(this).attr('href','javascript:void(0);');
		}
    });	
}
a_void();

//滚动到一定距离，出现返回顶部按钮,参数是按钮元素
function sroll_top(selector){
	$(window).on("scroll",function(){
		var sh=$('body').scrollTop();
		var wh=$(window).height();
		if( sh < wh *0.6 ) {
			$(selector).hide();
		}else if(sh >= wh *0.6){
		 	$(selector).show();
		}
	});
}
sroll_top('.goTop-bt');
$('.goTop-bt').on('mousedown',function(e){
	//var el=$('body');
	//el.animate({scrollTop: 0}, 1000,'ease-out');
	//goTop();
	e.stopPropagation();
	e.preventDefault();
	goTop(500);
});


//返回顶部动画
function goTop(times){
	if(!!!times){
		$(window).scrollTop(0);
		return;
	}
	
	var sh=$('body').scrollTop();//移动总距离
	var inter=13.333;//ms,每次移动间隔时间
	var forCount=Math.ceil(times/inter);//移动次数
	var stepL=Math.ceil(sh/forCount);//移动步长
	var timeId=null;

	function ani(){
		!!timeId&&clearTimeout(timeId);
		timeId=null;
		//console.log($('body').scrollTop());
		if($('body').scrollTop()<=0||forCount<=0){//移动端判断次数好些，因为移动端的scroll事件触发不频繁，有可能检测不到有<=0的情况
			$('body').scrollTop(0);
			return;
		}
		forCount--;
		sh-=stepL;
		$('body').scrollTop(sh);
		timeId=setTimeout(function(){ani();},inter);
	}
	ani();

}
//back 
function goBack(url){
	if(!!url){
		location.href=url;
	} else {
		window.history.back();
		
	}
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









/***back bt js**/
tapOn($('.back-bt'),function(e){
	window.history.back();
});


/***menu js**/
(function(){
	var isOpen=false;
	tapOn($('#menuIconBt'),function(e){
		if(!!!isOpen){
			$(this).addClass('active');
			//$('#menuContentBox').show();
			$("#menuContentBox").css({'display':'block'});
			$("#menuContentBox").animate({
		        translate: '0px,0px'
		    }, 300,'ease-in'
	        );
			isOpen=true;
		} else {
			$(this).removeClass('active');
			//$('#menuContentBox').hide();
			$("#menuContentBox").animate({
		        translate: '0px,-300px'
		    }, 300,'ease-in',function(){
		    	$("#menuContentBox").css({'display':'none'});
		    }
	        );
			isOpen=false;
		}
		e.stopPropagation();
		e.preventDefault();
	});

	$('#menuContentHideBt').on('touchstart',function(e){
		e.stopPropagation();
		e.preventDefault();
		$('#menuIconBt').trigger('tap');
		$('#menuIconBt').trigger('click');
		//alert('aa');
		return false;
	});

}());




//**在线留言 js**//
//重置
tapOn($('#zxlyFormResetBt'),function(e){
	e.stopPropagation();
	e.preventDefault();
	$('#zxlyForm input,#zxlyForm textarea').val('');
});
//提交
tapOn($('#zxlyFormSubmitBt'),function(e){
	e.stopPropagation();
	e.preventDefault();
	if(!zxlyFormCheck()){
		return false;
	}
	$('#zxlyForm').submit();
});
function zxlyFormCheck(){
	var zxlyUsername=$('#zxlyUsername').val(),
		zxlyEmail=$('#zxlyEmail').val(),
		zxlyTel=$('#zxlyTel').val(),
		zxlyAdress=$('#zxlyAdress').val(),
		zxlyContent=$('#zxlyContent').val()
	;
	if(!!!zxlyUsername.trim()){
		return false;
	}
	if(!!!zxlyEmail.trim()){
		return false;
	}
	if(!!!zxlyTel.trim()){
		return false;
	}
	if(!!!zxlyContent.trim()){
		return false;
	}
	return true;
}


/**专利技术列表 js***/

tapOn($('.ryzl-zljs-list-item-title'),function(e){
	var el=$(this);
	var detail=el.next('.ryzl-zljs-list-item-detail');
	var icon=el.find('.iconfont');
	if(detail.css('display')=='none'){
		detail.show();
		icon.removeClass('icon-xiangxia').addClass('icon-xiangshang');
		return;
	}
	detail.hide();
	icon.removeClass('icon-xiangshang').addClass('icon-xiangxia');
});


/*****地理位置 专卖店查询js**************/
tapOn($('#zmdcxUseMyLocation'),function(e){
	var listEl=$('#currentLocationStore');
	listEl.html("<div class='text-ac cl-yellow'>正在获得位置信息... <span class='iconfont icon-refresh anim-loading dib'></span></div>");
	function getLocation(){
		var nav = navigator.geolocation || navigator.webkitGeolocation;
	  if (nav){
	    nav.getCurrentPosition(showPosition,showError,{
							enableHighAccuracy : true});
	  }else{
			listEl.html("Geolocation is not supported by this browser.");
		}
	}

	/**地理位置成功获得后*/
	function showPosition(position){
		getAdressNameByCoordinate(position.coords.longitude,position.coords.latitude);
		listEl.html("<div class='text-ac'>Latitude: " + position.coords.latitude + "<br />Longitude: " + position.coords.longitude+'</div>');
		listEl=null;
	}

	function showError(error){
		//console.log(error);
		//alert(error.code);
	    switch(error.code){
		    case error.PERMISSION_DENIED:
		      listEl.html("<div class='text-ac'>User denied the request for Geolocation.</div>");
					alert('允许网站获得你的位置，请为此app打开定位服务');
					
		      break;
		    case error.POSITION_UNAVAILABLE:
		      listEl.html("<div class='text-ac'>Location information is unavailable.</div>");
				
		      break;
		    case error.TIMEOUT:
		      listEl.html("<div class='text-ac'>The request to get user location timed out.</div>");
					
		      break;
		    case error.UNKNOWN_ERROR:
		      listEl.html("<div class='text-ac'>An unknown error occurred.</div>");
					
		    break;
	    }
	    listEl=null;
	}
	getLocation();

});
/**百度地图*****/
function getAdressNameByCoordinate(y,x){
	//var y=113.369016,x=23.135632;
	var myGeo = new BMap.Geocoder(); 
	// 根据坐标得到地址描述    
	myGeo.getLocation(new BMap.Point(y, x), function(result){     
	    if (result){    
	    	//console.log(result);  
	        //alert(result.addressComponents.province+' '+result.addressComponents.city);  
	        jsSelectItemByValue(document.getElementById('zmdcxProvince'),result.addressComponents.province);
	        jsSelectItemByValue(document.getElementById('zmdcxCity'),result.addressComponents.city);
	       //var provinceEls=$('#zmdcxProvince option');
	       //var cityEls=$('#zmdcxCity option');
	       
	    }    
	});
}

// 6.设置select中text="paraText"的第一个Item为选中        
function jsSelectItemByValue(objSelect, objItemText) {            
    //判断是否存在        
    var isExit = false;        
    for (var i = 0; i < objSelect.options.length; i++) {        
        if (objSelect.options[i].text == objItemText) {        
            objSelect.options[i].selected = true;        
            isExit = true;        
            break;        
        }        
    }              
    //Show出结果        
    if (isExit) {        
        //alert("成功选中");        
    } else {        
        //alert("该select中 不存在该项");        
    }        
}        

