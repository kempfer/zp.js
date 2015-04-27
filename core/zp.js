
;(function () {


	"use strict";
	
	var zp = {
		
		/**
		*
		*/
		uniqueId : (function() {
			var id = 0;
			return function(){ 
				return id++; 
			}
		})(),
		
		/**
		*
		*
		**/
		isFunction : function (item) {
			return typeof item === "function" ;
		},
		
		/**
		*
		*
		**/
		isObject : function (item) {
			return Object.prototype.toString.call(item) === '[object Object]';
		},
		
		/**
		*
		*
		**/
		isString : function (item) {
			return typeof item === "string";
		},
		
		/**
		*
		*
		**/
		isBoolean : function (item) {
			return typeof item === "boolean";
		},
		/**
		*
		*
		**/
		isNumber : function (item) {
			return typeof item === "number" && isFinite(item);
		},
		
		/**
		*
		*
		**/
		emptyFunc : function () {},
		
		/**
		*
		*
		**/
		globalScope : (typeof window === 'undefined') ? this : window,
		
		/**
		*
		*
		**/
		expand : function (name, item) {
			if(zp.isEmpty(zp[name])){
				zp[name] = item;
			}
		},
		
		/**
		*
		*
		**/
		isEmpty : function (item) {
			return 	(item === false ) 									||
					(item === 0) 										||
					(item === null)										||
					(item === undefined )								||
					(Teq.isArray(item) && item.length === 0) 			||
					(item === "" )										||
					(t.isObject(item) && Object.keys(item).length === 0);
		},
	};
	
	zp.globalScope['zp'] = zp;

})();