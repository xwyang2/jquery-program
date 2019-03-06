require(["js/config.js"],function(){	
	require(["common","jquery","basic"],function(com,$){
		console.log("配置ok")
		$(function(){
//定义一条cookie信息，存放注册信息（帐号+密码)com.setCookie("register","[]",7)
            com.setCookie("register",'[{"name":"Jackson","password":"super123"}]',7)
			function isNull(txt){
				if (txt.length==0) {
					return true;
				}
				var regNull=/\s+/g
				return regNull.test(txt)
			}
			var state=[false,false,false,false];
//帐号验证    
			$("#info_user").focus(function(){
				$(this).next().text("支持手机号、邮箱或字母、数字、“-”“_”的组合，6-10个字符")
			})
			$("#info_user").blur(function(){
				var regUser1=/^[1][3,4,5,7,8][0-9]{9}$/;
				var regUser2=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
				var regUser3=/^[a-z0-9_\-]{6,10}$/i
				var ok1=regUser1.test($(this).val());
				var ok2=regUser2.test($(this).val());
				var ok3=regUser3.test($(this).val());
				if (isNull($(this).val())) {
					$(this).next().text("帐号不可以为空")
					$(this).addClass("error")
					$(this).removeClass("success")
					state[0]=false;
				} else{					
					if (ok1 | ok2 |ok3) {
						$(this).addClass("success")
						$(this).removeClass("error")
						$(this).next().text("可以")
						state[0]=true;
					} else{
						$(this).addClass("error")
						$(this).removeClass("success")
						$(this).next().text("帐号格式不符合要求")
						state[0]=false;
					}
				}
			});	
//密码输入			
		    $("#info_pw0").focus(function(){
		    	$(this).next().text("除汉字以外的6-10个字符")
		    })
		    $("#info_pw0").blur(function(){
		    	var that=$(this)
		    	var regPw0=/^[^\\*\u4e00-\u9fa5]{6,10}$/;
		    	if (isNull($(this).val())) {
		    		$(this).next().text("密码不可以为空")
		    		$(this).addClass("error")
					$(this).removeClass("success")
					$(".info2 span").removeClass("active")
					state[1]=false;
		    	} else{
		    		if (regPw0.test($(this).val())) {
		    			$(this).addClass("success")
						$(this).removeClass("error")
		    			var mark=0;
		    			var hasNum = /\d/g
		    			if (hasNum.test($(this).val())) {
		    				mark++;
		    			}
		    			var hasLetter = /[a-z]/gi
			            if(hasLetter.test($(this).val())){
				            mark++;
			            };
			            var hasSymbol = /[!@#\$%\^\.]/g
			            if(hasSymbol.test($(this).val())){
				            mark++;
			            };
			            switch(mark){
			            	case 1:
			            	$(this).next().text("密码安全程度低，建议使用组合密码");
			            	$(".info2 span").eq(0).addClass("active");
			            	state[1]=true;
			            	break;
			            	case 2:
			            	$(this).next().text("密码安全程度一般，建议使用组合密码");
			            	$(".info2 span").eq(0).addClass("active");
			            	$(".info2 span").eq(1).addClass("active");
			            	state[1]=true;
			            	break;
			            	case 3:
			            	$(this).next().text("密码安全程度高，别忘了！");
			            	$(".info2 span").eq(0).addClass("active");
			            	$(".info2 span").eq(1).addClass("active");
			            	$(".info2 span").eq(2).addClass("active");
			            	state[1]=true;
//			            	var timer=setTimeout(function(){
//			            		that.next().text("");
//			            		$(".info2 span").removeClass("active")
//			            	},1000)
			            };
		    			
		    		}else{
		    			$(this).addClass("error")
					    $(this).removeClass("success")
					    $(this).next().text("密码格式不符合要求")
					    $(".info2 span").removeClass("active")
					    state[1]=false;
		    		}
		    	};
		    })
//确认密码		  
            $("#info_pw1").blur(function(){
            	if (isNull($(this).val())) {
            		$(this).next().text("此项不能为空")
		    		$(this).addClass("error")
					$(this).removeClass("success")
					state[2]=false;
            	} else{
            		if ($(this).val()==$("#info_pw0").val()) {
            			$(this).addClass("success")
						$(this).removeClass("error")
						$(this).next().text("验证通过")
						state[2]=true;
            		} else{
            			$(this).addClass("error")
					    $(this).removeClass("success")
					    $(this).next().text("两次密码不一致")
					    state[2]=false;
            		}
            	}
            })
//验证随机码	
//          console.log(com.createCode())
		    $("#verify").focus(function(){
		    	var str=com.createCode();
		    	$(".info3").children("em").text(str);
		    })
		    $(".changeCode").click(function(e){
		    	e.preventDefault();
		    	var str=com.createCode();
		    	$(".info3").children("em").text(str);
		    })
		    $("#verify").blur(function(){
		    	var that=$(this)
            	if (isNull($(this).val())) {
            		$(this).parent().children(".msg").text("此项不能为空")
		    		$(this).addClass("error")
					$(this).removeClass("success")
					state[3]=false;
            	} else{
            		if ($(this).val()==$(".info3").children("em").text()) {
            			$(this).addClass("success")
						$(this).removeClass("error")
						$(this).parent().children(".msg").text("验证通过")
						state[3]=true;
//						var timer=setTimeout(function(){
//			            		that.parent().children(".msg").text("");
//			            	},2500)
            		} else{
            			$(this).addClass("error")
					    $(this).removeClass("success")
					    $(this).parent().children(".msg").text("验证失败")
					    state[3]=false;
            		}
            	}
            })
            $(".info5 .regIn").click(function(){
            	if (state[0]&&state[1]&&state[2]&&state[3]) {
//    		    var loginArr=JSON.parse(com.getCookie("register"))              
                    var loginArr=[];  
                    var strCookie=com.getCookie("register");
                    if (strCookie="") {
              	         var loginArr=[];
                    } else{
              	         var loginArr=JSON.parse(com.getCookie("register"));
                    }
//                  console.log(loginArr)
//                  console.log(loginArr[0].name)
            		var obj={
            			"name":$("#info_user").val(),
            			"password":$("#info_pw0").val()
            		}
            		loginArr.push(obj);
            		com.setCookie("register",JSON.stringify(loginArr),7)
            		alert("注册成功！")
            	} else{
            		alert("请先完成以上步骤")
            	}
            })

		});

//以下部分非页面js            
	})
})