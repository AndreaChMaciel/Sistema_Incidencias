<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Incidencia;

class ControllerIncidencias extends Controller
{

    public function index()
    {
        $incidencias = Incidencia::all();
        return $incidencias;
    }

    public function store(Request $request)
    {

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
