<?php

use App\Http\Controllers\ControllerAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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