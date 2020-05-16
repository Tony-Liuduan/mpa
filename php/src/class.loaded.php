<?php
class Car 
{
    private $color;
    protected $price;
    public function __construct($color, $price)
    {
        $this->color = $color;
        $this->price = $price;
    }
    public function sale() {
        echo "父类的颜色是{$this->color},价格是{$this->price}";
    }
}

class Volvo extends Car {
    public function __construct($color, $price)
    {
        parent::__construct($color, $price);
    }
    public function sale()
    {
        parent::sale();
        echo "<br>";
        echo "子类价格是{$this->price}";
        // echo "子类无法输出私有属性{$this->color}";
    }
    public function test() {
        echo $this->price;
    }
}

$volvo = new Volvo("红色", "30万");
// echo $volvo->sale("美丽");
echo $volvo->sale();
// 如果子类有和父类同名方法，则是是重写，要实现重载需要使用parent::方式，
// echo $volvo->sale();

// 私有变量无法继承
// echo $volvo->color;

// 受保护属性可以在子类调用，不能再实例调用
// echo $volvo->test();
