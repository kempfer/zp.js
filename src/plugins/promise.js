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
        constructor: ZpPromise,

        /**
         *
         * @param {Function} onRejected
         */
        catch: function (onRejected) {

        },

        /**
         *
         * @param {Function} onFulfilled
         * @param {Function} onRejected
         */
        then : function (onFulfilled, onRejected){

        }

    };


    /**
     *
     * @param {Array} promises
     * @return {ZpPromise}
     */
    ZpPromise.all = function (promises) {

    };

    /**
     *
     */
    ZpPromise.race = function () {

    };

    /**
     *
     * @param reason
     * @returns {Promise}
     */
    ZpPromise.reject = function (reason) {

    };

    /**
     *
     * @param value resolve value
     * @returns {Promise}
     */
    ZpPromise.resolve = function (value) {

    };

    zp.extend('promise',ZpPromise);

} (zp));