
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
		if(this.area=='listContent'&&listContent.index<6){
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
};
var topMenu=new FocusModule({
	id:'menu'
	,colcount:1
	,rowcount:3
	,index:0//当前focus哪项
});
topMenu.init=function(){
	var _self=this;
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
	var old=this.selectIndex;
	this.cancelSelect();
	old++;
	//old=this.$items[old].id.split('-')[1];
	var id=this.index;
	id++;
	$('listContent-'+old).hide();
	this.select();
	$('listContent-'+id).show();
	
	listContent=new FocusModule({
		id:'listContent'
		,colcount:3
		,rowcount:6
		,index:0//当前focus哪项
	});
	listContent.init=function(){
		var _self=this;
		var navItems=$('listContent-'+id).childElem();
		utv.each(navItems,function(i,n){
			_self.addItems($(n));
		});
		this.index=0;
	};
	listContent.init();
	listContent.enter=function(){
		window.location.href=this.getFocusItem().childElem()[2].href;
	};
	return 0;
};
var listContent=null;
/* 
var listContent=new FocusModule({
	id:'listContent'
	,colcount:3
	,rowcount:6
	,index:0//当前focus哪项
});
listContent.init=function(){
	var _self=this;
	var navItems=$('listContent-'+id).childElem();
	utv.each(navItems,function(i,n){
		_self.addItems($(n));
	});
	this.index=0;
};
listContent.enter=function(){
	window.location.href=this.getFocusItem().childElem()[2].href;
}; */







