
function pageLoad(){
	topMenu.init();
}
function pageUnload(){

}
utv.eventCallback=pageEvent;
function pageEvent(keyCode){
	switch(utv.keyboard.getKeyValue(keyCode)){
		case 'up':{
			operation.up();
			break;
		}
		case 'left':{
			operation.left();
			break;
		}
		case 'right':{
			operation.right();
			break;
		}
		case 'down':{
			operation.down();
			break;
		}
		case 'enter':{
			operation.enter();
			break;
		}
		case 'back':{
			operation.back();
			break;
		}
		default :{
			break;
		}
	};
}
var operation={
	area:'topMenu' //listContent
	,left:function(){
		if(this.area=='topMenu'){
			topMenu.left();
			return 0;
		}
		listContent.left();
	}
	,right:function(){
		if(this.area=='topMenu'){
			topMenu.right();
			return 0;
		}
		listContent.right();
	}
	,up:function(){
		if(this.area=='listContent'&&listContent.index<8){
			listContent.blur();
			this.area='topMenu';
			topMenu.focus();
			return;
		}
		listContent.up();
	}
	,down:function(){
		if(this.area=='topMenu'){
			topMenu.blur();
			this.area='listContent';
			listContent.focus();
			return;
		}
		listContent.down();
	}
	,enter:function(){
		if(this.area=='topMenu'){
			topMenu.enter();
			return 0;
		}
		listContent.enter();
	}
	,back : function(){
		goBack();
	}
};
var topMenu=new FocusModule({
	id:'menu'
	,colcount:1
	,rowcount:3
	,index:0//当前focus哪项
});
topMenu.datas = [
	{text:'全 部',id:0}
	,{text:'手机网游',id:1}
	,{text:'手游单机',id:2}
];
topMenu.renderHTML=function(){
	var s='';
	var w=200;
	for(var i=0,len=this.datas.length;i<len;i++){
		s+='<div class="" style="position:absolute;left:'+(i*w)+'px;top:0px;width:200px;text-align:center;">'+this.datas[i].text+'</div>';
	}
	$('menu').html(s);

};
topMenu.init=function(){
	var _self=this;
	this.renderHTML();

	var navItems=$('menu').childElem();
	utv.each(navItems,function(i,n){
		_self.addItems($(n));
	});
	//初始化
	this.focus();
	this.select();
	this.enter();
};
topMenu.afterFocus=function(){
	
};
topMenu.afterSelect=function(){
};
topMenu.afterBlur=function(){
	//this.cancelSelect();
};
topMenu.enter=function(){
	
	this.cancelSelect();
	
	this.select();
	
	listContent.init(this.index);
	
	return 0;
};

listContent=new FocusModule({
	id:'listContent'
	,colcount:3
	,rowcount:8
	,index:0//当前focus哪项
});
listContent.datas=[
	[
		{img : './images/game2.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
	]
	,[
		{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
	]
	,[
		{img : './images/game1.png',text : '愤怒的小鸟',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game1.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
		,{img : './images/game2.png',text : '愤怒的小鸟1',href : '#'}
	]
];
listContent.renderHTML=function(menuIndex){
	var s='';
	var len=this.datas[menuIndex].length;
	if(len>=24){
		len=24;
	}
	//文字不要超过5个中文字
	for(var i=0;i<len;i++){
		s+='<div class="" style="display:inline-block;margin-left:36px;margin-top:20px;position:relative;vertical-align: top;float:left;"><div style="width:98px;height:98px;"><img src="'+this.datas[menuIndex][i].img+'" /><div class="focusDiv" style=""></div></div><div style="height:30px;line-height:30px;width:98px;text-align:center;overflow:hidden;font-size:16px;">'+this.datas[menuIndex][i].text+'</div><a href="'+this.datas[menuIndex][i].href+'" class="linkGo"><!-- 跳转连接地址 --></a></div>';
	}
	$('listContent').html(s);
};
listContent.init=function(menuIndex){
	var _self=this;
	this.renderHTML(menuIndex);
	_self.clearItems();
	var navItems=$('listContent').childElem();
	utv.each(navItems,function(i,n){
		_self.addItems($(n));
	});
	this.index=0;
};
listContent.enter=function(){
	window.location.href=this.getFocusItem().childElem()[2].href;
	alert(this.getFocusItem().childElem()[2].href);
};







