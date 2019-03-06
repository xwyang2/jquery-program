require(["js/config.js"],function(){	
	require(["common","jquery","cookie","basic"],function(com,$){
			console.log("配置ok") 
//Ajax请求，页面加载商品信息
        $(function(){
         	var objAjax=new Object();
         	var listAjax=[];
         	$.ajax({
         		type:"get",
         		url:"http://localhost:9900/agent/?category=12&offset=3&_=1544543950354",
         		async:true,
         		success:function(data){
         			objAjax=JSON.parse(data);
         			listAjax=objAjax["data"];
         			for (var i=0;i<$(".junk_rank li").length;i++) {
         				$(".junk_rank li img").eq(i).attr("src",listAjax[i].big_pic);
         				$(".junk_rank li span").eq(i).html("<i>"+(i+1)+"</i>"+listAjax[i].title);
         				$(".junk_rank li p").eq(i).html(listAjax[i].title);
         				$(".junk_rank li em").eq(i).html(listAjax[i].discount_price+"元");
         			}
         			for (var i=0;i<$(".relist li").length;i++) {
         				$(".relist li img").eq(i).attr("src",listAjax[i].big_pic);
         				$(".relist li span").eq(i).html(listAjax[i].title);
         			}
         			for (var i=0;i<$(".imgBox img").length-1;i++) {
         				$(".imgBox img").eq(i).attr("src",listAjax[i].big_pic);
         			}
         			$(".imgBox img").eq($(".imgBox img").length-1).attr("src",listAjax[0].big_pic);
         			//goodslist创建li，加载商品图片，描述等等
         			for (var i=0;i<20;i++) {
         			    var _li='<li goods='+listAjax[i].id+'><a href="detail.html" target="_blank"><img src="'+listAjax[i].big_pic+'"/></a><p class="description">'+listAjax[i].title+'</p><p class="price">'+listAjax[i].discount_price+'元</p>'
         			    $(".goodslist").append(_li)
         			}
         			$("<span>加入购物车</span>").appendTo($(".goodslist li"));         			         			
         		}
         	});
         })
//Ajax请求
//惊爆推荐模块效果
        $(function(){        	
            var timer0=null;
            $(".recommend").click(function(){
         	    $(".recommend").hide();
         	    clearInterval(timer0)
            })
            function reCom(){         	
       	        var timer2=null;
       	        var timer3=null;
       	        clearTimeout(timer2);
       	        timer2=setTimeout(function(){
       		        $(".recommend").hide(function(){
       			        clearTimeout(timer3);
       			        timer3=setTimeout(function(){
       				         $(".recommend").show()
       			        },1500)
       		        })
       	        },4000)
            }
            clearInterval(timer0)
            timer0=setInterval(function(){
       		    reCom();
            },6000)
        })
//商品分类列表的划过效果
        $(".juck_classify li").on("mouseover",function(){
          	$(".juck_classify li").attr("class","");
          	$(this).attr("class","over");
        })
        $(".classify").on("mouseout",function(){
          	$(".juck_classify li").removeClass("over");
        })
//快速登录部分的js
if ($.cookie("register")) {
    	var arr1=JSON.parse($.cookie("register"))
    	var state1=[false,false]
    	$("#username").blur(function(){
    		arr1.forEach(function(item,index){
    			if (item.name==$("#username").val()) {
    				state1[0]=true;
    			}
    		})
    	})
    	$("#password").blur(function(){
    		arr1.forEach(function(item,index){
    			if (item.password==$("#password").val()) {
    				state1[1]=true;
    			}
    		})
    	})
    	$("#sub").click(function(){
    		if (state1[0]&&state1[1]) {
				alert("登录成功")
				state1[0]=false;
				state1[1]=false;
    		} else{
    			alert("帐号或密码错误")
    		}
    	})
    	
    } else {
    	$("#sub").click(function(){
    		alert("无注册信息")
    	})
    }
//ourcompany板块的效果
        $(".ourcompany li").on("mouseover",function(){
        	$(this).css("border-color","#f00");
        })
        $(".ourcompany li").on("mouseout",function(){
        	$(this).css("border-color","#333");
        })
//销售排行榜，rank板块的“手风琴效果”
        $(".junk_rank li").mouseenter(function(){
          	$(".junk_rank li").removeClass()
			$(this).stop().animate({"height":"258px"},300);
			$(this).children("span").css({"color":"#f00","background":"#e7cecd"});
			$(this).siblings().stop().animate({"height":"30px"},300);
			$(this).siblings().children("span").css({"color":"#333","background":"#fbfbfb"});
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
//轮播图    
        $(function(){
            var index=0;
            var timer=null;
            $(".banner .banner_btn li").eq(0).css("background","#fa9202");
            $(".banner .banner_left").click(function(){
           	    index--;
           	    if (index<0) {
           	     	index=$(".banner .banner_btn li").length-1;
           	     	$(".banner .imgBox").css("left",-($(".banner .banner_btn li").length)*520+"px")
           	    }
                $(".banner .imgBox").stop().animate({left:-index*520+"px"},300)
           	    $(".banner .banner_btn li").eq(index).css("background","#fa9202");
           	    $(".banner .banner_btn li").eq(index).siblings().css("background","#e7cecd")           	
            });
            $(".banner .banner_right").click(function(){
           	    index++;
           	    if (index>$(".banner .banner_btn li").length) {
           	     	index=1;
           	     	$(".banner .imgBox").css("left",0)
           	    }
                $(".banner .imgBox").stop().animate({left:-index*520+"px"},300)
                if (index==$(".banner .banner_btn li").length) {
                	$(".banner .banner_btn li").eq(0).css("background","#fa9202");
                	$(".banner .banner_btn li").eq(0).siblings().css("background","#e7cecd")  
                } else{                	
                	$(".banner .banner_btn li").eq(index).css("background","#fa9202");
                	$(".banner .banner_btn li").eq(index).siblings().css("background","#e7cecd")           	
                }
            });
            $(".banner .banner_btn li").mouseenter(function(){
           	    $(this).css("background","#fa9202")
           	    $(this).siblings().css("background","#e7cecd")
           	    $(".banner .imgBox").stop().animate({left:-$(this).index()*520+"px"},300)           	
            });
            clearInterval(timer);
            timer=setInterval(function(){
            	index++;
           	    if (index>$(".banner .banner_btn li").length) {
           	     	index=1;
           	     	$(".banner .imgBox").css("left",0)
           	    }
           	    $(".banner .imgBox").stop().animate({left:-index*520+"px"},300)           	     	
           	    if (index==$(".banner .banner_btn li").length) {
                	$(".banner .banner_btn li").eq(0).css("background","#fa9202");
                	$(".banner .banner_btn li").eq(0).siblings().css("background","#e7cecd")  
                } else{                	
                	$(".banner .banner_btn li").eq(index).css("background","#fa9202");
                	$(".banner .banner_btn li").eq(index).siblings().css("background","#e7cecd")           	
                }
            },3000);
            $(".banner").mouseenter(function(){
            	clearInterval(timer);
            	$(".banner span").stop().fadeIn()
            });
            $(".banner").mouseleave(function(){
            	$(".banner span").stop().fadeOut();
            	clearInterval(timer);
            	timer=setInterval(function(){
            	index++;
           	    if (index>$(".banner .banner_btn li").length) {
           	     	index=1;
           	     	$(".banner .imgBox").css("left",0)
           	    }
           	    $(".banner .imgBox").stop().animate({left:-index*520+"px"},300)           	     	
           	    if (index==$(".banner .banner_btn li").length) {
                	$(".banner .banner_btn li").eq(0).css("background","#fa9202");
                	$(".banner .banner_btn li").eq(0).siblings().css("background","#e7cecd")  
                } else{                	
                	$(".banner .banner_btn li").eq(index).css("background","#fa9202");
                	$(".banner .banner_btn li").eq(index).siblings().css("background","#e7cecd")           	
                }
                },3000);
            });        	
        })
//loadmore,"更多加载"
        $(function(){  
    	    var s=0;
            $("#loadmore").click(function(){
           	    var obj2Ajax=new Object();
         	    var list2Ajax=[];
         	    $.ajax({
         		    type:"get",
         		    url:"http://localhost:9900/agent/?page=2&category=12&offset=1&_=1544544048657",
         		    async:true,
         		    success:function(data){
         			    obj2Ajax=JSON.parse(data);
         			    list2Ajax=obj2Ajax["data"];         			
         		    //goodslist创建li，加载商品图片，描述等等
         			    for (var i=s;i<s+4;i++) {
         			        var _li='<li goods='+list2Ajax[i].id+'><a href="detail.html" target="_blank"><img src="'+list2Ajax[i].big_pic+'"/></a><p class="description">'+list2Ajax[i].title+'</p><p class="price">'+list2Ajax[i].discount_price+'元</p><span>加入购物车</span>'
         			        $(".goodslist").append(_li)
         			    }
         		        $(".goodslist")[0].scrollTop=$(".goodslist")[0].scrollHeight
         		        s+=4 ;
         		        if (s>20) {
         		    	    s=0;
         		        }
         		    }
         	    });
            })          	
        })
//购物车，主页面选商品

        var goodslist=document.getElementsByClassName("goodslist")[0]
        goodslist.onclick=function(eve){
        	var e=eve || window.event
            var tgt=e.target || e.srcElement;
            if (tgt.nodeName == "SPAN") {            	
            	var goodsid=tgt.parentNode.getAttribute("goods")
            	var pic=tgt.parentNode.children[0].children[0].src
            	var info=tgt.parentNode.children[1].innerText
            	var price=parseFloat(tgt.parentNode.children[2].innerText)                  
            	var goodsinfo={
            		"goodsId":goodsid,
            		'goodspic':pic,
            		'goodsname':info,
            		'goodsprice':price,
            		 "num":1
            		}
//          	var preinfo=JSON.stringify(goodsinfo)
                if ($.cookie("preInfo")) {
                	var goodsArr=JSON.parse($.cookie("preInfo"))
                } else{
                	var goodsArr=[];
                }
                if (goodsArr.length<1) {
                	goodsArr.push(goodsinfo)
                } else{
                	var onOff=true;
                	for (var i=0;i<goodsArr.length;i++) {
                		if (goodsArr[i].goodsId==goodsinfo.goodsId) {
                			goodsArr[i].num++;
                			onOff=false;
                		}
                	}
                	if (onOff) {
                		goodsArr.push(goodsinfo)
                	}
                }
                $.cookie("preInfo",JSON.stringify(goodsArr),{ expires: 7 })
//              console.log($.cookie("preInfo"))            	
            }
        }
//以下部分非本页js内容            
	})
})