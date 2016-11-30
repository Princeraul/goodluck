'use strict';
$(window).scroll(function () {
	var scrollTop = $(document).scrollTop();
	if (scrollTop > 80 && $('.header').hasClass('index-header')) {
		$('.index-header').css({
			'background-color': '#002a4f',
			'z-index': '999'
		});
	} else {
		$('.index-header').css({
			'background-color': 'transparent',
			'z-index': '999'
		});
	}
});

// 返回顶部
$("#backTop").click(function () {
	var scrollTop = $(window).scrollTop();
	if (scrollTop > 0) {
		$('html,body').animate({
			scrollTop: 0
		}, 700);
	}
});

function revealOnScroll() {
	var scrolled = $(window).scrollTop();
	// 视窗，即viewport，页面可视范围的窗口
	$(".product-cot").each(function () {
		var current = $(this), // 当前元素
			w_height = $(window).outerHeight(), //视窗高度

			offsetTop = current.offset().top; //当前元素离顶部的高度
		// 当元素进入视窗时，添加class
		if (scrolled + w_height - 160 > offsetTop) {
			current.addClass("visible");
		} else {
			current.removeClass("visible");
		}
	});
}
// 浏览器滚动执行
$(window).on("scroll", revealOnScroll);

// 计算器模块
var calculatorMain = (function (self) {
	// 附码商品数量
	self.defaultValue = function (value) {
		value = value || {};
		value.winRateNumber = Number($('#quantity').val());
		value.oneProfit = Number($('#profit').val());
		value.sweeprate = parseFloat($('#SweepRate').text() / 100);
		value.buyingRate = parseFloat($('#buyingRate').text() / 100);
		value.NotbuyingRate = parseFloat($('#NotbuyingRate').text() / 100);
		return value;
	};
	// 添加奖品项目
	self.addWinColumn = function () {
		var winRate = ['一等奖价格：', '二等奖价格：', '三等奖价格：', '四等奖价格：', '五等奖价格：', '六等奖价格：', '七等奖价格：', '八等奖价格：', '九等奖价格：', '十等奖价格：'];
		var winLen = $('#winColumnMain li').length;
		var lastElement = $('#winColumnMain').children('li:last');
		if (winLen >= 10) {
			alert('已经超过最大奖品添加数量');
		} else {
			var newElement = lastElement.clone(true);
			newElement.insertAfter(lastElement);
			newElement.find('label').html(winRate[winLen]);
		}
	};
	// 千分位计算
	self.commafy = function (num) {
		//1.先去除空格,判断是否空值和非数
		num = num + "";
		//去除空格
		num = num.replace(/[ ]/g, "");
		if (num === "") {
			return;
		}
		if (isNaN(num)) {
			return;
		}
		var index = num.indexOf(".");
		if (index === -1) { //无小数点
			var reg = /(-?\d+)(\d{3})/;
			while (reg.test(num)) {
				num = num.replace(reg, "$1,$2");
			}
		} else {
			var intPart = num.substring(0, index);
			var pointPart = num.substring(index + 1, num.length);
			var reg = /(-?\d+)(\d{3})/;
			while (reg.test(intPart)) {
				intPart = intPart.replace(reg, "$1,$2");
			}
			num = intPart + "." + pointPart;
		}
		return num;
	};
	//计算公约数
	self.commonDivisor = function (num1, num2) {
		for (i = Math.min(num1, num2); i > 0; i--) {
			if (num1 % i == 0 && num2 % i == 0)
				return i;
		}
	}

	// 中奖率 不是百分比  如需百分比需要乘以100
	self.winRate = function () {
			var winRate;
			winRate = self.codeNumber() / (self.defaultValue().winRateNumber);
			// 中奖率
			$('#winerRate').html(parseFloat(winRate * 100).toFixed(2));
			return winRate;
		}
		// A 奖品数量
	self.codeNumber = function () {
			var numberMain = 0;
			$('#winColumnMain li input[data-num="calculator-num"]').each(function (i, ele) {
				numberMain = numberMain + Number($(this).val());
			})
			return numberMain;
		}
		// 预估掌握精准用户信息
	self.addPersonInfo = function () {
			var personInfo = self.commafy(parseInt(self.defaultValue().winRateNumber * self.defaultValue().sweeprate * self.winRate()));
			$('#userInfo').html(personInfo);
		};
		// 投入总费用 奖品总费用
	self.setAllmoney = function () {
			var putInto = 0;
			$('#winColumnMain li').each(function () {
				var first = $(this).find('input').eq(0).val();
				var second = $(this).find('input').eq(1).val();
				putInto = putInto + parseFloat(first * second);
			});
			return putInto;
		};
		// 预估增加销售额  投入产出比
	self.addSell = function () {
			// 附码商品数量 * 扫码率 * 单个商品利润
			var x = self.defaultValue().winRateNumber * self.defaultValue().oneProfit * self.defaultValue().sweeprate;
			var y = self.winRate() * self.defaultValue().buyingRate + (1 - self.winRate()) * self.defaultValue().NotbuyingRate;
			var addSellMoney = x * y + 0.1 * self.setAllmoney();
			$('#sell').html(self.commafy(parseInt(addSellMoney)));
			var commonDivisorNum = self.commonDivisor(parseInt(addSellMoney), parseInt(self.setAllmoney()));
			$('#ratio').html("1 : " + parseFloat((addSellMoney / commonDivisorNum) / (self.setAllmoney() / commonDivisorNum)).toFixed(2));
		};
		// 检查是否填写时数字
	self.isNum = function () {
			var flag;
			$('.calculator-left input').each(function () {
				var value = $(this).val();
				if (!isNaN(value)) {
					flag = true;
				} else {
					flag = false;
				}
			})
			return flag
		}
		// 检测input是否填写
	self.CheckText = function () {
		var flag;
		$('#winColumnMain li input').each(function () {
			if ($(this).val() == '') {
				flag = false;
			} else {
				flag = true;
			}
		})
		return flag
	}
	self.init = function () {
		if (self.codeNumber() > self.defaultValue().winRateNumber) {
			$('.error').show().html('奖品数量不可以大于附码商品数量');
		} else if (self.defaultValue().winRateNumber < 50000) {
			$('.error').show().html('奖品数量不可以小于50000');
		} else if (self.defaultValue().winRateNumber == '' || self.defaultValue().oneProfit == '' || self.CheckText() == false || self.isNum() == false) {
			$('.error').show().html('请正确填写完成必填字段');
		} else {
			$('.error').hide()
			self.addPersonInfo();
			self.addSell();
			self.setAllmoney();
		}
	}
	return self;
}(calculatorMain || {}))

// 联系方式提交
$(".rlt-affirm").on("click", function () {
	$.ajax({
		type: "post",
		url: linPhoneUrl,
		data: {
			'phone': $('#linkPhone').val()
		},
		success: function (msg) {
			if (msg.status) {
				$('.dialogFloat').fadeIn();
				$('.dialogFloat-cot p ').html('<font>恭喜您提交成功</font><br>我们的销售人员将尽快与您联系！')

			} else {
				$('.dialogFloat').fadeIn();
				$('.dialogFloat-cot p ').html('<font>对不起请输入正确的手机号码!</font>')
			}
		}
	});
	$(".dialogFloat").fadeIn();
}), $("#close").click(function () {
	$(".dialogFloat").fadeOut()
});
$('#close').click(function () {
	$('.dialogFloat').fadeOut();
});

function Numbers(obj, number) {
	var numberData = number.split('');
	$(numberData).each(function (i, ele) {
		var parent = $(obj).eq(i);
		// console.log(ele)
		parent.children('li').removeClass("before").removeClass("active")
		if (ele > 0) {
			parent.children('li').eq(ele - 1).addClass("before").removeClass("active");
			parent.children('li').eq(ele).addClass("active").closest("body").addClass("play");
		} else {
			parent.children('li').eq(0).closest("body").addClass("play");
		}
	})
}

function numberflip(obj, num) {
	var parentNodeDiv = document.createElement('div');
	parentNodeDiv.setAttribute('class', 'number-container');

	for (var i = 0; i < num; i++) {
		var parentNodeUl = document.createElement('ul');
		parentNodeUl.setAttribute('class', 'flip');

		for (var j = 0; j < num; j++) {
			var parentNodeli = document.createElement('li');
			parentNodeli.innerHTML = '<a href=\"#\">' + '<div class=\"up\">' + '<div class=\"shadow\"></div>' + '<div class=\"inn\">' + j + '</div>' + '</div>' + '<div class=\"down\">' + '<div class=\"shadow\"></div>' + '<div class=\"inn\">' + j + '</div>' + '</div>' + '</a>';
			parentNodeUl.appendChild(parentNodeli);
		}
		parentNodeDiv.appendChild(parentNodeUl);
	}

	$(obj).append(parentNodeDiv);
}

numberflip('.number', 10);
numberflip('.number-small', 10);
// Numbers(".number .number-container .flip", '0154884511');

// 动态创建流星雨
(function meteorAppend() {
	var html = '';
	var width = $(window).width();
	var classArray = ['meteorShower-1', 'meteorShower-2', 'meteorShower-3'];
	var map_speed = [2500, 4500, 7500];

	var getRandom = function (arr) {
		var len = arr.length;
		return arr[parseInt(len * Math.random(), 10) % len]
	};

	for (var i = 0; i < 10; i++) {
		html += '<div class="meteorShower meteorShower-left">' + '<div class="meteorShower-star"></div>' + '</div>';
	}
	$('.meteor-shower').append(html);
	$('.meteorShower-star').each(function (i) {
		$(this).addClass(classArray[Math.floor(Math.random() * 3)]);
	})
	$('.meteorShower').each(function () {
		$(this).css('left', parseInt(1.5 * width * Math.random(), 10) - .5 * width + 'px');
	})
	var animation = function () {
		for (var i = 0; i < $('.meteorShower-star').length; i++) {
			$('.meteorShower-star').eq(i).css({
				'animation-delay': getRandom(map_speed) + 'ms',
				'animation-duration': getRandom(map_speed) + 'ms'
			});
		}
	}
	setInterval(animation(), 10000);
}());
