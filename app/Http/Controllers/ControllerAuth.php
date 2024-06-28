<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class ControllerAuth extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Buscar el usuario en la base de datos por su email
        $user = User::where('email', $credentials['email'])->first();

        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // Verificar la contraseña en texto plano
        if ($user->password !== $credentials['password']) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        // Generar el token JWT manualmente
        $token = JWTAuth::fromUser($user);

        // Obtener los roles del usuario desde la base de datos
        $roles = DB::table('t_roles_usuario')
                    ->join('t_roles', 't_roles_usuario.cn_id_rol', '=', 't_roles.cn_id_rol')
                    ->where('t_roles_usuario.cn_id_usuario', $user->cn_id_usuario)
                    ->pluck('t_roles.ct_descripcion')
                    ->toArray();

        

        // Autenticación exitosa, devolver token y roles
        return response()->json([
            'token' => $token,
            'user' => $user,
            'roles' => $roles,
            'message' => 'Login successful'
        ]);
    }

    public function logout(Request $request)
    {
        // Revocar el token actual del usuario autenticado
        auth()->logout();

        return response()->json(['message' => 'Sesión cerrada exitosamente']);
    }
}

