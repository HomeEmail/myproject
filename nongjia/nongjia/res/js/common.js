
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
	var D_width = document.documentElement.clientWidth; //$(document).width();
	//document宽高
	var W_height = window.screen.availHeight;//document.documentElement.clientHeight; //$(window).height();
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
var alertObj = {
	obj : '',
	str : '',
	init : function(_str){
		this.show(_str);
	},
	setHTML : function(_str){
		this.str = '<div class="alertTitle">'
				+'<h1>提示</h1>'
			+'</div>'
			+'<div class="alertContent">'
				+'<p>'+ _str +'</p>'
			+'</div>'
			+'<div class="alertBtn_group">'
				+'<input type="button" onclick="alertObj.hide(submitFunction)" value="确定" class="alertBtn">'
			+'</div>';
		$('#alertObj').addClass('alertObj');
		document.getElementById("alertObj").innerHTML = this.str;
	},
	show : function(_str){
		this.setHTML(_str);
		center('alertObj');
		document.getElementById("locking").style.display = "block";	
		document.getElementById("alertObj").style.display = "block";	
	},
	hide : function(_fn){
		document.getElementById("locking").style.display = "none";	
		document.getElementById("alertObj").style.display = "none";
		!!_fn&&_fn();
	}
}
function submitFunction(){ //点击确定按钮时，此处是外部调用时，外部引用方法
	alert(11);	
}
//上传文件大小限制
var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
function fileChange(target,id) {
	var fileSize = 0;
	var filetypes =[".jpg",".png",".rar",".txt",".zip",".doc",".ppt",".xls",".pdf",".docx",".xlsx"];
	var filepath = target.value;
	var filemaxsize = 1024*50;//2M
	if(filepath){
		var isnext = false;
		var fileend = filepath.substring(filepath.indexOf("."));
		if(filetypes && filetypes.length>0){
			for(var i =0; i<filetypes.length;i++){
				if(filetypes[i]==fileend){
					isnext = true;
					break;
				}
			}
		}
		if(!isnext){
			alert("不接受此文件类型！");
			target.value ="";
			return false;
		}
	}else{
		return false;
	}
	if (isIE && !target.files) {
		var filePath = target.value;
		var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
		if(!fileSystem.FileExists(filePath)){
			alert("附件不存在，请重新输入！");
			return false;
		}
		var file = fileSystem.GetFile (filePath);
		fileSize = file.Size;
	} else {
		fileSize = target.files[0].size;
	}

	var size = fileSize / 1024;
	if(size>filemaxsize){
		alert("附件大小不能大于"+filemaxsize/1024+"M！");
		target.value ="";
		return false;
	}
	if(size<=0){
		alert("附件大小不能为0M！");
		target.value ="";
		return false;
	}
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
	
	var el = document.createElement('div');
	el.id = "alertObj";
	document.body.appendChild(el);
	var locking = document.createElement('div');
	locking.id = "locking";
	document.body.appendChild(locking);
	$('#locking').addClass('locking');
	
	$(window).resize(function () {//当浏览器大小发生变化时，重新获取锁屏大小
        var locking = $('.locking');
        if(locking.css('display') == 'none'){return;}
        var D_width = document.body.clientWidth;
        locking.css({'width':D_width}).show();
        center('alertObj');
    });
});
