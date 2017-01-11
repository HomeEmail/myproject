$(document).ready(function () {

    $(window).resize(function () {//当浏览器大小发生变化时，重新获取锁屏大小
        var locking = $('.locking');
        if(locking.css('display') == 'none'){return;}
        var D_width = document.body.clientWidth;
        locking.css({'width':D_width}).show();
        center('basic');
        center('block_detail');
        center('Modal');
    });


   $('.check_message').click(function () { //显示基本信息弹出层
       center('basic');
       toggle('basic',1);
   });

    $('.basic .btn_color_3').click(function () {
        toggle('basic',2);
    });
    
    $('.add_block').click(function () { //显示地块弹出层
        center('block_detail');
        toggle('block_detail',1);
    });
    $('.block_detail .btn_color_3').click(function () {
        toggle('block_detail',2);

    });

    //模态框
        $('.Modal .btn_color_3').click(function () {
            toggle('Modal',2);
        });
    function Modal(_title,_content) { //修改模态框内容
        $('.Modal h1').text(_title);//标题
        $('.Modal_content p').text(_content);//内容
    }


    $('.block_detail .save').click(function () { //新增地块信息
        var name = $("input[name='block_name']").val();
        $('.new').before('<div class="block_box"><a href="javascript:void (0)">'+ name +'</a><div class="hover_tab"><span class="reset">修改</span><span class="del_block">删除</span></div> </div>')
    });
    $('.warrant_tab').on('click','a',function () { //选择权证
       $(this).addClass('select').siblings().removeAttr('class');
    }).on('click', 'span', function () { //删除权证
        center('Modal');
        var _this = $(this);

        Modal('删除权证','是否删除权证：'+$(this).siblings('strong').text());
        toggle('Modal',1);
        $('.Modal .confirm').click(function () {
            toggle('Modal',2);
            _this.parent().remove();
            $('.warrant_tab').find('a:first').addClass('select');
        });

    });

    $('.block_tab').on('mouseenter', 'a', function () {                  //显示修改或删除按钮
        var width = $(this).outerWidth();                   //获取元素宽度
        $(this).siblings('.hover_tab').css('width', width).show();
    }).on('mouseout', '.hover_tab', function () {
        $(this).hide();
    });

    $(document).on('click','.reset',function () {  //修改地块信息
        center('block_detail');
        toggle('block_detail',1);


    }).on('click','.del_block',function () {  //删除地块
        var _this =  $(this);
        Modal('删除地块','是否删除地块：'+$(this).parent().siblings().text());
        center('Modal');
        toggle('Modal',1);
        $('.Modal .confirm').click(function () {
            toggle('Modal',2);
            _this.parents('.block_box').remove();
        });
    });
    
    $('.block_tab').on('click','.check',function () {//流出查看页面 地块弹出层
        center('block_detail');
        toggle('block_detail',1);
    });

    $('.detail').on('click','.btn',function () { //流出查看页面 弹出层关闭
        toggle('detail',2);
    });
});
function toggle(obj,type) {
    if(type == 1){
        $('.'+obj).show();
        $('.locking').show();
    }else if(type == 2){
        $('.'+obj).hide();
        $('.locking').hide();
    }
}