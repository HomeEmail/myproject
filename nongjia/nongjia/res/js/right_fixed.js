$(document).ready(function () {
    var content_left = $('.content').offset().left;
    var left = content_left ;
    $(window).resize(function () {//当浏览器大小发生变化时，重新获取锁屏大小
        content_left = $('.content').offset().left;
        left = content_left ;

        if(parseInt(document.body.clientWidth) == 1200){
            $('.r_main').css({'right':'',"left":875})
        }else{
            $('.r_main').css({'right':left,'left':''})
        }



    });
    if(parseInt(document.body.clientWidth) == 1200){
        $('.r_main').css({'right':'',"left":875})
    }else{
        $('.r_main').css('right',left)
    }	
});
$(window).scroll(function(event){
	var top = $('.l_main').offset().top;
	var documentWindow = document.body.scrollTop;
	if(documentWindow == 0){
		$('.r_main').css({'position':'absolute','top':top})
	}else if(documentWindow > top - 1){
		$('.r_main').css({'position':'fixed','top':0})
	}
});