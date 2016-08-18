

var pageSize=8
	,getProListUrl='getProList.jhtml'
	,listItemTpl=$$('listItemTpl').innerHTML.replace('<!--','').replace('-->','')
	,listItemWrapperTpl=['<div class="listRight-item-wrapper" data-down="5" data-url="{{path}}">{{contentItem}}</div>',
                    '<div class="listRight-item-wrapper" data-down="6" data-url="{{path}}">{{contentItem}}</div>',
                    '<div class="listRight-item-wrapper" data-down="7" data-url="{{path}}">{{contentItem}}</div>',
                    '<div class="listRight-item-wrapper" data-right="9" data-down="8" data-url="{{path}}">{{contentItem}}</div>',
                    '<div class="listRight-item-wrapper" data-up="1" data-url="{{path}}">{{contentItem}}</div>',
                    '<div class="listRight-item-wrapper" data-up="2" data-url="{{path}}">{{contentItem}}</div>',
                    '<div class="listRight-item-wrapper" data-up="3" data-url="{{path}}">{{contentItem}}</div>',
                    '<div class="listRight-item-wrapper" data-up="4" data-url="{{path}}">{{contentItem}}</div>']
	,listElemBox=new utv.Elem('.listRight-item-normal-box')
	,listPageTipsTpl='{{pageNumber}}/{{totalPages}}'
	,listPageTipsBox=new utv.Elem('#listPageTipsBox')
;
//列表加载提示
var listLoadingTips=new LoadingUpTips('listLoadingTips');

//ajax 事件列表,一个页面最好只有一个ajax事件控制着
var listAjax=new AjaxEvent({
	cacheTime:30000//缓存30s
});
//自定义获得数据后数据处理函数,data数据，pdata额外的参数
listAjax.dataAction=function(data,pdata){
	console.log(data);
	var html=''
		,content={contentItem:'',path:'#'}
	;
	for(var i=0,len=data.content.length;i<len;i++){
		content.contentItem=utv.tpl(listItemTpl,data.content[i]);
		content.path=data.content[i].path;
		html+=utv.tpl(listItemWrapperTpl[i],content);
	}
	listElemBox.setHTML(html);
	listPageTipsBox.setHTML(utv.tpl(listPageTipsTpl,data));

	listLoadingTips.hide();
	indexList.init();//列表重新初始化
}
//自行定义错误处理函数
listAjax.fail=function(xhr,str){
	alert(str);
}




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
	var typeid=utv.Attr.get(this.getSelectItem(),'data-name');
	if(!!!typeid) return;//拿不到属性值，不处理
	window.location.hash=typeid;
	//console.log(name);
	var data=listAjax.getData(typeid);
	data=!!data?data.data:null;
	var p=!!data?(data.pageNum||0):0;
	
	!!!p&&p++;
	listLoadingTips.show();

	//(Long productCategoryId, Integer pageNumber, Integer pageSize
	listAjax.exec(getProListUrl,typeid,'',{
		method:'POST'
		,data:{
			productCategoryId:typeid
			,pageNumber:p
			,pageSize:pageSize
		}
	},false);
	//ajax1.exec(url,name,pdata,ajaxOpt,newFetch);//执行ajax请求;name为数据键名,pdata额外数据，ajaxOpt 为ajax参数包含{ajaxOpt.data，ajaxOpt.method，ajaxOpt.timeout；newFetch跳过缓存强制加载

	//setTimeout(function(){listLoadingTips.hide();},1000);

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
			tvPad.pageTurnUp();
			break;
		}
		case utv.keyboard.pageDown : {//向后翻页事件处理
			tvPad.pageTurnDown();
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
	,pageTurnDown:function(){//下一页
		var typeid=window.location.hash.replace('#','');
		//得到页码
		var data=listAjax.getData(typeid);
		data=!!data?data.data:null;
		var p=!!data?(data.pageNum||0):0;
		if(p>=data.totalPage){
			return;
		}
		p++;

		listLoadingTips.show();
		listAjax.exec(getProListUrl,typeid,'',{
			method:'POST'
			,data:{
				productCategoryId:typeid
				,pageNumber:p
				,pageSize:pageSize
			}
		},true);
		//listAjax.exec('list.json?t='+typeid+'&p='+p,typeid,'',true);
	}
	,pageTurnUp:function(){//上一页
		var typeid=window.location.hash.replace('#','');
		//得到页码
		var data=listAjax.getData(typeid);
		data=!!data?data.data:null;
		var p=!!data?(data.pageNum||0):0;
		if(p<=1){
			return;
		}
		p--;

		listLoadingTips.show();
		listAjax.exec(getProListUrl,typeid,'',{
			method:'POST'
			,data:{
				productCategoryId:typeid
				,pageNumber:p
				,pageSize:pageSize
			}
		},true);
		//listAjax.exec('list.json?t='+typeid+'&p='+p,typeid,'',true);
	}
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
		//location.reload(true);//调试用
		if(tvPad.contentRem=='listRightContent'){
			var item=indexList.getSelectItem();
			var url=!!item? utv.Attr.get(item,'data-url'):'';
			if(!!!url) return;
			location.href=url;
			//console.log(url);
			item=null;
		}
		return false;
	}

};
