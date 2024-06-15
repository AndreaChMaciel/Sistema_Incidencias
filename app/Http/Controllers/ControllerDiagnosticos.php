<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Diagnostico;

class ControllerDiagnosticos extends Controller
{
    public function registrarDiagnostico($id, Request $request)
    {
        try{
        $request->validate([
            'ct_descripcion' => 'required|string',
            'cn_tiempo_estimado' => 'required|integer',
            'ct_observaciones' => 'required|string',
            'imagen' => 'required|string',
            'cb_compra' => 'required|boolean'
        ]);

        // Decodificar la imagen base64 y guardarla en el servidor
        $nombreImagen = $this->guardarImagen($request->imagen);

        $diagnostico = new Diagnostico();
        $diagnostico->id = $id;
        $diagnostico->ct_fecha = Carbon::now()->toDateString(); // Generar fecha actual
        $diagnostico->ct_hora = Carbon::now()->toTimeString(); // Generar hora actual
        $diagnostico->ct_descripcion = $request->ct_descripcion;
        $diagnostico->cb_compra = $request->cb_compra;
        $diagnostico->cn_tiempo_estimado = $request->cn_tiempo_estimado;
        $diagnostico->ct_observaciones = $request->ct_observaciones;
        $diagnostico->imagen = $nombreImagen; // Guardar el nombre de la imagen en la base de datos
        
       
        $diagnostico->save();

        return response()->json(['mensaje' => 'Diagnóstico registrado con éxito']);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error interno del servidor. Detalles: ' . $e->getMessage()], 500);
    }
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
