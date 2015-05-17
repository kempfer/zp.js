/**
 * @author zotov_mv
 * @see core/zp
 */

;(function (zp,document) {

    "use strict";

    var
        ready = false,

        onReadyList = [],

        regexpSelector = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

        ignoreCssPostfix =  {
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
        camelCase = function domCamelCase (str) {
            return String(str).replace(/-\D/g, function(match){
                return match[1].toUpperCase();
            });
        },
        /**
         *
         * @param {string} str
         * @returns {string}
         */
        hyphenate = function domHyphenate (str) {
            return String(str).replace(/[A-Z]/g, function(match){
                return '-' + match[0].toLowerCase();
            });
        },

        /**
         *
         */
        readyFunc = function domReadyFunc () {
            if(ready === true){
                return;
            }
            ready = true;
            for(var i = 0; i < onReadyList.length; i++){
                if(zp.isFunction(onReadyList[i])){
                    onReadyList[i]();
                }
            }
            onReadyList = [];
        },
        /**
         *
         * @param {Object} node
         * @param {Number} step
         * @returns {dom}
         */
        findParentByStep = function domFindParentByStep (node, step) {
            if (step == null || step < 0){
                step = 1;
            }
            if (!node || step <= 0 || !node.parentNode){
                return new dom(node);
            }
            return findParentByStep(node.parentNode, step-1);
        },
        /**
         *
         * @param {dom} dom
         * @param {string} names
         * @param {string} action
         */
        actionsClasses = function domActionsClasses(dom,names,action) {
            var i,
                classNames = (!zp.isArray(names)) ? [names] : names;
            dom.each(function (node) {
                for (i = 0;i < classNames.length; i++) {
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
                }
            });
        };


    document.addEventListener('DOMContentLoaded', readyFunc, false);
    window.addEventListener('load', readyFunc, false);


    /**
     *
     * @constructor
     * @this dom
     * @param {String|Object} selector
     * @param {Object} [context]
     * @returns {dom}
     */
    var dom = function domConstructor (selector,context) {
        if (! (this instanceof dom)) {
            return new dom(selector,context);
        }

        this.nodes =
            zp.isUndefined(selector)    ? [ document ] :
            zp.isString(selector)       ? dom.query(selector,context || document) :
            selector instanceof dom     ? zp.toArray(selector.nodes) :
            dom.isElement(selector)     ? [ selector ] :
            zp.isArray(selector)  		? selector :
            selector === window         ? [ document ] :
            [];
        //Hak
        var i = 0, l = this.nodes.length;
        for(; i < l; i++){
            this[i] = this.nodes[i];
        }
        return this;
    };


    dom.prototype = {

        /**
         * @type {Function}
         */
        constructor: dom,

        /**
         * @type {Number}
         */
        get length () {
            return this.nodes.length;
        },
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
        get first () {
            return this.nodes[0];
        },
        /**
         *
         * @returns {Object}
         */
        get size() {
            var node, rect,
                first = this.first;
            node = (first === document) ? document.body : first;
            console.log(!node)
            if(!node || !node.getBoundingClientRect){
                return {width : 0, height : 0};
            }
            rect = node.getBoundingClientRect();
            return {width : rect.width, height : rect.height};
        },
        /**
         *
         * @returns {Object}
         */
        get offset() {
            if (!dom.isElement(this.first)) {
                return { x: 0, y: 0};
            }
            var node = this.first;
            if (node.offsetX != null) {
                return { x: node.offsetX, y: node.offsetY };
            }
            try {
                var box = node.getBoundingClientRect(),
                    body    = document.body,
                    docElem = document.documentElement,
                    scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
                    scrollTop  = window.pageYOffset || docElem.scrollTop  || body.scrollTop,
                    clientLeft = docElem.clientLeft || body.clientLeft || 0,
                    clientTop  = docElem.clientTop  || body.clientTop  || 0;

                return {
                    x: Math.round(box.left + scrollLeft - clientLeft),
                    y: Math.round(box.top  + scrollTop  - clientTop )
                };
            }
            catch(e){
                return { x: 0, y: 0};
            }
        },

        /**
         *
         * @param {number} step
         * @returns {dom}
         */
        parent : function (step) {
            return findParentByStep(this.first,step);
        },

        /**
         *
         * @param {Function} callback
         */
        each : function (callback) {
            var i = 0,
                l = this.nodes.length;
            for(; i < l; i++){
                callback.call(this, this.nodes[i],i);
            }
            return this;
        },
        /**
         *
         * @param {string} event
         * @param {Function} callback
         * @param {Boolean} [useCapture=false]
         * @returns {dom}
         */
        on: function (event,callback,useCapture) {
            var arrayEvents;
            this.each(function (node) {
                if(node.addEventListener){
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
         * @returns {dom}
         */
        off: function (event,callback,useCapture) {
            var arrayEvents;
            this.each(function (node) {
                if(node.removeEventListener){
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
         * @returns {dom}
         */
        reomveAttr : function (attrName) {
            this.each(function (node) {
                if(node.removeAttribute){
                    node.removeAttribute(attrName);
                }
            });
            return this;
        },

        /**
         *
         * @param [deep=true]
         * @returns {dom}
         */
        clone : function (deep) {
            var clones = [],
                deep = zp.isUndefined(deep) ? true : false;
            this.each(function (node) {
                if (zp.dom.isElement(node)) {
                    clones.push(node.cloneNode(deep));
                }
            });
            return new dom(clones);
        },
        /**
         *
         * @returns {dom}
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
         * @returns {dom}
         */
        empty : function () {
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
         * @returns {dom}
         */
        find : function (selector) {
            var result = [],found;
            this.each(function (node) {
                found = dom.query(selector,node);
                found.forEach(function (el) {
                    result.push(el);
                });
            });
            return new dom(result);
        },
        /**
         *
         * @param node
         * @returns {dom}
         */
        append : function (node) {
            var el = (node instanceof dom) ? node : new dom(node),
                first = this.first,
                fr = document.createDocumentFragment();
            if(first.appendChild){
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
         * @returns {dom}
         */
        css : zp.accessor({
            get : function domGetCss (property) {
                if (dom.isElement(this.first)) {
                    return window.getComputedStyle(this.first, "").getPropertyValue(hyphenate(property));
                }
                return;
            },
            set : function domSetCss (property,value) {
                if (zp.isNumber(value) && !ignoreCssPostfix[property]) {
                    value += 'px';
                }
                this.each(function (node) {
                    if(node.style){
                        node.style[camelCase(property)] =  value;
                    }
                });
                return this;
            }
        }),


        /**
         *
         * @param {string} key
         * @param {string} [val]
         * @returns {string|dom}
         */
        attr: zp.accessor({
            get : function domGetAttr (property) {
                if(this.first.getAttribute){
                    return this.first.getAttribute(property);
                }
            },
            set : function domSetAttr (property,value) {
                this.each(function (node) {
                    if(node.setAttribute){
                        node.setAttribute(property,value);
                    }
                });
                return this;
            }
        }),

        /**
         *
         * @param {string} val
         * @returns {dom|string}
         */
        html : function (val) {
            if(arguments.length > 0){
                this.first.innerHTML = val;
                return this;
            }
            else{
                return this.first.innerHTML;
            }
        },

        /**
         *
         * @param {string} text
         * @returns {dom|string}
         */
        text : function (text) {
            var property = document.body.innerText == null ? 'textContent' : 'innerText';
            if(arguments.length > 0){
                this.first[property] = text;
                return this;
            }
            else{
                return this.first[property];
            }
        },

        /**
         *
         * @param [String|Array] className
         * @returns {dom}
         */
        addClass: function (className) {
            actionsClasses(this,className, 'add');
            return this;
        },
        /**
         *
         * @param [String|Array] className
         * @returns {dom}
         */
        removeClass: function (className) {
            actionsClasses(this,className, 'remove');
            return this;
        },

        /**
         *
         * @param {string} className
         * @returns {boolean}
         */
        hasClass : function (className) {
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
         * @returns {dom}
         */
        toggleClass: function (className) {
            actionsClasses(this,className, 'toggle');
            return this;
        },



        /**
         *
         * @returns {Array.<*>}
         */
        toArray: function () {
            return zp.toArray( this.nodes );
        }
    };

    // Static Methods

    /**
     *
     * @param {object} node
     * @returns {boolean}
     */
    dom.isElement = function domIsElement (node) {
        return (node && node.nodeName) ? true : false;
    };

    /**
     *
     * @param {Function} callback
     * @throws {TypeError} callback is function
     */
    dom.onReady = function domOnReady (callback) {
        if(!zp.isFunction(callback)){
            throw new TypeError("callback is not a function");
        }
        if(ready){
            setTimeout(callback,1);
        }
        else{
            onReadyList.push(callback);
        }
    };

    /**
     *
     * @param {string} selector
     * @param {Object} [context]
     * @returns {Object[]}
     */
    dom.query = function (selector,context) {
        var match = regexpSelector.exec(selector),
            result = [];
        context = context || document;
        if(match){
            if(match[1]){
                result = [context.getElementById ? context.getElementById(match[1]) : document.getElementById(match[1])];
            }
            else if (match[2]) {
                [].push.apply(result,context.getElementsByTagName(selector));
            }
            else if (match[3] ) {
                [].push.apply(result,context.getElementsByClassName(match[3]));
            }
        }
        else{

            [].push.apply(result,context.querySelectorAll(selector));
        }
        return result;

    };

    /**
     *
     * @param {string} tagName
     * @param {Object} [attr]
     * @returns {dom}
     */
    dom.create = function (tagName, attr) {
        var node = new dom(document.createElement(tagName));
        if (attr){
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
    dom.is = function (selector,context) {
        var node = new dom(selector,context);
        return node.length > 0;
    };

    /**
     *
     * @returns {Number}
     */
    dom.height = function () {
        return window.innerHeight;
    };
    /**
     *
     * @returns {Number}
     */
    dom.width = function () {
        return window.innerWidth;
    };

    zp.extend('dom', dom);

})(zp,document) ;