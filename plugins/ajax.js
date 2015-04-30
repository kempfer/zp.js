/**
 * Created by zotov_000 on 30.04.2015.
 */
;(function (zp) {

    "use strict";

    /**
     *
     * @param {Object} config
     */
    var ajax = function (config) {
        var xhr = new XMLHttpRequest();

    };

    ajax.prototype = {

        constructor : ajax,
        abort : function ajaxAbort () {

        }

    }


    /**
     *
     * @type {{method: string, type: string, timeout: number, data: {}, cache: boolean, url: string, onAbort: *, onLoad: *, onError: *}}
     */
    ajax.defaultConfig = {
        method : 'GET',
        type : 'JSON',
        timeout : 30000,
        data : {},
        cache : false,
        url : location.href,
        onAbort : zp.emptyFunc(),
        onLoad : zp.emptyFunc(),
        onError : zp.emptyFunc()

    };

    zp.expand('ajax', ajax);

})(zp);
