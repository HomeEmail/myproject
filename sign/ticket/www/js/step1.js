

/**实现与pc端同样的el:active效果只需要额外添加下面一行代码即可**/
document.body.addEventListener('touchstart', function () { }); 




function getBrowserW(){
	return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//可见区域宽度
}
function getBrowserH(){
	//alert(document.documentElement.clientHeight);
	return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;//可见区域高度		
}
function setCanvasWH(el,w,h){
	var w=w||getBrowserW(),h=h||getBrowserH();
	el.setAttribute('width',w);
	el.setAttribute('height',h);
	el.style.width=w+'px';
	el.style.height=h+'px';
}

tapOn($('#selectImgBt'),function(e){
	//alert('aa2');
	//$('#fileSelectInput').trigger('click');
});
tapOn($('.imgBox-wrapper'),function(e){
	//alert('aa2');
	$('#fileSelectInput').trigger('click');
});
tapOn($('#previewCancelBt'),function(e){
	$('#previewBox').hide();
});
tapOn($('#previewOKBt'),function(e){
	if(!!!canvasStep1OK){
		alert('没有图片信息');
		$('#previewBox').hide();
		return;
	}
	var $bt=$(this);
	//上传base64图片数据给服务器
	var data=canvasStep1OK.toDataURL("image/png");//图片大的话，这步操作会很慢
    //删除字符串前的提示信息 "data:image/png;base64,"  
	data = data.substring(22); 
    //console.log(data);
    $bt.html('正在上传...');
    /*$.ajax({
	  type: 'POST',
	  url: 'http://182.254.201.33/201506/handupload.ashx',
	  // data to be added to query string:
	  data: { hand: data },
	  // type of data we are expecting in return:
	  dataType: 'json',//(“json”, “jsonp”, “xml”, “html”, or “text”)
	  success: function(data){
	  	$bt.html('已预览，确定提交');
		$('#previewBox').hide();
	  },
	  error: function(xhr, type){
	    alert('上传失败,请重试');
	    $bt.html('已预览，确定提交');
	  }
	});*/
	$bt.html('已预览，确定提交');
	$('#previewBox').hide();
});
// tapOn($('#fileSelectInput'),function(e){
// 	alert('aa');
// 	$(this).trigger('click');
// 	e.stopPropagation();
// 	return false;
// });
function fileChange(el){
	if (el.files && el.files.length > 0 && el.files[0].size > 0) {
		
		//generateUploadInit(el.files,callback);
		var file=el.files[0];
		var strSize=22;
		if(file.type=='image/jpeg'){
			strSize=23;
		} else if(file.type=='image/png'){
			strSize=22;
		} else {
			alert('图片格式只支持png和jpg，请重新选择！');
			return false;
		}
		$('#selectImgBtTips').html('正在读取图片，请稍等...');
		uploadImgInitStep1(file);//表单形式提交
		//base64方式提交
		// var reader=new FileReader();
		// reader.onloadend=function(evt){
		// 	if (evt.target.readyState == FileReader.DONE) { 
		// 		uploadImgInitStep1(evt.target.result.substring(strSize));
		// 		// setImgSrc(evt.target.result);
		// 		// $('#selectImgBtTips').html('');
		// 	}
		// };
		// reader.onerror=function(evt){
		// 	$('#selectImgBtTips').html('读取图片失败');
		// };
		// reader.readAsDataURL(file);
			  
	} else {
		alert('Please select a file!');	
	}
}
function uploadProgress(evt){
	if (evt.lengthComputable) {
		
		var percentComplete = Math.round(evt.loaded * 100 / evt.total);//80
		$('#selectImgBtTips').html('正在读取图片，请稍等...'+percentComplete+'%');
	} else {
		//'请稍等';

	}
}
function uploadComplete(evt){
	//alert('uploadComplete');
}
function uploadCompleteReturn(str,evt){
	//alert('uploadCompleteReturn'+evt.target.responseText);
	setImgSrc(str);
	$('#selectImgBtTips').html('');
}
function uploadFailed(evt){
	alert('上传图片失败');
	$('#selectImgBtTips').html('读取图片失败');
}
function uploadCanceled(evt) {
	//alert("上传图片被取消了");
	$('#selectImgBtTips').html('读取图片失败');
}
function uploadImgInitStep1(file){
	try{
		var fd = new FormData();
		var xhr = new XMLHttpRequest();
		xhr.upload.addEventListener("progress", uploadProgress, false);
		xhr.upload.addEventListener("loadend", uploadComplete, false);
		
		//xhr.addEventListener("loadend", uploadCompleteReturn, false);
		
		xhr.addEventListener("error", uploadFailed, false);
		xhr.addEventListener("abort", uploadCanceled, false);
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				// Handle response.
				//alert(xhr.responseText); // handle response.
				//uploadComplete();
				uploadCompleteReturn(xhr.responseText);
			}
			if(xhr.status == 404){
				uploadFailed(xhr);
				xhr.abort();
				return;
			}
		};
		
		//xhr.open("POST", "../handupload.ashx");//../handupload.ashx
		xhr.open("POST", "testUpload.php");
		fd.append("hand", file);
		xhr.send(fd);
	} catch(err){
		alert("网络错误！");
		$('#selectImgBtTips').html('上传图片失败');
	}

	//http://182.254.201.33/201506/handupload.ashx
	// $.ajax({
	//   type: 'POST',
	//   url: 'http://182.254.201.33/201506/handupload.ashx',
	//   // data to be added to query string:
	//   data: { hand: datas },
	//   // type of data we are expecting in return:
	//   dataType: 'json',//(“json”, “jsonp”, “xml”, “html”, or “text”)
	//   success: function(data){
	//   		setImgSrc(data);
	// 		$('#selectImgBtTips').html('');
	//   },
	//   error: function(xhr, type){
	//     alert('Ajax error!')
	//   }
	// });
	
}

var step1ImgObj={
	selectBoxBaseSize:120
	,naturalW:0
	,naturalH:0
	,showW:0
	,showH:0
	,scalePerV:1//展示图片1px对应实质图片多少px
	,generateW:640//生成图片的宽度
	,generateH:640
	//,initW:1000//照片初始化宽度
	//,initH:0//根据initW,照片初始高度
};

var $selectAreaBox=$('#selectAreaBox');
var $imgSelectSrc=$('#imgSelectSrc');
var canvasStep1OK=null;

//展示图片onload函数
function step1ImgSelectShowLoad(el){
	setStep1ImgSizeInit();
	$('.selectImgBt-wrapper').hide();
}
function setStep1ImgSizeInit(){
	// var imgsrc=document.getElementById('imgSelectSrc');
	// var test=$('#testDiv');
	// var str='';
	// for(keys in imgsrc){
	// 	str+='<br/>'+keys+' => '+imgsrc[keys];
	// }
	// test.html(str);
	var naturalSize=getImgSize(document.getElementById('imgSelectSrc'));
	step1ImgObj.naturalW=parseInt(naturalSize.w,10);
	step1ImgObj.naturalH=parseInt(naturalSize.h,10);
	//$('#testDiv').html(naturalSize.w+'||'+naturalSize.h);
	
	if(step1ImgObj.naturalH<step1ImgObj.naturalW){
		step1ImgObj.showH=step1ImgObj.selectBoxBaseSize;
		step1ImgObj.showW=step1ImgObj.selectBoxBaseSize/step1ImgObj.naturalH*step1ImgObj.naturalW;
		step1ImgObj.scalePerV=step1ImgObj.naturalH/step1ImgObj.selectBoxBaseSize

		//hammerStep1ImgSelectBox.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL});

	} else{
		step1ImgObj.showW=step1ImgObj.selectBoxBaseSize;
		step1ImgObj.showH=step1ImgObj.selectBoxBaseSize/step1ImgObj.naturalW*step1ImgObj.naturalH;
		step1ImgObj.scalePerV=step1ImgObj.naturalW/step1ImgObj.selectBoxBaseSize
		//hammerStep1ImgSelectBox.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL});
	}

	$('#imgBox').css({'height':step1ImgObj.showH+'px'});
	$('#imgSelect').attr('height',step1ImgObj.showH);
	$('#imgSelect').css({'height':step1ImgObj.showH+'px'});
	$('#imgBox').css({'width':step1ImgObj.showW+'px'});
	$('#imgSelect').attr('width',step1ImgObj.showW);
	$('#imgSelect').css({'width':step1ImgObj.showW+'px'});

	var imgCanvasShow=document.getElementById('imgCanvasShow');
	var ctx1=imgCanvasShow.getContext('2d');
	setCanvasWH(imgCanvasShow,step1ImgObj.showW,step1ImgObj.showH);
	ctx1.drawImage(document.getElementById('imgSelectSrc'),0,0,step1ImgObj.showW,step1ImgObj.showH);
	imgCanvasShow.style.display='block';


	// step1ImgObj.initH=step1ImgObj.initW/step1ImgObj.naturalW*step1ImgObj.naturalH;
	// var imgCanvas=document.getElementById('imgCanvas');
	// var ctx=imgCanvas.getContext('2d');
	// setCanvasWH(imgCanvas,step1ImgObj.initW,step1ImgObj.initH);
	// ctx.drawImage(document.getElementById('imgSelectSrc'),0,0,step1ImgObj.initW,step1ImgObj.initH);


	$selectAreaBox.show();
	$selectAreaBox.css({top:'0px',left:'0px'});

}
var hammerStep1ImgSelectBox = new Hammer(document.getElementById('selectAreaBox'));
hammerStep1ImgSelectBox.get('pan').set({ direction: Hammer.DIRECTION_ALL});
hammerStep1ImgSelectBox.on('pan', function(ev) {
	var deltaY=ev.deltaY<0? -1:1;
	var deltaX=ev.deltaX<0? -1:1;
	var top=parseInt($selectAreaBox.css('top'),10);
	var left=parseInt($selectAreaBox.css('left'),10);
	var leftOffset=step1ImgObj.showW - step1ImgObj.selectBoxBaseSize;
	var topOffset=step1ImgObj.showH - step1ImgObj.selectBoxBaseSize;
	//$('#testDiv').html(topOffset);
	deltaY=top+deltaY;
	if(deltaY<=0){
		deltaY=0;
	} else if(deltaY>=topOffset){
		deltaY=topOffset;
	} 
	deltaX=left+deltaX;
	if(deltaX<=0){
		deltaX=0;
	} else if(deltaX>=leftOffset){
		deltaX=leftOffset;
	}
	$selectAreaBox.css({top:deltaY+'px',left:deltaX+'px'});
});
function addText(ctx,str,x,y){
	ctx.font="30px Microsoft YaHei";
	ctx.textAlign="center";
	ctx.fillStyle="#333333";
	ctx.fillText(str,x,y);
}
tapOn($('#generateBt'),function(e){
	var username=$('#textBox1').val();
	var bumen=$('#textBox2').val();
	if(username==''||bumen==''){
		alert('请输入姓名和城市信息');
		return;
	}

	$('#previewBox').show();
	$('#generateBtTips').show();
	var left=parseInt($selectAreaBox.css('left'),0);
	var top=parseInt($selectAreaBox.css('top'),0);
	left=left*step1ImgObj.scalePerV;
	top=top*step1ImgObj.scalePerV;
	var crop_canvas = document.createElement('canvas');
	var width=step1ImgObj.scalePerV*step1ImgObj.selectBoxBaseSize;
	var height=step1ImgObj.scalePerV*step1ImgObj.selectBoxBaseSize;
	//画布宽高
    crop_canvas.width = step1ImgObj.generateW;
    crop_canvas.height = step1ImgObj.generateH+100;
    var ctx=crop_canvas.getContext('2d');

    //添加底色
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,crop_canvas.width,crop_canvas.height);

    //画图
    ctx.drawImage(document.getElementById('imgSelectSrc'), left, top, width, height, 0, 0, step1ImgObj.generateW, step1ImgObj.generateH);

    //添加文字
    addText(ctx,username,step1ImgObj.generateW/2,step1ImgObj.generateH+40);
    addText(ctx,bumen,step1ImgObj.generateW/2,step1ImgObj.generateH+80);

    canvasStep1OK=crop_canvas;
    
	var main=$('#previewImgBox');
    main.html(crop_canvas);
    $(crop_canvas).css({'max-width': '100%','max-height':'80%'});
    crop_canvas=null;
    ctx=null;
    $('#generateBtTips').hide();
});
function getImgSize(el){
	return {
		w:el.width||el.clientWidth||el.naturalWidth||$(el).width()
		,h:el.height||el.clientHeight||el.naturalHeight||$(el).height()
	};
}
function setImgSrc(data){
	document.getElementById('imgSelectSrc').src=data;
	document.getElementById('imgSelect').src=data;
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