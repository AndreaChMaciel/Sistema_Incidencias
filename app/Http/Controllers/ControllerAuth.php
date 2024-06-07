<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ControllerAuth extends Controller
{
    public function verificarContrasena(Request $request)
    {
        // Obtener el ct_correo electrónico y la ct_contrasena proporcionados por el usuario
        $ct_correo = $request->input('ct_correo');
        $ct_contrasena = $request->input('ct_contrasena');

        // Buscar el usuario en la base de datos por su ct_correo electrónico
        $usuario = DB::table('t_usuarios')->where('ct_correo', $ct_correo)->first();

        // Verificar si se encontró un usuario con el ct_correo electrónico proporcionado
        if ($usuario) {
            // Verificar si la ct_contrasena proporcionada coincide con la almacenada en la base de datos
            if ($ct_contrasena === $usuario->ct_contrasena) {
                // La ct_contrasena coincide, haz lo que necesites hacer aquí
                return response()->json(['mensaje' => 'La ct_contrasena es correcta']);
            } else {
                // La ct_contrasena no coincide
                return response()->json(['mensaje' => 'La ct_contrasena es incorrecta']);
            }
        } else {
            // No se encontró ningún usuario con el ct_correo electrónico proporcionado
            return response()->json(['mensaje' => 'No se encontró ningún usuario con ese ct_correo electrónico']);
        }
    }
}
