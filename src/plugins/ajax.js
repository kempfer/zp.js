/**
 * Created by zotov_mv on 30.04.2015.
 */
;(function (zp) {

    "use strict";

    var
        /**
         *
         * @param {object|string|number}
         * @returns {string}
         */
        prepareData = function ajaxPrepareData (object) {
            var
                i,
                array = [],
                e = encodeURIComponent;
            if (zp.isEmpty(object)){
                return '';
            }
            if(!zp.isUndefined(window.FormData) && object instanceof window.FormData){
                return object;
            }
            if (zp.isString(object) || zp.isNumber(object)) {
                return String( object );
            }
            for (i in object){
                if (object.hasOwnProperty(i)) {
                    array.push( e(i) + '=' + e(object[i]) );
                }
            }
            return array.join('&');
        },
        /**
         *
         * @param String url
         * @param String method
         * @param Object data
         * @param Boolean cache
         * @private
         * @returns {string}
         */
        prepareUrl = function ajaxPrepareUrl (url,method,data,cache) {
            var separator = url.indexOf( '?' ) == -1 ? '?' : '&';
            if (method == 'GET' && data) {
                url += separator + data;
            }
            if (!cache) {
                url += separator + 'rand=' + Date.now();
            }
            return url;
        },
        /**
         *
         * @param string|object config
         * @returns {Object}
         */
        prepareConfig = function ajaxPrepareConfig (config) {
            return zp.merger(ajax.defaultConfig,config);
        },

        /**
         *
         * @param {XMLHttpRequest}  xhr
         * @param {Object} headers
         * @param {boolean} sendFormData
         */
        setHeaders =  function ajaxSetHeaders (xhr,headers,isSendFormData) {
            var key;
            for(key in headers){
                if(headers.hasOwnProperty(key)){
                    if(!(isSendFormData && key === 'Content-Type')){
                        xhr.setRequestHeader(key,headers[key]);
                    }
                }
            }
            xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
        },

        /**
         *
         * @param XMLHttpRequest xhr
         * @param  config
         * @returns {Function}
         */
        onReady = function ajaxOnReady (xhr, config) {
            return function ajaxOnReadyStateChange (e) {
                var result;
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        result = xhr.responseText;
                        if(config.responseType.toUpperCase() == 'JSON'){
                            result = zp.decode(result, true);
                        }
                        if(zp.isFunction(config.onLoad)){
                            config.onLoad(result,xhr,e);
                        }
                    }
                    else{
                        result = xhr.responseText;
                        if(zp.isFunction(config.onError)){
                            config.onError(result,xhr,e);
                        }

                    }
                }
            }
        },

        /**
         *
         * @param {Object|String} config
         * @this ajax
         * @returns {ajax}
         */
        ajax = function ajaxConstructor (config) {
            if (! (this instanceof ajax)) {
                return new ajax(config);
            }
            var
                readyConfig = prepareConfig(config),
                method = readyConfig.method.toUpperCase(),
                sendData = prepareData(readyConfig.data),
                url = prepareUrl(readyConfig.url,method,sendData,readyConfig.cache),
                isSendFormData = !zp.isUndefined(window.FormData) && sendData instanceof window.FormData;
            this.id = zp.uniqueId();
            this.xhr = new XMLHttpRequest();
            this.xhr.open(method, url, readyConfig.async);
            this.xhr.timeout = readyConfig.timeout;
            this.xhr.onreadystatechange = onReady(this.xhr, readyConfig);
            this.xhr.onabort = zp.isFunction(readyConfig.onAbort) ? readyConfig.onAbort : null;
            setHeaders(this.xhr, readyConfig.headers, isSendFormData);
            this.xhr.send( method == 'POST' && sendData ? sendData : null );
            return this;
        };

    ajax.prototype = {

        constructor : ajax,

        xhr : null,

        id : null,

        /**
         *
         * @returns {ajax}
         */
        abort : function ajaxAbort () {
            this.xhr.abort();
            return this;
        }
    };

    /**
     *
     * @type {{method: string, type: string, timeout: number, data: {}, cache: boolean, url: string, headers: {X-Requested-With: string}, onAbort: zp.emptyFunc, onLoad: zp.emptyFunc, onError: zp.emptyFunc}}
     */
    ajax.defaultConfig = {
        method : 'GET',
        responseType : '',
        timeout : 30000,
        data : {},
        cache : true,
        async : true,
        url : location.href,
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        onAbort : zp.emptyFunc,
        onLoad : zp.emptyFunc,
        onError : zp.emptyFunc

    };
    zp.extend('ajax', ajax);

})(zp);