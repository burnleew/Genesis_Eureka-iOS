var slider = {};
(function(d){
    // IE compatibility stuff :-(
    var addListener = (function(w) {
        return w.addEventListener
            ? function(el, type, fn) { el.addEventListener(type, fn, false) }
            : w.attachEvent
            ? function(el, type, fn) { el.attachEvent('on'+type, fn) }
            : function(el, type, fn) { el['on'+type] = fn };
    })(window);
    var delListener = (function(w) {
        return w.removeEventListener
            ? function(el, type, fn) { el.removeEventListener(type, fn, false) }
            : w.detachEvent
            ? function(el, type, fn) { el.detachEvent('on'+type, fn) }
            : function(el, type, fn) { delete el['on'+type] };
    })(window);
    var preventDefault = function(ev) { 
        if (ev.preventDefault) ev.preventDefault();
        else                   ev.returnValue = false;
    };
    // https://developer.mozilla.org/ja/JavaScript/Reference/Global_Objects/Array/map
    if (!Array.prototype.map) Array.prototype.map = function(fun /*, thisp*/) {
        var len = this.length;
        if (typeof fun != "function") throw new TypeError();
        var res = new Array(len);
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
          if (i in this) res[i] = fun.call(thisp, this[i], i, this);
        }
        return res;
    };
    var addSliderEvents = function(me, cb){
        var move, mdown, mmove, mup, tstart, tmove, tend;
        move = function(clientX, rect){
            var width = clientX - rect.left,
                max = rect.right - rect.left; // width nonexistent on IE
            width = width < 0 ? 0 : max < width ? max : width;
            me.firstChild.style.width = width + 'px';
            cb(me, me.firstChild.style.width = width, max);
        };
        mdown = function(ev){
            addListener(d, 'mousemove', mmove);
            addListener(d, 'mouseup', mup);
            mmove(ev);
        };
        mmove = function(ev){
           move(ev.clientX, me.getBoundingClientRect());
           preventDefault(ev);
        };
        mup = function(ev){
            delListener(d, 'mousemove', mmove);
            delListener(d, 'mousedown', mup);
        };
        addListener(me, 'mousedown', mdown);
        
        tstart = function(ev){
            addListener(d, 'touchmove', tmove);
            addListener(d, 'touchend', tend);
            tmove(ev);
        }
        tmove = function(ev){
            move(ev.touches[0].clientX, me.getBoundingClientRect());
            preventDefault(ev);
        };        
        tend = function(ev){
            delListener(d, 'touchmove', tmove);
            delListener(d, 'touchend', tend);
        };
        addListener(me, 'touchstart', tstart);
    };

    slider.init = function(sliderDom, hundler, initalizeNum) {
        addSliderEvents(sliderDom, hundler, initalizeNum);
    };
})(document);