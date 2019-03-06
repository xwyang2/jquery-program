require(["js/config.js"],function(){	
	require(["common","jquery","cookie","basic"],function(com,$){
		console.log("配置ok")
        var infoArr=JSON.parse($.cookie("preInfo"))
        //josn信息数据渲染到页面
        var str=''
        for (var i=0;i<infoArr.length;i++) {
        	str+='<tr><td><img src="'+ infoArr[i].goodspic +'"/></td><td>'+  infoArr[i].goodsname +'</td><td>'+ infoArr[i].goodsprice +'元</td><td><button class="add">+</button><em price="'+infoArr[i].goodsprice+'">'+infoArr[i].num+'</em><button class="cut">-</button></td><td>'+infoArr[i].goodsprice*infoArr[i].num+'元</td><td><span cardId="'+infoArr[i].goodsId+'">删除</span></td></tr>'
        }
        var tbody=document.getElementsByTagName("tbody")[0]
        tbody.innerHTML=str;
        //点击删除，删除商品并cookie
        tbody.onclick = function(eve){
			var e = eve || window.event
			var target = e.target || e.srcElement;
		    if(target.nodeName == "SPAN"){
				target.parentNode.parentNode.remove()
				var id= target.getAttribute("cardId")
				for (var i=0;i<infoArr.length;i++) {
					if (infoArr[i].goodsId==id) {
						var index=i;
					}
				}
                infoArr.splice(index,1)
                $.cookie("preInfo",JSON.stringify(infoArr),{ expires: 7 })
		    }
		}
        var add=Array.from(document.getElementsByClassName("add"))
        var cut=Array.from(document.getElementsByClassName("cut"))
        
        add.forEach(function(item,index){
        	    item.parentNode.count=infoArr[index].num;
        	item.onclick=function(){
        		item.parentNode.count++;
        		var priceStr=item.parentNode.children[1].getAttribute("price") 
        		var total=parseInt(item.parentNode.count)*parseFloat(priceStr)
        		item.parentNode.children[1].innerHTML=item.parentNode.count;
        		item.parentNode.parentNode.children[4].innerHTML=total.toFixed(2)+"元"
        	}
        })
        cut.forEach(function(item,index){
        	item.onclick=function(){
        		item.parentNode.count--;
        		if (item.parentNode.count<1) {
        			item.parentNode.count=1;
        		}
        		var priceStr=item.parentNode.children[1].getAttribute("price")      		
        		var total=parseInt(item.parentNode.count)*parseFloat(priceStr)
        		item.parentNode.children[1].innerHTML=item.parentNode.count;
        		item.parentNode.parentNode.children[4].innerHTML=total.toFixed(2)+"元"
        	}
        })
//以下部分非页面js            
	})
})