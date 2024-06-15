<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
                return response()->json(['success' => true, 'mensaje' => 'Inicio de sesión exitoso!!']);
            } else {
                // La ct_contrasena no coincide
                return response()->json(['success' => false,'mensaje' => 'La contraseña es incorrecta']);
            }
        } else {
            // No se encontró ningún usuario con el ct_correo electrónico proporcionado
            return response()->json(['success' => false,'mensaje' => 'No se encontró ningún usuario con ese correo electrónico']);
        }
    }
}
