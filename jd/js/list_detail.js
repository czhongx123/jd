$(function() {
	$.ajax({
		type: "get",
		url: "data/detail.json",
		async: true,
		success: function(data) {
			var index = location.search.split("=")[1].split("&")[0];
			var username = location.search.split("=")[1].split("&")[1];
			console.log(username);
			console.log(typeof username);
			//判断用户是否登录
			if(username == "") { //判断用户是否为登录状态，若未登录，则提醒用户登录
				$(".totalProductNum").html(0);
				$(".loginCart").click(function() {
					location.assign("login.html");
					return;
				})
			} else {
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
							console.log("aa");
							location.assign("cart.html?" + username);
						})
					}
				}
			}

			data = data[index];
			console.log(data);
			var str = "<a href='#'>" + data.route + "</a><a href='#'>" + data.store_name + "</a>"
			$(".detail_nav").html(str);
			//左侧图片区域

			var str1 = "";
			str1 += "<div class='imgArea'><div class='zoomArea'><div class='midImg'><img src='img/" + data.mid[0] + "'></div><div class='zoom'></div></div><div class='bigArea'><img src='img/" + data.big[0] + "'></div><ul class='list'>";
			for(var i = 0; i < data.small.length; i++) {
				str1 += "<li class='listItem'><img src='img/" + data.small[i] + "'></li>"
			}
			str1 += "</ul></div>"
			$(".products_detail").html(str1);
			$(".zoomArea").mousemove(function(e) {
				$(".zoom").show();
				$(".bigArea").show();
				var x = e.pageX - $(".zoom").width() / 2 - $(".imgArea").offset().left;
				var y = e.pageY - $(".zoom").height() / 2 - $(".imgArea").offset().top;
				if(x < 0) {
					x = 0;
				}
				if(x > $(".zoomArea").width() - $(".zoom").width()) {
					x = $(".zoomArea").width() - $(".zoom").width();
				}
				if(y < 0) {
					y = 0;
				}
				if(y > $(".zoomArea").height() - $(".zoom").height()) {
					y = $(".zoomArea").height() - $(".zoom").height();
				}
				$(".zoom").css({ "left": x + "px", "top": y + "px" });
				var x1 = -x / $(".zoomArea").width() * $(".bigArea").children().width() + "px";
				var y1 = -y / $(".zoomArea").height() * $(".bigArea").children().height() + "px";
				$(".bigArea").children().css({ "left": x1, "top": y1 });

				$(".listItem").hover(function() {
					var index = $(this).index();
					$(".midImg").children().attr({ "src": "img/" + data.mid[index] });
					$(".bigArea").children().attr({ "src": "img/" + data.big[index] });
				})
			})
			$(".zoomArea").mouseleave(function() {
				$(".zoom").hide();
				$(".bigArea").hide();
			})

			var str2 = "<div class='img_message'><b>" + data.title + "</b><strong>" + data.desc + "</strong><i>￥" + data.price + "</i><div><span class='minus'>-</span><input type='text'value='1' class='btn txt'><span class='plus'>+</span></div><div class='addCart'><input type='button' value='添加购物车' class='btn add_cart'></div></div>"
			$(".products_detail").append(str2);

			//点击数量增加
			//判断本地cookie中是否有值;
			if(getCookie("cart1")) {
				var obj = JSON.parse(getCookie("cart1"));
			} else {
				var obj = {};
			}
			if(username == "undefined") {
				$(".txt").val(1); //用户未登录时，进入详情页面时显示商品数量为1
			} else {
				if(!obj[username]) { //用户登录但未添加过商品
					$(".txt").val(1);
				} else {
					if(!obj[username][index]) { //用户登录，但未添加过该商品，显示商品数量为1
						$(".txt").val(1);
					} else {
						$(".txt").val(obj[username][index]); //若添加过商品，显示的商品数量为已存入的值
					}
				}

			}

			/*//判断此商品是否存过cookie中
			if(getCookie("cart")) {
				var obj = JSON.parse(getCookie("cart"));
			} else {
				var obj = {};
			}
			if(!obj[index]){
				$(".txt").val(1);  //若未存如cookie时，文本框中的初始值为1
			}else{
				$(".txt").val(obj[index]);//若已存入cookie中时，文本框中的初始值为存入cookie中的数量
			}*/

			var count = $(".txt").val();
			$(".plus").click(function() {
				count++;
				$(".txt").val(count);
			})
			$(".minus").click(function() {
				count--;
				if(count <= 1) {
					count = 1;
				}
				$(".txt").val(count);
			})

			//点击添加购物车
			$(".add_cart").click(function() {
				console.log(username);
				if(username == "") { //判断用户是否为登录状态，若未登录，则提醒用户登录
					alert("请登录");
					location.assign("login.html");
					return;
				} else {
					if(!obj[username]) { //用户已登录，但未添加过商品
						obj[username] = {};
						obj[username][index] = $(".txt").val();
						var str = JSON.stringify(obj);
						setCookie("cart1", str, 365);
						//location.href="cart.html?"+username;
					} else { //用户已登录，已添加过商品
						obj[username][index] = $(".txt").val();
						var str = JSON.stringify(obj);
						setCookie("cart1", str, 365);
						console.log(obj)
						location.href = "cart.html?" + username;
					}

				}
			})
		}
	});
})