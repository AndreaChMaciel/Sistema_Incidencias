<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 't_usuarios';
    protected $primaryKey = 'cn_id_usuario';
    protected $fillable = [
        
        'email',
        'password',
    ];

    protected $hidden = [
        'email',
        'password',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    /**
     * Set the user's password.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        // Reemplaza 'ct_contrasena' con el nombre real del campo de contraseña en tu base de datos
        $this->attributes['password'] = $value;
    }

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
       
        return $this->password;
    }

    /**
     * Get the name of the unique identifier for the user.
     *
     * @return string
     */
    public function getAuthIdentifierName()
    {
        return 'email';
    }
    
    public function roles()
    {
        return $this->belongsToMany(Rol::class, 't_roles_usuario', 'cn_id_usuario', 'cn_id_rol');
    }
}
