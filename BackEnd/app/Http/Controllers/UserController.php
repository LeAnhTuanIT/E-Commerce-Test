<?php

namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;
use Firebase\JWT\Key;

class UserController extends Controller
{
    function index()
    {
        $Users = User::all();
        return response()->json($Users);
    }

    public function edit(Request $request, $id)
    {
        try {
            $token = Cookie::get('access_token');
            $secretKey = env('JWT_SECRET');
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            $userId = $decoded->userId;
            
            $checkRole = User::findOrFail($userId);
            $role = $checkRole->role;

            $jsonData = $request->input('data');
            $formData = json_decode($jsonData, true);

            $user = User::findOrFail($id);

            if ($userId != $id && $role != 'admin') {
                throw new \Exception('Bạn không có quyền.', 403);
            }

            $user->name = $formData['name'] ?? $user->name;

            if (isset($formData['password'])) {
                $user->password = bcrypt($formData['password']);
            }

            if ($role == 'admin') {
                $user->role = isset($formData['role']) ? $formData['role'] : $user->role;
            } else {
                if (isset($formData['role'])) {
                    throw new \Exception('Bạn không có quyền.', 403);
                }
            }

            $user->address = $formData['address'] ?? $user->address;
            $user->phone = $formData['phone'] ?? $user->phone;

            if ($request->hasFile('file')) {
                $user->image_path = cloudinary()->upload($request->file('file')->getRealPath())->getSecurePath();
            }

            $user->save();

            $data = [
                'status' => 200,
                'message' => 'Data updated successfully',
            ];
            return response()->json($data, 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            $data = [
                'status' => 404,
                'message' => 'User not found',
            ];
            return response()->json($data, 404);

        } catch (\Exception $e) {
            $data = [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
            return response()->json($data, $e->getCode());
        }
    }


    public function findById($id)
    {
        try {
            if (!$id) {
                throw new \Exception('User ID is required', 422);
            }

            $User = User::findOrFail($id);

            $data = [
                'status' => 200,
                'message' => $User,
            ];
            return response()->json($data, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            $data = [
                'status' => 404,
                'message' => 'User not found',
            ];
            return response()->json($data, 404);
        } catch (\Exception $e) {
            $data = [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
            return response()->json($data, $e->getCode());
        }
    }

    public function delete($id)
    {
        try {
            if (!$id) {
                throw new \Exception('User ID is required', 422);
            }

            $User = User::findOrFail($id);

            // Kiểm tra xem người dùng có quyền xóa hay không
            $token = Cookie::get('access_token');
            $secretKey = env('JWT_SECRET');
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            $userId = $decoded->userId;
            $checkRole = User::findOrFail($userId);
            $role = $checkRole->role;
            // Kiểm tra xem người dùng có phải là 'admin' không
            if ($role != 'admin' && $userId != $id) {
                throw new \Exception('Unauthorized. You are not allowed to delete this user.', 403);
            }

            // Xóa người dùng
            $User->isDelete = true;
            $User->status = 'delete';
            $User->role = 'delete';
            $data = [
                'status' => 200,
                'message' => 'User deleted successfully',
            ];
            $User->save();

            $data = [
                'status' => 200,
                'message' => 'User deleted successfully',
            ];
            return response()->json($data, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            $data = [
                'status' => 404,
                'message' => 'User not found',
            ];
            return response()->json($data, 404);
        } catch (\Exception $e) {
            $data = [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
            return response()->json($data, $e->getCode());
        }
    }

    public function restore($id)
    {
        try {
            if (!$id) {
                throw new \Exception('User ID is required', 422);
            }
            $User = User::findOrFail($id);

            // Kiểm tra xem người dùng có quyền xóa hay không
            $token = Cookie::get('access_token');
            $secretKey = env('JWT_SECRET');
            $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
            $userId = $decoded->userId;
            $checkRole = User::findOrFail($userId);
            $role = $checkRole->role;
            // Kiểm tra xem người dùng có phải là 'admin' không
            if ($role != 'admin') {
                throw new \Exception('Unauthorized. You are not allowed to restore this user.', 403);
            }

            $User->isDelete = false;
            $User->status = 'active';
            $User->role = 'user';
            $data = [
                'status' => 200,
                'message' => 'User deleted successfully',
            ];
            $User->save();

            $data = [
                'status' => 200,
                'message' => 'User retore successfully',
            ];
            return response()->json($data, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            $data = [
                'status' => 404,
                'message' => 'User not found',
            ];
            return response()->json($data, 404);
        } catch (\Exception $e) {
            $data = [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
            return response()->json($data, $e->getCode());
        }
    }
}
