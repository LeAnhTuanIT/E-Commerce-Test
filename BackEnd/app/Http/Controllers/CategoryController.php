<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{

    public function create(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'nameCate' => 'required',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors()
            ];
            return response()->json($response, 400);
        }

        $category = new Category();
        $category->nameCate = $request->input('nameCate');
        $category->save();

        $response = [
            'success' => true,
            'message' => 'Category created successfully',
            'data' => $category
        ];
        return response()->json($response, 201);
    }


    public function index()
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }

    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        return response()->json($category, 200);
    }

    // Update a category
    public function update(Request $request, $id)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'nameCate' => 'required',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors()
            ];
            return response()->json($response, 400);
        }

        // Find the category
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Update the category
        $category->nameCate = $request->input('nameCate');
        $category->save();

        $response = [
            'success' => true,
            'message' => 'Category updated successfully',
            'data' => $category
        ];
        return response()->json($response, 200);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        $response = [
            'success' => true,
            'message' => 'Category deleted successfully',
            'data' => $category
        ];
        return response()->json($response, 200);
    }
}
