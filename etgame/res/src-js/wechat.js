/**
 * 微信网页端调用JS
 * @author dodge
 * @contact dodgepudding@gmail.com
 * @link http://blog.4wer.com/wechat-timeline-share
 * @version 1.1
 * 
 * 自定义分享使用：
 * WeixinJS.hideOptionMenu() 隐藏右上角按钮
 * WeixinJS.hideToolbar() 隐藏工具栏
 * 自定义分享内容数据格式：
 * var dataForWeixin={
	   appId:"",
	   MsgImg:"消息图片路径",
	   TLImg:"时间线图路径",
	   url:"分享url路径",
	   title:"标题",
	   desc:"描述",
	   fakeid:"",
	   prepare:function(argv){
	   },
	   callback:function(res){
	   	//发送给好友
	   	if (res.err_msg=='send_app_msg:confirm') {
	   		//todo:func1();
	   		alert(res.err_desc);
	   	}
	   	if (res.err_msg=='send_app_msg:cancel') {
	   		//todo:func2();
	   		alert(res.err_desc);
	   	}
	   	//分享到朋友圈
	   	if (res.err_msg=='share_timeline:confirm') {
	   		//todo:func1();
	   		alert(res.err_desc);
	   	}
	   	if (res.err_msg=='share_timeline:cancel') {
	   		//todo:func1();
	   		alert(res.err_desc);
	   	}
	   	//
	   }
	};


var dataForWeixin={
	   appId:"",
	   MsgImg:"http://mp.weixin.qq.com/wiki/skins/common/images/weixin_wiki_logo.png",
	   TLImg:"http://mp.weixin.qq.com/wiki/skins/common/images/weixin_wiki_logo.png",
	   url:"http://wecode.4wer.com/test/weshare.html?t=1111",
	   title:"标题",
	   desc:"描述",
	   fakeid:"",
	   prepare:function(e){
		   var log = '';
			for (var i in e) {
				log+= i+':'+e[i]+';';
			}
			alert(log);
	   },
	   callback:function(e){
		   var log = '';
			for (var i in e) {
				log+= i+':'+e[i]+';';
			}
			alert(log);
	   }
	};
WeixinJS.hideToolbar();
//获得网络模式
WeixinJS.getNetworkType(
	function(e){
		//WeixinJSBridge.log(e);
		alert(e);
});
//检查是否是微信浏览器
alert(WeixinJS.isWeixin());

 */

WeixinJS = typeof WeixinJS!='undefined' || {};
WeixinJS.hideOptionMenu = function() {
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		if (typeof WeixinJSBridge!='undefined')	WeixinJSBridge.call('hideOptionMenu');
	});
};
WeixinJS.hideToolbar = function() {
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		if (typeof WeixinJSBridge!='undefined') WeixinJSBridge.call('hideToolbar');
	});
};
WeixinJS.getNetworkType = function(callback) {
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		if (typeof WeixinJSBridge!='undefined') WeixinJSBridge.invoke('getNetworkType',{},
		function(res){
			//result: network_type:wifi,network_type:edge,network_type:fail,network_type:wwan
			callback(res.err_msg);
	    });
	});
};
//检查是否是微信浏览器
WeixinJS.isWeixin=function(){
	if(!!!WeixinJSBridge){
		return false;
	} else {
		return true;
	}
}

WeixinJS.closeWindow = function() {
	if (typeof WeixinJSBridge!='undefined') WeixinJSBridge.invoke("closeWindow", {});
};
WeixinJS.payCallback = function(appId,package,timeStamp,nonceStr,signType,paySign,callback){
	if (typeof WeixinJSBridge!='undefined')
	WeixinJSBridge.invoke('getBrandWCPayRequest',{
        "appId" : appId.toString(),
        "timeStamp" : timeStamp.toString(),
        "nonceStr" : nonceStr.toString(),
        "package" : package.toString(),
        "signType" : signType.toString(),
        "paySign" : paySign.toString()
        
    },function(res){
    	// res.err_msg == "get_brand_wcpay_request:ok" return true;
    	// res.err_msg == "get_brand_wcpay_request:cancel" return false;
    	callback(res);
    });
};
WeixinJS.editAddress = function(appId,addrSign,timeStamp,nonceStr,callback){
	var postdata = {
			"appId" : appId.toString(),
            "scope" : "jsapi_address",
            "signType" : "sha1",
            "addrSign" : addrSign.toString(),
            "timeStamp" : timeStamp.toString(),
            "nonceStr" : nonceStr.toString()
	};
	if (typeof WeixinJSBridge!='undefined')
	WeixinJSBridge.invoke('editAddress',postdata, function(res){
	//return res.proviceFirstStageName,res.addressCitySecondStageName,res.addressCountiesThirdStageName,res.addressDetailInfo,res.userName,res.addressPostalCode,res.telNumber
	//error return res.err_msg
	callback(res);
	});
};

(function(){
   var onBridgeReady=function(){
   WeixinJSBridge.on('menu:share:appmessage', function(argv){
	  (dataForWeixin.prepare)(argv);
      WeixinJSBridge.invoke('sendAppMessage',{
         "appid":dataForWeixin.appId,
         "img_url":dataForWeixin.MsgImg,
         "img_width":"120",
         "img_height":"120",
         "link":dataForWeixin.url,
         "desc":dataForWeixin.desc,
         "title":dataForWeixin.title
      }, function(res){(dataForWeixin.callback)(res);});
   });
   WeixinJSBridge.on('menu:share:timeline', function(argv){
	  (dataForWeixin.prepare)(argv);
      WeixinJSBridge.invoke('shareTimeline',{
         "img_url":dataForWeixin.TLImg,
         "img_width":"120",
         "img_height":"120",
         "link":dataForWeixin.url,
         "desc":dataForWeixin.desc,
         "title":dataForWeixin.title
      }, function(res){(dataForWeixin.callback)(res);});
   });
   WeixinJSBridge.on('menu:share:weibo', function(argv){
	  (dataForWeixin.prepare)(argv);
      WeixinJSBridge.invoke('shareWeibo',{
         "content":dataForWeixin.title,
         "url":dataForWeixin.url
      }, function(res){(dataForWeixin.callback)(res);});
   });
   WeixinJSBridge.on('menu:share:facebook', function(argv){
	  (dataForWeixin.prepare)(argv);
      WeixinJSBridge.invoke('shareFB',{
         "img_url":dataForWeixin.TLImg,
         "img_width":"120",
         "img_height":"120",
         "link":dataForWeixin.url,
         "desc":dataForWeixin.desc,
         "title":dataForWeixin.title
      }, function(res){(dataForWeixin.callback)(res);});
   });
};
if(document.addEventListener){
   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
}else if(document.attachEvent){
   document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
   document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
}
})();