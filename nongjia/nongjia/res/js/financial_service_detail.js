var data = [[['农村经营权抵押贷款', '农民住房产权抵押贷款', '农村个人生产贷款', '农业产业链农户贷款', '农户小额贷款'], ['小企业简式快贷', '林权抵押担保贷款', '农民专业合作贷款'], ['E农管家', '惠农通', '金穗惠农卡']],
    [['传统农户小额贷款','传统商户小额贷款','家庭农场贷款','农机购置补贴贷款','农民专业合作社贷款','土地经营承包权贷款','烟草贷','再就业小额担保贷款']],
    [['“新农村”创业贷款','“农商三宝”组合贷款','农户联保贷款','订单农业质押贷款','村镇项目开发贷款']]]
$(document).ready(function () {
    var type = 0 ;
    var tab_index = '';
    var bank = 0;
    select_tab(0,0,0);
    var num = 0;
    var url = location.href;

    var parames = parse_url(url)
    if(parames['typeId']){
        $('.part li').removeClass('select')
        //typeid :银行  p :产品 num :选中第几个
        if(parames['typeId'] == 0){

            $('.part').eq(0).find('li').eq(parames['p']).addClass('select').siblings().removeClass('select');
        }else if(parames['typeId'] == 1){
            $('.info_list_1').parent().addClass('select');
            $('.select_product a').eq(0).addClass('select').show().siblings().hide();
            $('.introduction_title').removeClass('hasBtn'); //除农业银行，都没有申请按钮
            $('.hasBtn').hide();//隐藏申请按钮
        }else if(parames['typeId'] == 2){
            $('.info_list_2').parent().addClass('select');
            $('.select_product a').eq(0).addClass('select').show().siblings().hide();
            $('.introduction_title').removeClass('hasBtn'); //除农业银行，都没有申请按钮
            $('.hasBtn').hide();//隐藏申请按钮
        }
        type = parames['p'];
        num = parames['typeId'];
        $('.select_product a').eq(parames['p']).addClass('select').siblings().removeClass('select')
        each_data(parames['typeId'],parames['p'],parames['num']);
        select_tab(parames['num'],parames['p'],parames['typeId'])
    }



    $('.select_product a').click(function () { //切换对公和个人tab
        var tabIndex = $(this).index(); //tab的索引
        type = tabIndex;

        each_data(0,tabIndex); //遍历具体业务
        select_tab(0,type,bank);//默认第0条开始 选择产品
        $('.info_list_0').parent().removeClass('select').eq(tabIndex).addClass('select');

        $(this).addClass('select').siblings().removeClass('select');

    });
    $('.info_list_0').click(function () { //农业银行
        var list_tabIndex  = $(this).parent().index() ;//tab的索引
        type = list_tabIndex;
        num = 0;
        each_data(0,list_tabIndex);
        $('.select_product a').show().eq(list_tabIndex).addClass('select').siblings().removeClass('select');
        $('.introduction_title').addClass('hasBtn');
        $('.hasBtn').show();
        select_tab(0,list_tabIndex,0);//默认第0条开始 选择产品 农业银行
        $('.part li').removeClass('select');//左侧列表添加选中和删除选中
        $(this).parent().addClass('select');
    })
    $('.type2 .tab').on('click','a',function () {
        tab_index = $(this).index();//第几条数据
        $(this).addClass('select').siblings().removeClass('select');
        select_tab(tab_index,type,num);
    });

    $('.info_list_1,.info_list_2').click(function () { //邮储、信合列表
        num = $(this).parents('.part').index();
        type = 0;
        each_data(num,0);
        select_tab(0,0,num);//默认第0条开始 只有个人产品 num
        $('.select_product a').eq(0).addClass('select').show().siblings().hide();
        $('.introduction_title').removeClass('hasBtn'); //除农业银行，都没有申请按钮
        $('.hasBtn').hide();//隐藏申请按钮
        $('.part li').removeClass('select');
        $(this).parent().addClass('select').siblings().removeClass('select');
    })
});
function each_data(type,index,_num) {
    var a = '';
    for(var i = 0;i<data[type][index].length;i++){
        a += '<a href="javascript:void(0)">'+data[type][index][i]+'</a>'
    }
    $('.type2 .tab').html(a);
    $('.type2 .tab').each(function () {
        if(_num){
            $(this).find('a').eq(_num).addClass('select').siblings().removeClass('select')
        }else{
            $(this).find('a').eq(0).addClass('select').siblings().removeClass('select')
        }

    })
}
function select_tab(index,type,num){ //第几条数据  数据类型 银行 0：农业 1：邮政 2：信合

    $.getJSON("nongjia/res/bank.json",function(data){

        var bank = data.banks;
        var div ='';
        var p = '';
        var obj = '';
        if(parseInt(type) == 1){ //根据type判断个人或者对公产品
            obj = bank[num].common[index]; //common
        }else if(parseInt(type) == 0) {
            obj = bank[num].personal[index]; //personal
        }else if(parseInt(type) == 2){
            obj = bank[num].special[index]; //special
        }
        $('.prudent_title h1').html('<span></span>' + obj.prudent_title);
        $('.business p').html(obj.detail);
        for(var j = 0 ; j < obj.small.length ; j ++){//遍历标题
            for(var i = 1 ; i < obj.small[j].length ; i++){  //遍历内容
                p += '<p>'+obj.small[j][i]+'</p>'
            }
            div += '<div><h6>'+obj.small[j][0]+'</h6>' + p +'</div>';
            p = '';
        }
        $('.business_detail').html(div)
    });
}

function parse_url(_url){ //定义函数
    var pattern = /(\w+)=(\w+)/ig;//定义正则表达式
    var parames = {};//定义数组
    _url.replace(pattern, function(a, b, c){
        parames[b] = c;
    });
    /*此时执行function(a,b,c);其中a的值为:id=2,b的值为id,c的值为2;然后将数组的key为id的值赋为2.
     */
    return parames;//返回这个数组.
}

