'use strict';

var ajaxData;
var speed = 2000;
var activate = "createTouch" in document ? "touchstart" : "click";
var storage = window.localStorage;

// 执行方法元素变量集合
var $inpTelphone = $('.inp-telphone');
var $btnDraw = $('.btn-draw');
var $hideDialog = $('.dialog-fade');
var $pointsTips = $('.points-header');
var $pointsTipsClose = $('.points-header span');

// 实物领奖按钮
var $btnPrizeAddress = $('.btn-prize[data-name="btn-address"]');
// 实物返回按钮
var $btnPrizeAddressBack = $('.btn-back');

// 温馨提示弹出框确认按钮
var $btnPrompt = $('.btn-prompt[data-name="prize-prompt"]');
var $btnPromptReload = $('.btn-prompt[data-name="points-prompt"]');

// 虚拟领奖按钮
var $btnPrizeVirtual = $('.btn-prize[data-name="btn-virtual"]');
var $entityError = $('.entity-error');
// prize实物提交
var $btnPrizeAffirm = $('.btn-affirm[data-name="btn-prize-affirm"]');

// points 提交
var $btnPointsAffirm = $('input[data-name="btn-points-affirm"]');
// points 实物提交按钮
var $btnPointsEntityAffirm = $('.btn-affirm[data-name="btn-points-entity-affirm"]');

// 判断是否存储storage
if (storage.telephone !== 'undefined') {
    $('.inp-telphone').val(storage.telephone);
}

// C端public构造函数
function ConsumerBaseQuery() {
    this.$loading = $('.loading');
    this.$dialog = $('.dialog');
}

ConsumerBaseQuery.prototype = {
    // show loadig animation
    showLoading: function() {
        this.$loading.css('display', 'block');
    },
    // hide loadig animation
    hideLoading: function() {
        this.$loading.css('display', 'none');
    },
    // show dialog
    showDialog: function(text) {
        this.$dialog.addClass('dialog-active');
        this.$dialog.find('.dialog-content').addClass('dialog-active').find('span').html(text);
    },
    // hide dialog
    hideDialog: function() {
        this.$dialog.removeClass('dialog-active');
        this.$dialog.children().removeClass('dialog-active');
    },
    entityError: function(text) {
        $entityError.html(text).css('display', 'block');
    },
    // show prompt
    showPrompt: function(text, icon){
        this.$dialog.addClass('dialog-active');
        this.$dialog.find('.prompt-box').addClass('dialog-active');
        this.$dialog.find('.prompt-box-cot span').removeClass().addClass(icon);
        this.$dialog.find('.prompt-box-cot p').html(text);
    },
    // points 积分选择toggleClass
    selectToggle: function(option){
        $(option.obj).on('click', function() {
            $(this).toggleClass('active').siblings().removeClass('active');
            if($(option.obj).hasClass('active')) {
                option.btnEle.removeClass('btn-gray').addClass('btn-affirm').attr('disabled', false);
            }else {
                option.btnEle.removeClass('btn-affirm').addClass('btn-gray').attr('disabled', true);
            }
        });
    }
};

// points 积分兑换 ajax请求模块
function interAjax(url, data){
    $.post(url, data, function(backData){
        if(backData.status) {
            ConsumerBaseQuery.showPrompt(backData.info.msg, 'icon-right');
        }else {
            ConsumerBaseQuery.showPrompt(backData.info.msg, 'icon-colse');
        }
        $btnPointsEntityAffirm.html('确认提交').attr('disabled', false);
        $btnPromptReload.on(activate, function() {
            window.location.href = reload_url;
        });
    });
}

// address check
function checkAdressForm() {

    $.each($('form :input'), function() {
        var $this = $(this).attr('data-name');
        if($this === 'isEmpty') {
            if($(this).val() === ''){
                var value = $(this).parent().find('span').text().replace(':', '');
                ConsumerBaseQuery.entityError(value + '填写不正确');
                return false;
            }
        }else if($this === 'isSelectEmpty') {
            if($(this).prop('selectedIndex') === 0) {
                ConsumerBaseQuery.entityError('请填写正确的地址信息');
                return false;
            }
        }else if($this === 'isTelphone') {
            if(!$(this).val().match(/^1[3|4|5|7|8]\d{9}$/)){
                ConsumerBaseQuery.entityError('手机号填写不正确');
                return false;
            }
        }else {
            $entityError.html('');
        }
    });
}

// 城市切换
function cityChange(my, type) {
    if ($(my).val() === 0) return false;
    $.post(city_url, 'city=1&id=' + $(my).val(), function(msg) {
        var html = '';
        for (var i in msg.info.data) {
            html += '<option value="' + msg.info.data[i].id + '">' + msg.info.data[i].name + '</option>';
        }
        $('#county').hide().find('select').html('<option value="0">请选择区县</option>');
        switch (type) {
            case 0:
                $('#city').html('<option value="0">请选择市区</option>');
                $('#city').append(html);
            break;
            case 1:
                if (html !== '') {
                    $('#county').show().find('select').append(html);
                }
            break;
        }
    });
}

// 实例化ConsumerBaseQuery方法
var ConsumerBaseQuery = new ConsumerBaseQuery();

$(function() {
    // .dialog-fade 绑定隐藏方法
    $hideDialog.on(activate, function() {
        ConsumerBaseQuery.hideDialog();
    });

    // 温馨提示点击关闭dialog
    $btnPrompt.on(activate, function() {
        ConsumerBaseQuery.hideDialog();
    });

    // 积分header浮层
    setTimeout(function() {
        $pointsTips.fadeIn(1200);
    }, 300);

    $pointsTipsClose.on(activate, function() {
        setTimeout(function() {
            $pointsTips.fadeOut(1200);
        }, 300);
    });

    $btnDraw.on(activate, function() {
        ajaxData = isWritePhone ? 'phone=' + $inpTelphone.val() : 'phone=';

        // 判断流程是否需要输入手机号码
        if ($($inpTelphone).length > 0) {
            if ((!$($inpTelphone).val().match(/^1[3|4|5|7|8]\d{9}$/))) {
                ConsumerBaseQuery.showDialog('请输入正确的手机号码');
                return false;
            }
        }

        // 执行抽奖动画
        ConsumerBaseQuery.showLoading();
        setTimeout(function() {
            $.post(drawUrl, ajaxData, function(msg){
                if (msg.info.code < 0) {
                    window.location.href = errorURL + '/error.html?error=' + msg.info.code;
                    return false;
                } else {
                    window.location.href = prizeUrl + '&city[shenid]=0&city[shiid]=0&city[quid]=0&address=&phone=';
                }
                storage.telephone = $inpTelphone.val();
                ConsumerBaseQuery.hideLoading();
            });
        }, speed);
    });

    $btnPrizeAddress.on(activate, function() {
        $('.md-address').addClass('md-address-visible');
    });
    $btnPrizeAddressBack.on(activate, function() {
        $('.md-address').removeClass('md-address-visible');
        $btnPointsAffirm.attr('disabled', false).val('立即兑换');
    });

    //领奖实物提交信息
    $btnPrizeAffirm.on(activate, function() {
        checkAdressForm();
        if ($entityError.html() === '') {
            $(this).html('正在提交中...').attr('disabled');
            window.location.href = 'index.php?s=/' + addressURL + '.html&' + $('form').serialize();
        }
    });

    // 积分points select toggleClass 暂时都用jq $选中
    ConsumerBaseQuery.selectToggle({
        obj: $('.intergral-item li'),
        btnEle: $btnPointsAffirm
    });

    // 积分points 兑换红包和实物
    $btnPointsAffirm.on('click', function() {
        var sendData;
        var $activeEle = $('.intergral-item li.active');
        var sendId = $activeEle.attr('data-id');
        var stytem = $activeEle.attr('data-stytem');
        var URL    = url_before + sendId + url_after;

        $(this).val('正在提交中...').attr('disabled', true);

        if(stytem === '1') {
            $('.md-address').addClass('md-address-visible');
            $btnPointsEntityAffirm.on(activate, function() {
                checkAdressForm();
                if ($entityError.html() === '') {
                    sendData = $('form').serialize();
                    $(this).html('正在提交中...').attr('disabled');
                    interAjax(URL, sendData);
                }
            });
        }else {
            sendData = '';
            interAjax(URL, sendData);
        }
    });

    // 红包和积分根据实际情况手动修改
    $btnPrizeVirtual.on(activate, function() {
        if(prizeStatus.action.focus) {

        }else {
            ConsumerBaseQuery.showPrompt('奖品领取成功,红包已发送,请关闭页面,返回服务通知领取!', 'icon-right');
        }
    });
});
