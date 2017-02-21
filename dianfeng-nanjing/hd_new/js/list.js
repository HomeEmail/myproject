/**
 * Created by ivan on 16/10/25.
 */
document.onkeydown = grabEvent;
// if(document.onkeypress!==null){
// 	document.onkeypress = grabEvent;
// }
document.onsystemevent = grabEvent;
function grabEvent(_event){
    // if(_event.type=='keydown'){
    // 	document.onkeypress = null;
    // }
    var code = Event(_event);
    switch(code){
        case "KEY_UP": //
            !!ctr.up&&ctr.up();
            return 0;
            break;
        case "KEY_DOWN": //
            !!ctr.down&&ctr.down();
            return 0;
            break;
        case "KEY_LEFT": //
            !!ctr.left&&ctr.left();
            return 0;
            break;
        case "KEY_RIGHT": //
            !!ctr.right&&ctr.right();
            return 0;
            break;
        case "KEY_PAGE_UP": //
            return 0;
            break;
        case "KEY_PAGE_DOWN": //
            return 0;
            break;
        case "KEY_NUMBER1":
            return 0;
            break;
        case "KEY_SELECT": //
            !!ctr.enter&&ctr.enter();
            return 0;
            break;
        case "KEY_NUMBER0":
        case "KEY_EXIT":
        case "KEY_BACK":
            //window.location.href = "../index.html";
            //window.history.back();
            return false;
            break;
        default:
            //
            break;
    }
};

var ctr={//事件控制对象
    left : function(){},
    right : function(){},
    up : function(){},
    down : function(){},
    enter : function(){},
    back : function(){}
};
//从portal页进入此页面会携带user_id参数
var user_id=Q.getDecoded('user_id')||'108601998';//测试:'104734528';正式：108601998
if(user_id=='null'){
    user_id=104734528;
}
//菜单初始化在哪个
var menuPos= Q.getInt('menuPos',0);

window.onload=function(){
    getMenuData();

};
var loadingDiv=$('loadingDiv');
showLoadingDiv();
//ajax obj
var req=null;
function fetch(url,successFn,failFn){
    if(req != null){
        req.abort();
        req=null;
    }
    showLoadingDiv();
    req = ajax({
        url: url,
        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
            req=null;
            hideLoadingDiv();
            var json = eval("(" + html + ")");
            !!successFn&&successFn(json);
        },
        onComplete : function(){
            req = null;
        },
        onError:function(){ //请求失败后执行[可选]
            req=null;
            !!failFn&&failFn();
        },
        post:"",
        timeout:30000
    });
}

function getGameUrl(id){
    getRtspUrl(id);

    /*var url=serverUrl+'/inter/getTyeps.action?userNo='+user_id;
    fetch(url,function(data){
        getRtspUrl(id);
    },function(){
        ///alert('网络错误');
    });*/
}
function getRtspUrl(id){
    ///play/getPlayUrl.action?gameId=1
    if(req != null){
        req.abort();
        req=null;
    }
    var url=serverUrl+'/play/getPlayUrl.action?gameId='+id+'&userNo='+user_id;
    showLoadingDiv();
    req = ajax({
        url: url,
        type: "GET", //HTTP 请求类型,GET或POST
        dataType: "html", //请求的文件类型html/xml
        onSuccess: function(html){ //请求成功后执行[可选]
            req=null;
            hideLoadingDiv();
            var json = eval("(" + html + ")");
            if(!!!json.url){
                alert(json.msg);
                return;
            }
            
            var state=json.state;
            //if(parseInt(state,10)==0){
                var url='play.html?url='+encodeURIComponent(json.url);
                window.location.href=url;
            //}else{
            //    alert(json.reason);
            //}
        },
        onComplete : function(){
            req = null;
        },
        onError:function(){ //请求失败后执行[可选]
            req=null;
        },
        post:"",
        timeout:30000
    });
}

function getMenuData(){
    var url=serverUrl+'/inter/getTyepsByList.action?userNo='+user_id;
    url='getTyepsByList.json';//test
    fetch(url,function(data){
        formatMenuData(data);
        menuObj.render();
        ctr=menuObj.init();//事件交给菜单控制对象
    },function(){
        //alert('网络错误');
    });
}
function formatMenuData(data){
    menuObj.data=[];
    menuObj.menuList=[];
    contentList.data={};
    for(var i=4,len=data.data.length;i<len;i++){
        menuObj.data.push({
            name:data.data[i].typeName,
            id:data.data[i].typeId
        });
        menuObj.menuList.push(menuObj.initLeft+(menuObj.stepLeft*(i-4))-60);
        contentList.data['menu'+(i-4)]={
            currentPage:1,
            totalPage:1,
            lists:[]
        };
    }
}



//内容列表控制对象
var contentList = {
    uiPos : 0,
    dataPos : 0,
    hasData : false,
    pageSize : 18,
    data : {
        menu1 : {
            currentPage : 1,
            totalPage : 1,
            lists : [
                //{id:1,name:'愤怒的小鸟23的色',img:'images/img4.png'}
            ]
        },
        menu2 : {
            currentPage : 1,
            totalPage : 1,
            lists : [
                //{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
            ]
        },
        menu3 : {
            currentPage : 1,
            totalPage : 1,
            lists : [
                //{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
            ]
        }
    },
    getData : function(isTurnPage){
        var url='';
        
        url=serverUrl+'/inter/getGameListsByTypeId.action?typeId=2&page='+this.data['menu'+menuObj.menuPos].currentPage;
        url='getGameListByTypeId.json';//test
        
        var that=this;
        that.hasData=false;
        fetch(url,function(data){
            that.hasData=true;
            that.formatData(data);
            that.render();
            !!isTurnPage&&that.focus();
        },function(){
            that.hasData=true;
            //alert('网络错误');
        });
    },
    formatData : function(data){
        this.data['menu'+menuObj.menuPos].lists=[];
        if(parseInt(data.code,10)!=-1){
            this.data['menu'+menuObj.menuPos].currentPage=data.page||1;
            this.data['menu'+menuObj.menuPos].totalPage=Math.ceil(data.total/this.pageSize)||1;
            for(var i=0,len=data.data.length;i<len;i++){
                
                this.data['menu'+menuObj.menuPos].lists.push({
                    id:data.data[i].gameId,
                    name:data.data[i].gameTitle,
                    //img:imgBasePath+data.data[i].gameImg
                    img:data.data[i].gameImg //for test
                });
                
            }
        }
    },
    init : function(){
        this.uiPos=0;
        this.dataPos=0;
        this.focus();
        return this;
    },
    show : function (isTurnPage) {
        $('contentBox').style.backgroundImage = "url(images/index-bg2.png)";
        $('l_icon').style.visibility="visible";
        $('r_icon').style.visibility="visible";
        $('pageNav').style.visibility="visible";
        if(!!this.hasData&&!!this.data['menu'+menuObj.menuPos].lists[0]){//有数据
            this.render();
        }else{
            this.getData(!!isTurnPage);
        }
        return this;
    },
    rowCount : 6,//一行几个
    colCount : 3,//一列几个
    initTop : 30,//45,
    initLeft :95,//65,
    stepLeft : 168,//130,
    stepTop : 145,//140,
    render : function(){
        $('content').innerHTML='';
        var s='',top= 0,left=0;
        var items=this.data['menu'+menuObj.menuPos].lists;
        if(items.length>0){
            for(var i= 0,len=items.length;i<len;i++){
                top=this.initTop+(this.stepTop*parseInt(i/this.rowCount,10));
                left=this.initLeft+(this.stepLeft*(i%this.rowCount));
                s+='<div style="position: absolute;top: '+top+'px;left: '+left+'px;width: '+104+'px;height: '+104+'px;background: url('+items[i].img+') no-repeat;"></div>';
                s+='<div style="position: absolute;top: '+(top+110)+'px;left: '+(left-25)+'px;width: '+150+'px;height: '+20+'px;font-size:18px;text-align:center;color:#ffffff;z-index:999;overflow: hidden;word-wrap: break-word;word-break: break-all;">'+items[i].name+'</div>';
            }
        }else{
            s='<div style="height:100px;line-height:100px;font-size:24px;color:#ffffff;text-align:center;">暂无数据</div>';
        }
        $('content').innerHTML=s;
        this.renderPageNav();
    },
    renderPageNav : function(){
        var items=this.data['menu'+menuObj.menuPos];
        $('pageNav').innerHTML=items.currentPage+'/'+items.totalPage;
        if(items.currentPage<=1){
            $('l_icon').style.background='url(images/l_false.png) no-repeat';
        }else{
            $('l_icon').style.background='url(images/l_true.png) no-repeat';
        }
        if(items.currentPage>=items.totalPage){
            $('r_icon').style.background='url(images/r_false.png) no-repeat';
        }else{
            $('r_icon').style.background='url(images/r_true.png) no-repeat';
        }
    },
    focus : function(){
        if(!!!this.data['menu'+menuObj.menuPos].lists[this.uiPos]){
            this.uiPos=0;
            this.dataPos=0;
        }
        var l = 0,t = 0;
        l=this.initLeft+this.stepLeft*(this.uiPos%this.rowCount);
        t=this.initTop+this.stepTop*parseInt(this.uiPos/this.rowCount,10);
        $('content_focus').style.visibility="visible";
        $('content_focus').style.width=104+'px';
        $('content_focus').style.height=104+'px';
        $('content_focus').style.left=(l-6)+'px';
        $('content_focus').style.top=(t-6)+'px';
    },
    blur : function(){
        $('content_focus').style.visibility="hidden";
    },
    left : function(){
        if(this.uiPos%this.rowCount == 0 || !!!this.data['menu'+menuObj.menuPos].lists[this.uiPos-1]){//到最左边了
            this.touchLeft();
            return;
        }
        this.uiPos--;
        this.dataPos--;
        this.focus();
    },
    right : function(){
        if(this.uiPos%this.rowCount == (this.rowCount-1) || !!!this.data['menu'+menuObj.menuPos].lists[this.uiPos+1]){//到最右边了
            this.touchRight();
            return;
        }
        this.uiPos++;
        this.dataPos++;
        this.focus();
    },
    up : function(){
        if(this.uiPos<=(this.rowCount-1)||!!!this.data['menu'+menuObj.menuPos].lists[this.uiPos-this.rowCount]){
            this.touchUp();
            return;
        }
        this.uiPos-=this.rowCount;
        this.dataPos-=this.rowCount;
        this.focus();

    },
    down : function(){
        if(!!!this.data['menu'+menuObj.menuPos].lists[this.uiPos+this.rowCount]){
            this.touchDown();
            return;
        }
        this.uiPos+=this.rowCount;
        this.dataPos+=this.rowCount;
        this.focus();
    },
    enter : function(){
        
        getGameUrl(this.data['menu'+menuObj.menuPos].lists[this.uiPos].id);
           
    },
    touchLeft : function(){
        //上一页
        if(this.data['menu'+menuObj.menuPos].currentPage<=1) return;
        this.data['menu'+menuObj.menuPos].currentPage--;
        this.hasData=false;
        this.show(true);//翻页模式
    },
    touchUp : function(){
        this.blur();
        ctr=menuObj.init();
    },
    touchRight : function(){
        //下一页
        if(this.data['menu'+menuObj.menuPos].currentPage>=this.data['menu'+menuObj.menuPos].totalPage) return;
        this.data['menu'+menuObj.menuPos].currentPage++;
        this.hasData=false;
        this.show(true);//翻页模式
    },
    touchDown : function(){

    }
};


//菜单控制对象
var menuObj = {
    menuPos: 0,
    menuList: [60, 200, 600, 850],
    data : [
        {name:'首页推荐',id:0},
        {name:'热门游戏',id:0},
        {name:'最新游戏',id:0},
        {name:'收藏夹',id:0}
    ],
    stepLeft:140,
    initLeft:60,
    render : function(){
        var s='';
        for(var i= 0,len=this.data.length;i<len;i++){
            s+='<div id="menu_'+i+'" class="menu" style="position:absolute; font-size:26px; top:0px; left:'+(this.initLeft+i*this.stepLeft)+'px; width:140px; height:50px;text-align: center;color:#ffffff;">'+this.data[i].name+'</div>';
        }
        $('menuItems').innerHTML=s;
    },
    init: function () {
        //this.menuPos = 0;
        $("menu_focus").style.left = this.menuList[this.menuPos] + "px";
        this.focus();
        this.enter();
        return this;
    },
    focus: function () {
        $("menu_focus").style.visibility = "visible";
        $("menu_focus").style.opacity = '1';
    },
    blur: function () {
        $("menu_focus").style.visibility = "hidden";
    },
    selected: function () {
        $("menu_focus").style.opacity = '0.6';
    },
    changeFocus: function (_num) {
        if (this.menuPos == 0 && _num < 0)return;
        if (this.menuPos == (this.menuList.length-1) && _num > 0)return;
        this.menuPos += _num;
        $("menu_focus").style.left = this.menuList[this.menuPos] + "px";
        this.enter();
    },
    left: function () {
        this.changeFocus(-1);
    },
    right: function () {
        this.changeFocus(1);
    },
    up: function () {
        this.selected();
        ctr=topTips.init();//事件交给右上角控制对象
    },
    down: function () {
        this.selected();
        if(!!!contentList.data['menu'+menuObj.menuPos].lists||contentList.data['menu'+menuObj.menuPos].lists.length<=0) return;//没数据
        ctr=contentList.init();
    },
    enter: function () {
       
        contentList.show();

    }
};


//右上角顶部按钮控制对象
var topTips= {
    menuPos: 0,
    menuList: [1037, 1092, 1147],
    init : function(){
        //this.menuPos=0;
        $("topTipsFocus").style.left = this.menuList[this.menuPos] + "px";
        this.focus();
        return this;
    },
    focus: function () {
        $("topTipsFocus").style.visibility = "visible";
    },
    blur: function () {
        $("topTipsFocus").style.visibility = "hidden";
    },
    changeFocus: function (_num) {
        if (this.menuPos == 0 && _num < 0)return;
        if (this.menuPos == 2 && _num > 0)return;
        this.menuPos += _num;
        $("topTipsFocus").style.left = this.menuList[this.menuPos] + "px";

    },
    left: function(){
        this.changeFocus(-1);
    },
    right: function(){
        this.changeFocus(1);
    },
    down: function(){
        this.blur();
        ctr=menuObj.init();//事件交给菜单
    },
    enter: function() {
        if (this.menuPos == 0) {
             //首页//返回portal页
            window.location.href = 'http://10.1.15.43/nn_cms/nn_cms_view/gxcatv20/go_idc_v2.1.php?page=linux_home_hd';
        }
        else if (this.menuPos == 1) {
            //主页 sp首页
            history.back();
            return;
        } else if (this.menuPos == 2) {
            //返回
            history.back();
            return 0;
        }

    }
};





