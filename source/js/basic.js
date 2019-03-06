define(["jquery","cookie"],function($){
//显示购物车商品数量
    if ($.cookie("preInfo")) {
    	var arr=JSON.parse($.cookie("preInfo"))
    	var num0=arr.length
    	$(".header_top_right a").children("em").html(num0)
    } else{
    	$(".header_top_right a").children("em").html(0)
    }
//登录部分js
    if ($.cookie("register")) {
    	var arr0=JSON.parse($.cookie("register"))
    	var state0=[false,false]
    	$("#sign_user").blur(function(){
    		arr0.forEach(function(item,index){
    			if (item.name==$("#sign_user").val()) {
    				state0[0]=true;
    			}
    		})
    	})
    	$("#sign_pw").blur(function(){
    		arr0.forEach(function(item,index){
    			if (item.password==$("#sign_pw").val()) {
    				state0[1]=true;
    			}
    		})
    	})
    	$("#sign_mit").click(function(){
    		if (state0[0]&&state0[1]) {
    			alert("登录成功")
    		} else{
    			alert("帐号或密码错误")
    		}
    	})
    	
    } else {
    	$("#sign_mit").click(function(){
    		alert("无注册信息")
    	})
    }
//咨询客服的js
    $(".cs").hover(function(){
        $(this).children("a").css("color","#fff")
    },function(){
        $(this).children("a").css("color","#fff")
    })
    $(function(){
        var cs_top=$(".cs").offset().top;
        $(window).scroll(function(){
        	var len=cs_top+$(window).scrollTop()+"px";
        	$(".cs").animate({top:len},{duration: 300,queue: false })
        })
    })    
//点击登录弹出登录框，并锁定页面
    $("#sign").click(function(e){
        e.preventDefault();
        $(".sign").show();
        $(".sign_down").show();
    })
    $("#close").click(function(){
        $(".sign").hide();
        $(".sign_down").hide();
    })
    $(".sign_down").click(function(){
        $(".sign").hide();
        $(".sign_down").hide();
    })
})