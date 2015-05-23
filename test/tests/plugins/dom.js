/**
 * Created by Kempfer on 15.05.2015.
 */

module("zp Dom");

QUnit.test( "isElement", function( assert ) {
    //is Element
    assert.ok( zp.dom.isElement(document.body), "zp.dom.isElement(document.body)" );
    assert.ok( !zp.dom.isElement({}), "zp.dom.isElement({})" );
});

QUnit.test( "width height", function( assert ) {
    //width()
    assert.ok( typeof zp.dom.width() === typeof 1, "typeof zp.dom.width() === typeof 1" );
    //height()
    assert.ok( typeof zp.dom.height() === typeof 1, "typeof zp.dom.height() === typeof 1" );
});



QUnit.test( "Create", function( assert ) {
    //create
    var createDiv = zp.dom.create('div');
    assert.ok( zp.dom.create('div') instanceof zp.dom, "Create div: zp.dom.create('div') instanceof zp.dom" );
    assert.ok( zp.dom.isElement(createDiv[0]), "Create div: zp.dom.isElement(createDiv[0]))" );
    assert.ok( zp.dom.isElement(createDiv.first), "Create div: zp.dom.isElement(createDiv.first))" );
    assert.ok( createDiv.first.tagName === "DIV", "createDiv.first.tagName === 'DIV'" );
    assert.ok( createDiv.length === 1, "createDiv.length === 1" );

    //create div use attr
    var createAttr = zp.dom.create('div',{ test : 1, data: 2});
    assert.ok( createAttr.first.getAttribute('test') == 1, "createAttr.getAttribute('test') === 1" );
    assert.ok( createAttr.first.getAttribute('data') == 2, "createAttr.getAttribute('data') == 2" );

});

QUnit.test( "Query by id", function( assert ) {
    var
        findElementId,
        elementId = document.createElement('div');
    elementId.setAttribute('id','div-id');
    document.body.appendChild(elementId);

    findElementId = zp.dom.query('#div-id');
    assert.ok( zp.isArray(findElementId), "zp.isArray(findElementId)" );
    assert.ok( findElementId.length === 1, "findElementId.length === 1" );
    assert.ok( findElementId[0] === elementId, "findElementId[0] === elementId" );
    assert.ok( findElementId[0].getAttribute('id') === 'div-id', "findElementId[0].getAttribute('id') === 'div-id'" );
    document.body.removeChild(elementId);
});

QUnit.test( "Query by Class", function( assert ) {
    var
        findElementClass,
        elementClass = document.createElement('span');
    elementClass.setAttribute('class','span-class');
    document.body.appendChild(elementClass);

    findElementClass = zp.dom.query('.span-class');
    assert.ok( zp.isArray(findElementClass), "zp.isArray(findElementClass)" );
    assert.ok( findElementClass.length === 1, "findElementClass.length === 1" );
    assert.ok( findElementClass[0] === elementClass, "findElementClass[0] === elementClass" );
    assert.ok( findElementClass[0].getAttribute('class') === 'span-class', "findElementClass[0].getAttribute('class') === 'span-class'" );
    document.body.removeChild(elementClass);
});

QUnit.test( "Query by Tag Name", function( assert ) {
    var
        findElementTag,
        elementTag = document.createElement('ul');
    document.body.appendChild(elementTag);

    findElementTag = zp.dom.query('ul');
    assert.ok( zp.isArray(findElementTag), "zp.isArray(findElementTag)" );
    assert.ok( findElementTag.length === 1, "findElementTag.length === 1" );
    assert.ok( findElementTag[0] === elementTag, "findElementTag[0] === findElementTag" );
    assert.ok( findElementTag[0].tagName === 'UL', "findElementTag[0].tagName === 'UL" );
    document.body.removeChild(elementTag);
});

QUnit.test( "Query Selector", function( assert ) {
    var
        findElement,
        element = document.createElement('input');
    element.setAttribute('type','text');
    document.body.appendChild(element);

    findElement = zp.dom.query('input[type="text"]');
    assert.ok( zp.isArray(findElement), "zp.isArray(findElement)" );
    assert.ok( findElement.length === 1, "findElement.length === 1" );
    assert.ok( findElement[0] === element, "findElement[0] === element" );
    assert.ok( findElement[0].getAttribute('type') === 'text', "findElement[0].getAttribute('type') === 'text'" );
    document.body.removeChild(element);
});

QUnit.test( "Constructor ", function( assert ) {
    var
        findElement,
        element = document.createElement('div');
    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');
    assert.ok( findElement instanceof zp.dom, "'#div-id' findElement instanceof zp.dom" );
    assert.ok( findElement.length === 1, "'#div-id' findElement.length === 1" );
    assert.ok( findElement.first === element, "'#div-id' findElement.first=== element" );
    assert.ok( findElement.get(0) === element, "'#div-id' findElement.get(0) === element" );
    assert.ok( findElement.get() === element, "'#div-id' findElement.get() === element" );

    findElement = zp.dom(element);
    assert.ok( findElement instanceof zp.dom, "element findElement instanceof zp.dom" );
    assert.ok( findElement.length === 1, "element findElement.length === 1" );
    assert.ok( findElement.first === element, "element findElement.first=== element" );
    assert.ok( findElement.get(0) === element, "element findElement.get(0) === element" );
    assert.ok( findElement.get() === element, "element findElement.get() === element" );

    findElement = zp.dom([element]);
    assert.ok( findElement instanceof zp.dom, "[element] findElement instanceof zp.dom" );
    assert.ok( findElement.length === 1, "[element] findElement.length === 1" );
    assert.ok( findElement.first === element, "[element] findElement.first=== element" );
    assert.ok( findElement.get(0) === element, "[element] findElement.get(0) === element" );
    assert.ok( findElement.get() === element, "[element] findElement.get() === element" );

    findElement = zp.dom();

    assert.ok( findElement instanceof zp.dom, "findElement instanceof zp.dom" );
    assert.ok( findElement.length === 1, "indElement.length === 1" );
    assert.ok( findElement.first === document, "findElement.first=== element" );
    assert.ok( findElement.get(0) === document, "findElement.get(0) === element" );
    assert.ok( findElement.get() === document, "findElement.get() === element" );

    document.body.removeChild(element);
});


QUnit.test( "size ", function( assert ) {
    var
        findElement,
        size,
        emptyElement,
        emptySize,
        element = document.createElement('div');
    element.setAttribute('id','div-id');
    element.style.width = "300px";
    element.style.height = "300px";
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');
    size = findElement.size;
    assert.ok( zp.isObject(size), "SIZE: zp.isObject(size)" );
    assert.ok( size.width === 300, "SIZE: size.width === 300" );
    assert.ok( size.height === 300, "SIZE: size.height === 300" );
    emptyElement = zp.dom('ddddd');
    emptySize = emptyElement.size;
    assert.ok( zp.isObject(emptySize), "SIZE: zp.isObject(emptySize)" );
    assert.ok( emptySize.width === 0, "SIZE: size.width === 0" );
    assert.ok( emptySize.height === 0, "SIZE: size.height === 0" );
    document.body.removeChild(element);
});

QUnit.test( "offset", function( assert ) {
    var
        findElement,
        offset,
        element = document.createElement('div');
    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');

    offset = findElement.offset;
    assert.ok( zp.isObject(offset), "zp.isObject(offset)" );
    assert.ok( typeof offset.x === typeof 1, "typeof offset.x === typeof 1" );
    assert.ok( typeof offset.y ===  typeof 1, "typeof offset.y ===  typeof 1" );

    document.body.removeChild(element);
});

QUnit.test( "parent", function( assert ) {
    var
        findElement,
        parent,
        element = document.createElement('div');
    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');

    parent = findElement.parent();
    assert.ok( parent instanceof zp.dom, "parent instanceof zp.dom" );
    assert.ok( parent.first === document.body, "parent.first === document.body" );
    assert.ok(zp.dom('#div-id').parent(3).first === document, "zp.dom('#div-id').parent(2).first === document" );

    document.body.removeChild(element);
});

QUnit.test( "each", function( assert ) {
    var
        findElement,
        parent,
        elementEach,
        indexEach,
        element = document.createElement('div');
    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');
    findElement.each(function (el,index) {
        elementEach = el;
        indexEach = index;
    });

    assert.ok( zp.dom.isElement(elementEach), "zp.dom.isElement(elementEach)" );
    assert.ok( zp.isNumber(indexEach), " zp.isNumber(indexEach)" );
    assert.ok(elementEach === element, "elementEach === element" );

    document.body.removeChild(element);
});

QUnit.test( "removeAttr", function( assert ) {
    var
        findElement,
        element = document.createElement('div');
    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');
    findElement.removeAttr('id');

    assert.ok( element.getAttribute('id') === null , "element.getAttribute('id') === null" );

    document.body.removeChild(element);
});

QUnit.test( "clone", function( assert ) {
    var
        findElement,
        clone,
        element = document.createElement('div');
    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');
    clone = findElement.clone();

    assert.ok( clone instanceof zp.dom, "clone instanceof zp.dom" );
    assert.ok( clone.first !== element, "clone.first !== element" );
    assert.ok( zp.dom.isElement(clone.first), "zp.dom.isElement(clone.first)" );

    document.body.removeChild(element);
});

QUnit.test( "remove", function( assert ) {
    var
        findElement,
        element = document.createElement('div');
    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');


    assert.ok( findElement instanceof zp.dom, "findElement instanceof zp.dom" );
    assert.ok( zp.dom.isElement(findElement.first), "zp.dom.isElement(findElement.first)" );

    findElement.remove();

    assert.ok( document.getElementById('div-id') === null, "document.getElementById('div-id') === null" );

});

QUnit.test( "empty", function( assert ) {
    var
        findElement,
        element = document.createElement('div'),
        child = document.createElement('span');

    element.setAttribute('id','div-id');
    element.appendChild(child);
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');


    assert.ok( zp.dom.isElement(document.querySelector('#div-id span')), "zp.dom.isElement(document.querySelector('#div-id span'))" );

    findElement.empty();

    assert.ok( document.querySelector('#div-id span') === null, "document.querySelector('#div-id span') === null" );
    document.body.removeChild(element);
});

QUnit.test( "find", function( assert ) {
    var
        findElement,
        element = document.createElement('div'),
        child = document.createElement('span');

    element.setAttribute('id','div-id');
    element.appendChild(child);
    document.body.appendChild(element);

    findElement = zp.dom('#div-id').find('span');

    assert.ok( findElement instanceof zp.dom, "findElement instanceof zp.dom" );
    assert.ok( zp.dom.isElement(findElement.first), "zp.dom.isElement(findElement.first)" );
    assert.ok( findElement.first  === child, "findElement.first  === child" );

    document.body.removeChild(element);
});

QUnit.test( "append", function( assert ) {
    var
        findElement,
        element = document.createElement('div'),
        child = document.createElement('span');

    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id').append(child);

    assert.ok( findElement instanceof zp.dom, "findElement instanceof zp.dom" );
    assert.ok( zp.dom.isElement(findElement.first), "zp.dom.isElement(findElement.first)" );
    assert.ok( zp.dom('#div-id').find('span').first  === child, "fzp.dom('#div-id').find('span').first  === child" );

    document.body.removeChild(element);
});


QUnit.test( "addClass", function( assert ) {
    var
        findElement,
        element = document.createElement('div');

    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');
    findElement.addClass('test-class');

    assert.ok( element.className === 'test-class', "element.className === 'test-class'" );

    element.className = '';
    findElement.addClass(['test-class','test-class-2']);

    assert.ok( element.className === 'test-class test-class-2', "element.className === 'test-class test-class-2'" );

    findElement.addClass(['test-class','test-class-2']);

    assert.ok( element.className === 'test-class test-class-2', "element.className === 'test-class test-class-2'" );
    document.body.removeChild(element);
});

QUnit.test( "removeClass", function( assert ) {
    var
        findElement,
        element = document.createElement('div');

    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    element.className = 'test-class test-class-2 test-class-3';

    findElement = zp.dom('#div-id');
    findElement.removeClass('test-class');

    assert.ok( element.className === 'test-class-2 test-class-3', "element.className === 'test-class-2 test-class-3'" );

    findElement.removeClass(['test-class-2', 'test-class-3']);

    assert.ok( element.className === '', "element.className === ''" );

    document.body.removeChild(element);
});

QUnit.test( "hasClass", function( assert ) {
    var
        findElement,
        element = document.createElement('div');

    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    element.className = 'test-class';

    findElement = zp.dom('#div-id');

    assert.ok( findElement.hasClass('test-class'), "findElement.hasClass('test-class')" );


    assert.ok(!findElement.hasClass('test-clvvvvass'), "findElement.hasClass('test-clvvvvass')" );

    document.body.removeChild(element);
});

QUnit.test( "toggleClass", function( assert ) {
    var
        findElement,
        element = document.createElement('div');

    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    element.className = 'test-class';

    findElement = zp.dom('#div-id');

    findElement.toggleClass('test-class');

    assert.ok( element.className === '', "element.className === ''" );

    findElement.toggleClass('test-class');

    assert.ok( element.className === 'test-class', "element.className === 'test-class'" );

    document.body.removeChild(element);
});

QUnit.test( "toArray", function( assert ) {
    var
        findElement,
        element = document.createElement('div');

    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');
    assert.ok( zp.isArray(findElement.toArray()), "zp.isArray(findElement.toArray())," );

    assert.ok( findElement.toArray().length === 1, "findElement.toArray().length === 1" );

    document.body.removeChild(element);
});

QUnit.test( "text", function( assert ) {
    var
        findElement,
        element = document.createElement('div'),
        innerText = document.body.innerText == null ? 'textContent' : 'innerText';

    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');
    assert.ok( findElement.text() === '', "findElement.text() === ''" );

    findElement.text('text innerText');

    assert.ok( element[innerText] === 'text innerText', "element[innerText] === 'text innerText'" );

    document.body.removeChild(element);
});

QUnit.test( "attr", function( assert ) {
    var
        findElement,
        element = document.createElement('div'),
        innerText = document.body.innerText == null ? 'textContent' : 'innerText';

    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');

    findElement.attr('test',20);

    assert.ok( element.getAttribute('test') == 20, "element.getAttribute('test') == 20" );

    assert.ok( findElement.attr('test') == 20, "findElement.attr('test')" );

    findElement.attr({'info' : 1, 'info2' : 2});

    assert.ok( element.getAttribute('info') == 1, "element.getAttribute('info') == 1" );
    assert.ok( element.getAttribute('info2') == 2, "element.getAttribute('info2') == 2" );

    document.body.removeChild(element);
});

QUnit.test( "css", function( assert ) {
    var
        findElement,
        element = document.createElement('div'),
        innerText = document.body.innerText == null ? 'textContent' : 'innerText';

    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');

    findElement.css('width',20);

    assert.ok( element.style.width == '20px', "element.style.width == '20px'" );

    findElement.css({'height' : '10px', 'z-index' : '5', opacity : 0.5});

    assert.ok( element.style.height == '10px', "element.style.height == '10px'" );

    assert.ok( element.style.zIndex == '5', "element.style.zIndex == '5'" );

    assert.ok( element.style.opacity == '0.5', "element.style.opacity == '0.5'" );

    assert.ok( findElement.css('width') == '20px', "findElement.css('width') == '20px'" );
    assert.ok( findElement.css('opacity') == '0.5', "indElement.css('opacity') == '0.5'" );

    document.body.removeChild(element);
});

QUnit.test( "html", function( assert ) {
    var
        findElement,
        element = document.createElement('div');

    element.setAttribute('id','div-id');
    document.body.appendChild(element);

    findElement = zp.dom('#div-id');

    assert.ok( findElement.html() === '', "findElement.html() === ''" );

    findElement.html('<span></span>');

    assert.ok( element.innerHTML === '<span></span>', " element.innerHTML === '<span></span>'" );

    assert.ok( findElement.html() === '<span></span>', "findElement.html() === '<span></span>'" );

    document.body.removeChild(element);
});






