document.onkeydown = grabEvent;
if(document.onkeypress!==null){
	document.onkeypress = grabEvent;
}
function grabEvent(_event){
	if(_event.type=='keydown'){
		document.onkeypress = null;
	}
	var code = Event(_event);
	switch(code){
		case "KEY_UP": //
			control.clickTop();
			return 0;
			break;
		case "KEY_DOWN": //
			control.clickDown();
			return 0;
			break;
		case "KEY_LEFT": //
			control.clickLeft();
			return 0;
			break;
		case "KEY_RIGHT": //
			control.clickRight();
			return 0;
			break;
		case "KEY_PAGE_UP": //
			
			return false;
			break;		
		case "KEY_PAGE_DOWN": //
			return false;
			break;	
		case "KEY_SELECT": //	
			control.clickSelect();
			return 0;
			break;
		case "KEY_EXIT":
		case "KEY_BACK":
			
				location.href = pre.backUrl;
				//location.href = hostUrl +"/HiFi_erGe/index.html?menuPos="+ Q.getInt("indexMenuPos",1);
			
			return false;
			break;
		default:
			break;
	}
}

var dataList_this = {
	"menu" : [

	]
}

window.onload = init;
var pre = {
	area : 0, 
	menuPos : 0, 
	page : 0, 
	listPos : 0, 
	keyword : "", 
	backUrl : "",
	init : function(){                       //理解为查找url某个参数，没有则返回默认值。
		this.area = Q.getInt("area",0);
		this.menuPos = Q.getInt("menuPos",0);
		this.page = Q.getInt("page",0);
		this.listPos = Q.getInt("listPos",0);
		this.keyword = Q.getDecoded("keyword") != "null" ? Q.getDecoded("keyword") : "";
		this.backUrl = Q.getDecoded("backUrl") != "null" ? Q.getDecoded("backUrl") : "index.html?menuPos=0";
	} 
}
function init(){
	loadingDiv = $('loadingDiv');
	pre.init();
	ajaxGetMenu();
}

var menuBox = null;
function initMenuBox(){
	menuBox = new showList(8, dataList_this.menu.length, pre.menuPos, 107, window);
	menuBox.focusDiv = "menu_focus";
	menuBox.listHigh = 70;//步长
	menuBox.showType = 1;   //滚动的方式：滚屏
	menuBox.listSign = 0;//表示改变top属性
	menuBox.haveData = function(List){//List.idPos:对象id,List.dataPos:数据id
		$("menu_" + List.idPos).innerText = dataList_this.menu[List.dataPos].title;
	};
	menuBox.notData  = function(List){
		$("menu_" + List.idPos).innerText = "";
	};
	menuBox.startShow();
	$("menu_focus").style.visibility = "visible";
	$('upsignchange').innerHTML='妈妈课堂';
}

var listcontrol = {
	x : 0,
	y : 0,
	xPlace : 7,
	yPlace : 77,
	updataX : 200,
	updataY : 263,
	pageDataLength : 10,
	currPage : 1,
	totalPage : 1,
	dataPos : 0,
	rightTouchout : true,
	prePos : -1,  // 光标修改之前的dataPos,默认-1

	
	init : function(_arr){
//		lightword=0;
		this.x = 0;
		this.y = 0;
		this.pageDataLength = _arr.length > 10 ? 10 : _arr.length;
		this.currPage = dataList_this.menu[control.menuCheckPos].subListPage; //每次切换数据保留当前页码
		this.totalPage = dataList_this.menu[control.menuCheckPos].subListTotalPage;  
		//this.initPlace();
		if(pre.listPos != 0){ //焦点记忆记住返回列表时所在位置
			this.dataPos = pre.listPos;
			pre.listPos = 0;
			this.x = this.dataPos%5;
			this.y = parseInt(this.dataPos/5);
		}
		this.initPlace();
		this.showData();
	},
	initPlace : function(){
		this.dataPos = this.x + this.y*5;
		if(this.prePos != this.dataPos){ //在数据位不改变时不执行改变焦点操作
			if(this.prePos != -1){
				var preObj = dataList_this.menu[control.menuCheckPos].songList[this.prePos];
				//$("reocod_"+ this.prePos).innerHTML = typeof(preObj) != "undefined" ? preObj.name : "";
			}
			$("list_focus").style.top = parseInt(this.yPlace) + parseInt(this.y*this.updataY) +"px";
			$("list_focus").style.left = parseInt(this.xPlace) + parseInt(this.x*this.updataX) +"px";
			if(control.focusArea == 1){  //焦点记忆当所在位置在列表区域
				this.focus();
			}
		}
	},
	focus : function(){
		$("list_focus").style.opacity = 1;
		$("list_focus").style.visibility = 'visible';
		//setTimeout(function(){$("reocod_"+ listcontrol.dataPos).innerHTML = "<marquee>"+dataList_this.menu[control.menuCheckPos].subMenu[control.subMenuCheckPos].songList[listcontrol.dataPos].name +"</marquee>";},300);
	},
	blur : function(){
		$("list_focus").style.opacity = 0;
		$("list_focus").style.visibility = 'hidden';
		//$("reocod_"+ this.dataPos).innerHTML = dataList_this.menu[control.menuCheckPos].subMenu[control.subMenuCheckPos].songList[this.dataPos].name;
	},
	changeX : function(_num){
		this.prePos = this.dataPos;
		this.x += _num;
		if(this.x < 0){
			this.x = 0;
			this.touchLeft();
			return 0;
		}else if(this.x > 4 && this.pageDataLength > 5){
			this.touchRight();
			return 0;
		}else if(this.x > (this.pageDataLength - 1) - this.y*5){
			this.x = (this.pageDataLength - 1) - this.y*5;
			this.touchRight();
			return 0;
		}
		this.initPlace();
	},
	changeY : function(_num){
		this.prePos = this.dataPos;
		this.y += _num;
		if(this.y < 0){
			this.y = 0;
			this.touchTop();
			return 0;
		}else if(this.y > (this.pageDataLength > 5 ? 1 : 0)){
			this.y = this. pageDataLength > 5 ? 1 : 0;
			this.touchBottom();
			return 0;
		}
		if((this.y*5 + this.x) > this.pageDataLength - 1)this.x = 0;
		this.initPlace();
	},
	showData : function(){          //绑数据                                                                        //submenu数据移入
		this.clearData();
		var tmp = "";
		for(var i = 0;i < this.pageDataLength;i++){
			var img = dataList_this.menu[control.menuCheckPos].songList[i].smallImg != "" ? (imgRecordPath + dataList_this.menu[control.menuCheckPos].songList[i].smallImg) : "images/artist_def.png";
			var reocod = dataList_this.menu[control.menuCheckPos].songList[i].name;                     //  tmp临时
			tmp += '<div id="list_0" style="margin:0px 0px 18px 18px; width:182px; height:245px; color:#ffffff; background-color:#480092; float:left;">'
			+'<img id="img_0" src="'+ img +'" width="182" height="182" />'
			+'<div id="reocod_0" style="padding:6px 0px 0px 5px; width:172px; height:51px; line-height:45px; font-size:22px; overflow:hidden;">'+ reocod +'</div>'
			+'</div>';
		}
		$("content").innerHTML = tmp;   //新数据放入
		this.showListPage();       //左下边页面显示
	},
	clearData : function(){
		$("content").innerHTML = "";	
	},
	touchLeft : function(){
		control.focusArea = 0;
		this.blur();
		control.menuFocus("menu_focus","menu_" + menuBox.focusPos);
	},
	touchRight : function(){
		if(this.rightTouchout){
			if(this.pageDataLength > 5 && this.y == 0){
				this.x = 0
				this.y = 1;
				this.initPlace();
			}else{
				//this.x = (this.pageDataLength - 1) - this.y*4;
				if(this.currPage < this.totalPage)this.changePage(1);
			}
		}
	},
	touchTop : function(){
		if(this.currPage > 1)this.changePage(-1);
	},
	touchBottom : function(){
		if(this.currPage < this.totalPage)this.changePage(1);
	},
	changePage : function(_num){
		this.currPage += _num;
		if(this.currPage < 1){
			this.currPage = 1;
			return 0;
		}else if(this.currPage > this.totalPage){
			this.currPage = this.totalPage;
			return 0;
		}
		dataList_this.menu[control.menuCheckPos].subListPage = this.currPage;  //每次翻页保存翻页后显示的页面到数组
		getData.ajaxSubList();
	},
	showListPage : function(){	                      // 页面统计,上下是否高亮
		$("currPage").innerText  = this.currPage;
		$("totalPage").innerText = this.totalPage;
		$("top").style.background = "url(images/"+ (this.currPage == 1 ? "last_false" : "last_true") +".png)";           //通过数字判选字符串选图片上下标签是否高亮。
		$("bottom").style.background = "url(images/"+ (this.currPage == this.totalPage ? "next_false" : "next_true") +".png)";
	}
}

var control = {
	focusArea : 0,//0:主菜单,{1:搜索,2:搜索列表} { 1:列表}
	menuCheckPos : 0,
	para : 0,
	init : function(){
		initMenuBox();
		this.menuCheckPos = pre.menuPos; //焦点记忆，记住当前所在的菜单列
		this.menuFocus("menu_focus","menu_" + this.menuCheckPos);
		this.focusArea = pre.area;
		this.showLayer();
	},
	showLayer : function(){ //显示当前展示面板
			var obj = $("List");
			obj.style.visibility = "visible";
			obj.style.display = "block";
			if(this.focusArea == 0){
				if(dataList_this.menu[this.menuCheckPos].songList.length==0){
					getData.ajaxSubList();
				}else{
					getData.subListFn();
				}
			}else if(this.focusArea == 1){
				this.showArea();
			}
//		}
	},
	clearLayer : function(){ //显示当前展示面板
			var obj = $("List");
			obj.style.visibility = "hidden";
			obj.style.display = "none";
//		}
	},
	changeMenu : function(_num){ //改变主菜单
		if(menuBox.position == dataList_this.menu.length - 1 & _num > 0 || menuBox.position == 0 & _num < 0)return 0;
		menuBox.changeList(_num);//列表焦点在此处发生改变     焦点值menuBox.focusPos也在此处发生改变，但是当从可视最下，再按下时，menuBox.focusPos没改变。导致this.clickSelect();
        
		this.clickSelect(_num);            //
	},
	showArea : function(){  //光标记忆右侧listcontrol操作
		this.menuBlur("menu_focus","menu_" + this.menuCheckPos);
		getData.ajaxSubList();
	},
	menuFocus : function(_focusObj,_textObj){      //新文本高亮
		if(typeof(_focusObj) != "undefined"){
			$(_focusObj).style.opacity = 1;
		}	
		if(typeof(_textObj) != "undefined"){
			$(_textObj).style.color = "#000000";
			$(_textObj).style.fontSize = "26px";
		}
	},
	menuBlur : function(_focusObj,_textObj){            //焦点变淡，文字变淡。
		if(typeof(_focusObj) != "undefined"){
			$(_focusObj).style.opacity = 0.5;
		}	
		if(typeof(_textObj) != "undefined"){
			$(_textObj).style.color = "#FFFFFF";
			$(_textObj).style.fontSize = "24px";
		}
	},
	clickmenuBlur : function(_focusObj,_textObj){            //焦点变淡，文字变淡。
		if(typeof(_focusObj) != "undefined"){
			$(_focusObj).style.opacity = 0.5;
		}	
		if(typeof(_textObj) != "undefined"){
			$(_textObj).style.color = "#000000";
		}
	},
	clickTop : function(){

			if(this.focusArea == 0){
				this.changeMenu(-1);
			}else if(this.focusArea == 1){
				listcontrol.changeY(-1);
			}
	},
	clickDown : function(){
			if(this.focusArea == 0){
				this.changeMenu(1);
			}else if(this.focusArea == 1){
				listcontrol.changeY(1);
			}
	},
	clickRight : function(){
			if(this.focusArea == 0 && dataList_this.menu[this.menuCheckPos].songList.length > 0){
				this.focusArea = 1;
				this.clickmenuBlur("menu_focus","menu_" + menuBox.focusPos);
				listcontrol.focus();
			}else if(this.focusArea == 1){
				listcontrol.changeX(1);
			}
	},
	clickLeft : function(){
				listcontrol.changeX(-1);
	},
	lastFocusPos:0,
	clickSelect : function(_num){
		if(this.focusArea == 0){//菜单
			if(this.menuCheckPos != menuBox.position){//可以点击
				this.clearLayer();   //清空当前submenu页面
				this.menuBlur("menu_focus","menu_" + this.lastFocusPos);  //去掉前一位置的高亮文字
				this.menuCheckPos = menuBox.position;
				this.lastFocusPos = menuBox.focusPos;
				this.showLayer();//展现当前的新页面

				this.menuFocus("menu_focus","menu_" + menuBox.focusPos);//新文本高亮  this.menuCheckPos可以改成其他参数。
				if (menuBox.position>2) {                           //左侧菜单，上下三角形的的高亮
					$('upsignlighting').style.visibility="visible";
				} else if ( menuBox.position==0){
					$('upsignlighting').style.visibility="hidden";
				}
				if (menuBox.position==dataList_this.menu.length-1) {
					$('downsignlighting').style.visibility="hidden";
				} else if ( menuBox.position<2){
					$('downsignlighting').style.visibility="visible";
				}
				
			}
		}else if(this.focusArea == 1){//右边列表
			var albumId = dataList_this.menu[this.menuCheckPos].songList[listcontrol.dataPos].id;
			var selfUrl = "list.html?menuPos="+ this.menuCheckPos +"&page="+ listcontrol.currPage +"&listPos="+ listcontrol.dataPos +"&area=1&backUrl="+ Q.encode(pre.backUrl);
			location.href = "album_video_list.html?albumId="+ albumId +"&backUrl="+ Q.encode(selfUrl);				
		}
	}
}

var getData = {  //显示数据
	ajaxSubList : function(){  //获取二级栏目下的列表
		var currPage = 1;
		if(pre.page != 0){ //记住页面返回时，所在第几页
			dataList_this.menu[control.menuCheckPos].subListPage = pre.page;
			currPage = dataList_this.menu[control.menuCheckPos].subListPage;
			pre.page = 0;
		}else{
			currPage = dataList_this.menu[control.menuCheckPos].subListPage;
		}
		var serverUrlList = serverUrl + "hifiData/albumByColumn.action?columnId="+ dataList_this.menu[control.menuCheckPos].id +"&pageno="+ currPage +"&size=10";
		ajaxGetSubList(serverUrlList,getData.subListFn);
	},
	subListFn : function(){
		listcontrol.init(dataList_this.menu[control.menuCheckPos].songList);
		if(control.focusArea == 1)listcontrol.focus();  //焦点记忆，当数据在右边列表时，执行列表focus
	}
}


function ajaxGetMenu(){
	showLoadingDiv();
	if(req != null){
		req = null;
	}
	req = ajax({
		url: serverUrl +"hifiHome/columnList.action?urlCode=hifiyinle_2615",
		type: "GET", //HTTP 请求类型,GET或POST
		dataType: "html", //请求的文件类型html/xml
		onSuccess: function(html){ //请求成功后执行[可选]
			hideLoadingDiv();
			var json = eval("(" + html + ")");
			if(json.code == 0){
				var dataLength = typeof(json.data) != "undefined" ? json.data.length : 0;
				for(var i = 0; i < dataLength;i++){
					var dataObj = {};
					dataObj.id = json.data[i].id;
					dataObj.title = json.data[i].name;
					dataObj.subListPage = 1;
					dataObj.subListTotalPage = 1;
					dataObj.songList = [];
					dataList_this.menu.push(dataObj);
				}
				control.init();
			}else{
				showTips.init("tips","t_title|温馨提示","t_content|系统繁忙,请稍后再试!",0);
				showTips.onEventHandle(_grabEvent);//事件接管		
			}
		},
		onComplete:function(){
			hideLoadingDiv();
			req = null;
		},
		onError:function(){ //请求失败后执行[可选]
			hideLoadingDiv();
			showTips.init("tips","t_title|温馨提示","t_content|系统繁忙,请稍后再试!",0);
			showTips.onEventHandle(_grabEvent);//事件接管	
		},
        post:"",  
        timeout:7000  
	});	
}

function ajaxGetSubList(_serverUrl,_fn){
	showLoadingDiv();
	if(req != null){
		req = null;
	}
	req = ajax({
		url: _serverUrl,
		type: "GET", //HTTP 请求类型,GET或POST
		dataType: "html", //请求的文件类型html/xml
		onSuccess: function(html){ //请求成功后执行[可选]
			var json = eval("(" + html + ")");
			if(json.code == 0){
				dataList_this.menu[control.menuCheckPos].subListPage = json.data.page;
				dataList_this.menu[control.menuCheckPos].subListTotalPage = json.data.totalPage;
				dataList_this.menu[control.menuCheckPos].songList = [];
				for(var i = 0;i < json.data.list.length;i++){
					var obj = {};
					obj.id = json.data.list[i].id;
					obj.name = json.data.list[i].name;
					obj.smallImg = json.data.list[i].smallImg;
					obj.fileType = json.data.list[i].fileType;					
					dataList_this.menu[control.menuCheckPos].songList.push(obj);
				}
				listcontrol.totalPage = dataList_this.menu[control.menuCheckPos].subListTotalPage;
				listcontrol.currPage = dataList_this.menu[control.menuCheckPos].subListPage;
				_fn();
			}else{
				_fn();	
			}
		},
		onComplete:function(){
			hideLoadingDiv();
			req = null;
		},
		onError:function(){ //请求失败后执行[可选]
			hideLoadingDiv();
			showTips.init("tips","t_title|温馨提示","t_content|系统繁忙,请稍后再试!",0);
			showTips.onEventHandle(_grabEvent);//事件接管	
		},
        post:"",  
        timeout:7000  
	});	
}

//function ajaxGetSearchList(_page,_searchKeyWord,_fn){
//	showLoadingDiv();
//	if(req != null){
//		req.abort();
//		req = null;
//		hideLoadingDiv();
//	}
//	req = ajax({
//		url: serverUrl +"hifiData/search.action?pageno="+ _page +"&size=5&fileType=1&searchKeyWord="+ _searchKeyWord,
//		type: "GET", //HTTP 请求类型,GET或POST
//		dataType: "html", //请求的文件类型html/xml
//		onSuccess: function(html){ //请求成功后执行[可选]
//			hideLoadingDiv();
//			var json = eval("(" + html + ")");
//			if(json.code == 0){
//				searchList.init(json.data);
//				!!_fn&&_fn(json.data);
//			}			
//		},
//		onComplete:function(){
//			hideLoadingDiv();
//			req = null;
//		},
//		onError:function(){ //请求失败后执行[可选]
//			hideLoadingDiv();
//			showTips.init("tips","t_title|温馨提示","t_content|系统繁忙,请稍后再试!",0);
//			showTips.onEventHandle(_grabEvent);//事件接管	
//		},
//      post:"",  
//      timeout:7000  
//	});	
//}