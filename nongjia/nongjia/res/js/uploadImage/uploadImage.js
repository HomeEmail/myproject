/*$(document).ready(function () {
   imgChange('showImg','image','file',3);
});*/
var i = 0;
function imgChangeshow(wrap,parent,Img,inputid,inputName,num,text) {    //最外层元素id input父元素  img的class input的id 设置name值 上传图片的上限  上传文字
	
    var max = num;
    var object = $('#'+inputid);
    $("#"+wrap).on('change','#'+inputid,function(e){
        	//var file = e.target.files||e.dataTransfer.files;
            var _this = $(this);
            
            //ie
            var pic =$('.'+Img);
            file = document.getElementById(inputid);
		    var isIE = navigator.userAgent.match(/MSIE/)!= null;
		    if(isIE) {
		        file.select();
		        var reallocalpath = document.selection.createRange().text;
		            //通过滤镜来实现写入img
		           _this.parent().find(Img).css({'filter':"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath,'z-index':100} );
		           $('<a class="delImg">&times;</a>').insertAfter(_this);
		           afterChange();
		            //_this.parent().find(Img).attr('src','data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
		    }else{   //非ie
            	var simpleFile = document.getElementById(inputid).files[0];
                var reader = new FileReader();
                reader.onload=function(){
                    _this.siblings('img').attr('src',this.result).css('z-index',100); //写入图片路径
                    $('<a class="delImg">&times;</a>').insertAfter(_this); //添加删除
                    afterChange();
                };
                reader.readAsDataURL(simpleFile);
            }
    });
    function afterChange(){
  	  if($('#'+wrap).find('div').length == max){
            //alert('已经达到上传上限')
            return;
        }else if( max > 1){   //change后 继续新增
            ++i;
            createNew(text,inputid+i);
            imgChangeshow(wrap,parent,Img,inputid+i,inputName,num,text);
        }
    }
    object.parent('div').mouseover(function () {
        $(this).find('.delImg').show();
    }).mouseout(function () {
        $(this).find('.delImg').hide();
    });
    object.parent().on('click','a',function () {
       
        var flag;
        $("#"+wrap).find('input').each(function () {
            if ($(this).val() == '') { //判断是否有值为空的type为file的input
                flag = true;
            }
        });
        if(max == 1){
           $('#'+wrap).find("."+parent).empty(); //清空并新增
            $('#'+wrap).find('div').append('<span>'+text+'</span> <img class='+Img+' src="" alt=""><input name='+inputName+' type="file" id='+inputid+' >')
        }else {
            if(flag){            //删除
                $(this).parent().remove();
            }else {				//删除后新增
                $(this).parent().remove();
                i++;
                createNew(text, inputid + i);
                imgChangeshow(wrap,parent,Img,inputid+i,inputName,num,text);
            }
        }

    });
    function createNew(str,inputid) {
        $('#'+wrap).append('<div class="showImg"><span>'+str+'</span><img class='+Img+' src="" alt=""><input type="file" name='+inputName+' id='+inputid+' ></div>')

    }
}

