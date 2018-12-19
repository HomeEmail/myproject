var resourceAry=[
	'../res/images/begin.png'
	,'../res/images/begin-on.png'
	,'../res/images/icon-gou.png'
	,'../res/images/icon-xin.png'
	,'../res/images/icon-ufo.png'
	,'../res/images/icon-ren.png'
	,'../res/images/paopao-bg.png'
	,'../res/images/again-bt.png'
	,'../res/images/share-bt-on.png'
	,'../res/images/share-bt.png'
	,'../res/images/sharebt1-on.png'
	,'../res/images/sharebt1.png'
	,'../res/images/time-text.png'
	,'../res/images/score-bt-bg.png'
	,'../res/images/bg.jpg'
	,'../res/images/welcome-bg.png'
	,'../res/images/playtips.png'
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



var winW=$(window).width()
	,winH=$(window).height()
	,sizeBig=Math.floor(winW*0.3333)
	,sizeSmall=Math.ceil(sizeBig*0.8)
	,marginTop=Math.ceil((winH-(sizeBig*3))/3)
	,posPPAry=[
		[0*sizeBig,0*sizeBig+marginTop]
		,[1*sizeBig,0*sizeBig+marginTop]
		,[2*sizeBig,0*sizeBig+marginTop]
		,[0*sizeBig,1*sizeBig+marginTop]
		,[1*sizeBig,1*sizeBig+marginTop]
		,[2*sizeBig,1*sizeBig+marginTop]
		,[0*sizeBig,2*sizeBig+marginTop]
		,[1*sizeBig,2*sizeBig+marginTop]
		,[2*sizeBig,2*sizeBig+marginTop]
	]//九宫格方式避免泡泡重叠[x,y]//九个基础位置
	,posPPHas=[0,0,0,0,0,0,0,0,0]//9个标志位，0代表此位置没泡泡
	,scoreTipsAry=[]
	,posRecord={}//{'33':[x1,x2,y1,y2]}//记录位置方式避免泡泡重叠
	,sizeWH=0
	,gameBox=$('#gameBox')
	,scoreTips=$('#scoreTips')
	,x=0
	,y=0
	,xMin=0
	,xMax=winW
	,yMin=0
	,yMax=0
	,icon='ufo'
	,iconAry=['ufo','ren','xin','gou']//人物名
	,scoreIcon={ufo:150,ren:120,xin:200,gou:60}//人物值分
	,tapNum={ufo:0,ren:0,xin:0,gou:0}//点击人物次数
	,html=''
	,timer=null
	,timePP={}
	,itemPP={}
	,count=0
	,itemTime=800//几秒后消失
	,showItemTime=100//隔几秒出现
	,showPerItemNum=1//每次最多出现几个(随机出现个数)
	,scoreTotal=0//得分
	,progressBar=$('.progress-on')
	,sound= new Audio() || document.getElementById('sound')
	;

//sound.src='../res/images/diu.wav';
sound.src='../res/images/ok.mp3';

/**生成指定范围的随机整数*/
function fRandomBy(under, over){ 
	switch(arguments.length){ 
		case 1: return parseInt(Math.random()*under+1); 
		case 2: return parseInt(Math.random()*(over-under+1) + under); 
		default: return 0; 
	} 
} 
//九宫格布局测试
function grid9LayoutTest(){
	for (var i = posPPAry.length - 1; i >= 0; i--) {
		var s='<div class="pp-item pp-ufo" style="width:'+sizeBig+'px;height: '+sizeBig+'px;left:'+posPPAry[i][0]+'px;top: '+posPPAry[i][1]+'px;"></div>';
		
		gameBox.append(s);
	};
}
//init scoreTipsAry
function scoreTipsCreate(){
	for (var i =0 ,len= posPPAry.length ; i<len; i++) {
		
		var s='<span id="scoreTips'+i+'" style="left:'+Math.ceil(posPPAry[i][0]+(sizeBig/4))+'px;top: '+Math.ceil(posPPAry[i][1]+(sizeBig/4))+'px;" class="scoreTips"></span>';
		s=$(s);
		scoreTipsAry.push(s);
		gameBox.append(s);
	};
}
scoreTipsCreate();

/**根据id找到提示的el*/
function findScoreTipsById(id){
	var ii=-1;
	for(var i=0,len=posPPHas.length; i<len; i++){
		if(posPPHas[i]==id){
			ii=i;
			return scoreTipsAry[i];
		}
	}
	return false;
}
//九宫格标志为可用
function changePosPPToEmpty(id){
	for(var i=0,len=posPPHas.length; i<len; i++){
		if(posPPHas[i]==id){
			posPPHas[i]=0;
			return;
		}
	}
}
//九宫格检查那个可用
function checkPosPPIsOK(){
	var ii=[];
	for(var i=0,len=posPPHas.length; i<len; i++){
		if(posPPHas[i]==0){
			ii.push(i);
		}
	}
	if(ii.length>6){//界面控制最多出现3个
		return ii[fRandomBy(0,ii.length-1)];
	}
	return -1;
}
//获得九宫格可用位置
function getGrid9Pos(){
	var i=checkPosPPIsOK();
	if(i!=-1){
		return {x:posPPAry[i][0],y:posPPAry[i][1],i:i};
	} else {
		return false;
	}
}
//检查位置是否被占用
function checkPosIsOK(x,y){
	var key
		,result=true
	;
	for(key in posRecord){
		if((posRecord[key][0]<=x&&x<posRecord[key][1]) && (posRecord[key][2]<=y && y<posRecord[key][3])){
			//被占用了
			result=false;
			break;
		} 
	}
	return result;
}

function creatPP(){
	//随机大小
	if(fRandomBy(1,2)==2){
		//大
		sizeWH=sizeBig;
		//xMax=winW-sizeBig;
		//yMax=winH-sizeBig*3;
	} else {
		//小
		sizeWH=sizeSmall;
		//xMax=winW-sizeSmall;
		//yMax=winH-sizeSmall*3;
	}
	//随机位置
	//x=fRandomBy(xMin,xMax);
	//y=fRandomBy(yMin,yMax);
	var pos=getGrid9Pos();
	if(!!pos){
		x=pos.x;
		y=pos.y;

		//随机人物
		icon=iconAry[fRandomBy(0,3)];
		count++;
		posPPHas[pos.i]=count;

		html='<div data-id="'+count+'" data-name="'+icon+'" data-score="'+scoreIcon[icon]+'" class="pp-item pp-'+icon+'" style="width:'+sizeWH+'px;height: '+sizeWH+'px;left:'+x+'px;top: '+y+'px;opacity:0;"></div>';
		
		//var tempDom=document.createElement('div')
		itemPP[count]=$(html);
		gameBox.append(itemPP[count]);
		itemPP[count].fadeIn(180);
		timePP[count]=setTimeout(function(count){
			return function(){
				ppDestroy(count);
				count=null;
			};
		}(count),itemTime);
	} else {
		//creatPP();
		return false;
	}

	

}


// for(var i=0; i<18; i++){
// 	creatPP();
// }
function timeHandler(){
	if(!!timer){
		clearTimeout(timer);
		timer=null;
	}
	for(var i=0,len=fRandomBy(1,showPerItemNum);i<len;i++){
		creatPP();
	}
	timer=setTimeout(timeHandler,showItemTime);
}


function ppDestroy(count){
	if(!!!itemPP[count]) return;
	itemPP[count].fadeOut(100,function(){
		//console.log(this);
		$(this).remove();
		changePosPPToEmpty(count);
		itemPP[count]=null;
		clearTimeout(timePP[count]);
		timePP[count]=null;
		delete timePP[count];
		delete itemPP[count];
		count=null;
	});
}

function iconTap(e){
	//console.log(e);
	
	var el=$(this)
		,count=el.attr('data-id')
		,score=el.attr('data-score')
		,dx=el.attr('data-name')
		,scoreTipEl=findScoreTipsById(count)
	;
	

	scoreTotal+=parseInt(score,10);//分数相加
	tapNum[dx]+=1;//点击次数加一
	if(scoreTipEl){
		scoreTipEl.css({'opacity':'0.96'});
		scoreTipEl.text('+'+score);
		scoreTipEl.animate({
			opacity:0,
			translateY:'-50px'
		},500,'ease');
	}
	ppDestroy(count);
	sound.pause();
	sound.play();
	count=null;
	e.stopPropagation();
	return false;
}
gameBox.on('touchstart MSPointerDown pointerdown','.pp-item',iconTap);
//gameBox.on('tap','.pp-item',iconTap);

/**实现与pc端同样的el:active效果只需要额外添加下面一行代码即可**/
document.body.addEventListener('touchstart', function (e) { }); 
document.body.addEventListener('touchmove', function (e) { 
	e.preventDefault();
});

var time30=null
	,proMaxW=230
	,proMinW=40
	,maxTime=30000//30秒
;
function time30Init(){

	proMaxW=230;
	proMinW=40;
	maxTime=30000;
	$('#paihangBt').hide();
}
function time30Cont(){
	proMaxW-=2;//190/2=95
	if(proMaxW<=proMinW){
		clearTimeout(time30);
		time30=null;
		timeoutHandler();
		return;
	}
	if(!!time30){
		clearTimeout(time30);
		time30=null;
	}
	progressBar.css({'width':proMaxW+'px'});
	time30=setTimeout(time30Cont,210);
}
function timeoutHandler(){
	if(!!timer){
		clearTimeout(timer);
		timer=null;
	}

	$('#gameBox').fadeOut(300);
	$('#scoreBox').fadeIn(600);
	$('.score-bt-bg').text('总分：'+scoreTotal);
	var key;
	for(key in tapNum){
		$('#'+key+'ScoreCal').text(scoreIcon[key]+'*'+tapNum[key]);
		$('#'+key+'Score').text(scoreIcon[key]*tapNum[key]);
	}
	$('#paihangBt').show();

	$('title').text('我解救疯狂外星人得了'+scoreTotal+'分！全国排名第'+fRandomBy(20,50)+'位！挑战者每周都有机会获得大奖！');
	changeShareData('我解救疯狂外星人得了'+scoreTotal+'分！全国排名第'+fRandomBy(20,50)+'位！挑战者每周都有机会获得大奖！');

	uploadScore(scoreTotal);
	//alert('时间到，你获得了'+scoreTotal+'分!');
}
//上传本次得分
function uploadScore(scoreTotal){
	//http://www.tailg.com.cn/kz/member/yxJson!insertScore.action?scorc=60 
	var url='http://www.gz-3c.com/kz/member/yxJson!insertScore.action?score='+scoreTotal;//请更改url
	$.getJSON(url,function(data){
		var paiming=193;
		if(data.msg!='系统异常'){
			paiming=data.msg;
		}

		$('title').text('我解救疯狂外星人得了'+scoreTotal+'分！全国排名第'+paiming+'位！挑战者每周都有机会获得大奖！');
		changeShareData('我解救疯狂外星人得了'+scoreTotal+'分！全国排名第'+paiming+'位！挑战者每周都有机会获得大奖！');

	});
}
function gameStart(){
	$('#paihangBt').hide();
	$('#playtips').fadeOut(100);
	$('#gameBox').fadeIn(200,function(){
		timeHandler();
		time30Cont();
	});
}
$('#welcomeBt').on('tap',function(e){
	$('#welcome').fadeOut(300);
	$('#playtips').fadeIn(500);
});
$('#playtipsBt').on('tap',function(e){
	gameStart();
});
$('.again-bt').on('tap',function(e){
	$('#scoreBox').fadeOut(100);
	scoreTotal=0;
	tapNum={ufo:0,ren:0,xin:0,gou:0};
	time30Init();
	$('#gameBox').fadeIn(200,function(){
		timeHandler();
		time30Cont();
	});
});
$('.share-bt').on('tap',function(e){
	$('#shareBox').fadeIn(200);
});
$('#shareBox').on('tap',function(e){
	e.stopPropagation();
	$(this).fadeOut(200);
});
// $('#paihangBt').on('tap',function(e){
// 	e.stopPropagation();
// 	gotoGZH();
// 	// $('body>div').hide();
// 	// $('#paihangBox').show();
// 	// getPaihangData();
// });
$('#letsgoBt').on('tap',function(e){
	$('#paihangBox').hide();
	scoreTotal=0;
	tapNum={ufo:0,ren:0,xin:0,gou:0};
	time30Init();
	$('#gameBox').fadeIn(200,function(){
		timeHandler();
		time30Cont();
	});
});
$('#paihangShare').on('tap',function(e){
	$('#shareBox').fadeIn(200);
});

/**生成假的排行数据-json格式**/
function createPaihangData(){
	var letterAry=['anna','lly','ccet','dlot','iadf','jed','达特','敏','芬','惮','方','风'];
	var dataPaihang=[];
	for(var i=0;i<10; i++){
		//dataPaihang.push({order:i+1,wxname:'**'+letterAry[fRandomBy(0,11)],score:fRandomBy(10000*(10-i),20000/(i+1)*(10-i))});
		dataPaihang.push({order:i+1,wxname:' ',score:fRandomBy(10000*(10-i),20000/(i+1)*(10-i))});
	}
	return dataPaihang;
}
function getPaihangData(){
	//test 假的排行数据
	//paihangDataRender(createPaihangData());
	//真实数据请用如下注释的代码,格式查看/paihang.json
	var url='http://www.tailg.com.cn/kz/member/yxJson!findPage.action';//请更改url
	$.getJSON(url,function(data){
		paihangDataRender(data);
	});
}
function paihangDataRender(data){
		var html=''
			,data=data
			,datas=data.datas.replace(/'/gi,'').split(',')
			,len=datas.length>10? 10:datas.length
			,dataItem={}
		;

		for(var i=0;i<len;i++){
			dataItem.order=i+1;
			dataItem.wxname='';
			dataItem.score=datas[i];
			html+='<div class="paihang-item"><span class="paihang-td">'+dataItem.order+'</span><span class="paihang-td">'+dataItem.wxname+'</span><span class="paihang-td">'+dataItem.score+'</span></div>'
		}
		$('#paihangContent').html(html);
}
function gotoGZH(s){
	//alert('aaq');
	var sid='gh_928a19d46036';//gh_5c11a6d0db1b//公众号原始id
	if(!!s){
		sid=s;
	}
	//location.href="http://weixin.qq.com/r/X0wCGorEqtfVrc559xlN";
	//location.href='http://www.baidu.com';
	if(isAndroid()||isWinPhone()){
		//比较麻烦,建议链接到公众号里的一篇文章
		location.href='weixin://profile/'+sid;
	} else {
		location.href='http://mp.weixin.qq.com/s?__biz=MzA4MDQ5MzkyMA==&mid=204827785&idx=1&sn=b5a108557f82b70a624c9e23f4a06c5c#rd';
	}
	//location.href='weixin://profile/'+sid;
	//location.href="weixin://contacts/profile/"+sid;
	//location.href="http://www.weixin//profile/"+sid;

}
function isIphone(){
	return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);//iphone
    
	//return /(Android)/i.test(navigator.userAgent);//android
}
function isAndroid(){
	//return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);//iphone
    
	return /(Android)/i.test(navigator.userAgent);//android
}
function isWinPhone (argument) {
	return /(Windows Phone)/i.test(navigator.userAgent);//windows phone
}

