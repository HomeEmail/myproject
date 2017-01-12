
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
	placeholder('#indexUsername','输入手机号码/证件号');
	placeholder('#indexPassword','输入密码');
	
});
