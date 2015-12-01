var lazyLoad=function(){
	function getOffParent(obj){
		if(obj.offsetParent!=document.body){
			return arguments.callee(obj.offsetParent);
		}else{
			return obj;
		}
	}
	function getTotalTop(o){
		if(o.offsetParent==document.body){
			return o.offsetTop;
		}else{
			return parseInt(getOffParent(o).offsetTop)+parseInt(o.offsetTop)+"px";
		}		
	}
	function Each(elem,callback){
		if(elem.length){
			var i,
				len=elem.length;
			for(i=0;i<len;i++){
				callback.apply(elem[i],arguments);
			}
		}else{
			var x;
			for(x in elem){
				callback(elem[x],arguments);
			}
		}
	}
	function binder(o,type,func){
		if(o.addEventListener){
			return o.addEventListener(type,func,false);
		}else{
			return o.attachEvent("on"+type,func);
		}
	}
	return {
		isVisible:function(o){
			var scrollTop=parseInt(document.body.scrollTop)||parseInt(document.documentElement.scrollTop);
			if(parseInt(getTotalTop(o))<parseInt(document.documentElement.clientHeight)+scrollTop){
				return true;
			}
			return false;
		},
		loadImg:function(elem){
			var that=this;
			Each(elem,function(){
				var self=this;
				if(that.isVisible(self)){
					if(!self.loaded){
						self.src=self.getAttribute("data-origin");
						self.loaded=true;
					}else{
						self.loaded=false;
					}
				}
			});
		},
		init:function(elem){
			var that=this;
			Each(elem,function(){
				var self=this;
				if(that.isVisible(self)){
					self.src=self.getAttribute("data-origin");
				}
			});
			binder(window,"scroll",function(){
				that.loadImg(elem);
			});
		}
	}
}();
window.lazyLoad=lazyLoad;