/**
 * Created by Kempfer on 25.05.2015.
 */
module("zp Class");

QUnit.test( "zpClass Create", function( assert ) {

    var animal = zp.create({
        init : function (name,breed) {
            this.name = name;
            this.breed = breed;
        }
    });

    var Dog = zp.create({
        extend: animal
    });
    var tomDog = new Dog('tom','bulldog');
    assert.ok( tomDog instanceof animal, "tomDog instanceof animal" );
    assert.ok( tomDog instanceof animal, "tomDog instanceof Dog" );

    assert.ok( tomDog.name === 'tom', "tomDog.name === 'tom'" );
    assert.ok( tomDog.breed === 'bulldog', "tomDog.breed === 'breed'" );
});

QUnit.test( "zpClass Define", function( assert ) {

    zp.define('zp.classes.Gadget', {
        init : function (type) {
            this.type = type;
            this.info = {};
        },
        printInfo : function () {
            var
                key,
                msg = 'type: '  + this.type;
            for(key in this.info) {
                if(this.info.hasOwnProperty(key)){
                    msg += "\n" + key + ": " + this.info[key];
                }
            }
            console.log(msg);
        }
    });

    zp.define('zp.classes.Iphone', {
        extend: zp.classes.Gadget,
        init : function (type,os,name) {
            this.callParent('init',type);
            this.info.name = name;
            this.info.os = os;
        }
    });

    zp.define('zp.classes.Galaxy', {
        extend : zp.classes.Gadget,
        setInfo : function (name,val) {
            this.info[name] = val;
        }
    });

    var iphone = new zp.classes.Iphone('phone','IOS 7','iphone 5');
    assert.ok( iphone instanceof zp.classes.Gadget, "iphone instanceof zp.classes.Gadget" );
    assert.ok( iphone instanceof zp.classes.Iphone, "iphone instanceof zp.classes.Iphone" );

    assert.ok( iphone.info.name === 'iphone 5', "iphone.info.name === 'iphone 5'" );
    assert.ok( iphone.type === 'phone', "iphone.type === 'phone'" );
    assert.ok( iphone.info.os === 'IOS 7', "iphone.info.os === 'IOS 7'" );

    var galaxy = new zp.classes.Galaxy('phone');
    galaxy.setInfo('os','android');
    galaxy.setInfo('name','galaxy s6');
    assert.ok( galaxy instanceof zp.classes.Gadget, "galaxy instanceof zp.classes.Gadget" );
    assert.ok( galaxy instanceof zp.classes.Galaxy, "galaxy instanceof zp.classes.Galaxy" );

    assert.ok( galaxy.info.name === 'galaxy s6', "galaxy.info.name === 'galaxy s6'" );
    assert.ok( galaxy.type === 'phone', "galaxy.type === 'phone'" );
    assert.ok( galaxy.info.os === 'android', "galaxy.info.os === 'android'" );

    assert.ok(!( galaxy instanceof zp.classes.Iphone), "!( galaxy instanceof zp.classes.Iphone) ");
    assert.ok(!( iphone instanceof zp.classes.Galaxy), "!( galaxy instanceof zp.classes.Iphone) ");




    zp.classes.Gadget = null;
});

QUnit.test( "zpClass Create Function", function( assert ) {

    var animal = zp.create(function (name,breed) {
        this.name = name;
        this.breed = breed;
    });

    var Dog = zp.create({
        extend: animal
    });

    var tomDog = new Dog('tom','bulldog');
    console.log('dog name:' + tomDog.name);
    console.log('dog breed:' + tomDog.breed);
    assert.ok( tomDog instanceof animal, "tomDog instanceof animal" );
    assert.ok( tomDog instanceof Dog, "tomDog instanceof Dog" );

    assert.ok( tomDog.name === 'tom', "tomDog.name === 'tom'" );
    assert.ok( tomDog.breed === 'bulldog', "tomDog.breed === 'bulldog'" );
});