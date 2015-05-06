;(function () {

	"use strict";
	
	var zp = {

		/**
		* Возращает уникалное значение для текущей сесии
		* @returns {Number}
		*/
		uniqueId : (function() {
			var id = 0;
			return function(){ 
				return id++; 
			}
		})(),

        /**
         * Проверяет является ли item Function
         * @param {Function|String|Object|Number|Boolean} item
         * @returns {boolean}
         */
		isFunction : function coreIsFunction  (item) {
			return typeof item === "function" ;
		},

        /**
         * Проверяет является ли item Object
         * @param {Function|String|Object|Number|Boolean} item
         * @returns {boolean}
         */
		isObject : function coreIsObject (item) {
			return Object.prototype.toString.call(item) === '[object Object]';
		},
		
		/**
		* Проверяет является ли item String
		*@param {Function|String|Object|Number|Boolean}  item
		*@returns {Boolean}
		**/
		isString : function coreIsString (item) {
			return typeof item === "string";
		},
		
		/**
		* Проверяет является ли item Boolean
		*@param {Function|String|Object|Number|Boolean}  item
		*@returns {Boolean}
		**/
		isBoolean : function coreIsBoolean(item) {
			return typeof item === "boolean";
		},
		
		/**
		* Проверяет является ли item Number
		*@param {Function|String|Object|Number|Boolean}  item
		*@returns {Boolean}
		**/
		isNumber : function coreIsNumber (item) {
			return typeof item === "number" && isFinite(item);
		},
		
		/**
		* Проверяет является ли item Array
		*@param {Function|String|Object|Number|Boolean}  item
		*@returns {Boolean}
		**/
		isArray : function coreIsArray (item) {
			return Array.isArray(item);
		},
		
		/**
		* Проверяет является ли item undefined
		*@param {Function|String|Object|Number|Boolean}  item
		*@return {Boolean}
		**/
		isUndefined : function coreIsUndefined (item) {
			return typeof item === 'undefined';
		},

		/**
         * Ссылка на пустую функию
         *		 
		 */
		emptyFunc : function () {},

        /**
         * Object
         */
		globalScope : (typeof window === 'undefined') ? this : window,
		
		/**
		* Розшерям нашу library 
		* @param string name
		* @param {Object|Function} item
		**/
        extend : function coreExpand (name, item) {
			if(zp.isEmpty(zp[name])){
				zp[name] = item;
			}
		},
		
		/**
		* Проверяет на пустоту переданное значение
		*@param mixed item
		*@returns {Boolean}
		**/
		isEmpty : function coreIsEmpty (item) {
			return 	(item === false ) 									||
					(item === 0) 										||
					(item === null)										||
					(item === undefined )								||
					(zp.isArray(item) && item.length === 0) 			||
					(item === "" )										||
					(zp.isObject(item) && Object.keys(item).length === 0);
		},
        /**
         *
         * @param Object obj
         * @param Object options
         * @returns {Object}
         */
		merger : function coreMerger (obj,options) {
			var 
				i, key,
				newObj = {};
			for( i in obj){
				newObj[i] = obj[i];
			}
			for( key in options){
				newObj[key] = options[key];
			}
			return newObj;
		},
        /**
         *
         * @param data
         * @param {Boolean} [safe=false]
         * @returns {String}
         */
        encode : function coreJsonEncode (data, safe) {
            try{
                return JSON.stringify(data);
            }
            catch(e){
                if(safe === true){
                    return null;
                }
                throw new Error(e);
            }
        },

        /**
         *
         * @param data
         * @param {Boolean} [safe=false]
         * @returns {Object}
         */
        decode : function coreJsonDecode (data,safe) {
            try{
                return JSON.parse(data);
            }
            catch(e){
                if(safe === true){
                    return null;
                }
                throw new Error(e);
            }
        },

        /**
         *
         * @param item
         * @returns {Array.<*>}
         */
        toArray : function (item) {
            return Array.prototype.slice.call(item);
        }
	};
	zp.globalScope['zp'] = zp;

})();