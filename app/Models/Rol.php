<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $table = 't_roles';
    protected $primaryKey = 'cn_id_rol';
    public $timestamps = false;

    public function users()
    {
        return $this->belongsToMany(User::class, 't_roles_usuario', 'cn_id_rol', 'cn_id_usuario');
    }
}
