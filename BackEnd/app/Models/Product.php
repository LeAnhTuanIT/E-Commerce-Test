<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        'price',
        'category_id',
        'quantity_total',  
    ];

    public function categories() {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function product_details() {
        return $this->hasMany(ProductDetail::class);
    }

}
