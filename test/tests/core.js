QUnit.test( "Zp Core", function( assert ) {

	var object = {};
	//zp.isFunction
	assert.ok( !zp.isFunction(""), "!zp.isFunction('')" );
	assert.ok( zp.isFunction(function () {}), "zp.isFunction(function () {})" );
	var func = function () {};
	assert.ok( zp.isFunction(func), "zp.isFunction(func)" );
	object = { func : function () {}, notFunction : {}};
	assert.ok( zp.isFunction(object.func), "zp.isFunction(object.func)" );
	assert.ok( !zp.isFunction(object.notFunction), "!zp.isFunction(object.notFunction)" );
	
	
	//zp.isArray 
	
	assert.ok( !zp.isArray(''), "!zp.isArray('')" );
	assert.ok( !zp.isArray({}), "!zp.isArray({})" );
	assert.ok( zp.isArray([]), "zp.isArray([])" );
	object.array = []; 
	assert.ok( zp.isArray(object.array), "zp.isArray(object.array)" );
	object.notArray = null; 
	assert.ok( !zp.isArray(object.notArray), "!zp.isArray(object.notArray)" );
	
	//zp.isEmpty
	assert.ok( zp.isEmpty() , "zp.isEmpty()" );
	assert.ok( zp.isEmpty([]), "zp.isEmpty([])" );
	assert.ok( zp.isEmpty({}), "zp.isEmpty({})" );
	assert.ok( zp.isEmpty(0), "zp.isEmpty(0)" );
	assert.ok( !zp.isEmpty(1), "!zp.isEmpty(1)" );
	assert.ok( !zp.isEmpty('a'), "!zp.isEmpty('a')" );
	assert.ok( !zp.isEmpty([0]), "!zp.isEmpty([0])" );
	assert.ok( !zp.isEmpty({x:1}), "!zp.isEmpty({x:1})" );
	assert.ok( zp.isEmpty(''), "zp.isEmpty('')" );
	assert.ok( zp.isEmpty(false), "zp.isEmpty(false)" );
	assert.ok( !zp.isEmpty(true), "!zp.isEmpty(true)" );
	assert.ok( zp.isEmpty(undefined), "!zp.isEmpty(undefined)" );
	
	//zp.isObject 
	assert.ok( !zp.isObject(''), "!zp.isObject('')" );
	assert.ok( !zp.isObject([]), "!zp.isObject([])" );
	assert.ok( !zp.isObject(1), "!zp.isObject(1)" );
	assert.ok( !zp.isObject(false), "!zp.isObject(false)" );
	assert.ok( !zp.isObject(true), "!zp.isObject(true)" );
	assert.ok( !zp.isObject(function () {}), "!zp.isObject(function () {})" );
	assert.ok( zp.isObject({}), "zp.isObject({})" );
	
	//zp.isString
	assert.ok( !zp.isString(1), "!zp.isString(1)" );
	assert.ok( !zp.isString([]), "!zp.isString([])" );
	assert.ok( !zp.isString({}), "!zp.isString({})" );
	assert.ok( !zp.isString(false), "!zp.isString(false)" );
	assert.ok( zp.isString("string"), "zp.isString('string')" );
	assert.ok( zp.isString(new String('').toString()), "zp.isString(new String('')).toString()" );
	
	//zp.isBoolean
	assert.ok( !zp.isBoolean(1), "!zp.isBoolean(1)" );
	assert.ok( !zp.isBoolean('false'), "!zp.isBoolean('false')" );
	assert.ok( !zp.isBoolean([]), "!zp.isBoolean([])" );
	assert.ok( zp.isBoolean(true), "zp.isBoolean(true)" );
	
	//zp.isNumber
	assert.ok( !zp.isNumber("1"), "!zp.isNumber('1')" );
	assert.ok( !zp.isNumber(true), "!zp.isNumber(true)" );
	assert.ok( zp.isNumber(1), "zp.isNumber(1)" );
	assert.ok( zp.isNumber(1/2), "zp.isNumber(1/2)" );
	
	//zp.isUndefined
	assert.ok( !zp.isUndefined("1"), "!zp.isUndefined('1')" );
	assert.ok( zp.isUndefined(), "!zp.isUndefined()" );
	assert.ok( !zp.isUndefined(1), "zp.isUndefined(1)" );
});