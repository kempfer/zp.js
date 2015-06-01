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


        messageList = {
            email: '{attribute} is not a valid email address.',
            required: '{attribute} cannot be blank.',
            url: '{attribute} is not a valid URL.',
            ip: '{attribute} is not a valid ip.',
            integer: '{attribute} must be an integer.',
            alpha: '{attribute} must be an alpha.',
            alphaNumeric: '{attribute} must be an alphaNumeric.',
            numeric: '{attribute} must be an numeric.'
        },

        /**
         *
         * @type {string[]}
         */
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
                    else{
                        listRules[key] = parseRule(rule);
                    }
                }
            }
            return listRules;
        },
        /**
         *
         * @param {Object|Array} rules
         * @returns {Object}
         */
        parseRule = function validatorParseRule (rules) {
            var rule,
                parseRule,
                i = 0,
                listRules = [];
            if(zp.isObject(rules)){
                return rules;
            }
            else if(zp.isArray(rules)){
                while (i < rules.length) {
                    rule = rules[i];
                    if(zp.isObject(rule)){
                        listRules.push(rule);
                    }
                    else if(zp.isString(rule)){
                        parseRule = rule.split(':');
                        listRules.push({
                            name: parseRule[0],
                            parameters : parseParameters(parseRule[1])
                        });
                    }
                    else{
                        throw new Error('wrong format rule');
                    }
                    i += 1;
                }
            }
            else{
                throw new Error('wrong format rule');
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

        /**
         *
         * @param {String} name
         * @param {String} rule
         * @param {Array} params
         * @returns {String}
         */
        prepareMessage = function validatorPrepareMessage (name, rule, params) {
            var
                message = messageList[rule] || '';
            message = message.replace('{attribute}', name);
            return message;

        },

        /**
         *
         * @param {Array} rules
         * @returns {boolean}
         */
        isValidatable = function validatorIsValidatable (rules) {
            var
                validatable = false,
                i = rules.length;
            while (i) {
                i -= 1;
                if(zp.inArray(implicitRules, rules[i].name)){
                    validatable = true;
                    continue;
                }
            }
            return validatable;
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
                return regexs.email.test(attributes[name]);
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
            this.attributes = data;
            this.result = {passed: true, errorKeys : {},  countError: 0};
            this.messages = messages;
            this.completed = false;
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
        attributes: {},

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
            if(!this.completed){
                this.validated();
            }
            return this.result.passed;
        },

        /**
         *
         * @param {String} key
         * @param {Object} rule
         * @param {boolean} validatable
         * @private
         */
        _validateRule : function (dataKey,rule,validatable) {

            if (ruleMethods[rule.name]) {
                if (validatable && !ruleMethods[rule.name](this.attributes,dataKey,rule.parameters)) {
                    this.addError(dataKey,rule.name,rule.parameters);
                }
            }
            else{
                throw new Error('not known rule validation: ' + rule.name);
            }
        },

        /**
         *
         * @returns {Object}
         */
        validated: function () {
            var
                key,
                ruleList,
                validatable,
                i = 0;
            for (key in this.rules) {
                ruleList = this.rules[key];
                validatable = isValidatable(ruleList);
                while (i < ruleList.length) {
                    this._validateRule(key,ruleList[i],validatable);
                    i += 1;
                }
            }
            this.completed = true;
            return this.result;
        },
        /**
         *
         * @returns {Array}
         */
        getErrors: function () {
            var
                key,
                errorKeys,
                i = 0,
                errors = [];
            for(key in this.result.errorKeys){
                errorKeys = this.result.errorKeys[key];
                while ( i < errorKeys.length) {
                    errors.push(errorKeys[i].message);
                    i += 1;
                }
            }

            return errors;
        },

        /**
         *
         * @param {String} dataKey
         * @param {String} ruleName
         * @param {Array} [parameters]
         */
        addError : function (dataKey, ruleName, parameters) {
            if (zp.isUndefined(this.result.errorKeys[dataKey])) {
                this.result.errorKeys[dataKey] = [];
            }
            this.result.errorKeys[dataKey].push({
                rule: ruleName,
                message: prepareMessage(dataKey,ruleName,parameters)
            });
            this.result.passed = false;
            this.result.countError += 1;
            return this;
        }

    };


    zp.extend('validator', Validator);


}(zp));