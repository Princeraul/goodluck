function raffleWay(){
    raffleWay.prototype.disabled = function(obj) {
        $(obj).prop('disabled', true);
    };

    raffleWay.prototype.nodisabled = function(obj) {
        $(obj).prop('disabled', false);
    };


    raffleWay.prototype.checked = function(obj) {
        $(obj).prop('checked', 'checked');
    };

    raffleWay.prototype.nochecked = function(obj) {
        $(obj).prop('checked', null);
    };

    raffleWay.prototype.nochecked = function(obj) {
        $(obj).prop('checked', null);
    };

    // 网页方式
    // disabled 公众号和授权登陆
    raffleWay.prototype.isWebWay = function(obj) {
        if($(obj).prop('checked')) {
            // 清除绑定事件
            $('#tel-A, #tel-B, #gzh-A, #gzh-B, #cj-A, #cj-B').unbind();
            // 设置默认选择
            raffleWay.nodisabled('input[type=radio]');
            raffleWay.nochecked('#gzh-A, #gzh-B');
            raffleWay.disabled('#gzh-A, #gzh-B, #tel-B');
            raffleWay.checked('#tel-A, #cj-B');

            // 选中抽奖前直接抽奖 设置领奖后 必须点手机 选择抽奖钱填写手机 反之
            $('#tel-A').on('change', function() {
                raffleWay.disabled('#tel-B');
                raffleWay.nodisabled('#cj-B');
                raffleWay.checked('#cj-B');
            });

            $('#cj-A').on('change', function() {
                raffleWay.disabled('#cj-B');
                raffleWay.nodisabled('#tel-B');
                raffleWay.checked('#tel-B');
            });
        }
    };
    // 微信方式
    // 所有都选择，手机，公众号选择一个禁止另一个
    raffleWay.prototype.isWeinxin = function(obj) {
        if($(obj).prop('checked')) {
            // 清除默认事件和disabled
            $('#tel-A, #tel-B, #gzh-A, #gzh-B, #cj-A, #cj-B').unbind();
            raffleWay.nodisabled('input[type=radio]');
            // 默认disabled元素
            // raffleWay.disabled('#tel-B');
            raffleWay.checked('#tel-B, #cj-B');
        }
        // 选中抽奖前直接抽奖 设置领奖后 必须点手机 选择抽奖钱填写手机 反之
        $('#tel-A').on('change', function() {
            raffleWay.nodisabled('input[type=radio]');
            raffleWay.disabled('#tel-B');
            if($('#tel-B').prop('checked')) {
                raffleWay.checked('#gzh-B');
            }
        });
        $('#gzh-A').on('change', function() {
            raffleWay.nodisabled('input[type=radio]');
            raffleWay.disabled('#gzh-B');
            if($('#gzh-B').prop('checked')) {
                raffleWay.checked('#tel-B');
            }
        });
        $('#tel-B').on('change', function() {
            raffleWay.nodisabled('input[type=radio]');
            raffleWay.disabled('#tel-A');
            if($('#tel-A').prop('checked')) {
                raffleWay.checked('#gzh-A');
            }
        });
        $('#gzh-B').on('change', function() {
            raffleWay.nodisabled('input[type=radio]');
            raffleWay.disabled('#gzh-A');
            if($('#gzh-A').prop('checked')) {
                raffleWay.checked('#tel-A');
            }
        });

        $('#cj-A, #cj-B').on('change', function() {
            raffleWay.nodisabled('input[type=radio]');
        });
    };
}

// 实例化
var raffleWay = new raffleWay();
raffleWay.isWeinxin();
