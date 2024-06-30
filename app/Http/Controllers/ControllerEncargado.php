<?php

namespace App\Http\Controllers;
use App\Models\Asignacion;
use App\Models\Incidencia;
use App\Models\Usuario;
use App\Models\User;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class ControllerEncargado extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todas las incidencias con estado 0 (Registrado) y la descripción del estado
        $incidencias = Incidencia::join('t_estados', 't_incidencias.cn_id_estado', '=', 't_estados.cn_id_estado')
        ->where('t_incidencias.cn_id_estado', 0)
        ->select('t_incidencias.*', 't_estados.ct_descripcion as ct_descripcion')
        ->get();

    return response()->json($incidencias);
    }

    public function getIncidenciasAsignadas()
{
    $asignadas = Incidencia::join('t_estados', 't_incidencias.cn_id_estado', '=', 't_estados.cn_id_estado')
    ->where('t_incidencias.cn_id_estado', 1)
    ->select('t_incidencias.*', 't_estados.ct_descripcion as ct_descripcion')
    ->get();

return response()->json($asignadas);
}
    // Obtener la lista de técnicos
    public function getTecnicos()
    {
    // Obtener los técnicos que tienen el rol con cn_id_rol igual a 4
    $tecnicos = User::whereHas('roles', function ($query) {
        $query->where('t_roles_usuario.cn_id_rol', 4); // Calificar con el nombre de la tabla pivot
    })->get();

    return response()->json($tecnicos);
    }

// Asignar técnicos a una incidencia
public function asignarTecnicos(Request $request, $id)
    {
        $incidencia = Incidencia::find($id);

        if (!$incidencia) {
            return response()->json(['error' => 'Incidencia no encontrada'], 404);
        }

        // Actualizar estado de la incidencia y otros campos
        $incidencia->cn_id_afectacion = $request->input('afectacion');
        $incidencia->cn_id_riesgo = $request->input('riesgo');
        $incidencia->cn_id_categoria = $request->input('categoria');
        $incidencia->cn_id_prioridad = $request->input('prioridad');
        $incidencia->cn_id_estado = 1;
        $incidencia->save();

        // Asignar técnicos a la incidencia
        foreach ($request->tecnicos as $tecnicoId) {
            DB::table('t_asignacion_incidencias')->insert([
                'cn_id_incidencia' => $id,
                'cn_id_usuario' => $tecnicoId,
                'cn_cantidad_tecnicos' => count($request->tecnicos),
            ]);
        }

        return response()->json(['message' => 'Incidencia asignada correctamente']);
    }


public function getRiesgos()
{
    $riesgos = DB::table('t_riesgos')->get();
    return response()->json($riesgos);
}

public function getAfectaciones()
{
    $afectaciones = DB::table('t_afectaciones')->get();
    return response()->json($afectaciones);
}

public function getCategorias()
{
    $categorias = DB::table('t_categorias')->get();
    return response()->json($categorias);
}

public function getPrioridades()
{
    $prioridades = DB::table('t_prioridades')->get();
    return response()->json($prioridades);
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
