

//列表加载提示
var listLoadingTips=new LoadingUpTips('listLoadingTips');

var indexMenu=new SubMenu({
	nav:'indexListLeftMenuContentBox'//列表id
	,menuCurIndex:3//数组中第几个选项被选中，从1计数
	,mHeight:140//每项的高度
	,showCount:4//显示的个数
	,endPlay:function(){
		this.selectAction();
	}
	,beforePlay:function(){}
	,toToped:function(){}//到顶时
	,toBottomed:function(){}//到底时
	,upTipsBt:$$('indexLeftMenuUpTipsBt')
	,upTipsOnClass:'up-tips-icon'
	,upTipsOffClass:'up-tips-icon-off'
	,downTipsBt:$$('indexLeftMenuDownTipsBt')
	,downTipsOnClass:'down-tips-icon'
	,downTipsOffClass:'down-tips-icon-off'
	,focusClass:'focus'
	,hoverClass:'on'
	,moveCssProp:'top'
});

//自定义菜单处理
indexMenu.selectAction=function(){
	var name=utv.Attr.get(this.getSelectItem(),'data-name');
	if(!!!name) return;//拿不到属性值，不处理
	window.location.hash=name;
	//console.log(name);
	listLoadingTips.show();
	setTimeout(function(){listLoadingTips.hide();},1000);
};
indexMenu.selectAction();




var indexList=new SubList({
	listId:'listRightContent'//列表id
	,itemClass:'.listRight-item-wrapper'//列表项类
	,index:-1//当前选中哪项,-1不选，从0开始
	,afterMove:function(oldIndex,newIndex,dir){
		//oldIndex:前一个选中,newIndex:新选中,dir:方向,up,down,left,right
		//console.log('after '+oldIndex+':'+newIndex);
	}
	,beforeMove:function(oldIndex,newIndex,dir){
		//oldIndex:前一个选中,newIndex:新选中,dir:方向
		//return false;//返回false终止接下来的操作,无返回也是fasle的
		//console.log('before '+oldIndex+':'+newIndex);

		if(oldIndex==0 && dir=='left' && tvPad.contentRem=='listRightContent'){
			indexList.clear();//清理列表状态 将样式清理  索引初始化
			tvPad.contentRem='indexListLeftMenuContentBox';//操作区域改变
			indexMenu.addHoverClass();//焦点移到菜单，样式加上hover
			return false;
		}

		return true;
	}
});



keObs.subscribe(indexKeyEvent);
function indexKeyEvent(keycode,event){
	switch(keycode){
		case utv.keyboard.keyUp:{//上
			tvPad.turnUp();
			break;
		}
		case utv.keyboard.keyDown:{//下
			tvPad.turnDown();
			break;
		}
		case utv.keyboard.keyLeft:{//左
			tvPad.turnLeft();
			break;
		}
		case utv.keyboard.keyRight:{//右
			tvPad.turnRight();
			break;
		}
		case utv.keyboard.pageUp: {//向前翻页事件处理306
			
			break;
		}
		case utv.keyboard.pageDown : {//向后翻页事件处理
			
			break;
		}
		case utv.keyboard.enter:{
			//确定
			tvPad.enterAction();
			break;
		}
		case utv.keyboard.back:{//返回
			goBack('/guotongshop/html/index.html');
			break;
		}
		default:break;
	}
}
var tvPad = {
	contentRem:'indexListLeftMenuContentBox'//listRightContent
	,turnUp:function(){
		if(this.contentRem=='indexListLeftMenuContentBox'){
			indexMenu.turnUp();
		} else {
			indexList.turnUp();
		}
	}
	,turnDown:function(){
		if(this.contentRem=='indexListLeftMenuContentBox'){
			indexMenu.turnDown();
		} else {
			indexList.turnDown();
		}
	}
	,turnLeft:function(){
		if(this.contentRem=='indexListLeftMenuContentBox'){
			//indexMenu.turnDown();
		} else {
			indexList.turnLeft();
		}
	}
	,turnRight:function(){
		if(this.contentRem=='indexListLeftMenuContentBox'){
			//indexMenu.turnDown();
			indexList.turnRight();
			this.contentRem='listRightContent';//操作区域改变
			indexMenu.removeHoverClass();//焦点移出菜单，样式移除hover
		} else {
			indexList.turnRight();
		}
	}
	,enterAction:function(){//确定时的操作

		if(tvPad.contentRem=='listRightContent'){
			var item=indexList.getSelectItem();
			var url=!!item? utv.Attr.get(item,'data-url'):'';
			if(!!!url) return;

			//console.log(url);
			item=null;
		}
		return false;
	}

};
