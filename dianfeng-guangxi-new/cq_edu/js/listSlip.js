/*
 +------------------------------------------------------------------------------
 * 单行单列对象
 +------------------------------------------------------------------------------
	var parmObj = {
		DivId:        "L",             //行DIV的ID名称   
		focusId:      "focus",         //焦点的ID
		arrLength:     listArr.length, //数据总长度
		listSize:      7,              //行数
		rowHeight:     40,             //行高
		focusStartPos: 85              //显示的第一行焦点Y轴坐标
	    direction:     "top"           //方向 top 纵向 left 横向
//		cycle:         0,              //0：不循环，1：循环 ，默认为0,不循环
//		duration:      "200ms",        //速度，默认为300ms
//		pageType:      1,              //0，不翻页  1：翻页
	};
 +------------------------------------------------------------------------------
*/
function listSlip(_parmObj){
	
	this.$ = function(_id){return document.getElementById(_id);}
	this.rowDivName = _parmObj.DivId; //行DIV的ID名称 
	this.focusObj = this.$(_parmObj.focusId); //焦点的ID
	this.arrLength = _parmObj.arrLength; //数据总长度
	this.listSize = _parmObj.listSize; //列表显示的条目数
	this.rowHeight = _parmObj.rowHeight;//焦点移动的行高
	this.focusStartPos = _parmObj.focusStartPos;//焦点 在显示的第一行焦点Y轴坐标
	this.direction  = typeof(_parmObj.direction)=="undefined"?"top" : _parmObj.direction; //方向
	this.cycle = _parmObj.cycle||0; //0：不循环，1：循环 ，默认为0,不循环
	this.duration = _parmObj.duration || "300ms";
	this.pageType = _parmObj.pageType||0; //0，不翻页  1：翻页	
	this.listPos = 0; //数据位置 默认在 0
	this.focusPos = 0; //焦点位置 默认在 0
	this.startline = 0;//起始行 从0开始数
	this.endline   = this.listSize-1;//其实列 从0开始数
	this.firstFlag = true;//按向上的时候是否能滑到 第一条行目的位置
	this.lastFlag = false;//按向下的时候是否能滑到 最后一条行目的位置;
	this.recordLdiv = []; //记录滑动DIV位置；
	this.firstDivTop = parseInt(this.$(this.rowDivName+0).style[this.direction]);//第一个DIV的位置
	this.topDivTop = this.firstDivTop-this.rowHeight; //移动行DIV最上面的位置；
	this.bottomDivTop = parseInt(this.$(this.rowDivName+this.listSize).style[this.direction]);//移动行DIV最下面的位置；	
	var keyFlag = 0;
	
	this.haveData = function(){}; //在显示列表信息时，有数据信息就会调用该方法；
	this.notData = function(){}; //在显示列表信息时，无数据信息就会调用该方法；
	/*初始化输出信息*/

	this.initInfo = function(){
		//清除所有信息
		for(var i=0;i<this.listSize+1;i++){
			this.notData(i);
		}
		//还原DIV位置、创建最初的DIV顺序
		for(var i=0;i<this.listSize+1;i++){
			this.$(this.rowDivName+i).style.webkitTransitionDuration = "0ms";
			this.$(this.rowDivName+i).style[this.direction] = this.firstDivTop+this.rowHeight*i+"px";
			this.$(this.rowDivName+i).style.webkitTransitionDuration = this.duration;
			this.recordLdiv[i]=i;
		}
		//输出信息
		if(this.cycle==0||this.pageType==1){
			//add("this.arrLength:"+this.arrLength)		
			var position = this.listPos-this.focusPos;//当前页第一个
			for(var i=0; i<this.listSize+1; i++){
				this.recordLdiv[i]=i;				
				if(i+position<this.arrLength)this.haveData(i,i+position);
			}
		}else{
			var posArr = [];
			for(var i=0;i<this.listSize;i++){
				if(i<this.focusPos)posArr[i] = (this.listPos+this.arrLength-this.focusPos+i)%this.arrLength;
				else if(i==this.focusPos)posArr[i]=this.listPos;
				else posArr[i] = (this.listPos+i-this.focusPos)%this.arrLength;
			}
			for(var i=0;i<this.recordLdiv.length-1;i++)this.haveData(i,posArr[i]);
		}
	}
	/*行DIV移动*/
	this.moveLdiv = function(_num){
		keyFlag = 1;
		this.$(this.rowDivName+this.recordLdiv[this.recordLdiv.length-1]).style.webkitTransitionDuration = "0ms";
		this.$(this.rowDivName+this.recordLdiv[this.recordLdiv.length-1]).style[this.direction] =( _num>0?this.bottomDivTop:this.topDivTop ) + "px";
		var self = this;
		setTimeout(function(){
			self.$(self.rowDivName+self.recordLdiv[self.recordLdiv.length-1]).style.webkitTransitionDuration = self.duration;
			for(var i=0;i<self.listSize+1;i++){
				self.$(self.rowDivName+i).style[self.direction] = parseInt($(self.rowDivName+i).style[self.direction]) - _num*self.rowHeight + "px";
			}
			self.reLdiv(_num);
		},50);
		setTimeout(function(){
			 keyFlag = 0;
		},60);
	}
	/*行移动后重新标记位置*/
	this.reLdiv = function(_num){
		if(_num>0){
			var temp = this.recordLdiv[0];
			this.recordLdiv.shift();
			this.recordLdiv.push(temp);
		}
		else {
			var temp = this.recordLdiv[this.recordLdiv.length-1];
			this.recordLdiv.pop();
			this.recordLdiv.unshift(temp);
		}
	}
	/*获取焦点*/
	this.onfocus = function(){
		this.focusObj.style.opacity = 1;
		this.focusObj.style[this.direction] = this.focusStartPos + this.rowHeight*this.focusPos +"px";
	}
	/*移动焦点的函数*/
	this.changeFocus =  function(_num){
		if(keyFlag==1)return;
		var focusPosTemp = this.focusPos;
		var listPosTemp = this.listPos;
		this.focusPos += _num;
		this.listPos += _num;
		if(this.pageType==0){//不翻页
			if(this.cycle==0){
				//不循环
				if(this.listSize>this.arrLength){
					if(this.listPos<0){this.listPos=0;this.focusPos=0;return;}
					if(this.listPos>this.arrLength-1){this.listPos=this.arrLength-1;this.focusPos=focusPosTemp;return;}
				}else if(this.focusPos<this.startline&&_num==-1){
					if(this.firstFlag==true&&this.listPos==this.focusPos){
						if(this.listPos<0){this.listPos=0;this.focusPos=0;return;}
						this.onfocus();
						return;
					}else {
						this.focusPos=focusPosTemp;
						if(this.listPos<0){this.listPos=0;return;}
					}
					if(this.listPos-this.startline>=0){
						this.haveData(this.recordLdiv[this.recordLdiv.length-1],this.listPos-this.startline);
					}else this.notData(this.recordLdiv[this.recordLdiv.length-1]);
					this.moveLdiv(-1);
					return;
				}
				else if(this.focusPos>this.endline&&_num==1){
					if(this.lastFlag==true&&this.listPos+this.listSize-this.endline>this.arrLength){
						if(this.listPos>this.arrLength-1){this.listPos=this.arrLength-1;this.focusPos=this.listSize-1;return;}
						this.onfocus();
						return;
					}
					else {
						this.focusPos=focusPosTemp;
						if(this.listPos>this.arrLength-1){this.listPos=this.arrLength-1;return;}
					}
					if(this.listPos+this.listSize-this.endline-1<this.arrLength){
						this.haveData(this.recordLdiv[this.recordLdiv.length-1],this.listPos+this.listSize-this.endline-1);
					}
					else this.notData(this.recordLdiv[this.recordLdiv.length-1]);
					this.moveLdiv(1);
					return;
				}
				this.onfocus();
			}else {
				//循环
				if(this.listSize>this.arrLength){
					if(this.listPos<0){this.listPos=0;this.focusPos=0;return;}
					if(this.listPos>this.arrLength-1){this.listPos=this.arrLength-1;this.focusPos=focusPosTemp;return;}
				}else if(this.focusPos<this.startline&&_num==-1){
					this.haveData(this.recordLdiv[this.recordLdiv.length-1],(this.listPos+this.arrLength-this.startline)%this.arrLength);
					this.moveLdiv(-1);
					this.focusPos=focusPosTemp;
					if(this.listPos<0){this.listPos=this.arrLength-1;}	
				}else if(this.focusPos>this.endline&&_num==1){
					this.haveData(this.recordLdiv[this.recordLdiv.length-1],(this.listPos+this.listSize-this.endline-1)%this.arrLength);
					this.moveLdiv(1);
					this.focusPos=focusPosTemp;
					if(this.listPos>this.arrLength-1){this.listPos=0;}	
				}
				this.onfocus();
			}
		}else {
			//翻页
			if(this.listPos<0){
				this.listPos = (this.cycle==0)?0:this.arrLength-1;
				this.focusPos = (this.cycle==0)?0:((this.arrLength%this.listSize)-1);
			}else if(this.listPos>this.arrLength-1){
				this.listPos=(this.cycle==0)?this.arrLength-1:0;
				this.focusPos=focusPosTemp;
			}
			if(parseInt((this.listPos+this.listSize)/this.listSize)!=parseInt((listPosTemp+this.listSize)/this.listSize)){
				if(_num>0)this.focusPos = 0;
				else if(_num<0&&this.listPos!=this.arrLength-1)this.focusPos = this.listSize-1;
				this.initInfo();
				this.focusObj.style.webkitTransitionDuration = "0ms";
				this.onfocus();
				var self = this;
				keyFlag = 1;
				setTimeout(function(){
					self.focusObj.style.webkitTransitionDuration = self.duration;
					keyFlag = 0;
				},60);
				return;
			}
			this.onfocus();
		}
	}
	/*翻页*/
	this.turnPage = function(_num){
		if(pageType==0)return;
		var templistPos = this.listPos;
		this.listPos += this.listSize*_num;
		if(this.listPos<0){
			if(this.cycle==0){
				this.listPos = templistPos;
				return;
			}else {
				this.listPos = this.arrLength-1;
				this.focusPos = (this.arrLength%this.listSize)-1;
			}
		}else if(this.listPos>this.arrLength-1){
			if(this.cycle==0){
				if(Math.ceil(templistPos/this.listSize)==Math.ceil((this.arrLength-1)/this.listSize)){//如果在同一页
					this.listPos = templistPos;
					return;
				}else {
					this.listPos = this.arrLength-1;
					this.focusPos = (this.arrLength%this.listSize)-1;
				}
			}else {
				this.listPos = 0;
				this.focusPos = 0;
			}
		}
		this.initInfo();
		this.focusObj.style.webkitTransitionDuration = "0ms";
		this.onfocus();
		var self = this;
		keyFlag = 1;
		setTimeout(function(){
			self.focusObj.style.webkitTransitionDuration = self.duration;
			keyFlag = 0;
		},60);
	}
	/*页码*/
	this.pageNum = function(){
		return {"currPage":Math.ceil(this.listPos/this.listSize),"pages":Math.ceil((this.arrLength-1)/this.listSize)}
	}
	/* 寻找当前焦点对应的ID ，返回一个ID number */
	this.currId = function(){
		var currId = null;
		currId = this.recordLdiv[this.focusPos];
		return currId;
	}
}


