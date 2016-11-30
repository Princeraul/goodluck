'use strict';

function SearchVague(eleID) {
    // 模糊匹配list容器
    this.appendUL = $(eleID).find('.appendUL');
    // 文本域模糊搜索框
    this.input = $(eleID).find('.searchVagueInput');
}

SearchVague.prototype.getContent = function() {
    var html;
	var self = this;
    this.input.on('keyup', function() {
        var inputValue = $.trim($(self.input).val());
        if(inputValue === '') {
            self.appendUL.hide().html('');
            return false;
        }

		$.get('get.html', 'name='+$(this).text(), function(msg) {
			html = '';
			var data = msg.replace(/\"/g, "").split(',');
	        for (var i = 0; i < data.length; i++) {
	    		if (data[i].indexOf(inputValue) >= 0) {
	                html += "<li class='item'>" + data[i] + "</li>";
	    		}
	    	}

	        // 匹配到显示对应数据
	        if (html !== "") {
	    		self.appendUL.show().html(html);
	    	} else {
	    		html = "<li class='item'>对不起没有数据</li>";
	    		self.appendUL.show().html("对不起，没有匹配到数据");
	    	}
		});
    });

	// 调用 mouseenter click事件
	this.getFocus();
	this.getCon();
	this.keyDown();
};

// 事件委托给appendul 绑定item mouseenter 事件
SearchVague.prototype.getFocus = function() {
	this.appendUL.on('mouseenter', '.item', function() {
		$(".item").removeClass("itemhover");
		$(this).addClass("itemhover");
	});
};

// 事件委托给appendul 绑定item  click事件
SearchVague.prototype.getCon = function() {
	var self = this;
	this.appendUL.on('click', '.item', function() {
		var value = $(this).text();
		self.input.val(value);
		self.appendUL.hide().html("");
	});
};

// 键盘‘上’
SearchVague.prototype.movePrev = function() {
	this.input.blur();
	var index = $('.itemhover').prevAll().length;
	if (index === 0) {
        $(".item").removeClass('itemhover').eq($(".item").length - 1).addClass('itemhover');
    } else {
        $(".item").removeClass('itemhover').eq(index - 1).addClass('itemhover');
    }
};

SearchVague.prototype.moveNext = function () {
    var index = this.appendUL.find('.itemhover').prevAll().length;

    if (index === $(".item").length - 1) {
        $(".item").removeClass('itemhover').eq(0).addClass('itemhover');
    } else {
        $(".item").removeClass('itemhover').eq(index + 1).addClass('itemhover');
    }
};

SearchVague.prototype.dojob = function () {
	if(this.appendUL.is(':hidden')) {
		return false;
	}
    this.input.blur();
    var value = this.appendUL.find('.itemhover').text();

    this.appendUL.parent().find('.searchVagueInput').val(value);
    this.appendUL.hide().html("");
};

// 监听键盘执行对应事件
SearchVague.prototype.keyDown = function() {
	var self = this;
	var $append = this.appendUL;
	$(document).on('keydown', function(e) {
		e = e || window.event;
		var keyCode = e.which ? e.which : e.keycode;
		switch (keyCode) {
			case 38:
				if($.trim($append.html()) === '') {
					return;
				}
				self.movePrev();
				break;

			case 40:
				if($.trim($append.html()) === '') {
					return;
				}
				self.input.blur();
				if($append.find('.item').hasClass('itemhover')) {
					self.moveNext();
				} else {
					$append.find('.item').removeClass('itemhover').eq(0).addClass('itemhover');
				}
				break;

			case 13:
				self.dojob();
		}
	});
};

new SearchVague('#search1').getContent();
new SearchVague('#search2').getContent();
