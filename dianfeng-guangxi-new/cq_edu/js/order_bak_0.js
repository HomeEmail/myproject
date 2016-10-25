/*
订购流程 模块


*/

var orderFlow={
	orderTipsDiv : '<div id="orderTipsDiv"><div id="orderTipsDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">订购提示</div><div id="orderTipsDivBody"><div style="position:relative;height: 80px;"><span style="color:#ffffff;font-size:30px;position:absolute;top:28px;left:60px;">HIFI音乐包月套餐</span><span style="color:#999999;font-size:30px;position:absolute;top:28px;left:900px;">标准资费：10元 /月</span></div><div style="line-height: 46px;color:#ffffff;font-size:26px;padding: 0px 60px;padding-bottom: 10px;border-bottom: 1px #222 solid;">HiFi音乐是一款极精致的家庭客厅音乐应用，我们精选艺术价值高、录音效果好的音乐专辑，配合精美封面、详细专辑介绍，为所有音乐爱好者提供超越MP3媲美CD音质的高保真流媒体音乐服务</div><div style="color:#999;font-size:20px;padding-top:20px;padding-left:60px;padding-right:60px;padding-bottom:30px;">温馨提示：该产品订购后一个月有效，次月到期自动续订如需退订，请拨打 96868 详细咨询。</div></div><div id="orderTipsDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:478px;top:20px;">确认订购</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:678px;top:20px;">取消</div><div id="orderTipsDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:478px;top:20px;"></div></div></div>'
	,orderTipsDivContral : {
		focusPos : [478,678]//焦点left值 重庆
		,dataPos : 0//数据索引位置
		,dataLen : 2//数据总长度
		,init : function(){
			this.dataPos=0;
		}
		,up : function(){
		}
		,down : function(){
		}
		,left : function(){
			var newDataPos = this.dataPos-1;
			if(newDataPos<0){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('orderTipsDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,right : function(){
			var newDataPos = this.dataPos+1;
			if(newDataPos>=this.dataLen){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('orderTipsDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,enter : function(){
			if(this.dataPos==0){
				//确认订购
				//调用接口查看是否需要家长锁
				orderFlow.optParentLocker(function(data){						   
					if(data.status==0){
						//if(!!data.result.parentLocker.lockerPass){
						if(data.result.code == 200){	
							//有家长锁
							orderFlow.passwordYes = data.result.lockerPass;
							orderFlow.showStep('passwordDiv');//去家长锁步骤
						}else if(data.result.code == 201){
							//没有家长锁
							//直接调用开通接口
							orderFlow.orderProduct(function(data){
								if(data.status==0){
									//订购成功
									orderFlow.orderSuccessCallBack();
									orderFlow.showStep('successTipsDiv');
								}else{
									//订购失败
									orderFlow.orderFailureCallBack();
									orderFlow.showStep('failureTipsDiv');
								}
							});
						}
					}else{
						alert('数据有误');
					}
				});
				
				return 0;
			}
			if (this.dataPos==1) {
				//取消
				orderFlow.close();
				//orderFlow.showStep('failureTipsDiv');//显示哪一步
				return 0;
			};
		}
	}
	,alipayDiv : '<div id="alipayDiv"><div id="alipayDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">余额不足，马上充值</div><div id="alipayDivBody" style="padding-top:30px;text-align:center;"><img id="alipayQrImg" src="./images/qr.jpg" width="200" height="200" /><div style="padding:5px;font-size: 28px;color: #ffffff;">支付宝扫描充值</div></div><div id="alipayDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:478px;top:20px;">完成充值</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:678px;top:20px;">暂不充值</div><div id="alipayDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:478px;top:20px;"></div></div></div>'
	,alipayDivContral : {
		focusPos : [478,678]//焦点left值 重庆
		,dataPos : 0//数据索引位置
		,dataLen : 2//数据总长度
		,init : function(){
			this.dataPos=0;
		}
		,up : function(){
		}
		,down : function(){
		}
		,left : function(){
			var newDataPos = this.dataPos-1;
			if(newDataPos<0){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('alipayDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,right : function(){
			var newDataPos = this.dataPos+1;
			if(newDataPos>=this.dataLen){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('alipayDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,enter : function(){
			if(this.dataPos==0){
				//充值成功
				alert('充值成功');
				orderFlow.showStep('passwordDiv');//显示哪一步,去家长锁步骤
				return 0;
			}
			if (this.dataPos==1) {
				//取消
				orderFlow.close();
				//orderFlow.showStep('failureTipsDiv');//显示哪一步
				return 0;
			};
		}
	}
	,passwordDiv : '<div id="passwordDiv"><div id="passwordDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">请输入家长锁密码</div><div id="passwordDivBody" style="text-align:center;padding: 30px;position:relative;"><div id="passwordDivNum1" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div><div id="passwordDivNum2" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div><div id="passwordDivNum3" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div><div id="passwordDivNum4" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div><div id="passwordDivNum5" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div><div id="passwordDivNum6" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div></div><div id="passwordDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:478px;top:20px;">订购</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:678px;top:20px;">取消</div><div id="passwordDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:478px;top:20px;"></div></div></div>'
	,passwordYes : '' //你的家长锁密码
	,passwordDivContral : {
		focusPos : [478,678]//焦点left值 重庆
		,dataPos : 0//数据索引位置
		,dataLen : 2//数据总长度
		,password : '' //输入的家长锁
		,init : function(){
			this.dataPos=0;
			this.password='';
		}
		,checkPassword:function(){
			if(!!!this.password) return false;
			if(this.password==orderFlow.passwordYes) return true;
			return false;
		}
		,inputNumber : function(num){
			if(this.password.length>=6) return 0;
			this.password+=''+num;
			var i=this.password.length;
			
			
			document.getElementById('passwordDivNum'+i).innerText='*';
		}
		,up : function(){
		}
		,down : function(){
		}
		,left : function(){
			var newDataPos = this.dataPos-1;
			if(newDataPos<0){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('passwordDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,right : function(){
			var newDataPos = this.dataPos+1;
			if(newDataPos>=this.dataLen){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('passwordDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,enter : function(){
			if(this.dataPos==0){
				//订购
				if(this.checkPassword()){
					//orderFlow.showStep('successTipsDiv');
					orderFlow.orderProduct(function(data){
						if(data.status==0){
							//订购成功
							orderFlow.orderSuccessCallBack();
							orderFlow.showStep('successTipsDiv');
						}else{
							//订购失败
							orderFlow.orderFailureCallBack();
							orderFlow.showStep('failureTipsDiv');
						}
					});
				}else{
					//密码不正确
					alert('密码不正确，请重新输入！');
					orderFlow.showStep('passwordDiv');
				}
				return 0;
			}
			if (this.dataPos==1) {
				//取消
				//orderFlow.close();
				orderFlow.showStep('alipayDiv');//
				return 0;
			};
		}
	}
	,successTipsDiv : '<div id="successTipsDiv"><div id="successTipsDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">订购成功</div><div id="successTipsDivBody"><div style="line-height: 46px;color:#ffffff;font-size:26px;padding: 0px 60px;padding-bottom: 10px;border-bottom: 1px #222 solid;">您已成功订购HIFI音乐包月套餐，5分钟后生效，5分钟内请不要重复订购，成功订购后将从您的帐号扣费，如需咨询或退订，请拨打 96868</div></div><div id="successTipsDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:578px;top:20px;">确认</div><div id="successTipsDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:578px;top:20px;"></div></div></div>'
	,successTipsDivCallBack : function(){}//开通成功关闭弹层回调
	,successTipsDivContral : {
		focusPos : [578]//焦点left值 重庆
		,dataPos : 0//数据索引位置
		,dataLen : 1//数据总长度
		,up : function(){
		}
		,down : function(){
		}
		,left : function(){	
		}
		,right : function(){	
		}
		,enter : function(){
			//alert('successTipsDiv');
			orderFlow.close(orderFlow.successTipsDivCallBack);
		}
	}
	,failureTipsDiv : '<div id="failureTipsDiv"><div id="failureTipsDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">订购失败</div><div id="failureTipsDivBody"><div style="line-height: 46px;color:#ffffff;font-size:26px;padding: 0px 60px;padding-bottom: 10px;border-bottom: 1px #222 solid;">余额不足，订购失败！</div><div style="color:#999;font-size:20px;padding-top:20px;padding-left:60px;padding-right:60px;padding-bottom:30px;">请拨打 96868 详细咨询。</div></div><div id="failureTipsDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:478px;top:20px;">再试一次</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:678px;top:20px;">关闭</div><div id="failureTipsDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:478px;top:20px;"></div></div></div>'
	,failureTipsDivCallBack : function(){}//开通失败关闭弹层回调
	,failureTipsDivContral : {
		focusPos : [478,678]//焦点left值 重庆
		,dataPos : 0//数据索引位置
		,dataLen : 2//数据总长度
		,init : function(){
			this.dataPos=0;
		}
		,up : function(){
		}
		,down : function(){
		}
		,left : function(){
			var newDataPos = this.dataPos-1;
			if(newDataPos<0){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('failureTipsDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,right : function(){
			var newDataPos = this.dataPos+1;
			if(newDataPos>=this.dataLen){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('failureTipsDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,enter : function(){
			if(this.dataPos==0){
				//确认订购
				orderFlow.showStep('orderTipsDiv');//显示哪一步
				return 0;
			}
			if (this.dataPos==1) {
				//关闭
				orderFlow.close(orderFlow.failureTipsDivCallBack);
				return 0;
			};
		}
	}
	,orderSuccessCallBack : function(){}//开通成功回调
	,orderFailureCallBack : function(){}//开通失败回调
	,req : null
	,actionArea : null
	,wrapperDiv : null
	,coverDiv : null
	,preEventFn : null
	,onEventHandle : function(preEventFn){
		this.preEventFn = preEventFn;
		document.onkeydown = this.delegateEvent;
	}
	,offEventHandle : function(){
		document.onkeydown = this.preEventFn;
	}
	,delegateEvent : function(_event){
		var keycode = _event.which;
		var code = Event(_event);
		switch(code){
			case "KEY_UP": //
				!!orderFlow[orderFlow.actionArea+'Contral']&&!!orderFlow[orderFlow.actionArea+'Contral'].up&&orderFlow[orderFlow.actionArea+'Contral'].up();
				return 0;
				break;
			case "KEY_DOWN": //
				!!orderFlow[orderFlow.actionArea+'Contral']&&!!orderFlow[orderFlow.actionArea+'Contral'].down&&orderFlow[orderFlow.actionArea+'Contral'].down();
				return 0;
				break;
			case "KEY_LEFT": //
				!!orderFlow[orderFlow.actionArea+'Contral']&&!!orderFlow[orderFlow.actionArea+'Contral'].left&&orderFlow[orderFlow.actionArea+'Contral'].left();
				return 0;
				break;
			case "KEY_RIGHT": //
				!!orderFlow[orderFlow.actionArea+'Contral']&&!!orderFlow[orderFlow.actionArea+'Contral'].right&&orderFlow[orderFlow.actionArea+'Contral'].right();
				return 0;
				break;
			case "KEY_PAGE_UP": //
				return false;
				break;		
			case "KEY_PAGE_DOWN": //
				return false;
				break;	
			case "KEY_SELECT": //	
				!!orderFlow[orderFlow.actionArea+'Contral']&&!!orderFlow[orderFlow.actionArea+'Contral'].enter&&orderFlow[orderFlow.actionArea+'Contral'].enter();
				return 1;
				break;
			case "KEY_EXIT":
			case "KEY_BACK":
				history.back();
				//window.location.href = "../index.html";
				return false;
				break;
			case "KEY_NUMBER0":
			case "KEY_NUMBER1":
			case "KEY_NUMBER2":
			case "KEY_NUMBER3":
			case "KEY_NUMBER4":
			case "KEY_NUMBER5":
			case "KEY_NUMBER6":
			case "KEY_NUMBER7":
			case "KEY_NUMBER8":
			case "KEY_NUMBER9":
				!!orderFlow[orderFlow.actionArea+'Contral']&&!!orderFlow[orderFlow.actionArea+'Contral'].inputNumber&&orderFlow[orderFlow.actionArea+'Contral'].inputNumber(keycode-48);
				return 0;
				break;
			default:
				break;
		}
	}
	,generateHTML : function(stepName){
		return '<div style="color:#ffffff;position:relative;background-color:#000000;border-top:2px #ff3631 solid;border-bottom:2px #ff3631 solid;padding:10px 0px;">'+this[stepName]+'</div>';
	}
	,init : function(str){
		if(!!!this.coverDiv){
			this.coverDiv=document.createElement('div');
			this.coverDiv.style.position='absolute';
			this.coverDiv.style.left='0px';
			this.coverDiv.style.top='0px';
			this.coverDiv.style.width='100%';
			this.coverDiv.style.height='100%';
			this.coverDiv.style.zIndex='8';
			this.coverDiv.style.backgroundColor='#000000';
			this.coverDiv.style.opacity='0.75';
			this.coverDiv.style.display='none';
			this.coverDiv.style.visibility='hidden';
			this.$append(this.coverDiv);
			this.coverDiv.style.webkitTransitionDuration='300ms';
		}
		if(!!!this.wrapperDiv){
			this.wrapperDiv=document.createElement('div');
			this.wrapperDiv.style.position='absolute';
			this.wrapperDiv.style.left='0px';
			this.wrapperDiv.style.top='160px';
			this.wrapperDiv.style.width='1280px';
			this.wrapperDiv.style.zIndex='9';
			this.wrapperDiv.style.display='none';
			this.wrapperDiv.style.visibility='hidden';
			
			this.$append(this.wrapperDiv);
			this.wrapperDiv.style.webkitTransitionDuration='300ms';
		}
	}
	,show : function(){
		this.coverDiv.style.display='block';
		this.coverDiv.style.visibility='visible';

		this.wrapperDiv.style.display='block';
		this.wrapperDiv.style.visibility='visible';
	}
	,hide : function(){
		this.coverDiv.style.display='none';
		this.coverDiv.style.visibility='hidden';

		this.wrapperDiv.style.display='none';
		this.wrapperDiv.style.visibility='hidden';
	}
	,close : function(fn){//关闭弹层，还原事件接管
		this.hide();
		this.offEventHandle();
		!!fn&&fn();
	}
	,showStep : function(stepName){
		this.actionArea = stepName;
		!!this[stepName+'Contral']&&!!this[stepName+'Contral'].init&&this[stepName+'Contral'].init();//此步骤的操作控制初始化
		this.wrapperDiv.innerHTML=this.generateHTML(stepName);
	}
	,getUserInfo : function(fn){
		this.req=ajax({
			url: hostUrl+'/utvgoWeb/hifi/hifiUser/getUserInfo.action?keyNo='+ keyNo,
			type: "GET", //HTTP 请求类型,GET或POST
			dataType: "html", //请求的文件类型html/xml
			onSuccess: function(html){ //请求成功后执行[可选]
				var json = eval("(" + html + ")");
				!!fn&&fn(json);
			},
			onError:function(){ //请求失败后执行[可选]
				alert("数据出错");
			},
			onComplete:function(){
				orderFlow.req=null;
			},
	        post:"",  
	        timeout:10000  
		});
	}
	,orderProduct : function(fn){
		this.req=ajax({
			url: hostUrl+'/utvgoWeb/hifi/hifiUser/orderProduct.action?keyNo='+ keyNo +'&offer=11&products=12112121',//参数offer，products需要重庆广电提供
			type: "GET", //HTTP 请求类型,GET或POST
			dataType: "html", //请求的文件类型html/xml
			onSuccess: function(html){ //请求成功后执行[可选]
				var json = eval("(" + html + ")");
				!!fn&&fn(json);
			},
			onError:function(){ //请求失败后执行[可选]
				alert("数据出错");
			},
			onComplete:function(){
				orderFlow.req=null;
			},
	        post:"",  
	        timeout:10000  
		});
	}
	,optParentLocker : function(fn){
		this.req=ajax({
			url: hostUrl+'/utvgoWeb/hifi/hifiUser/optParentLocker.action?keyNo='+ keyNo +'&dealType=1',
			type: "GET", //HTTP 请求类型,GET或POST
			dataType: "html", //请求的文件类型html/xml
			onSuccess: function(html){ //请求成功后执行[可选]
				var json = eval("(" + html + ")");
				!!fn&&fn(json);
			},
			onError:function(){ //请求失败后执行[可选]
				alert("数据出错");
			},
			onComplete:function(){
				orderFlow.req=null;
			},
	        post:"",  
	        timeout:10000  
		});
	}
	,$ : function(id){
		return document.getElementById(id);
	}
	,$append : function(n,node){
		if(!!!node){
			node=document.body;
		}
		node.appendChild(n);
	}

};