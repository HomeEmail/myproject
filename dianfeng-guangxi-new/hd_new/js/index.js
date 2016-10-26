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
    user_id=108601998;
}
//菜单初始化在哪个
var menuPos= Q.getInt('menuPos',0);

window.onload=function(){
    //ctr=topTips.init();//事件交给右上角控制对象
    ctr=menuObj.init();//事件交给菜单控制对象

};

//内容首页控制对象
var indexHome = {
    uiPos: 0,
    data:[
        {top:0,left:42,width:506,height:312,img:'images/img1.png',link:'#'},
        {top:326,left:42,width:246,height:152,img:'images/img2.png',link:'#'},
        {top:326,left:302,width:246,height:152,img:'images/img2.png',link:'#'},

        {top:16,left:590,width:228,height:140,img:'images/img3.png',link:'#'},
        {top:168,left:590,width:228,height:140,img:'images/img3.png',link:'#'},
        {top:320,left:590,width:228,height:140,img:'images/img3.png',link:'#'},

        {top:16,left:868,width:104,height:104,img:'images/img4.png',link:'#'},
        {top:16,left:986,width:104,height:104,img:'images/img4.png',link:'#'},
        {top:130,left:868,width:104,height:104,img:'images/img4.png',link:'#'},
        {top:130,left:986,width:104,height:104,img:'images/img4.png',link:'#'},
        {top:244,left:868,width:104,height:104,img:'images/img4.png',link:'#'},
        {top:244,left:986,width:104,height:104,img:'images/img4.png',link:'#'},
        {top:357,left:868,width:104,height:104,img:'images/img4.png',link:'#'},
        {top:357,left:986,width:104,height:104,img:'images/img4.png',link:'#'}

    ],
    init: function () {
        $('contentBox').style.backgroundImage = "url(images/index-bg1.png)";
        $('l_icon').style.visibility="hidden";
        $('r_icon').style.visibility="hidden";
        $('pageNav').style.visibility="hidden";
        this.render();
        return this;
    },
    render: function(){
        var s='';
        for(var i= 0,len=this.data.length;i<len;i++){
            s+='<div style="position: absolute;top: '+this.data[i].top+'px;left: '+this.data[i].left+'px;width: '+this.data[i].width+'px;height: '+this.data[i].height+'px;background: url('+this.data[i].img+') no-repeat;"></div>';
        }
        $('content').innerHTML=s;
    }

};
//内容列表控制对象
var contentList = {
    init : function () {
        $('contentBox').style.backgroundImage = "url(images/index-bg2.png)";
        $('l_icon').style.visibility="visible";
        $('r_icon').style.visibility="visible";
        $('pageNav').style.visibility="visible";

        return this;
    }
};
//菜单控制对象
var menuObj = {
    menuPos: 0,
    menuList: [100, 350, 600, 850],
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
    },
    enter: function () {
        if (this.menuPos == 0) {
            //首页推荐
            //alert('home');
            indexHome.init();
        } else if (this.menuPos == 1) {
            //热门游戏
            contentList.init();
            return;
        } else if (this.menuPos == 2) {
            //最新游戏
            contentList.init();
            return 0;
        } else if (this.menuPos == 3) {
            //收藏夹
            contentList.init();
            return 0;
        }

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
            //首页
        }
        else if (this.menuPos == 1) {
            //主页
            return;
        } else if (this.menuPos == 2) {
            //返回
            //history.back();
            return 0;
        }
        //返回portal页
        window.location.href = 'http://10.1.15.43/nn_cms/nn_cms_view/gxcatv20/go_idc_v2.1.php?page=linux_home_hd';

    }
};





