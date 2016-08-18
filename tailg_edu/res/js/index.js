
$(function(){

var indexTopBanner = new Swiper('#indexTopBanner',{
	pagination: '.indexTopBanner-pagination'
	,paginationClickable: true
	// ,autoplay:true
	// ,loop:true
	// ,speed:300
});
var slides=$('#indexTopBanner .swiper-slide');
var paginations=$('.indexTopBanner-pagination .swiper-pagination-switch');
slides.each(function(i,n){
	var src=$(n).attr('data-thumbimg');
	//$(paginations[i]).append('<img src="'+src+'" />');
	$(paginations[i]).css('background-image','url('+src+')');
});

//indexTopBanner.startAutoplay();
//console.log(indexTopBanner);
// var indexTopBannerTimer =setInterval(function(){
// 	//console.log(indexTopBanner.activeIndex);

// 	//indexTopBanner.swipeTo();
// },6000);


//培训通知 banner
$('#indexPxtzFoo').carouFredSel({
	auto: true,
	//prev: '#prev2',
	//next: '#next2',
	pagination: "#indexPxtzPagination",
	mousewheel: true,
	swipe: {
		onMouse: true,
		onTouch: true
	}
});

//名师团队 banner
$('#indexMstdFoo').carouFredSel({
	auto: false,
	prev: '#indexMstdPrev',
	next: '#indexMstdNext',
	pagination: "#indexMstdPagination",
	mousewheel: true,
	swipe: {
		onMouse: true,
		onTouch: true
	}
});


//学员风采 banner
$('#indexXyfcFoo').carouFredSel({
	auto: true,
	//prev: '#indexXyfcPrev',
	//next: '#indexXyfcNext',
	pagination: "#indexXyfcPagination",
	mousewheel: true,
	swipe: {
		onMouse: true,
		onTouch: true
	}
});

//台铃产品中心 banner
$('#indexProFoo').carouFredSel({
	auto: false,
	prev: '#indexProPrev',
	next: '#indexProNext',
	pagination: "#indexProPagination",
	mousewheel: true,
	swipe: {
		onMouse: true,
		onTouch: true
	}
});










});