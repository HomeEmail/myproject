// JavaScript Document
function keyboard(_top,_left,_width,_height){
	this.top    = typeof(_top)    != "undefined" ? _top    : 100;
	this.left   = typeof(_left)   != "undefined" ? _left   : 500;
	this.height = typeof(_height) != "undefined" ? _height : 300;
	this.width  = typeof(_width)  != "undefined" ? _width  : 500;
	this.x = 2;
	this.y = 0;
	this.currData = [];
	this.inputTxt = "";
	this.dataObj = {
		"subFlag" : false,
		"numberStauts":0,
		"capitalStatus":0,
		"number":["数字","1","2","3","清空","小写","4","5","6","删除","0","7","8","9","确定"],
		"capital":["数字",",.?@","ABC","DEF","清空","小写","GHI","JKL","MNO","删除","空格","PQRS","TUV","WXYZ","确定"],
		"lowercase":["数字",",.?@","abc","def","清空","大写","ghi","jkl","mno","删除","空格","pqrs","tuv","wxyz","确定"],
		"subData":[
			[
				[",",".","?","?"],
				["a","b","c",""],
				["d","e","f",""],
				["g","h","i",""],
				["j","k","l",""],
				["m","n","o",""],
				["p","q","r","s"],
				["t","u","v",""],
				["w","x","y","z"]
			],
			[
				[",",".","?","?"],
				["A","B","C",""],
				["D","E","F",""],
				["G","H","I",""],
				["J","K","L",""],
				["M","N","O",""],
				["P","Q","R","S"],
				["T","U","V",""],
				["W","X","Y","Z"]	
			]
		],
	};
	this.$ = function(id) {
		return document.getElementById(id);
	};
	this.init = function(){
		this.showData();
		this.setFocus();
	};
	this.showData = function(){
		if(this.dataObj.numberStauts == 1){
			this.currData = this.dataObj.number;	
		}else if(this.dataObj.capitalStatus == 1){
			this.currData = this.dataObj.capital;		
		}else{
			this.currData = this.dataObj.lowercase;	
		}
		for(var i=0;i<3;i++){
			for(var j=0;j<5;j++){
				this.$("ke_"+ i + j).innerText = this.currData[i*5 + j];
			}	
		}
		this.setFocus();
	};
	this.setFocus = function(){
		this.$("focus").innerText = this.currData[this.y*5 + this.x];
		this.$("kb_focus").style.top  = parseInt(this.y*100) +"px";
		this.$("kb_focus").style.left = parseInt(this.x*100) +"px";	
	};
	this.changeX = function(_num){
		if(!this.dataObj.subFlag){
			this.x += _num;
			if(this.x < 0){
				this.x = 0;	
			}else if(this.x > 4){
				this.x = 4;
			}
			this.setFocus();
		}else{
			if(_num < 0){
				this.inputTxt += this.getSubLetter().left;
			}else{
				this.inputTxt += this.getSubLetter().right;
			}
			this.dataObj.subFlag = false;
			$("sub_focus").style.webkitTransform = "scale(0)";
		}
	};
	this.changeY = function(_num){
		if(!this.dataObj.subFlag){
			this.y += _num;
			if(this.y < 0){
				this.y = 0;	
			}else if(this.y > 2){
				this.y = 2;
			}
			this.setFocus();
		}else{
			if(_num < 0){
				this.inputTxt += this.getSubLetter().top;
			}else{
				this.inputTxt += this.getSubLetter().bottom;
			}
			this.dataObj.subFlag = false;
			$("sub_focus").style.webkitTransform = "scale(0)";
		}
	};
	this.clickAction = function(){
		if(this.x == 0){
			if(this.y == 0){
				this.dataObj.capitalStatus = 1;
				this.dataObj.numberStauts = 1;
				this.showData();
			}else if(this.y == 1){
				this.dataObj.numberStauts = 0;
				this.dataObj.capitalStatus = this.dataObj.capitalStatus == 1 ? 0 : 1;
				this.showData();
			}else if(this.y == 2){
				if(this.dataObj.numberStauts == 1){
					this.inputTxt += 0;	
				}else{
					this.inputTxt += " ";	
				}
			}
		}else if(this.x == 4){
			if(this.y == 0){
				this.inputTxt = "";
			}else if(this.y == 1){
				this.inputTxt = this.inputTxt.substring(0,this.inputTxt.length-1);
			}else if(this.y == 2){
				//
			}
		}else{
			if(!this.dataObj.subFlag){
				if(this.dataObj.numberStauts == 0){
					this.showSubLetter();
				}else{
					this.inputTxt += this.y*3 + this.x;
				}
			}else{
				this.inputTxt += this.getSubLetter().top;
				this.dataObj.subFlag = false;
				$("sub_focus").style.webkitTransform = "scale(0)";
			}
		}
	};
	this.showSubLetter = function(){
		this.dataObj.subFlag = true;
		$("sub_focus").style.webkitTransform = "scale(1)";
		var dataList = this.dataObj.capitalStatus == 0 ? this.dataObj.lowercase[this.y*5 + this.x] : this.dataObj.capital[this.y*5 + this.x];
		$("button_top").innerText    = dataList.substring(0,1);
		$("button_left").innerText   = dataList.substring(1,2);
		$("button_right").innerText  = dataList.substring(2,3);
		$("button_bottom").innerText = dataList.length > 3 ? dataList.substring(3,4) : "";
	};
	this.getSubLetter = function(){
		var obj = {};
		obj.top = $("button_top").innerText;
		obj.left = $("button_left").innerText;
		obj.right = $("button_right").innerText;
		obj.bottom = $("button_bottom").innerText;
		return obj;
	};
	this.kbObj = function(){
		return this.inputTxt;
	};
}