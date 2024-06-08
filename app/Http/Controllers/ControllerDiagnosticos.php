<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Incidencia;
use App\Models\Diagnostico;
use Carbon\Carbon;
class ControllerDiagnosticos extends Controller
{
    public function registrarDiagnostico($id, Request $request)
    {
        $request->validate([
            'ct_descripcion' => 'required|string',
            'cn_tiempo_estimado' => 'required|integer',
            'ct_observaciones' => 'required|string',
            'imagen' => 'required|string'
        ]);

        

        $diagnostico = new Diagnostico();
        $diagnostico->id = $id;
        $diagnostico->ct_fecha = Carbon::now()->toDateString(); // Generar fecha actual
        $diagnostico->ct_hora = Carbon::now()->toTimeString(); // Generar hora actual
        $diagnostico->ct_descripcion = $request->ct_descripcion;
        $diagnostico->cn_tiempo_estimado = $request->cn_tiempo_estimado;
        $diagnostico->ct_observaciones = $request->ct_observaciones;
        $diagnostico->imagen = $request->imagen;
        $diagnostico->save();

        return response()->json(['mensaje' => 'Diagnóstico registrado con éxito']);
    }
}
