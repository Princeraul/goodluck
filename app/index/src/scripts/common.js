'use strict';

(function($){
    $.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function(){
                $.noop();
            },
            outEvent: function(){
                $.noop();
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer;
        return $(this).each(function(){
            $(this).hover(function(){
                clearTimeout(outTimer);
                hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
            },function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(sets.outEvent, sets.outDuring);
            });
        });
    };

    $(".header-navbar li.item").each(function(){
        var $this = $(this);
        $this.hoverDelay({
            hoverEvent: function(){
                $this.find('.navbar-float').slideDown();
            },
            outEvent: function(){
                $('.navbar-float').slideUp();
            }
        });
    });

    $('#slides').slidesjs({
        width: 1920,
        height: 550,
        navigation: false,
        play: {
            auto: true,
            interval: 5000,
            swap: true
        }
    });

    $('#slider2').slidesjs({
        width: 1200,
        height: 420,
        navigation: true,
        pagination: false,
        play: {
            auto: true,
            interval: 5000,
            swap: true
        }
    });

    // ie7为兼容ie7
    setTimeout(function() {
        $('#slider2').css({ 'overflow': 'visible' });
    }, 0);
})(jQuery);
