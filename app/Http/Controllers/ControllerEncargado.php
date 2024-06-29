<?php

namespace App\Http\Controllers;
use App\Models\Asignacion;
use App\Models\Incidencia;
use App\Models\Usuario;

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
