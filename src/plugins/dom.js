/**
 * @author zotov_mv
 * @see core/zp
 */

;(function (zp,document) {

    "use strict";

    var
        ready = false,

        onLoadList = [],

        regexpSelector = {
            findTag  	: /^[-_a-z0-9]+$/i,
            findClass	: /^\.[-_a-z0-9]+$/i,
            findId   	: /^#[-_a-z0-9]+$/i
        },


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
            for(var i = 0; i < onLoadList.length; i++){
                if(zp.isFunction(onLoadList[i])){
                    onLoadList[i]();
                }
            }
            onLoadList = [];
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
            if (!node || step <= 0){
                return new dom(node);
            }
            return findParentByStep(node.parentNode, step-1);
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

        if(!selector){
            return this;
        }

        if (!arguments.length) {
            this.nodes = [document];
            return this;
        }

        var currentContext = context || document;

        this.nodes =
            zp.isString(selector)       ? dom.query(selector,currentContext) :
            selector === window         ? [ document ] :
            selector instanceof dom     ? zp.toArray(selector.nodes) :
            dom.isElement(selector)     ? [selector] :
            zp.isArray(selector)  		? selector :
            [];
        //Hak
        this.nodes.forEach(function (el,index) {
            this[index] = el;
        }.bind(this));

        this.length = this.nodes.length;

        return this;
    };

    /**
     *
     * @property {Array.<Object>} nodes
     * @property {Function} constructor
     */
    dom.prototype = {

        constructor: dom,

        length: 0,

        splice: [].slice,

        /**
         * @pr
         */
        nodes: [],

        /**
         *
         * @param {Number} index
         * @returns {Object|null}
         */
        get: function (index) {
            return document.body;
            return this.nodes[Number(index) || 0];
        },

        /**
         *
         * @returns {Array.<*>}
         */
        toArray: function () {
            return zp.toArray( this.nodes );
        }
    }
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
    dom.onLoad = function domOnReady (callback) {
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
        var currentContext = context ? context.getElementById ? context : document : document;

        return 	selector.match(regexpSelector.findId)  		    ? [currentContext.getElementById(selector.substr(1))] :
                selector.match(regexpSelector.findClass) 	    ? zp.toArray(currentContext.getElementsByClassName(selector.substr(1))) :
                selector.match(regexpSelector.findTag)   	    ? zp.toArray(currentContext.getElementsByTagName  (selector)) :
                zp.toArray(context.querySelectorAll(selector));
    };


    zp.extend('dom', dom);

})(zp,document) ;