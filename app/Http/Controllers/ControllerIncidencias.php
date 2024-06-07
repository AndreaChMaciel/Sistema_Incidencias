<?php

namespace App\Http\Controllers;


use App\Models\Incidencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ControllerIncidencias extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $incidencias = Incidencia::all();
        return $incidencias;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

        // Retornar una respuesta JSON con la incidencia creada
        return response()->json($incidencia, 201);
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
