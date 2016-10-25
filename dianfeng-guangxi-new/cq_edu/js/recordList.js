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
			//window.history.back();
			if(keyboard.inputTxt != "" && control.menuCheckPos == 0){
				keyboard.inputTxt = keyboard.inputTxt.substring(0,keyboard.inputTxt.length-1);
				$("keyWords").innerText = keyboard.inputTxt;
			}else{
				location.href = pre.backUrl;
				//location.href = hostUrl +"/HiFi_erGe/index.html?menuPos="+ Q.getInt("indexMenuPos",1);
			}
			return false;
			break;
		default:
			break;
	}
}

var dataList_this = {
	"menu" : [
		{
			"id" : "000",
			"title" : "在线搜索"
		}
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
	init : function(){
		this.area = Q.getInt("area",0);
		this.menuPos = Q.getInt("menuPos",0);
		this.page = Q.getInt("page",0);
		this.listPos = Q.getInt("listPos",0);
		this.keyword = Q.getDecoded("keyword") != "null" ? Q.getDecoded("keyword") : "";
		this.backUrl = Q.getDecoded("backUrl") != "null" ? Q.getDecoded("backUrl") : "index.html";
	} 
}
function init(){
	loadingDiv = $('loadingDiv');
	pre.init();
	ajaxGetMenu();
}

var menuBox = null;
function initMenuBox(){
	menuBox = new showList(6, dataList_this.menu.length, pre.menuPos, 100, window);
	menuBox.focusDiv = "menu_focus";
	menuBox.listHigh = 70;
	menuBox.showType = 1;
	menuBox.listSign = 0;
	menuBox.haveData = function(List){//List.idPos:对象id,List.dataPos:数据id
		$("menu_" + List.idPos).innerText = dataList_this.menu[List.dataPos].title;
	};
	menuBox.notData  = function(List){
		$("menu_" + List.idPos).innerText = "";
	};
	menuBox.startShow();
	$("menu_focus").style.visibility = "visible";
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
	showData : function(){
		this.clearData();
		var tmp = "";
		for(var i = 0;i < this.pageDataLength;i++){
			var img = dataList_this.menu[control.menuCheckPos].songList[i].smallImg != "" ? (imgRecordPath + dataList_this.menu[control.menuCheckPos].songList[i].smallImg) : "images/artist_def.png";
			var reocod = dataList_this.menu[control.menuCheckPos].songList[i].name;
			tmp += '<div id="list_0" style="margin:0px 0px 18px 18px; width:182px; height:245px; color:#ffffff; background:url(images/record_listBg.png); float:left;">'
			+'<img id="img_0" src="'+ img +'" width="182" height="182" />'
			+'<div id="reocod_0" style="padding:6px 0px 0px 5px; width:172px; height:51px; line-height:45px; font-size:22px; overflow:hidden;">'+ reocod +'</div>'
			+'</div>';
		}
		$("content").innerHTML = tmp;
		this.showListPage();
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
	showListPage : function(){	
		$("currPage").innerText  = this.currPage;
		$("totalPage").innerText = this.totalPage;
		$("top").style.background = "url(images/"+ (this.currPage == 1 ? "last_false" : "last_true") +".png)";
		$("bottom").style.background = "url(images/"+ (this.currPage == this.totalPage ? "next_false" : "next_true") +".png)";
	}
}

var control = {
	focusArea : 0,//0:主菜单,{1:搜索,2:搜索列表} { 1:列表}
	menuCheckPos : 0,
	init : function(){
		initMenuBox();
		this.menuCheckPos = pre.menuPos; //焦点记忆，记住当前所在的菜单列
		this.menuFocus("menu_focus","menu_" + this.menuCheckPos);
		this.focusArea = pre.area;
		this.showLayer();
	},
	showLayer : function(){ //显示当前展示面板
		if(this.menuCheckPos == 0){  //搜索
			var obj = $("search_layer");
			obj.style.visibility = "visible";
			obj.style.display = "block";
			if(this.focusArea != 0){ //当前所在位置不是0，表示焦点记忆后的结果即要去保存下一级传过来的搜索关键字同时加载数据
				keyboard.inputTxt = pre.keyword;
				keyboard.init();
				if(keyboard.inputTxt != ""){
					searchList.searchWord = keyboard.inputTxt;
					ajaxGetSearchList(pre.page,searchList.searchWord);
				}
			}
		}else{
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
		}
	},
	clearLayer : function(){ //显示当前展示面板
		if(this.menuCheckPos == 0){  //搜索
			var obj = $("search_layer");
			obj.style.visibility = "hidden";
			obj.style.display = "none";
		}else{
			var obj = $("List");
			obj.style.visibility = "hidden";
			obj.style.display = "none";
		}
	},
	changeMenu : function(_num){ //改变主菜单
		if(menuBox.position == dataList_this.menu.length - 1 & _num > 0 || menuBox.position == 0 & _num < 0)return 0;
		menuBox.changeList(_num);
		this.clickSelect();
	},
	showArea : function(){  //光标记忆右侧listcontrol操作
		this.menuBlur("menu_focus","menu_" + this.menuCheckPos);
		getData.ajaxSubList();
	},
	menuFocus : function(_focusObj,_textObj){
		if(typeof(_focusObj) != "undefined"){
			$(_focusObj).style.opacity = 1;
		}	
		if(typeof(_textObj) != "undefined"){
			$(_textObj).style.color = "#ffffff";
			$(_textObj).style.fontSize = "26px";
		}
	},
	menuBlur : function(_focusObj,_textObj){
		if(typeof(_focusObj) != "undefined"){
			$(_focusObj).style.opacity = 0.3;
		}	
		if(typeof(_textObj) != "undefined"){
			$(_textObj).style.color = "#666666";
			$(_textObj).style.fontSize = "24px";
		}
	},
	clickTop : function(){
		if(this.menuCheckPos == 0){
			if(this.focusArea == 0){
				this.changeMenu(-1);
			}else if(this.focusArea == 1){
				keyboard.clickTop();
			}else if(this.focusArea == 2){
				searchList.clickTop();
			}			
		}else{
			if(this.focusArea == 0){
				this.changeMenu(-1);
			}else if(this.focusArea == 1){
				listcontrol.changeY(-1);
			}
		}
	},
	clickDown : function(){
		if(this.menuCheckPos == 0){
			if(this.focusArea == 0){
				this.changeMenu(1);
			}else if(this.focusArea == 1){
				keyboard.clickDown();
			}else if(this.focusArea == 2){
				searchList.clickDown();
			}			
		}else{
			if(this.focusArea == 0){
				this.changeMenu(1);
			}else if(this.focusArea == 1){
				listcontrol.changeY(1);
			}
		}
	},
	clickRight : function(){
		if(this.menuCheckPos == 0){
			if(this.focusArea == 0){
				this.focusArea = 1;
				this.menuBlur("menu_focus","menu_" + this.menuCheckPos);
				keyboard.focus();
			}else if(this.focusArea == 1){
				keyboard.clickRight();
			}			
		}else{
			if(this.focusArea == 0 && dataList_this.menu[this.menuCheckPos].songList.length > 0){
				this.focusArea = 1;
				this.menuBlur("menu_focus","menu_" + this.menuCheckPos);
				listcontrol.focus();
			}else if(this.focusArea == 1){
				listcontrol.changeX(1);
			}
		}
	},
	clickLeft : function(){
		if(this.menuCheckPos == 0){
			if(this.focusArea == 1){
				keyboard.clickLeft();
			}else if(this.focusArea == 2){
				searchList.clickLeft();
			}			
		}else{
			if(this.focusArea == 1){
				listcontrol.changeX(-1);
			}
		}
	},
	clickSelect : function(){
		if(this.focusArea == 0){
			if(this.menuCheckPos != menuBox.focusPos){//搜索区域，当前未选中搜索时，可以点击
				this.clearLayer();
				this.menuBlur("menu_focus","menu_" + this.menuCheckPos);
				this.menuCheckPos = menuBox.position;
				this.showLayer();
				this.menuFocus("menu_focus","menu_" + this.menuCheckPos);
			}
		}else if(this.focusArea == 1){
			if(this.menuCheckPos == 0){ //menuCheckPos==0，当前在搜索二级即九宫格操作
				keyboard.doSelect();
			}else{ //当前一级菜单不在搜索
				var albumId = dataList_this.menu[this.menuCheckPos].songList[listcontrol.dataPos].id;
				var selfUrl = "recordList.html?menuPos="+ this.menuCheckPos +"&page="+ listcontrol.currPage +"&listPos="+ listcontrol.dataPos +"&area=1&backUrl="+ Q.encode(pre.backUrl);
				location.href = "album.html?albumId="+ albumId +"&backUrl="+ Q.encode(selfUrl);	
			}
		}else if(this.focusArea == 2){
			if(this.menuCheckPos == 0){ //menuCheckPos==0，当前在搜索三级即搜索结果
				var typeTemp = searchList.dataList.list[searchList.focusPos].contentType;
				var id = searchList.dataList.list[searchList.focusPos].contentId;
				var selfUrl = "recordList.html?menuPos="+ this.menuCheckPos +"&page="+ searchList.currPage +"&keyword="+ searchList.searchWord +"&area=1&backUrl="+ Q.encode(pre.backUrl);
				if(typeTemp == 0){ //艺术家
					location.href = "albumList_singer.html?artisId="+ id +"&backUrl="+ Q.encode(selfUrl);
				}else if(typeTemp == 1){ //专辑
					location.href = "album.html?albumId="+ id +"&backUrl="+ Q.encode(selfUrl);
				}else if(typeTemp == 2){  //单曲
					location.href = "album_video.html?singleId="+ id +"&backUrl="+ Q.encode(selfUrl);
				}
			}
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

var keyboard = { //wd
	area : 0, //0:搜索按钮；1,九宫格
	subFlag : false,
	inputTxt : "",
	x : 0,
	y : 0,
	xMove : 118,
	yMove : 94,
	dataList : [
		[1],
		[2,"A","B","C"],
		[3,"D","E","F"],
		[4,"G","H","I"],
		[5,"J","K","L"],
		[6,"M","N","O"],
		[7,"P","Q","R","S"],
		[8,"T","U","V"],
		[9,"W","X","Y","Z"],
		["删除"],
		[0],
		["清空"]
	],
	init : function(_xMove,_yMove){
		$("keyWords").innerText = this.inputTxt;
		control.focusArea = 1;
		control.menuBlur("menu_focus","menu_" + control.menuCheckPos);
		this.focus();
	},
	initFocus : function(_x,_y){
		this.x = typeof(_x) != "undefined" ? _x : this.x;
		this.y = typeof(_y) != "undefined" ? _y : this.y;
		var obj = $("search_focus");
		if(this.area != 0){
			obj.style.top  = 166 + this.y*this.yMove + "px";
			obj.style.left = 40 + this.x*this.xMove + "px";
			obj.style.width = 145 +"px";
			obj.style.height = (this.y == 3 ? 100 : 125) +"px";
		}else{
			obj.style.top   = 85  +"px";
			obj.style.left  = 40  +"px";
			obj.style.width = 384 +"px";
			obj.style.height = 96 +"px";
		}
	},
	changeX : function(_num){
		if(this.area != 0){
			if(!this.subFlag){
				this.x += _num;
				if(this.x < 0){
					this.x = 0;
					this.touchLeft();
					return 0;
				}else if(this.x > 2){
					if(searchList.pageDataFlag){
						this.touchRight();
					}
					this.x  = 2;
					return 0;
				}
				this.initFocus();
			}
		}else{
			if(_num > 0){
				if(searchList.pageDataFlag){
					this.touchRight();
				}
			}else{
				this.touchLeft();	
			}		
		}
	},
	changeY : function(_num){
		if(this.area != 0){
			if(!this.subFlag){
				this.y += _num;
				if(this.y < 0){
					this.y = 0;
					this.touchTop();
					return 0;
				}else if(this.y > 3){
					this.y  = 3;
					return 0;
				}
				this.initFocus();
			}
		}else{
			this.area = 1;
			this.initFocus();
		}
	},
	touchLeft : function(){
		this.blur();
		control.focusArea = 0;
		control.menuFocus("menu_focus","menu_" + control.menuCheckPos);
	},
	touchRight : function(){
		this.blur();
		control.focusArea = 2;
		$("searchList_focus").style.opacity = 1;
		$("searchList_focus").style.visibility = 'visible';
	},
	touchTop : function(){
		this.area = 0;
		this.initFocus();
	},
	focus : function(){
		$("search_focus").style.display = "block";
	},
	blur : function(){
		$("search_focus").style.display = "none";	
	},
	showSub : function(_arr){
		var arrLength = _arr.length;
		$("keySub_0").innerText = _arr[0];
		$("keySub_1").innerText = _arr[1];
		$("keySub_2").innerText = _arr.length > 4 ? _arr[2] : "OK";
		$("keySub_3").innerText = _arr.length > 4 ? _arr[3] : _arr[2];
		$("keySub_4").innerText = _arr.length > 4 ? _arr[4] : _arr[3];
	},
	doSelect : function(){
		if(this.area != 0){
			if(!this.subFlag){
				if(this.dataList[this.x+this.y*3].length > 1){
					this.subFlag = true;
					this.showSub(this.dataList[this.x+this.y*3]);
					$("keyboard_sub").style.display = "block";
				}else{
					if(this.x == 0 && this.y == 3){
						this.inputTxt = this.inputTxt.substring(0,this.inputTxt.length-1);
					}else if(this.x == 2 && this.y == 3){
						this.inputTxt = "";
					}else{
						this.inputTxt += this.dataList[this.x+this.y*3];
					}
					$("keyWords").innerText = this.inputTxt;
				}
			}else{
				this.inputTxt += this.dataList[this.x+this.y*3].length > 4 ? this.dataList[this.x+this.y*3][2] : this.dataList[this.x+this.y*3][0];
				$("keyWords").innerText = this.inputTxt;
				this.subFlag = false;
				$("keyboard_sub").style.display = "none";
			}
		}else{ //点击请求搜索结果
			searchList.searchWord = this.inputTxt;
			ajaxGetSearchList(1,searchList.searchWord);
		}
	},
	clickTop : function(){
		if(!this.subFlag){
			this.changeY(-1);
		}else{
			this.inputTxt += this.dataList[this.x+this.y*3][0];
			$("keyWords").innerText = this.inputTxt;
			this.subFlag = false;
			$("keyboard_sub").style.display = "none";
		}
	},
	clickDown : function(){
		if(!this.subFlag){
			this.changeY(1);
		}else{
			this.inputTxt += this.dataList[this.x+this.y*3].length > 4 ? this.dataList[this.x+this.y*3][4] : this.dataList[this.x+this.y*3][3];
			$("keyWords").innerText = this.inputTxt;
			this.subFlag = false;
			$("keyboard_sub").style.display = "none";
		}
	},
	clickLeft : function(){
		if(!this.subFlag){
			this.changeX(-1);
		}else{
			this.inputTxt += this.dataList[this.x+this.y*3][1];
			$("keyWords").innerText = this.inputTxt;
			this.subFlag = false;
			$("keyboard_sub").style.display = "none";
		}
	},
	clickRight : function(){
		if(!this.subFlag){
			this.changeX(1);
		}else{
			this.inputTxt += this.dataList[this.x+this.y*3].length > 4 ? this.dataList[this.x+this.y*3][3] : this.dataList[this.x+this.y*3][2];
			$("keyWords").innerText = this.inputTxt;
			this.subFlag = false;
			$("keyboard_sub").style.display = "none";
		}
	}
}

var searchList = {
	focusPos : 0,
	currPage : 1,
	totalPage : 1,
	currLength : 0,
	pageDataFlag : false, //搜索无结果false，否则true
	searchWord : "",
	dataList : [],
	init : function(_arr){
		this.focusPos = 0;
		this.getPageData(_arr);
	},
	initFocus : function(_focusPos){
		if(typeof(_focusPos) != "undefined")this.focusPos=_focusPos;
		$("searchList_focus").style.top = -22 + this.focusPos*96 +"px";
	},
	changeFocus : function(_num){
		this.focusPos += _num;
		if(this.focusPos < 0){
			this.focusPos = 0;
			this.touchTop();
			return 0;
		}else if(this.focusPos > this.currLength - 1){
			this.focusPos = this.currLength - 1;
			this.touchBottom();
			return 0;
		}
		this.initFocus();		
	},
	touchTop : function(){
		if(this.currPage != 1){
			this.currPage--;
			var that = this;
			ajaxGetSearchList(this.currPage,this.searchWord,function(_arr){that.getPageData(_arr)});
		}
	},
	touchBottom : function(){
		if(this.currPage < this.totalPage){
			this.currPage++;
			var that = this;
			ajaxGetSearchList(this.currPage,this.searchWord,function(_arr){that.getPageData(_arr)});
		}
	},
	getPageData : function(_arr){
		this.dataList = _arr;
		this.currPage = this.dataList.page;
		this.totalPage = this.dataList.totalPage;
		this.currLength = typeof(this.dataList.list) != "undefined" ? (this.dataList.list.length > 5 ? 5 : this.dataList.list.length) : 0;
		this.pageDataFlag = this.currLength > 0 ? true : false;
		this.showData();
		this.initFocus(0);
	},
	showData : function(){
		if(this.currLength > 0){
			$("no_list").style.display = "none";
			$("no_list").style.visibility = "hidden";
			$("search_list").style.display = "block";
			$("search_list").style.visibility = "visible";
			this.clearData();
			for(var i = 0;i < this.currLength;i++){
				$("searchList_txt_"+ i).innerText = this.dataList.list[i].name; 
				$("searchList_img_"+ i).src = this.dataList.list[i].smallImg != "" ? (imgRecordPath + this.dataList.list[i].smallImg) : (this.dataList.list[i].contentType == 0 ? "images/artist_def.png" : "images/music_def.png"); 
			}
			this.showPage();
		}else{
			$("search_list").style.display = "none";
			$("search_list").style.visibility = "hidden";
			$("no_list").style.display = "block";
			$("no_list").style.visibility = "visible";
		}
	},
	clearData : function(){
		for(var i = 0;i < 5;i++){
			$("searchList_txt_"+ i).innerText = "";
			$("searchList_img_"+ i).src = "images/tm.gif"; 
		}
	},
	showPage : function(){
		$("search_currPage").innerText = this.currPage;
		$("search_totalPage").innerText = this.totalPage;
	},
	changePage : function(_num){ //用于翻页键
		if(_num > 0){
			if(this.currPage >= this.totalPage){
				return 0;
			}else{
				this.currPage++;
				this.focusPos = 0;
				this.initFocus();
				this.getPageData();
			}
		}else{
			if(this.currPage <= 0){
				return 0;
			}else{
				this.currPage--;
				this.focusPos = 0;
				this.initFocus();
				this.getPageData();
			}
		}
	},
	focus : function(){
		$("searchList_focus").style.opacity = 1;
		$("searchList_focus").style.visibility = 'visible';
	},
	blur : function(){
		$("searchList_focus").style.opacity = 0;
		$("searchList_focus").style.visibility = 'hidden';
	},
	clickTop : function(){
		this.changeFocus(-1);
	},
	clickDown : function(){
		this.changeFocus(1);
	},
	clickLeft : function(){
		this.blur();
		control.focusArea = 1;
		keyboard.focus();
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

function ajaxGetSearchList(_page,_searchKeyWord,_fn){
	showLoadingDiv();
	if(req != null){
		req.abort();
		req = null;
		hideLoadingDiv();
	}
	req = ajax({
		url: serverUrl +"hifiData/search.action?pageno="+ _page +"&size=5&fileType=1&searchKeyWord="+ _searchKeyWord,
		type: "GET", //HTTP 请求类型,GET或POST
		dataType: "html", //请求的文件类型html/xml
		onSuccess: function(html){ //请求成功后执行[可选]
			hideLoadingDiv();
			var json = eval("(" + html + ")");
			if(json.code == 0){
				searchList.init(json.data);
				!!_fn&&_fn(json.data);
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