<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\JWK;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Response;
use App\Models\User;
use Firebase\JWT\Key;

class VerifyToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = Cookie::get('access_token');

        if (!$token) {
            return response()->json("Chưa đăng nhập", 401);
        }

        $secretKey = env('JWT_SECRET');

        try {
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            $userId = $decoded->userId;
            $user = User::find($userId);

            if ($user) {
                return $next($request);
            } else {
                return response()->json("Lỗi khi lấy thông tin người dùng", 401);
            }
        } catch (\Exception $e) {
            return response()->json("Lỗi xác minh token", 401);
        }
    }

}
