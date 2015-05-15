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
           this.callParent = callParent.bind(this);
           return this.init ? this.init.apply(this, args) : this;
        },

        /**
         *
         * @returns {*}
         */
        callParent = function zpClassCallParent (nameParent) {
            var thatResource = resource[this.id],
                parent = thatResource.parent,
                i = 0,
                arg = [];
            if(!zp.isUndefined(parent) && zp.isFunction(parent[nameParent]) ){
                for(i = 0; i < arguments.length; i++){
                    if(i === 0){
                        continue;
                    }
                    arg.push(arguments[i]);
                }
                return  parent[nameParent].apply(this,arg);
            }
            else{
                throw new Error('The method "parent" cannot be called.');
            }
        },

        /**
         *
         * @param {Object} Class
         * @param {Object} object
         */
        inheritParent = function zpClassInheritParent  (Class,object) {
            if(!zp.isUndefined(object['extend'])){
                var cloneParent = Object.create(object['extend'].prototype);
                Class.prototype = cloneParent;
                resource[Class.prototype.id] = {
                    parent : object['extend'].prototype
                };
                delete object['extend'];
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
            Constructor.prototype.id = zp.uniqueId();
            resource[Constructor.prototype.id] = {};
            inheritParent(Constructor,object);
            if (zp.isFunction(object)) {
                object = { init: object };
            }
            cloneObject = Object.create(object);
            for (key in cloneObject) {
                Constructor.prototype[key] = cloneObject[key];
            }
        },


        zpClass = {

            /**
             *
             * @param {String} name
             * @param {Object} object
             */
            define : function (name, object) {
                var Constructor = zpClass.create(object);
                Constructor.prototype.PATH = name;
                define(name, Constructor);
            },

            /**
             *
             * @param {Object} object
             * @returns {Object}
             */
            create : function (object) {
                var Constructor;
                Constructor = function zpClass (){
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