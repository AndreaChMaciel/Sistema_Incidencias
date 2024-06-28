<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 't_usuarios'; // Nombre de la tabla de usuarios

    public function roles()
    {
        return $this->belongsToMany(Rol::class, 't_roles_usuario', 'cn_id_usuario', 'cn_id_rol');
    }
    
    public function hasRole($role)
    {
        return $this->roles()->where('ct_descripcion', $role)->exists();
    }
}

