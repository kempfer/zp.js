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

        implicitRules = ['required'],

        /**
         *
         * @param {Object} rules
         * @returns {Object}
         */
        explodeRules = function validatorExplodeRules (rules) {
            var
                key,
                rule,
                listRules = {};

            for(key in rules) {
                if (rules.hasOwnProperty(key)) {
                    rule = rules[key];
                    if (zp.isString(rule)) {
                        listRules[key] = parseStringRule(rule);
                    }
                }
            }
            return listRules;
        },

        /**
         *
         * @param {string} rule
         * @returns {Object}
         */
        parseStringRule = function validatorParseRule (rule) {
            var
                rules = rule.split('|'),
                i = 0,
                l = rules.length,
                listRules = [],
                rule;
            while(i < l){
                rule = rules[i].split(':');
                listRules.push({
                    name: rule[0],
                    parameters : parseParameters(rule[1])
                });
                i += 1;
            }
            return listRules;
        },

        /**
         *
         * @param {String} values
         * @returns {Array}
         */
        parseParameters = function validatorParseParameters (values) {
            if(zp.isString(values)){
                return values.split(",");
            }
            else{
                return [];
            }
        },

        prepareMessage = function validatorPrepareMessage () {

        },

        /**
         *
         * @param {String} rule
         * @param {Object} data
         * @param {String} name
         * @returns {boolean}
         */
        isValidatable = function validatorIsValidatable (rule, data, name) {
            if(zp.inArray(implicitRules)){

            }
        },

        ruleMethods = {

            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            required : function validateRequired (attributes,name) {
                var value = (attributes[name] && zp.isString(attributes[name])) ? attributes[name].trim() : attributes[name];
                return !zp.isEmpty(value);
            },

            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            email : function validateEmail (attributes,name){
                if(attributes[name]){
                    return regexs.email.test(attributes[name]);
                }
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            alpha : function validateAlpha (attributes,name) {
                return regexs.alpha.test(attributes[name]);
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            alphaNumeric : function validateAlphaNumeric (attributes,name) {
                return regexs.alpha.test(attributes[name]);
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            alphaDash : function validateAlphaDash(attributes,name) {
                return regexs.alpha.test(attributes[name]);
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            numeric : function validateNumeric (attributes,name) {
                return regexs.numeric.test(attributes[name]);
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            integer : function validateInteger  (attributes,name) {
                return regexs.integer.test(attributes[name]);
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            ip : function validateIP(attributes,name) {
                return regexs.ip.test(attributes[name]);
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            url : function validateUrl (attributes,name) {
                return regexs.url.test(attributes[name]);
            }
        },



        /**
         *
         * @param {Object} data
         * @param {Object} rules
         * @param {Object} [messages]
         * @constructor
         * @this Validator
         * @returns {Validator}
         */
        Validator = function ValidatorConstructor (data, rules, messages) {

            if (!(this instanceof Validator)) {
                return new Validator(data, rules);
            }

            this.rules = explodeRules(rules);
            this.data = data;
            this.result = {};
            this.errors = [];
            this.messages = messages;
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
         * @type {Object}
         */
        result : {},

        /**
         *
         * @returns {boolean}
         */
        fails: function () {
            return !this.passes();
        },

        /**
         *
         * @returns {boolean}
         */
        passes: function () {
            if(zp.isEmpty(this.result)){
                this.validated();
            }
            return this.result.passed;
        },

        /**
         *
         * @returns {Object}
         */
        validated: function () {
            var
                key,
                ruleList,
                rule,
                result = {passed : true, errorKeys: {}, countError: 0},
                i = 0;
            for (key in this.rules) {
                ruleList = this.rules[key];
                while (i < ruleList.length) {
                    rule = ruleList[i];
                    if (ruleMethods[rule.name]) {
                        if (!ruleMethods[rule.name](this.attributes,key,rule.parameters)) {
                            if(!zp.isArray(result.errorKeys[key])){
                                result.errorKeys[key] = [];
                                result.errorKeys[key].push(rule.name);
                                result.validate = false;
                                result.countError += 1;
                            }
                        }
                    }
                    i += 1;
                }
            }
        },
        /**
         *
         * @returns {Array}
         */
        getErrors: function () {
            return this.errors;
        }

    };


    zp.extend('validator', Validator);


}(zp));