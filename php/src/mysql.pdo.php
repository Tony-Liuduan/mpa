<?php
header("Content-Type: text/html;charset=utf-8");
$dbms = "mysql"; // 数据库类型
$host = "localhost";
$dbName = "phplesson";
$user = "root";
$pass = "";
// 构建连接串
$dsn = "$dbms:host=$host;dbname=$dbName";
try {
    $dbh = new PDO($dsn, $user, $pass);
    // echo "连接成功";
    // 获取请求数据
    $newstitle = $_REQUEST['newstitle'];
    $newsimg = $_REQUEST['newsimg'];
    $newscontent = $_REQUEST['newscontent'];
    $addtime = $_REQUEST['addtime'];

    // 4.连接news表, 开始 insert/delete/update/select
    function insertNews($newstitle, $newsimg, $newscontent, $addtime)
    {
        global $dbh;
        $sql = "INSERT INTO `news`(`newstitle`, `newsimg`, `newscontent`, `addtime`) VALUES ('$newstitle', '$newsimg', '$newscontent','$addtime')";
        return  $dbh->exec($sql);
    }
    function deleteNews()
    {
        global $dbh;
        $sql = "DELETE FROM `news` WHERE 1";
        return  $dbh->exec($sql);
    }
    function deleteNewsById($newsid)
    {
        global $dbh;
        $sql = "DELETE FROM `news` WHERE `newsid`=$newsid";
        return  $dbh->exec($sql);
    }
    function updateNews($newsid, $newstitle, $newsimg, $newscontent, $addtime)
    {
        global $dbh;
        $sql = "UPDATE `news` SET `newstitle`='$newstitle',`newsimg`='$newsimg',`newscontent`='$newscontent',`addtime`='$addtime' WHERE `newsid`=$newsid";
        return  $dbh->exec($sql);
    }
    function selectNews()
    {
        global $dbh;
        $sql = "SELECT * FROM `news` WHERE 1";
        return $dbh->query($sql);
    }
    function selectNewsById($newsid)
    {
        global $dbh;
        $sql = "SELECT * FROM `news` WHERE `newsid`=$newsid";
        return $dbh->query($sql);
    }

    $res = insertNews($newstitle, $newsimg, $newscontent, $addtime);

    $arr = array();
    foreach (selectNews() as $row) {
        array_push($arr, array(
            "newsid" => $row["newsid"],
            "newstitle" => $row["newstitle"],
            "newsimg" => $row["newsimg"],
            "newscontent" => $row["newscontent"],
            "addtime" => $row["addtime"],
        ));
    }
    if (!$res) {
        die("Error" . $dbh->errorInfo());
    } else {
        echo json_encode(array("code" => 0, "msg" => "success", "data" => $arr), JSON_UNESCAPED_UNICODE);
    }
    // 记得卸磨杀驴
    $dbh = null;
} catch (PDOException $e) {
    die("Error:" . $e->getMessage() . "<br/>");
}
