<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ControllerAuth extends Controller
{

    public function login(Request $request)
    {
        // Obtener las credenciales del formulario
        $credentials = $request->only('email', 'password');

        // Buscar al usuario por email (o tu campo de identificación)
        $user = User::where('email', $credentials['email'])->first();

        // Verificar si el usuario existe y la contraseña coincide
        if ($user && $user->password == $credentials['password']) {
            // Autenticar al usuario
            Auth::login($user);

            // Obtener el usuario autenticado
            $authenticatedUser = Auth::user();

            return response()->json([
                'user' => $authenticatedUser,
                'message' => 'Inicio de sesión exitoso!!',
            ]);
        } else {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }
    }
   


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
    // public function verificarContrasena(Request $request)
    // {
    //     // Obtener el ct_correo electrónico y la ct_contrasena proporcionados por el usuario
    //     $ct_correo = $request->input('ct_correo');
    //     $ct_contrasena = $request->input('ct_contrasena');

    //     // Buscar el usuario en la base de datos por su ct_correo electrónico
    //     $usuario = DB::table('t_usuarios')->where('ct_correo', $ct_correo)->first();

        

    //     // Verificar si se encontró un usuario con el ct_correo electrónico proporcionado
    //     if ($usuario) {
    //         // Verificar si la ct_contrasena proporcionada coincide con la almacenada en la base de datos
    //         if ($ct_contrasena === $usuario->ct_contrasena) {
    //             // La ct_contrasena coincide, haz lo que necesites hacer aquí
    //             return response()->json(['success' => true, 'mensaje' => 'Inicio de sesión exitoso!!']);
    //         } else {
    //             // La ct_contrasena no coincide
    //             return response()->json(['success' => false,'mensaje' => 'La contraseña es incorrecta']);
    //         }
    //     } else {
    //         // No se encontró ningún usuario con el ct_correo electrónico proporcionado
    //         return response()->json(['success' => false,'mensaje' => 'No se encontró ningún usuario con ese correo electrónico']);
    //     }
    // }

}

