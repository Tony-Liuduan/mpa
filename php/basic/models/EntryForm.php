<?php

namespace app\models;

use Yii;
use yii\base\Model;

class EntryForm extends Model
{
    public $name;
    public $email;

    public function rules()
    {
        return [
            // name 和 email 值都是必须的
            [['name', 'email'], 'required'],
            // email 的值必须满足email规则验证
            ['email', 'email'],
        ];
    }
}
