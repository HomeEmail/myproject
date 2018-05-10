var $main=$('#main');

//输出的图片配置
var resultImg={
	// w:375,
	// h:450
	w:1500,
	h:1800
};

function loadImg(src,ok,fail){
	var img=new Image();
	img.onload=function(){
		ok(img);
	};
	img.onerror=function(){
		fail();
	};
	img.src=src;
}

function creatImgCanvas(imgObj){
	var crop_canvas = document.createElement('canvas');
    crop_canvas.width = resultImg.w;
    crop_canvas.height = resultImg.h;
    var ctx=crop_canvas.getContext('2d');
    ctx.drawImage(imgObj, 0, 0,resultImg.w,resultImg.h);
    return crop_canvas;
}

function creatMianliao(imgObj){
	var crop_canvas = document.createElement('canvas');
    crop_canvas.width = resultImg.w*2;
    crop_canvas.height = resultImg.h*2;
    var ctx=crop_canvas.getContext('2d');

    var imgW=imgObj.width;
    var imgH=imgObj.height;

    //ctx.drawImage(imgObj, 0, 0);
    //平铺图像
	var wCount=Math.ceil(crop_canvas.width/imgW);
	var hCount=Math.ceil(crop_canvas.height*2/imgH);
	var xPoints=[];
	var yPoints=[];
	for(var i=0;i<wCount;i++){
		xPoints.push([i*imgW,(i+1)*imgW]);
	}
	for(var ii=0;ii<hCount;ii++){
		yPoints.push([ii*imgH,(ii+1)*imgH]);
	}
	for(var j=0,len=xPoints.length;j<len;j++){
		for(var jj=0,jjl=yPoints.length;jj<jjl;jj++){
			console.log(xPoints[j][0],yPoints[jj][0], imgW,imgH);
			ctx.drawImage(imgObj, xPoints[j][0],yPoints[jj][0], imgW,imgH);
		}
	}

	return crop_canvas;

    //$main.html(crop_canvas); 
}



var yifuImg=null;
var yingyinImg=null;
var rentiImg=null;

loadImg('./images/2-0.png',function(img){
	yifuImg=creatImgCanvas(img);
	loadYingyin();
},function(){
	alert('img loading failure.');
});
function loadYingyin(){
	loadImg('./images/2-1.png',function(img){
		yingyinImg=creatImgCanvas(img);
		loadRenti();
	},function(){
		alert('img loading failure.');
	});
}
function loadRenti(){
	loadImg('./images/2-2.png',function(img){
		rentiImg=creatImgCanvas(img);
		loadMianliao();
	},function(){
		alert('img loading failure.');
	});
}
var canvasMianliao=null;
//加载面料
function loadMianliao(){

	loadImg('./images/xingxing.png',function(img){
		//console.log(img);
		//alert(img.width);
		canvasMianliao=creatMianliao(img);
		drawResult();
		//autoDraw();
	},function(){
		alert('img loading failure.');
	});
}

var leftMianliao=0;
var topMianliao=0;

function drawResult(){
	var crop_canvas = document.createElement('canvas');
    crop_canvas.width = resultImg.w;
    crop_canvas.height = resultImg.h;
    var ctx=crop_canvas.getContext('2d');
    ctx.drawImage(yifuImg, 0,0, resultImg.w,resultImg.h);
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(canvasMianliao, leftMianliao,topMianliao, resultImg.w,resultImg.h);
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(yingyinImg, 0,0, resultImg.w,resultImg.h);
    ctx.drawImage(rentiImg, 0,0, resultImg.w,resultImg.h);

    $main.html(crop_canvas); 
    //$('#result').attr('src',crop_canvas.toDataURL('images/png'));
}

var hammerbox1 = new Hammer.Manager(document.getElementById('panBox'));
hammerbox1.add( new Hammer.Tap() );
hammerbox1.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
//hammerbox1.add( new Hammer.Pinch() );

hammerbox1.on('tap', function(ev) {
	console.log('tap',ev);	
});

hammerbox1.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammerbox1.on('pan', function(ev) {
	panHandler(ev);	
});

function panHandler(ev){

	//var deltaX=ev.deltaX;//移动的相对距离，正数表示向右
	//var deltaY=ev.deltaY;//移动的相对距离，正数表示向下
	//console.log(deltaX,deltaY);
	$('#debug').html('x:'+ev.deltaX+' , y:'+ev.deltaY);
	var deltaX=ev.deltaX<0? -(resultImg.w/$main.width()*2):(resultImg.w/$main.width()*2);
	var deltaY=ev.deltaY<0? -(resultImg.h/$main.height()*2):(resultImg.h/$main.height()*2);
	leftMianliao+=deltaX;
	topMianliao+=deltaY;
	if(leftMianliao<=(10-resultImg.w)){
		leftMianliao=(10-resultImg.w);
	}
	if(leftMianliao>=(resultImg.w-10)){
		leftMianliao=(resultImg.w-10);
	}
	if(topMianliao<=(10-resultImg.h)){
		topMianliao=(10-resultImg.h);
	}
	if(topMianliao>=(resultImg.h-10)){
		topMianliao=(resultImg.h-10);
	}
	drawResult();
}

function autoDraw(){
	setInterval(function(){
		leftMianliao+=2;
		topMianliao+=2;
		if(leftMianliao<=(10-resultImg.w)){
			leftMianliao=(10-resultImg.w);
		}
		if(leftMianliao>=(resultImg.w-10)){
			leftMianliao=(resultImg.w-10);
		}
		if(topMianliao<=(10-resultImg.h)){
			topMianliao=(10-resultImg.h);
		}
		if(topMianliao>=(resultImg.h-10)){
			topMianliao=(resultImg.h-10);
		}
		drawResult();
	},30);
}