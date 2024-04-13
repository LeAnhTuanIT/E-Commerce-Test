<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Redirect;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors()
            ];
            return response()->json($response, 401);
        }
        $secretKey = env('JWT_SECRET');
        $expirationTime = time() + 3600; // Hạn sử dụng của token là 1 giờ (3600 giây)
        $tokenData = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'exp' => $expirationTime,
        ];
        $token = JWT::encode($tokenData, $secretKey, 'HS256');
        // Send activation email
        $activationLink = "http://127.0.0.1:8000/api/auth/active/{$token}";
        $userName = $request->input('name');
        // Gửi email bằng lớp SendMail đã tạo
        Mail::to($request->input('email'))
            ->send(new SendMail($userName, $activationLink));
        return response()->json("Đã gửi Mail đăng ký vui lòng xác nhận!", 200);
    }

    public function login(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors()
            ];
            return response()->json($response, 200);
        }

        // Check if the user exists and is not deleted
        $user = User::where('email', $request->email)->where('isDelete', 0)->first();

        if (!$user) {
            return response()->json(['message' => 'Tài khoản không tồn tại hoặc đã bị xóa.'], 401);
        }

        // Attempt to authenticate the user
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $secretKey = env('JWT_SECRET');
            $expirationTime = time() + 360000; // Hạn sử dụng của token là 1 giờ (3600 giây)

            $tokenData = [
                'userId' => $user->id,
                'exp' => $expirationTime,
            ];
            $token = JWT::encode($tokenData, $secretKey, 'HS256');
            setcookie('access_token', $token, [
                'expires' => $expirationTime,
                'path' => '/',
                'domain' => '127.0.0.1',
                'samesite' => 'None',
                'secure' => true,
                'httponly' => true
            ]);

            return response()->json($user);
        }

        // Authentication failed
        return response()->json(['message' => 'Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.'], 401);
    }

    function active($token)
    {
        $secretKey = env('JWT_SECRET');
        try {
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            // Assuming $decoded contains user information
            $userData = [
                'name' => $decoded->name,
                'email' => $decoded->email,
                'password' => $decoded->password,
            ];
            
            // Create the user
            $user = User::create($userData);

            // Define expiration time
            $expirationTime = time() + 360000;

            // Create token data
            $tokenData = [
                'userId' => $user->id,
                'exp' => $expirationTime,
            ];

            // Encode token
            $newToken = JWT::encode($tokenData, $secretKey, 'HS256');

            // Set cookie
            setcookie('access_token', $newToken, [
                'expires' => $expirationTime,
                'path' => '/',
                'domain' => '127.0.0.1',
                'samesite' => 'None',
                'secure' => true,
                'httponly' => true
            ]);

            // Redirect user
            return Redirect::to('http://localhost:3006');
        } catch (\Exception $e) {
            return response()->json("err", 401);
        }
    }


    function googleAuth(Request $request)
    {
        try {
            $email = $request->input('email');
            $user = User::where('email', $email)->first();
            if ($user) {
                $secretKey = env('JWT_SECRET');
                $expirationTime = time() + 3600;
                $tokenData = [
                    'userId' => $user->id,
                    'exp' => $expirationTime,
                ];
                $token = JWT::encode($tokenData, $secretKey, 'HS256');
                setcookie('access_token', $token, [
                    'expires' => $expirationTime,
                    'path' => '/',
                    'domain' => '127.0.0.1',
                    'samesite' => 'None',
                    'secure' => true,
                    'httponly' => true
                ]);
                return response()->json($user);
            } else {
                $generatedPassword = Str::random(8);
                $password = bcrypt($generatedPassword);
                $userData = [
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'image_path' => $request->input('googlePhotoUrl'),
                    'password' => $password
                ];
                $newUser = User::create($userData);
                $secretKey = env('JWT_SECRET');
                $expirationTime = time() + 360000;
                $tokenData = [
                    'userId' => $newUser->id,
                    'exp' => $expirationTime,
                ];
                $token = JWT::encode($tokenData, $secretKey, 'HS256');
                setcookie('access_token', $token, [
                    'expires' => $expirationTime,
                    'path' => '/',
                    'domain' => '127.0.0.1',
                    'samesite' => 'None',
                    'secure' => true,
                    'httponly' => true
                ]);
                return response()->json($newUser);
            }
        } catch (\Exception $e) {
            return response()->json("err", 401);
        }
    }

    function getAccount()
    {
        $token = Cookie::get('access_token');
        $secretKey = env('JWT_SECRET');
        try {
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            $userId = $decoded->userId;
            $user = User::find($userId);
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json("Lỗi xác minh token", 401);
        }
    }

    function test()
    {
        $secretKey = env('JWT_SECRET');
        $expirationTime = time() + 3600;

        $tokenData = [
            'userId' => '$user->id',
            'exp' => $expirationTime,
        ];
        $token = JWT::encode($tokenData, $secretKey, 'HS256');
        return response()->json($token);
    }

    public function logout()
    {
        setcookie('access_token', '', [
            'expires' => time() - 3600,
            'path' => '/',
            'domain' => '127.0.0.1',
            'samesite' => 'None',
            'secure' => true,
            'httponly' => true
        ]);
        return response()->json(['message' => 'Đã đăng xuất thành công.']);
    }
}
