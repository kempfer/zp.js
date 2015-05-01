/**
 * Created by zotov_mv on 30.04.2015.
 */
;(function (zp) {

    "use strict";

    var
        /**
         *
         * @param object
         * @returns {string}
         */
        stringify = function ajaxStringify (object) {
            var 
                i,
                array = [], 
                e = encodeURIComponent;
            if (zp.isEmpty(object)){
                return '';  
            } 
            if(!zp.isUndefined(window.FormData)){
                if(object instanceof window.FormData) {
                    return object;   
                }
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
            var readyConfig;
            if(zp.isString(config)){
                readyConfig = ajax.defaultConfig;
                readyConfig.url = config;
            }
            else{
                readyConfig = zp.merger(ajax.defaultConfig,config);
            }
            return readyConfig;
        },

        /**
         *
         * @param xhr
         * @param config
         * @returns {Function}
         */
        onReady =  function ajaxOnReady (xhr, config) {      
            return function ajaxOnReadyStateChange (e) {
                if (xhr.readyState == 4) {              
                    if (xhr.status == 200) {
                        var result = xhr.responseText;
                        if(config.type.toUpperCase() == 'JSON'){
                            result = zp.decode(result);
                        }   
                        config.onLoad(result);
                    }
                    else{       
                        var result = xhr.responseText;                  
                        config.onError(xhr.status,result);
                    }               
                }
            }
        },

        /**
         *
         * @param Object config
         * @returns {ajax}
         */
        ajax = function ajaxConstructor (config) {
            if (! (this instanceof ajax)) {
                return new ajax(config);
            }
            var 
                readyConfig = prepareConfig(config),
                method = readyConfig.method.toUpperCase(),
                data = stringify(readyConfig.data),
                url = prepareUrl(readyConfig.url,method,data,readyConfig.cache);
            this.xhr = new XMLHttpRequest();
            this.xhr.open(method, url);
            this.xhr.timeout = readyConfig.timeout;
            this.xhr.onreadystatechange = onReady(this.xhr, readyConfig);
            this.xhr.onabort = readyConfig.onAbort;
            this.xhr.send( method == 'POST' && data ? data : null );
            return this;
        };

    ajax.prototype = {

        /**
         *
         */
        constructor : ajax,

        /**
         *
         */
        xhr : null,

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
     * @type {{method: string, type: string, timeout: number, data: {}, cache: boolean, url: string, onAbort: function, onLoad: function, onError: function}}
     */
    ajax.defaultConfig = {
        method : 'GET',
        type : '',
        timeout : 30000,
        data : {},
        cache : false,
        url : location.href,
        onAbort : zp.emptyFunc,
        onLoad : zp.emptyFunc,
        onError : zp.emptyFunc

    };
    zp.expand('ajax', ajax);

})(zp);