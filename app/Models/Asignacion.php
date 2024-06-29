<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asignacion extends Model
{
    use HasFactory;
    protected $table = 't_asignacion_incidencias';
    protected $primaryKey = 'cn_id_asignacion_incidencia';
    public $timestamps = false;

    protected $fillable = [
        'cn_id_incidencia',
        'cn_id_usuario',
        'cn_cantidad_tecnicos',
    ];
}
