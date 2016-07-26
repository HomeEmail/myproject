//计算总价格
function calculateTotalPrice(){
	var total=0,goodsNum=0,key;
	//var key;
	for(key in goodsMapObj){
		//console.log(key);
		if(goodsMapObj[key].selected===true){
			goodsNum+=goodsMapObj[key].count;
			total+=goodsMapObj[key].price*goodsMapObj[key].count;
		}
	}
	//show
	//console.log(total);
	$('#totalCartPrice').text('￥'+parseFloat(total).toFixed(2));
	$('#totalCartGoodsNum').text(goodsNum);
	
}

//购买数量操作回调
function goodOrderCountActionCallback(num,id){
	goodsMapObj[id].count=num;//console.log(num);
	////根据goodsMapObj['11']，发送ajax请求后台修改数量
	//...
	
	//修改数量
	
	$.ajax({
		url: "edit.jhtml",
		type: "POST",
		data: {id:id,quantity:num},
		dataType: "json",
		success: function(data) {
			if (data.message.type =="success") {
				  //alert('修改成功！');
			}else{
			  alert(data.message);
			}
		},
		failure:function(str){
			alert(str);
		}
	});
	
	calculateTotalPrice();
	
}
//选择商品操作回调
function cartGoodsSelectCallback(isSelected,id){
	//console.log(isSelected);
	//console.log(id);
	goodsMapObj[id].selected=isSelected;
	calculateTotalPrice();
	if(!!!isSelected){
		allSelectCartGoods.setSelected(false,false);//设置全选状态
	}
}
var goodOrderCountObjAry=[];
var cartGoodsSelectBtAry=[];
function dataBindInit(){
	var key;
	for(key in goodsMapObj){
		//改变价格格式
		goodsMapObj[key].yunfei=parseFloat(parseFloat(goodsMapObj[key].yunfei.replace('￥','')).toFixed(2));
		//购买数量操作
		goodOrderCountObjAry.push(
			new goodOrderNumAction({
				delId:'#goodsDelCountBt-'+key
				,addId:'#goodsAddCountBt-'+key
				,numInit:goodsMapObj[key].count
				,showId:'#goodsOrderCountInput-'+key
				,id:key
				,callback:goodOrderCountActionCallback
			})
		);
		//选择商品操作
		cartGoodsSelectBtAry.push(
			new superCheckBox({
				selector:'#cartGoodsSelectBt-'+key
				,id:key
				,selected:!!goodsMapObj[key].selected
				,callback:cartGoodsSelectCallback
			})
		);
	}
	calculateTotalPrice();//初始化计算总价格
}
dataBindInit();

//全选
var allSelectCartGoods = new superCheckBox({
	selector:'.allSelectCartGoods'
	,callback:function(isSelected){//console.log(isSelected);
		var key;
		for(key in goodsMapObj){
			if(!!!isSelected){
				goodsMapObj[key].selected=false;
				$('.cart-list .checkBox').removeClass('selected');
			} else {
				goodsMapObj[key].selected=true;
				$('.cart-list .checkBox').addClass('selected');
			}
		}
		calculateTotalPrice();
	}
});

//结算按钮
$('#submitCartToOrderBt').on('tap',function(e){
	var goodsIdAry=[],key;
	for(key in goodsMapObj){
		if(!!goodsMapObj[key].selected){
			goodsIdAry.push(key);
		}
	}
	//ajax 提交订单
	
});

//删除商品功能js
var overlayDeleteTips=new overlay({
	overlayId:'cartDeleteGoodsTips'
});
$('#cartDeleteGoodsBt').on('tap',function(e){
	overlayDeleteTips.show();
});
$('#cartDeleteGoodsCloseBt').on('tap',function(e){
	overlayDeleteTips.hide();//取消
});
$('#cartDeleteGoodsSureBt').on('tap',function(e){
	//确定删除
	var deleteGoodsId=[],key;
	for(key in goodsMapObj){
		if(!!goodsMapObj[key].selected){
			goodsMapObj[key].selected=false;
			$('.cart-list-item-'+key).remove();
			deleteGoodsId.push(key);
			goodsMapObj[key]=null;
			delete goodsMapObj[key];//销毁数据
		}
	}
	//根据deleteGoodsId，发送ajax请求后台删除

	
				$.ajax({
					url: "delete.jhtml",
					type: "POST",
					data: {id:deleteGoodsId.toString()},
					dataType: "json",
					success: function(data) {
						if (data.message.type =="success") {
							//alert('删除成功！');
						}
					}
				});
			
							overlayDeleteTips.hide();//对话框消失
							calculateTotalPrice();//从新计算总价格
	

	
	//...
	//allSelectCartGoods.setSelected(false,false);//改变全选按钮状态
});