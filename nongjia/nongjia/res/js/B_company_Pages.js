$(document).ready(function () {
    $(window).resize(function () {//当浏览器大小发生变化时，重新获取锁屏大小
        var locking = $('.locking');
        if(locking.css('display') == 'none'){return;}
        var D_width = document.body.clientWidth;
        locking.css({'width':D_width}).show();
        center('edit_block');
        center('edit_img');
    });
   $(document).on('click','.choose_tab',function () {
	   var companyLabelId = $(this).attr('id');
       if($('.no_m .btn_color_4').length == 5){ //选中标签
           if($(this).attr('data-choose')){
               $(this).removeClass('btn_color_4').addClass('btn_color_5').removeAttr('data-choose');
              changeLabelStauts(companyLabelId,1);
           }else{
               alert('已达上限')
           }
       }else{
           if($(this).attr('data-choose')){
               $(this).removeClass('btn_color_4').addClass('btn_color_5').removeAttr('data-choose');
               changeLabelStauts(companyLabelId,1);
           }else{
               $(this).removeClass('btn_color_5').addClass('btn_color_4').attr('data-choose',1);
               changeLabelStauts(companyLabelId,0);
           }
       }
   }) ;
    $('#cf').click(function () {  //新增自动以标签
        var new_tab = $('#new_tab');
        if($('.diy').length == 5){
            alert('最多添加5个自定义标签~');
            new_tab.val('');
            return
        }
        var value = new_tab.val();
    	if(!value){
    		alert('空标签无法被添加');
    		return; // 声明变量就要判断是否为null
    	}else{
    		$.ajax({  
	            type:"post",// 请求方式get/post
	            url:newPath+"/job/enterprise/saveLabel.action",// 请求对应的地址
	            data:{"labelInfo":value},// 往服务器传递的参数，
	            success:function(data){
	                var jdata = data.trim();
	                if(jdata=="fail"){  
	                    alert("查询失败!");  
	                }else{  
	               	 	var labelData = eval("("+data+")");
	               	 	$('.no_m').append('<span class="diy"><input id="'+labelData.companyLabelId+'" type="button" value="'+value+'" class="choose_tab btn btn_color_5 small_btn"/><strong strong class="closer">&times;</strong></span>');
	                }  
	            }  
	        }); 
    	new_tab.val('');
    	}
    });
    $(document).on('mousemove','.diy',function () { //显示删除按钮
       $(this).find('strong').show();
    }).on('mouseout','.diy',function () {
        $(this).find('strong').hide();
    });
	$(document).on('click','.closer',function () { //删除自定义标签
		var companyLabelId = $(this).siblings().attr('id');
		$.ajax({  
            type:"post",// 请求方式get/post
            url:newPath+"/job/enterprise/removeLabel.action",// 请求对应的地址
            data:{"companyLabelId":companyLabelId},// 往服务器传递的参数，
            success:function(data){
            }  
        });
		$(this).parents('.diy').remove();
	});

    $('.edit a').click(function () { //显示弹出层

        center('edit_block');
        $('.edit_block').show();
        $('.locking').show();
    });

    $('.close').click(function () { //关闭弹出层
        $('.edit_block').hide();
        $('.edit_img').hide();
        $('.locking').hide();
    });
    $('#upload').change(function () { //上传图片并显示预览
        var simpleFile = document.getElementById('upload').files[0];
        var fileObj = $(this).get(0).files; 
        var formdata = new FormData();
        formdata.append("imgFile", fileObj[0]);
        var reader = new FileReader();
        reader.onload=function(){
            $('.edit_images').attr('src',this.result); //写入图片路径
            $.ajax({  
            	type:"post",// 请求方式get/post
            	dataType : "json",
            	url:newPath+"/job/enterprise/attachmentUpload.action",// 请求对应的地址
            	data:formdata,// 往服务器传递的参数，
            	cache : false, 
            	contentType : false, 
            	processData : false,
            	dataType : "json", 
            	success:function(data){
            	}  
            });
        };
        reader.readAsDataURL(simpleFile);
    });

    $('.company_img').mouseover(function () {
       $(this).find('span').show();
    }).mouseout(function () {
        $(this).find('span').hide();
    });
    $('.company_img span').click(function () {
        center('edit_img');
        $('.edit_img').show();
        $('.locking').show();
    });

    $('#save_img').click(function () { //保存图片并关闭
        var edit_images = $('.edit_images');
        $('.edit_img').hide();
        $('.locking').hide();
        var img_src = edit_images.attr('src');
        edit_images.attr('src',newPath+'/nongjia/res/images/Agricultural/edit_upload_image.png');
        $('.Preview').attr('src',newPath+'/nongjia/res/images/Agricultural/Preview.png');
        $('#upload').val('');
        $('.company_img img').attr('src',img_src);
    })
    
    function changeLabelStauts(id,value){ //修改label状态
    	$.ajax({  
            type:"post",// 请求方式get/post
            url:newPath+"/job/enterprise/changeLabelStauts.action",// 请求对应的地址
            dataType : "json",
            data:{"companyLabelId":id,"disable":value},// 往服务器传递的参数，
            success:function(data){
            }  
       });
    }
    
    $('#province').change(function(){
    	var parentId = $(this).val();
    	if(!parentId)return; // 声明变量就要判断是否为null  
        $.ajax({  
            type:"post",//请求方式get/post  
            url:newPath+"/job/enterprise/getAreaInfo.action",//请求对应的地址  
            data:{"parentId":parentId},//往服务器传递的参数，  
            success:function(data){
                var jdata = data.trim();
                if(jdata=="fail"){  
                    alert("查询失败!");  
                }else{  
               	 var opData = eval("("+data+")");
               	 var html = "<option value=''>--请选择--</option>";
    				 for(var i=0;i<opData.length;i++){
    				 	html+="<option value='"+opData[i].areaId+"'>"+opData[i].areaName+"</option>";
    				 }
    				 $("#city").html(html);
                }  
            }  
        }); 
    });
    
    $('#city').change(function(){
    	var parentId = $(this).val();
    	if(!parentId)return; // 声明变量就要判断是否为null  
        $.ajax({  
            type:"post",//请求方式get/post  
            url:newPath+"/job/enterprise/getAreaInfo.action",//请求对应的地址  
            data:{"parentId":parentId},//往服务器传递的参数，  
            success:function(data){
                var jdata = data.trim();
                if(jdata=="fail"){  
                    alert("查询失败!");  
                }else{  
               	 var opData = eval("("+data+")");
               	 var html = "<option value=''>--请选择--</option>";
    				 for(var i=0;i<opData.length;i++){
    				 	html+="<option value='"+opData[i].areaId+"'>"+opData[i].areaName+"</option>";
    				 }
    				 $("#area").html(html);
                }  
            }  
        }); 
    });
    
    $("#saveBtn").click(function(){
    	 $.ajax({  
             type:"post",//请求方式get/post  
             url:newPath+"/job/enterprise/updateCompanyInfo.action",//请求对应的地址  
             data:$('#updateForm').serialize(),//往服务器传递的参数， 
             async:false,
             success:function(data){
            	 if(data>0){
            		 $('.edit_block').hide();
                     $('.edit_img').hide();
                     $('.locking').hide();      
                     location.reload();
            	 }
             }  
         });
    });
    
    //回填地区级联下拉框
    function loadArea(){
	    $('#province option').each(function(){
	        var opt = $(this).val();
	        if(opt == $("#provinceHidden").val()){
	           $(this).attr('selected',true);
	           $.ajax({
	               type:"post",//请求方式get/post  
	               url:newPath+"/job/enterprise/getAreaInfo.action",//请求对应的地址  
	               data:{"parentId":opt},//往服务器传递的参数，  
	               success:function(data){
	                   var jdata = data.trim();
	                   if(jdata=="fail"){  
	                       alert("查询失败!");  
	                   }else{  
	                  	 var opData = eval("("+data+")");
	                  	 var html = "<option value=''>--请选择--</option>";
	       				 for(var i=0;i<opData.length;i++){
	       				 	html+="<option value='"+opData[i].areaId+"'>"+opData[i].areaName+"</option>";
	       				 }
	       				 $("#city").html(html);
	       				 $("#city option").each(function(){
	       					var cpt = $(this).val();
	       					if(cpt==$("#cityHidden").val()){
	       						$(this).attr('selected',true);
	       						$.ajax({
	       			                type:"post",//请求方式get/post  
	       			                url:newPath+"/job/enterprise/getAreaInfo.action",//请求对应的地址  
	       			                data:{"parentId":cpt},//往服务器传递的参数，  
	       			                success:function(data){
	       			                    var adata = data.trim();
	       			                    if(adata=="fail"){  
	       			                        alert("查询失败!");  
	       			                    }else{  
	       			                   	 var opData = eval("("+data+")");
	       			                   	 var html = "<option value=''>--请选择--</option>";
	       			        				 for(var i=0;i<opData.length;i++){
	       			        				 	html+="<option value='"+opData[i].areaId+"'>"+opData[i].areaName+"</option>";
	       			        				 }
	       			        				 $("#area").html(html);
	       			        				 $("#area option").each(function(){
	       			        					 var apt = $(this).val();
	       			        					 if(apt==$("#areaHidden").val()){
	       			        						$(this).attr('selected',true);
	       			        					 }
	       			        				 });
	       			                    }  
	       			                }  
	       			            }); 
	       					 }
	       					 
	       				 });
	                   }  
	               }  
	           });
	           
	        }
	        
	     });
    }
    
    //回填企业性质下拉框
    function loadCompanyType(){
    	$('#companyType option').each(function(){
    		var opptionValue = $(this).val();
    		if(opptionValue==$("#companyTypeHidden").val()){
    			$(this).attr('selected',true);
    		}
    	});
    }
    
  //回填企业规模下拉框
    function loadCompanyScale(){
    	$('#companyScale option').each(function(){
    		var opptionValue = $(this).val();
    		if(opptionValue==$("#companyScaleHidden").val()){
    			$(this).attr('selected',true);
    		}
    	});
    }
    //修改文本域内容
    function textareaChangeInfo(){
    	var msg = $("#described").text();
    	msg = msg.replace(/\<br\/\>/g,"\r\n");
    	$("#described").text(msg);
    }
    
    textareaChangeInfo();
    loadCompanyType();
    loadCompanyScale();
    loadArea();
    loadPage();
});