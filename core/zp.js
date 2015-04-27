
;(function () {


	"use strict";
	
	var zp = {
		
		/**
		* Возращает уникалное значение для текущей сесии
		*@return Number
		*/
		uniqueId : (function() {
			var id = 0;
			return function(){ 
				return id++; 
			}
		})(),
		
		/**
		* Проверяет является ли item Function
		*@param mixed item
		*@return Boolean 
		**/
		isFunction : function (item) {
			return typeof item === "function" ;
		},
		
		/**
		* Проверяет является ли item Object
		*@param mixed item
		*@return Boolean 
		**/
		isObject : function (item) {
			return Object.prototype.toString.call(item) === '[object Object]';
		},
		
		/**
		* Проверяет является ли item String
		*@param mixed item
		*@return Boolean 
		**/
		isString : function (item) {
			return typeof item === "string";
		},
		
		/**
		* Проверяет является ли item Boolean
		*@param mixed item
		*@return Boolean 
		**/
		isBoolean : function (item) {
			return typeof item === "boolean";
		},
		
		/**
		* Проверяет является ли item Number
		*@param mixed item
		*@return Boolean 
		**/
		isNumber : function (item) {
			return typeof item === "number" && isFinite(item);
		},
		
		/**
		* Проверяет является ли item Array
		*@param mixed item
		*@return Boolean 
		**/
		isArray : function (item) {
			return Array.isArray(item);
		},
		
		/**
		* Возращает пустую функцию 
		*@return Function 
		**/
		emptyFunc : function () {},
		
		/**
		*
		*@return Object 
		**/
		globalScope : (typeof window === 'undefined') ? this : window,
		
		/**
		* Розшерям нашу library 
		*@param string name
		*@param Object|Function item
		**/
		expand : function (name, item) {
			if(zp.isEmpty(zp[name])){
				zp[name] = item;
			}
		},
		
		/**
		* Проверяет на пустоту переданное значение
		*@param mixed item
		*@return Boolean 
		**/
		isEmpty : function (item) {
			return 	(item === false ) 									||
					(item === 0) 										||
					(item === null)										||
					(item === undefined )								||
					(zp.isArray(item) && item.length === 0) 			||
					(item === "" )										||
					(zp.isObject(item) && Object.keys(item).length === 0);
		}
	};
	
	zp.globalScope['zp'] = zp;

})();