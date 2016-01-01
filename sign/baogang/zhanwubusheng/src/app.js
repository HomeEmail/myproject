(function() {

	//global setting

	var rem;

	$(document).ready(countRem);
	$(window).resize(countRem);


	function countRem() {
		var width = $('body').width();
		rem = parseInt(width / 30); //-parseInt(width/30)%2;
		//rem=rem<16?16:rem;
		$('html').css('font-size', rem);
	}


	//index


	$('.img-btn').on('click', function(e) {

		changePage('test');

	});



	//test
	var answers = [];
	$('.body-test').on('click', 'dd', function(e) {
		
		if (!$(this).parent().find('.selected').length) {
			
			$(this).addClass('selected');
			answers.push($(this).parent().children().index(this));

			$(this).parent().parent().children().css('top', '-' + (answers.length * 20) + 'rem');

			if (answers.length == 6) {
				var result=1;//学霸
				for (var ii = answers.length - 1; ii >= 0; ii--) {
					if(answers[ii]!=right[ii]){
						result=0;//学徒
						break;
					}
				};
				/*
				 返回的数据json对象如下:
				 {
				 	good:300,	//学徒数量
				 	soso:253,	//学霸数量
				 }
				 * */
				 
				// $.ajax({
				// 	url:'/zhanwubusheng/answers',
				// 	data:{result:result},//0:学徒，1:学霸
				// 	dataType:'json',
				// 	type:'post',
				// 	success:function(data){
					
				// 		$('.line-4 span').text(data.good+data.soso);
				// 		$('.good-num').text(data.good);
				// 		$('.soso-num').text(data.soso);
				// 		$('title').text('我是第'+(data.good+data.soso)+'个参与“湛无不胜”答题的，我获得“'+(data.result?'学霸':'学徒')+'”称号，你也一起挑战吧？');
						
				// 		changePage(result?'good':'soso');
				
				// 		var $test = $('.body-test>div').clone();
				// 		$test.addClass('result').appendTo('.body-'+(result?'good':'soso'));
				// 		$test.find('dl').css('top', 0).each(function(index, elem) {
				// 			$(this).find('dd').eq(right[index]-1).append(' <b> [正确]</b>');
				// 		});
						
				// 	},
				// 	error:function(e){
				// 		alert('很抱歉，机器貌似崩了，请稍后再尝试！');

				// 	},
				// });




				//测试用的begin
				var data = {
				 	good:300,	//学徒数量
				 	soso:253,	//学霸数量
				 	result:result ,   //0:学徒，1:学霸
				 	right: right //正确答案
				};
				
				$('.line-4 span').text(data.good+data.soso);
				$('.good-num').text(data.good);
				$('.soso-num').text(data.soso);
				$('title').text('我是第'+(data.good+data.soso)+'个参与“湛无不胜”答题的，我获得“'+(data.result?'学霸':'学徒')+'”称号，你也一起挑战吧？');
				
				changePage(data.result?'good':'soso');
				var rightTest=data.right;
				var $test = $('.body-test>div').clone();
				$test.addClass('result').appendTo('.body-'+(data.result?'good':'soso'));
				$test.find('dl').css('top', 0).each(function(index, elem) {
					$(this).find('dd').eq(rightTest[index]-1).append(' <b> [正确]</b>');
				});
				//测试用的end
				
				
			}

		}
	});



	// good soso


	$('body').on('click', '.again-btn', function(e) {
		answers = [];
		changePage('test');
		$('.body-test>div').find('dl').css('top', 0).find('.selected').removeClass('selected');
		$('.result').remove();
		$('title').text('湛无不胜');
	});

	$('body').on('click', '.show-btn', function(e) {
		$('.backdrop').show();
	});
	$('body').on('click', '.backdrop', function(e) {
		$('.backdrop').hide();
	});















	function changePage(p) {
		$('body').removeClass().addClass('page-' + p);
		//window.scrollTo(0,0);
	}


})($)