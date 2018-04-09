$(function() {
	//二维码划过效果

	$(".login_pic1").hover(function() {
		$(this).stop().animate({ "left": 10 });
		$(this).siblings().stop().fadeIn()
	}, function() {
		$(this).stop().animate({ "left": 85 }).siblings().hide();
	})

	//点击切换登录方式
	$(".login_type").children().click(function() {
		var index = $(this).index();
		$(".login_content").hide().eq(index).show();
	})

	//登录验证
	
	$("#btn").click(function(){
		if(getCookie("user")){
			var obj=JSON.parse(getCookie("user"));
			for(var i in obj){
				if(i==$("#username").val()){
					if(obj[i]==$("#psw").val()){
						alert("登录成功");
						location.assign("index.html?"+i);
						return;
					}else{
						return alert("用户名或密码错误")
					}
				}
			}
			return alert("用户名不存在")
		}else{
			alert("请注册");
			location.assign(register.html);
		}
		
		
	})
	
	
	
	

})