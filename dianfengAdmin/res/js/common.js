
//批量替换超链接的#号，防止页面跳动
function a_void(){
	$("a").each(function(index, element) {
        if ($(this).attr("href")=="#"){
			$(this).attr('href','javascript:void(0);');
		}
    });	
}
//滚动到一定距离，出现返回顶部按钮,参数是按钮元素
function sroll_top(selector,showFn,hideFn){
	$(window).bind("scroll",function(){
		if( $(document).scrollTop() < $(window).height() *1.5 ) {
		jQuery(selector).hide();
		hideFn();
		}else if($(document).scrollTop() > $(window).height() *1.5){
		 jQuery(selector).show();
		 showFn();
		}
	});
}
//输入框placeholder 效果
function placeholder(selector,text){
	// (function(selector,text){
	// 	var text=text;
		$(selector).val(text);
		$(selector).on('focus',function(e){
			if($(this).val()==text){
				$(this).val('');
			}
		});
		$(selector).on('blur',function(e){
			if($(this).val()==''){
				$(this).val(text);
			}
		});
	//})(selector,text);
}

//overlay mask半透明遮罩,base on jquery
function showOverlayMask(index){
	if(!!!document.getElementById('OverlayMask')){
		var index=index||9999;
		var html='<div id="OverlayMask" style="position:fixed;left:0px;top:0px;width:100%;height:100%;background-color:#000;display:none;z-index: '+index+';" class="op80" onmousedown=""></div>';
		$('body').append(html);
	}
	$('#OverlayMask').show();
}
function hideOverlayMask(){
	if(!!document.getElementById('OverlayMask')){
		$('#OverlayMask').hide();
	}
}
function showOverlayBox(o){
	var o=o||{}
		,id=o.id||''
		,w=o.width||600
		,h=o.height||500
		,content=o.content||''
		,header=o.header||''
		,footer=o.footer||''
		,index=o.index||10000
		,className=o.className||''
		,ww=$(window).width()
		,wh=$(window).height()
		,left=(ww-w)/2
		,top=(wh<=h) ? 0 : (wh-h)/2
		,background=o.background||'#fff'
	;
	h=(wh<=h) ? wh : h;
	w=(ww<=w) ? ww : w;

	if(!!!id){
		alert('no id');
		return;
	}
	if(!!!document.getElementById(id)){
		if(!!header || !!footer){
			var headerStr=!!header ? '<div id="'+id+'Header" class="'+id+'-header">'+header+'</div>' : '';
			var contentStr=!!content ? '<div id="'+id+'Content" class="'+id+'-content" style="overflow:auto;">'+content+'</div>' : '';
			var footerStr=!!footer ? '<div id="'+id+'Footer" class="'+id+'-footer">'+footer+'</div>' : '';
			var html='<div id="'+id+'" style="position:fixed;left:'+left+'px;top:'+top+'px;width:'+w+'px;height:'+h+'px;background:'+background+';overflow:hidden;z-index: '+index+';" class="'+className+'" onmousedown="">'+headerStr+contentStr+footerStr+'</div>';
		} else {
			var html='<div id="'+id+'" style="position:fixed;left:'+left+'px;top:'+top+'px;width:'+w+'px;height:'+h+'px;background:'+background+';overflow:auto;z-index: '+index+';" class="'+className+'" onmousedown="">'+content+'</div>';
		}
		$('body').append(html);
	} else if(!!content){
		if(!!header || !!footer){
			$('#'+id+'Content').html(content);
		} else {
			$('#'+id).html(content);
		}
	}
	showOverlayMask();
	$('#'+id).show();
	//调整内容高度
	if(!!document.getElementById(id+'Header') || !!document.getElementById(id+'Footer')){
		var headerH=!!document.getElementById(id+'Header') ? $('#'+id+'Header').height() : 0;
		var footerH=!!document.getElementById(id+'Footer') ? $('#'+id+'Footer').height() : 0;
		var totalH=$('#'+id).height();
		$('#'+id+'Content').height(totalH-headerH-footerH);
	}
}
function hideOverlayBox(id){
	if(!!document.getElementById(id)){
		$('#'+id).hide();
		hideOverlayMask();
	}
}


/****获取字符串的真实长度****/
function getStrTrueLength(str){//获取字符串的真实长度（字节长度）
	var len = str.length, truelen = 0;
	for(var x = 0; x < len; x++){
		if(str.charCodeAt(x) > 128){
			truelen += 2;
		}else{
			truelen += 1;
		}
	}
	return truelen;
}
$(function(){


	a_void();

	 //placeholder('#searchInput','输入课程名称或产品名称');

	

});
