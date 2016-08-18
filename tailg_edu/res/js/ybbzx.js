

$(function(){
/**点击视频播放**/
// $('#jcspVideoPlay').on('click',function(e){
// 	//开始计时
// 	console&&console.log('开始计时');
// });

	/**iframe 自适应高度**/
	// $('#ybbzxDetailLianxiFrame').load(function(e){
	// 	$(this).height($(this).contents().find("body").height() + 40);
	// });

	/*****云班别中心详细页 联系题*****/
	/**单击答案选项 提示回答正确与否*/
	var isSelectAnsItem=false;//是否已作答
	$('.ybbzxDetail-lianxi-ans-item-content').on('click',function(e){
		if(!!isSelectAnsItem) return;//已作答

		var $this=$(this);
		var thisCount=$this.children('.count-icon').html();
		var ans=$this.attr('data-ans');
		if(ans==thisCount){
			//答对了
			$this.siblings('.ybbzxDetail-lianxi-ans-success').show();
		} else{
			//搭错了
			$this.siblings('.ybbzxDetail-lianxi-ans-error').show();
		}
		$this.hide();
		$('.ybbzxDetail-lianxi-ans-ok-show').html(ans);
		$('.ybbzxDetail-lianxi-nav-center').show();
		isSelectAnsItem=true;
	});

	/**我的笔记操作逻辑**/
	$('#ybbzxDetailNoteShowWrapper').on('click',function(e){
		var str=$('#ybbzxDetailNoteShow').html();
		$(this).hide();
		$('#ybbzxDetailNoteValue').val(str);
		$('#ybbzxDetailNoteForm').show();
	});
	$('#ybbzxDetailNoteEditSaveBt').on('click',function(e){
		//ajax 提交,成功后返回笔记结果
		//....
	});

});
