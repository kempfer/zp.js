/**
 * Created by zotov_000 on 28.05.2015.
 */

;(function (zp) {

    "use strict";

    var
        regexs = {
            alpha: /^[a-z]+$/i,
            alphaNumeric: /^[a-z0-9]+$/i,
            alphaDash: /^[a-z0-9_\-]+$/i,
            numeric: /^[0-9]+$/,
            numericDash: /^[\d\-\s]+$/,
            integer: /^\-?[0-9]+$/,
            email: /^[a-zA-Z0-9.!#$%&amp;'*+\-\/=?\^_`{|}~\-]+@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*$/,
            ip: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
            url: /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
        },

        /**
         *
         * @param {Object} data
         * @param {Object} rules
         * @constructor
         * @this Validator
         * @returns {Validator}
         */
        Validator = function ValidatorConstructor (data, rules) {

            if (!(this instanceof Validator)) {
                return new Validator(data, rules);
            }



            return this;
        };

    Validator.prototype = {

        /**
         *
         * @type {Function}
         */
        constructor: Validator,

        /**
         *
         * @type {Object}
         */
        data: {},

        /**
         *
         * @type {Object}
         */
        rules: {},

        /**
         *
         * @returns {boolean}
         */
        fails: function () {
            return true;
        },

        /**
         *
         * @returns {boolean}
         */
        passes: function () {

        }

    };


    zp.extend('validator', Validator);


}(zp));