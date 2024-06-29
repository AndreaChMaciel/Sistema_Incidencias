<?php

use App\Http\Controllers\ControllerEncargado;
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

// Rutas protegidas por el middleware de autenticación JWT
Route::group(['middleware' => 'jwt.auth'], function () {
   

    // Rutas para incidencias
    Route::post('/incidencias/crear', [ControllerIncidencias::class, 'store']);
    Route::get('/incidencias-usuario', [ControllerIncidencias::class, 'index']);
    Route::get('/incidencias-encargado', [ControllerEncargado::class, 'index']);
    Route::post('/incidencias/{id}/diagnosticar', [ControllerDiagnosticos::class, 'registrarDiagnostico']);
    
    // Aquí puedes añadir más rutas protegidas por JWT
});


