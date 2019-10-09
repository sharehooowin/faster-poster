//rem单位用的js
var remFun = function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;

            // var ratio = docEl.clientHeight / docEl.clientWidth;
            // var ratio = window.devicePixelRatio;

            //这里是假设在640px宽度设计稿的情况下，1rem = 20px；
            //可以根据实际需要修改
            //宽是750像素时 1rem=24px;
            docEl.style.fontSize = Math.round(64 * (clientWidth / 640)) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
remFun(document, window);