<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_books".
 *
 * @property int $id
 * @property string $name
 * @property string $author
 * @property string|null $isbn
 * @property float $price
 * @property string $memo
 * @property string $create_date
 */
class Books extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 't_books';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'author', 'memo', 'create_date'], 'required'],
            [['price'], 'number'],
            [['create_date'], 'safe'],
            [['name', 'author'], 'string', 'max' => 100],
            [['isbn'], 'string', 'max' => 20],
            [['memo'], 'string', 'max' => 500],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'author' => 'Author',
            'isbn' => 'Isbn',
            'price' => 'Price',
            'memo' => 'Memo',
            'create_date' => 'Create Date',
        ];
    }
}
