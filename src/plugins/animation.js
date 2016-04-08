;
(function (zp, document) {

    "use strict";

    var requestAnimFrame = window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    var Animation = function (options) {
        if (!(this instanceof Animation)) {
            return new Animation(options);
        }
        this.options = zp.merger(Animation.defaultOptions, options);
        this._abort = false;
        this._stop = false;
        requestAnimFrame(function (timestamp) {
            var onStart, onChange, onComplete,
                startTime, finishTime, onAbort,
                easing, duration, startValue, endValue,
                byValue, start, finish, time, self, abort;
            start = timestamp || +new Date();
            duration = this.option('duration');
            startValue = this.option('startValue');
            endValue = this.option('endValue');
            byValue = this.option('byValue') || endValue - startValue;
            onStart = this.option('onStart');
            onChange = this.option('onChange');
            onComplete = this.option('onComplete');
            onAbort = this.option('onAbort');
            finishTime = start + duration;
            easing = this.option('easing');
            onStart.apply(this);
            self = this;
            abort = function () {
                return this._abort
            }.bind(this);
            (function step(stepTime) {
                var currentTime;
                time = stepTime || +new Date();
                if (abort()) {
                    onAbort.apply(self);
                    return;
                }
                //if(!this._stop){
                currentTime = time > finishTime ? duration : (time - start);
                onChange.apply(self, [easing(currentTime, startValue, byValue, duration)]);
                //}
                if (time > finishTime) {
                    onComplete.apply(self);
                    return;
                }
                requestAnimFrame(step);
            })(start);
        }.bind(this));
    };

    Animation.prototype = {
        constructor: Animation,
        option: zp.accessor({
            get: function (key) {
                return this.options[key];
            },
            set: function (key, val) {
                this.options[key] = val;
            }
        }),
        _abort: false,
        _stop: false,
        abort: function () {
            this._abort = true;
        }
    };

    Animation.defaultOptions = {
        duration: 500,
        onStart: zp.emptyFunc,
        onComplete: zp.emptyFunc,
        onAbort: zp.emptyFunc,
        onChange: zp.emptyFunc,
        delay: 0,
        iterationCount: 1,
        startValue: 0,
        endValue: 100,
        byValue: false,
        easing: function (a, b, c, d) {
            return -c * Math.cos(a / d * (Math.PI / 2)) + c + b;
        }
    };

    zp.extend('animation', Animation);
    zp.extend('requestAnimFrame', requestAnimFrame);
    zp.animation.easingList = {
        easeInQuad: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOutQuad: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOutQuad: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            else {
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        easeInCubic: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOutCubic: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOutCubic: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t + b;
            }
            else {
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        easeInQuart: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOutQuart: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOutQuart: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t + b;
            }
            else {
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        easeInQuint: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOutQuint: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOutQuint: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t * t + b;
            }
            else {
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        easeInSine: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOutSine: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOutSine: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        easeInExpo: function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOutExpo: function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOutExpo: function (t, b, c, d) {
            if (t == 0) {
                return b;
            }
            if (t == d) {
                return b + c;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            }
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOutCirc: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOutCirc: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            else {
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        easeInElastic: function (t, b, c, d) {
            var s = 1.70158, p = 0, a = c;
            if (t == 0) {
                return b;
            }
            if ((t /= d) == 1) {
                return b + c;
            }
            if (!p) {
                p = d * .3;
            }
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else {
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOutElastic: function (t, b, c, d) {
            var s = 1.70158, p = 0, a = c;
            if (t == 0) {
                return b;
            }
            if ((t /= d) == 1) {
                return b + c;
            }
            if (!p) {
                p = d * .3;
            }
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else {
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOutElastic: function (t, b, c, d) {
            var s = 1.70158, p = 0, a = c;
            if (t == 0) {
                return b;
            }
            if ((t /= d / 2) == 2) {
                return b + c;
            }
            if (!p) {
                p = d * (.3 * 1.5);
            }
            if (a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            }
            else {
                var s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) {
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            }
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        },
        easeInBack: function (t, b, c, d, s) {
            s = s || 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOutBack: function (t, b, c, d, s) {
            s = s || 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOutBack: function (t, b, c, d, s) {
            s = s || 1.70158;
            if ((t /= d / 2) < 1) {
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            }
            else {
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        }
    };
    zp.animation.easingList.easeOutBounce = function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        }
        else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        }
        else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    };
    zp.animation.easingList.easeInBounce = function (t, b, c, d) {
        return c - zp.animation.easingList.easeOutBounce(d - t, 0, c, d) + b;
    };
    zp.animation.easingList.easeInOutBounce = function (t, b, c, d) {
        if (t < d / 2) {
            return zp.animation.easingList.easeInBounce(t * 2, 0, c, d) * .5 + b;
        }
        else {
            return zp.animation.easingList.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    };

    if (zp.dom) {
        zp.dom.prototype.animation = function (params, duration) {
            this.each(function (elem) {
                var key;
                for (key in params) {
                    if (params.hasOwnProperty(key)) {
                        elem['animate'] = (function () {
                            var cssIndex = key;
                            new zp.animation({
                                startValue: parseInt(zp.dom(elem).css(cssIndex).replace("px", ""), 10),
                                endValue: params[key],
                                duration: duration || 1000,
                                onChange: function (value) {
                                    zp.dom(elem).css(cssIndex, value);
                                }
                            });
                        })();
                    }
                }
            });
        };
        zp.dom.prototype.animationAbort = function () {
            this.each(function (elem) {
                if (elem['animate']) {
                    elem['animate'].abort();
                }
            });
        }
    }


}(zp, document));