<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidencia extends Model
{
    use HasFactory;

    protected $table = 't_incidencias'; // Nombre de la tabla


    // Define la clave primaria compuesta
    protected $primaryKey = 'id';

   
    public function diagnosticos()
    {
        return $this->hasMany(Diagnostico::class, 'id');
    }
}
