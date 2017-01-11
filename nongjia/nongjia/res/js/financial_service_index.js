$(document).ready(function () {
   $('.bank').mousemove(function(){
        $(this).addClass('active').siblings().removeClass('active');
       var index = $(this).index();
       if(index == 1){
           $('.bank').eq(0).css('border-right','none');
           $('.bank').eq(2).css('border-left','none');
       }else{
           $('.bank').eq(0).css('border-right','1px solid #d2d2d2');
           $('.bank').eq(2).css('border-left','1px solid #d2d2d2');
       }
   });

});