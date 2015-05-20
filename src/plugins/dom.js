;
(function (zp, document) {

    "use strict";

    var
        ready = false,

        onReadyList = [],

        regexpSelector = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

        ignoreCssPostfix = {
            zIndex: true,
            fontWeight: true,
            opacity: true,
            zoom: true,
            lineHeight: true
        },
        /**
         *
         * @param {string} str
         * @returns {string}
         */
        camelCase = function DomCamelCase(str) {
            return String(str).replace(/-\D/g, function (match) {
                return match[1].toUpperCase();
            });
        },
        /**
         *
         * @param {string} str
         * @returns {string}
         */
        hyphenate = function DomHyphenate(str) {
            return String(str).replace(/[A-Z]/g, function (match) {
                return '-' + match[0].toLowerCase();
            });
        },

        /**
         *
         */
        readyFunc = function DomReadyFunc() {
            var i = 0,
                l = onReadyList.length;
            if (ready === false) {
                while (i < l) {
                    if (zp.isFunction(onReadyList[i])) {
                        onReadyList[i]();
                    }
                    i += 1;
                }
                onReadyList = [];
            }
            ready = true;
        },
        /**
         *
         * @param {Object} node
         * @param {Number} step
         * @returns {Dom}
         */
        findParentByStep = function DomFindParentByStep(node, step) {
            if (zp.isUndefined(step) || step < 0) {
                step = 1;
            }
            if (!node || step <= 0 || !node.parentNode) {
                return new Dom(node);
            }
            return findParentByStep(node.parentNode, step - 1);
        },
        /**
         *
         * @param {Dom} Dom
         * @param {string} names
         * @param {string} action
         */
        actionsClasses = function DomActionsClasses(dom, names, action) {
            var i = 0,
                classNames = !zp.isArray(names) ? [names] : names,
                l = classNames.length;
            dom.each(function (node) {
                while (i < l) {
                    if (node.classList) {
                        switch (action) {
                            case 'add':
                                node.classList.add(classNames[i]);
                                break;
                            case 'remove':
                                node.classList.remove(classNames[i]);
                                break;
                            case 'toggle':
                                node.classList.toggle(classNames[i]);
                                break;
                        }
                    }
                    i += 1;
                }
            });
        };


    document.addEventListener('DomContentLoaded', readyFunc, false);
    zp.globalScope.addEventListener('load', readyFunc, false);


    /**
     *
     * @constructor
     * @this Dom
     * @param {String|Object} selector
     * @param {Object} [context]
     * @returns {Dom}
     */
    var Dom = function DomConstructor(selector, context) {
        var i = 0,
            l;
        if (this instanceof Dom) {
            this.nodes =
                zp.isUndefined(selector) ? [document] :
                    zp.isString(selector) ? Dom.query(selector, context || document) :
                        selector instanceof Dom ? zp.toArray(selector.nodes) :
                            Dom.isElement(selector) ? [selector] :
                                zp.isArray(selector) ? selector :
                                    selector === window ? [document] :
                                        [];
            l = this.nodes.length;
            //Hak
            while (i < l) {
                this[i] = this.nodes[i];
                i += 1;
            }
            this.length = l;
            return this;
        }
        else {
            return new Dom(selector, context);
        }


    };


    Dom.prototype = {

        /**
         * @type {Function}
         */
        constructor: Dom,

        /**
         * @type {Function}
         */
        splice: [].slice,

        /**
         * @type {Array}
         */
        nodes: [],

        /**
         *
         * @param {Number} index
         * @returns {Object|null}
         */
        get: function (index) {
            return this.nodes[Number(index) || 0];
        },

        /**
         *
         * @returns {Object|undefined}
         */
        get first() {
            return this.nodes[0];
        },
        /**
         *
         * @returns {Object}
         */
        get size() {
            var first = this.first,
                node,
                rect;
            node = (first === document) ? document.body : first;
            if (!node || !node.getBoundingClientRect) {
                return {width: 0, height: 0};
            }
            rect = node.getBoundingClientRect();
            return {width: rect.width, height: rect.height};
        },
        /**
         *
         * @returns {Object}
         */
        get offset() {
            if (!Dom.isElement(this.first)) {
                return {x: 0, y: 0};
            }
            var node = this.first;
            if (node.offsetX != null) {
                return {x: node.offsetX, y: node.offsetY};
            }
            try {
                var box = node.getBoundingClientRect(),
                    body = document.body,
                    docElem = document.documentElement,
                    scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                    scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
                    clientLeft = docElem.clientLeft || body.clientLeft || 0,
                    clientTop = docElem.clientTop || body.clientTop || 0;

                return {
                    x: Math.round(box.left + scrollLeft - clientLeft),
                    y: Math.round(box.top + scrollTop - clientTop)
                };
            }
            catch (e) {
                return {x: 0, y: 0};
            }
        },

        /**
         *
         * @param {number} step
         * @returns {Dom}
         */
        parent: function (step) {
            return findParentByStep(this.first, step);
        },

        /**
         *
         * @param {Function} callback
         */
        each: function (callback) {
            var i = 0,
                l = this.nodes.length;
            while (i < l) {
                callback.call(this, this.nodes[i], i);
                i += 1;
            }
            return this;
        },
        /**
         *
         * @param {string} event
         * @param {Function} callback
         * @param {Boolean} [useCapture=false]
         * @returns {Dom}
         */
        on: function (event, callback, useCapture) {
            var arrayEvents;
            this.each(function (node) {
                if (node.addEventListener) {
                    arrayEvents = event.split(" ");
                    arrayEvents.forEach(function (currentEvent) {
                        node.addEventListener(currentEvent, callback, useCapture);
                    });
                }
            });
            return this;
        },
        /**
         *
         * @param {string} event
         * @param {Function} callback
         * @param {Boolean} [useCapture=false]
         * @returns {Dom}
         */
        off: function (event, callback, useCapture) {
            var arrayEvents;
            this.each(function (node) {
                if (node.removeEventListener) {
                    arrayEvents = event.split(" ");
                    arrayEvents.forEach(function (currentEvent) {
                        node.removeEventListener(currentEvent, callback, useCapture);
                    });
                }
            });
            return this;
        },
        /**
         *
         * @param {string} attrName
         * @returns {Dom}
         */
        reomveAttr: function (attrName) {
            this.each(function (node) {
                if (node.removeAttribute) {
                    node.removeAttribute(attrName);
                }
            });
            return this;
        },

        /**
         *
         * @param [deep=true]
         * @returns {Dom}
         */
        clone: function (deep) {
            var clones = [],
                deep = zp.isUndefined(deep) ? true : false;
            this.each(function (node) {
                if (zp.Dom.isElement(node)) {
                    clones.push(node.cloneNode(deep));
                }
            });
            return new Dom(clones);
        },
        /**
         *
         * @returns {Dom}
         */
        remove: function () {
            this.each(function (node) {
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            });
            return this;
        },
        /**
         *
         * @returns {Dom}
         */
        empty: function () {
            this.each(function (node) {
                if (node.removeChild) {
                    while (node.hasChildNodes()) {
                        node.removeChild(node.firstChild);
                    }
                }
            });
            return this;
        },
        /**
         *
         * @param selector
         * @returns {Dom}
         */
        find: function (selector) {
            var result = [], found;
            this.each(function (node) {
                found = Dom.query(selector, node);
                found.forEach(function (el) {
                    result.push(el);
                });
            });
            return new Dom(result);
        },
        /**
         *
         * @param node
         * @returns {Dom}
         */
        append: function (node) {
            var el = (node instanceof Dom) ? node : new Dom(node),
                first = this.first,
                fr = document.createDocumentFragment();
            if (first.appendChild) {
                el.each(function (node) {
                    fr.appendChild(node);
                });
                first.appendChild(fr);
            }
            return this;
        },
        /**
         *
         * @param string [key]
         * @param {number|string} [value]
         * @returns {Dom}
         */
        css: zp.accessor({
            get: function DomGetCss(property) {
                if (Dom.isElement(this.first)) {
                    return window.getComputedStyle(this.first, "").getPropertyValue(hyphenate(property));
                }
                return;
            },
            set: function DomSetCss(property, value) {
                if (zp.isNumber(value) && !ignoreCssPostfix[property]) {
                    value += 'px';
                }
                this.each(function (node) {
                    if (node.style) {
                        node.style[camelCase(property)] = value;
                    }
                });
                return this;
            }
        }),


        /**
         *
         * @param {string} key
         * @param {string} [val]
         * @returns {string|Dom}
         */
        attr: zp.accessor({
            get: function DomGetAttr(property) {
                if (this.first.getAttribute) {
                    return this.first.getAttribute(property);
                }
            },
            set: function DomSetAttr(property, value) {
                this.each(function (node) {
                    if (node.setAttribute) {
                        node.setAttribute(property, value);
                    }
                });
                return this;
            }
        }),

        /**
         *
         * @param {string} val
         * @returns {Dom|string}
         */
        html: function (val) {
            if (arguments.length > 0) {
                this.first.innerHTML = val;
                return this;
            }
            else {
                return this.first.innerHTML;
            }
        },

        /**
         *
         * @param {string} text
         * @returns {Dom|string}
         */
        text: function (text) {
            var property = document.body.innerText == null ? 'textContent' : 'innerText';
            if (arguments.length > 0) {
                this.first[property] = text;
                return this;
            }
            else {
                return this.first[property];
            }
        },

        /**
         *
         * @param [String|Array] className
         * @returns {Dom}
         */
        addClass: function (className) {
            actionsClasses(this, className, 'add');
            return this;
        },
        /**
         *
         * @param [String|Array] className
         * @returns {Dom}
         */
        removeClass: function (className) {
            actionsClasses(this, className, 'remove');
            return this;
        },

        /**
         *
         * @param {string} className
         * @returns {boolean}
         */
        hasClass: function (className) {
            var result = false;
            this.each(function (node) {
                if (node.classList) {
                    result = node.classList.contains(className);
                    if (result === true) {
                        return;
                    }
                }
            });
            return result;
        },

        /**
         *
         * @param [String|Array] className
         * @returns {Dom}
         */
        toggleClass: function (className) {
            actionsClasses(this, className, 'toggle');
            return this;
        },


        /**
         *
         * @returns {Array.<*>}
         */
        toArray: function () {
            return zp.toArray(this.nodes);
        }
    };

    // Static Methods

    /**
     *
     * @param {object} node
     * @returns {boolean}
     */
    Dom.isElement = function DomIsElement(node) {
        return (node && node.nodeName) ? true : false;
    };

    /**
     *
     * @param {Function} callback
     * @throws {TypeError} callback is function
     */
    Dom.onReady = function DomOnReady(callback) {
        if (!zp.isFunction(callback)) {
            throw new TypeError("callback is not a function");
        }
        if (ready) {
            setTimeout(callback, 1);
        }
        else {
            onReadyList.push(callback);
        }
    };

    /**
     *
     * @param {string} selector
     * @param {Object} [context]
     * @returns {Object[]}
     */
    Dom.query = function (selector, context) {
        var match = regexpSelector.exec(selector),
            result = [],
            push = [].push;
        context = context || document;
        if (match) {
            if (match[1]) {
                result = [context.getElementById ? context.getElementById(match[1]) : document.getElementById(match[1])];
            }
            else if (match[2]) {
                push.apply(result, context.getElementsByTagName(selector));
            }
            else if (match[3]) {
                push.apply(result, context.getElementsByClassName(match[3]));
            }
        }
        else {
            push.apply(result, context.querySelectorAll(selector));
        }
        return result;

    };

    /**
     *
     * @param {string} tagName
     * @param {Object} [attr]
     * @returns {Dom}
     */
    Dom.create = function (tagName, attr) {
        var node = new Dom(document.createElement(tagName));
        if (attr) {
            node.attr(attr);
        }
        return node;
    };
    /**
     *
     * @param {string} selector
     * @param {Object} [context]
     * @returns {boolean}
     */
    Dom.is = function (selector, context) {
        var node = new Dom(selector, context);
        return node.length > 0;
    };

    /**
     *
     * @returns {Number}
     */
    Dom.height = function () {
        return zp.globalScope.innerHeight;
    };
    /**
     *
     * @returns {Number}
     */
    Dom.width = function () {
        return zp.globalScope.innerWidth;
    };

    zp.extend('dom', Dom);

}(zp, document));