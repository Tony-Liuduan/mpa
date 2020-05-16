<?php

namespace test;

require_once './namespace.a.php';


class Person
{
    function __construct()
    {
        echo 'I am test!';
    }
}

new Person(); //输出 I am test!;
new \a\Person(); //输出 I am one!;
new \test\Person(); //输出 I am test!;
// new \Person(); //throw error



echo "<br>";

namespace animal\dog;

class Life
{
    function __construct()
    {
        echo 'dog life!';
    }
}

namespace animal\cat;

class Life
{
    function __construct()
    {
        echo 'cat life!';
    }
}

// new Life();  //按照代码执行顺序，这里默认animal\cat这个命名空间, cat life!
echo "<br>";
new \animal\dog\Life();  //dog life!
echo "<br>";


use animal\dog;
new dog\Life();  //dog life!
echo "<br>";


use animal\dog\Life as DogLife;
new DogLife(); //dog life!
echo "<br>";
