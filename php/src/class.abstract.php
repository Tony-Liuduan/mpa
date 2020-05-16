<?php

/**
 * 1. 含有抽象方法的类必须是抽象类 AParent
 * 2. 抽象类不一定含有抽象方法 BParent
 * 3. 抽象类可以存在普通方法
 * 4. 抽象类不能new
 * 5. 基础抽象类，必须把抽象方法都实现了
 */
abstract class AParent
{
    // 抽象方法没有方法体
    public abstract function getSex();

    public function getName()
    {
        echo "王美丽";
    }
}

abstract class BParent
{
    public function getSex()
    {
        echo "man";
    }
}

class ASon extends AParent
{
    public function getSex()
    {
        echo "man";
    }
}

// new AParent();
$son = new Ason();
echo $son->getSex();
echo $son->getName();
