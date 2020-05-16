<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>learn-php</title>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
</head>

<body>
    <?php
    // require_once('a.php');
    // include_once('a.php');
    // $a = 'aaa';
    // function test()
    // {
    //     global $a;
    //     echo $a;
    // }
    // test();
    // echo $GLOBALS['b']
    ?>

    <?php
    // $arr = array('0' => 'p', 1 => 'y');
    // echo json_encode($arr);
    // $arrayTest = array('0' => "苹果", 1 => "测试");
    // echo json_encode($arrayTest, JSON_UNESCAPED_UNICODE);
    ?>

    <?php
    // require_once('session.php');
    // echo "Pageviews=" . $_SESSION['views'];
    ?>

    <form action="src/mysql.pdo.php" method="post">
        <p>
            <label for="newstitle">新闻标题</label>
            <input type="text" id="newstitle" name="newstitle">
        </p>
        <p>
            <label for="newsimg">新闻地址</label>
            <input type="url" id="newsimg" name="newsimg">
        </p>
        <p>
            <label for="newscontent">新闻内容</label>
            <textarea id="newscontent" name="newscontent"></textarea>
        </p>
        <p>
            <label for="addtime">新闻时间</label>
            <input type="date" id="addtime" name="addtime">
        </p>
        <button type="submit" id="btn">提交</button>
        <button type="reset">重置</button>
    </form>

    <script>
        $('#btn').click(function(e) {
            e.preventDefault();
            const form = e.target.form;
            $.ajax({
                url: form.action,
                type: form.method,
                contentType: form.enctype,
                data: $(form).serialize(),
                dataType: 'json',
                success: function(data) {
                    console.log(data)
                    // alert(data.msg);
                },
                error: function(e) {
                    console.log(e);
                    // alert(e.responseText);
                }
            })
        });
    </script>

</body>

</html>