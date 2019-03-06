define(function(){
	return{		
	    getPagePositionLeft:function(ele) {
			if(ele == null) return 0;
			return ele.offsetLeft + getPagePositionLeft(ele.offsetParent);
		},
		getPagePositionTop:function(ele) {
			if(ele == null) return 0;
			return ele.offsetTop + getPagePositionTop(ele.offsetParent);
		},
		randomColor:function(){
			return 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
		},
		randomInt:function(min, max) {
			return Math.round( Math.random()*(max-min) ) + min;
		},
        setCookie:function(key,value,expires){
        	var d=new Date();
        	d.setDate(d.getDate()+expires)
        	document.cookie=key+'='+value+';expires='+d;        	
        },
        getCookie:function(name){
            var arrStr=document.cookie.split('; ');
            for(var i=0;i<arrStr.length;i++){
                if(arrStr[i].split("=")[0] == name){
                	return arrStr[i].split("=")[1];
                }
            }
            return '';
        },
        removeCookie:function(name){
           this.setCookie(name,'a',-1)
        },
        createCode:function(){
        	var codes=[];
			//数字的Unicode编码，放进codes数组 48-57
			for (var i=48;i<58;i++) {
				codes.push(i)
			};
			//大写字母A-Z的Unicode编码，放进数组65-90
			for (var i=65;i<91;i++) {
				codes.push(i)
			};
			//小写字母的Unicode编码，放进数组97-122
			for (var i=97;i<123;i++) {
				codes.push(i)
			};
//			console.log(codes)
			var arr=[];//存放四位随机验证码的数组
			for (var i=0;i<4;i++) {
				var index = Math.floor(Math.random()*62);//index取值从0（含）到61（含）
				var charRandom= String.fromCharCode(codes[index]);//Unicode码转换成字符
				arr.push(charRandom)
			}
		    return arr.join("");
        }
    }
})