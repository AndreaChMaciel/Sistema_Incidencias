<?php

namespace App\Http\Controllers;

use App\Models\Asignacion;
use Illuminate\Http\Request;
use App\Models\Incidencia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Psy\Readline\Hoa\Console;

class ControllerTecnico extends Controller
{
    public function cambiarEstado(Request $request, $id)
{
    $incidencia = Incidencia::findOrFail($id);
    $incidencia->cn_id_estado = $request->estado;
    $incidencia->save();
    

    return response()->json(['message' => 'Estado de la incidencia actualizado correctamente']);
}

public function getIncidenciasTecnico(Request $request)
{
    // Obtener el usuario autenticado (técnico)
    $tecnico = $request->user();
    Log::info('Usuario autenticado:', ['usuario' => $tecnico]);

    $cn_id_usuario = 2;

    $asignadas = Incidencia::join('t_asignacion_incidencias', 't_asignacion_incidencias.cn_id_incidencia', '=', 't_incidencias.cn_id_incidencia')
    //->join('t_asignacion_incidencias', 't_asignacion_incidencias.cn_id_usuario', '=', 2)
    //->where('t_asignacion_incidencias.cn_id_usuario', 2)
    ->select('t_incidencias.*')
    ->get();

    Log::info('Incidencias obtenidas:', ['incidencias' => $asignadas]);

    return response()->json($asignadas);
}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
