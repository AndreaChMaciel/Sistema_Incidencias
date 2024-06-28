<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 't_usuarios'; // Nombre de la tabla de usuarios

    protected $primaryKey = 'cn_id_usuario';
    public function roles()
    {
        return $this->belongsToMany(Rol::class, 't_roles_usuario', 'cn_id_usuario', 'cn_id_rol');
    }
    
    public function hasRole($role)
    {
        return $this->roles()->where('ct_descripcion', $role)->exists();
    }
 /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}

