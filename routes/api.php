<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Sanctum;

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
//  Pruebas
Route::post('login', [ControllerAuth::class, 'login']);



Route::middleware(['auth:api', 'role:Usuario', 'role:Encargado', 'role:Tecnico', 'role:Supervisor'])->group(function () {
    // Rutas para otros roles
});


// --------------------------------------------------------
// Route::post('/login', [ControllerAuth::class, 'login']);
// Route::post('/logout', [ControllerAuth::class, 'logout']);






// // routes/api.php para proteger las rutas deben estar dentro de auth group
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });
// });


// Route::group(['middleware' => ['rol:user']], function () {
//     // Rutas para usuarios normales
// });



// Route::middleware(['auth', 'handle:admin,user'])->group(function () {
//     Route::post('/incidencias/crear','App\Http\Controllers\ControllerIncidencias@store');
//     Route::get('/incidencias','App\Http\Controllers\ControllerIncidencias@index');
//     //Route::post('/incidents', [IncidentController::class, 'store']);
// });





// //LOGUEO
// Route::post('/login', [ControllerAuth::class, 'verificarContrasena']);


// //Incidencias

// //registrar una incidencia
// //Route::post('/incidencias/crear', [ControllerIncidencias::class, 'store']);
// Route::post('/incidencias/crear','App\Http\Controllers\ControllerIncidencias@store');

// Route::get('/incidencias','App\Http\Controllers\ControllerIncidencias@index');

// Route::post('/incidencias/{id}/diagnosticar', 'App\Http\Controllers\ControllerDiagnosticos@registrarDiagnostico');
