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