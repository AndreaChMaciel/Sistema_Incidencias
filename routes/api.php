<?php

use App\Http\Controllers\ControllerEncargado;
use App\Http\Controllers\ControllerTecnico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControllerAuth;
use App\Http\Controllers\ControllerDiagnosticos;
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

// Ruta de login sin middleware para permitir el acceso
Route::post('login', [ControllerAuth::class, 'login']);
Route::post('logout', [ControllerAuth::class, 'logout']);

// Rutas protegidas por el middleware de autenticación JWT
Route::group(['middleware' => 'jwt.auth'], function () {
   

    // Rutas para incidencias
    Route::post('/incidencias/crear', [ControllerIncidencias::class, 'store']);
    Route::get('/incidencias-usuario', [ControllerIncidencias::class, 'index']);
    Route::get('/incidencias-encargado', [ControllerEncargado::class, 'index']);
    Route::post('/incidencias/{id}/diagnosticar', [ControllerDiagnosticos::class, 'registrarDiagnostico']);
    

    
    // Aquí puedes añadir más rutas protegidas por JWT
});

// Ruta para obtener roles
Route::get('roles', [ControllerAuth::class, 'getRoles'])->middleware('auth:api');
 // Ruta para obtener todos los riesgos
 Route::get('riesgos', [ControllerEncargado::class, 'getRiesgos']);

 // Ruta para obtener todas las afectaciones
 Route::get('afectaciones', [ControllerEncargado::class, 'getAfectaciones']);
 
 // Ruta para obtener todas las categorías
 Route::get('categorias', [ControllerEncargado::class, 'getCategorias']);
 
 // Ruta para obtener todas las prioridades
 Route::get('prioridades', [ControllerEncargado::class, 'getPrioridades']);
 
 // Ruta para obtener todos los técnicos
 Route::get('tecnicos', [ControllerEncargado::class, 'getTecnicos']);
 
 // Ruta para asignar técnicos a una incidencia
 Route::post('asignar-tecnicos/{id}', [ControllerEncargado::class, 'asignarTecnicos']);

 Route::get('/incidencias-asignadas', [ControllerEncargado::class, 'getIncidenciasAsignadas']);

 Route::put('/cambiar-estado/{id}', [ControllerTecnico::class, 'cambiarEstado']);

 //Route::get('/incidencias-tecnico', [ControllerEncargado::class, 'getIncidenciasTecnico']);

 Route::get('/incidencias-tecnico', [ControllerTecnico::class, 'getIncidenciasTecnico'])->middleware('jwt.auth');
