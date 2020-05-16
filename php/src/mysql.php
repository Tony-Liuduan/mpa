<?php
header("Content-Type: text/html;charset=utf-8");
// 1.连接mysql服务器
$con = mysqli_connect("localhost", "root", "");
if (!$con) {
    die("Could not connect:" . mysqli_error($con));
} else {
    // 2.连接数据库
    mysqli_select_db($con, "phplesson");
    // 3.设置编码格式utf8
    mysqli_query($con, "set names 'utf8'");
    mysqli_query($con, "set character set 'utf8'");

    // 获取请求数据
    $newstitle = $_REQUEST['newstitle'];
    $newsimg = $_REQUEST['newsimg'];
    $newscontent = $_REQUEST['newscontent'];
    $addtime = $_REQUEST['addtime'];

    // 4.连接news表, 开始 insert/delete/update/select
    function insertNews($newstitle, $newsimg, $newscontent, $addtime)
    {
        global $con;
        $sql = "INSERT INTO `news`(`newstitle`, `newsimg`, `newscontent`, `addtime`) VALUES ('$newstitle', '$newsimg', '$newscontent','$addtime')";
        return mysqli_query($con, $sql);
    }
    function deleteNews()
    {
        global $con;
        $sql = "DELETE FROM `news` WHERE 1";
        return mysqli_query($con, $sql);
    }
    function deleteNewsById($newsid)
    {
        global $con;
        $sql = "DELETE FROM `news` WHERE `newsid`=$newsid";
        return mysqli_query($con, $sql);
    }
    function updateNews($newsid, $newstitle, $newsimg, $newscontent, $addtime)
    {
        global $con;
        $sql = "UPDATE `news` SET `newstitle`='$newstitle',`newsimg`='$newsimg',`newscontent`='$newscontent',`addtime`='$addtime' WHERE `newsid`=$newsid";
        return mysqli_query($con, $sql);
    }
    function selectNews()
    {
        global $con;
        $sql = "SELECT * FROM `news` WHERE 1";
        return mysqli_query($con, $sql);
    }
    function selectNewsById($newsid)
    {
        global $con;
        $sql = "SELECT * FROM `news` WHERE `newsid`=$newsid";
        return mysqli_query($con, $sql);
    }
    // 5.确认连接上表
    // $result = deleteNews();
    $result = deleteNewsById(39);
    $result = insertNews($newstitle, $newsimg, $newscontent, $addtime);
    $result = updateNews(40, $newstitle, $newsimg, $newscontent, $addtime);
    $result = selectNews();
    $arr = array();
    while ($row = mysqli_fetch_array($result)) {
        array_push($arr, array(
            "newsid" => $row["newsid"],
            "newstitle" => $row["newstitle"],
            "newsimg" => $row["newsimg"],
            "newscontent" => $row["newscontent"],
            "addtime" => $row["addtime"],
        ));
    }
    if (!$result) {
        die("Error" . mysqli_error($con));
    } else {
        echo json_encode(array("code" => 0, "msg" => "success", "data" => $arr), JSON_UNESCAPED_UNICODE);
    }
}
mysqli_close($con);
