var dateUtil = {
	//判断某年份是否为闰年;
	isleapYear: function(year) {
		if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
			return true;
		}
		return false;
	},

	//补0；
	bl: function(num) {
		return num < 10 ? "0" + num : num;
	},

	//将日期格式化输出 “2015|08|24”

	format: function(oDate, str) {
		var year = oDate.getFullYear();
		var month = oDate.getMonth();
		var day = oDate.getDate();
		month = dateUtil.bl(month) + 1;
		day = dateUtil.bl(day);
		return year + str + month + str + day;
	},
	//获得某个月份的天数
	getDays: function(year, month) {
		switch(month) {
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
			case 2:
				if(dateUtil.isleapYear(year)) {
					return 29;
				}
				return 28;
			default:
				return 31;
		}
	},

	//判断两个日期相差的天数
	getDiffDays: function(oDate1, oDate2) {
		var diff = Math.floor(Math.abs(oDate1 - oDate2) / 1000);
		var day = Math.floor(diff / 60 / 60 / 24);
		var hour = Math.floor(diff / 60 / 60 % 24);
		var minute = Math.floor(diff / 60 % 60);
		var second = diff % 60;
		hour = dateUtil.bl(hour);
		minute = dateUtil.bl(minute);
		second = dateUtil.bl(second);
		return day + "天" + hour + "小时" + minute + "分钟" + second + "秒"
	},

	//获得N天以后的日期
	getNdays: function(n) {
		var date = new Date();
		var day = date.getDate();
		date.setDate(day + n);
		return dateUtil.format(date, "/")
	}

}
var arrfunction = {
	//定义一个含有a个整型元素的数组，按顺序分别赋予从2开始的偶数；然后按顺序每n个数求出一个平均值，放在另一个数组中并输出。试编程。
	arrMean: function(a, n) {
		var arr = [];
		var newArr = [];
		var sum = 0;
		for(var i = 0; i < a; i++) {
			arr[i] = i * 2 + 2;
		}
		console.log(arr);
		for(var j = 0; j < arr.length; j++) {
			sum += arr[j];
			if((j + 1) % n == 0) {
				newArr.push(sum / n);
				sum = 0;
			}
		}
		console.log(newArr);
	},

	//编写函数map(arr) 把数组中的每一位数字都增加30%
	arrMap: function(arr) {
		var newArr = arr.map(function(item) {
			return item = item + item * 0.3;
		})
		console.log(newArr);
	},

	//编写函数has(arr , 60) 判断数组中是否存在60这个元素，返回布尔类型
	exist_Element: function(arr, n) {
		if(arr.indexOf(n) == -1) {
			return false;
		}
		return true;
	},
	exist_Element: function(arr, n) {
		for(i = 0; i < arr.length; i++) {
			if(arr[i] == n) {
				return true;
			}
		}
		return false;
	},
	//排序
	//（1）调用函数排序
	rank_function: function(arr) {
		arr = arr.sort(function(a, b) {
			return a - b;
		})
		return arr;
	},

	//(2)冒泡法排序
	bubble_sort: function(arr) {
		for(i = 0; i < arr.length - 1; i++) { //控制外层循环
			for(j = 0; j < arr.length - 1 - i; j++) { //控制内层循环
				if(arr[j] > arr[j + 1]) {
					var temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;
				}
			}
		}
		return arr;
	},

	//(3)选择排序
	select_sort: function(arr) {
		for(i = 0; i < arr.length - 1; i++) {
			var minIndex = i;
			for(j = i + 1; j < arr.length; j++) {
				if(arr[minIndex] > arr[j]) {
					minIndex = j;
				}
			}
			var temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;
		}
		return arr;
	},

	//编写函数norepeat(arr) 将数组的重复元素去掉，并返回新的数组
	noRepeat: function(arr) {
		var obj = {};
		var newArr = [];
		for(i = 0; i < arr.length; i++) {
			if(obj[arr[i]] == undefined) {
				newArr.push(arr[i]);
				obj[arr[i]] = 1;
			}
		}
		return newArr;
	},

	noRepeat1: function(arr) {
		for(i = 0; i < arr.length; i++) {
			for(j = i + 1; j < arr.length; j++) {
				if(arr[i] == arr[j]) {
					arr.splice(j, 1);
					j--;
				}
			}
		}
		return arr;
	},

	noRepeat2: function(arr) {
		arr = arr.sort(function(a, b) {
			return a - b;
		})
		for(i = 0; i < arr.length; i++) {
			if(arr[i] == arr[i + 1]) {
				arr.splice(i, 1);
				i--;
			}
		}
		return arr;
	},

	noRepeat3: function(arr) {
		var newArr = [];
		for(i = 0; i < arr.length; i++) {
			if(newArr.indexOf(arr[i]) == -1) {
				newArr.push(arr[i]);
			}
		}
		return newArr;
	},

	//有一个从小到大排好序的数组。现输入一个数，要求按原来的规律将它插入数组中。
	insert: function(arr, n) {
		arr.push(n);
		arr.sort(function(a, b) {
			return a - b;
		})
		return arr;
	},

	//随机生成一个n位以内的数，然后输出该数共有多少位，每位分别是什么
	random1: function(n) {
		var num = Math.floor(Math.random() * Math.pow(10, 5));
		console.log(num);
		var str = String(num);
		console.log(str.length);
		for(i = 0; i < str.length; i++) {
			console.log(str[i]);
		}
	},

	//敏感词过滤
	senstiveFilter: function(arr, arrSenstive) {
		for(i = 0; i < arrSenstive.length; i++) {
			arr = arr.replace(arrSenstive[i], "*")
		}
		return arr;
	},

	//密码强度
	passwordStrength: function(str) {
		var newArr = [];
		for(i = 0; i < str.length; i++) {
			var num = str.charCodeAt(i);
			newArr.push(num);
		}
		var a = newArr.some(function(item) {
			return item >= 48 && item <= 57;
		});
		var b = newArr.some(function(item) {
			return item >= 65 && item <= 90;
		});
		var c = newArr.some(function(item) {
			return item >= 97 && item <= 122;
		});

		var sum = 0;
		sum = a + b + c;
		if(sum == 1) {
			alert("弱");
		} else if(sum == 2) {
			alert("中");
		} else if(sum == 3) {
			alert("强");
		} else {
			alert("请输入正确的密码")
		}
	},

}
//创建cookie
//name:cookie名     value表示cookie值    date表示cookie保存天数
function setCookie(name, value, date) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + date);
	document.cookie = name + "=" + value + ";expires=" + oDate;
}
//获取cookie
function getCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for(i = 0; i < arrCookie.length; i++) {
		arr = arrCookie[i].split("=");
		if(arr[0] == name) {
			return arr[1];
		}
	}
}
//删除cookie
function removeCookie(name) {
	setCookie(name, 1, -1);
}
//窗口拖拽   elem指的是元素名程；
function dragWindow(elem) {
	elem.onmousedown = function(e) {
		var evt = e || event;
		var disX = evt.offsetX;
		var disY = evt.offsetY;
		elem.style.left = evt.clientX - disX + "px";
		elem.style.top = evt.clientY - disY + "px";

		document.onmousemove = function(e) {
			var evt = e || event;
			var x = evt.clientX - disX;
			var y = evt.clientY - disY

			if(x < 0) {
				x = 0;
			}
			if(x > document.documentElement.clientWidth - elem.offsetWidth) {
				x = document.documentElement.clientWidth - elem.offsetWidth;
			}
			if(y < 0) {
				y = 0;
			}
			if(y > document.documentElement.clientHeight - elem.offsetHeight) {
				y = document.documentElement.clientHeight - elem.offsetHeight
			}
			elem.style.left = x + "px";
			elem.style.top = y + "px";
		}
		document.onmouseup = function() {
			document.onmousemove = null;
		}
	}
}
//记录窗口位置
function recordPosition(elem) {
	if(getCookie("left")) {
		elem.style.left = getCookie("left");
		elem.style.top = getCookie("top");
	}
	elem.onmouseup = function() {
		var x = elem.style.left;
		var y = elem.style.top;
		setCookie("left", x, 7);
		setCookie("top", y, 7);
	}
}
//获取非行内样式的方法：
function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr]; //ie浏览器

	}
	return getComputedStyle(obj, null)[attr]; //非IE浏览器
}
//运动框架
function startMove(obj, json,fnEnd) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for(var attr in json) {
			var _target = json[attr];
			if(attr == "opacity") {
				var iCur = Math.round(parseFloat(getStyle(obj, "opacity") * 100));
			} else {
				var iCur = parseInt(getStyle(obj, attr));
			}
			var iSpeed = (_target - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(attr == "opacity") {
				obj.style.opacity = (iCur + iSpeed) / 100;
				console.log("aaa");
				obj.style.filter = "alpha(opacity=" + (iCur + iSpeed) + ")";
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			}
			if(iCur != _target) {
				flag = false;
			}
		}
		if(flag) {
			clearInterval(obj.timer);
			if(fnEnd){ //只有传了这个函数才去调用
				fnEnd();
			}
		}
	}, 200)
}
//getbyclassname 兼容函数封装
function getByClassName(classname) {
	if(document.getElementsByClassName) {
		return document.getElementsByClassName(classname);
	}
	var newArr = [];
	var nodes = document.getElementsByTagName("*");
	for(var i = 0; i < nodes.length; i++) {
		if(nodes[i].getAttribute("class")) {
			var attr = nodes[i].getAttribute("class");
			var arr = attr.split(" ");
			for(var j = 0; j < arr.length; j++) {
				if(arr[j] == classname) {
					newArr.push(nodes[i]);
				}
			}
		}
	}
	return newArr;
}
//Ajax封装  fn为回调函数，处理得到的data数据的函数
function Ajax(url, method, data, fnSuccess, fnFalied) {
	if(XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var str = "";
	for(var i in data) {
		str += i + "=" + data[i] + "&";
	}
	str = str.replace(/&$/, "");
	if(method.toUpperCase() == "GET") {
		if(str == "") {
			xhr.open("GET", url, true);
			xhr.send();
		} else {
			xhr.open("GET", url + "?" + str, true);
			xhr.send();
		}
	}
	if(method.toUpperCase() == "POST") {
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				var data = xhr.responseText;
				fnSuccess(data);
			} else {
				fnFalied("请求失败");
			}

		}
	}
}
//promise函数  Ajax封装
function PromiseAjax(url, method, data) {
	return new Promise(function(resolve, rejected) {
		if(XMLHttpRequest) {
			var xhr = new XMLHttpRequest();
		} else {
			var xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		var str = "";
		for(var i in data) {
			str += i + "=" + data[i] + "&";
		}
		str = str.replace(/&$/, "");
		if(method.toUpperCase() == "GET") {
			if(str == "") {
				xhr.open("get", url, true);
				xhr.send();
			} else {
				xhr.open("get", url + "?" + str, true);
			}
		}
		if(method.toUpperCase() == "POST") {
			xhr.open("post", url, true);
			xhr.send(str);
		}
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					var data = xhr.responseText;
					resolve(data);
				} else {
					rejected("请求失败");
				}
			}
		}
	})
}