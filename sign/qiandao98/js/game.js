
/**实现与pc端同样的el:active效果只需要额外添加下面一行代码即可**/
document.body.addEventListener('touchstart', function (e) { }); 
document.body.addEventListener('touchmove', function (e) { 
	e.preventDefault();
});

var 
	sound= new Audio() || document.getElementById('sound')
	;

//sound.src='../res/images/diu.wav';
sound.src='./images/ok.mp3';
// sound.pause();
// sound.play();

var resourceAry=[
	'./images/game-again.png'
	,'./images/game-again-on.png'
	,'./images/game-bg.jpg'
	,'./images/game-bg-1.png'
	,'./images/game-play-bg.png'
	,'./images/game-rule-text.png'
	,'./images/game-rule-title.png'
	,'./images/game-star-on.png'
	,'./images/game-star.png'
	,'./images/game-start-on.png'
	,'./images/game-start.png'
	,'./images/game-step1-bg.png'
	,'./images/score-bg.png'
	,'./images/LetsGo.png'
	,'./images/LetsGo-on.png'
	,'./images/result-title.png'
	,'./images/play-top.png'
];
function LoadingRes(o){
	var res=o.resources||[];
	var len=res.length;
	var curi=0;
	var completed=o.completed||function(){
		alert('res loading completed');
	};
	var loadingCallback=o.loadingCallback||function(s){
		//console.log(s);//s百分之几
	};

	function action(ary){
		var img;
		if(curi>=len){
			completed();
			return false;
		} else {
			try{
				img=new Image();
			} catch(err){
				completed();
				return false;
			}
			
			img.onload=function(){
				//console.log('img loaded: '+res[curi]);
				img=null;
				curi++;
				loadingCallback(parseInt((curi/len)*100,10));

				action(res);//arguments.callee(res);//递归调用
			}
			img.onerror=function(e){
				//console.log('img error: '+res[curi]);
				img=null;
				curi++;
				loadingCallback(parseInt((curi/len)*100,10));

				action(res);//arguments.callee(res);//递归调用
			}
			img.src=res[curi];
			//log(img.src);
		}
	}

	this.init=function(){
		action(res);
	}
	this.init();
}
var loadingBox=$('#loadingBox')
	,welcomeBox=$('#welcome')
;

new LoadingRes({
	resources:resourceAry
	,completed:function(){
		//alert('res loading completed');
		loadingBox.hide();
		welcomeBox.show();
	}
	,loadingCallback:function(s){
		//console.log(s);//s百分之几
		loadingBox.text('正在为您准备资源...'+s+'%');
	}
});


var $playLetsGo=$('#playLetsGo')
	,$wel=$('#welcome')
	,$letsgoBt=$('#letsgoBt')
	,$againBt=$('#againBt')
	,$ruleTitle=$('#ruleTitle')
	,$resultTitle=$('#resultTitle')
	,$ruleText=$('#ruleText')
	,$resultText=$('#resultText')
	,$ruleTextWrapper=$('#ruleTextWrapper')
	,$starWrapperLetsGo=$('#starWrapperLetsGo')
	,$starWrapper=$('#starWrapper')
	,playBoxHLetsGo=0
	,playBoxWLetsGo=0
	,playBoxH=0
	,playBoxW=0
	,playH=0
	,playW=0
	,starH=0
	,starW=0
	,playHLetsGo=0
	,playWLetsGo=0
	,starHLetsGo=0
	,starWLetsGo=0
	,$starItems=[]
	,scores=[500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500]
	,scoreTotal=0
	,starMarks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]//0表示不可见，其他表示可见
	,timer=null//出现星星控制
	,showItemTime=100//星星出现间隔频率控制
	,starShowTime=800//星星出现持续时间
	,timerOut=null//时间到了控制
	,timerOver=40//秒
	,beginTime=0
	,endTime=0
	,$timeShow=$('#timeShow')
;
$('#welcomeBt').on('tap',function(e){
	//$welBt.hide();
	$wel.hide();
	$playLetsGo.show();
	playBoxHLetsGo=$('#playBgImgLetsGo').getH();
	playBoxWLetsGo=$('#playBgImgLetsGo').getW();
	log(playBoxHLetsGo);log(playBoxWLetsGo);
	var textH=$ruleTextWrapper.getH();
	playHLetsGo=playBoxHLetsGo-textH-10-40;//
	playWLetsGo=playBoxWLetsGo;
	log(playHLetsGo);log(playWLetsGo);
	starHLetsGo=parseInt(playHLetsGo/2,10);
	starWLetsGo=parseInt(playWLetsGo/4,10);
	$starWrapperLetsGo.css({'top':(textH+10)+'px','height':playHLetsGo+'px'});
	
});

//letsgo
$letsgoBt.on('tap',function(e){
	$playLetsGo.hide();
	$('#playContent').show();

	playBoxH=$('#playBgImg').getH();
	playBoxW=$('#playBgImg').getW();
	log(playBoxH);log(playBoxW);
	
	playH=playBoxH-105;//
	playW=playBoxW;
	log(playH);log(playW);
	starH=parseInt(playH/4,10);
	starW=parseInt(playW/4,10);
	$starWrapper.css({'height':playH+'px'});
	$starItems=$starWrapper.children();
	for(var i=0,len=$starItems.length;i<len;i++){
		$starItems[i]=$($starItems[i]);
	}
	gameInit();
});
/**生成指定范围的随机整数*/
function fRandomBy(under, over){ 
	switch(arguments.length){ 
		case 1: return parseInt(Math.random()*under+1); 
		case 2: return parseInt(Math.random()*(over-under+1) + under); 
		default: return 0; 
	} 
} 

function gameInit(){
	$ruleTitle.hide();
	$ruleText.hide();
	$resultTitle.show();
	$resultText.show();

	$letsgoBt.hide();
	$againBt.hide();

	for(var i=0,len=$starItems.length;i<len;i++){
		$starItems[i].css({'visibility':'hidden'});
		starMarks[i]=0;
		//fRandomBy(0,7)
	}
	scoreTotal=0;
	beginTime=+new Date();
	endTime=beginTime+(timerOver*1000);
	timer=setInterval(timeHandler,showItemTime);
	timerOut=setInterval(timerOutHandler,1000);
	$timeShow.html('剩'+timerOver+'秒').show();
}
function timerOutHandler(){
	var t=endTime-(+new Date());
	if(t<=0){
		if(!!timer){
			clearInterval(timer);
			timer=null;
		}
		if(!!timerOut){
			clearInterval(timerOut);
			timerOut=null;
		}
		$timeShow.hide();
		$againBt.show();
		for(var i=0,len=$starItems.length;i<len;i++){
		$starItems[i].css({'visibility':'visible'});
			starMarks[i]=0;
			//fRandomBy(0,7)
		}
		document.title='戳星星，能量爆满达到'+scoreTotal;
		alert('时间到了，游戏结束！');
		return;
	}
	$timeShow.html('剩'+parseInt(t/1000,10)+'秒');
}
function timeHandler(){
	
	var index=fRandomBy(0,15);
	if(!!starMarks[index]){
		return;//星星已出现
	}
	var hasShowNum=0;//已有几个星星出现
	for(var i=0,len=starMarks.length;i<len;i++){	
		if(starMarks[i]!=0){
			hasShowNum++;
		}
	}
	if(hasShowNum>=4){
		return;//同时最多只能显示3个星星
	}

	$starItems[index].css({'visibility':'visible'});
	starMarks[index]=setTimeout(function(){
		if(!!starMarks[index]){
			clearTimeout(starMarks[index]);
			$starItems[index].css({'visibility':'hidden'});
			starMarks[index]=0;
		}
	},starShowTime);
}

//againBt
$againBt.on('tap',function(e){
	gameInit();
});

function iconTap(e){
	//console.log(e);
	
	var el=$(this)
		,i=el.index()
		// ,count=el.attr('data-id')
		,score=scores[i]
		// ,dx=el.attr('data-name')
		// ,scoreTipEl=findScoreTipsById(count)
	;
	if(!!!starMarks[i]){
		return;//星星不可见，返回
	}
	//log();

	$starItems[i].css({'visibility':'hidden'});
	try{
		clearTimeout(starMarks[i]);
	} catch(err){

	}
	starMarks[i]=0;

	scoreTotal+=score;//分数相加
	$resultText.html('Energy:'+scoreTotal);
	// tapNum[dx]+=1;//点击次数加一
	// if(scoreTipEl){
	// 	scoreTipEl.css({'opacity':'0.96'});
	// 	scoreTipEl.text('+'+score);
	// 	scoreTipEl.animate({
	// 		opacity:0,
	// 		translateY:'-50px'
	// 	},500,'ease');
	// }
	// ppDestroy(count);
	sound.pause();
	sound.play();
	//count=null;
	e.stopPropagation();
	return false;
}
$starWrapper.on('touchstart MSPointerDown pointerdown','.starItem',iconTap);


function log(s){
	!!console&&console.log(s);
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