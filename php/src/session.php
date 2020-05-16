<?php
include_once('db.php');
$b = 'woshi b';
header("Content-Type: text/html;charset=utf-8");
session_start();
$_SESSION['views'] = 1;
$username = $_REQUEST['username'];
if ($username==='admin') {
    echo json_encode(array('code'=> 0, 'msg'=> '登录成功'), JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(array('code' => -1, 'msg' => 'fail'));
}
?>