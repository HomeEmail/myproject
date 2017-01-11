$(document).ready(function () {
	
	//初始化分页部分
	loadPage();
	
    $('.showTag div').click(function () {
        var info_arrow = $('.info_arrow');
        var index = $(this).index();
        var width =info_arrow.eq(index).parent().width();
        var left = parseInt((width - 20 ) / 2);
        info_arrow.css('left',left);
        $(this).addClass('select').siblings().removeClass('select');
    });
    var times = 0;
    var time = setInterval(animate,2500);
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
    })
});
//切换资讯类型
function selectInfoType(_typeId){
	$("#pageValue").val(1);
	$("#pageSizeValue").val(10);
	$("#typeIdValue").val(_typeId);
	$("#pageForm").submit();
}
