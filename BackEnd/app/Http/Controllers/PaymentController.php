<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Mail\InvoiceEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;

class PaymentController extends Controller
{
    public function vnpay_payment(Request $request)
    {
        $orderInfo = json_decode($request->input('orderInfo'), true);
        $userInfo = json_decode($request->input('userInfo'), true);
        // Kết hợp thông tin từ cả hai mảng vào một mảng duy nhất
        $mergedData = array_merge($orderInfo, $userInfo);

        $totalPrice = $userInfo['totalPrice'];

        $uniqueID = uniqid();
        $oderId = substr($uniqueID, 0, 4) . '-' . substr($uniqueID, 4, 4) . '-' . substr($uniqueID, 8, 4);
        error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://127.0.0.1:8000/api/success?" . http_build_query($mergedData);
        $vnp_TmnCode = "DNWE36IF"; //Mã website tại VNPAY 
        $vnp_HashSecret = "ZPUQBJCIQNXIKSYHANRMUQQBEENGLSYG"; //Chuỗi bí mật

        $vnp_TxnRef = $oderId; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY;
        $vnp_Amount = $totalPrice * 100;
        $vnp_OrderInfo = "Thanh toán hóa đơn";
        $vnp_OrderType = "Travel tour";
        $vnp_Locale = "VN";
        $vnp_BankCode = "NCB";
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
        //Add Params of 2.0.1 Version

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = $vnp_Url;
        if (isset($_POST['redirect'])) {
            header('Location: ' . $vnp_Url);
            die();
        } else {
            echo json_encode($returnData);
        }
    }

    public function handleTransaction(Request $request)
    {
        $queryParams = $request->query();

        $data = [];
        foreach ($queryParams as $key => $value) {
            if (is_numeric($key)) {
                $index = $key;
                // Lấy thông tin sản phẩm từ product_id
                $product = Product::find($value['product_id']);
                if ($product) {
                    // Thêm thông tin sản phẩm vào mảng dữ liệu
                    $data['items'][$index] = [
                        'product_id' => $value['product_id'],
                        'quantity' => $value['quantity'],
                    ];
                    // Lấy tên và đơn giá sản phẩm
                    $data['items'][$index]['product_name'] = $product->name; // Giả sử tên cột trong database là 'name'
                    $data['items'][$index]['unit_price'] = $product->price; // Giả sử tên cột trong database là 'price'
                }
            } else {
                $data[$key] = $value;
            }
        }

        // Tạo đơn hàng
        $order = Order::create([
            'user_id' => $data['user_id'],
            'fullName' => $data['fullName'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'note' => $data['note'] ?? null,
            'total_price' => $data['totalPrice'],
        ]);

        // Thêm mỗi mục đơn hàng vào bảng order_items
        foreach ($data['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'], // Thêm giá sản phẩm vào order_items
            ]);

            $product = Product::find($item['product_id']);
            if ($product) {
                $product->sold = $product->sold + $item['quantity'];
                $product->quantity = $product->quantity -  $item['quantity'];
                $product->save();
            }
        }

        // Lấy địa chỉ email của khách hàng từ ID
        $user = User::find($data['user_id']);
        $email = $user->email;

        // Gửi email hóa đơn
        Mail::to($email)->send(new InvoiceEmail($data));

        return Redirect::to('http://localhost:3006/pay-success');
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
            ];
        });

        return response()->json($formattedOrders);
    }
}
