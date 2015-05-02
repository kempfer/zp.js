<?php
/**
 * Created by PhpStorm.
 * User: Kempfer
 * Date: 01.05.2015
 * Time: 15:47
 */



if(isset($_GET['test']) && $_GET['test'] == 1){
    echo 'ok';
    exit;
}


if(isset($_GET['test']) && $_GET['test'] == 2){
    echo json_encode(['test' => 'ok']);
    exit;
}

if(isset($_POST['test']) && $_POST['test'] == 3){
    echo 'ok';
    exit;
}

if(isset($_POST['test']) && $_POST['test'] == 4){
    echo json_encode(['test' => 'ok']);
    exit;
}


if(isset($_POST['test']) && $_POST['test'] == 5){
    echo 'ok';
    exit;
}