<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = "t_usuarios";
    protected $primaryKey = "cn_id_usuario";
    public $timestamps = false;
}
