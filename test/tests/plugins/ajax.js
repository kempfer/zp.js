/**
 * Created by Kempfer on 02.05.2015.
 */
module("zp Ajax");
asyncTest('GET', function(){

    expect(6);
    QUnit.stop(5);
    zp.ajax({
        url : '/index.php?test=1',
        method : 'GET',
        onLoad: function (response) {
            equal(response,'ok', 'Send Get "/index.php?test=1"');
            start();
        }
    });

    zp.ajax({
        url: '/index.php',
        method: 'GET',
        data: {test: 1},
        onLoad: function (response) {
            equal(response, 'ok', 'Send Get "/index.php"');
            start();
        }
    });

    zp.ajax({
        url: '/index.php',
        method: 'GET',
        data: {test: 2},
        responseType: 'json',
        onLoad: function (response) {
            equal(response.test, 'ok', 'Send Get "/index.php" response JSON. use responseType: "json"');
            start();
        }
    });

    zp.ajax({
        url: '/index.php',
        method: 'GET',
        data: {test: 2},
        responseType: 'JSON',
        onLoad: function (response) {
            equal(response.test, 'ok', 'Send Get "/index.php" response JSON. use responseType: "JSON"');
            start();
        }
    });

    zp.ajax({
        url: '/index.php',
        method: 'get',
        data: {test: 2},
        responseType: 'JSON',
        onLoad: function (response) {
            equal(response.test, 'ok', 'Send Get "/index.php" response JSON. use method: "get"');
            start();
        }
    });

    zp.ajax({
        url: '/index.php',
        method: 'get',
        data: "test=2",
        responseType: 'JSON',
        onLoad: function (response) {
            equal(response.test, 'ok', 'Send Get "/index.php" response JSON. data: "test=2"');
            start();
        }
    });

});

asyncTest('POST', function(){

    expect(2);
    QUnit.stop(1);


    zp.ajax({
        url: '/index.php',
        method: 'POST',
        data: {test: 3},
        onLoad: function (response) {
            equal(response, 'ok', 'Send POST "/index.php"');
            start();
        }
    });

    zp.ajax({
        url: '/index.php',
        method: 'POST',
        data: {test: 4},
        responseType: 'json',
        onLoad: function (response) {
            equal(response.test, 'ok', 'Send POST "/index.php" response JSON');
            start();
        }
    });

});

if(!zp.isUndefined(window.FormData)){
    asyncTest('from Data', function(){

        expect(1);

        var form =  document.createElement('form');
        form.setAttribute('id','test-form');
        var input = document.createElement('input');
        input.setAttribute('type','hidden');
        input.setAttribute('name','test');
        input.value = '5';
        form.appendChild(input);
        document.body.appendChild(form);


        zp.ajax({
            url: '/index.php',
            method: 'POST',
            data: new FormData( document.getElementById('test-form')),
            onLoad: function (response) {
                equal(response, 'ok', 'Send POST Form Data "/index.php"');
                start();
            }
        });

    });
}


