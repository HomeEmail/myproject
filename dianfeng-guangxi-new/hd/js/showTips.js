// JavaScript Document
var showTips = {
	coverBg : null,
	title_div : null,
	title : "",
	contentDiv : null,
	context : "",
	btnType : 0,
	btnPos : 0,
	preEventFn : "",
	init : function(_div,_title,_contentDiv,_context,_btnType){
		this.coverBg = _div;
		this.title_div = _title.split("|")[0];
		this.title = _title.split("|")[1];
		this.contentDiv = _contentDiv.split("|")[0];
		this.context = _contentDiv.split("|")[1];
		this.btnType = _btnType;
		this.$(this.title_div).innerText = this.title;
		this.$(this.contentDiv).innerText = this.context;
		this.$(this.coverBg).style.opacity = 1;
		this.$(this.coverBg).style.visibility = "visible";
	},
	onEventHandle : function(_preEventFn){
		this.preEventFn = _preEventFn;
		document.onkeydown = this.delegateEvent;
		if(document.onkeypress!==null){
			document.onkeypress = this.delegateEvent;
		}
	},
	offEventHandle : function(){
		document.onkeydown = this.preEventFn;
		if(document.onkeypress!==null){
			document.onkeypress = this.preEventFn;
		}
	},
	delegateEvent : function(_event){
		if(_event.type=='keydown'){
			document.onkeypress = null;
		}
		var keycode = _event.which;
		var code = Event(_event);
		switch(code){
			case "KEY_LEFT": //
				showTips.changeFocus(-1);
				return 0;
				break;
			case "KEY_RIGHT": //
				showTips.changeFocus(1);
				return 0;
				break;
			case "KEY_SELECT": //	
				showTips.doSelect();
				return 1;
				break;
			case "KEY_EXIT":
			case "KEY_BACK":
				showTips.doSelect();
				return false;
				break;
			default:
				break;
		}	
	},
	focusPos : [418,738], //焦点left值
	changeFocus : function(_num){
		if(showTips.btnType == 0)return;
		showTips.btnPos += _num;
		if(showTips.btnPos < 0){
			showTips.btnPos = 0;
			return;
		}else if(showTips.btnPos > 1){
			showTips.btnPos = 1;
			return;	
		}
		$("btnFocus").style.left = showTips.focusPos[showTips.btnPos] +"px";
	},
	doSelect : function(){
		if(this.btnPos == 0){
			showTips.close(showTips.sure);	
		}else if(this.btnPos == 1){
			showTips.close(showTips.cancel);
		}	
	},
	$ : function(id){
		return document.getElementById(id);
	},
	$append : function(n,node){
		if(!!!node){
			node=document.body;
		}
		node.appendChild(n);
	},
	hide : function(){
		this.$(this.coverBg).style.opacity = 0;
		this.$(this.coverBg).style.visibility = "hidden";
	},
	close : function(fn){//关闭弹层，还原事件接管
		this.hide();
		this.offEventHandle();
		!!fn&&fn();
	}
}