<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RolUsuario extends Model
{
    use HasFactory;
    
    protected $table = 't_roles_usuario';
    protected $primaryKey = 'cn_id_rol_usuario';
    public $timestamps = false;

    public function role()
    {
        return $this->belongsTo(Rol::class, 'cn_id_rol');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'cn_id_usuario');
    }
}
