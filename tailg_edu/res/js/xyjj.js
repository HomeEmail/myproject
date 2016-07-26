

//企业荣誉 banner
$('#xyjjQyryFoo').carouFredSel({
	auto: false,
	prev: '#xyjjQyryPrev',
	next: '#xyjjQyryNext',
	pagination: "#xyjjQyryPagination",
	mousewheel: true,
	swipe: {
		onMouse: true,
		onTouch: true
	}
});

//企业荣誉 放大图

$('#xyjjQyryFoo .xyjjQyry-img img').on('click',function(e){
	var src=$(this).attr('src');
	var content='<div style="text-align:center;"><span class="pr dib" style="margin-top: 26px;"><img src="'+src+'" height="474" /><div class="pa xyjjQyryImgBig-close" onclick="hideOverlayBox(\'xyjjQyryImgBig\');"></div></span></div>';
	showOverlayBox({
		id:'xyjjQyryImgBig'
		,height:500
		,content:content
		,background:'none'
	});
});





