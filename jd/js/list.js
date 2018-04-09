/*var oScript = document.createElement("script");
oScript.src = "https://api.m.jd.com/api?callback=jQuery11213&appid=pc&functionId=mixer&t=1514160937858&body=%7B%22pin%22%3A%22%22%2C%22p%22%3A504000%2C%22uuid%22%3A%2256923538%22%2C%22lid%22%3A%221%22%2C%22lim%22%3A10%2C%22skus%22%3A%22%22%2C%22ck%22%3A%22ipLoction%22%2C%22ec%22%3A%22utf-8%22%2C%22c1%22%3A%22670%22%2C%22c2%22%3A%22671%22%2C%22c3%22%3A%22672%22%2C%22hi%22%3A%22brand%3A%2Cprice%3A%2Cpage%3A1%22%7D&jsonp=jQuery11213&_=1514160937859"
console.log(oScript);
document.body.appendChild(oScript);

function jQuery11213(data) {
	data=data.data;
	console.log(data);
}*/
$(function() {
	//判断是否登录
	var username = location.search.split("?")[1];
	if(username == undefined) {
		$(".login_username").html("登录");
		$(".totalProductNum").html(0);
		$(".loginCart").click(function(){
			location.assign("login.html");
		})
	} else {
		$(".login_username").html(username);
		if(getCookie("cart1")) {
			var obj = JSON.parse(getCookie("cart1"));
			if(!obj[username]) { //若用户已登录但未添加过商品
				$(".totalProductNum").html(0); //购物车中数量为0；
				$(".loginCart").click(function() {
					location.assign("cart.html?" + username);
				})
			} else { //若用户已添加过商品
				obj = obj[username];
				var sum = 0;
				for(var i in obj) {
					sum += parseInt(obj[i]);
				}
				$(".totalProductNum").html(sum); //购物车中数量为已添加商品的总数量；
				$(".loginCart").click(function() {
					location.assign("cart.html?" + username);
				})
			}
		}
	}

	//请求商品数据
	$.ajax({
		type: "get",
		url: "https://api.m.jd.com/api?callback=?&appid=pc&functionId=mixer&t=1514160937858&body=%7B%22pin%22%3A%22%22%2C%22p%22%3A504000%2C%22uuid%22%3A%2256923538%22%2C%22lid%22%3A%221%22%2C%22lim%22%3A10%2C%22skus%22%3A%22%22%2C%22ck%22%3A%22ipLoction%22%2C%22ec%22%3A%22utf-8%22%2C%22c1%22%3A%22670%22%2C%22c2%22%3A%22671%22%2C%22c3%22%3A%22672%22%2C%22hi%22%3A%22brand%3A%2Cprice%3A%2Cpage%3A1%22%7D",
		async: true,
		success: function(data) {
			data = JSON.parse(data);
			data = data.data;
			var str = "";
			for(var i = 0; i < data.length; i++) {
				if(username == undefined) {
					str += "<li class='list_link' data='" + data[i].sku + "'><a href='list_detail.html?skuId=" + data[i].sku + "&'><img src='https://img11.360buyimg.com/n7/" + data[i].img + "'><i>￥" + data[i].jp + "</i><span>" + data[i].t + "</span></a><div class='cart'><span>对比</span><em>关注</em><a href='#'class='addCart'><em>&#xe602;</em>加入购物车</a></div></li>"
				} else {
					str += "<li class='list_link' data='" + data[i].sku + "'><a href='list_detail.html?skuId=" + data[i].sku + "&" + username + "'><img src='https://img11.360buyimg.com/n7/" + data[i].img + "'><i>￥" + data[i].jp + "</i><span>" + data[i].t + "</span></a><div class='cart'><span>对比</span><em>关注</em><a href='cart.html?" + username + "'class='addCart'><em>&#xe602;</em>加入购物车</a></div></li>"
				}

			}
			$(".list").html(str);
			$(".addCart").click(function() {
				if(username == undefined) {
					return alert("请登录");
				}
				var id = $(this).parent().parent().attr("data");
				if(getCookie("cart1")) {
					var obj = JSON.parse(getCookie("cart1"));
				} else {
					var obj = {};
				}
				if(!obj[username]) {
					obj[username] = {};
					obj[username][id] = 1;
					var str = JSON.stringify(obj);
					setCookie("cart1", str, 365);
				} else {
					if(!obj[username][id]) {
						obj[username][id] = 1;
						var str = JSON.stringify(obj);
						setCookie("cart1", str, 365);
					} else {
						obj[username][id] = obj[username][id];
						var str = JSON.stringify(obj);
						setCookie("cart1", str, 365);
					}
				}

			})

		}
	})

})