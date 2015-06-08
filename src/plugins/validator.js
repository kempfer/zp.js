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
            numericDash: /^[\d\-\s]+$/,
            integer: /^\-?[0-9]+$/,
            email: /^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
            ip: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
            url: /^((http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+))/i
        },


        messageList = {
            email: '{attribute} is not a valid email address.',
            required: '{attribute} cannot be blank.',
            url: '{attribute} is not a valid URL.',
            ip: '{attribute} is not a valid ip.',
            integer: '{attribute} must be an integer.',
            alpha: '{attribute} must be an alpha.',
            alphaNumeric: '{attribute} must be an alphaNumeric.',
            numeric: '{attribute} must be an numeric.',
            confirmed: '{attribute} must be repeated exactly.',
            'in': '{attribute} is invalid.',
            notIn: '{attribute} is invalid.',
            min: function (name, rule, params) {
                var
                    msg = '{attribute} must be no less than {min}.';
                msg = msg.replace('{attribute}', name);
                msg = msg.replace('{min}', params[0]);
                return msg;
            },
            max: function (name, rule, params) {
                var
                    msg = '{attribute} must be no greater than {max}.';
                msg = msg.replace('{attribute}', name);
                msg = msg.replace('{max}', params[0]);
                return msg;
            },
            between: function (name, rule, params) {
                var
                    msg = '{attribute} must be between {min} and {max}.';
                msg = msg.replace('{attribute}', name);
                msg = msg.replace('{min}', params[0]);
                msg = msg.replace('{max}', params[1]);
                return msg;
            }
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

            for (key in rules) {
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
            if (zp.isObject(rules)) {
                return rules;
            }
            else if (zp.isArray(rules)) {
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
         * @param {string} stringRule
         * @returns {Object}
         */
        parseStringRule = function validatorParseRule (stringRule) {
            var
                rules = stringRule.split('|'),
                i = 0,
                l = rules.length,
                listRules = [],
                rule;
            while (i < l) {
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
            if (zp.isString(values)) {
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
                prepareMessage,
                message = messageList[rule] || '{attribute} is invalid';
            if (zp.isFunction(message)) {
                prepareMessage = message(name, rule, params);
            }
            else {
                prepareMessage = message.replace('{attribute}', name);
            }

            return prepareMessage;

        },

        /**
         *
         * @param {Array} rules
         * @param {Object} attributes
         * @param {String} key
         * @returns {boolean}
         */
        isValidatable = function validatorIsValidatable (rules, attributes, key) {
            var
                validatable = false,
                i = rules.length;
            if (zp.isUndefined(attributes[key])) {
                while (i) {
                    i -= 1;
                        if (zp.inArray(implicitRules, rules[i].name)) {
                        validatable = true;
                        break;
                    }
                }
            }
            else{
                validatable = true;
            }

            return validatable;
        },

        /**
         *
         * @param {String|Number|Array} v
         * @returns {Number}
         */
        getSize = function getSize (v) {
            var size;
            if (zp.isNumber(Number(v))) {
                size = v;
            }
            else if (zp.isArray(v) || zp.isString(v)) {
                size = v.length;
            }
            return size;
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
                return regexs.alphaNumeric.test(attributes[name]);
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            alphaDash : function validateAlphaDash(attributes,name) {
                return regexs.alphaDash.test(attributes[name]);
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            numeric : function validateNumeric (attributes,name) {
                return !isNaN(Number(attributes[name]));
            },

            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @returns {boolean}
             */
            numericDash : function validateNumeric (attributes,name) {
                return regexs.numericDash.test(attributes[name]);
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
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @param {Array} parameters
             * @returns {boolean}
             */
            'in' : function validateIN (attributes,name,parameters) {
                var value = attributes[name];
                if (zp.isNumber(attributes[name])) {
                    value = String(attributes[name]);
                }
                return zp.inArray(parameters,value);
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @param {Array} parameters
             * @returns {boolean}
             */
            notIn : function validateNotIN (attributes,name,parameters) {
                return !ruleMethods.in(attributes,name,parameters);
            },
            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @param {Array} parameters
             * @returns {boolean}
             */
            confirmed : function validateConfirmed (attributes,name,parameters) {
                var other = attributes[parameters[0]];
                return !zp.isUndefined(other) && other == attributes[name];
            },

            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @param {Array} parameters
             * @returns {boolean}
             */
            max : function validateMax (attributes,name,parameters) {
                return getSize(attributes[name]) <= parameters[0];
            },

            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @param {Array} parameters
             * @returns {boolean}
             */
            min : function validateMin (attributes,name,parameters) {
                return getSize(attributes[name]) >= parameters[0];
            },

            /**
             *
             * @param {Object} attributes
             * @param {String} name
             * @param {Array} parameters
             * @returns {boolean}
             */
            between : function validateBetween (attributes,name,parameters) {
                var size =  getSize(attributes[name]);
                return size >= parameters[0] && size <= parameters[1];
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
            this.messages = messages || {};
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
         * @param {String} dataKey
         * @param {Object} rule
         * @param {boolean} validatable
         * @private
         */
        _validateRule : function (dataKey,rule,validatable) {

            if (ruleMethods[rule.name]) {
                if (validatable && !ruleMethods[rule.name](this.attributes,dataKey,rule.parameters)) {
                    this._addError(dataKey,rule.name,rule.parameters);
                }
            }
            else{
                throw new Error('not known rule validation: ' + rule.name);
            }
        },
        /**
         *
         * @param {String} dataKey
         * @param {String} ruleName
         * @param {Array} [parameters]
         * @private
         */
        _addError : function (dataKey, ruleName, parameters) {
            var msg = this.messages[dataKey] || prepareMessage(dataKey,ruleName,parameters);
            if (zp.isUndefined(this.result.errorKeys[dataKey])) {
                this.result.errorKeys[dataKey] = [];
            }
            this.result.errorKeys[dataKey].push({
                rule: ruleName,
                message: msg
            });
            this.result.passed = false;
            this.result.countError += 1;
            return this;
        },

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
         * @returns {Object}
         */
        validated: function () {
            var
                key,
                ruleList,
                validatable,
                i = 0;
            for (key in this.rules) {
                if (this.rules.hasOwnProperty(key)) {
                    ruleList = this.rules[key];
                    validatable = isValidatable(ruleList,this.attributes,key);
                    while (i < ruleList.length) {
                        this._validateRule(key,ruleList[i],validatable);
                        i += 1;
                    }
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
                error,
                i = 0,
                errors = [];
            for(key in this.result.errorKeys){
                if (this.result.errorKeys.hasOwnProperty(key)) {
                    errorKeys = this.result.errorKeys[key];
                    error = { name: key,  message: []};
                    while ( i < errorKeys.length) {
                        error.message.push(errorKeys[i].message);
                        i += 1;
                    }
                    errors.push(error);
                }
            }
            return errors;
        },

        /**
         *
         * @param {string} key
         * @returns {Array}
         */
        getError : function (key) {
            var
                i = 0,
                errorKeys = this.result.errorKeys[key] || [],
                error = [];
            while ( i < errorKeys.length) {
                error.push(errorKeys[i].message);
                i += 1;
            }
            return error;
        }
    };
    zp.extend('validator', Validator);
}(zp));