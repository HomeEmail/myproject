var $G = {};

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_VOLUP = 447;
var KEY_VOLDOWN = 448;
var KEY_OK = 13;
var KEY_MUTE = 449;
var KEY_EXIT = 27;
var KEY_PAGEUP = 306;
var KEY_PAGEDOWN = 307;
var KEY_INFO = 73;
var KEY_BACK = 640;
var KEY_POSITION = 3864; // 定位键
var MUTE_FLAG;
var SEEK_SHOW_FLAG;
var VOLUME_SHOW_FLAG;
var PLAYING_FLAG;
var PAUSE_SHOW_FLAG;
var PRE_SEEK_FLAG;
var EXIT_SHOW_FLAG;
var REPLAY_SHOW_FLAG;
var FOCUS_FLAG;
var PRESEEK_TIMER;
var CURRTIME_TIMER;
var SEEK_TIMER;
var VOLUME_TIMER;
var PAUSE_TIMER;
var isShowPosition;
//var mp = new MediaPlayer();
var duration = 0;;
SEEK_SHOW_FLAG = false;
VOLUME_SHOW_FLAG = false;
PAUSE_SHOW_FLAG = false;
PRE_SEEK_FLAG = false;
EXIT_SHOW_FLAG = false;
REPLAY_SHOW_FLAG = false;
FOCUS_FLAG = true;

var mp = new MediaPlayer();

mp.setVideoDisplayMode(0);
mp.setSingleMedia(hlsplay);
mp.setCurrentAudioChannel("Stereo");
//mp.setVideoDisplayArea(69, 75, 819, 507);
mp.setVideoDisplayArea(0, 0, 1280, 720);
mp.refreshVideoDisplay();
mp.playFromStart();

function doVolUp() {
	var intVolume = mp.getVolume();
	if (PRE_SEEK_FLAG == true || SEEK_SHOW_FLAG == true) {
		//hiddenSeekControl();
	}
	clearTimeout(VOLUME_TIMER);

	if (intVolume >= 31) {
		//alert("It is the max volume!") ;
	} else {
		intVolume += 1;
		mp.setVolume(intVolume);
	}
	showVolume();
}

function grabPress(e) {
	var val = e.which || e.keyCode;
	Utility.println("val  " + val);
	switch (val) {
		case KEY_VOLUP:
			e.preventDefault();
			doVolUp();
			break;
		case KEY_VOLDOWN:
			e.preventDefault();
			doVolDown();
			break;
		case KEY_RIGHT:
			e.preventDefault();
			//doRight();
			break;
		case KEY_LEFT:
			e.preventDefault();
			//doLeft();
			break;
		case KEY_MUTE:
			e.preventDefault();
			doMute();
			break;
		case KEY_OK:
			e.preventDefault();
			//doOK();
			break
		case 114:
		case KEY_EXIT:
		case KEY_BACK:
			//e.preventDefault();
			window.history.back();
			document.location.back();
			return 0;
			break;
		case KEY_INFO:
			//			e.preventDefault();
			//			showInfo();
			break;
		case KEY_POSITION:
			//          isShowPosition = true;
			//          setDisplay_loc(isShowPosition);
			//			hiddenVolume();
			break;
		case 40200:
			{
					document.location.reload();
			}
			break;
		case 40201:
			//alert("播放开始");
			Utility.println("播放开始");
			//showDuration();
			break;
		case 40202:
			{
				var eventId = event.userInt;
				var errJson = Utility.getEvent(40202, eventId);
				var JsonObj = eval("(" + errJson + ")");
				var errCode = JsonObj.errcode;
				switch (errCode) {
					case 35:
						Utility.println("解码器出错");
						break;
					case 36:
						Utility.println(" 媒体文件不存在或文件格式出错");
						break;
					case 37:
						Utility.println("播放定位出错");
						break;
					case 38:
						Utility.println("暂停操作失败");
						break;
					case 39:
						Utility.println("状态恢复失败");
						break;
					case 40:
						Utility.println("设置速率失败");
						break;
					case 41:
						{
							var httpcode = JsonObj.httpCode;
							Utility.println("网络异常 " + "http code" + httpcode);
						}
						break;
					case 42:
						Utility.println("读取数据超时");
						break;
					default:
						break;
				}
			}
			break;		
		case 40406:
			{
				var eventId = event.userInt;
				var errJson = Utility.getEvent(40406, eventId);
				Utility.println(errJson);
				var JsonObj = eval("(" + errJson + ")");
				var value = JsonObj.value;
				Utility.println("等待播放，缓存数据的进度值： " + value);
			}
			break;
		case 40407:
			Utility.println("停止播放器操作成功");
			break;
		case 40408:
			Utility.println("启动播放器操作成功");
			break;
		case 40409:
			Utility.println("暂停播放器操作成功");
			break;
		case 40410:
			Utility.println("选时播放定位成功");
			break;
		default:
			break;
	}
}

function doVolDown() {
	var intVolume = mp.getVolume();
	if (PRE_SEEK_FLAG == true || SEEK_SHOW_FLAG == true) {
		//hiddenSeekControl();
	}
	clearTimeout(VOLUME_TIMER);

	if (intVolume <= 0) {
		//alert("It is the min volume !" );
	} else {
		intVolume -= 1;
		mp.setVolume(intVolume);
	}
	showVolume();
}
function doMute(){
	if(MUTE_FLAG == false){
		//$("g_static").style.visibility = "visible";
		//if(VOLUME_SHOW_FLAG == true)
			//hiddenVolume();
	   	mp.setMuteFlag(1);	
		MUTE_FLAG = true;
	}else{
		//$("g_static").style.visibility = "hidden";
		//if(VOLUME_SHOW_FLAG == false && SEEK_SHOW_FLAG == false)
			//showVolume();
	    mp.setMuteFlag(0);
		MUTE_FLAG = false;
	}
}

function dostop() {
	mp.stop();

}

document.onkeypress = grabPress;
window.onunload = dostop;