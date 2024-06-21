<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $table = 't_roles';
    protected $primaryKey = 'cn_id_rol';

    // Relación muchos a muchos con usuarios
    public function usuarios()
    {
        return $this->belongsToMany(Usuario::class, 't_roles_usuario', 'rol_id', 'usuario_id');
    }
}
