<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::get('active/{token}', [AuthController::class, 'active']);
    Route::post('google', [AuthController::class, 'googleAuth']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::middleware('verifyToken')->group(function () {
        Route::get('getAccount', [AuthController::class, 'getAccount']);
    });
});

Route::prefix('user')->group(function () {
    // Route::get('/', [UserController::class, 'index']);

    Route::middleware('verifyToken')->group(function () {
        Route::post('edit/{id}', [UserController::class, 'edit']);
        Route::get('{id}', [UserController::class, 'findById']);
        Route::post('delete/{id}', [UserController::class, 'delete']);
    });

    Route::middleware('verifyTokenRole')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('restore/{id}', [UserController::class, 'restore']);
    });
});

Route::prefix('product')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/-sold', [ProductController::class, 'popular']);
    Route::get('/price', [ProductController::class, 'lowToHigh']);
    Route::get('/-price', [ProductController::class, 'highToLow']);
    Route::get('/-updatedAt', [ProductController::class, 'newest']);
    Route::get('/getOrder', [ProductController::class, 'getOrder']);

    Route::middleware('verifyTokenRole')->group(function () {
        Route::get('getAll', [ProductController::class, 'getAll']);
        Route::post('create', [ProductController::class, 'create']);
        Route::get('{id}', [ProductController::class, 'findById']);
        Route::post('delete/{id}', [ProductController::class, 'delete']);
        Route::post('restore/{id}', [ProductController::class, 'restore']);
        Route::post('edit/{id}', [ProductController::class, 'edit']);
    });
});

Route::prefix('category')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);

    Route::middleware('verifyTokenRole')->group(function () {
        Route::post('/create', [CategoryController::class, 'create']);
        Route::get('/{id}', [CategoryController::class, 'show']);
        Route::post('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
    });
});


Route::post('upload/', [Controller::class, 'uploadImage']);
Route::get('test/', [AuthController::class, 'test']);

Route::post('/vnpay_payment', [PaymentController::class, 'vnpay_payment']);
Route::get('/success', [PaymentController::class, 'handleTransaction']);
