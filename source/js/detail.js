require(["js/config.js"],function(){	
	require(["common","jquery","basic"],function(common,$){
		console.log("配置ok")
//页面加载完成执行
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
         		    for (var j=0;j<$(".imgList li").length;j++) {
         			    $(".imgList li img").eq(j).attr("src",listAjax[j].big_pic);
         			    $(".imgLarge li img").eq(j).attr("src",listAjax[j].big_pic);
         			    $(".enlarge li img").eq(j).attr("src",listAjax[j].big_pic);
         		    }
         		}
         	});
//Ajax已经结束，商品轮播图，imgLarge轮播，对应切换imgSmall
            var index=0;
            var timer=null;
            $(".imgSmall .btn_left").click(function(){
           	    index--;
           	    if (index<0) {
           	     	index=$(".imgList li").length-1;
           	    }
           	    $(".imgLarge li").css("opacity",0);
                $(".imgLarge li").eq(index).animate({"opacity":1},300)
           	    $(".imgList li").eq(index).css("border-color","#f00");
           	    $(".imgList li").eq(index).siblings().css("border-color","#666")          	
           });
            $(".imgSmall .btn_right").click(function(){
           	    index++;
           	    if (index==$(".imgList li").length) {
           	     	index=0;
           	    }
                $(".imgLarge li").css("opacity",0);
                $(".imgLarge li").eq(index).animate({"opacity":1},300)
           	    $(".imgList li").eq(index).css("border-color","#f00");
           	    $(".imgList li").eq(index).siblings().css("border-color","#666")
           });
            clearInterval(timer);
            timer=setInterval(function(){
            	index++;
            	if (index==$(".imgList li").length) {
           	     	index=0;
           	    }
            	$(".imgLarge li").css("opacity",0);
                $(".imgLarge li").eq(index).animate({"opacity":1},300)
                $(".imgList li").eq(index).css("border-color","#f00");
           	    $(".imgList li").eq(index).siblings().css("border-color","#666")
            },3000);
            $(".imgList li").mouseenter(function(){
             	index=$(this).index();
           	    $(this).css("border-color","#f00");
           	    $(this).siblings().css("border-color","#666");
           	    $(".imgLarge li").eq(index).stop().animate({"opacity":1},300)               	
           	    $(".imgLarge li").eq(index).siblings().stop().animate({"opacity":0},300)
            }); 	     
            $(".detail_show_left").mouseenter(function(){
            	clearInterval(timer);
            });
            $(".detail_show_left").mouseleave(function(){
            	clearInterval(timer);
            	timer=setInterval(function(){
            	index++;
            	if (index==$(".imgList li").length) {
           	     	index=0;
           	     }
            	$(".imgLarge li").css("opacity",0);
                $(".imgLarge li").eq(index).animate({"opacity":1},300)
                $(".imgList li").eq(index).css("border-color","#f00");
           	    $(".imgList li").eq(index).siblings().css("border-color","#666")
            },3000);
            });
//以下是商品放大效果  
            var w=$(".enlarge").width()/$(".enlarge img").width()*$(".imgLarge").width();
            var h=$(".enlarge").height()/$(".enlarge img").height()*$(".imgLarge").height();
         	$(".pointer").css({width:w+"px",height:h+"px"})
         	$(".imgLarge").mouseenter(function(){
         	    $(".pointer").show()
         	    $(".enlarge li").eq(index).css("opacity",1)
           })
         	$(".imgLarge").mouseleave(function(){         		
         		$(".pointer").hide();
         		$(".enlarge").hide();
         		$(".enlarge li").css("opacity",0)
         	})        	 
         	$(".imgLarge").mousemove(function(e){
         		$(".enlarge").show()
        	    var l=e.pageX-$(this).offset().left-$(".pointer").width()/2
        	    var t=e.pageY-$(this).offset().top-$(".pointer").height()/2
        	    var rate=$(".enlarge").width()/$(".pointer").width()
        	    if (l<0) {
        		    l=0;
        	    }
        	    if (t<0) {
        		    t=0;
        	    }
        	    if (l>$(this).width()-$(".pointer").width()) {
        		    l=$(this).width()-$(".pointer").width()
        	    }
        	    if (t>$(this).height()-$(".pointer").height()) {
        		    t=$(this).height()-$(".pointer").height();
        	    }
        	    $(".pointer").css({left:l+"px",top:t+"px"})
        	    $(".enlarge img").css({
        		    left:-$(".pointer").position().left*rate,
        		    top:-$(".pointer").position().top*rate
                })
            })
        })
//以下部分非页面js            
	})
})