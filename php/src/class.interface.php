<?php

/**
 * 1. 接口可以声明常亮
 * 2. 接口中的方法都是抽象方法，不需要abstract, 必须被类实现
 * 3. 接口不能被new
 * 4. 接口需要类去实现
 * 5. 一个类可以继承多个接口，一个类不能继承多个类
 * 6. 静态属性实例成员和类都可以访问 :: 的形式
 */
interface IEat
{
    // 常亮是不能被修改的
    const RICE = "rice";
    public function like();
    public function dislike();
}

interface IRun
{
    public function rou100();
}
abstract class PP implements IEat, IRun
{
};
class ZL extends PP
{
    // 相当于放在类的static上的属性，同事子类会继承父类的static属性
    const DATA = "staticData";
    public function like()
    {
        echo "coffee";
    }
    public function dislike()
    {
    }
    public function rou100()
    {
    }
    public function test()
    {
        echo self::DATA;
    }
    public static function testStatic()
    {
        echo self::DATA;
    }
}


$p = new ZL();
// 神奇，实例可以访问类上的静态属性
echo $p::RICE;
echo "<br>";
$p->like();
echo "<br>";
$p->test();
echo "<br>";
ZL::testStatic();
echo "<br>";
echo ZL::DATA;
echo "<br>ZL";
echo ZL::RICE;
echo "<br>PP";
echo PP::RICE;
echo "<br>IEat";
echo IEat::RICE;
