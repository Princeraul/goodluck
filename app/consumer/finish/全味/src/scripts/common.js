'use strict';

var activate = ('createTouch' in document) ? 'touchstart' : 'click';

var baseQuery = {
	dialog: function () {
		$('.dialog-fade').on(activate, function () {
			$('.dialog, .dialog-content').toggleClass('dialog-active');
		});
	},
	// 未关注浮层
	gzhDialog: function () {
		$('.dialog-fade-gzh').on(activate, function () {
			$('.not-gzh').toggleClass('dialog-active');

			setTimeout(function () {
				$('.not-gzh').toggleClass('dialog-active');
			}, 2000);
		});
	},
	// 新版二维码 tine: 2016-07-13
	NewgzhDialog: function() {
		$('.dialog-fade-gzh').on(activate, function () {
			$('.dialog, .two-code').toggleClass('dialog-active');

			setTimeout(function () {
				$('.dialog, .two-code').toggleClass('dialog-active');
			}, 8000);
		});
	},
	winDialog: function () {
		$('.dialog-fade-win').on(activate, function () {
			$('.dialog, .yes-win').toggleClass('dialog-active');
		});
	},
	hideDialog: function () {
		$('.hide-dialog').on(activate, function () {
			$('.dialog, .yes-win').removeClass('dialog-active');
		});
	},
	init: function () {
		this.dialog();
		this.winDialog();
		this.hideDialog();
		this.NewgzhDialog();
	}
};
baseQuery.init();



var giftConvert = {
	markwords: '恭喜你兑换成功！',
	error: '对不起你的积分不足,或者未填写完整的信息，不能兑换！',
	isEmpty: function(my) {
		var flag = false;
		if(!my.index){
			$(my.obj).eq(my.index).find('input').each(function(){
				if($(this).val() !== '' && parseFloat($(this).val()) < my.numberDefault){
					flag = true;
					return;
				}else{
					flag = false;
					return;
				}
			});
		}else{
			var num;
			var hasClass = $(my.obj).eq(my.index).find('li').hasClass('active');
			$(my.obj).eq(my.index).find('li.active span').each(function(){
				num = +$(this).text();
			});
			// 判断是否选择礼品
			$(my.obj).eq(my.index).find('input').each(function(){
				if($(this).val() !== '' && hasClass !== false && num === 10){
					flag = true;
					return;
				}else{
					flag = false;
					return;
				}
			});
		}
		// 判断积分兑换结果
		if(flag){
			alert(this.markwords);
		}else{
			alert(this.error);
		}
	},
	tabChange: function(my){
		$(my.obj).on(activate, function(){
			var index = $(this).index();
			$(my.obj).removeClass('active').eq(index).addClass('active');
			$('.intergral').hide().eq(index).show();
		});
	},
	selectMore: function(my){
		$(my.obj).on('click', function(){
			$(this).toggleClass('active').siblings().removeClass('active');
		});
	},
	commit: function(index){
		switch(index){
			case 0:
				giftConvert.isEmpty({obj: '.intergral', index: index, numberDefault: 3.14});
				break;
			case 1:
				giftConvert.isEmpty({obj: '.intergral', index: index});
				break;
		}
	}
};

var rotate = function() {
	var $btn = $('.rotate-playbtn');
	var playnum = 100; //初始次数，由后台传入
	var isture = 0;
	var clickfunc = function() {
		var win = '恭喜你,获得';
		var nowin = '很遗憾,';
		var num = Math.round(Math.random());
		var data = ['美食大礼包', '红包1元', '积分5个', '谢谢参与'];
		//data为随机出来的结果，根据概率后的结果
		data = data[Math.floor(Math.random() * 4)];
		// num为随机输，随机执行deg
		switch(data) {
			case '美食大礼包':
				rotateFunc(num ? 22.5 : 202.5 , win + data);
				break;
			case '红包1元':
				rotateFunc(num ? 67.5 : 247.5, win +data);
				break;
			case '积分5个':
				rotateFunc(num ? 112.5 : 292.5, win + data);
				break;
			case '谢谢参与':
				rotateFunc(num ? 157.5 : 337.5, nowin + data);
				$('.rotate-dialog .btn').hide();
				break;
		}
	}
	$btn.click(function() {
		// 如果在执行就退出
		if(isture) return;
		// 标志为 在执行
		isture = true;

		//当抽奖次数为0的时候执行
		if(playnum <= 0) {
			isture = false;
		} else {
			//还有次数就执行
			playnum = playnum - 1;
			//执行转盘了则次数减1
			if(playnum <= 0) {
				playnum = 0;
			}
			clickfunc();
		}
	});

	var rotateFunc = function(angle, text) {
		isture = true;
		$btn.stopRotate();
		$btn.rotate({
			angle: 0,
			duration: 4000, //旋转时间
			animateTo: angle + 1440, //让它根据得出来的结果加上1440度旋转
			callback: function() {
				isture = false; // 标志为 执行完毕
				$('.rotate-dialog').fadeIn('fast').find('p').html(text);
			}
		});
	};
};

$(function() {
	var $pointsTips = $('.points-header');
	var $pointsTipsClose = $('.points-header span');

	// 积分浮层
	setTimeout(function(){
		$pointsTips.fadeIn(1200);
	}, 100);

	$pointsTipsClose.on(activate, function(){
		setTimeout(function(){
			$pointsTips.fadeOut(1200);
		}, 1000);
	});

	// 积分实物切换
	giftConvert.tabChange({obj: '.points-navbar a'});
	// 选择积分
	giftConvert.selectMore({obj: '.intergral-item li'});

	// 转盘
	rotate();
});
