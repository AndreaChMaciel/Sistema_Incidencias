<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Incidencia;
use App\Notifications\IncidenciaRegistradaNotification;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Tymon\JWTAuth\Facades\JWTAuth;

class ControllerIncidencias extends Controller
{

    public function index(Request $request)
{
    $userId = auth()->user()->cn_id_usuario;

    $incidencias = DB::table('t_incidencias as i')
        ->join('t_estados as e', 'i.cn_id_estado', '=', 'e.cn_id_estado')
        ->join('t_roles_usuario as ru', 'i.cn_id_usuario', '=', 'ru.cn_id_usuario')
        ->where('i.cn_id_usuario', $userId)
        ->where('i.cn_id_estado', 0) // Especificar la tabla para evitar ambigüedad
        ->select('i.cn_id_incidencia', 'i.ct_descripcion', 'e.ct_descripcion')
        ->get();

    return response()->json($incidencias);
}


    public function store(Request $request)
    {
       
        // Obtener el usuario autenticado desde el token JWT
        $user = JWTAuth::parseToken()->authenticate();
       
        //\Log::info('Token recibido: ' . $request->header('Authorization'));
        $nombreImagen = $this->guardarImagen($request->imagen);

        // Insertar un nuevo registro en la tabla
        $incidencia = new Incidencia();
        $incidencia->ct_nombre = $request->ct_nombre;
        $incidencia->ct_descripcion = $request->ct_descripcion;
        $incidencia->ct_lugar = $request->ct_lugar;
        $incidencia->imagen = $nombreImagen;
        $incidencia->cn_id_estado = 0; // Asignar el estado "Registrado"
        $incidencia->cn_id_usuario = $user->cn_id_usuario; // Asignar el ID del usuario autenticado
        // Guardar la incidencia en la base de datos
        $incidencia->save();

        

        
        // Generar el número de incidencia con el formato deseado
        $numeroConsecutivo = str_pad($incidencia->cn_id_incidencia, 6, '0', STR_PAD_LEFT);
        $year = date('Y');
        $incidencia->cn_incidencia = $year . "-" . $numeroConsecutivo;
        $incidencia->save();

        

        
        return response()->json(['success' => true, 'message' => 'Incidencia registrada con éxito!!', 'incidencia' => $incidencia],201);

        
        
    }


    // Función para guardar la imagen en el servidor
    private function guardarImagen($imagenBase64)
    {
        $extension = explode('/', explode(':', substr($imagenBase64, 0, strpos($imagenBase64, ';')))[1])[1]; // Obtener la extensión de la imagen
        $imagenDecodificada = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imagenBase64)); // Decodificar la imagen base64
        $nombreImagen = uniqid() . '.' . $extension; // Nombre único para la imagen
        file_put_contents(public_path() . '/imagenes/' . $nombreImagen, $imagenDecodificada); // Guardar la imagen en el directorio public/imagenes

        return $nombreImagen; // Retornar el nombre de la imagen guardada
    }
}
