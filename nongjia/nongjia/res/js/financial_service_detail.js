var dataClass = [$('.info_list_0'),$('.info_list_1'),$('.info_list_2')];
$(document).ready(function () {

    $('.select_product a').click(function () {
        var index = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        if( index == 1){
            $('.tab1').hide();
            $('.tab2').css('display','inline-block');
        }else{
            $('.tab1').show();
            $('.tab2').hide();
        }
    });
    $('.tab1 a').click(function () {
        var index = $(this).index();
        $(this).addClass('select').siblings().removeClass('select')
        select_tab(index);
    });
    select_tab(0);
    function select_tab(index){
            $.getJSON("./bank2.json",function(data){
                var bank = data.banks;
                $('.prudent_title h1').html('<span></span>' + bank[0].personal[index].prudent_title);
                $('.business p').html(bank[0].personal[index].detail);
                var div ='';
                var p = '';
                var h6 = '';
                var small = bank[0].personal[index].small;
                for(var j = 0 ; j < small.length ; j ++){//遍历标题
                    h6 += '<h6>'+small[j].name+'</h6>'
                    for(var i = 0 ; i < small[j].content.length ; i++){  //遍历内容
                        p += '<p>'+small[j].content[i].text+'</p>'
                    }
                    div += '<div><h6>'+small[j].name+'</h6>' + p +'</div>'
                    p = '';
                }
                $('.business_detail').html(div)
            });
    }





















	dataClass[0].click(function () { 
		var index = $(this).parent().index();
		infoListClick(dataClass[0],index);
	}) ;
	dataClass[1].click(function () { 
		var index = $(this).parent().index();
		infoListClick(dataClass[1],index);
	}) ;
	dataClass[2].click(function () { 
		var index = $(this).parent().index();
		infoListClick(dataClass[2],index);
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

function infoListClick(li_Obj,index){   //点击左侧菜单栏切换对应帮助内容
	$('.info_list_0').parent().removeClass('select');
	$('.info_list_1').parent().removeClass('select');
	$('.info_list_2').parent().removeClass('select');
	li_Obj.eq(index).parent().addClass('select').siblings().removeClass('select');
	
    $('.content_texts').eq(index).addClass('show').siblings().removeClass('show');
    $('.serive').show();
    $('.one').text(li_Obj.eq(index).text()).attr('data-id',parseInt(index)+1);
    $('.content_detail').hide();
    $('.detail_t').hide();
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

