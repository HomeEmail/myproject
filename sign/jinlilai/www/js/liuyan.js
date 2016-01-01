//模版里两个图片的位置高宽
var tplBox={
	'2':{
		box1:{
			x:0
			,y:0
			,w:640
			,h:355
			,fillColor:'#ffffff'
		}
		,box2:{
			x:0
			,y:355
			,w:640
			,h:456
			,fillColor:'#ffffff'
		}
		,box1Action:{
			x:0
			,y:0
			,w:640
			,h:355
		}
		,box2Action:{
			x:0
			,y:355
			,w:640
			,h:380
		}
		,msg:{
			top: 768,
			left: 20,
			width: 403,
			height: 84,
			lh:40,
			fontSize: 32,
			color: '#222222',
			fontFamily:"Microsoft YaHei",
			rw:24,//每行的字节长度
			totalRW:44
		}
		,nameText:{
			top:855,
			left:30,
			width:250,
			height:38,
			fontSize:26,
			lh:38,
			color:'#222222',
			fontFamily:"Microsoft YaHei",
			rw:21,//每行的字节长度
			totalRW:21
		}
		,departText:{
			top:855,
			left:322,
			width:250,
			height:38,
			fontSize:26,
			lh:38,
			color:'#222222',
			fontFamily:"Microsoft YaHei",
			rw:21,//每行的字节长度
			totalRW:21
		}
		,width:640
		,height:914
	}
	,'1':{
		box1:{
			x:200
			,y:418
			,w:440
			,h:428
			,fillColor:'#ffffff'//97c72f
		}
		,box2:{
			x:0
			,y:0
			,w:640
			,h:444
			,fillColor:'#ffffff'
		}
		,box1Action:{
			x:200
			,y:500
			,w:440
			,h:335
		}
		,box2Action:{
			x:0
			,y:0
			,w:640
			,h:321
		}
		,msg:{
			top: 525,
			left: 15,
			width: 180,
			height: 315,
			lh:40,
			fontSize: 32,
			color: '#ffffff',
			fontFamily:"Microsoft YaHei",
			rw:12,
			totalRW:80
		}
		,nameText:{
			top:855,
			left:30,
			width:250,
			height:38,
			fontSize:26,
			lh:38,
			color:'#ffffff',
			fontFamily:"Microsoft YaHei",
			rw:21,//每行的字节长度
			totalRW:21
		}
		,departText:{
			top:855,
			left:322,
			width:250,
			height:38,
			fontSize:26,
			lh:38,
			color:'#ffffff',
			fontFamily:"Microsoft YaHei",
			rw:21,//每行的字节长度
			totalRW:21
		}
		,width:640
		,height:914
	}
	,'3':{
		box1:{
			x:0
			,y:0
			,w:528
			,h:335
			,fillColor:'#ffffff'
		}
		,box2:{
			x:120
			,y:290
			,w:520
			,h:357
			,fillColor:'#ffffff'
		}
		,box1Action:{
			x:0
			,y:0
			,w:528
			,h:297
		}
		,box2Action:{
			x:120
			,y:343
			,w:520
			,h:307
		}
		,msg:{
			top: 726,
			left: 20,
			width: 590,
			height: 114,
			lh:40,
			fontSize: 32,
			color: '#ffffff',
			fontFamily:"Microsoft YaHei",
			rw:38,
			totalRW:70
		}
		,nameText:{
			top:855,
			left:30,
			width:250,
			height:38,
			fontSize:26,
			lh:38,
			color:'#222222',
			fontFamily:"Microsoft YaHei",
			rw:21,//每行的字节长度
			totalRW:21
		}
		,departText:{
			top:855,
			left:322,
			width:250,
			height:38,
			fontSize:26,
			lh:38,
			color:'#222222',
			fontFamily:"Microsoft YaHei",
			rw:21,//每行的字节长度
			totalRW:21
		}
		,width:640
		,height:914
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
	,'2':{
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
		,$el:$('#img2Select')
	}
};
//设置图片位置高宽
var tplBox1=$('#tplBox1')
	,tplBox2=$('#tplBox2')
	,tplBox1Action=$('#tplBox1Action')
	,tplBox2Action=$('#tplBox2Action')
	,tplBoxSelect=tplBox[tplId]
;
tplBox1.css({
	'left':tplBoxSelect.box1.x+'px'
	,'top':tplBoxSelect.box1.y+'px'
	,'width':tplBoxSelect.box1.w+'px'
	,'height':tplBoxSelect.box1.h+'px'
	,'background-color':tplBoxSelect.box1.fillColor
});
tplBox1Action.css({
	'left':tplBoxSelect.box1Action.x+'px'
	,'top':tplBoxSelect.box1Action.y+'px'
	,'width':tplBoxSelect.box1Action.w+'px'
	,'height':tplBoxSelect.box1Action.h+'px'
});
tplBox2.css({
	'left':tplBoxSelect.box2.x+'px'
	,'top':tplBoxSelect.box2.y+'px'
	,'width':tplBoxSelect.box2.w+'px'
	,'height':tplBoxSelect.box2.h+'px'
	,'background-color':tplBoxSelect.box2.fillColor
});
tplBox2Action.css({
	'left':tplBoxSelect.box2Action.x+'px'
	,'top':tplBoxSelect.box2Action.y+'px'
	,'width':tplBoxSelect.box2Action.w+'px'
	,'height':tplBoxSelect.box2Action.h+'px'
});

//设置留言输入框位置大小
$('#liuyanTextBox').addClass('liuyanTextBox'+tplId).css({
	'left':tplBoxSelect.msg.left+'px',
	'top':tplBoxSelect.msg.top+'px',
	'width':tplBoxSelect.msg.width+'px',
	'height':tplBoxSelect.msg.height+'px',
	'font-size':tplBoxSelect.msg.fontSize+'px',
	'color':tplBoxSelect.msg.color,
	'line-height':tplBoxSelect.msg.lh+'px',
	'font-family':tplBoxSelect.msg.fontFamily
});
//输入名字框位置大小
$('#liuyanName').css({
	'left':tplBoxSelect.nameText.left+'px',
	'top':tplBoxSelect.nameText.top+'px',
	'width':tplBoxSelect.nameText.width+'px',
	'height':tplBoxSelect.nameText.height+'px',
	'font-size':tplBoxSelect.nameText.fontSize+'px',
	'color':'#222222',
	'line-height':tplBoxSelect.nameText.lh+'px',
	'font-family':tplBoxSelect.nameText.fontFamily
});
//输入部门框位置大小
$('#liuyanDepartment').css({
	'left':tplBoxSelect.departText.left+'px',
	'top':tplBoxSelect.departText.top+'px',
	'width':tplBoxSelect.departText.width+'px',
	'height':tplBoxSelect.departText.height+'px',
	'font-size':tplBoxSelect.departText.fontSize+'px',
	'color':'#222222',
	'line-height':tplBoxSelect.departText.lh+'px',
	'font-family':tplBoxSelect.departText.fontFamily
});


//box select img bt
function tplBoxTapAction(boxId){
	//alert(boxId);
	$('#fileSelectInput'+boxId).trigger('click');
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
		
		xhr.open("POST", "../handupload.ashx");//../handupload.ashx
		//xhr.open("POST", "testUpload.php");
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
	boxImging.minScaleVal=boxImging.curScaleVal;

	boxImging.showW=curW;
	boxImging.showH=boxImging.curScaleVal*boxImging.trueH;
	boxImging.initW=boxImging.showW;
	boxImging.initH=boxImging.showH;
	//boxImging.$el.height(boxImging.showH);
	//boxImging.$el.width(boxImging.showW);
	boxImging.$el.animate({'height':boxImging.showH,'width':boxImging.showW},350,'linear');

	boxImging.$el.show();

	boxImging.curScaleVal=1;
	boxImging.minScaleVal=1;

	//boxImging.$el.animate({'scale':boxImging.curScaleVal+','+boxImging.curScaleVal},100,'linear');
	
	
}

var hammerbox1 = new Hammer.Manager(document.getElementById('tplBox1Action'));
hammerbox1.add( new Hammer.Tap() );
hammerbox1.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
hammerbox1.add( new Hammer.Pinch() );

hammerbox1.on('tap',function(e){
	tplBoxTapAction(1);
});

var hammerbox2 = new Hammer.Manager(document.getElementById('tplBox2Action'));
hammerbox2.add( new Hammer.Tap() );
hammerbox2.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
hammerbox2.add( new Hammer.Pinch() );

hammerbox2.on('tap',function(e){
	tplBoxTapAction(2);
});


hammerbox1.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammerbox1.on('pan', function(ev) {
	panHandler(1,ev);	
});

hammerbox2.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammerbox2.on('pan', function(ev) {
	panHandler(2,ev);	
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

hammerbox2.get('pinch').set({ enable: true });
hammerbox2.on('pinchin',function(ev){
	//alert('pinchin');
	//console.log('pinchin');
	//console.log(ev.scale);
	scaleHandler(2,ev.scale,ev.type);
});
hammerbox2.on('pinchout',function(ev){
	//alert('pinchout');
	//console.log('pinchout');
	//console.log(ev.scale);
	scaleHandler(2,ev.scale,ev.type);
});
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
	if(boxImging.showW<=tplBoxSelect['box'+boxId].w){
		boxImging.showW=tplBoxSelect['box'+boxId].w;
		boxImging.showH=boxImging.showW/boxImging.trueW*boxImging.trueH;
	}

	boxImging.$el.animate({'height':boxImging.showH,'width':boxImging.showW},26,'linear');

	// var top=parseInt(boxImging.$el.css('top')||0,10);
 //    var left=parseInt(boxImging.$el.css('left')||0,10);

}



var canvasLiuyanOK=null;

//取消预览
tapOn($('#previewCancelBt'),function(e){
	$('#previewBox').hide();
});
//上传生成的图片
tapOn($('#previewOKBt'),function(e){
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
});
var $textInput=$('#liuyanTextBox');
function textInputCheck(el){
	var str=$textInput.val();
	if(getStrTrueLength(str)>tplBoxSelect.msg.totalRW){
		$textInput.val(str.substr(0,str.length-1));
		alert('达到字数限制了！');
	}
}
var $liuyanName=$('#liuyanName');
function liuyanNameCheck(el){
	var str=$liuyanName.val();
	if(getStrTrueLength(str)>tplBoxSelect.nameText.totalRW){
		$liuyanName.val(str.substr(0,str.length-1));
		alert('达到字数限制了！');
	}
}
var $liuyanDepartment=$('#liuyanDepartment');
function liuyanDepartmentCheck(el){
	var str=$liuyanDepartment.val();
	if(getStrTrueLength(str)>tplBoxSelect.departText.totalRW){
		$liuyanDepartment.val(str.substr(0,str.length-1));
		alert('达到字数限制了！');
	}
}

//预览按钮
tapOn($('#previewImgBt'),function(e){
	if(boxImg['1'].showW<=0||boxImg['2'].showW<=0){
		alert('有图片未完成上传！');
		return;
	}
	if($liuyanName.val()==''||$liuyanDepartment.val()==''){
		alert('请先完善姓名和部门信息');
		return;
	}

	$('#previewBox').show();
	$('#generateBtTips').show();
	var crop_canvas = document.createElement('canvas');
	var width=tplBoxSelect.width;
	var height=tplBoxSelect.height;
	//画布宽高
    crop_canvas.width = width;
    crop_canvas.height = height;
    var ctx=crop_canvas.getContext('2d');

    //添加底色
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,crop_canvas.width,crop_canvas.height);

    //画图box2
    var crop_canvas_box2 = document.createElement('canvas');
    crop_canvas_box2.width = boxImg['2'].showW;
    crop_canvas_box2.height =boxImg['2'].showH;
    var ctx_box2=crop_canvas_box2.getContext('2d');
    ctx_box2.drawImage(document.getElementById('img2Select'), 0,0,crop_canvas_box2.width,crop_canvas_box2.height);


    var imgW=tplBoxSelect['box2'].w;
    if(boxImg['2'].showW<=imgW){
    	imgW=parseInt(boxImg['2'].showW,10);
    }
    var imgH=tplBoxSelect['box2'].h;
    if(boxImg['2'].showH<=imgH){
    	imgH=parseInt(boxImg['2'].showH,10);
    }
    var imgLeft=tplBoxSelect['box2'].x;
    var imgTop=tplBoxSelect['box2'].y;

	var c_left=0;
    var c_top=0;
    if(boxImg['2'].left>=0){
    	imgLeft+=boxImg['2'].left;
    	c_left=0;
    } else {
    	c_left=Math.abs(boxImg['2'].left);
    }
    if(boxImg['2'].top>=0){
    	imgTop+=boxImg['2'].top;
    	c_top=0;
    } else {
    	c_top=Math.abs(boxImg['2'].top);
    }

    ctx.drawImage(crop_canvas_box2, c_left, c_top, imgW, imgH,imgLeft, imgTop, imgW, imgH);


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
    imgLeft=tplBoxSelect['box1'].x;
    imgTop=tplBoxSelect['box1'].y;

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

    //添加底色
    ctx.fillStyle="#ffffff";
    ctx.fillRect(imgLeft, imgTop, tplBoxSelect['box1'].w, tplBoxSelect['box1'].h);

    ctx.drawImage(crop_canvas_box1, c_left, c_top, imgW, imgH,imgLeft, imgTop, imgW, imgH);



    //画遮罩
    ctx.drawImage(document.getElementById('tplMaskImg'),0,0,width,height);

    //添加留言文字
    writeTextOnCanvas({
    	canvasEl:crop_canvas
		,lh:tplBoxSelect.msg.lh
		,rw:tplBoxSelect.msg.rw//每行字节长度
		,text:$('#liuyanTextBox').val()
		,fontSize:tplBoxSelect.msg.fontSize
		,fillStyle:tplBoxSelect.msg.color
		,top:tplBoxSelect.msg.top//这段文字绘制开始的Y值
		,left:tplBoxSelect.msg.left//这段文字绘制开始的X值
		,fontFamily:tplBoxSelect.msg.fontFamily
    });
     //添加姓名文字
    writeTextOnCanvas({
    	canvasEl:crop_canvas
		,lh:tplBoxSelect.nameText.lh
		,rw:tplBoxSelect.nameText.rw//每行字节长度
		,text:$liuyanName.val()
		,fontSize:tplBoxSelect.nameText.fontSize
		,fillStyle:tplBoxSelect.nameText.color
		,top:tplBoxSelect.nameText.top//这段文字绘制开始的Y值
		,left:tplBoxSelect.nameText.left//这段文字绘制开始的X值
		,fontFamily:tplBoxSelect.nameText.fontFamily
    });
     //添加部门文字
    writeTextOnCanvas({
    	canvasEl:crop_canvas
		,lh:tplBoxSelect.departText.lh
		,rw:tplBoxSelect.departText.rw//每行字节长度
		,text:$liuyanDepartment.val()
		,fontSize:tplBoxSelect.departText.fontSize
		,fillStyle:tplBoxSelect.departText.color
		,top:tplBoxSelect.departText.top//这段文字绘制开始的Y值
		,left:tplBoxSelect.departText.left//这段文字绘制开始的X值
		,fontFamily:tplBoxSelect.departText.fontFamily
    });


    canvasLiuyanOK=crop_canvas;
    
	var main=$('#previewImgBox');
    main.html(crop_canvas);
    $(crop_canvas).css({'max-width': '100%','max-height':'76%'});
    crop_canvas_box1=null;
    ctx_box1=null;
    crop_canvas_box2=null;
    ctx_box2=null;
    crop_canvas=null;
    ctx=null;
    $('#generateBtTips').hide();
});



















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