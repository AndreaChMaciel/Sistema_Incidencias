<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidencia extends Model
{
    use HasFactory;
    protected $table = 't_incidencias'; // Nombre de la tabla


    // Define la clave primaria compuesta
    protected $primaryKey = 'cn_id_incidencia';

    protected $timestap = false;

   
    public function diagnosticos()
    {
        return $this->hasMany(Diagnostico::class, 'cn_id_incidencia');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'cn_id_usuario');
    }
}
