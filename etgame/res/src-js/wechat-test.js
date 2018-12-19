
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
            	"appid":'wxfcedb1cb6a8722c3',
                "img_url": "http://www.tailg.com.cn/kz/yx/icon.png",
                "img_width": "120",
                "img_height": "120",
                "link": window.shareData.sendFriendLink,
                "desc": window.shareData.fContent,
                "title": window.shareData.fTitle
            }, function (res) {
                //_report('send_msg', res.err_msg);
            })
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
            	"appid":'wxfcedb1cb6a8722c3',
                "img_url": "http://www.tailg.com.cn/kz/yx/icon.png",
                "img_width": "120",
                "img_height": "120",
                "link": window.shareData.timeLineLink,
                "desc": window.shareData.tContent,
                "title": window.shareData.tTitle
            }, function (res) {
                //_report('timeline', res.err_msg);
            });
        });
 
    }, false)

	function weixinAddContact(name){
		WeixinJSBridge.invoke("addContact", {webtype: "1",username: name}, function(e) {
			//alert(e.err_msg);
			//WeixinJSBridge.log(e.err_msg);
			//e.err_msg:add_contact:added 已经添加
			//e.err_msg:add_contact:cancel 取消添加
			//e.err_msg:add_contact:ok 添加成功
			if(e.err_msg == 'add_contact:added' || e.err_msg == 'add_contact:ok'){
			    //关注成功，或者已经关注过
			}
		});
		//alert('aa');
	}
	function viewProfile(){    
		//添加关注，其实这段代码生效，是有限制性条件的：iOS环境、仅在 mp.weixin.qq.com 域下生效！
	    if (typeof WeixinJSBridge != "undefined" && WeixinJSBridge.invoke){    
	        WeixinJSBridge.invoke('profile',{    
	            'username':'gh_928a19d46036',    /* 你的公众号原始ID */
	            'scene':'57'    
	        },function(resp){
	            alert(resp.err_msg);    /* 在这里，我们把err_msg输出 */
	        });    
	    }    
	}