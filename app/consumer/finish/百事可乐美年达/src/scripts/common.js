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
