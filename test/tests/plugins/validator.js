/**
 * Created by Kempfer on 30.05.2015.
 */
module("zp validator");


QUnit.test( "Parse Rules", function( assert ) {

    var valid = zp.validator({ email : 'Maxim'}, {email : 'required|email:1'});

    assert.ok( zp.isObject(valid.rules), "zp.isObject(valid.rules)" );
    assert.ok( zp.isArray(valid.rules.email), "zp.isArray(valid.rules.email)" );
    assert.ok( zp.isArray(valid.rules.email), "zp.isArray(valid.rules.email)" );
    assert.ok( valid.rules.email.length === 2, "valid.rules.email.length === 2" );
    assert.ok( valid.rules.email[0].name === 'required', "valid.rules.email[0].name === 'required'" );
    assert.ok( zp.isArray(valid.rules.email[0].parameters), "zp.isArray(valid.rules.email[0].parameters)" );
    assert.ok( valid.rules.email[0].parameters.length === 0, "valid.rules.email[0].parameters.length === 0" );
    assert.ok( valid.rules.email[1].name === 'email', "valid.rules.email[1].name === 'email'" );
    assert.ok( valid.rules.email[1].parameters.length === 1, "valid.rules.email[1].parameters.length === 1" );
    assert.ok( valid.rules.email[1].parameters[0] === '1', "valid.rules.email[1].parameters[0] === '1'" );


    valid = zp.validator({ email : 'Maxim'}, {email : ['required','email:1']});

    assert.ok( zp.isObject(valid.rules), "zp.isObject(valid.rules)" );
    assert.ok( zp.isArray(valid.rules.email), "zp.isArray(valid.rules.email)" );
    assert.ok( zp.isArray(valid.rules.email), "zp.isArray(valid.rules.email)" );
    assert.ok( valid.rules.email.length === 2, "valid.rules.email.length === 2" );
    assert.ok( valid.rules.email[0].name === 'required', "valid.rules.email[0].name === 'required'" );
    assert.ok( zp.isArray(valid.rules.email[0].parameters), "zp.isArray(valid.rules.email[0].parameters)" );
    assert.ok( valid.rules.email[0].parameters.length === 0, "valid.rules.email[0].parameters.length === 0" );
    assert.ok( valid.rules.email[1].name === 'email', "valid.rules.email[1].name === 'email'" );
    assert.ok( valid.rules.email[1].parameters.length === 1, "valid.rules.email[1].parameters.length === 1" );
    assert.ok( valid.rules.email[1].parameters[0] === '1', "valid.rules.email[1].parameters[0] === '1'" );

    valid = zp.validator({ email : 'Maxim'}, {email : ['required',{ name : 'email', parameters: [1]}]});

    assert.ok( zp.isObject(valid.rules), "zp.isObject(valid.rules)" );
    assert.ok( zp.isArray(valid.rules.email), "zp.isArray(valid.rules.email)" );
    assert.ok( zp.isArray(valid.rules.email), "zp.isArray(valid.rules.email)" );
    assert.ok( valid.rules.email.length === 2, "valid.rules.email.length === 2" );
    assert.ok( valid.rules.email[0].name === 'required', "valid.rules.email[0].name === 'required'" );
    assert.ok( zp.isArray(valid.rules.email[0].parameters), "zp.isArray(valid.rules.email[0].parameters)" );
    assert.ok( valid.rules.email[0].parameters.length === 0, "valid.rules.email[0].parameters.length === 0" );
    assert.ok( valid.rules.email[1].name === 'email', "valid.rules.email[1].name === 'email'" );
    assert.ok( valid.rules.email[1].parameters.length === 1, "valid.rules.email[1].parameters.length === 1" );
    assert.ok( valid.rules.email[1].parameters[0] === 1, "valid.rules.email[1].parameters[0] === '1'" );

    valid = zp.validator({ email : 'Maxim'}, {email : [ {name : 'required', parameters: []} , {name : 'email', parameters: [1]}]});

    assert.ok( zp.isObject(valid.rules), "zp.isObject(valid.rules)" );
    assert.ok( zp.isArray(valid.rules.email), "zp.isArray(valid.rules.email)" );
    assert.ok( zp.isArray(valid.rules.email), "zp.isArray(valid.rules.email)" );
    assert.ok( valid.rules.email.length === 2, "valid.rules.email.length === 2" );
    assert.ok( valid.rules.email[0].name === 'required', "valid.rules.email[0].name === 'required'" );
    assert.ok( zp.isArray(valid.rules.email[0].parameters), "zp.isArray(valid.rules.email[0].parameters)" );
    assert.ok( valid.rules.email[0].parameters.length === 0, "valid.rules.email[0].parameters.length === 0" );
    assert.ok( valid.rules.email[1].name === 'email', "valid.rules.email[1].name === 'email'" );
    assert.ok( valid.rules.email[1].parameters.length === 1, "valid.rules.email[1].parameters.length === 1" );
    assert.ok( valid.rules.email[1].parameters[0] === 1, "valid.rules.email[1].parameters[0] === '1'" );

});

QUnit.test( "passed", function( assert ) {
    var valid = zp.validator({ name : 'Maxim'}, {name : 'required'});
    assert.ok( valid.passes() === true, "valid.passes() === true" );
    var valid = zp.validator({ name : 'Maxim'}, {test : 'required'});
    assert.ok(valid.passes() === false, "!valid.passes() === false" )

});

QUnit.test( "fails", function( assert ) {
    var valid = zp.validator({ name : 'Maxim'}, {name : 'required'});
    assert.ok( valid.fails() === false, "valid.validator() === false" );
    var valid = zp.validator({ name : 'Maxim'}, {test : 'required'});
    assert.ok(valid.fails() === true, "valid.validator() === true" );
});

QUnit.test( "validated", function( assert ) {
    var valid = zp.validator({ name : 'Maxim'}, {name : 'required'});
    var result = valid.validated();
    assert.ok( zp.isObject(result), "zp.isObject(result)" );
    assert.ok( result.passed === true, "result.passed === true" );
    assert.ok( result.countError === 0, "result.countError === 0" );
    assert.ok( zp.isObject(result.errorKeys), "zp.isObject(result.errorKeys)" );
    assert.ok( zp.isEmpty(result.errorKeys), "zp.isEmpty(result.errorKeys)" );

    valid = zp.validator({}, {name : 'required'});
    result = valid.validated();

    assert.ok( result.passed === false, "result.passed === false" );
    assert.ok( result.countError === 1, "result.countError === 1" );
    assert.ok( zp.isArray(result.errorKeys.name), "zp.isArray(result.errorKeys.name)" );
    assert.ok( result.errorKeys.name.length === 1, "result.errorKeys.name.length === 1" );
    assert.ok( result.errorKeys.name[0].rule === 'required', "result.errorKeys.name[0].rule === 'required'" );
    assert.ok( result.errorKeys.name[0].message === 'name cannot be blank.', "result.errorKeys.name[0].message === 'name cannot be blank.'" );

    valid = zp.validator({}, {name : 'email'});
    result = valid.validated();

    assert.ok( result.passed === true, "result.passed === false" );
    assert.ok( result.countError === 0, "result.countError === 1" );
    assert.ok( zp.isObject(result.errorKeys), "zp.isObject(result.errorKeys)" );
    assert.ok( zp.isEmpty(result.errorKeys), "zp.isEmpty(result.errorKeys)" );

    valid = zp.validator({}, {name : 'email|required'});
    result = valid.validated();
    assert.ok( result.passed === false, "result.passed === false" );
    assert.ok( result.countError === 2, "result.countError === 2" );
    assert.ok( zp.isArray(result.errorKeys.name), "zp.isArray(result.errorKeys.name)" );
    assert.ok( result.errorKeys.name.length === 2, "result.errorKeys.name.length === 2" );
    assert.ok( result.errorKeys.name[0].rule === 'email', "result.errorKeys.name[0].rule === 'required'" );
    assert.ok( result.errorKeys.name[0].message === 'name is not a valid email address.', "result.errorKeys.name[0].message === 'name is not a valid email address.'" );
    assert.ok( result.errorKeys.name[1].rule === 'required', "result.errorKeys.name[1].rule === 'required'" );
    assert.ok( result.errorKeys.name[1].message === 'name cannot be blank.', "result.errorKeys.name[1].message === 'name cannot be blank.'" );7

});

QUnit.test( "getErrors", function( assert ) {
    var
        errors,
        valid = zp.validator({}, {name : 'required|email'});
    errors = valid.getErrors();

    assert.ok( zp.isArray(errors), "zp.isArray(errors)" );
    assert.ok( errors.length === 0, "errors.length === 0" );

    valid.validated();
    errors = valid.getErrors();

    assert.ok( errors.length === 1, "errors.length === 1" );
    assert.ok( errors[0].name === 'name', "errors[0].name === 'name'" );
    assert.ok( zp.isArray(errors[0].message), "zp.isArray(errors[0].message)" );
    assert.ok( errors[0].message.length === 2, "errors[0].message.length === 2" );

});

QUnit.test( "getError", function( assert ) {
    var
        errors,
        valid = zp.validator({}, {name : 'required|email'});
    errors = valid.getError('name');

    assert.ok( zp.isArray(errors), "zp.isArray(errors)" );
    assert.ok( errors.length === 0, "errors.length === 0" );

    valid.validated();
    errors = valid.getError('name');

    assert.ok( errors.length === 2, "errors.length === 2" );

    errors = valid.getError('namea');

    assert.ok( zp.isArray(errors), "zp.isArray(errors)" );
    assert.ok( errors.length === 0, "errors.length === 0" );

});