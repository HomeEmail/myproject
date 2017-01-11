$(document).ready(function () {
    var text = '';
   $('.user_list').on('mouseenter','a',function () {
       var width = $(this).width();
       text = $(this).text();
       $(this).css('width',width).text('删除').addClass('hover').siblings().removeClass('hover');

       $('.user_list').on('click','a',function () {
            $(this).remove();
       });
   }).on('mouseout','a',function () {
       $(this).removeAttr('style').text(text).removeClass('hover');
   });


});