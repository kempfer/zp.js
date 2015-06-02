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


QUnit.test( "required", function( assert ) {
    var valid = zp.validator({}, {name : 'required'});
    assert.ok( valid.passes() === false, "valid.passes() === false" );

    valid = zp.validator({name : ''}, {name : 'required'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({name : 's'}, {name : 'required'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );
});

QUnit.test( "email", function( assert ) {
    var valid = zp.validator({}, {email : 'email'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({email : 'ss'}, {email : 'required|email'});


    assert.ok( valid.fails() === true, "valid2.fails() === true" );


    valid = zp.validator({email : 'zotov_mv@groupbwt.com'}, {email : 'email'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({email : 'zotov_mv+1@groupbwt.com'}, {email : 'email'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({email : 'zotov_mv@'}, {email : 'email'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({email : 'zotov_mv@groupbwt'}, {email : 'email'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({email : 'zotov_mv@groupbwt.'}, {email : 'email'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({email : 'zotov_mv@groupbwt.c'}, {email : 'email'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );
});

QUnit.test( "alpha", function( assert ) {
    var valid = zp.validator({}, {name : 'alpha'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name: 's'}, {name : 'alpha'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name:1}, {name : 'alpha'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({name: '1 maxim'}, {name : 'alpha'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({name: 'm maxim'}, {name : 'alpha'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({name: 'maxim'}, {name : 'alpha'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

});

QUnit.test( "alphaNumeric", function( assert ) {

    var valid = zp.validator({}, {name : 'alphaNumeric'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name: 's 1'}, {name : 'alphaNumeric'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({name: 's1'}, {name : 'alphaNumeric'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name: '1'}, {name : 'alphaNumeric'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );
});

QUnit.test( "alphaDash", function( assert ) {
    var valid = zp.validator({}, {name : 'alphaDash'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name: 's 1'}, {name : 'alphaDash'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({name: 's1'}, {name : 'alphaDash'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name: '1'}, {name : 'alphaDash'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name: 's-1'}, {name : 'alphaDash'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );
});

QUnit.test( "numeric", function( assert ) {
    var valid = zp.validator({}, {name : 'numeric'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name : '1'}, {name : 'numeric'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name : 1}, {name : 'numeric'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name : 'd1'}, {name : 'numeric'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({name : '1-1'}, {name : 'numeric'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({name : '1.1'}, {name : 'numeric'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name : 1.124}, {name : 'numeric'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

});

QUnit.test( "numericDash", function( assert ) {
    var valid = zp.validator({}, {name : 'numericDash'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name : '1'}, {name : 'numericDash'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name : 1}, {name : 'numericDash'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    valid = zp.validator({name : 'd1'}, {name : 'numericDash'});

    assert.ok( valid.fails() === true, "valid.fails() === true" );

    valid = zp.validator({name : '1-1'}, {name : 'numericDash'});

    assert.ok( valid.passes() === true, "valid.fails() === true" );

    valid = zp.validator({name : '1 1'}, {name : 'numericDash'});

    assert.ok( valid.passes() === true, "valid.fails() === true" );
});

QUnit.test( "url", function( assert ) {
    var valid = zp.validator({}, {name : 'url'});

    assert.ok( valid.passes() === true, "valid.passes() === true" );

    assert.ok( zp.validator({url: 'google.ua'}, {url : 'url'}).fails(), "zp.validator({url: 'google.ua'}, {url : 'url'}).fails()" );

    assert.ok( zp.validator({url: 'http://google.ua'}, {url : 'url'}).passes(), "zp.validator({url: 'http://google.ua'}, {url : 'url'}).passes()" );
    assert.ok( zp.validator({url: 'https://google.ua'}, {url : 'url'}).passes(), "zp.validator({url: 'https://google.ua'}, {url : 'url'}).passes()" );
    assert.ok( zp.validator({url: 'htt://google.ua'}, {url : 'url'}).fails(), "zp.validator({url: 'htt://google.ua'}, {url : 'url'}).fails()" );
    assert.ok( zp.validator({url: 'https://www.google.de/search?q=yii+framework&ie=utf-8&oe=utf-8&rls=org.mozilla:de:official&client=firefox-a&gws_rd=cr'}, {url : 'url'}).passes(), "zp.validator({url: 'https://www.google.de/search?q=yii+framework&ie=utf-8&oe=utf-8&rls=org.mozilla:de:official&client=firefox-a&gws_rd=cr'}, {url : 'url'}).passes()" );
    assert.ok( zp.validator({url: 'ftp://ftp.ruhr-uni-bochum.de/'}, {url : 'url'}).fails(), "zp.validator({url: 'ftp://ftp.ruhr-uni-bochum.de/'}, {url : 'url'}).fails()" );
    assert.ok( zp.validator({url: 'http://invalid,domain'}, {url : 'url'}).fails(), "zp.validator({url: 'http://invalid,domain'}, {url : 'url'}).fails()" );
    assert.ok( zp.validator({url: 'http://äüö?=!"§$%&/()=}][{³²€.edu'}, {url : 'url'}).fails(), "zp.validator({url: 'http://äüö?=!$%&/()=}][{³²€.edu}, {url : 'url'}).fails()" );
});