<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class ControllerUsuarios extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuarios = Usuario::all();
        return $usuarios;
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
        $usuario = new Usuario();
     
        $usuario->ct_nombre = $request->ct_nombre;
        $usuario->ct_cedula = $request->ct_cedula;
        $usuario->ct_puesto = $request->ct_puesto;
        $usuario->ct_celular = $request->ct_celular;
        $usuario->ct_correo = $request->ct_correo;
        $usuario->ct_contrasena = $request->ct_contrasena;

        $usuario->save();
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
    public function update(Request $request)
    {
        $usuario = Usuario::findOrFail($request->cn_id_usuario);
        $usuario->ct_nombre = $request->ct_nombre;
        $usuario->ct_cedula = $request->ct_cedula;
        $usuario->ct_puesto = $request->ct_puesto;
        $usuario->ct_celular = $request->ct_celular;
        $usuario->ct_correo = $request->ct_correo;
        $usuario->ct_contrasena = $request->ct_contrasena;
        $usuario->save();

        return $usuario;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $usuario = Usuario::destroy($request->cn_id_usuario);
        return $usuario;
    }
}
