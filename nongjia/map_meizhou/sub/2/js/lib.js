var Q = Query = {
	get: function(parameter) {
		if (typeof (parameter) == "undefined" || parameter == "") {
			return null;
		}
		var url = window.location.href;		
		var index = url.indexOf("?");
		if (index != -1) {
			var parameterString = url.substr(index + 1);
			var reg = new RegExp("(^|&)" + parameter + "=([^&]*)(&|$)", "i");
			var r = parameterString.match(reg);
			if (r != null){
				return r[2];
			}
		}
		return null;
	},
	getInt:function(parameter,defaultValue){
		var value = parseInt(this.get(parameter));
		return isNaN(value) ? (typeof(defaultValue) == "undefined" ? 0 : defaultValue) : value;
	},
	getDecoded:function(parameter){
		return this.decode(this.get(parameter));
	},
	decode:function(srcStr){
		if(typeof(srcStr) == "undefined"){return null;}
		return decodeURIComponent(srcStr);
	},
	encode:function(srcStr){
		if(typeof(srcStr) == "undefined"){return null;}
		return encodeURIComponent(srcStr);
	},
	getSymbol:function(url){
		return url.indexOf("?") == -1 ? "?" : "&";
	},
	joinURL:function(url,queryString){
		return url + this.getSymbol(url) + queryString;
	}
}