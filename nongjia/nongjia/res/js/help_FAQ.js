$(document).ready(function () {

    $('.help_list').click(function () {
        var index = $(this).parent().index();
        helpListClick(index);

    }) ;

    $('.content_texts a').click(function () {
        var help_list = $(this).parents('.content_texts').index() - 1;
        var index1 = $(this).parent().index();
        chooseText(help_list,index1)
    })

    $('.one').click(function () {  //面包屑导航对应上级菜单
        var data_id = $(this).attr('data-id');
        $('.serive').show();
        $('.content_detail').hide();
        $('.content_texts').eq(data_id - 1).addClass('show').siblings().removeClass('show');
    });
    var url = location.href;//定义变量
    var parames = parse_url(url);
    if(parames['id']){
        helpListClick(parames['id'])
        chooseText(parames['id'],parames['answer'])
    }

});

function helpListClick(index){   //点击左侧菜单栏切换对应帮助内容
    $('.content_texts').eq(index).addClass('show').siblings().removeClass('show');
    $('.help_list').eq(index).parent().addClass('select').siblings().removeClass('select');
    $('.serive').show();
    $('.one').text($('.help_list').eq(index).text()).attr('data-id',parseInt(index)+1);
    $('.content_detail').hide();
    $('.detail_t').hide();
}

function chooseText(listIndex,index){ //选择问题显示对应答案
    $('.two').text($('.content_texts').eq(listIndex).find('a').eq(index).text());
    $('.content_texts').removeClass('show');
    $('.serive').hide();
    $('.content_detail').show();
    switch (parseInt(listIndex )){
        case 0:
            $('.part').eq(0).find('.detail_t').eq(index).show().siblings().hide();
            break;
        case 1:
            $('.part').eq(1).find('.detail_t').eq(index).show().siblings().hide();
            break;
        case 2:
            $('.part').eq(2).find('.detail_t').eq(index).show().siblings().hide();
            break;
    }

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