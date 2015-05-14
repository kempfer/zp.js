/**
 * Created by zotov_000 on 14.05.2015.
 */
/**
 * Created by Kempfer on 13.05.2015.
 */
;(function (zp) {

     "use strict";

    var resource = {},

        /**
         *
         * @param {String} path
         * @param {Object} object
         */
        define = function zpClassDefine (path, object){
            var key,
                part,
                pathArray,
                target = zp.globalScope;
            pathArray = path.split('.');
            key  = pathArray.pop();
            while (pathArray.length) {
                part = pathArray.shift();
                if (!target[part]) {
                    target = target[part] = {};
                }
                else {
                    target = target[part];
                }
            }
            target[key] = object;
        },

        /**
         *
         * @param constructor
         * @param args
         * @returns {{init: Object}|*}
         */
        construct = function zpClassConstruct (constructor, args) {
            return this.init ? this.init.apply(this, args) : this;
        },

        /**
         *
         * @returns {*}
         */
        callParent = function (nameParent) {
            var parent = resource[this.id];
            console.log(this);
            if(!zp.isUndefined(parent) && zp.isFunction(parent[nameParent]) ){
                return  parent[nameParent].apply(this);
            }
        },
        /**
         *
         * @param {Function} Constructor
         * @param {Object} object
         */
        prepareClass = function zpClassPrepareClass (Constructor,object) {
            var key,
                cloneObject;
            object = object || {};
            if (zp.isFunction(object)) {
                object = { init: object };
            }
            if(object['extend']){
                Constructor.prototype = Object.create(object['extend'].prototype);
            }
            Constructor.prototype.id = zp.uniqueId();
            resource[Constructor.prototype.id] = {
                parent : object['extend']
            };
            delete object['extend'];
            cloneObject = Object.create(object);
            for (key in object) {
                Constructor.prototype[key] = cloneObject[key];
            }
            Constructor.prototype.callParent = callParent.bind(Constructor);
        },


        zpClass = {

            /**
             *
             * @param name
             * @param object
             */
            define : function (name, object) {

            },

            /**
             *
             * @param {Object} object
             * @returns {Object}
             */
            create : function (object) {
                var Constructor;
                Constructor = function (){
                    return construct.call(this, Constructor, arguments);
                };
                prepareClass(Constructor,object);
                Constructor.prototype.constructor = Constructor;
                return Constructor;
            }

        };

    zp.extend('define', zpClass.define);
    zp.extend('create', zpClass.create);

})(zp);