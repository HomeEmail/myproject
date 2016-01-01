
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
	'./images/game-begin.png'
	,'./images/guide.png'
	,'./images/again.png'
	,'./images/share.png'
	,'./images/store-bg.png'
	,'./images/game-star.png'
	,'./images/game-star-on.png'
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

welcomeBox.show();
new LoadingRes({
	resources:resourceAry
	,completed:function(){
		//alert('res loading completed');
		loadingBox.hide();
		$('#welcomeBt').css('display','inline-block');
		$('#processImg').hide();
	}
	,loadingCallback:function(s){
		//console.log(s);//s百分之几
		loadingBox.text('正在为您准备资源...'+s+'%');
	}
});


var 
	$wel=$('#welcome')
	
	,$ruleTitle=$('#ruleTitle')
	,$resultTitle=$('#resultTitle')
	,$ruleText=$('#ruleText')
	,$resultText=$('#resultText')
	,$ruleTextWrapper=$('#ruleTextWrapper')
	
	,$starWrapper=$('#starWrapper')
	,playBoxH=0
	,playBoxW=0
	,playH=0
	,playW=0
	,starH=0
	,starW=0
	,$starItems=[]
	,scores=[500,500,500,500,500,500,500,500,500,500,500,500,500,500,500,500]
	,scoreTotal=0
	,starMarks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]//0表示不可见，其他表示可见
	,timer=null//出现星星控制
	,showItemTime=150//星星出现间隔频率控制
	,starShowTime=1000//星星出现持续时间
	,timerOut=null//时间到了控制
	,timerOver=30//秒
	,beginTime=0
	,endTime=0
	,$timeShow=$('#timeShow')
;
$('#welcomeBt').on('tap',function(e){
	//$welBt.hide();
	$wel.hide();

	$('#playContent').show();
	log($('body').getH());
	log($('#resultWrapper').getH());
	log($('#timeShow').getH());
	var hh=$('body').getH()-$('#resultWrapper').getH()-$('#timeShow').getH()-16;
	$starWrapper.height(hh);

	$starItems=$starWrapper.children();
	for(var i=0,len=$starItems.length;i<len;i++){
		$starItems[i]=$($starItems[i]);
	}
	gameInit();
});
$('#gameAgainBt').on('tap',function(e){
	$('#gameResultWrapper').hide();
	$('#playContent').show();
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
		
		for(var i=0,len=$starItems.length;i<len;i++){
		$starItems[i].css({'visibility':'visible'});
			starMarks[i]=0;
			//fRandomBy(0,7)
		}
		var pm=parseInt(scoreTotal/2000,10);//假数据，上线请注释
		document.title='截至目前，我抢购钢卷排名第'+pm+'名。湛江钢铁第一批钢卷新鲜出炉了，一起土豪抢购吧！';
		$('#gameResultTextValue').html(scoreTotal);

		alert('时间到了，游戏结束！');
		// $.ajax({
		//   type: 'POST',
		//   url: 'test.aspx',
		//   // data to be added to query string:
		//   data: {score:scoreTotal,account : '这里你可能需要填入帐号'},
		//   // type of data we are expecting in return:
		//   dataType: 'json',//(“json”, “jsonp”, “xml”, “html”, or “text”)
		//   success: function(data){
		//   	//成功信息
		//		//document.title='截至目前，我抢购钢卷排名第'+data.paiming+'名。湛江钢铁第一批钢卷新鲜出炉了，一起土豪抢购吧！';
		//		//$('#paimingText').html(data.paiming);//更新排名
		//		//$('#totalPlayNum').html(data.num);//多少人参与
		//   },
		//   error: function(xhr, type){
		//    //失败时
		//   }
		// });
		$('#playContent').hide();
		$('#gameResultWrapper').show();
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
	$resultText.html(scoreTotal);
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

	//sound.pause();
	sound.play();

	//count=null;
	e.stopPropagation();
	return false;
}
$starWrapper.on('touchstart MSPointerDown pointerdown','.starItem',iconTap);


function log(s){
	!!console&&console.log(s);
}

$("#gameShareBt").on("tap", function() {
    $("#shareBox").fadeIn(200)
});
$("#shareBox").on("tap", function(e) {
    e.stopPropagation(), $(this).fadeOut(200)
});











/**
得到高宽，补充插件,修复当display为none是el.width()为0的bug
如计算的元素里有多个子元素，计算会有误，计算时，只能包含第一个子元素的高宽
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