
var pageMap={};

pageMap.imgitem={
	'mainpage':{
		'src':'images/01-Splash-screen1.png',
		'backurl':'mainpage',
		'coords':{
			'0,80,480,1920':{
				'gourl':'loginnow'
			}
		}
	},
	'loginnow':{
		'src':'images/02-LogInNow.png',
		'backurl':'mainpage',
		'coords':{
			'0,80,480,1920':{
				'gourl':'scanmain'
			}
		}
	},
	'scanmain':{
		'src':'images/03-Main.png',
		'backurl':'mainpage',
		'coords':{
			'371,4,479,69':{
				'gourl':'scansetting'
			},
			'14,163,461,593':{
				'gourl':'scanit'
			},
			'15,648,460,803':{
				'gourl':'scanSuccess'
			}
		}
	},
	'scanit':{
		'src':'images/04-Scan.png',
		'backurl':'mainpage',
		'coords':{
			'0,0,111,70':{
				'gourl':'goback'
			},
			'123,344,355,552':{
				'gourl':'scanFail'
			},
			'46,589,414,703':{
				'gourl':'scanSuccess'
			}
		}
	},
	'scanFail':{
		'src':'images/06-Invalide-code.png',
		'backurl':'mainpage',
		'coords':{
			'0,80,480,1920':{
				'gourl':'scanit'
			}
		}
	},
	'scanSuccess':{
		'src':'images/05-Barcode.png',
		'backurl':'mainpage',
		'coords':{
			'0,80,480,1920':{
				'gourl':'scanmain'
			}
		}
	},
	'scansetting':{
		'src':'images/07-Settings.png',
		'backurl':'mainpage',
		'coords':{
			'0,0,111,70':{
				'gourl':'goback'
			},
			'0,80,480,1920':{
				'gourl':'scanRecords'
			}
		}
	},
	'scanRecords':{
		'src':'images/08-Redeem-Records.png',
		'backurl':'mainpage',
		'coords':{
			'0,0,111,70':{
				'gourl':'goback'
			},
			'0,80,480,1920':{
				'gourl':'scanmain'
			}
		}
	}
};

pageMap.findHashItem=function(hashstring){
	if(!!pageMap.imgitem[hashstring]){
		return pageMap.imgitem[hashstring];
	}
	if(hashstring==''){
		return pageMap.imgitem['mainpage'];
	}
	return false;
};
pageMap.findCoords=function(hashstring,x,y){
	var hashItem='';
	if(typeof hashstring == 'string'){
		hashItem=pageMap.findHashItem(hashstring);
	} else {
		hashItem=hashstring;
	}
	var cds=[];
	for(var k in hashItem.coords){
		cds=k.split(',');
		if((x<cds[2] && x>cds[0]) && (y<cds[3] && y>cds[1])){
			return hashItem.coords[k];
		}
	}
	return false;
}




function preventBrowserTouchmove(e){
	e.stopPropagation(); e.preventDefault();
}

var PreventBrowserTouchmove=function(){
	document.addEventListener('touchmove',preventBrowserTouchmove,false);
}
var RemoveBrowserTouchmove=function(){
	document.removeEventListener('touchmove',preventBrowserTouchmove,false);
}


/*取得滾動條位置信息*/
function getScrollPro(){
    var t, l, w, h;
     
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return { t: t, l: l, w: w, h: h };
}
function setScrollTop(v){
	if (document.documentElement && document.documentElement.scrollTop) {
       document.documentElement.scrollTop=v;
    } else if (document.body) {
       document.body.scrollTop=v;
    }
    return;
}

/**
delegate event to container_wrapper dom base on Hammer
if has baseEle param,please note must use HammerDelegateOff when remove dom
demo:
function handle(ev){
	if(ev.target.id=='abc'){
		//do something
	}
}
**/
function HammerDelegateOn(type,handle,baseEle){
	var baseEle=!!baseEle ? baseEle : 'container_wrapper';
	Hammer(document.getElementById(baseEle)).on(type, handle);
}
function HammerDelegateOff(type,handle,baseEle){
	var baseEle=!!baseEle ? baseEle : 'container_wrapper';
	Hammer(document.getElementById(baseEle)).off(type, handle);
}


/***
delegate event to container_wrapper dom base on Native
if has baseEle param,please note must use HammerDelegateOff when remove dom
function handle(ev){
	if(ev.target.id=='abc'){
		//do something
	}
}
**/
function NativeDelegateOn(type,handle,baseEle){
	var baseEle=!!baseEle ? baseEle : 'container_wrapper';
	document.getElementById(baseEle).addEventListener(type,handle,false);
}
function NativeDelegateOff(type,handle,baseEle){
	var baseEle=!!baseEle ? baseEle : 'container_wrapper';
	document.getElementById(baseEle).removeEventListener(type,handle,false);
}




function goTop(acceleration, time) {
	acceleration = acceleration || 0.1;
	time = time || 16;
 
	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	var x3 = 0;
	var y3 = 0;
 
	if (document.documentElement) {
		x1 = document.documentElement.scrollLeft || 0;
		y1 = document.documentElement.scrollTop || 0;
	}
	if (document.body) {
		x2 = document.body.scrollLeft || 0;
		y2 = document.body.scrollTop || 0;
	}
	var x3 = window.scrollX || 0;
	var y3 = window.scrollY || 0;
 
	// 滚动条到页面顶部的水平距离
	var x = Math.max(x1, Math.max(x2, x3));
	// 滚动条到页面顶部的垂直距离
	var y = Math.max(y1, Math.max(y2, y3));
 
	// 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
	var speed = 1 + acceleration;
	window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
 
	// 如果距离不为零, 继续调用迭代本函数
	if(x > 0 || y > 0) {
		var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
		window.setTimeout(invokeFunction, time);
	}
}



/****
trigger given event on element
demo: triggerEvent(document.getElementById('google'),'resize');
note: element not support window object
***/
function triggerEvent(ele,eventType){
	if( document.createEvent) { 
		try{
			var event = document.createEvent ("HTMLEvents"); 
			event.initEvent(eventType, true, true); 
			ele.dispatchEvent(event); 
		} catch(err){}
	} else if(document.createEventObject){ 
		ele.fireEvent("on"+eventType); 
	} 
}
function log(s){
	console.log(s);
}



var aryImg=[],iCurImg=0;
function loadingImg(){
	var img='';
	for(var k in pageMap.imgitem){
		if(!!pageMap.imgitem[k]['src']){
			aryImg.push(pageMap.imgitem[k]['src']);
			
		}
	}
	loadingImgAction(aryImg);
}
function loadingImgAction(ary){
	var imglength=ary.length,img;
	if(iCurImg>=imglength){
		$('loadingTips').hide();
		//replaceImg();
		return false;
	} else {
		img=new Image();
		img.onload=function(){
			log('img loaded: '+aryImg[iCurImg]);
			img=null;
			iCurImg++;
			$('loadingTips').innerHTML='Loading... '+parseInt((iCurImg/imglength)*100,10)+'%'
			loadingImgAction(aryImg);
		}
		img.src=aryImg[iCurImg];
		//log(img.src);
	}
}
function GoURL(hashstring){
	if(hashstring=='goback'){
		history.back();
		return;
	}
	location.hash=hashstring;
}

HammerDelegateOn('mousedown',function(ev){
	log(ev.offsetX);
	log(ev.offsetY);
	//var imgsrc=$('content_main').src;
	//log(imgsrc);
	var hashstring=location.hash.replace('#','');
	log(hashstring);
	var clickObj=pageMap.findCoords(hashstring,ev.offsetX,ev.offsetY);
	if(!!clickObj){
		log('you');
		log(clickObj.gourl);
		GoURL(clickObj.gourl);
	} else {
		log('meiyou');
	}

},'container_main');


window.onload=function(){
	loadingImg();
	log('window.onload:'+location.hash);
	if(location.hash=='#mainpage'){
		location.hash='';
	} else {
		location.hash='mainpage';
	}
}
window.onscroll=function(){
	log(getScrollPro());
}


window.addEventListener('hashchange', HandleHashChange, false); 

function HandleHashChange(e){
	var newURL=e.newURL;
	var oldURL=e.oldURL;
	log(newURL);
	if(newURL.indexOf('#')>-1){
		var hashstring=newURL.substr(newURL.indexOf('#'));
	} else {
		var hashstring='';
	}
	log(hashstring);
	hashstring=hashstring.replace('#','');
	replaceImg(hashstring);
}

function replaceImg(hashstring){
	var imgsrc='';
	if(!!!hashstring){
		imgsrc=pageMap.imgitem['mainpage'].src;
	} else {
		imgsrc=pageMap.imgitem[hashstring].src;
	}
	$('content_main').onload=function(){
		setScrollTop(0);
	};
	$('content_main').src=imgsrc;
	
}
