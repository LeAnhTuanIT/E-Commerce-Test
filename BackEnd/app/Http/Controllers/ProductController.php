<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use App\Models\OrderItem;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::where('isDelete', 0)->get();
        $categories = Category::all();
        $formattedProducts = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'thumbnail_image' => $product->thumbnail_image,
                'price' => intval($product->price),
                'quantity' => $product->quantity,
                'sold' => $product->sold,
                'author' => $product->author,
                'description' => $product->description,
                'status' => $product->status,
                'isDelete' => $product->isDelete,
                'detail_image' => $product->detail_image,
                'category' => $product->category->nameCate,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ];
        });

        return response()->json([
            'products' => $formattedProducts,
            'categories' => $categories
        ]);
    }


    public function getAll()
    {
        $products = Product::with('category')->get();
        $categories = Category::all();
        $formattedProducts = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'thumbnail_image' => $product->thumbnail_image,
                'price' => intval($product->price),
                'quantity' => $product->quantity,
                'sold' => $product->sold,
                'author' => $product->author,
                'description' => $product->description,
                'status' => $product->status,
                'isDelete' => $product->isDelete,
                'detail_image' => $product->detail_image,
                'category' => $product->category->nameCate,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ];
        });

        return response()->json([
            'products' => $formattedProducts,
            'categories' => $categories
        ]);
    }

    public function create(Request $request)
    {
        $thumbnail = $request->file('thumbnail_image');
        $thumbnailURL = cloudinary()->upload($thumbnail->getRealPath())->getSecurePath();

        // Handle detail images upload
        $detailImages = $request->file('file');
        $imageURLs = [];
        foreach ($detailImages as $detail_image) {
            $img_URL = cloudinary()->upload($detail_image->getRealPath())->getSecurePath();
            $imageURLs[] = $img_URL;
        }
        // $thumbnailURL = 'https://res.cloudinary.com/daiszmciv/image/upload/v1709264382/sdqubwvhzlge5n6qefec.png';
        // $imageURLs = [
        //     'https://res.cloudinary.com/daiszmciv/image/upload/v1709264382/sdqubwvhzlge5n6qefec.png',
        //     'https://res.cloudinary.com/daiszmciv/image/upload/v1709264382/sdqubwvhzlge5n6qefec.png'
        // ];
        $jsonData = $request->input('data');
        $formData = json_decode($jsonData, true);

        $productData = [
            'name' => $formData['name'],
            'thumbnail_image' => $thumbnailURL,
            'detail_image' => $imageURLs,
            'description' => $formData['description'],
            'price' => $formData['price'],
            'categoryId' => $formData['category'],
            'author' => $formData['author'],
            'quantity' => $formData['quantity'],
        ];
        Product::create($productData);
        return response()->json($productData);
    }

    public function findById($id)
    {
        try {
            if (!$id) {
                throw new \Exception('Product ID is required', 422);
            }

            // Tìm sản phẩm dựa trên ID, nhưng chỉ lấy sản phẩm không bị đánh dấu là đã xóa
            $product = Product::where('id', $id)->where('isDelete', 0)->firstOrFail();

            $data = [
                'status' => 200,
                'message' => $product,
            ];
            return response()->json($data, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            $data = [
                'status' => 404,
                'message' => 'Product not found',
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
                throw new \Exception('product ID is required', 422);
            }

            $product = Product::findOrFail($id);
            $product->isDelete = true;
            $product->status = 'Out of stock';
            $data = [
                'status' => 200,
                'message' => 'product deleted successfully',
            ];
            $product->save();
            return response()->json($product, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            $data = [
                'status' => 404,
                'message' => 'product not found',
            ];
            return response()->json($data, 404);
        }
    }

    public function restore($id)
    {
        try {
            if (!$id) {
                throw new \Exception('product ID is required', 422);
            }

            $product = Product::findOrFail($id);
            $product->isDelete = false;
            $product->status = 'In stock';
            $data = [
                'status' => 200,
                'message' => 'product restore successfully',
            ];
            $product->save();
            return response()->json($product, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            $data = [
                'status' => 404,
                'message' => 'product not found',
            ];
            return response()->json($data, 404);
        }
    }

    public function edit(Request $request, $id)
    {
        // Tìm kiếm sản phẩm với ID cung cấp
        $product = Product::find($id);

        // Nếu không tìm thấy sản phẩm, trả về một phản hồi lỗi
        if (!$product) {
            return response()->json(['error' => 'Không tìm thấy sản phẩm'], 404);
        }

        // Tiếp tục xử lý chỉnh sửa sản phẩm nếu sản phẩm được tìm thấy

        // Handle thumbnail image update
        if ($request->hasFile('thumbnail_image')) {
            $thumbnail = $request->file('thumbnail_image');
            $thumbnailURL = cloudinary()->upload($thumbnail->getRealPath())->getSecurePath();
            $product->thumbnail_image = $thumbnailURL;
        }

        // Handle detail images update
        if ($request->hasFile('file')) {
            $detailImages = $request->file('file');
            $imageURLs = [];
            foreach ($detailImages as $detail_image) {
                $img_URL = cloudinary()->upload($detail_image->getRealPath())->getSecurePath();
                $imageURLs[] = $img_URL;
            }
            $product->detail_image = $imageURLs;
        }

        // Update other fields
        $jsonData = $request->input('data');
        $formData = json_decode($jsonData, true);
        $product->name = $formData['name'];
        $product->description = $formData['description'];
        $product->price = $formData['price'];
        $product->categoryId = $formData['category'];
        $product->author = $formData['author'];
        $product->quantity = $formData['quantity'];

        // Save the updated product
        $product->save();

        return response()->json($product);
    }

    public function popular()
    {
        $popularProducts = Product::where('isDelete', 0)->orderBy('sold', 'desc')->get();

        $formattedProducts = $popularProducts->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'thumbnail_image' => $product->thumbnail_image,
                'price' => intval($product->price),
                'quantity' => $product->quantity,
                'sold' => $product->sold,
                'author' => $product->author,
                'description' => $product->description,
                'status' => $product->status,
                'isDelete' => $product->isDelete,
                'detail_image' => $product->detail_image,
                'category' => $product->category->nameCate,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ];
        });

        return response()->json([
            'products' => $formattedProducts,
        ]);
    }

    public function newest()
    {
        // Lấy danh sách sản phẩm được sắp xếp theo ngày tạo mới nhất
        $newestProducts = Product::where('isDelete', 0)->orderBy('created_at', 'desc')->get();

        // Format lại dữ liệu sản phẩm
        $formattedProducts = $newestProducts->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'thumbnail_image' => $product->thumbnail_image,
                'price' => intval($product->price),
                'quantity' => $product->quantity,
                'sold' => $product->sold,
                'author' => $product->author,
                'description' => $product->description,
                'status' => $product->status,
                'isDelete' => $product->isDelete,
                'detail_image' => $product->detail_image,
                'category' => $product->category->nameCate,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ];
        });

        return response()->json([
            'products' => $formattedProducts,
        ]);
    }

    public function lowToHigh()
    {
        // Lấy danh sách sản phẩm được sắp xếp theo giá từ thấp đến cao
        $products = Product::where('isDelete', 0)->orderBy('price')->get();

        // Format lại dữ liệu sản phẩm
        $formattedProducts = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'thumbnail_image' => $product->thumbnail_image,
                'price' => intval($product->price),
                'quantity' => $product->quantity,
                'sold' => $product->sold,
                'author' => $product->author,
                'description' => $product->description,
                'status' => $product->status,
                'isDelete' => $product->isDelete,
                'detail_image' => $product->detail_image,
                'category' => $product->category->nameCate,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ];
        });

        return response()->json([
            'products' => $formattedProducts,
        ]);
    }

    public function highToLow()
    {
        // Lấy danh sách sản phẩm được sắp xếp theo giá từ cao đến thấp
        $products = Product::where('isDelete', 0)->orderBy('price', 'desc')->get();

        // Format lại dữ liệu sản phẩm
        $formattedProducts = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'thumbnail_image' => $product->thumbnail_image,
                'price' => intval($product->price),
                'quantity' => $product->quantity,
                'sold' => $product->sold,
                'author' => $product->author,
                'description' => $product->description,
                'status' => $product->status,
                'isDelete' => $product->isDelete,
                'detail_image' => $product->detail_image,
                'category' => $product->category->nameCate,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ];
        });

        return response()->json([
            'products' => $formattedProducts,
        ]);
    }

    public function test(Request $request)
    {
        $jsonData = '{
            "items": [
                {
                    "product_id": 1,
                    "quantity": "3"
                },
                {
                    "product_id": 2,
                    "quantity": "1"
                }
            ],
            "user_id": 1,
            "phone": "34324",
            "address": "ẻerter",
            "note": "ẻttrtr",
            "totalPrice": "341000"
        }';

        $data = json_decode($jsonData, true);

        // Tạo đơn hàng
        $order = Order::create([
            'user_id' => $data['user_id'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'note' => $data['note'],
            'total_price' => $data['totalPrice'],
        ]);

        // Thêm mỗi mục đơn hàng vào bảng order_items
        foreach ($data['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
            ]);
        }
    }

    public function getOrder()
    {
        $orders = Order::with(['items.product', 'user'])->get();

        $formattedOrders = $orders->map(function ($order) {
            return [
                'items' => $order->items->map(function ($item) {
                    return [
                        'product_name' => $item->product->name,
                        'product_price' => number_format($item->product->price, 0, '', ''),
                        'quantity' => $item->quantity,
                    ];
                }),
                'user_name' => $order->user->name,
                'phone' => $order->phone,
                'address' => $order->address,
                'note' => $order->note,
                'totalPrice' => number_format($order->total_price, 0, '', ''),
                'created_at' => $order->created_at,
                'id' => $order->id,
                'user_id' => $order->user_id,
            ];
        });

        return response()->json($formattedOrders);
    }

}
