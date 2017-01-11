$(document).ready(function () {
   $('.review_tab a').click(function () {
       var index = $(this).index();
       $(this).addClass('select').siblings().removeClass('select');
       $('.review_message').find('.tab_content').eq(index).addClass('choose_tab').siblings().removeClass('choose_tab');
       if(index=="5"){
    	   $("input[type='button']").val("关闭");
       }else{
    	   $("input[type='button']").val("提交");
       }
   });
    select_tab_content('bank_audit');
    select_tab_content('Mortgage');
    select_tab_content('Business_statement');



});
function select_tab_content(obj,prev){
	$("select[name="+obj+"]").change(function () {
        var option_index = $(this).children('option:selected').index();
        if(option_index != 0){
            $(this).parents('.tab_content').find('ul').eq(option_index - 1).addClass('show').siblings().removeClass('show');
        }
        $('.show').find("select[name="+obj+"]").children('option').eq(option_index).attr('selected',true);
    });
}