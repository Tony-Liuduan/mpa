<?php

/**
 * 类的声明
 */
class Person
{
    public $x;
    public $age;
    private $money;
    protected $sex = "man";
    public function __construct($name, $idcard = "")
    {
        $this->name = $name;
        $this->idcard = $idcard;
        echo "<br/><br/>hello {$this->name}, your idcard is {$this->idcard}";
    }
    public function __destruct()
    {
        // 用于资源释放操作，数据库关闭，读取文件关闭
        // 对象被销毁的时候执行，即没有代码再执行时
        echo "<hr/>bye bye {$this->name}, bye bye {$this->idcard}<br/><br/>";
    }
    public function say($word)
    {
        echo "<br/><br/>use public say func, echo she say {$word}";
    }
    public function info()
    {
        $this->say('hi');
        return $this->age;
    }
    protected function getName()
    {
        echo $this->name;
    }
    // 私有方法
    private function getIdcard()
    {
        echo $this->idcard;
    }
    public function __set($key, $value)
    {
        // __set() 方法用于设置私有、保护属性值
        // ps:魔术方法set只针对私有、保护变量 and 在类内部set属性时生效
        echo "__set " . $key . ">>>>>>" . $value . "<br/>";
        if ($key === "money") {
            $this->$key = "__set拦截设置money为1000.00美金";
        } else if ($key === "sex") {
            $this->$key = "__set拦截设置sex为奇男子";
        } else {
            $this->$key = $value;
        }
    }
    public function __get($key)
    {
        // __get() 方法用于获取私有、保护属性值
        // ps:魔术方法set只针对私有、保护变量 and 在类内部get属性值时生效
        if ($key === "idcard") {
            return "__get拦截返回idcard为1998";
        } else if ($key === "money") {
            return "__get拦截返回money为5000.00美金";
        } else {
            return $this->$key;
        }
    }
    public function __isset($key)
    {
        // 在调用isset方法时执行
        // __isset() 方法用于检测私有属性值是否被设定
        // ps:魔术方法isset只针对私有、保护变量
        echo "__isset " . $key . "<br/>";
        return isset($this->$key);
    }
    public function __unset($key)
    {
        echo "__unset " . $key . "<br/>";
        unset($this->$key);
    }
}




/*****************  测试用例  *****************/
/**
 * 测试用例1：检测 __construct、__destruct
 * 结论：执行顺序先进先出
 */
// new Person("小新");
// new Person("风涧");




$bandit = new Person("吴美丽", "编号001");
/**
 * 测试用例2：检测类的封装
 */
// echo "<br/>";
// $bandit->age = 30;
// $age = $bandit->info();
// echo "<br/>";
// echo "use public info func, get age is: ", $age;
// echo "<br/>";




/**
 * 测试用例3：检测prevate、protected方法不可外部调用
 * 结论：
 * prevate、protected方法不可在外部调用，报错
 * prevate、protected属性可以在外部 get value && set value
 * prevate、protected属性能被__set __get 拦截
 */
// echo "<br/>";
// $bandit->getIdcard();
// $bandit->getName();
// $bandit->money = "好多钱";
// echo $bandit->money;
// echo "<br/>";
// $bandit->sex = "奇女子";
// echo $bandit->sex;
// echo "<br/>";




/**
 * 测试用例4：检测prevate变量的set、get拦截
 * 结论：能拦截
 */
// echo "<br/>";
// $bandit->money = "一个亿";
// echo $bandit->money;
// echo "<br/>";




/**
 * 测试用例5：检测public变量的set、get拦截
 * 结论：不能拦截
 */
// echo "<br/>";
// $bandit->idcard = "编号007";
// echo $bandit->idcard;
// echo "<br/>";




/**
 * 测试用例6：检测__isset方法
 * isset测定对象里面的（私有、保护）成员是否被设定时
 */
// echo "<br/>";
// var_dump(isset($bandit->x));
// echo "<br/>";
// var_dump(isset($bandit->age));
// echo "<br/>";
// var_dump(isset($bandit->money));
// echo "<br/>";
// var_dump(isset($bandit->sex));
// echo "<br/>";



/**
 * 测试用例7：删除私有属性
 * unset测定对象里面的（私有、保护）成员是否被设定时
 */
// echo "<br/>";
// unset($bandit->sex);
// echo "<br/>" . $bandit->sex;
