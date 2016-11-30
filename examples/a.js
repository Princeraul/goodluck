/*
 * Author: Princeraul
 * Email: suliangprinceraul@gmail.com or 398528895@qq.com
 */

'use strict';

const Suites = {
    Spade: 1,
    Heart: 2,
    Diamond: 3,
    Club: 4
};

var fn = (function(my){
    my.x = 10;
    my.y = 11;
    my.testfunc = function(data) {
        console.log('this is suites' + data);
        console.log(my.x * my.y);
    };
    return my;
}(fn || {}));

fn.testfunc(Suites);
