<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Incidencia;

class ControllerIncidencias extends Controller
{

    public function index()
    {
        $incidencias = Incidencia::all();
        return $incidencias;
    }

    public function store(Request $request)
    {

        // Insertar un nuevo registro en la tabla
        $incidencia = new Incidencia();
        $incidencia->ct_nombre = $request->ct_nombre;
        $incidencia->ct_descripcion = $request->ct_descripcion;
        $incidencia->ct_lugar = $request->ct_lugar;
        $incidencia->imagen = $request->imagen;

        // Guardar la incidencia en la base de datos
        $incidencia->save();

        

        
        // Generar el número de incidencia con el formato deseado
        $numeroConsecutivo = str_pad($incidencia->id, 6, '0', STR_PAD_LEFT);
        $year = date('Y');
        $incidencia->ct_id_incidencia = $year . "-" . $numeroConsecutivo;
        $incidencia->save();

        
        return response()->json(['success' => true, 'message' => 'Incidencia registrada con éxito!!']);
        
    }
}
