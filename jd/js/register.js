$(function() {
	//点击显示提示信息
	$(".ipt").each(function(index) {
		$(".ipt").eq(index).click(function() {
			$(".message").children().hide().eq(index).show();
		})
	})

	//生成四位随机验证码；
	function randomNum() {
		var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "l", "m", "n", "o", "p", "q", "r", "s", "t", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "u", "v", "w", "x", "y", "z", "A", "B", "C", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "D", "E", "F", "G", "H", "I", "J", "K", "L", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ];
		var str = "";
		for(var i = 0; i < 4; i++) {
			num = Math.floor(Math.random() * arr.length);
			str += arr[num];
		}
		return str;
	}
	console.log(randomNum());
	//生成手机验证码
	function randonPhone() {
		var str = "";
		for(var j = 0; j < 6; j++) {
			str += Math.floor(Math.random() * 10);
		}
		return str;
	}

	window.onload = function() {
		$(".random_code1").html(randomNum());

		//点击更换验证码
		$(".random_code1").click(function() {
			$(".random_code1").html(randomNum());
		})
		//点击生成手机验证码
		$(".phone_code").click(function() {
			$(".phone_code").html(randonPhone());
		})
		//开始注册
		var reg1 = /[\u4e00-\u9fa5_a-zA-Z0-9_]{4,20}/; //用户名
		var reg2 = /\w{6,10}/ //密码
		var reg3 = /^[1-3]\d{10}$/ //手机
		//校验输入格式是否正确
		var a = b = c = d = e = f = 0;

		//用户名格式校验
		$("#username").change(function() {
			if(reg1.test($(this).val())) {
				if(getCookie("user")) {
					var obj = JSON.parse(getCookie("user"));
					for(var i in obj){
						if(i==$(this).val()){
							return alert("用户名已存在");
						}
					}
					a = 1;
				} else {
					a = 1;
				}
				
			} else {
				alert("用户名格式错误，请参看提示信息")
			}
		})

		//密码格式校验
		$("#psw").change(function() {
			if(reg2.test($(this).val())) {
				b = 1;
			} else {
				alert("密码格式错误")
			}
		})
		//手机号码格式校验
		$("#phone").change(function() {
			if(reg3.test($(this).val())) {
				d = 1;
			} else {
				alert("请输入正确的手机号码")
			}
		})

		$("#btn").click(function() {
			//用户名
			if($("#username").val() == "") {
				return alert("用户名不能为空");
			}
			//设置密码
			if($("#psw").val() == "") {
				return alert("密码不能为空");
			}

			//确认密码
			if($("#psw1").val() == $("#psw").val()) {
				c = 1;
			} else {
				return alert("密码输入错误");
			}

			//手机号码
			if($("#phone").val() == "") {
				return alert("请输入手机号码")
			}

			//验证码
			if($('#randNum').val() == "") {
				return alert("验证码不能为空")
			} else if($('#randNum').val() == $(".random_code1").html()) {
				e = 1;
			} else {
				return alert("验证码输入错误")
			}

			//手机验证码

			if($("#phoneCode").val() == "") {
				return alert("请输入手机验证码")
			} else if($("#phoneCode").val() == $(".phone_code").html()) {
				f = 1;
			} else {
				return alert("手机验证码输入错误");
			}
			var sum = a + b + c + d + e + f
			if(sum == 6) {
				alert("注册成功");
				if(getCookie("user")) {
					var obj = JSON.parse(getCookie("user"));
				} else {
					var obj = {};
				}
				obj[$("#username").val()] = $("#psw").val();
				var str = JSON.stringify(obj);
				setCookie("user",str,365);
				location.assign("login.html");
			}
		})

	}

})