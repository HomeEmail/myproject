//根据手机宽度改变banner的高度,2:1
function changeBannerHeight (argument) {
	// body...
	var w=$(window).width();
	$('#slideBox').height(w/2);
	$('#slideDetailBox').height(w/2);
}
changeBannerHeight();

var indexScrollBanner

	;

indexScrollBanner = new Swiper('#slideBox',{
    pagination: '#slideIndicator',
    paginationClickable: true,
    slidesPerView: 1,
    loop: true,
    autoplay:5000,
    onFirstInit:bannerPageChangeTips,
    onSlideChangeEnd:bannerPageChangeTips
});
function bannerPageChangeTips(swiper){
	//console.log(swiper.paginationButtons.length);//总数
	var els=swiper.paginationButtons
		,total=els.length
		,cur=0
	;
	for (var i = els.length - 1; i >= 0; i--) {
		if($(els[i]).hasClass('swiper-active-switch')){
			cur=i+1;
			break;
		}
	};
	//console.log(cur);//当前第几个
	$('.slide-cur').text(cur);
	$('.slide-total').text(total);
}

tapOn($('#slideBoxLastBt'),function(e){
	e.preventDefault();
	indexScrollBanner.swipePrev();
});

tapOn($('#slideBoxNextBt'), function(e){
	e.preventDefault();
	indexScrollBanner.swipeNext();
});


/**有点点指示的*/
/**品牌资讯详细页*/
detailScrollBanner = new Swiper('#slideDetailBox',{
    pagination: '#slideIndicator',
    paginationClickable: true,
    slidesPerView: 1,
    loop: true,
    autoplay:5000
});
/**台铃公益*/
function gongyiBannerChangeH(){
	var w=$(window).width();
	$('#slideBoxGongyi').height(Math.floor(w/(640/200)));
}
gongyiBannerChangeH();
gongyiScrollBanner = new Swiper('#slideBoxGongyi',{
    pagination: '#slideIndicator',
    paginationClickable: true,
    slidesPerView: 1,
    loop: true,
    autoplay:5000
});




/*证书*/
ryzlScrollBannerZS = new Swiper('#slideBoxZS',{
    pagination: '#slideIndicator',
    paginationClickable: true,
    slidesPerView: 1,
    loop: true
});

tapOn($('#slideBoxLastBtZS'),function(e){
	e.preventDefault();
	ryzlScrollBannerZS.swipePrev();
});

tapOn($('#slideBoxNextBtZS'), function(e){
	e.preventDefault();
	ryzlScrollBannerZS.swipeNext();
});

