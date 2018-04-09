$(function() {
	/*-----头部广告关闭-----*/
	$("#top_close").click(function() {
		$("#top_wrap").animate({ "opacity": 0 }, function() {
			$("#top_wrap").hide();
		})
	})

	/*-----地图-----*/
	/*请求数据*/
	$.ajax({
		type: "get",
		url: "data/data_map.json",
		async: true,
		success: function(data) {
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str += "<div class='item'><a href='#' class='item_links'>" + data[i] + "</a></div>"
			}
			$("#header_map_list").append(str);
			$(".item_links").click(function() {
				$(this).css({ "background": "#f10215", "color": "#fff" }).parent().siblings().children().css({ "background": "#fff", "color": "#999" });
				$("#map").text($(this).html());
			})
		}
	});
	$("#header_map").hover(function() {
		$("#header_map_list").show();
	}, function() {
		$("#header_map_list").hide();
	})

	/*----客户中心------*/
	$.ajax({
		type: "get",
		url: "https://dc.3.cn/client/get?callback?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			var str1 = "";
			data = data.data;
			for(var i = 0; i < 8; i++) {
				str1 += "<li><a href='#'>" + data[i]["n"] + "</a></li>";
			}
			var str2 = "";
			for(var i = 8; i < data.length; i++) {
				str2 += "<li><a href='#'>" + data[i]["n"] + "</a></li>"
			}
			$("#client").append(str1);
			$("#merchant").append(str2);
			$(".hover").hover(function() {
				$(this).find("div").show();
			}, function() {
				$(this).find("div").hide();
			})
		}
	});

	/*----网站导航----*/
	//https://dc.3.cn/navigation/get?callback=getNavigationCallback;
	//请求数据
	$.ajax({
		type: "get",
		url: "https://dc.3.cn/navigation/get?callback",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data;
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str += "<ul><li><a href='#'>" + data[i]["n"] + "</a></li>";
				for(var j = 0; j < data[i]["s"].length; j++) {
					str += "<li><a href='#'></a>" + data[i]["s"][j]["n"] + "</li>"
				}
				str += "</ul>";
			}
			$(".nav_links").append(str);
		}
	});
	$(".header_nav_list").hover(function() {
		$(".nav_links").show();
	}, function() {
		$(".nav_links").hide();
	})

	//搜索框提示信息
	$("#search_txt").on("input", function() {
		$(".search_txt_wrap").find("ul").show();
		$.ajax({
			type: "get",
			url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + $("#search_txt").val() + "&cb=?",
			async: true,
			dataType: "jsonp",
			scriptCharset: "gbk",
			success: function(data) {
				data = data["s"];
				var str = "";
				for(var i = 0; i < data.length; i++) {
					str += "<li ><a href='#'>" + data[i] + "</a></li>"
				}
				$(".search_txt_wrap").find("ul").show().html(str);
				//console.log($(".search_list li"));
				$(".search_list li").click(function() {
					console.log($(this).find("a").html());
					$("#search_txt").val($(this).find("a").html()).parent().find("ul").hide();
				})
			}
		})
	})

	/*热词区域*/
	/*请求数据*/
	$.ajax({
		type: "get",
		url: "https://ai.jd.com/index/hotWords.php?callback",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data;
			var str = "";
			for(var i = 0; i < Math.min(data.length, 9); i++) {
				str += "<a href='#'>" + data[i]["n"] + "</a>"
			}
			$('#hot_word').html(str);
		}
	});

	/*baner区域—左侧—list*/
	//请求数据
	$.ajax({
		type: "get",
		url: "https://dc.3.cn/category/get?callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			var listArrWrap = [];
			var listChannelArrWrap = [];
			data = data.data;
			//console.log(data);
			var listArrDetail = [];
			var listChannelStr = "";
			var detailStr1 = "";
			var listImgArr = [];

			for(var i = 0; i < data.length; i++) {
				var imgStr = "";
				var listArr = [];
				var listChannelArr = [];
				detailStr1 = "<div>";
				imgStr += "<div>";
				imgStr += "<div>"
				for(var s = 0; s < data[i]["b"].length; s++) {
					imgStr += "<img src='http://img11.360buyimg.com/" + data[i]["b"][s].split("|")[2] + "'/>"
				}
				imgStr += "</div><div>";
				for(var t = 0; t < data[i]["p"].length; t++) {
					imgStr += "<img src='http://img11.360buyimg.com/" + data[i]["p"][t].split("|")[2] + "'/>";
				}
				imgStr += "</div>"
				for(var j = 0; j < data[i]["s"].length; j++) {
					listArr.push(data[i]['s'][j]["n"].split("|")[1]);

					for(var l = 0; l < data[i]["s"][j]["s"].length; l++) {
						var links = data[i]["s"][j]["s"][l]["n"].split("|")[0];
						var tit = data[i]["s"][j]["s"][l]["n"].split("|")[1];
						detailStr1 += "<div><div><a href='" + links + "'>" + tit + "</a><em>&#xe637;</em></div><div>";
						for(var m = 0; m < data[i]["s"][j]["s"][l]["s"].length; m++) {

							var lik = data[i]["s"][j]["s"][l]["s"][m]["n"].split("|")[0];
							//console.log(lik);
							var titl = data[i]["s"][j]["s"][l]["s"][m]["n"].split("|")[1];
							detailStr1 += "<a href=" + lik + ">" + titl + "</a>"
						}
						detailStr1 += "</div></div>"
					}

				}
				imgStr += "</div>";
				detailStr1 += "</div>"
				listArrDetail.push(detailStr1);
				listImgArr.push(imgStr);
				//console.log(listImgArr);
				listChannelStr = "<div>"
				for(var k = 0; k < data[i]["t"].length; k++) {
					var channelLink = data[i]['t'][k].split("|")[0];
					var channelTitle = data[i]['t'][k].split("|")[1];
					listChannelStr += "<a href='" + channelLink + "'>" + channelTitle + "<em>&#xe637;</em></a>"
					//listChannelArr.push(listChannelStr);
				}
				listChannelStr += "</div>";
				//console.log(listChannelStr);
				listArrWrap.push(listArr);
				listChannelArrWrap.push(listChannelStr);
			}
			//console.log(listArrDetail);
			//console.log(listChannelArrWrap);
			var str = "";
			for(var m = 0; m < listArrWrap.length; m++) {
				str += "<li class=menu_item>";
				for(var n = 0; n < listArrWrap[m].length; n++) {
					if(n == listArrWrap[m].length - 1) {
						str += "<a href='list.html'>" + listArrWrap[m][n] + "</a>";
					} else if(listArrWrap[m].length == 1) {
						str += "<a href='list.html'>" + listArrWrap[m][n] + "</a>";
					} else {
						str += "<a href='list.html'>" + listArrWrap[m][n] + "</a><span>/</span>";
					}
				}
				str += "</li>"
			}

			$("#banner_left_list").html(str);
			$(".menu_item").hover(function() {
				var index = $(this).index();
				var str2 = "";
				str2 += "<div class='baner_left_list_detail'>" + listChannelArrWrap[index] + listArrDetail[index] + listImgArr[index] + "</div>";
				//$(".baner_left_list_detail").show().html(listChannelArrWrap[index] + listArrDetail[index] +listImgArr[index] );
				$(this).append(str2);
			}, function() {
				$(".baner_left_list_detail").hide()
			})

		}
	});
	//https://ai.jd.com/index/hotWords.php?callback=jsonCallBackHotWords&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&uuid=126457214

	/*banner-轮播*/

	$.ajax({
		type: "get",
		url: "https://f.3.cn/bi/focus_aggr/get?callback=?&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&uuid=126457214&_=1513837911603",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data;
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str += "<li class='slide_item'><a href='" + data[i][0]["href"] + "'><img src='" + data[i][0]["src"] + "'></a></li>"
			}
			$("#slide").html(str);
			$(".slide_item").eq(0).show().siblings().hide();
			var str1 = "<ul class='index'>"
			for(var j = 0; j < $(".slide_item").length; j++) {
				str1 += "<li></li>"
			}
			str1 += "</ul>";
			$("#banner_center_top").append(str1);
			$(".index").children().eq(0).css("background", "#FF0000");
			var i = 0;
			var timer = null;
			$("#banner_center_top").mouseenter(function() {
				clearInterval(timer);
				$(".slide_arrows").fadeIn();

			})
			timer = setInterval(function() {
				i++;
				if(i == $(".slide_item").length) {
					i = 0;
				}
				$(".index").children().eq(i).css("background", "#FF0000").siblings().css("background", "#FFFFFF");
				$(".slide_item").eq(i).stop().fadeIn().siblings().stop().fadeOut();
			}, 2000)

			$(".slide_arrow1").click(function() {
				clearInterval(timer);
				i++;
				if(i == $(".slide_item").length) {
					i = 0;
				}
				$(".index").children().eq(i).css("background", "#FF0000").siblings().css("background", "#FFFFFF");
				$(".slide_item").eq(i).stop().fadeIn().siblings().stop().fadeOut();
			})
			$(".slide_arrow2").click(function() {
				clearInterval(timer);
				i--;
				if(i == -1) {
					i = $(".slide_item").length - 1;
				}
				$(".index").children().eq(i).css("background", "#FF0000").siblings().css("background", "#FFFFFF");
				$(".slide_item").eq(i).stop().fadeIn().siblings().stop().fadeOut();
			})

			$(".index").children().hover(function() {
				clearInterval(timer);
				var index1 = $(this).index();
				$(this).css("background", "#FF0000").siblings().css("background", "#FFFFFF");
				$(".slide_item").eq(index1).stop().fadeIn().siblings().stop().fadeOut();

			})

			$("#banner_center_top").mouseleave(function() {
				clearInterval(timer);
				timer = setInterval(function() {
				i++;
				if(i == $(".slide_item").length) {
					i = 0;
				}
				$(".index").children().eq(i).css("background", "#FF0000").siblings().css("background", "#FFFFFF");
				$(".slide_item").eq(i).stop().fadeIn().siblings().stop().fadeOut();
			}, 2000)
				$(".slide_arrows").fadeOut();

			})

		}
	});

	//轮播图下方图片
	$.ajax({
		type: "get",
		url: "https://f.3.cn/bi/recm_material/get?callback=?&pin=&uuid=15083427895701822161882&_=1510474713944",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			//console.log(data);
			data = data.data;

			var str = "";
			for(var i = 0; i < data.length; i++) {
				str += "<div><a href='#'><img src='" + data[i].img + "'></a></div>"
			}
			$("#banner_center_bottom").html(str);
		}
	});

	//促销、公告
	$.ajax({
		type: "get",
		url: "data/news.json",
		async: true,
		success: function(data) {
			arr = [];
			for(var i = 0; i < data.length; i++) {
				var str = "";
				for(var j = 0; j < data[i].length; j++) {
					str += "<li><a href='#'>" + data[i][j] + "</a></li>"
				}
				arr.push(str);
			}
			//console.log(arr);
			$("#right_links_news").html(arr[0]);
			$('.right_links_header_links').hover(function() {
				var index = $(this).index();
				$("#right_links_news").html(arr[index]);
				if(index == 0) {
					$(".right_links_header").find("span").animate({ "left": 0 });
				} else {
					$(".right_links_header").find("span").animate({ "left": 44 });
				}
			})
		}
	})

	//--------------------秒杀区
	//-----------------秒杀倒计时
	var timer = setInterval(function foo() {
		var date1 = new Date("2018-1-1 9:20");
		var date2 = new Date();
		var msha = Math.floor((date1 - date2) / 1000);
		var hour = Math.floor(msha / 60 / 60 % 24);
		var minute = Math.floor(msha / 60 % 60);
		var s = Math.floor(msha % 60);
		hour = bl(hour);
		minute = bl(minute);
		s = bl(s);

		function bl(num) {
			return num < 10 ? "0" + num : num;
		}
		time.innerHTML = hour + ":" + minute + ":" + s;
		if(msha <= 0) {
			clearInterval(timer);
			time.innerHTML = "秒杀结束";
			$(".seckill_timer").find("span").hide();
		}
	}, 1000);

	//----------------------秒杀区域商品
	$.ajax({
		type: "get",
		url: "https://ai.jd.com/index_new.php?app=Seckill&action=pcIndexMiaoShaArea&callback=jsonpCallbackSeckill&isAdvance=0&_=1513918494175",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			//console.log(data);

			//左侧商品
			var data1 = data.indexMiaoSha;
			//console.log(data1);
			var str = "<div class='left_goods_slide'>";
			for(var i = 0; i < data1.length / 5; i++) {
				str += "<ul>";
				for(var j = i * 5; j < Math.min((i + 1) * 5, data1.length); j++) {
					//console.log(data1[j]["wareId"]);

					str += "<li><a href='https://miaosha.jd.com/" + data1[j]["wareId"] + "'><img src='" + data1[j]["imageurl"] + "'><span></span><p>" + data1[j]["wname"] + "</p></a><i class='miaoShaPrice'>￥" + data1[j]["miaoShaPrice"] + "</i><i class='jdPrice'>￥" + data1[j]["jdPrice"] + "</i>"
				}
				str += "</ul>"
			}
			str += "</div>";
			$("#seckill_goods_left").append(str);
			var perWidth = $("#seckill_goods_left").width();
			$("#seckill_goods_left>div").css("width", perWidth * 5);
			var count = 0;
			//console.log($(".left_goods_slide ul:first"));
			$(".left_goods_slide").append($(".left_goods_slide ul:first").clone());
			$("#seckill_goods_left").hover(function() {
				$(".slide_arrow1,.slide_arrow2").show();
			}, function() {
				$(".slide_arrow1,.slide_arrow2").hide();
			})

			$(".slide_arrow1").click(function() {
				count++;
				if(count == $(".left_goods_slide ul").length) {
					count = 1;
					$(".left_goods_slide").css("left", 0);
				}
				$(".left_goods_slide").stop().animate({ 'left': -count * perWidth });
			})
			$(".slide_arrow2").click(function() {
				count--;
				if(count == -1) {
					count = $(".left_goods_slide ul").length - 2;
					//console.log(count);
					$(".left_goods_slide").css("left", (count) * perWidth);
				}
				$(".left_goods_slide").stop().animate({ 'left': -count * perWidth });
			})

			//右侧商品

			var html = "";
			html = "<ul><li class='right_slide_item'><a href='#'><img src='" + data["brandImg"] + "'></a></li><li class='right_slide_item'><a href='#'><img src='" + data["newBrandImg"] + "'></a></li></ul>"
			$("#seckill_goods_right").html(html);
			var str1 = "<ul class='index1'>"
			for(var j = 0; j < $(".right_slide_item").length; j++) {
				str1 += "<li></li>"
			}
			str1 += "</ul>";
			$("#seckill_goods_right").append(str1);
			var index1 = 0;
			$(".right_slide_item").eq(0).show().siblings().hide();
			$(".index1").children().eq(0).css("background", "#FF0000").siblings().css("background", "#000");
			var timer = setInterval(function() {
				index1++;
				if(index1 == $(".right_slide_item").length) {
					index1 = 0;
				}
				$(".index1").children().eq(index1).css("background", "#FF0000").siblings().css("background", "#000");
				$(".right_slide_item").eq(index1).stop().fadeIn().siblings().hide();
				$()
			}, 2000)

			$(".index1").children().hover(function() {
				clearInterval(timer);
				var index1 = $(this).index();
				$(".index1").children().eq(index1).css("background", "#FF0000").siblings().css("background", "#000");
				$(".right_slide_item").eq(index1).stop().fadeIn().siblings().hide();
			}, function() {
				timer = setInterval(function() {
					index1++;
					if(index1 == $(".right_slide_item").length) {
						index1 = 0;
					}
					$(".index1").children().eq(index1).css("background", "#FF0000").siblings().css("background", "#000");
					$(".right_slide_item").eq(index1).stop().fadeIn().siblings().hide();
					$()
				}, 2000)
			})

		}

	});

	//好货
	$.ajax({
		type: "get",
		url: "https://ai.jd.com/index_new.php?app=Discovergoods&action=getDiscZdmGoodsListForIndex&callback=?&_=1513920968388",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.list;
			var str3 = "";
			//sconsole.log(data);
			for(var i = 0; i < data.length; i++) {
				str3 += "<li><a href='https://fxhh.jd.com/#" + data[i]["id"] + "'><img	src='" + data[i]["goodsPic"] + "'><span>" + data[i]["recommendTheme"] + "</span></a></li>"
			}
			$(".find_best_list").html(str3);

		}

	})

	//会买专辑
	$.ajax({
		type: "get",
		url: "https://f.3.cn/bi/album/get?callback=?&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&uuid=126457214&_=1513920341075",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data;
			//console.log(data);
			var str = "";
			for(var i = 0; i < data.length / 2; i++) {
				str += "<ul class='ceter_intem'>"
				for(var j = i * 2; j < Math.min(data.length, (i + 1) * 2); j++) {
					str += "<li><a href='https://ypzj.jd.com/#" + data[j]['id'] + "'><img src='" + data[j]["list"][0] + "'><img src='" + data[j]["list"][1] + "'><img src='" + data[j]["list"][2] + "'><span>" + data[j]["title"] + "</span></a></li>"
				}
				str += "</ul>"
			}
			$(".findbest_center_list").html(str);
			$(".ceter_intem:first").show().siblings().hide();
			var str1 = "<ul class='index2'>"
			for(var j = 0; j < $(".ceter_intem").length; j++) {
				str1 += "<li></li>"
			}
			str1 += "</ul>";
			$(".findbest_center_list").append(str1);
			//var index=
			var timer = setInterval(function() {

			})
			$(".index2").children().hover(function() {
				var index = $(this).index();
				$(".ceter_intem").stop().fadeOut().eq(index).stop().fadeIn().end();
				$(this).css("background", "#FF0000").siblings().css("background", "#eee");
			})
		}
	})

	//口腔护理
	/*https://ch.jd.com/homepro?callback=jsonpCallbackTopHotsale5&cateid=741&source=pc&_=1513920722830*/

	//冰箱

	//https://ch.jd.com/homepro?callback=jsonpCallbackTopHotsale4&cateid=878&source=pc&_=1513920722080
	//路由器

	//https://ch.jd.com/homepro?callback=jsonpCallbackTopHotsale3&cateid=700&source=pc&_=1513920721182

	//羽绒服
	/*var newArr = [];
	$.when([1,2,3,4,5]).then(function(data){
		conosle.log(newArr)
	})*/

	//排行榜
	$.when(
		$.ajax({
			type: "get",
			url: "https://ch.jd.com/homepro?callback=?&cateid=3983&source=pc&_=1513920341218",
			async: true,
			dataType: "jsonp",
			scriptCharset: "gbk",
		}),
		$.ajax({
			type: "get",
			url: "https://ch.jd.com/homepro?callback=?&cateid=752&source=pc&_=1513920719631",
			async: true,
			dataType: "jsonp",
			scriptCharset: "gbk",
		}),
		$.ajax({
			type: "get",
			url: "https://ch.jd.com/homepro?callback=?&cateid=700&source=pc&_=1513920721182",
			async: true,
			dataType: "jsonp",
			scriptCharset: "gbk",
		}),
		$.ajax({
			type: "get",
			url: "https://ch.jd.com/homepro?callback=?&cateid=878&source=pc&_=1513920722080",
			async: true,
			dataType: "jsonp",
			scriptCharset: "gbk",
		}),
		$.ajax({
			type: "get",
			url: "https://ch.jd.com/homepro?callback=?&cateid=878&source=pc&_=1513920722080",
			async: true,
			dataType: "jsonp",
			scriptCharset: "gbk",
		})
	).done(function(data1, data2, data3, data4, data5) {
		console.log(data1);
		var dataArr = [];
		var titleStr = "";
		var contentArr = [];

		console.log(data1[0].reqCname);
		titleStr += "<a href='#'>" + data1[0].reqCname + "</a><a href='#'>" + data2[0].reqCname + "</a><a href='#'>" + data3[0].reqCname + "</a><a href='#'>" + data4[0].reqCname + "</a><a href='#'>" + data5[0].reqCname + "</a>";
		$(".content_title").append(titleStr);
		var contentStr = "";
		for(var i = 0; i < data1[0].products.length; i++) {
			contentStr += "<li><a href='#'><img src='https://img12.360buyimg.com/mobilecms/s100x100_" + data1[0].products[i].imgPath + "'><span>" + data1[0].products[i].wareName + "</span></a></li>"
		}
		contentArr.push(contentStr);
		var contentStr = "";
		for(var i = 0; i < data2[0].products.length; i++) {
			contentStr += "<li><a href='#'><img src='https://img12.360buyimg.com/mobilecms/s100x100_" + data2[0].products[i].imgPath + "'><span>" + data2[0].products[i].wareName + "</span></a></li>"
		}
		contentArr.push(contentStr);
		var contentStr = "";
		for(var i = 0; i < data3[0].products.length; i++) {
			contentStr += "<li><a href='#'><img src='https://img12.360buyimg.com/mobilecms/s100x100_" + data3[0].products[i].imgPath + "'><span>" + data3[0].products[i].wareName + "</span></a></li>"
		}
		contentArr.push(contentStr);
		var contentStr = "";
		for(var i = 0; i < data4[0].products.length; i++) {
			contentStr += "<li><a href='#'><img src='https://img12.360buyimg.com/mobilecms/s100x100_" + data4[0].products[i].imgPath + "'><span>" + data4[0].products[i].wareName + "</span></a></li>"
		}
		contentArr.push(contentStr);
		var contentStr = "";
		for(var i = 0; i < data5[0].products.length; i++) {
			contentStr += "<li><a href='#'><img src='https://img12.360buyimg.com/mobilecms/s100x100_" + data5[0].products[i].imgPath + "'><span>" + data5[0].products[i].wareName + "</span></a></li>"
		}
		contentArr.push(contentStr);
		$(".content_list").html(contentArr[0]);
		$(".content_title").children().hover(function() {
			var index = $(this).index();
			$(".content_list").html(contentArr[index]);
		})

	})

	//前往领券中心
	/*https://f.3.cn/bi/info/get?callback=jsonpCallbackcoupons&uuid=126457214&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&_=1513920342269*/
	$.ajax({
		type: "get",
		url: "https://f.3.cn/bi/info/get?callback=?&uuid=126457214&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&_=1513920342269",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data;
			//console.log(data);

			//领券
			ticketData = data.coupon.list;
			console.log(ticketData);
			var str = "";
			for(var i = 0; i < Math.min(ticketData.length, 4); i++) {
				str += "<li><a href='" + ticketData[i].url + "'><span><strong>￥<i>" + ticketData[i].value + "<i></strong></i>" + ticketData[i].desc + "</i><b>" + ticketData[i].limit + "</b><span>" + ticketData[i].entry + "</span></span><img src='" + ticketData[i].imgUrl + "'></a></li>"
			}
			$(".ticket_content").html(str);

			//觅me
			var mydata = data.info.list;
			//console.log(mydata);
			var str4 = "";
			for(var j = 0; j < mydata.length; j++) {
				str4 += "<li class='mycontent_item'><a href='#'><img src='" + mydata[j].img + "'><b>" + mydata[j].t + "</b><span>" + mydata[j].desc + "</span></a></li>"
			}
			$(".mycontent_list").html(str4);

			//console.log($("mycontent_item"));
			$(".mycontent_list").children().eq(0).show().siblings().hide();

			var len = $(".mycontent_list").children().length;
			var str1 = "";
			str1 = "<ul class='index3'>"
			for(var j = 0; j < len; j++) {
				str1 += "<li></li>"
			}
			str1 += "</ul>";
			$(".mycontent").append(str1);
			var index = 0;

			var timer = setInterval(function() {
				index++;
				if(index == len) {
					index = 0;
				}
				$(".mycontent_list").children().eq(index).stop().fadeIn().siblings().stop().fadeOut();
				$(".index3").children().eq(index).css("background", "#FF0000").siblings().css("background", "#eee");

			}, 2000)
			$(".index3").children().hover(function() {
				clearInterval(timer);
				index = $(this).index();
				$(".mycontent_list").children().eq(index).stop().fadeIn().siblings().stop().fadeOut();
				$(this).css("background", "#FF0000").siblings().css("background", "#eee");
			}, function() {
				timer = setInterval(function() {
					index++;
					if(index == len) {
						index = 0;
					}
					$(".mycontent_list").children().eq(index).stop().fadeIn().siblings().stop().fadeOut();
					$(".index3").children().eq(index).css("background", "#FF0000").siblings().css("background", "#eee");

				}, 2000)
			})

		}
	})

	//去看看
	//https://f.3.cn/index-floor-material?argv=enjoy&callback=jsonCallBackenjoy&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&uuid=126457214&_=1513937309845
	//link1
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=banner_1&callback=?&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&uuid=126457214&_=1513941771934",

		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.list;
			//console.log(data);
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str += "<a href='#'><img src='" + data[i][0].imgUrl + "'></a>"

			}
			//console.log()
			$("#link1").html(str);
		}
	})

	//link2
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=banner_2&callback=?&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&uuid=126457214&_=1513941771934",

		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.list;
			//console.log(data);
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str += "<a href='#'><img src='" + data[i][0].imgUrl + "'></a>"

			}
			$("#link2").html(str);
		}
	})
	//link3
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=banner_3&callback=?&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&uuid=126457214&_=1513941771934",

		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.list;
			//console.log(data);
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str += "<a href='#'><img src='" + data[i][0].imgUrl + "'></a>"

			}

			$("#link3").html(str);
		}
	})
	//link4
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=banner_4&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.list;
			//console.log(data);
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str += "<a href='#'><img src='" + data[i][0].imgUrl + "'></a>"

			}

			$("#link4").html(str);
		}
	})
	// 一层————享品质

	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=entry&callback=?&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&uuid=126457214&_=1513936873438",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			console.log(data);
			mvData = data.data.live;
			console.log(mvData);
			data = data.data.list;
			console.log(data);
			var str = "";
			var str1 = "";
			str1 += "<div class='quality_left'>"
			for(var i = 0; i < 6; i++) {
				//console.log(data[i][0].url);
				str1 += "<a href='" + data[i][0].url + "'><img src ='" + data[i][0].imgUrl + "'><span><b>" + data[i][0].title + "</b><i>" + data[i][0].subTitle + "</i></span></a>"
			}
			str1 += "</div>"
			var str2 = "";
			var str2 = "<div class='quality_right_bottom'>"
			for(var j = 6; j < 8; j++) {
				str2 += "<a href='" + data[j][0].url + "'><img src ='" + data[j][0].imgUrl + "'><span><b>" + data[j][0].title + "</b><i>" + data[j][0].subTitle + "</i></span></a>"
			}
			str2 += "</div>"

			var str3 = "";
			str3 += "<div class='right_slide'><ul class='right_slide_list'>";
			for(var k = 0; k < mvData.length; k++) {
				str3 += "<li><a href='https://jdlive.jd.com/'><img src='" + mvData[k].indexImage + "'><span>" + mvData[k].title + "</span><b>" + mvData[k].desc + "</b></a></li>"
			}
			str3 += "</ul></div>"
			str = str1 + str3 + str2;
			$(".quality_list").html(str);
			var index = 0;
			$(".right_slide_list").children().eq(0).show().siblings().hide();

			var str4 = "";
			var len = $(".right_slide_list").children().length;
			console.log(len);
			str4 = "<ul class='index4'>"
			for(var j = 0; j < len; j++) {
				str4 += "<li></li>"
			}
			str4 += "</ul>";
			console.log(str4);
			$(".right_slide").append(str4);

			var timer = setInterval(function() {
				index++;
				if(index == $(".right_slide_list").children().length) {
					index = 0;
				}
				$(".index4").children().eq(index).css("background", "#FF0000").siblings().css("background", "#000000");
				$(".right_slide_list").children().eq(index).stop().fadeIn().siblings().stop().fadeOut();
			}, 2000)
			$(".index4").children().hover(function() {
				clearInterval(timer);
				index = $(this).index();
				$(this).css("background", "#FF0000").siblings().css("background", "#000000");
				$(".right_slide_list").children().eq(index).stop().fadeIn().siblings().stop().fadeOut();
			}, function() {
				timer = setInterval(function() {
					index++;
					if(index == $(".right_slide_list").children().length) {
						index = 0;
					}
					$(".right_slide_list").children().eq(index).stop().fadeIn().siblings().stop().fadeOut();
				}, 2000)
			})

		}
	})

	//爱逛

	//https://f.3.cn/index-floor-material?argv=basic_1&callback=jsonCallBackbasic_1&pin=%E8%B5%B7%E5%95%A5%E5%90%8D%E5%91%A2%E4%B8%8D%E7%9F%A5%E9%81%93&uuid=126457214&_=1513936638694
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=basic_1&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.cols;
			//console.log(data);
			var str1 = ""; //title
			str1 += "<div class='common_title'><h3>" + data[0].title + "</h3>"
			//<i>"+data[0].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[0].tag.length; i++) {
				str1 += "<a href='" + data[0].tag[i].url + "'>" + data[0].tag[i].title + "</a>";
			}
			str1 += "</div>";
			//pic

			var str2 = "";
			str2 += "<div class='common_pic'><a class='big_pic'  href='" + data[0].content[0].cover[0].url + "'><img src='" + data[0].content[0].cover[0].imgUrl + "'></a><ul class='common_list'>"
			var arr1 = data[0].content[0].bi;
			for(var j = 0; j < arr1.length; j++) {
				str2 += "<li><a href='" + arr1[j].url + "'><span>" + arr1[j].title + "</span><i>" + arr1[j].subTitle + "</i><img src='" + arr1[j].imgUrl + "'></a></li>"
			}
			str2 += "</ul>"
			var arr2 = data[0].content[0].bottom;
			for(var k = 0; k < arr2.length; k++) {
				str2 += "<a href='" + arr2[k][0].url + "'><img src=" + arr2[k][0].imgUrl + "></a>"
			}
			str2 += "</div>"

			//links

			var str3 = "";
			str3 += "<div class='common_links common_links1'><div class='common_slide common_slide1'>";

			for(var m = 0; m < data[0].brand.length / 6; m++) {
				str3 += "<div>"
				for(var n = m * 6; n < Math.min(data[0].brand.length, (m + 1) * 6); n++) {
					str3 += "<a href='" + data[0].brand[n].href + "'><img src=" + data[0].brand[n].src + "></a>"
				}
				str3 += "</div>"
			}

			str3 += "</div></div>";
			var totalstr1 = "<div class='common_area'>" + str1 + str2 + str3 + "</div>";

			var str4 = ""; //title
			str4 += "<div class='common_title'><h3>" + data[1].title + "</h3>"
			//<i>"+data[1].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[1].tag.length; i++) {
				str4 += "<a href='" + data[1].tag[i].url + "'>" + data[1].tag[i].title + "</a>";
			}
			str4 += "</div>";
			//pic

			var str5 = "";
			str5 += "<div class='common_pic'><a class='big_pic' href='" + data[1].content[0].cover[0].url + "'><img src='" + data[1].content[0].cover[0].imgUrl + "'></a><ul>"
			var arr3 = data[1].content[0].bi;
			for(var j = 0; j < arr3.length; j++) {
				str5 += "<li><a href='" + arr3[j].url + "'><span>" + arr3[j].title + "</span><i>" + arr3[j].subTitle + "</i><img src='" + arr3[j].imgUrl + "'></a></li>"
			}
			str5 += "</ul>"
			var arr4 = data[1].content[0].bottom;
			for(var k = 0; k < arr4.length; k++) {
				str5 += "<a href='" + arr4[k][0].url + "'><img src=" + arr4[k][0].imgUrl + "></a>"
			}
			str5 += "</div>"

			//links

			var str6 = "";
			str6 += "<div class='common_links common_links2'><div class='common_slide common_slide2'>";

			for(var m = 0; m < data[1].brand.length / 6; m++) {
				str6 += "<div>"
				for(var n = m * 6; n < Math.min(data[1].brand.length, (m + 1) * 6); n++) {
					str6 += "<a href='" + data[1].brand[n].href + "'><img src=" + data[1].brand[n].src + "></a>"
				}
				str6 += "</div>"
			}

			str6 += "</div></div>";

			var totalstr2 = "<div class='common_area common_area1'>" + str4 + str5 + str6 + "</div>";
			var totalstr = totalstr1 + totalstr2;
			$(".life_content").html(totalstr);

			//console.log($(".common_slide"));
			var perWidth = $(".common_slide").children().eq(0).width();
			//console.log(perWidth);
			$(".common_slide").css("width", perWidth * $(".common_slide").children().length);

			//下方轮播
			var arrow = "<em class='arrow1'>&#xe637;</em><em class='arrow2'>&#xe604;</em>"
			$('.common_links1').append(arrow);
			var arrow = "<em class='arrow3'>&#xe637;</em><em class='arrow4'>&#xe604;</em>"
			$('.common_links2').append(arrow);
			$(".common_slide").append($(".common_slide>div:first").clone());
			var index1 = 0;
			$(".arrow1").click(function() {
				index1++;
				if(index1 == $(".common_slide1").children().length) {
					index1 = 1;
					$(".common_slide1").css("left", -(index1 - 1) * perWidth);
				}
				$(".common_slide1").stop().animate({ "left": -index1 * perWidth })
			})

			$(".arrow2").click(function() {
				index1--;
				if(index1 == -1) {
					index1 = $(".common_slide1").children().length - 2;
					$(".common_slide1").css("left", -(index1 + 1) * perWidth)

				}
				$(".common_slide1").stop().animate({ "left": -index1 * perWidth });
			})

			var index2 = 0;
			$(".arrow3").click(function() {
				index2++;
				if(index2 == $(".common_slide1").children().length) {
					index2 = 1;
					$(".common_slide2").css("left", -(index2 - 1) * perWidth);
				}
				$(".common_slide2").stop().animate({ "left": -index2 * perWidth })
			})

			$(".arrow4").click(function() {
				index2--;
				if(index2 == -1) {
					index2 = $(".common_slide2").children().length - 2;
					$(".common_slide2").css("left", -(index2 + 1) * perWidth)

				}
				$(".common_slide2").stop().animate({ "left": -index2 * perWidth });
			})

		}
	})

	//家电馆
	//https://f.3.cn/index-floor-material?argv=basic_2&callback=jsonCallBackbasic_2&pin=&uuid=56923538&_=1513995996837
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=basic_2&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.cols;
			//console.log(data);
			var str1 = ""; //title
			str1 += "<div class='common_title'><h3>" + data[0].title + "</h3>"
			//<i>"+data[0].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[0].tag.length; i++) {
				str1 += "<a href='" + data[0].tag[i].url + "'>" + data[0].tag[i].title + "</a>";
			}
			str1 += "</div>";
			//pic

			var str2 = "";
			str2 += "<div class='common_pic'><a class='big_pic'  href='" + data[0].content[0].cover[0].url + "'><img src='" + data[0].content[0].cover[0].imgUrl + "'></a><ul class='common_list'>"
			var arr1 = data[0].content[0].bi;
			for(var j = 0; j < arr1.length; j++) {
				str2 += "<li><a href='" + arr1[j].url + "'><span>" + arr1[j].title + "</span><i>" + arr1[j].subTitle + "</i><img src='" + arr1[j].imgUrl + "'></a></li>"
			}
			str2 += "</ul>"
			var arr2 = data[0].content[0].bottom;
			for(var k = 0; k < arr2.length; k++) {
				str2 += "<a href='" + arr2[k][0].url + "'><img src=" + arr2[k][0].imgUrl + "></a>"
			}
			str2 += "</div>"

			//links

			var str3 = "";
			str3 += "<div class='common_links common_links3'><div class='common_slide common_slide3'>";

			for(var m = 0; m < data[0].brand.length / 6; m++) {
				str3 += "<div>"
				for(var n = m * 6; n < Math.min(data[0].brand.length, (m + 1) * 6); n++) {
					str3 += "<a href='" + data[0].brand[n].href + "'><img src=" + data[0].brand[n].src + "></a>"
				}
				str3 += "</div>"
			}

			str3 += "</div></div>";
			var totalstr1 = "<div class='common_area'>" + str1 + str2 + str3 + "</div>";

			var str4 = ""; //title
			str4 += "<div class='common_title'><h3>" + data[1].title + "</h3>"
			//<i>"+data[1].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[1].tag.length; i++) {
				str4 += "<a href='" + data[1].tag[i].url + "'>" + data[1].tag[i].title + "</a>";
			}
			str4 += "</div>";
			//pic

			var str5 = "";
			str5 += "<div class='common_pic'><a class='big_pic' href='" + data[1].content[0].cover[0].url + "'><img src='" + data[1].content[0].cover[0].imgUrl + "'></a><ul>"
			var arr3 = data[1].content[0].bi;
			for(var j = 0; j < arr3.length; j++) {
				str5 += "<li><a href='" + arr3[j].url + "'><span>" + arr3[j].title + "</span><i>" + arr3[j].subTitle + "</i><img src='" + arr3[j].imgUrl + "'></a></li>"
			}
			str5 += "</ul>"
			var arr4 = data[1].content[0].bottom;
			for(var k = 0; k < arr4.length; k++) {
				str5 += "<a href='" + arr4[k][0].url + "'><img src=" + arr4[k][0].imgUrl + "></a>"
			}
			str5 += "</div>"

			//links

			var str6 = "";
			str6 += "<div class='common_links common_links4'><div class='common_slide common_slide4'>";

			for(var m = 0; m < data[1].brand.length / 6; m++) {
				str6 += "<div>"
				for(var n = m * 6; n < Math.min(data[1].brand.length, (m + 1) * 6); n++) {
					str6 += "<a href='" + data[1].brand[n].href + "'><img src=" + data[1].brand[n].src + "></a>"
				}
				str6 += "</div>"
			}

			str6 += "</div></div>";

			var totalstr2 = "<div class='common_area common_area1'>" + str4 + str5 + str6 + "</div>";
			var totalstr = totalstr1 + totalstr2;
			$("#floor_electric").html(totalstr);

			//console.log($(".common_slide"));
			var perWidth = $(".common_slide").children().eq(0).width();
			//console.log(perWidth);
			$(".common_slide").css("width", perWidth * $(".common_slide").children().length);

			//下方轮播
			var arrow = "<em class='arrow5'>&#xe637;</em><em class='arrow6'>&#xe604;</em>"
			$('.common_links3').append(arrow);
			var arrow = "<em class='arrow7'>&#xe637;</em><em class='arrow8'>&#xe604;</em>"
			$('.common_links4').append(arrow);
			$(".common_slide").append($(".common_slide>div:first").clone());
			var index3 = 0;
			$(".arrow5").click(function() {
				index3++;
				if(index3 == $(".common_slide3").children().length) {
					index3 = 1;
					$(".common_slide3").css("left", -(index3 - 1) * perWidth);
				}
				$(".common_slide3").stop().animate({ "left": -index3 * perWidth })
			})

			$(".arrow6").click(function() {
				index3--;
				if(index3 == -1) {
					index3 = $(".common_slide3").children().length - 2;
					$(".common_slide3").css("left", -(index3 + 1) * perWidth)

				}
				$(".common_slide3").stop().animate({ "left": -index3 * perWidth });
			})

			var index4 = 0;
			$(".arrow7").click(function() {
				index4++;
				if(index4 == $(".common_slide4").children().length) {
					index4 = 1;
					$(".common_slide4").css("left", -(index4 - 1) * perWidth);
				}
				$(".common_slide4").stop().animate({ "left": -index4 * perWidth })
			})

			$(".arrow8").click(function() {
				index4--;
				if(index4 == -1) {
					index4 = $(".common_slide2").children().length - 2;
					$(".common_slide4").css("left", -(index4 + 1) * perWidth)

				}
				$(".common_slide4").stop().animate({ "left": -index4 * perWidth });
			})

		}
	})

	//玩3c
	//https://f.3.cn/index-floor-material?argv=basic_4&callback=jsonCallBackbasic_4&pin=&uuid=56923538&_=1513998160524
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=basic_4&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.cols;
			//console.log(data);
			var str1 = ""; //title
			str1 += "<div class='common_title'><h3>" + data[0].title + "</h3>"
			//<i>"+data[0].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[0].tag.length; i++) {
				str1 += "<a href='" + data[0].tag[i].url + "'>" + data[0].tag[i].title + "</a>";
			}
			str1 += "</div>";
			//pic

			var str2 = "";
			str2 += "<div class='common_pic'><a class='big_pic'  href='" + data[0].content[0].cover[0].url + "'><img src='" + data[0].content[0].cover[0].imgUrl + "'></a><ul class='common_list'>"
			var arr1 = data[0].content[0].bi;
			for(var j = 0; j < arr1.length; j++) {
				str2 += "<li><a href='" + arr1[j].url + "'><span>" + arr1[j].title + "</span><i>" + arr1[j].subTitle + "</i><img src='" + arr1[j].imgUrl + "'></a></li>"
			}
			str2 += "</ul>"
			var arr2 = data[0].content[0].bottom;
			for(var k = 0; k < arr2.length; k++) {
				str2 += "<a href='" + arr2[k][0].url + "'><img src=" + arr2[k][0].imgUrl + "></a>"
			}
			str2 += "</div>"

			//links

			var str3 = "";
			str3 += "<div class='common_links common_links5'><div class='common_slide common_slide5'>";

			for(var m = 0; m < data[0].brand.length / 6; m++) {
				str3 += "<div>"
				for(var n = m * 6; n < Math.min(data[0].brand.length, (m + 1) * 6); n++) {
					str3 += "<a href='" + data[0].brand[n].href + "'><img src=" + data[0].brand[n].src + "></a>"
				}
				str3 += "</div>"
			}

			str3 += "</div></div>";
			var totalstr1 = "<div class='common_area'>" + str1 + str2 + str3 + "</div>";

			var str4 = ""; //title
			str4 += "<div class='common_title'><h3>" + data[1].title + "</h3>"
			//<i>"+data[1].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[1].tag.length; i++) {
				str4 += "<a href='" + data[1].tag[i].url + "'>" + data[1].tag[i].title + "</a>";
			}
			str4 += "</div>";
			//pic

			var str5 = "";
			str5 += "<div class='common_pic'><a class='big_pic' href='" + data[1].content[0].cover[0].url + "'><img src='" + data[1].content[0].cover[0].imgUrl + "'></a><ul>"
			var arr3 = data[1].content[0].bi;
			for(var j = 0; j < arr3.length; j++) {
				str5 += "<li><a href='" + arr3[j].url + "'><span>" + arr3[j].title + "</span><i>" + arr3[j].subTitle + "</i><img src='" + arr3[j].imgUrl + "'></a></li>"
			}
			str5 += "</ul>"
			var arr4 = data[1].content[0].bottom;
			for(var k = 0; k < arr4.length; k++) {
				str5 += "<a href='" + arr4[k][0].url + "'><img src=" + arr4[k][0].imgUrl + "></a>"
			}
			str5 += "</div>"

			//links

			var str6 = "";
			str6 += "<div class='common_links common_links6'><div class='common_slide common_slide6'>";

			for(var m = 0; m < data[1].brand.length / 6; m++) {
				str6 += "<div>"
				for(var n = m * 6; n < Math.min(data[1].brand.length, (m + 1) * 6); n++) {
					str6 += "<a href='" + data[1].brand[n].href + "'><img src=" + data[1].brand[n].src + "></a>"
				}
				str6 += "</div>"
			}

			str6 += "</div></div>";

			var totalstr2 = "<div class='common_area common_area1'>" + str4 + str5 + str6 + "</div>";
			var totalstr = totalstr1 + totalstr2;
			$("#floor_play3C").html(totalstr);

			//console.log($(".common_slide"));
			var perWidth = $(".common_slide").children().eq(0).width();
			//console.log(perWidth);
			$(".common_slide").css("width", perWidth * $(".common_slide").children().length);

			//下方轮播
			var arrow = "<em class='arrow9'>&#xe637;</em><em class='arrow10'>&#xe604;</em>"
			$('.common_links5').append(arrow);
			var arrow = "<em class='arrow11'>&#xe637;</em><em class='arrow12'>&#xe604;</em>"
			$('.common_links6').append(arrow);
			$(".common_slide").append($(".common_slide>div:first").clone());
			var index5 = 0;
			$(".arrow9").click(function() {
				index5++;
				if(index5 == $(".common_slide3").children().length) {
					index5 = 1;
					$(".common_slide5").css("left", -(index5 - 1) * perWidth);
				}
				$(".common_slide5").stop().animate({ "left": -index5 * perWidth })
			})

			$(".arrow10").click(function() {
				index5--;
				if(index5 == -1) {
					index5 = $(".common_slide5").children().length - 2;
					$(".common_slide5").css("left", -(index5 + 1) * perWidth)

				}
				$(".common_slide5").stop().animate({ "left": -index5 * perWidth });
			})

			var index6 = 0;
			$(".arrow11").click(function() {
				index6++;
				if(index6 == $(".common_slide6").children().length) {
					index6 = 1;
					$(".common_slide6").css("left", -(index4 - 1) * perWidth);
				}
				$(".common_slide6").stop().animate({ "left": -index4 * perWidth })
			})

			$(".arrow12").click(function() {
				index6--;
				if(index6 == -1) {
					index6 = $(".common_slide6").children().length - 2;
					$(".common_slide6").css("left", -(index6 + 1) * perWidth)

				}
				$(".common_slide6").stop().animate({ "left": -index6 * perWidth });
			})

		}
	})

	//爱宝宝

	//https://f.3.cn/index-floor-material?argv=basic_6&callback=jsonCallBackbasic_6&pin=&uuid=56923538&_=1513998651884

	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=basic_6&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.cols;
			//console.log(data);
			var str1 = ""; //title
			str1 += "<div class='common_title'><h3>" + data[0].title + "</h3>"
			//<i>"+data[0].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[0].tag.length; i++) {
				str1 += "<a href='" + data[0].tag[i].url + "'>" + data[0].tag[i].title + "</a>";
			}
			str1 += "</div>";
			//pic

			var str2 = "";
			str2 += "<div class='common_pic'><a class='big_pic'  href='" + data[0].content[0].cover[0].url + "'><img src='" + data[0].content[0].cover[0].imgUrl + "'></a><ul class='common_list'>"
			var arr1 = data[0].content[0].bi;
			for(var j = 0; j < arr1.length; j++) {
				str2 += "<li><a href='" + arr1[j].url + "'><span>" + arr1[j].title + "</span><i>" + arr1[j].subTitle + "</i><img src='" + arr1[j].imgUrl + "'></a></li>"
			}
			str2 += "</ul>"
			var arr2 = data[0].content[0].bottom;
			for(var k = 0; k < arr2.length; k++) {
				str2 += "<a href='" + arr2[k][0].url + "'><img src=" + arr2[k][0].imgUrl + "></a>"
			}
			str2 += "</div>"

			//links

			var str3 = "";
			str3 += "<div class='common_links common_links7'><div class='common_slide common_slide7'>";

			for(var m = 0; m < data[0].brand.length / 6; m++) {
				str3 += "<div>"
				for(var n = m * 6; n < Math.min(data[0].brand.length, (m + 1) * 6); n++) {
					str3 += "<a href='" + data[0].brand[n].href + "'><img src=" + data[0].brand[n].src + "></a>"
				}
				str3 += "</div>"
			}

			str3 += "</div></div>";
			var totalstr1 = "<div class='common_area'>" + str1 + str2 + str3 + "</div>";

			var str4 = ""; //title
			str4 += "<div class='common_title'><h3>" + data[1].title + "</h3>"
			//<i>"+data[1].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[1].tag.length; i++) {
				str4 += "<a href='" + data[1].tag[i].url + "'>" + data[1].tag[i].title + "</a>";
			}
			str4 += "</div>";
			//pic

			var str5 = "";
			str5 += "<div class='common_pic'><a class='big_pic' href='" + data[1].content[0].cover[0].url + "'><img src='" + data[1].content[0].cover[0].imgUrl + "'></a><ul>"
			var arr3 = data[1].content[0].bi;
			for(var j = 0; j < arr3.length; j++) {
				str5 += "<li><a href='" + arr3[j].url + "'><span>" + arr3[j].title + "</span><i>" + arr3[j].subTitle + "</i><img src='" + arr3[j].imgUrl + "'></a></li>"
			}
			str5 += "</ul>"
			var arr4 = data[1].content[0].bottom;
			for(var k = 0; k < arr4.length; k++) {
				str5 += "<a href='" + arr4[k][0].url + "'><img src=" + arr4[k][0].imgUrl + "></a>"
			}
			str5 += "</div>"

			//links

			var str6 = "";
			str6 += "<div class='common_links common_links8'><div class='common_slide common_slide8'>";

			for(var m = 0; m < data[1].brand.length / 6; m++) {
				str6 += "<div>"
				for(var n = m * 6; n < Math.min(data[1].brand.length, (m + 1) * 6); n++) {
					str6 += "<a href='" + data[1].brand[n].href + "'><img src=" + data[1].brand[n].src + "></a>"
				}
				str6 += "</div>"
			}

			str6 += "</div></div>";

			var totalstr2 = "<div class='common_area common_area1'>" + str4 + str5 + str6 + "</div>";
			var totalstr = totalstr1 + totalstr2;
			$("#floor_love_baby").html(totalstr);

			//console.log($(".common_slide"));
			var perWidth = $(".common_slide").children().eq(0).width();
			//console.log(perWidth);
			$(".common_slide").css("width", perWidth * $(".common_slide").children().length);

			//下方轮播
			var arrow = "<em class='arrow13'>&#xe637;</em><em class='arrow14'>&#xe604;</em>"
			$('.common_links7').append(arrow);
			var arrow = "<em class='arrow15'>&#xe637;</em><em class='arrow16'>&#xe604;</em>"
			$('.common_links8').append(arrow);
			$(".common_slide").append($(".common_slide>div:first").clone());
			var index7 = 0;
			$(".arrow13").click(function() {
				index7++;
				if(index7 == $(".common_slide7").children().length) {
					index7 = 1;
					$(".common_slide7").css("left", -(index7 - 1) * perWidth);
				}
				$(".common_slide7").stop().animate({ "left": -index7 * perWidth })
			})

			$(".arrow14").click(function() {
				index7--;
				if(index7 == -1) {
					index7 = $(".common_slide7").children().length - 2;
					$(".common_slide7").css("left", -(index7 + 1) * perWidth)

				}
				$(".common_slide7").stop().animate({ "left": -index7 * perWidth });
			})

			var index8 = 0;
			$(".arrow15").click(function() {
				index8++;
				if(index8 == $(".common_slide8").children().length) {
					index6 = 1;
					$(".common_slide8").css("left", -(index8 - 1) * perWidth);
				}
				$(".common_slide8").stop().animate({ "left": -index8 * perWidth })
			})

			$(".arrow16").click(function() {
				index8--;
				if(index8 == -1) {
					index8 = $(".common_slide8").children().length - 2;
					$(".common_slide8").css("left", -(index8 + 1) * perWidth)

				}
				$(".common_slide8").stop().animate({ "left": -index8 * perWidth });
			})

		}
	})

	//爱阅读
	//https://f.3.cn/index-floor-material?argv=basic_7&callback=jsonCallBackbasic_7&pin=&uuid=56923538&_=1513999005142
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=basic_7&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.cols;
			//console.log(data);
			var str1 = ""; //title
			str1 += "<div class='common_title'><h3>" + data[0].title + "</h3>"
			//<i>"+data[0].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[0].tag.length; i++) {
				str1 += "<a href='" + data[0].tag[i].url + "'>" + data[0].tag[i].title + "</a>";
			}
			str1 += "</div>";
			//pic

			var str2 = "";
			str2 += "<div class='common_pic'><a class='big_pic'  href='" + data[0].content[0].cover[0].url + "'><img src='" + data[0].content[0].cover[0].imgUrl + "'></a><ul class='common_list'>"
			var arr1 = data[0].content[0].bi;
			for(var j = 0; j < arr1.length; j++) {
				str2 += "<li><a href='" + arr1[j].url + "'><span>" + arr1[j].title + "</span><i>" + arr1[j].subTitle + "</i><img src='" + arr1[j].imgUrl + "'></a></li>"
			}
			str2 += "</ul>"
			var arr2 = data[0].content[0].bottom;
			for(var k = 0; k < arr2.length; k++) {
				str2 += "<a href='" + arr2[k][0].url + "'><img src=" + arr2[k][0].imgUrl + "></a>"
			}
			str2 += "</div>"

			//links

			var str3 = "";
			str3 += "<div class='common_links common_links9'><div class='common_slide common_slide9'>";

			for(var m = 0; m < data[0].brand.length / 6; m++) {
				str3 += "<div>"
				for(var n = m * 6; n < Math.min(data[0].brand.length, (m + 1) * 6); n++) {
					str3 += "<a href='" + data[0].brand[n].href + "'><img src=" + data[0].brand[n].src + "></a>"
				}
				str3 += "</div>"
			}

			str3 += "</div></div>";
			var totalstr1 = "<div class='common_area'>" + str1 + str2 + str3 + "</div>";

			var str4 = ""; //title
			str4 += "<div class='common_title'><h3>" + data[1].title + "</h3>"
			//<i>"+data[1].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[1].tag.length; i++) {
				str4 += "<a href='" + data[1].tag[i].url + "'>" + data[1].tag[i].title + "</a>";
			}
			str4 += "</div>";
			//pic

			var str5 = "";
			str5 += "<div class='common_pic'><a class='big_pic' href='" + data[1].content[0].cover[0].url + "'><img src='" + data[1].content[0].cover[0].imgUrl + "'></a><ul>"
			var arr3 = data[1].content[0].bi;
			for(var j = 0; j < arr3.length; j++) {
				str5 += "<li><a href='" + arr3[j].url + "'><span>" + arr3[j].title + "</span><i>" + arr3[j].subTitle + "</i><img src='" + arr3[j].imgUrl + "'></a></li>"
			}
			str5 += "</ul>"
			var arr4 = data[1].content[0].bottom;
			for(var k = 0; k < arr4.length; k++) {
				str5 += "<a href='" + arr4[k][0].url + "'><img src=" + arr4[k][0].imgUrl + "></a>"
			}
			str5 += "</div>"

			//links

			var str6 = "";
			str6 += "<div class='common_links common_links10'><div class='common_slide common_slide10'>";

			for(var m = 0; m < data[1].brand.length / 6; m++) {
				str6 += "<div>"
				for(var n = m * 6; n < Math.min(data[1].brand.length, (m + 1) * 6); n++) {
					str6 += "<a href='" + data[1].brand[n].href + "'><img src=" + data[1].brand[n].src + "></a>"
				}
				str6 += "</div>"
			}

			str6 += "</div></div>";

			var totalstr2 = "<div class='common_area common_area1'>" + str4 + str5 + str6 + "</div>";
			var totalstr = totalstr1 + totalstr2;
			$("#floor_love_read").html(totalstr);

			//console.log($(".common_slide"));
			var perWidth = $(".common_slide").children().eq(0).width();
			//console.log(perWidth);
			$(".common_slide").css("width", perWidth * $(".common_slide").children().length);

			//下方轮播
			var arrow = "<em class='arrow17'>&#xe637;</em><em class='arrow18'>&#xe604;</em>"
			$('.common_links9').append(arrow);
			var arrow = "<em class='arrow19'>&#xe637;</em><em class='arrow20'>&#xe604;</em>"
			$('.common_links10').append(arrow);
			$(".common_slide").append($(".common_slide>div:first").clone());
			var index9 = 0;
			$(".arrow17").click(function() {
				index9++;
				if(index9 == $(".common_slide9").children().length) {
					index9 = 1;
					$(".common_slide9").css("left", -(index9 - 1) * perWidth);
				}
				$(".common_slide9").stop().animate({ "left": -index9 * perWidth })
			})

			$(".arrow18").click(function() {
				index9--;
				if(index9 == -1) {
					index9 = $(".common_slide9").children().length - 2;
					$(".common_slide9").css("left", -(index9 + 1) * perWidth)

				}
				$(".common_slide9").stop().animate({ "left": -index9 * perWidth });
			})

			var index10 = 0;
			$(".arrow19").click(function() {
				index10++;
				if(index10 == $(".common_slide10").children().length) {
					index10 = 1;
					$(".common_slide10").css("left", -(index10 - 1) * perWidth);
				}
				$(".common_slide10").stop().animate({ "left": -index10 * perWidth })
			})

			$(".arrow20").click(function() {
				index10--;
				if(index10 == -1) {
					index10 = $(".common_slide10").children().length - 2;
					$(".common_slide10").css("left", -(index10 + 1) * perWidth)

				}
				$(".common_slide10").stop().animate({ "left": -index10 * perWidth });
			})

		}
	})

	//爱游戏
	//https://f.3.cn/index-floor-material?argv=basic_8&callback=jsonCallBackbasic_8&pin=&uuid=56923538&_=1513999005146
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=basic_8&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.cols;
			//console.log(data);
			var str1 = ""; //title
			str1 += "<div class='common_title'><h3>" + data[0].title + "</h3>"
			//<i>"+data[0].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[0].tag.length; i++) {
				str1 += "<a href='" + data[0].tag[i].url + "'>" + data[0].tag[i].title + "</a>";
			}
			str1 += "</div>";
			//pic

			var str2 = "";
			str2 += "<div class='common_pic'><a class='big_pic'  href='" + data[0].content[0].cover[0].url + "'><img src='" + data[0].content[0].cover[0].imgUrl + "'></a><ul class='common_list'>"
			var arr1 = data[0].content[0].bi;
			for(var j = 0; j < arr1.length; j++) {
				str2 += "<li><a href='" + arr1[j].url + "'><span>" + arr1[j].title + "</span><i>" + arr1[j].subTitle + "</i><img src='" + arr1[j].imgUrl + "'></a></li>"
			}
			str2 += "</ul>"
			var arr2 = data[0].content[0].bottom;
			for(var k = 0; k < arr2.length; k++) {
				str2 += "<a href='" + arr2[k][0].url + "'><img src=" + arr2[k][0].imgUrl + "></a>"
			}
			str2 += "</div>"

			//links

			var str3 = "";
			str3 += "<div class='common_links common_links11'><div class='common_slide common_slide11'>";

			for(var m = 0; m < data[0].brand.length / 6; m++) {
				str3 += "<div>"
				for(var n = m * 6; n < Math.min(data[0].brand.length, (m + 1) * 6); n++) {
					str3 += "<a href='" + data[0].brand[n].href + "'><img src=" + data[0].brand[n].src + "></a>"
				}
				str3 += "</div>"
			}

			str3 += "</div></div>";
			var totalstr1 = "<div class='common_area'>" + str1 + str2 + str3 + "</div>";

			var str4 = ""; //title
			str4 += "<div class='common_title'><h3>" + data[1].title + "</h3>"
			//<i>"+data[1].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[1].tag.length; i++) {
				str4 += "<a href='" + data[1].tag[i].url + "'>" + data[1].tag[i].title + "</a>";
			}
			str4 += "</div>";
			//pic

			var str5 = "";
			str5 += "<div class='common_pic'><a class='big_pic' href='" + data[1].content[0].cover[0].url + "'><img src='" + data[1].content[0].cover[0].imgUrl + "'></a><ul>"
			var arr3 = data[1].content[0].bi;
			for(var j = 0; j < arr3.length; j++) {
				str5 += "<li><a href='" + arr3[j].url + "'><span>" + arr3[j].title + "</span><i>" + arr3[j].subTitle + "</i><img src='" + arr3[j].imgUrl + "'></a></li>"
			}
			str5 += "</ul>"
			var arr4 = data[1].content[0].bottom;
			for(var k = 0; k < arr4.length; k++) {
				str5 += "<a href='" + arr4[k][0].url + "'><img src=" + arr4[k][0].imgUrl + "></a>"
			}
			str5 += "</div>"

			//links

			var str6 = "";
			str6 += "<div class='common_links common_links12'><div class='common_slide common_slide12'>";

			for(var m = 0; m < data[1].brand.length / 6; m++) {
				str6 += "<div>"
				for(var n = m * 6; n < Math.min(data[1].brand.length, (m + 1) * 6); n++) {
					str6 += "<a href='" + data[1].brand[n].href + "'><img src=" + data[1].brand[n].src + "></a>"
				}
				str6 += "</div>"
			}

			str6 += "</div></div>";

			var totalstr2 = "<div class='common_area common_area1'>" + str4 + str5 + str6 + "</div>";
			var totalstr = totalstr1 + totalstr2;
			$("#floor_love_games").html(totalstr);

			//console.log($(".common_slide"));
			var perWidth = $(".common_slide").children().eq(0).width();
			//console.log(perWidth);
			$(".common_slide").css("width", perWidth * $(".common_slide").children().length);

			//下方轮播
			var arrow = "<em class='arrow21'>&#xe637;</em><em class='arrow22'>&#xe604;</em>"
			$('.common_links11').append(arrow);
			var arrow = "<em class='arrow23'>&#xe637;</em><em class='arrow24'>&#xe604;</em>"
			$('.common_links12').append(arrow);
			$(".common_slide").append($(".common_slide>div:first").clone());
			var index11 = 0;
			$(".arrow21").click(function() {
				index11++;
				if(index11 == $(".common_slide11").children().length) {
					index11 = 1;
					$(".common_slide11").css("left", -(index11 - 1) * perWidth);
				}
				$(".common_slide11").stop().animate({ "left": -index11 * perWidth })
			})

			$(".arrow22").click(function() {
				index11--;
				if(index11 == -1) {
					index11 = $(".common_slide11").children().length - 2;
					$(".common_slide11").css("left", -(index11 + 1) * perWidth)

				}
				$(".common_slide11").stop().animate({ "left": -index11 * perWidth });
			})

			var index12 = 0;
			$(".arrow23").click(function() {
				index12++;
				if(index12 == $(".common_slide12").children().length) {
					index12 = 1;
					$(".common_slide12").css("left", -(index12 - 1) * perWidth);
				}
				$(".common_slide12").stop().animate({ "left": -index12 * perWidth })
			})

			$(".arrow24").click(function() {
				index12--;
				if(index12 == -1) {
					index12 = $(".common_slide12").children().length - 2;
					$(".common_slide12").css("left", -(index12 + 1) * perWidth)

				}
				$(".common_slide12").stop().animate({ "left": -index12 * perWidth });
			})

		}
	})

	//爱旅行
	//https://f.3.cn/index-floor-material?argv=basic_9&callback=jsonCallBackbasic_9&pin=&uuid=56923538&_=1513999887195
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=basic_9&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.cols;
			//console.log(data);
			var str1 = ""; //title
			str1 += "<div class='common_title'><h3>" + data[0].title + "</h3>"
			//<i>"+data[0].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[0].tag.length; i++) {
				str1 += "<a href='" + data[0].tag[i].url + "'>" + data[0].tag[i].title + "</a>";
			}
			str1 += "</div>";
			//pic

			var str2 = "";
			str2 += "<div class='common_pic'><a class='big_pic'  href='" + data[0].content[0].cover[0].url + "'><img src='" + data[0].content[0].cover[0].imgUrl + "'></a><ul class='common_list'>"
			var arr1 = data[0].content[0].bi;
			for(var j = 0; j < arr1.length; j++) {
				str2 += "<li><a href='" + arr1[j].url + "'><span>" + arr1[j].title + "</span><i>" + arr1[j].subTitle + "</i><img src='" + arr1[j].imgUrl + "'></a></li>"
			}
			str2 += "</ul>"
			var arr2 = data[0].content[0].bottom;
			for(var k = 0; k < arr2.length; k++) {
				str2 += "<a href='" + arr2[k][0].url + "'><img src=" + arr2[k][0].imgUrl + "></a>"
			}
			str2 += "</div>"

			//links

			var str3 = "";
			str3 += "<div class='common_links common_links13'><div class='common_slide common_slide13'>";

			for(var m = 0; m < data[0].brand.length / 6; m++) {
				str3 += "<div>"
				for(var n = m * 6; n < Math.min(data[0].brand.length, (m + 1) * 6); n++) {
					str3 += "<a href='" + data[0].brand[n].href + "'><img src=" + data[0].brand[n].src + "></a>"
				}
				str3 += "</div>"
			}

			str3 += "</div></div>";
			var totalstr1 = "<div class='common_area'>" + str1 + str2 + str3 + "</div>";

			var str4 = ""; //title
			str4 += "<div class='common_title'><h3>" + data[1].title + "</h3>"
			//<i>"+data[1].qrcode[0].qrcode+"</i>
			for(var i = 0; i < data[1].tag.length; i++) {
				str4 += "<a href='" + data[1].tag[i].url + "'>" + data[1].tag[i].title + "</a>";
			}
			str4 += "</div>";
			//pic

			var str5 = "";
			str5 += "<div class='common_pic'><a class='big_pic' href='" + data[1].content[0].cover[0].url + "'><img src='" + data[1].content[0].cover[0].imgUrl + "'></a><ul>"
			var arr3 = data[1].content[0].bi;
			for(var j = 0; j < arr3.length; j++) {
				str5 += "<li><a href='" + arr3[j].url + "'><span>" + arr3[j].title + "</span><i>" + arr3[j].subTitle + "</i><img src='" + arr3[j].imgUrl + "'></a></li>"
			}
			str5 += "</ul>"
			var arr4 = data[1].content[0].bottom;
			for(var k = 0; k < arr4.length; k++) {
				str5 += "<a href='" + arr4[k][0].url + "'><img src=" + arr4[k][0].imgUrl + "></a>"
			}
			str5 += "</div>"

			//links

			var str6 = "";
			str6 += "<div class='common_links common_links14'><div class='common_slide common_slide14'>";

			for(var m = 0; m < data[1].brand.length / 6; m++) {
				str6 += "<div>"
				for(var n = m * 6; n < Math.min(data[1].brand.length, (m + 1) * 6); n++) {
					str6 += "<a href='" + data[1].brand[n].href + "'><img src=" + data[1].brand[n].src + "></a>"
				}
				str6 += "</div>"
			}

			str6 += "</div></div>";

			var totalstr2 = "<div class='common_area common_area1'>" + str4 + str5 + str6 + "</div>";
			var totalstr = totalstr1 + totalstr2;
			$("#floor_love_travel").html(totalstr);

			//console.log($(".common_slide"));
			var perWidth = $(".common_slide").children().eq(0).width();
			//console.log(perWidth);
			$(".common_slide").css("width", perWidth * $(".common_slide").children().length);

			//下方轮播
			var arrow = "<em class='arrow25'>&#xe637;</em><em class='arrow26'>&#xe604;</em>"
			$('.common_links13').append(arrow);
			var arrow = "<em class='arrow27'>&#xe637;</em><em class='arrow28'>&#xe604;</em>"
			$('.common_links14').append(arrow);
			$(".common_slide").append($(".common_slide>div:first").clone());
			var index13 = 0;
			$(".arrow25").click(function() {
				index13++;
				if(index13 == $(".common_slide13").children().length) {
					index13 = 1;
					$(".common_slide13").css("left", -(index13 - 1) * perWidth);
				}
				$(".common_slide13").stop().animate({ "left": -index13 * perWidth })
			})

			$(".arrow26").click(function() {
				index13--;
				if(index13 == -1) {
					index13 = $(".common_slide13").children().length - 2;
					$(".common_slide13").css("left", -(index13 + 1) * perWidth)

				}
				$(".common_slide13").stop().animate({ "left": -index13 * perWidth });
			})

			var index14 = 0;
			$(".arrow27").click(function() {
				index14++;
				if(index14 == $(".common_slide14").children().length) {
					index14 = 1;
					$(".common_slide14").css("left", -(index14 - 1) * perWidth);
				}
				$(".common_slide14").stop().animate({ "left": -index14 * perWidth })
			})

			$(".arrow28").click(function() {
				index14--;
				if(index14 == -1) {
					index14 = $(".common_slide14").children().length - 2;
					$(".common_slide14").css("left", -(index14 + 1) * perWidth)

				}
				$(".common_slide14").stop().animate({ "left": -index14 * perWidth });
			})

		}
	})

	//电脑数码
	//https://f.3.cn/index-floor-material?argv=basic_3&callback=jsonCallBackbasic_3&pin=&uuid=56923538&_=1514000477796
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=basic_3&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.cols;
			console.log(data);
			var str1 = ""; //title

			str1 += "<div class='common_title common_title_computer'><h3>" + data[0].title + "</h3>"
			for(var i = 0; i < data[0].tag.length; i++) {
				str1 += "<a href='" + data[0].tag[i].url + "'>" + data[0].tag[i].title + "</a>";
			}
			str1 += "</div>";

			//pic1
			var str2 = "";
			str2 += "<div class='common_pic'><a class='big_pic'  href='" + data[0].content[0].cover[0].url + "'><img src='" + data[0].content[0].cover[0].imgUrl + "'></a><ul class='common_list'>"
			var arr1 = data[0].content[0].bi;
			for(var j = 0; j < arr1.length; j++) {
				str2 += "<li><a href='" + arr1[j].url + "'><span>" + arr1[j].title + "</span><i>" + arr1[j].subTitle + "</i><img src='" + arr1[j].imgUrl + "'></a></li>"
			}
			str2 += "</ul>"
			var arr2 = data[0].content[0].bottom;
			for(var k = 0; k < arr2.length; k++) {
				str2 += "<a href='" + arr2[k][0].url + "'><img src=" + arr2[k][0].imgUrl + "></a>"
			}
			str2 += "</div>"

			var str5 = "";
			str5 += "<div class='common_pic'><a class='big_pic' href='" + data[0].content[1].cover[0].url + "'><img src='" + data[0].content[1].cover[0].imgUrl + "'></a><ul>"
			var arr3 = data[0].content[1].bi;
			for(var j = 0; j < arr3.length; j++) {
				str5 += "<li><a href='" + arr3[j].url + "'><span>" + arr3[j].title + "</span><i>" + arr3[j].subTitle + "</i><img src='" + arr3[j].imgUrl + "'></a></li>"
			}
			str5 += "</ul>"
			var arr4 = data[0].content[1].bottom;
			for(var k = 0; k < arr4.length; k++) {
				str5 += "<a href='" + arr4[k][0].url + "'><img src=" + arr4[k][0].imgUrl + "></a>"
			}
			str5 += "</div>"

			var picStr = str2 + str5;

			//links

			var str3 = "";
			str3 += "<div class='common_links common_links20'><div class='common_slide common_slide20'>";

			for(var m = 0; m < data[0].brand.length / 12; m++) {
				str3 += "<div>"
				for(var n = m * 12; n < Math.min(data[0].brand.length, (m + 1) * 12); n++) {
					str3 += "<a href='" + data[0].brand[n].href + "'><img src=" + data[0].brand[n].src + "></a>"
				}
				str3 += "</div>"
			}
			str3 += "</div></div>";

			var totalContent = "<div class='common_area'><div class='common_title'></div>" + str2 + "</div><div class='common_area common_area1'><div class='common_title'></div>" + str5 + "<div class='common_links></div></div>"
			$("#floor_computer").html(totalContent);
			$("#floor_computer").append(str1);
			$("#floor_computer").append(str3);
			var perWidth = $(".common_slide").children().eq(0).width();
			$(".common_slide").css("width", perWidth * $(".common_slide").children().length);

			//下方轮播
			var arrow = "<em class='arrow40'>&#xe637;</em><em class='arrow41'>&#xe604;</em>"
			$('.common_links20').append(arrow);
			$(".common_slide").append($(".common_slide>div:first").clone());
			var index20 = 0;
			$(".arrow40").click(function() {
				index20++;
				if(index20 == $(".common_slide20").children().length) {
					index20 = 1;
					$(".common_slide20").css("left", -(index20 - 1) * perWidth);
				}
				$(".common_slide20").stop().animate({ "left": -index20 * perWidth })
			})

			$(".arrow41").click(function() {
				index20--;
				if(index20 == -1) {
					index20 = $(".common_slide20").children().length - 2;
					$(".common_slide20").css("left", -(index20 + 1) * perWidth)

				}
				$(".common_slide20").stop().animate({ "left": -index20 * perWidth });
			})

		}
	})

	//爱吃
	//https://f.3.cn/index-floor-material?argv=basic_5&callback=jsonCallBackbasic_3&pin=&uuid=56923538&_=1514000477796
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=basic_5&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.cols;
			console.log(data);
			var str1 = ""; //title

			str1 += "<div class='common_title common_title_computer'><h3>" + data[0].title + "</h3>"
			for(var i = 0; i < data[0].tag.length; i++) {
				str1 += "<a href='" + data[0].tag[i].url + "'>" + data[0].tag[i].title + "</a>";
			}
			str1 += "</div>";

			//pic1
			var str2 = "";
			str2 += "<div class='common_pic'><a class='big_pic'  href='" + data[0].content[0].cover[0].url + "'><img src='" + data[0].content[0].cover[0].imgUrl + "'></a><ul class='common_list'>"
			var arr1 = data[0].content[0].bi;
			for(var j = 0; j < arr1.length; j++) {
				str2 += "<li><a href='" + arr1[j].url + "'><span>" + arr1[j].title + "</span><i>" + arr1[j].subTitle + "</i><img src='" + arr1[j].imgUrl + "'></a></li>"
			}
			str2 += "</ul>"
			var arr2 = data[0].content[0].bottom;
			for(var k = 0; k < arr2.length; k++) {
				str2 += "<a href='" + arr2[k][0].url + "'><img src=" + arr2[k][0].imgUrl + "></a>"
			}
			str2 += "</div>"

			var str5 = "";
			str5 += "<div class='common_pic'><a class='big_pic' href='" + data[0].content[1].cover[0].url + "'><img src='" + data[0].content[1].cover[0].imgUrl + "'></a><a class='big_pic1' href='" + data[0].content[1].cover[1].url + "'><img src='" + data[0].content[1].cover[1].imgUrl + "'></a><ul>"
			var arr3 = data[0].content[1].bi;
			for(var j = 0; j < arr3.length; j++) {
				str5 += "<li><a href='" + arr3[j].url + "'><span>" + arr3[j].title + "</span><i>" + arr3[j].subTitle + "</i><img src='" + arr3[j].imgUrl + "'></a></li>"
			}
			str5 += "</ul>"
			var arr4 = data[0].content[1].bottom;
			for(var k = 0; k < arr4.length; k++) {
				str5 += "<a href='" + arr4[k][0].url + "'><img src=" + arr4[k][0].imgUrl + "></a>"
			}
			str5 += "</div>"

			var picStr = str2 + str5;

			//links

			var str3 = "";
			str3 += "<div class='common_links common_links21'><div class='common_slide common_slide21'>";

			for(var m = 0; m < data[0].brand.length / 12; m++) {
				str3 += "<div>"
				for(var n = m * 12; n < Math.min(data[0].brand.length, (m + 1) * 12); n++) {
					str3 += "<a href='" + data[0].brand[n].href + "'><img src=" + data[0].brand[n].src + "></a>"
				}
				str3 += "</div>"
			}
			str3 += "</div></div>";

			var totalContent = "<div class='common_area'><div class='common_title'></div>" + str2 + "</div><div class='common_area common_area1'><div class='common_title'></div>" + str5 + "<div class='common_links></div></div>"
			$("#floor_love_eat").html(totalContent);
			$("#floor_love_eat").append(str1);
			$("#floor_love_eat").append(str3);
			var perWidth = $(".common_slide").children().eq(0).width();
			$(".common_slide").css("width", perWidth * $(".common_slide").children().length);

			//下方轮播
			var arrow = "<em class='arrow42'>&#xe637;</em><em class='arrow43'>&#xe604;</em>"
			$('.common_links21').append(arrow);
			$(".common_slide").append($(".common_slide>div:first").clone());
			var index21 = 0;
			$(".arrow42").click(function() {
				index21++;
				if(index21 == $(".common_slide21").children().length) {
					index21 = 1;
					$(".common_slide21").css("left", -(index21 - 1) * perWidth);
				}
				$(".common_slide21").stop().animate({ "left": -index21 * perWidth })
			})

			$(".arrow43").click(function() {
				index21--;
				if(index21 == -1) {
					index21 = $(".common_slide21").children().length - 2;
					$(".common_slide21").css("left", -(index21 + 1) * perWidth)

				}
				$(".common_slide21").stop().animate({ "left": -index21 * perWidth });
			})

		}
	})

	//购特色
	//https://f.3.cn/index-floor-material?argv=special_2&callback=jsonCallBackspecial_2&pin=&uuid=56923538&_=1514001223159
	$.ajax({
		type: "get",
		url: "https://f.3.cn/index-floor-material?argv=special_2&callback=?",
		async: true,
		dataType: "jsonp",
		scriptCharset: "gbk",
		success: function(data) {
			data = data.data.list;
			//console.log(data);
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str += "<a href='" + data[i][0].url + "'><img src='" + data[i][0].imgUrl + "'><span style='background:" + data[i][0].bgColor + "'><b>" + data[i][0].title + "</b><i>" + data[i][0].subTitle + "</i></span></a>"
			}
			$("#feature_content").html(str);
		}
	})

	//还没逛够
	//https://diviner.jd.com/diviner?p=610009&callback=jsonpCallbackMoreGood&lid=1&pin=&uuid=122270672.56923538.1513987305.1513998159.1514003946.5&lim=100&ec=utf-8&_=1514004216161
	$.ajax({
		type: "get",
		url: "https://diviner.jd.com/diviner?p=610009&callback=?&lid=1&pin=&uuid=122270672.56923538.1513987305.1513998159.1514003946.5&lim=100&ec=utf-8&_=1514004216161",
		async: true,
		dataType: "jsonp",
		//scriptCharset: "gbk",
		success: function(data) {
			data = data.data;
			//console.log(data);
			var str = "";
			for(var i = 0; i < data.length; i++) {
				str += "<li><a href='https://item.jd.com/" + data[i].sku + ".html'><img src='https://img11.360buyimg.com/jdcms/s220x220_" + data[i].img + "'><span><b>" + data[i].t + "</b><i>￥" + data[i].jp + "</i></span></a></li>"
			}
			//console.log(str);
			$("#enough_content").html(str);
		}
	})

	//楼梯效果

	$(function() {
		var $links = $("#floorNav li");
		var $floor = $(".floor");
		console.log($("#floor").position().top);
		window.onscroll = function() {
			var $scrollTop = $(document).scrollTop();
			if($scrollTop >= 1500) {
				$("#floorNav").stop().fadeIn();
				$floor.each(function(index) {
					if($scrollTop >= $floor.eq(index).offset().top) {
						$links.eq(index).css("background", "#ff0000").siblings().css("background", "#666");
					}
				})
			} else {
				$("#floorNav").css("display", "none");
			}
		}
		$links.each(function(index) {
			$links.eq(index).click(function() {
				if(index == $floor.length - 1) {
					$("html,body").stop().animate({ "scrollTop": 0 });
				} else {
					var top = $floor.eq(index).position().top;
					$("html,body").stop().animate({ "scrollTop": top });
				}

			})
		})

	})
	//侧边栏
	console.log($(".slidebar_links").length);
	$(".slidebar_links").hover(function() {
		var index = $(this).index();
		$(".slidebar_links").find("span").stop().animate({ "left": 0 }).end().eq(index).find("span").stop().animate({ "left": -60 });

		$(".slidebar_links").find("em").css("background", "#666").end().eq(index).find("em").css("background", "#FF0000");

	}, function() {
		$(".slidebar_links").find("span").stop().animate({ "left": 0 });
		$(".slidebar_links").find("em").css("background", "#666")
	})
	$(".slidebar_links1").hover(function() {
		var index = $(this).index();
		$(".slidebar_links1").find("span").stop().animate({ "left": 0 }).end().eq(index).find("span").stop().animate({ "left": -60 });
		$(".slidebar_links1").find("em").css("background", "#666").end().eq(index).find("em").css("background", "#FF0000");

	}, function() {
		$(".slidebar_links1").find("span").stop().animate({ "left": 0 })
		$(".slidebar_links1").find("em").css("background", "#666")
	})

	//判断是否处于登录状态
	var str = location.search.split("?")[1];
	console.log(typeof str);
	if(str != undefined) {
		$(".login_username").html(str);
			$("#nav_list li a").click(function() {
			location.assign("list.html?" + str);
		})
		//判断用户是否添加过商品
		if(getCookie("cart1")) {
			console.log("aaa")
			var obj = JSON.parse(getCookie("cart1"));
			if(!obj[str]) { //若用户已登录但未添加过商品
				$(".totalProductNum").html(0); //购物车中数量为0；
				$(".loginCart").click(function(){
					location.assign("cart.html?"+str);
				})
			} else { //若用户已添加过商品
				obj = obj[str];
				var sum = 0;
				for(var i in obj) {
					sum+=parseInt(obj[i]);
				}
				$(".totalProductNum").html(sum); //购物车中数量为已添加商品的总数量；
				$(".loginCart").click(function(){
					location.assign("cart.html?"+str);
				})
			}
		}
		
		
		
	} else {
		$(".login_username").html("你好，请登录");
		$(".login_username1").html("登录");
		$("#nav_list li a").click(function() {
			location.assign("list.html?");
		})
		$(".totalProductNum").html(0);
		$(".loginCart").click(function(){
			location.assign("login.html");
		})

	}

})