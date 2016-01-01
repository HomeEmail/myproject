
//播放兼容pc类
if(typeof MediaPlayer == 'undefined'){
	MediaPlayer =function(){
		this.id=null;
		this.position='1,0,0,0,0';
		this.source='';
		this.point=0;//单位为秒
		this.player=null;
		this.isInstanceDom=false;
		this.init = function(){};
		this.createPlayerInstance = function(type,displayLevel){
			if(type=='video'){
				this.player=document.createElement('video');
				this.player.className='wrapper_utv_video';
			}
			this.id=new Date().getTime();
			return this.id;
		};
		this.releasePlayerInstance = function(){
			this.id=null;
			this.player.remove();
			this.player=null;
		};
		this.bindPlayerInstance = function(id){
			this.id=id;
		};
		this.setVolume = function(v){
			//设置音量
		};
		this.getMute = function(){
			return 0;//0为非静音，1为静音
		};
		this.getMediaDuration = function(){
			// 获得视频总长时间，如1:22:30
			var t=this.player.duration;//秒
			var h=parseInt(t/3600,10) || 00;
			var m=parseInt((t%3600)/60,10) || 00;
			var s=t-(h*3600)-(m*60) || 00;
			return h+':'+m+':'+s;
		};
		this.audioUnmute = function(){
			//取消静音
		};
		this.audioMute = function(){
			//静音
		};
		this.pause = function(i){
			//pause(1)暂停
			this.player.pause();
		};
		this.play = function(){
			//播放
			if(this.player){
				this.player.src=this.source;
				this.player.style.position='absolute';
				
				this.player.style.zIndex='-1';

			}
			var ary=this.position.split(',');
			if(parseInt(ary[0],10)==1){
				this.player.style.width='1280px';
				this.player.style.height='720px';
				this.player.style.left='0px';
				this.player.style.top='0px';
			} else {
				this.player.style.width=ary[3]+'px';
				this.player.style.height=ary[4]+'px';
				this.player.style.left=ary[1]+'px';
				this.player.style.top=ary[2]+'px';
			}

			if(!this.isInstanceDom){
  				this.isInstanceDom=true;
				$(document.body).append(this.player);
			}
			this.player.play();
		};
		this.refresh = function(){
			//刷新视频
			if(this.point===0){
				this.point=this.player.currentTime;
			} else {
				this.player.currentTime=this.point;
			}
			this.player.pause();
			this.player.play();
		};
		return this;
	}
	
}
//获取设备配置信息兼容pc静态类
if(typeof DataAccess == 'undefined'){
	DataAccess={

	};
	DataAccess.getInfo=function(type,name){

		return 0;
	};
	DataAccess.setInfo=function(type,name,value){

	};
}
//SysInfo
if(typeof SysInfo == 'undefined'){
	SysInfo={
	    
	};
}








/*
	depend:utv.js
	author:yy
	description:机顶盒媒体播放器封装
*/
function mediaPlayer(opts){
	var _def ={
		isFullScreen:false//全屏状态
		,url:''//播放源
		,playProcess:function(){}//播放中设置播放进度条
		,playProcessMove:200//多少毫秒检查一次timeClock的时间
		,playEnd:function(){}//播放完毕执行的方法
		,minMoveTime:5 //快进快退时 移动的最小时间  单位为秒
	}
	,_opt = utv.extend(_def,opts);//合并

	this.player = null ;//播放器
	this.isPause = false;  //暂停状态
	this.isFullScreen = _opt.isFullScreen;//全屏状态 默认不全屏
	this.url = _opt.url;//播放源
	this.minMoveTime = _opt.minMoveTime;//快进快退时 移动的最小时间  单位为秒
	this.mediaTotalSecond = 0;//视频的总时长 单位为秒
	this.loadTimer = null;//加载视频的定时器
	this.volume = 0;//当前的音量
	this.isMute = false;//是否静音
	this.per = 0;//播放完成的进度

	this.playEnd = _opt.playEnd;//播放完毕执行的方法
	this.playProcess = _opt.playProcess;//播放中设置播放进度条
	this.clockTimer = null;//时钟 定时器
	this.useMillis = 0;//时钟统计的 当前播放的时间
	this.playProcessMove = _opt.playProcessMove;//时钟执行的间隔时间
	this.displayLevel = _opt.displayLevel || 2; //视频显示在第几层

	this.init();
}

mediaPlayer.prototype = {
	init:function(){
		var _self = this
			,_mymedia
			,_mid
		;
		_mymedia = new MediaPlayer();
		_mid = _mymedia.createPlayerInstance("video",_self.displayLevel);
		_mymedia.bindPlayerInstance(_mid);

		_self.player = _mymedia;
		//初始化时 先从 DataAccess 读取音量
		_self.setVolume(DataAccess.getInfo ("MediaSetting","OutputVolumn"));
	}
	//设置播放器的位置
	,setPositon:function(flag,x, y, width, height){//是否全屏 x轴 y轴 宽度  高度 
		var _self = this;
		if(flag){//全屏的时候 参数无效 
			_self.player.position = "1,0,0,0,0";
			_self.isFullScreen = true;
		}else{
			_self.player.position = "0,"+x+","+y+","+width+","+height;
			_self.isFullScreen = false;
		}
	}
	//设置播放源
	,setSource:function(url){
		this.player.source = url;
		this.url = url;
	}
	,getSource:function(){
		return this.url;
	}
	//加载视频
	,loadVideo:function(url,success,fail){
		var _self = this,mediaTotalSecond=0;

		if(url){
			_self.setSource(url);
		}else{
			_self.setSource(_self.url);
		}

		if(url){
			success=url
			url = '';
			fail = fail || new Function;
		}
		function mload(){
			if(_self.loadTimer != null){
				clearTimeout(_self.loadTimer);
				_self.loadTimer = null;
			}

			mediaTotalSecond = _self.getMediaSecond();// 获得视频总长有多少秒

			if (mediaTotalSecond > 0) {
				_self.mediaTotalSecond = mediaTotalSecond;

				//执行成功事件
				if(utv){
					success();
				}

				//开始计时
				setTimeout(function(){
					_self.startClock();
				},_self.playProcessMove);
			} else {
				//执行失败事件
				if(utv){
					fail();
				}
				_self.loadTimer = setTimeout(mload, 200);	// 设置下一次触发
			}
		}

		mload();
	}
	// 获得视频总长有多少秒
	,getMediaSecond:function(){
		var _self = this
			,totalTimeStr = ''
			,timeArray = []
			,index = 0
			,element
			,seconds = 0
		;

		// 获得视频总长时间，如1:22:30
		totalTimeStr = _self.player.getMediaDuration();
		//new utv.Elem('#testId').setHTML(totalTimeStr);
		timeArray = totalTimeStr.split(':');

		// 将它转换成秒为单位
		for (; index < timeArray.length; index++) {
			element = timeArray[index];
			if (isNaN(element)) {
				return 0;
			}
		}

		if(timeArray[0]){
			seconds =seconds+3600 * parseInt(timeArray[0],10);
		}
		if(timeArray[1]){
			seconds =seconds+60 * parseInt(timeArray[1],10);
		}
		if(timeArray[2]){
			seconds =seconds+parseInt(timeArray[2],10);
		}
		//var seconds = 3600 * parseInt(timeArray[0]) + 60 * parseInt(timeArray[1]) + parseInt(timeArray[2]);
		//兼容中山同洲盒子
		if(seconds == 0){
			return parseInt(totalTimeStr);
		}else{
			return isNaN(seconds) ? 0 : seconds;
		}
	}
	//当前的播放点  单位为秒
	,getUseTime:function(){
		return parseInt(this.useMillis/1000,10);
	}
	//设置播放点 单位为秒
	,setUseTime:function(second){
		var _self = this;
		if (second<=0) {
			_self.useMillis = 0;
		} else if (second*1000 > _self.mediaTotalSecond) {
			_self.useMillis = _self.mediaTotalSecond;
		}else{
			_self.useMillis=second*1000;
		}
	}
	//时钟开始计时
	,startClock:function(){
		var _self = this,_seconds=_self.useMillis/1000;
		if (_self.useMillis < _self.mediaTotalSecond*1000) {
			if(_self.clockTimer!=null){
				_self.stopClock();
			}
			_self.useMillis = _self.useMillis + _self.playProcessMove;
			_self.clockTimer = setTimeout(function() {_self.startClock();}, _self.playProcessMove);
		}else if (_self.useMillis >= _self.mediaTotalSecond*1000) {
			//发出播放结束事件
			_self.playEnd();
			_self.stopClock();
		}

		_self.per = _seconds/_self.mediaTotalSecond; //计算进度百分比  小数
		_self.playProcess(_self.per,_self.formatSecond(_seconds),_seconds);//执行设置进度的方法
	}
	//停止计时
	,stopClock:function(){
		var _self = this;
		clearTimeout(_self.clockTimer);
		_self.clockTimer=null;
	}
	
	//重新计时
	,reStartClock:function(){
		var _self = this;
		_self.clockTimer = setTimeout(function() {_self.startClock();}, _self.playProcessMove);
	}
	//获取当前音量
	,getVolume:function(){
		//return parseInt(DataAccess.getInfo("MediaSetting","OutputVolumn"),10);
		return this.volume;
	}
	//设置音量 同时取消静音
	,setVolume:function(value,cb){
		var _self = this;
		//取消静音
		_self.player.audioUnmute();

		DataAccess.setInfo ("MediaSetting","OutputVolumn",value.toString());
		_self.volume = value;
		if(cb){
			cb();//执行回调
		}
	}
	//静音
	,mute:function(flag,cb){
		var _self = this,_vol=0;
		if(flag){//静音 同时设置的音量为0（兼容）
			_self.player.audioMute();
		}else{//取消静音 同时重新设置音量
			_self.player.audioUnmute();
			_vol = _self.getVolume();
		}
		DataAccess.setInfo ("MediaSetting","OutputVolumn",_vol.toString());
		_self.volume = _vol;

		if(cb){
			cb();//执行回调
		}
	}
	//加音量
	,plusVolume:function(cb){
		var _self = this
			,_vol = _self.getVolume()+1
		;
		_vol = (_vol>=32)?32:_vol;
		_self.setVolume(_vol,cb);
	}
	//减音量
	,reduceVolume:function(cb){
		var _self = this
			,_vol = _self.getVolume()-1
		;
		_vol = (_vol<=0)?0:_vol;
		_self.setVolume(_vol,cb);
	}
	//暂停
	,pause:function(cb){
		var _self = this;
		_self.isPause=true;
		_self.stopClock(); //暂停计时器
	    _self.player.pause(1);

	    if(cb){
			cb();//执行回调
		}
	}
	//开始播放
	,play:function(cb){
		var _self = this;
		_self.isPause=false;
		_self.player.play();
		_self.player.refresh();

		if(_self.clockTimer){
			_self.stopClock();
			_self.reStartClock();
		}

		if(cb){
			cb();//执行回调
		}
	}
	//释放播放对象
	,releasePlayer:function(){
		if (this.player) {
			this.player.releasePlayerInstance();
			this.player = null;
		}
		if(this.clockTimer!=null){
			this.stopClock();
		}
	}
	//刷新
	,refresh:function(){
		var _self = this;
		_self.player.refresh();
	}
	//设置进度 ctime 时间点，单位为秒 
	,setProcess:function(ctime,cb){
		var _self = this;
		_self.setUseTime(ctime);
		_self.reStartClock();
		_self.player.point = ctime;
		_self.player.refresh();

		if(cb){
			cb();//执行回调
		}
	}
	/** 将秒转换成 hh:mm:ss */
	,formatSecond:function(secondParam){
		var timestamp = "00:00:00";
		if (secondParam) {
			var second = Number(secondParam);
			var minute = 0;
			var hour = 0;
			if (second >= 60) {
				minute = Number(second / 60);
				second = Number(second % 60);
				if (minute >= 60) {
					hour = Number(minute / 60);
					minute = Number(minute % 60);
				}
			}
			if (second < 10) {// 秒
				timestamp = ":0" + parseInt(second,10);
			} else {
				timestamp = ":" + parseInt(second,10);
			}
			if (minute < 10) {// 分
				timestamp = ":0" + parseInt(minute,10) + timestamp;
			} else {
				timestamp = ":" + parseInt(minute,10) + timestamp;
			}
			if (hour < 10) {// 时
				timestamp = "0" + parseInt(hour,10) + timestamp;
			} else {
				timestamp = "" + parseInt(hour,10) + timestamp;
			}
		}
		return timestamp;
	}
};
