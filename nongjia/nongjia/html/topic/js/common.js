
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
/****使元素在屏幕居中显示****/
function center(obj){
	var object = $('.'+obj);
	var obj_width = object.outerWidth();
	var obj_height = object.outerHeight();
	//object 宽高
	var D_height = $(document).height();
	var D_width = $(document).width();
	//document宽高
	var W_height = $(window).height();
	var S_height = $(window).scrollTop();
	//屏幕高度 、滚动条卷起高度
	var width = (D_width - obj_width)/2;
	var height = (W_height - obj_height)/2  + S_height;
	if(height < 0){
		height = 10;
	}
	object.css({'left':width,'top':height});
	if(parseInt(object.css('top')) + obj_height > D_height){
		D_height = parseInt(object.css('top')) + obj_height + 20;
	}

	$('.locking').css({'height':D_height,'width':D_width});//设置锁屏大小
}
function parse_url(_url){ //定义函数  获取url?后参数数组
	var pattern = /(\w+)=(\w+)/ig;//定义正则表达式
	var parames = {};//定义数组
	_url.replace(pattern, function(a, b, c){
		parames[b] = c;
	});
	/*此时执行function(a,b,c);其中a的值为:id=2,b的值为id,c的值为2;然后将数组的key为id的值赋为2.
	 */
	return parames;//返回这个数组.
}
$(function(){


	a_void();
	placeholder('#indexUsername','输入手机号码/证件号');
	placeholder('#indexPassword','输入密码');


	/*时间控件*/
	$('.date').click(function(){
		WdatePicker();
	});
	/*end*/
});


