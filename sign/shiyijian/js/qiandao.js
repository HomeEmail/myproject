//模版里两个图片的位置高宽
var tplBox={
	'1':{
		box1:{
			x:20
			,y:150
			,w:597
			,h:552
		}
		,box1Action:{
			x:50
			,y:200
			,w:497
			,h:452
		}
		,width:597
		,height:552
	}
};
//图片缩放高宽位置信息
var boxImg={
	'1':{
		curScaleVal:1
		,minScaleVal:0.3
		,top:0
		,left:0
		,showW:0
		,showH:0
		,initH:0
		,initW:0
		,trueW:0
		,trueH:0
		,$el:$('#img1Select')
	}
};
//设置图片位置高宽
var tplBox1=$('#tplBox1')
	,tplBox1Action=$('#tplBox1Action')
	,tplId=1
	,tplBoxSelect=tplBox[tplId]
;
tplBox1.css({
	'left':tplBoxSelect.box1.x+'px'
	,'top':tplBoxSelect.box1.y+'px'
	,'width':tplBoxSelect.box1.w+'px'
	,'height':tplBoxSelect.box1.h+'px'
});
tplBox1Action.css({
	'left':tplBoxSelect.box1Action.x+'px'
	,'top':tplBoxSelect.box1Action.y+'px'
	,'width':tplBoxSelect.box1Action.w+'px'
	,'height':tplBoxSelect.box1Action.h+'px'
});



//box select img bt
function tplBoxTapAction(boxId){
	//alert(boxId);
	//$('#fileSelectInput'+boxId).trigger('click');
}

function fileChange(el,boxId){

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
		$('#selectImgBt'+boxId+'Tips').html('正在读取图片，请稍等...');
		uploadImgInitStep1(file,boxId);//表单形式提交	

	} else {
		alert('Please select a file!');	
	}
}

function uploadImgInitStep1(file,boxId){
	try{
		var boxId=boxId;
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
		$('#selectImgBt'+boxId+'Tips').html('上传图片失败');
	}
	function uploadComplete(evt){
		//alert('uploadComplete');
	}
	function uploadCompleteReturn(str,evt){
		//alert('uploadCompleteReturn'+evt.target.responseText);
		setImgSrc(str,boxId);
		$('#selectImgBt'+boxId+'Tips').html('');
	}
	function uploadProgress(evt){
		if (evt.lengthComputable) {
			
			var percentComplete = Math.round(evt.loaded * 100 / evt.total);//80
			$('#selectImgBt'+boxId+'Tips').html('正在读取图片，请稍等...'+percentComplete+'%');
		} else {
			//'请稍等';

		}
	}
	function uploadFailed(evt){
		alert('上传图片失败');
		$('#selectImgBt'+boxId+'Tips').html('读取图片失败');
	}
	function uploadCanceled(evt) {
		//alert("上传图片被取消了");
		$('#selectImgBt'+boxId+'Tips').html('读取图片失败');
	}
}


function setImgSrc(url,boxId){
	document.getElementById('img'+boxId+'SelectSrc').src=url;
	document.getElementById('img'+boxId+'Select').src=url;
}
function getImgSize(el){
	return {
		w:el.width||el.clientWidth||el.naturalWidth||$(el).width()
		,h:el.height||el.clientHeight||el.naturalHeight||$(el).height()
	};
}
//图片载入操作
function step1ImgSelectShowLoad(el,boxId){
	setStep1ImgSizeInit(boxId);
	$('#selectImgBt'+boxId+'-wrapper').hide();
}
function setStep1ImgSizeInit(boxId){
	var boxImging=boxImg[boxId];
	var naturalSize=getImgSize(document.getElementById('img'+boxId+'SelectSrc'));
	boxImging.trueW=naturalSize.w;
	boxImging.trueH=naturalSize.h;

	//var imgShow=$('#img'+boxId+'Select');
	var curW=tplBoxSelect['box'+boxId].w;
	
	boxImging.curScaleVal=curW/boxImging.trueW;
	//boxImging.minScaleVal=boxImging.curScaleVal;

	boxImging.showW=curW;
	boxImging.showH=boxImging.curScaleVal*boxImging.trueH;
	boxImging.initW=boxImging.showW;
	boxImging.initH=boxImging.showH;
	//boxImging.$el.height(boxImging.showH);
	//boxImging.$el.width(boxImging.showW);
	boxImging.$el.animate({'height':boxImging.showH,'width':boxImging.showW},350,'linear');

	boxImging.$el.show();

	boxImging.curScaleVal=1;
	//boxImging.minScaleVal=1;

	//boxImging.$el.animate({'scale':boxImging.curScaleVal+','+boxImging.curScaleVal},100,'linear');
	
	
}

var hammerbox1 = new Hammer.Manager(document.getElementById('tplBox1Action'));
hammerbox1.add( new Hammer.Tap() );
hammerbox1.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
hammerbox1.add( new Hammer.Pinch() );

// $('#uploadImgBt').on('tap',function(e){
// 	tplBoxTapAction(1);
// });


hammerbox1.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammerbox1.on('pan', function(ev) {
	panHandler(1,ev);	
});


hammerbox1.get('pinch').set({ enable: true });
hammerbox1.on('pinchin',function(ev){
	//alert('pinchin');
	//console.log('pinchin');
	//console.log(ev.scale);
	scaleHandler(1,ev.scale,ev.type);
});
hammerbox1.on('pinchout',function(ev){
	//alert('pinchout');
	//console.log('pinchout');
	//console.log(ev.scale);
	scaleHandler(1,ev.scale,ev.type);
});

function panHandler(boxId,ev){
	var boxImging=boxImg[boxId];

	var deltaY=ev.deltaY<0? -6:6;
	var deltaX=ev.deltaX<0? -6:6;
	var left=boxImging.left+deltaX;
	var top=boxImging.top+deltaY;
	var showW_temp=parseInt(boxImging.showW,10);
	var showH_temp=parseInt(boxImging.showH,10);

	if(showW_temp<=tplBoxSelect['box'+boxId].w){
		//图片只能在框内移动
		if(left>(tplBoxSelect['box'+boxId].w-showW_temp)){
			left=tplBoxSelect['box'+boxId].w-showW_temp;
		}
		if(left<0){
			left=0;
		}
	} else {
		//图片可以在框外移动
		if(left>0){
			left=0;
		}
		if(left<-(showW_temp-tplBoxSelect['box'+boxId].w)){
			left=-(showW_temp-tplBoxSelect['box'+boxId].w);
		}
	}
	if(showH_temp<=tplBoxSelect['box'+boxId].h){
		//图片只能在框内移动
		if(top>(tplBoxSelect['box'+boxId].h-showH_temp)){
			top=tplBoxSelect['box'+boxId].h-showH_temp;
		}
		if(top<0){
			top=0;
		}
	} else {
		//图片可以在框外移动
		if(top>0){
			top=0;
		}
		if(top<-(showH_temp-tplBoxSelect['box'+boxId].h)){
			top=-(showH_temp-tplBoxSelect['box'+boxId].h);
		}
	}
	boxImging.left=left;
	boxImging.top=top;
	boxImging.$el.css({
		'left':left+'px'
		,'top':top+'px'
	});
}


function scaleHandler(boxId,scaleV,typeV){
	var boxImging=boxImg[boxId];
	var oldScaleVal=boxImging.curScaleVal;
	if(typeV=='pinchin'){
		boxImging.curScaleVal=boxImging.curScaleVal-0.01;
	} else if(typeV=='pinchout'){
		boxImging.curScaleVal=boxImging.curScaleVal+0.01;
	} else {
		return;
	}
	var curScaleVal=boxImging.curScaleVal;

	//boxImging.$el.animate({'scale':curScaleVal+','+curScaleVal},26,'linear');
	boxImging.showW=curScaleVal*boxImging.initW;
	boxImging.showH=curScaleVal*boxImging.initH;
	//让图片的宽度不要小于设定的生成图片宽度的一半
	if(boxImging.showW<=tplBoxSelect['box'+boxId].w/2){
		boxImging.showW=tplBoxSelect['box'+boxId].w/2;
		boxImging.showH=boxImging.showW/boxImging.trueW*boxImging.trueH;
	}

	boxImging.$el.animate({'height':boxImging.showH,'width':boxImging.showW},26,'linear');

	// var top=parseInt(boxImging.$el.css('top')||0,10);
 //    var left=parseInt(boxImging.$el.css('left')||0,10);

}



var canvasLiuyanOK=null;

//取消预览
// tapOn($('#previewCancelBt'),function(e){
// 	$('#previewBox').hide();
// });
//上传生成的图片
//tapOn($('#previewOKBt'),uploadFn);
function uploadFn(e){
	e.stopPropagation();
	e.preventDefault();
	try{e.stopImmediatePropagation();}catch(err){}
	
	if(!!!canvasLiuyanOK){
		alert('没有图片信息');
		return;
	}
	var $bt=$(this);
	//上传base64图片数据给服务器
	var data=canvasLiuyanOK.toDataURL("image/png");//图片大的话，这步操作会很慢
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
}

var $liuyanName=$('#liuyanName');
function liuyanNameCheck(el){
	var str=$liuyanName.val();
	if(getStrTrueLength(str)>50){
		$liuyanName.val(str.substr(0,str.length-1));
		alert('达到字数限制了！');
	}
}

//预览按钮
//tapOn($('#previewImgBt'),previewImgFn);
function previewImgFn(e){
	if(boxImg['1'].showW<=0){
		alert('有图片未完成上传！');
		return;
	}
	if($liuyanName.val()==''){
		alert('请先完善姓名');
		return;
	}
	if($('#liuyanDepartment').val()==''){
		alert('请先输入部门');
		return;
	}

	$('#previewBox').show();
	$('#generateBtTips').show();
	var crop_canvas = document.createElement('canvas');
	var width=tplBoxSelect.width;
	var height=tplBoxSelect.height+50;//50是放文字位置
	//画布宽高
    crop_canvas.width = width;
    crop_canvas.height = height;
    var ctx=crop_canvas.getContext('2d');

   
		var starMaskImg=document.getElementById('starMask');
		var starBgImg=document.getElementById('starBg');


    //画图box1
    var crop_canvas_box1 = document.createElement('canvas');
    crop_canvas_box1.width = boxImg['1'].showW;
    crop_canvas_box1.height =boxImg['1'].showH;
    var ctx_box1=crop_canvas_box1.getContext('2d');
    ctx_box1.drawImage(document.getElementById('img1Select'), 0,0,crop_canvas_box1.width,crop_canvas_box1.height);


    imgW=tplBoxSelect['box1'].w;
    if(boxImg['1'].showW<=imgW){
    	imgW=parseInt(boxImg['1'].showW,10);
    }
    imgH=tplBoxSelect['box1'].h;
    if(boxImg['1'].showH<=imgH){
    	imgH=parseInt(boxImg['1'].showH,10);
    }
	var imgLeft=0;
    var imgTop=0;

   // imgLeft=tplBoxSelect['box1'].x;
    //imgTop=tplBoxSelect['box1'].y;

	c_left=0;
    c_top=0;
    if(boxImg['1'].left>=0){
    	imgLeft+=boxImg['1'].left;
    	c_left=0;
    } else {
    	c_left=Math.abs(boxImg['1'].left);
    }
    if(boxImg['1'].top>=0){
    	imgTop+=boxImg['1'].top;
    	c_top=0;
    } else {
    	c_top=Math.abs(boxImg['1'].top);
    }

   
		ctx.drawImage(starBgImg, 0, 0, 597, 552);//bg
		ctx.globalCompositeOperation = 'source-in';
  

		//ctx.drawImage(crop_canvas_box1, 0, 0, 597, 552);//img
    ctx.drawImage(crop_canvas_box1, c_left, c_top, imgW, imgH,imgLeft, imgTop, imgW, imgH);

		ctx.globalCompositeOperation = 'source-over';
		ctx.drawImage(starMaskImg, 0, 0, 597, 552);//mask


    //画遮罩
    //ctx.drawImage(document.getElementById('tplMaskImg'),0,0,width,height);

    // 添加姓名文字
  //   writeTextOnCanvas({
  //   	canvasEl:crop_canvas
		// ,lh:50
		// ,rw:50//每行字节长度
		// ,text:$liuyanName.val()
		// ,fontSize:32
		// ,fillStyle:'#ffffff'
		// ,top:552//这段文字绘制开始的Y值
		// ,left:50//这段文字绘制开始的X值
		// ,fontFamily:'Microsoft YaHei'
  //   });
   
	addText(ctx,$liuyanName.val(),300,512);
	addText(ctx,$('#liuyanDepartment').val(),300,562);

    canvasLiuyanOK=crop_canvas;
    
	var main=$('#previewImgBox');
    main.html(crop_canvas);
    $(crop_canvas).css({'max-width': '100%','max-height':'76%'});
    crop_canvas_box1=null;
    ctx_box1=null;
    crop_canvas=null;
    ctx=null;
    $('#generateBtTips').hide();
}

function addText(ctx,str,x,y){
	ctx.font="30px Microsoft YaHei";
	ctx.textAlign="center";
	ctx.fillStyle="#ffffff";
	ctx.fillText(str,x,y);
}

/***
canvas写文字自动换行
o:{
	canvasEl:canvas 对象
	,lh:行高
	,rw:每行字节长度
	,text:待写的文字
	,fontSize:24
	,fillStyle:'#ffffff'
	,top:0//这段文字绘制开始的Y值
	,left:0//这段文字绘制开始的X值
	,fontFamily:'微软雅黑'
}
**/
function writeTextOnCanvas(o){
	if(!!!o) alert('parameter error');
	if(o.text=='') return;
	var cns = o.canvasEl;
	var ctx = cns.getContext("2d");
	var fontSize=o.fontSize||16;
	var lineheight = o.lh||fontSize*1.2;
	var text = o.text||'';
	var top=o.top||0;
	var left=o.left||0;
	var rw=o.rw||50;
	var fontFamily=o.fontFamily||'微软雅黑';
	//ctx.width = cns.width;
	//ctx.height = cns.height;

	//ctx.clearRect(0, 0, ctx.width, ctx.height);
	ctx.font = fontSize+"px "+fontFamily;
	ctx.fillStyle = o.fillStyle||"#000";
	function getTrueLength(str){//获取字符串的真实长度（字节长度）
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
	function cutString(str, leng){//按字节长度截取字符串，返回substr截取位置
		var len = str.length, tlen = len, nlen = 0;
		for(var x = 0; x < len; x++){
			if(str.charCodeAt(x) > 128){
				if(nlen + 2 < leng){
					nlen += 2;
				}else{
					tlen = x;
					break;
				}
			}else{
				if(nlen + 1 < leng){
					nlen += 1;
				}else{
					tlen = x;
					break;
				}
			}
		}
		return tlen;
	}
	for(var i = 1; getTrueLength(text) > 0; i++){
		var tl = cutString(text, rw);
		ctx.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ""), left, i * lineheight + top);
		text = text.substr(tl);
	}
}
//writeTextOnCanvas(canvasEl, 22, 40, 'xxoo');

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