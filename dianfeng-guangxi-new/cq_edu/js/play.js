/*
  playObj为new的playAudio对象，注意new playAudio时用的哪个对象名
*/
function playAudio(_playUrl,_errMsgDiv){
	this.playUrl = typeof(_playUrl)  != "undefined" ? _playUrl : "";
	this.errMsgDiv = typeof(_errMsgDiv)  != "undefined" ? _errMsgDiv : "";
	this.myMedia = null;
	this.timers = null;
	this.totalTime = 0;
	this.currTime = 0;
	this.index = 0;
	this.$ = function(id) {
		return document.getElementById(id);
	}
	this.createPlayer = function(){//创建播放实例
		try{
			this.myMedia = new MediaPlayer();
			this.mediaId = this.myMedia.createPlayerInstance("audio",0);
			this.myMedia.bindPlayerInstance(this.mediaId);
			this.myMedia.source = this.playUrl;
			if(typeof(CA) == "undefined")this.myMedia.setPlaySrc(this.playUrl);	
		}catch(err){
			if(this.errMsgDiv !== "")this.$(this.errMsgDiv).innerHTML = err;
		}	
	}
	this.releasePlayer = function(){//销毁播放实例
		if(!!this.myMedia){
			try{
				this.myMedia.releasePlayerInstance();
				try{
					this.myMedia.unBindPlayerInstance();
				}catch(e){
					//	
				}
				this.myMedia = null;
			}catch(err){
				if(this.errMsgDiv !== "")this.$(this.errMsgDiv).innerHTML = err;
			}
		}
	}
	this.startPlayer = function(){//启动播放器
		this.createPlayer();
		this.play();
		this.startTimer();
		this.initVolume(this.getPlayStatusObj());
	}
	this.stopPlayer = function(_function){//停止播放
		this.clearTimer();
		this.pause();
		if(typeof(_function) !== "undefined")_function();
	}
	this.play = function(_function){//播放
		this.myMedia.play();
		if(typeof(_function) !== "undefined")_function();
	}
	this.pause = function(_function){//暂停播放
		this.myMedia.pause(1);	
		if(typeof(_function) !== "undefined")_function();
	}
	this.startTimer = function(){
		if(this.timers == null)this.timers = setInterval('playObj.getCurrentPoint()',1000);	
	}
	this.clearTimer = function(){
		console.log("clear");
		if(!!this.timers){
			try{
				clearInterval(this.timers);
				this.timers = null;
			}catch(err){
				
			}
		}
	}
	this.setCurrentPoint = function(_point){
		this.myMedia.currentPoint = _point;
		if(typeof(this.myMedia.setCurrentPoint) == "function")this.myMedia.setCurrentPoint(_point);
	}
	this.getCurrentPoint = function(){//得到当前进度参数
		this.currTime =	parseInt(this.myMedia.currentPoint);
		this.totalTime = String(this.myMedia.getMediaDuration()).formatSecond();
		this.index = parseFloat(this.currTime/this.totalTime);
		this.showProgress(this.index);
		this.showPlayTime(this.getPlayStatusObj());
	}
	this.getPlayStatusObj = function(){//返回播放状态
		var playStatus = {};
		playStatus.currTime = this.currTime;
		playStatus.totalTime = this.totalTime;
		playStatus.volume = this.getVolume();
		return playStatus;
	}
	this.setPlayUrl = function(_playUrl){//写入播放url
		this.playUrl = _playUrl;
		this.myMedia.source = this.playUrl;
		if(typeof(CA) == "undefined")this.myMedia.setPlaySrc(this.playUrl);
	}
	this.reloadAudio = function(_function){//重新加载播放
		try{
			this.clearTimer();
			this.pause();
			this.myMedia.refresh();
			this.play();
			this.startTimer();
			if(typeof(_function) !== "undefined")_function();
		}catch(e){
			alert("切换歌曲失败");	
		}
	}
	this.mute = function(_function){
		var _vol = this.getVolume();//静音之前保存当前音量
		if(this.myMedia.getMute() == 0){//当前值1为静音，0为非静音
			this.myMedia.audioMute();//静音
		}else{//取消静音 同时重新设置音量
			this.myMedia.audioUnmute();//恢复
		}
		//DataAccess.setInfo ("MediaSetting","OutputVolumn",_vol.toString());
		this.myMedia.volume = _vol;

		if(typeof(_function) === "function"){
			_function();
		}
	}
	this.getVolume = function(){
		return parseInt(DataAccess.getInfo ("MediaSetting","OutputVolumn"));	
	}
	this.setVolume = function(_value,_function){
		this.myMedia.audioUnmute();//解除静音
		//this.myMedia.volume = _value;
		DataAccess.setInfo ("MediaSetting","OutputVolumn",_value+'');
		if(typeof(_function) === "function"){
			_function();
		}
	}
	this.plusVolume = function(_function){//加音量
		var _vol = this.getVolume() + 1;
		_vol = (_vol >= 32) ? 32 : _vol;
		this.setVolume(_vol,_function);
	}
	this.reduceVolume = function(_function){//减音量	
		var _vol = this.getVolume() - 1;
		_vol = (_vol <= 0) ? 0 : _vol;
		this.setVolume(_vol,_function);
	}
	this.showProgress = function(_index){}
	this.showPlayTime = function(_obj){}
	this.initVolume = function(_obj){}
	this.last = function(){}
	this.next = function(){}
}

if(typeof MediaPlayer == 'undefined'){
	MediaPlayer=function(){
		this.id=null;
		this.position='1,0,0,0,0';
		this.source='';
		this.currentPoint=0;//单位为秒
		this.player=null;
		this.currTimer=null;
		this.volume=20;
		this.isInstanceDom=false;
		this.init = function(){};
		this.createPlayerInstance = function(type,displayLevel){
			if(type=='audio'){
				this.player = document.createElement('audio');
				document.body.appendChild(this.player);
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
			// 获得媒体总长时间，如1:22:30
			var t = this.player.duration;//秒
			return t;
		};
		this.audioUnmute = function(){
			//取消静音
			this.volume=0;
		};
		this.audioMute = function(){
			this.volume=20;
		};
		this.setPlaySrc = function(){
			this.player.src = this.source;	
		};
		this.pause = function(){
			this.player.pause();
		};
		this.play = function(){
			//播放
			this.player.play();
			if(this.currTimer != null){
				clearInterval(this.currTimer);
				this.currTimer = null;
			}
			this.currTimer = setInterval('playObj.myMedia.getCurrentPoint()',200);
		};
		this.getCurrentPoint = function(){
			this.currentPoint = this.player.currentTime;
			if(this.currentPoint == this.getMediaDuration()){//播放结束
				clearInterval(this.currTimer);
				this.currTimer = null;
				nextPlay();
			}
		};
		this.setCurrentPoint = function(_point){
			this.player.currentTime = this.currentPoint;
		};
		this.refresh = function(){
			//刷新播放
			if(this.point===0){
				this.currentPoint = 0;
			} else {
				this.player.currentTime = 0;
			}
		};
		return this;
	}
	var DataAccess = {
		getInfo : function(_str0,_str1,_str2){
				
		},
		setInfo : function(_str0,_str1){
				
		}
	}
}

Number.prototype.formatTime=function(){
    // 计算
    var h=0,i=0,s=parseInt(this);
    if(s>59){
        i=parseInt(s/60);
        s=parseInt(s%60);
        if(i > 59) {
            h=parseInt(i/60);
            i = parseInt(i%60);
        }
    }
    // 补零
    var zero=function(v){
        return (v>>0)<10?"0"+v:v;
    };
    return [zero(i),zero(s)].join(":");
};

String.prototype.formatSecond = function(){
	var seconde=0,s="";
	s=this.split(":");
	if(s.length == 0){
		seconde = 0;
	}else if(s.length == 1){
		seconde = parseInt(s[0]);	
	}else if(s.length == 2){
		seconde = parseInt(s[0])*60 + parseInt(s[1]);
	}else if(s.length == 3){
		seconde = parseInt(s[0])*3600 + parseInt(s[1])*60 + parseInt(s[2]);	
	}
	return seconde;
}