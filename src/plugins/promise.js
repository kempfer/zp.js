/**
 * Created by zotov_000 on 11.06.2015.
 */
;(function () {

    "use strict";


    /**
     *
     * @param {Function} executor
     * @constructor
     * @this ZpPromise
     * @returns ZpPromise
     */
    var ZpPromise = function (executor) {

    };

    ZpPromise.prototype = {
        /**
         *
         * @type {Function}
         */
        constructor: ZpPromise
    };

    zp.extend('promise',ZpPromise);

} (zp));