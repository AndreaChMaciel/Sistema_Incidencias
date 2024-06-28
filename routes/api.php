<?php

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
    Route::get('/incidencias', [ControllerIncidencias::class, 'index']);
    Route::post('/incidencias/{id}/diagnosticar', [ControllerDiagnosticos::class, 'registrarDiagnostico']);
    
    // Aquí puedes añadir más rutas protegidas por JWT
});

// Rutas específicas para roles
Route::middleware(['auth:api', 'role:Usuario'])->group(function () {
    // Rutas para el rol Usuario
});

Route::middleware(['auth:api', 'role:Encargado'])->group(function () {
    // Rutas para el rol Encargado
});

Route::middleware(['auth:api', 'role:Tecnico'])->group(function () {
    // Rutas para el rol Técnico
});

Route::middleware(['auth:api', 'role:Supervisor'])->group(function () {
    // Rutas para el rol Supervisor
});
