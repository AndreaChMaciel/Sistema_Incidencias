<?php

use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerDiagnosticos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControllerIncidencias;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//USUARIOS
//para traer todos los registros
Route::get('/usuarios','App\Http\Controllers\ControllerUsuarios@index');

//crear un registro
Route::post('/usuarios/crear','App\Http\Controllers\ControllerUsuarios@store');

//Actualizar
Route::put('/usuarios/{cn_id_usuario}','App\Http\Controllers\ControllerUsuarios@update');

//Eliminar
Route::delete('/usuarios/{cn_id_usuario}','App\Http\Controllers\ControllerUsuarios@destroy');

//LOGUEO
Route::post('/login', [ControllerAuth::class, 'verificarContrasena']);

//Incidencias

//registrar una incidencia
//Route::post('/incidencias/crear', [ControllerIncidencias::class, 'store']);
Route::post('/incidencias/crear','App\Http\Controllers\ControllerIncidencias@store');

Route::get('/incidencias','App\Http\Controllers\ControllerIncidencias@index');

Route::post('/incidencias/{id}/diagnosticar', [ControllerDiagnosticos::class, 'registrarDiagnostico']);
