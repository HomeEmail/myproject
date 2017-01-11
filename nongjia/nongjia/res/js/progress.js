$(document).ready(function () {
   $(document).on('change','.upload_file',function () {
	   if($(this).val() == ''){
           return false;
       }
       var width = $('.progress_bar').width();
       var num = 10;
       var _this = $(this);
       var full_box = _this.parents('.full_box');
       var time = setInterval(function(){animate(_this)},50);
       $(this).attr('disabled','disabled'); //显示进度条的时候选择文件按钮禁止点击
       _this.parent().siblings('.hide_pos').show();
       function animate(_this) {
           width += num;
           if(width == $('.progress').width()){
               clearInterval(time)

           }
           full_box.find('.progress').show();
           full_box.find('.pos').find('.progress_bar').animate({'width':width},50,function(){
               if(full_box.find('.progress_bar').width() == $('.progress').width()){
                   full_box.find('.progress').hide();
                   full_box.find('.pos a').show();
                   var fileName = _this.val();
                   full_box.find('.progress').before('<span>'+ fileName +'</span>');
                   _this.removeAttr('disabled');
                   _this.hide();
                   $('.progress_bar').css('width','200')
               }
           });
       }

   })
    $('.pos a').click(function () {
        $(this).siblings('span').remove();
        $(this).hide();
        if($(this).parents('.hide_pos').attr('class') !== undefined){  //判断是否内容和按钮分离，
            $(this).parents('.hide_pos').siblings('.add_file').find('input').show().val('').removeAttr('disabled');
            $(this).parents('.hide_pos').hide();
        }else{
            $(this).siblings('input').show().val('').removeAttr('disabled');
        }
    });

});