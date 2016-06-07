//返回到上一页
function goBack(goBackURL) {
	// typeof 返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined"
	if (typeof(goBackURL) != "undefined" && goBackURL != null && goBackURL != "") {
		window.location.href = goBackURL;
		// window.location.href=document.referrer;
	} else {
		window.history.go(-1);
	}

}


/*
var listView=new ListView();
listView.init=function(){
	
	this.$listItems = $('recommendContentTop').childElem();
	this.totalNum=this.$listItems.length;	
};
*/
function ListView(){
	this.id='';//此列表id值(页面唯一性)
	this.index=0; //当前索引
	this.totalNum = 0; //共有几项
	this.$listItems = []; //存放list项节点(已经过$扩展)
	this.rowcount=0;//一行有几项，当应用于规则列表时有效
	this.colcount=0;//一列有几项，当应用于规则列表时有效
	this.focusCallback=function(){};
	this.blurCallback=function(){};
};
ListView.prototype.init = function(){
	//此方法需重写，处理不同情况的初始化工作
};
ListView.prototype.destory = function(){
	this.id='';
	this.index=0; 
	this.totalNum = 0;
	this.$listItems = []; 
	this.rowcount=0;
	this.colcount=0;
};
ListView.prototype.focusItem = function(i){
	this.index=i;
	this.$listItems[i].addClass('focus');
	this.focusCallback();
};
ListView.prototype.blurItem = function(i){
	
	this.$listItems[i].removeClass('focus');
	
	this.blurCallback();
};
ListView.prototype.getSelectedItem =function(){
	return this.$listItems[this.index];
};
ListView.prototype.addItem = function(ary){
	!!ary && (this.$listItems=this.$listItems.concat(ary));
};
ListView.prototype.jsClassCall = function(dir){
	//处理class挂钩,dir为按键方向up,down,left,right,enter;返回1表示有挂钩处理
	//有js挂钩class时
	var classNames=this.$listItems[this.index].getClass()
		,newIndex=null
	;
	classNames=classNames.split(' ');
	for (var i = classNames.length - 1; i >= 0; i--) {
		if(classNames[i].indexOf('-js-'+dir+'-gotoFocus-')>-1){
			//focus列表其他项，优先级高
			newIndex=parseInt(classNames[i].replace('-js-'+dir+'-gotoFocus-',''),10);
			this.blurItem(this.index);
			this.focusItem(newIndex);
			return 1;
		}
		if(classNames[i].indexOf('-js-'+dir+'-call-')>-1){
			//其他预留的class挂钩
			var fn=classNames[i].replace('-js-'+dir+'-call-','');//得到的字符串如：fnName||parameter1||parameter2
			var fnAry=fn.split('||');
			fn=fnAry.shift();//函数名称
			if(!!this[fn]){
				this[fn](this,fnAry);
			}
			return 1;
		}
	};
	return 0;
};
//添加方向和确定 5个按键 哪个元素的click监听函数
//dir:哪个按键,num:列表里哪个元素,callback:监听函数,callback参数:this
ListView.prototype.on = function(dir,num,callback){
	if(!!!dir || typeof num == 'undefined' || !!!callback){
		return;//参数不对
	}
	!!!this[dir+'On']&&(this[dir+'On']={});
	this[dir+'On'][num]=callback;
};
ListView.prototype.left = function(){
	if(!!this.leftOn && !!this.leftOn[this.index]){
		//交给自定义当前元素方向函数调用
		this.leftOn[this.index](this);
		return;
	}
	
	//在最左边的一列图片上按下左键时，触发该事件??
	if(this.jsClassCall('left')){

		
		
		return;
	}

	var newIndex=null
	;
	//以下是没有js挂钩class时，正常的处理
	newIndex=this.index-1;
	if(newIndex<0){
		return;
	} else {
		this.blurItem(this.index);
		this.index=newIndex;
	}
	this.focusItem(newIndex);
};
ListView.prototype.right = function(){
	if(!!this.rightOn && !!this.rightOn[this.index]){
		//交给自定义当前元素方向函数调用
		this.rightOn[this.index](this);
		return;
	}

	if(this.jsClassCall('right')){
		//已交给挂钩处理了
		return;
	}
	//以下是没有js挂钩class时，正常的处理
	var newIndex=this.index+1;
	if(newIndex>=this.totalNum){
		return;
	} else {
		this.blurItem(this.index);
		this.index=newIndex;
	}
	this.focusItem(newIndex);

};
ListView.prototype.down = function(){
	if(!!this.downOn && !!this.downOn[this.index]){
		//交给自定义当前元素方向函数调用
		this.downOn[this.index](this);
		return;
	}
	if(this.jsClassCall('down')){
		//已交给挂钩处理了
		return;
	}
	//以下是没有js挂钩class时，正常的处理
	if(this.rowcount<=0 || this.colcount<=0){
		return;
	}
	var newIndex=this.index+this.rowcount;
	if(0<=newIndex && newIndex<(this.rowcount*this.colcount) && !!this.$listItems[newIndex]){
		this.blurItem(this.index);
		this.focusItem(newIndex);
	}
};
ListView.prototype.up = function(){
	if(!!this.upOn && !!this.upOn[this.index]){
		//交给自定义当前元素方向函数调用
		this.upOn[this.index](this);
		return;
	}
	if(this.jsClassCall('up')){
		//已交给挂钩处理了
		return;
	}
	//以下是没有js挂钩class时，正常的处理
	if(this.rowcount<=0 || this.colcount<=0){
		return;
	}
	var newIndex=this.index-this.rowcount;
	if(0<=newIndex && newIndex<(this.rowcount*this.colcount) && !!this.$listItems[newIndex]){
		this.blurItem(this.index);
		this.focusItem(newIndex);
	}
};
ListView.prototype.enter = function(){
	if(!!this.enterOn && !!this.enterOn[this.index]){
		//交给自定义当前元素方向函数调用
		this.enterOn[this.index](this);
		return;
	}
	
	
	if(this.jsClassCall('enter')){
		//已交给挂钩处理了
		return;
	}
	
	//以下是没有js挂钩class时，正常的处理
	if(!!!$(this.id+'Link'+this.index)){//模拟光标时，遇到a标签执行该语句
		return;
	}
	var url=$(this.id+'Link'+this.index).href;
	//alert('url:'+url);
	window.location.href=url;
};



//loading
function Loading(opt){
	if(!!!opt) return {};
	this.id=opt.id||'loading';
	this.left=opt.left||'639px';
	this.top=opt.top||'320px';
	if(this.left.indexOf('px')<=-1){
		this.left=this.left+'px';
	}
	if(this.top.indexOf('px')<=-1){
		this.top=this.top+'px';
	}
	this.$container=$(opt.container||document.body);

	this.html='<div id="'+this.id+'" style="display:none;position:absolute;left: '+this.left+';top: '+this.top+';z-index:100;background-color: #000922;opacity: 0.75;padding: 20px;border-radius: 10px;-webkit-border-radius: 10px;"><img src="../res/images/loading.gif" alt="loading..."></div>';

	this.$container.append(this.html);
	this.$el = $(this.id);
}
Loading.prototype.show=function(){
	this.$el.show();
};
Loading.prototype.hide=function(){
	this.$el.hide();
};



//滚动 菜单类
function Menu(opt){
	if(!!!opt) return{};
	this.id=opt.id;//菜单id
	this.showNum=opt.showNum;//视窗内显示几个
	this.$container=$(opt.container);//菜单项父容器
	this.itemSize=opt.itemSize;//每项的高度或宽度，单位px
	this.direction=opt.direction||'tb';//菜单方向；tb：上下垂直；lr：左右横向
	if(this.direction=='tb'){
		this.moveProp='top';
	}else{
		this.moveProp='left';
	}
	this.index=opt.index||0;//当前focus哪项
	this.selectIndex=opt.selectIndex||0;//当前选择的是哪项
	this.$menuItems=[];
	this.menuNames=[];
	this.totalNum=0;
	this.offsetTop=0;//上面溢出几项
	this.offsetBottom=0;//下面溢出集项
	//箭头指示id
	this.lastArrowId=opt.lastArrowId||'';
	this.lastArrowOnId=opt.lastArrowOnId||'';
	this.nextArrowId=opt.nextArrowId||'';
	this.nextArrowOnId=opt.nextArrowOnId||'';
}
//预留的回调接口
Menu.prototype.afterEnter=function(){};
Menu.prototype.afterBlur=function(){};
Menu.prototype.afterFocus=function(){};

Menu.prototype.init=function(){
	this.$menuItems=this.$container.$child();
	this.totalNum=this.$menuItems.length;
	if(this.index>=this.totalNum){
		this.index=0;
		this.selectIndex=0;
	}
	this.$container.css('position','relative');
	this.arrowInit();
};
Menu.prototype.enter=function(){
	this.cancelSelect();//取消前一次光标选中状态
	this.selectIndex=this.index;//改变光标序号

    this.select();//选中
    this.afterEnter();
};
Menu.prototype.getFocusItem=function(){
	return this.$menuItems[this.index];
};
Menu.prototype.focus=function(i){
	if(typeof i == 'undefined'){
      var i=this.index;
    }
    this.$menuItems[i].addClass('focus');
    this.afterFocus();
};
Menu.prototype.blur=function(i){
	if(typeof i == 'undefined'){
      var i=this.index;
    }
    this.$menuItems[i].removeClass('focus');
    this.afterBlur();
};
Menu.prototype.cancelSelect=function(i){
	if(typeof i == 'undefined'){
      var i=this.selectIndex;
    }
    this.$menuItems[i].removeClass('selected');
};
Menu.prototype.getSelectItem=function(){
	return this.$menuItems[this.selectIndex];
};
Menu.prototype.select=function(i){
	if(typeof i == 'undefined'){
      var i=this.index;
    }
    this.index=i;
    this.selectIndex=i;
    
    this.$menuItems[i].addClass('selected');
};
Menu.prototype.last=function(){
	if((this.index-1)<0){
      return;//到顶了
    }
    this.blur();
    this.index--;

    //下一个获得光标的序号<上面溢出的个数,并且下一个获得光标的序号不等于0  时
    if(this.index<=this.offsetTop && this.index!=0){
      //新focus项超出视窗
      this.offsetTop--;
      this.offsetBottom++;
      this.move();
    }
    
    this.focus();
    this.setArrowTips();
    
    //this.enter();
};
Menu.prototype.next=function(){
	if((this.index+1)>=this.totalNum){
      return;//到底了
    }
    this.blur();
    this.index++;
    
    //下一个获得光标的序号>上面溢出的个数+当前页面中能看到的个数
    if(this.index>=(this.offsetTop+this.showNum)){
      //新focus项超出视窗
      this.offsetTop++;
      this.offsetBottom--;
      this.move();
    }
    this.focus();//执行到这一句时，下一个标题获得焦点
    this.setArrowTips();
    
    //this.enter();
};
Menu.prototype.move=function(){
	this.$container.setStyle(this.moveProp,-this.offsetTop*this.itemSize+'px');
};
Menu.prototype.arrowInit=function(){
	//移动容器到正确位置
    if(this.index>=this.showNum){
      this.offsetTop=this.index-(this.showNum-1);
      this.offsetBottom=this.totalNum-this.index-1;
      
      this.move();
    } else if(this.showNum<this.totalNum){
      this.offsetTop=0;
      this.offsetBottom=this.totalNum-this.showNum;
    }
    //初始化箭头提示
    this.setArrowTips();
};
Menu.prototype.setArrowTips=function(){
	if(this.offsetTop<=0){
      //上箭头变暗
      !!$(this.lastArrowId) && $(this.lastArrowId).setVisible();
      !!$(this.lastArrowOnId) && $(this.lastArrowOnId).setHidden();
    } else {
      //上箭头高亮
      !!$(this.lastArrowId) && $(this.lastArrowId).setHidden();
      !!$(this.lastArrowOnId) && $(this.lastArrowOnId).setVisible();
    }
    if(this.offsetBottom<=0){
      //下箭头变暗
      !!$(this.nextArrowId) && $(this.nextArrowId).setVisible();
      !!$(this.nextArrowOnId) && $(this.nextArrowOnId).setHidden();
    } else {
      //下箭头高亮
      !!$(this.nextArrowId) && $(this.nextArrowId).setHidden();
      !!$(this.nextArrowOnId) && $(this.nextArrowOnId).setVisible();
    }
};



//简单的光标模块控制，focus和selected状态
/*

var leftMenu=new FocusModule({
	id:'leftMenu'
	,colcount:4
	,rowcount:1
	,index:1//当前focus哪项
});
leftMenu.init=function(){
	var _self=this;
	var navItems=new utv.Elem('#nav_id').childElem();
	utv.each(navItems,function(i,n){
		_self.addItems(new utv.Elem(n));
	});
};
leftMenu.afterFocus=function(){
	
	this.select();
};
leftMenu.afterSelect=function(){
	if(this.index==1){
		
		return;
	}
};
leftMenu.afterBlur=function(){
	this.cancelSelect();
};
leftMenu.enter=function(){
	if(this.index==0){
		//加入收藏
		qsdtPad.collecting();
		return;
	}
};
*/
function FocusModule(opt){
	if(!!!opt) return;
	this.id=opt.id||new Date().getTime();//此焦点模块id
	this.$items=opt.$items||[];//焦点控制单元数组
	this.index=opt.index||0;//当前focus哪项
	this.selectIndex=opt.selectIndex||0;//当前选中哪项
	this.totalNum=this.$items.length;
	this.colcount=opt.colcount||0;//每列有几个
	this.rowcount=opt.rowcount||0;//每行有几个
}
FocusModule.prototype.addItems=function($item){
	this.$items.push($item);
	this.totalNum=this.$items.length;
};
FocusModule.prototype.clearItems=function(){
	this.$items=[];
};
FocusModule.prototype.setItems=function($items){
	this.$items=$items;
	this.totalNum=this.$items.length;
};
/**自行扩展的接口 begin**/
FocusModule.prototype.init=function(){};
FocusModule.prototype.enter=function(){};
FocusModule.prototype.afterBlur=function(){};
FocusModule.prototype.afterFocus=function(){};
FocusModule.prototype.afterSelect=function(){};
FocusModule.prototype.afterCancelSelect=function(){};
/**自行扩展的接口 end**/
FocusModule.prototype.getFocusItem=function(){
	return this.$items[this.index];
};
FocusModule.prototype.focus=function(i){
	if(typeof i == 'undefined'){
		var i=this.index;
	} else{
		this.index=i;
	}
	this.$items[i].addClass('focus');
	this.afterFocus();
};
FocusModule.prototype.blur=function(i){
	if(typeof i == 'undefined'){
		var i=this.index;
	} 
	this.$items[i].removeClass('focus');
	this.afterBlur();
};
FocusModule.prototype.cancelSelect=function(i){
	if(typeof i == 'undefined'){
      var i=this.selectIndex;
    }
    this.$items[i].removeClass('selected');
    this.afterCancelSelect();
};
FocusModule.prototype.getSelectItem=function(){
	return this.$items[this.selectIndex];
};
FocusModule.prototype.select=function(i){
	if(typeof i == 'undefined'){
      var i=this.index;
    }
    this.selectIndex=i;
    
    this.$items[i].addClass('selected');
    this.afterSelect();
};

FocusModule.prototype.left=function(){
	var newIndex=this.index-1;
	if(newIndex<=0||newIndex>=this.totalNum){
		newIndex=0;
	}
	this.blur();
	this.index=newIndex;
	this.focus();
};
FocusModule.prototype.right=function(){
	var newIndex=this.index+1;
	if(newIndex>=this.totalNum){
		newIndex=this.totalNum-1;
	}
	this.blur();
	this.index=newIndex;
	this.focus();
};
FocusModule.prototype.down = function(){
	if(this.rowcount<=0 || this.colcount<=0){
		return;
	}
	var newIndex=this.index+this.rowcount;
	if(0<=newIndex && newIndex<(this.rowcount*this.colcount) && !!this.$items[newIndex]){
		this.blur();
		this.index=newIndex;
		this.focus();
	}
};
FocusModule.prototype.up = function(){
	if(this.rowcount<=0 || this.colcount<=0){
		return;
	}
	var newIndex=this.index-this.rowcount;
	if(0<=newIndex && newIndex<(this.rowcount*this.colcount) && !!this.$items[newIndex]){
		this.blur();
		this.index=newIndex;
		this.focus();
	}
};




//机顶盒信息
var tvBox={
	getCardId : function(b){
		//获取大卡ID
		if(!!b){
			return CA.card.cardId;
		}
		//小卡
		var status = CA.card.status;
		if(status.indexOf("D00-4") != -1){
			return CA.card.serialNumber;//hardware.smartCard.cardId;
		}else{
			return "";
		}
	}
	,getSerialNumber : function(){
		//得到当前的机顶盒的序列号
		return hardware.STB.serialNumber;
	}
	,getUserName : function(){
		//得到当前的机顶盒的用户名
		return VOD.server.userName;
	}
	,getVolume : function(){
		//返回当前音量的大小
		var tempsound = media.sound.value;
		return Math.floor(tempsound/3);
	}
};



