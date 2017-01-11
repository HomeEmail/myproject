$(document).ready(function () {
    var i = 0;
    //alert($('.push_message').length)
    $('.push_message').each(function () {
        var push_message = $('.push_message').eq(i);
        var textHeight = push_message.find('.message_body').height();
        var height = 96;
        if(textHeight > height ){
            push_message.find('.message_body').addClass('max_height');
        }else if(textHeight < height|| textHeight == height ){
            push_message.find('.message_body').removeClass('max_height');
            push_message.find('.show_btn').hide();
        }
        i++;
    });
    var switchs = 1;
    $(document).on('click','.show_btn',function () {
    if(switchs == 1){
        $(this).prev().removeClass('max_height');
        $(this).html('<a href="javascript:void(0)">收起<span class="arrow"><img src="'+newPath+'/nongjia/res/images/Mine/up_arrow.png"></span></a>');
        switchs = 2;
    }else if(switchs == 2){
        $(this).prev().addClass('max_height');
        $(this).html('<a href="javascript:void(0)">展开 <span class="arrow"><img src="'+newPath+'/nongjia/res/images/Mine/down_arrow.png"></span></a>');
        switchs = 1;
    }
    })

});