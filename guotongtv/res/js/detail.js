/****/


var indexList=new SubList({
	listId:'detailContent'//列表id
	,itemClass:'.detailContent-bt-item'//列表项类
	,index:0//当前选中哪项,-1不选，从0开始
	,afterMove:function(oldIndex,newIndex,dir){
		//oldIndex:前一个选中,newIndex:新选中,dir:方向,up,down,left,right
		//console.log('after '+oldIndex+':'+newIndex);
		if(newIndex>=4){
			tvPad.contentRem='detailContentRightBtBox';
		} else {
			tvPad.contentRem='detailContentLeftBtBox';
			var item=indexList.getSelectItem();
			var url=!!item? utv.Attr.get(item,'data-src'):'';
			if(!!!url) return;
			$$('detailContentLeftImg').src=url;
			item=null;
		}
	}
	,beforeMove:function(oldIndex,newIndex,dir){
		//oldIndex:前一个选中,newIndex:新选中,dir:方向
		//return false;//返回false终止接下来的操作,无返回也是fasle的
		//console.log('before '+oldIndex+':'+newIndex);
		if(isNone(indexList.getItem(newIndex))){
			return false;//对于隐藏的bt,不处理
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
			goBack();
			break;
		}
		default:break;
	}
}
var tvPad = {
	contentRem:'detailContentLeftBtBox'//detailContentRightBtBox;detailContentLeftBtBox
	,turnUp:function(){
		
			indexList.turnUp();
		
	}
	,turnDown:function(){
		
			indexList.turnDown();
		
	}
	,turnLeft:function(){
		
			indexList.turnLeft();
		
	}
	,turnRight:function(){
		
			indexList.turnRight();
		
	}
	,enterAction:function(){//确定时的操作

		if(tvPad.contentRem=='detailContentLeftBtBox'){
			var item=indexList.getSelectItem();
			var url=!!item? utv.Attr.get(item,'data-src'):'';
			if(!!!url) return;
			$$('detailContentLeftImg').src=url;
			//console.log(url);
			item=null;
		}
		return false;
	}

};
