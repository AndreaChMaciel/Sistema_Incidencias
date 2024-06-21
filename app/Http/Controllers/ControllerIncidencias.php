<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Incidencia;
use App\Notifications\IncidenciaRegistradaNotification;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class ControllerIncidencias extends Controller
{

    public function index()
    {
        $incidencias = Incidencia::all();
        return $incidencias;
    }

    public function store(Request $request)
    {
        // Obtener los datos del usuario
        //$ct_correo = $request->input('ct_correo');

         // Buscar el usuario en la base de datos por su ct_correo electrónico
         //$usuario = DB::table('t_usuarios')->where('ct_correo', $ct_correo)->first();

        //  if (!$usuario) {
        //     return response()->json(['success' => false, 'message' => 'Usuario no encontrado.'], 404);
        // }

        $nombreImagen = $this->guardarImagen($request->imagen);

        // Insertar un nuevo registro en la tabla
        $incidencia = new Incidencia();
        $incidencia->ct_nombre = $request->ct_nombre;
        $incidencia->ct_descripcion = $request->ct_descripcion;
        $incidencia->ct_lugar = $request->ct_lugar;
        $incidencia->imagen = $nombreImagen;

        // Guardar la incidencia en la base de datos
        $incidencia->save();

        

        
        // Generar el número de incidencia con el formato deseado
        $numeroConsecutivo = str_pad($incidencia->id, 6, '0', STR_PAD_LEFT);
        $year = date('Y');
        $incidencia->ct_id_incidencia = $year . "-" . $numeroConsecutivo;
        $incidencia->save();

        // $user = Auth::user();
        // Enviar la notificación al correo del usuario
        //Notification::route('mail', $incidencia->$ct_correo)->notify(new IncidenciaRegistradaNotification($incidencia));
        
        // Enviar notificación por correo electrónico al usuario autenticado
        // if ($user) {
        //     $user->notify(new IncidenciaRegistradaNotification($incidencia));
        // }

        
        return response()->json(['success' => true, 'message' => 'Incidencia registrada con éxito!!']);

        
        
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
