/*
订购流程 模块


*/
//订购弹窗用到的图片都要使用绝对地址，需要用到的图片的基本路径地址，不同电脑 ，不同环境，请对应的更改下; 设置这个是避免在专题活动应用开通流程时因图片相对路径不对而看不到图片这种情况
var orderFlowImgBasePath = hostUrl +'/HiFi_cq';

var orderFlow={
	req : null //ajax 请求对象
	,orderTipsDiv : '<div id="orderTipsDiv"><div id="orderTipsDivHeader" style="text-align:center;height:60px;line-height:60px;font-size:28px;border-bottom:1px #202020 solid;">开通HIFI音乐包月套餐成为会员</div><div style="position:absolute;font-size: 20px;left: 928px;background-color: #ee5013;color: #ffffff;padding: 10px 20px;border-radius: 18px;top: 14px;width: 240px;text-align:center;">我的余额: <span id="orderTipsDivMyMoney">0</span> 元</div><div id="orderTipsDivBody"><div style="position:relative;height: 60px;line-height:60px;text-align:center;"><span style="color:#ee5013;font-size:26px;">标准资费：10元/月</span><del style="color:#aaaaaa;font-size:16px;">（原价：19元/月）</del></div><div style="line-height: 40px;color:#ffffff;font-size:26px;padding: 0px 160px;padding-bottom: 10px;border-bottom: 1px #222 solid;">HiFi音乐是一款极精致的家庭客厅音乐应用，我们精选艺术价值高、录音效果好的音乐专辑，配合精美封面、详细专辑介绍，为所有音乐爱好者提供超越MP3媲美CD音质的高保真流媒体音乐服务</div><div style="color:#999;font-size:20px;padding-top:20px;padding-left:160px;padding-right:160px;padding-bottom:30px;">温馨提示：该产品订购后一个月有效，次月到期自动续订如需退订，请拨打 96868 详细咨询。</div></div><div id="orderTipsDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:478px;top:20px;">确认订购</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:678px;top:20px;">下次再说</div><div id="orderTipsDivBtFocus" style="width:150px;height:50px;border:2px #ffffff solid;position:absolute;left:477px;top:19px;"></div></div></div>'
	,orderTipsDivContral : {
		focusPos : [477,677]//焦点left值 重庆
		,dataPos : 0//数据索引位置
		,dataLen : 2//数据总长度
		,init : function(){
			this.dataPos=0;
			this.updateMyMoney();//更新显示余额
		}
		,updateMyMoney : function(){//获取余额
			//ajax 获得余额后
			orderFlow.ajaxMyMoney(function(m){
				orderFlow.$('orderTipsDivMyMoney').innerText=m;//余额
			});
			
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
				//调用接口查看是否需要家长
				orderFlow.optParentLocker(function(data){	   
					if(data.status==0){
						//if(!!data.result.parentLocker.lockerPass){
						if(data.result.code == 200){	
							//有家长锁
							orderFlow.passwordYes = data.result.lockerPass;
							orderFlow.showStep('passwordDiv');//去家长锁步骤
						}else if(data.result.code == 201){
							//没有家长锁
							//检查余额
							orderFlow.checkMyMoney(function(b){
								if(!!b){
									//余额足够
									//直接调用开通接口 
									orderFlow.orderProduct();
								}else{
									//余额不够,去余额不够页面
									orderFlow.showStep('myMoneyLess');
								}
							});
							


							//test 以下代码是测试，实际请删除
							//订购成功
							//orderFlow.orderSuccessCallBack();
							//orderFlow.showStep('successTipsDiv');
							//订购失败
							//orderFlow.orderFailureCallBack();
							//orderFlow.showStep('failureTipsDiv');
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
	,alipayDiv : '<div id="alipayDiv"><div id="alipayDivHeader" style="text-align:center;height:60px;line-height:60px;font-size:32px;border-bottom:1px #202020 solid;">支付宝充值</div><div style="position:absolute;font-size: 20px;left: 928px;background-color: #ee5013;color: #ffffff;padding: 10px 20px;border-radius: 18px;top: 14px;width: 240px;text-align:center;">我的余额: <span id="alipayDivMyMoney">0</span> 元</div><div id="alipayDivBody" style="padding:30px;text-align:center;"><div style="padding-bottom:30px;font-size: 28px;color: #ffffff;">亲爱的乐迷，请先选择下面的金额再进行充值</div><div id="recharge1" style="width:119px;height:118px;margin:0px 10px;display:inline-block;">0元</div><div id="recharge2" style="width:119px;height:118px;margin:0px 10px;display:inline-block;">0元</div><div id="recharge3" style="width:119px;height:118px;margin:0px 10px;display:inline-block;">0元</div><div id="recharge4" style="width:119px;height:118px;margin:0px 10px;display:inline-block;">0元</div></div><div id="alipayDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:578px;top:20px;">取消充值</div><div id="alipayDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:578px;top:20px;"></div></div></div>'
	,alipayDivContral : {
		dataPos : 0//金额选择区 数据索引位置
		,dataLen : 4//金额选择区 数据总长度
		,actionArea : 0 //操控区域，0 金额选择区，1 按钮区
		,moneyData : [
			{text:'10元',val : 10}
			,{text:'30元',val : 30}
			,{text:'50元',val : 50}
			,{text:'100元',val : 100}
		]
		,init : function(){
			this.dataPos=0;
			for(var i=0,len=this.moneyData.length;i<len;i++){
				$('recharge'+(i+1)).innerHTML='<div style="font-size:36px;text-align:center;padding-top:58px;width:119px;">'+this.moneyData[i].text+'</div>';
				$('recharge'+(i+1)).style.background='url('+orderFlowImgBasePath+'/images/moneySelectBg.png) no-repeat';
			}
			document.getElementById('alipayDivBtFocus').style.display='none';
			document.getElementById('recharge1').style.background='url('+orderFlowImgBasePath+'/images/moneySelectBg-on.png) no-repeat';
			this.updateMyMoney();
		}
		,updateMyMoney : function(){//获取余额
			//ajax 获得余额后
			orderFlow.ajaxMyMoney(function(m){
				orderFlow.$('alipayDivMyMoney').innerText=m;//余额
			});
			
		}
		,focus : function(){
			if(this.actionArea==0){
				document.getElementById('recharge'+(this.dataPos+1)).style.background='url('+orderFlowImgBasePath+'/images/moneySelectBg-on.png) no-repeat';
			}else{
				document.getElementById('alipayDivBtFocus').style.display='block';
			}
		}
		,blur : function(){
			if(this.actionArea==0){
				document.getElementById('recharge'+(this.dataPos+1)).style.background='url('+orderFlowImgBasePath+'/images/moneySelectBg.png) no-repeat';
			}else{
				document.getElementById('alipayDivBtFocus').style.display='none';
			}
		}
		,up : function(){
			if(this.actionArea==1){
				this.blur();
				this.actionArea=0;
				this.focus();
			}
		}
		,down : function(){
			if(this.actionArea==0){
				this.blur();
				this.actionArea=1;
				this.focus();
			}
		}
		,left : function(){
			if(this.actionArea==0){
				var newDataPos = this.dataPos-1;
				if(newDataPos<0){
					return 0;
				}
				this.blur();
				this.dataPos=newDataPos;
				this.focus();
			}
			
		}
		,right : function(){
			if(this.actionArea==0){
				var newDataPos = this.dataPos+1;
				if(newDataPos>=this.dataLen){
					return 0;
				}
				this.blur();
				this.dataPos=newDataPos;
				this.focus();
			}
		}
		,enter : function(){
			if(this.actionArea==0){
				//alert(this.dataPos);
				//this.moneyData[this.dataPos].val;//充值 多少钱
				//test 这里应该要 ajax 调用充值接口 请按实际情况修改,看看是否需要调用充值接口成功后 再去 充值支付等待页
				orderFlow.ajaxRecharge(this.moneyData[this.dataPos].val,function(){

				});

				//test 充值支付等待页
				orderFlow.showStep('waitingAlipayRechargeDiv');


			}else{		
				//取消
				orderFlow.close();
				//orderFlow.showStep('failureTipsDiv');//显示哪一步
				return 0;
			}
		}
	}
	,myMoneyLess : '<div id="myMoneyLess"><div id="myMoneyLessHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">余额不足，马上充值</div><div style="position:absolute;font-size: 20px;left: 928px;background-color: #ee5013;color: #ffffff;padding: 10px 20px;border-radius: 18px;top: 14px;width: 240px;text-align:center;">我的余额: <span id="myMoneyLessMyMoney">0</span> 元</div><div id="myMoneyLessBody" style="text-align:center;"><div id="myMoneyLessTipsText" style="padding:60px;text-align:center;font-size:24px;line-height:30px;color:#ffffff;"> </div><div style="color:#cccccc;font-size:20px;padding:30px;padding-bottom: 50px;border-top: 1px #202020 solid;">温馨提示：充值也可以到附近的营业厅或拨打96868</div></div><div id="myMoneyLessFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:378px;top:20px;">营业厅充值</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:578px;top:20px;">支付宝充值</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:778px;top:20px;">下次再说</div><div id="myMoneyLessBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:378px;top:20px;"></div></div></div>'
	,myMoneyLessContral : {
		focusPos : [378,578,778]//焦点left值 重庆
		,dataPos : 0//数据索引位置
		,dataLen : 3//数据总长度
		,init : function(){
			this.dataPos=0;
			this.updateMyMoney();
		}
		,updateMyMoney : function(){//获取余额
			//ajax 获得余额后
			orderFlow.ajaxMyMoney(function(m){
				orderFlow.$('myMoneyLessTipsText').innerText='亲爱的乐迷，您的当前余额是 '+m+'元，有点不足哦，赶快充点吧。';//提示语句 
				orderFlow.$('myMoneyLessMyMoney').innerText=m;//余额
			});
			
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
			document.getElementById('myMoneyLessBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,right : function(){
			var newDataPos = this.dataPos+1;
			if(newDataPos>=this.dataLen){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('myMoneyLessBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,enter : function(){
			if(this.dataPos==0){
				//营业厅充值
				//alert('营业厅充值');
				//test 这里会跳到营业厅充值页面，请根据实际情况修改
				return 0;
			}
			if (this.dataPos==1) {
				orderFlow.goAlipayRechargeFlow();//进入支付宝充值流程
				return 0;
			};
			if (this.dataPos==2) {
				//下次再说
				orderFlow.close();
				
				return 0;
			};
		}
	}
	,passwordDiv : '<div id="passwordDiv"><div id="passwordDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">请输入家长锁密码</div><div id="passwordDivBody" style="text-align:center;padding: 30px;padding-bottom:10px;position:relative;"><div id="passwordDivNum1" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div><div id="passwordDivNum2" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div><div id="passwordDivNum3" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div><div id="passwordDivNum4" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div><div id="passwordDivNum5" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div><div id="passwordDivNum6" style="margin:10px;display:inline-block;border:1px #999 solid;text-align:center;width:50px;height:50px;line-height:50px;">&nbsp;</div></div><div id="passwordDivErrorTips" style="text-align: center; height: 40px; font-size: 16px; line-height: 40px; color: #ee5013; visibility: hidden; ">密码不正确，请重新输入，如忘记密码请拨打96868查询 </div><div id="passwordDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:478px;top:20px;">订购</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:678px;top:20px;">取消</div><div id="passwordDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:478px;top:20px;"></div></div></div>'
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
					//检查余额
					orderFlow.checkMyMoney(function(b){
						if(!!b){
							//余额足够
							//直接调用开通接口 
							orderFlow.orderProduct();
						}else{
							//余额不够,去余额不够页面
							orderFlow.showStep('myMoneyLess');
						}
					});

					//test 以下代码是测试，实际请删除
					//订购成功
					//orderFlow.orderSuccessCallBack();
					//orderFlow.showStep('successTipsDiv');
					//订购失败
					//orderFlow.orderFailureCallBack();
					//orderFlow.showStep('failureTipsDiv');

				}else{
					//密码不正确
					//alert('密码不正确，请重新输入！');
					orderFlow.showStep('passwordDiv');
					orderFlow.$('passwordDivErrorTips').style.visibility='visible';
				}
				return 0;
			}
			if (this.dataPos==1) {
				//取消
				orderFlow.close();
				
				return 0;
			};
		}
	}
	,waitingAlipayRechargeDiv : '<div id="waitingAlipayRechargeDiv"><div id="waitingAlipayRechargeDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">等待支付</div><div style="position:absolute;font-size: 20px;left: 928px;background-color: #ee5013;color: #ffffff;padding: 10px 20px;border-radius: 18px;top: 14px;width: 240px;text-align:center;">我的余额: <span id="waitingAlipayRechargeDivMyMoney">0</span> 元</div><div id="waitingAlipayRechargeDivBody"><div style="line-height: 46px;color:#ffffff;font-size:26px;padding: 60px;border-bottom: 1px #222 solid;text-align:center;">亲爱的乐迷，请在支付宝确认支付</div></div><div id="waitingAlipayRechargeDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:578px;top:20px;">返回</div><div id="waitingAlipayRechargeDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:578px;top:20px;"></div></div></div>'
	,waitingAlipayRechargeDivContral : {
		focusPos : [578]//焦点left值
		,dataPos : 0//数据索引位置
		,dataLen : 1//数据总长度
		,init : function(){
			this.updateMyMoney();	
		}
		,updateMyMoney : function(){//获取余额
			//ajax 获得余额后
			orderFlow.ajaxMyMoney(function(m){
				orderFlow.$('waitingAlipayRechargeDivMyMoney').innerText=m;//余额
			});
			
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
			document.getElementById('waitingAlipayRechargeDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,right : function(){
			var newDataPos = this.dataPos+1;
			if(newDataPos>=this.dataLen){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('waitingAlipayRechargeDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,enter : function(){
			//alert('waitingAlipayRechargeDiv');
			if(this.dataPos==0){//返回
				//orderFlow.close();//关闭弹窗
				orderFlow.showStep('orderTipsDiv');//返回到订购提示 第一步
				return;
			}
			
		}
	}
	,bindAlipayDiv : '<div id="bindAlipayDiv" style="height:700px;"><img src="'+orderFlowImgBasePath+'/images/bindAlipay.jpg" style="position:absolute;left:0px;top:0px;" /></div>'
	,bindAlipayDivContral : {
		focusPos : []//焦点left值
		,dataPos : 0//数据索引位置
		,dataLen : 0//数据总长度
		,init : function(){
			orderFlow.wrapperDiv.style.top='0px';
		}
		,back : function(){
			orderFlow.wrapperDiv.style.top='160px';
			orderFlow.showStep('myMoneyLess');

			return 0;
		}
		,enter : function(){
			return 0;
		}
	}
	,successTipsDiv : '<div id="successTipsDiv"><div id="successTipsDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">订购成功</div><div style="position:absolute;font-size: 20px;left: 928px;background-color: #ee5013;color: #ffffff;padding: 10px 20px;border-radius: 18px;top: 14px;width: 240px;text-align:center;">我的余额: <span id="successTipsDivMyMoney">0</span> 元</div><div id="successTipsDivBody"><div style="line-height: 46px;color:#ffffff;font-size:26px;padding: 0px 60px;padding-bottom: 10px;border-bottom: 1px #222 solid;">您已成功订购HIFI音乐包月套餐，5分钟后生效，5分钟内请不要重复订购，成功订购后将从您的帐号扣费，如需咨询或退订，请拨打 96868</div></div><div id="successTipsDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:478px;top:20px;">确认</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left: 678px;top:20px;">返回首页</div><div id="successTipsDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:478px;top:20px;"></div></div></div>'
	,successTipsDivCallBack : function(){}//开通成功关闭弹层回调
	,successTipsDivContral : {
		focusPos : [478,678]//焦点left值 重庆
		,dataPos : 0//数据索引位置
		,dataLen : 2//数据总长度
		,init : function(){
			this.updateMyMoney();	
		}
		,updateMyMoney : function(){//获取余额
			//ajax 获得余额后
			orderFlow.ajaxMyMoney(function(m){
				orderFlow.$('successTipsDivMyMoney').innerText=m;//余额
			});
			
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
			document.getElementById('successTipsDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,right : function(){
			var newDataPos = this.dataPos+1;
			if(newDataPos>=this.dataLen){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('successTipsDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,enter : function(){
			//alert('successTipsDiv');
			if(this.dataPos==0){
				orderFlow.close(orderFlow.successTipsDivCallBack);
				return;
			}
			if(this.dataPos==1){
				//去首页
				return;
			}
			
		}
	}
	,reChargeSuccessDiv : '<div id="reChargeSuccessDiv"><div id="reChargeSuccessDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">充值成功</div><div style="position:absolute;font-size: 20px;left: 928px;background-color: #ee5013;color: #ffffff;padding: 10px 20px;border-radius: 18px;top: 14px;width: 240px;text-align:center;">我的余额: <span id="reChargeSuccessDivMyMoney">0</span> 元</div><div id="reChargeSuccessDivBody"><div id="reChargeSuccessDivTipsText" style="line-height: 46px;color:#ffffff;font-size:26px;padding: 60px;text-align:center;border-bottom: 1px #222 solid;"></div></div><div id="reChargeSuccessDivFooter" style="position:relative;height:100px;"><div style="width:220px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:418px;top:20px;">马上订购HiFi音乐</div><div style="width:220px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left: 738px;top:20px;">取消</div><div id="reChargeSuccessDivBtFocus" style="width:220px;height:50px;border:1px #ffffff solid;position:absolute;left:418px;top:20px;"></div></div></div>'
	,reChargeSuccessDivCallBack : function(){}//充值成功关闭弹层 回调
	,reChargeSuccessDivContral : {
		focusPos : [418,738]//焦点left值 重庆
		,dataPos : 0//数据索引位置
		,dataLen : 2//数据总长度
		,init : function(){
			this.updateMyMoney();	
		}
		,updateMyMoney : function(){//获取余额
			//ajax 获得余额后
			orderFlow.ajaxMyMoney(function(m){
				orderFlow.$('reChargeSuccessDivMyMoney').innerText=m;//余额
				orderFlow.$('reChargeSuccessDivTipsText').innerText='亲爱的乐迷，恭喜你充值成功了，现在的当前余额为 '+m+'元';
			});
			
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
			document.getElementById('reChargeSuccessDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,right : function(){
			var newDataPos = this.dataPos+1;
			if(newDataPos>=this.dataLen){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('reChargeSuccessDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,enter : function(){
			//alert('reChargeSuccessDiv');
			if(this.dataPos==0){
				orderFlow.showStep('orderTipsDiv');
				return;
			}
			if(this.dataPos==1){
				orderFlow.close(orderFlow.reChargeSuccessDivCallBack);
				return;
			}
			
		}
	}
	,reChargeFailureDiv : '<div id="reChargeFailureDiv"><div id="reChargeFailureDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">充值失败</div><div style="position:absolute;font-size: 20px;left: 928px;background-color: #ee5013;color: #ffffff;padding: 10px 20px;border-radius: 18px;top: 14px;width: 240px;text-align:center;">我的余额: <span id="reChargeFailureDivMyMoney">0</span> 元</div><div id="reChargeFailureDivBody"><div id="reChargeFailureDivTipsText" style="line-height: 46px;color:#ffffff;font-size:26px;padding: 60px;text-align:center;border-bottom: 1px #222 solid;"></div></div><div id="reChargeFailureDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:418px;top:20px;">重试</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left: 738px;top:20px;">下次再说</div><div id="reChargeFailureDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:418px;top:20px;"></div></div></div>'
	,reChargeFailureDivCallBack : function(){}//充值成功关闭弹层 回调
	,reChargeFailureDivContral : {
		focusPos : [418,738]//焦点left值 重庆
		,dataPos : 0//数据索引位置
		,dataLen : 2//数据总长度
		,init : function(){
			this.updateMyMoney();	
		}
		,updateMyMoney : function(){//获取余额
			//ajax 获得余额后
			orderFlow.ajaxMyMoney(function(m){
				orderFlow.$('reChargeFailureDivMyMoney').innerText=m;//余额
				orderFlow.$('reChargeFailureDivTipsText').innerText='亲爱的乐迷，支付遇到了一点小问题哦，您的帐号当前余额是 '+m+'元';
			});
			
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
			document.getElementById('reChargeFailureDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,right : function(){
			var newDataPos = this.dataPos+1;
			if(newDataPos>=this.dataLen){
				return 0;
			}
			this.dataPos=newDataPos;
			document.getElementById('reChargeFailureDivBtFocus').style.left=this.focusPos[this.dataPos]+'px';
		}
		,enter : function(){
			//alert('reChargeFailureDiv');
			if(this.dataPos==0){
				//重试
				//orderFlow.showStep('alipayDiv');
				orderFlow.goAlipayRechargeFlow();
				return;
			}
			if(this.dataPos==1){
				//下次再说
				orderFlow.close(orderFlow.reChargeFailureDivCallBack);
				return;
			}
			
		}
	}
	,failureTipsDiv : '<div id="failureTipsDiv"><div id="failureTipsDivHeader" style="text-align:center;height:80px;line-height:80px;font-size:38px;border-bottom:1px #202020 solid;">提示</div><div id="failureTipsDivBody"><div style="line-height: 46px;color:#ffffff;font-size:26px;padding: 0px 60px;padding-bottom: 10px;border-bottom: 1px #222 solid;text-align:center;">订购失败！</div><div style="color:#999;font-size:20px;padding-top:20px;padding-left:60px;padding-right:60px;padding-bottom:30px;">请拨打 96868 详细咨询。</div></div><div id="failureTipsDivFooter" style="position:relative;height:100px;"><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:478px;top:20px;">再试一次</div><div style="width:150px;height:50px;line-height:50px;text-align:center;color:#ffffff;font-size:26px;border:1px #5d4f4f solid;position:absolute;left:678px;top:20px;">关闭</div><div id="failureTipsDivBtFocus" style="width:150px;height:50px;border:1px #ffffff solid;position:absolute;left:478px;top:20px;"></div></div></div>'
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
	,goAlipayRechargeFlow : function(){//支付宝充值流程 开始
		//检查是否绑定支付宝
		orderFlow.checkBindAlipay(function(b){
			if(!!b){
				//绑定了
				//去选择支付宝充值面额 页面
				orderFlow.showStep('alipayDiv');
			}else{
				//未绑定
				orderFlow.showStep('bindAlipayDiv');
			}
		});
	}
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
				if(!!orderFlow[orderFlow.actionArea+'Contral']&&!!orderFlow[orderFlow.actionArea+'Contral'].back){
					orderFlow[orderFlow.actionArea+'Contral'].back();
				}else{
					history.back();
				}
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
			this.coverDiv.style.opacity='0.4';
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
		if(!!!this.wrapperDiv){
			this.init();
		}
		this.coverDiv.style.display='block';
		this.coverDiv.style.visibility='visible';

		this.wrapperDiv.style.display='block';
		this.wrapperDiv.style.visibility='visible';
	}
	,hide : function(){
		if(!!!this.wrapperDiv){
			this.init();
		}
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
		if(!!!this.wrapperDiv){
			this.init();
		}
		this.wrapperDiv.innerHTML=this.generateHTML(stepName);
		!!this[stepName+'Contral']&&!!this[stepName+'Contral'].init&&this[stepName+'Contral'].init();//此步骤的操作控制初始化
	}
	,getUserInfo : function(fn){//获得用户信息
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
	,orderProduct : function(fn){//发起订购
		if(!!this.req){
			return;//正在请求订购接口，避免重复请求，强制return
		}
		//实际请修改  可能要加上支付宝返回页面的地址啥参数等
		this.req=ajax({
			url: serverUrl +'hifiUser/orderProduct.action?keyNo='+ keyNo +'&offer=11&products=12112121',//参数offer，products需要重庆广电提供
			type: "GET", //HTTP 请求类型,GET或POST
			dataType: "html", //请求的文件类型html/xml
			onSuccess: function(html){ //请求成功后执行[可选]
				var json = eval("(" + html + ")");
				!!fn&&fn(json);
			},
			onError:function(){ //请求失败后执行[可选]
				alert("数据出错");
				orderFlow.req=null;
			},
			onComplete:function(){
				orderFlow.req=null;
			},
	        post:"",  
	        timeout:10000  
		});

	}
	,optParentLocker : function(fn){//请求家长锁
		if(!!this.req){
			return;//正在请求接口，避免重复请求，强制return
		}
		//实际请修改 
		
		this.req=ajax({
			url: serverUrl +'hifiUser/optParentLocker.action?keyNo='+ keyNo +'&dealType=1',
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

		//test 实际请注释下面的代码
		//!!fn&&fn({status:0,result:{code:200}});//有家长锁
		//!!fn&&fn({status:0,result:{code:201}});//没家长锁


	}
	,ajaxMyMoney : function(fn){//获取余额

		//实际请修改 使用 getUserInfo 这接口也可以获取到余额
		/*
		ajax({
			url: hostUrl+'/?keyNo='+ keyNo +'&dealType=1',
			type: "GET", //HTTP 请求类型,GET或POST
			dataType: "html", //请求的文件类型html/xml
			onSuccess: function(html){ //请求成功后执行[可选]
				var json = eval("(" + html + ")");
				var money=13;//test 余额，实际请修改
				!!fn&&fn(money);
			},
			onError:function(){ //请求失败后执行[可选]
				alert("数据出错");
			},
			onComplete:function(){
			},
	        post:"",  
	        timeout:10000  
		});
		*/

		//test 实际请注释下面的代码
		!!fn&&fn(-8);//test 有13元

	}
	,checkMyMoney : function(fn){//检查余额是否足够 fn的参数就是bool类型，true代表余额足够
		this.ajaxMyMoney(function(money){
			if(parseFloat(money,10)>=10.00){//暂定大于10元
				fn(true);
			}else{
				fn(false);
			}
		});
	}
	,checkBindAlipay : function(fn){//检查是否绑定支付宝
		//实际请修改 可能需要ajax

		//test 仅供参考，实际请注释下面代码 
		//!!fn&&fn(true);//绑定了
		!!fn&&fn(false);//未绑定
	}
	,ajaxRecharge : function(money,fn){//支付宝充值 money 充多少钱，fn 调用接口成功后的回调
		//test ajax请按实际情况修改
		//var url='test?money='+money;
		//这里是ajax代码 ...
		
		//test 仅供参考
		!!fn&&fn();

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