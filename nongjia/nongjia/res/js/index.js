$(document).ready(function () {
    $(document).on('mouseover','.info_block',function () {
        $(this).addClass('show').siblings().removeClass('show');
    })
    $('.info_tab').on('click','a',function () {
        $(this).addClass('choose').siblings().removeClass('choose');
    })


    var times = 0;
    var time = setInterval(animate,2500)
    var length = $('.change_title').length - 1;
    $('.change_title').eq(0).css('display','inline-block');
    function animate() {
        times ++;
        if(times > length){
            times = 0;
        }
        $('.dots a').eq(times).addClass('choose').siblings().removeClass('choose');
        var right = (times * 100)+"%";
        $('.news_img').animate({'right':right},1000)
        $('.change_title').eq(times).css('display','inline-block').siblings('.change_title').hide();
    }
    
    $('.dots').on('click','a',function () {
        clearInterval(time)
        var index = $(this).index();
        var right = (index * 100)+"%";
        $('.dots a').eq(index).addClass('choose').siblings().removeClass('choose');
        $('.news_img').stop(true).animate({'right':right},1000);
        $('.change_title').eq(index).css('display','inline-block').siblings('.change_title').hide();
        times = index;
        time = setInterval(animate,2000)
    });
	$('.showMap').click(function(){
		$('.map').css('visibility','visible');						 
		//$('map').show();		 
	});
	$('.hideMap').click(function(){
		$('.map').css('visibility','hidden');	
	});

});
function setArea(_area){
	$('.map').css('visibility','hidden');
	$('#local_area').html(_area);	
}