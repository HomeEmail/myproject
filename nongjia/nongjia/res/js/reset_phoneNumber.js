$(document).ready(function () {
    var k = 60;
    var times;
    $('.send_message').click(function () {
    	var _this = $(this);
        //获取标识
		var a = '';
		interval(_this,a,60)
        var flag = $(this).data("code");
		if(flag==0){
			var phone = $("#oldPhone").val();
			if(isEmpty(phone)){
				alert("旧手机号不能为空！");
				$("#oldPhone").focus();
				return false;
			}
			if(!is_cellphoneNum(phone)){
				alert("手机号格式有误！");
				$("#oldPhone").select();
				return false;
			}
			sendCode(_this,phone,flag);
		}else if(flag==1){
			var phone = $("#userPhone").val();
			if(isEmpty(phone)){
				alert("新手机号不能为空！");
				$("#userPhone").focus();
				return false;
			}
			if(!is_cellphoneNum(phone)){
				alert("手机号格式有误！");
				$("#userPhone").select();
				return false;
			}
			sendCode(_this,phone,flag);

		}
		interval(_this,a,60)
    });
    
    /*发送验证码*/
	function sendCode(_this,phone,flag){
		$.ajax({
			type:"post",
			url:newFrontPath+"/phone/sendCode.action",
			data:{"phone":phone,"flag":flag},
			success:function(data){
				var jsonData = eval("("+data+")")
				//alert(jsonData);
				if(jsonData=="isNotExistPhone"){
					alert("当前输入手机号和旧手机号不一致，请重新输入...");
					$("#oldPhone").val("");
					return;
				}
				_this.css('background-color', '#999999').val('60s后可重新发送');
				interval(_this,times, k);
				_this.css('cursor', 'not-allowed');
				_this.attr('disabled', 'disabled')
			}
		});
	}
	
    /*倒计时*/
    function interval(_this, name, num) {
        name = setInterval(function () {
        	num--;
            _this.css('background-color', '#999999').val(num + 's后可重新发送');
            if (num == 0) {
                _this.css('background-color', '#00D12C').val('获取短信验证码');
                clearInterval(name);
                _this.css('cursor', 'pointer');
                _this.removeAttr('disabled');
                num = 60;
            }
            
        }, 1000);
    }
});