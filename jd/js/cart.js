$(function() {
	//判断本地cookie中是否存入商品
	if(!getCookie("cart1")) {
		var str = "<div class='empty1'>购物车内暂时没有商品</div>"
		$(".empty").html(str);
		console.log("aaa")
	} else {
		var username = location.search.split("?")[1];
		//判断用户购物车中的状态
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
				console.log("aa");
				location.assign("cart.html?" + username);
			})
		}

		var obj1 = JSON.parse(getCookie("cart1"));
		obj = obj1[username];
		$(".login_user").html(username);

		var str2 = "<div class='total'><div class='payMoney'>去结算</div><div class='totalMoney'><span>总价：</span><b class='totalMoney1'></b></div></div>";

		//$(".listproduct").append(str2);
		var str1 = "<div class='cart_title'><div class='total_products'><input type='checkbox' class='allCheck'><label>全选</label></div><div class='products'>商品</div><div class='unit_price'>单价</div><div class='num'>数量</div><div  class='total_price'>小计</div><div class='del'>操作</div></div>"
		//$(".listproduct").append(str1);
		//请求数据
		$.ajax({
			type: "get",
			url: "https://api.m.jd.com/api?callback=?&appid=pc&functionId=mixer&t=1514160937858&body=%7B%22pin%22%3A%22%22%2C%22p%22%3A504000%2C%22uuid%22%3A%2256923538%22%2C%22lid%22%3A%221%22%2C%22lim%22%3A10%2C%22skus%22%3A%22%22%2C%22ck%22%3A%22ipLoction%22%2C%22ec%22%3A%22utf-8%22%2C%22c1%22%3A%22670%22%2C%22c2%22%3A%22671%22%2C%22c3%22%3A%22672%22%2C%22hi%22%3A%22brand%3A%2Cprice%3A%2Cpage%3A1%22%7D",
			async: "true",
			success: function(data) {
				data = JSON.parse(data);
				data = data.data;
				console.log(data);
				var arrNum = [];
				var arrPerPrice = [];
				for(var i in obj) {
					arrNum.push(obj[i]);
				}
				var str = "";
				str += "<ul class='cartList'>"
				for(var i = 0; i < data.length; i++) {
					for(var j in obj) {
						if(j == data[i].sku) {
							str += "<li data='" + j + "' class='cart_title cart_list'><div class='total_products'><input type='checkbox' class='checkUnit'><img src='https://img11.360buyimg.com/n7/" + data[i].img + "'></div><div class='products'>" + data[i].t + "</div><div class='unit_price unit_pricenum'>￥" + data[i].jp + "</div><div class='num'><span class='minus'>-</span><input type='text'value='1' class='btn txt '><span class='plus'>+</span></div><div class='total_price total_pricenum'>￥</div><div class='del'>删除</div></li>"
							arrPerPrice.push(data[i].jp);
						}
					}
				}

				str += "</ul>"
				var totalStr = "<div>" + str2 + str1 + str + "</div>"
				$(".listproduct").html(totalStr);

				//进入购物车之后计算每件商品的数量，写入数据
				$(".txt").each(function(index) {
					$(this).val(arrNum[index]);
					//点击存入cookie

				})
				//计算现有cookie中的每件商品的总价；
				$(".total_pricenum").each(function(index) {
					$(this).html("￥" + (arrNum[index] * arrPerPrice[index]));
				})

				//点击添加商品数量

				$(".plus").click(function() {
					var index = $(this).parent().parent().index();
					var data = $(this).parent().parent().attr("data");

					obj1[username][data]++;
					arrNum[index]++;
					var str = JSON.stringify(obj1);
					setCookie("cart1", str, 365);
					var sum=0;
					for(var i in obj1[username]) {
						sum += parseInt(obj1[username][i]);
					}
					$(".totalProductNum").html(sum);

					$(this).parent().parent().find(".txt").val(arrNum[index]);
					$(this).parent().parent().find(".total_pricenum").html("￥" + (arrNum[index] * arrPerPrice[index]));
					totalMoney();

				})

				//点击减少商品
				$(".minus").click(function() {
					var index = $(this).parent().parent().index();
					var data = $(this).parent().parent().attr("data");
					arrNum[index]--;
					obj1[username][data]--;
					if(obj1[username][data] <= 1) {
						obj1[username][data] = 1;
					}
					var str = JSON.stringify(obj1);
					setCookie("cart1", str, 365);
					var sum=0;
					for(var i in obj1[username]) {
						sum += parseInt(obj1[username][i]);
					}
					console.log(sum);
					$(".totalProductNum").html(sum);
					if(arrNum[index] <= 1) {
						arrNum[index] = 1;
					}
					$(this).parent().parent().find(".txt").val(arrNum[index]);
					$(this).parent().parent().find(".total_pricenum").html("￥" + (arrNum[index] * arrPerPrice[index]));
					totalMoney();

				})

				//计算总价
				function totalMoney() {
					var sum = 0;
					$(".checkUnit:checked").each(function(index) {
						var index = $(this).parent().parent().index();
						sum += parseInt($(this).parent().parent().find(".total_pricenum").html().split("￥")[1]);
					})
					$(".totalMoney1").html(sum);
				}
				totalMoney();
				$(".checkUnit").click(function() {
					if($('.checkUnit').length == $(".checkUnit:checked").length) {
						$(".allCheck").prop("checked", true);
					} else {
						$(".allCheck").prop("checked", false);
					}
					totalMoney();
				})

				//全部选中
				$(".allCheck").click(function() {
					$(".checkUnit").prop("checked", $(".allCheck").prop("checked"));
					totalMoney();
				})

				//点击删除商品
				$(".del").click(function() {
					var data = $(this).parent().attr("data");
					$(this).parent().remove();
					console.log($(".cart_list").length);
					delete obj1[username][data];
					if($(".cart_list").length == 0) {
						removeCookie("cart");
						$(".cartList").parent().remove();
						var str = "<div class='empty1'>购物车内暂时没有商品</div>"
						$(".empty").html(str);
					} else {
						var str = JSON.stringify(obj1);
						setCookie("cart", str, 365);
					}

				})
				
				
				//结算
				$(".payMoney").click(function(){
					var sum=parseInt($(".totalMoney1").html());
					if(sum<=0){
						return alert("请选择商品")
					}
					return alert("结算成功")
				})

			}
		})

	}

})