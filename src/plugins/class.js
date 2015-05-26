
/**
 * Created by Kempfer on 13.05.2015.
 */
(function (zp) {

    "use strict";

    var

        slice = Array.prototype.slice,

        resource = {},

        /**
         *
         * @param {String} path
         * @param {Object} object
         */
        define = function zpClassDefine (path, object) {
            var key,
                part,
                pathArray,
                target = zp.globalScope;
            pathArray = path.split('.');
            key = pathArray.pop();
            while (pathArray.length) {
                part = pathArray.shift();
                if (!target[part]) {
                    target[part] = {};
                    target = target[part];
                }
                else {
                    target = target[part];
                }
            }
            target[key] = object;
        },

        /**
         *
         * @param {String} methodName
         * @returns {*}
         */
        callParent = function zpClassCallParent (methodName) {
            var parent = this.Parent || resource[this.resource_id].parent,
                fn = parent[methodName],
                result;
            if (zp.isFunction(fn)) {
                this.Parent = resource[parent.resource_id].parent;
                if(arguments.length > 1) {
                    result = fn.apply(this, slice.call(arguments, 1));
                }
                else{
                    result = fn.call(this);
                }
                delete this.Parent;
            }
            return result;
        },

        /**
         *
         * @param {Object} Class
         * @param {Object} object
         */
        inheritParent = function zpClassInheritParent  (Class, object) {
            var parent = object['extend'] || Object;
            Class.prototype = Object.create(parent.prototype);
            Class.prototype.resource_id = zp.uniqueId();
            resource[Class.prototype.resource_id] = {
                parent: parent.prototype
            };
            Class.prototype.callParent = callParent;
            delete object['extend'];
        },

        /**
         *
         * @param {Function} constructor
         * @param {Object} object
         */
        prepareClass = function zpClassPrepareClass (constructor, object) {
            var key;
            object = object || {};
            inheritParent(constructor, object);
            if (zp.isFunction(object)) {
                object = {init: object};
            }
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    constructor.prototype[key] = object[key];
                }
            }
        },


        zpClass = {

            /**
             *
             * @param {String} namespace
             * @param {Object} object
             */
            define: function (namespace, object) {
                object.name = namespace.split('.').pop();
                var Constructor = zpClass.create(object);
                Constructor.prototype.namespace = namespace;
                define(namespace, Constructor);
            },

            /**
             *
             * @param {Object} object
             * @returns {Object}
             */
            create: function (object) {
                var
                    Constructor = function zpClass () {
                        if (Constructor.prototype.init) {
                            Constructor.prototype.init.apply(this, arguments);
                        }
                        return this;
                    },
                    name = object.hasOwnProperty('name') ? object['name'] : 'zpClass_' + zp.uniqueId();
                prepareClass(Constructor, object);
                Constructor.prototype.constructor = Constructor;
                Constructor.prototype.name = name;

                Constructor.prototype.toString = function () {
                    return '[object zpClass]';
                };
                return Constructor;

            }

        };

    zp.extend('define', zpClass.define);
    zp.extend('create', zpClass.create);

}(zp));