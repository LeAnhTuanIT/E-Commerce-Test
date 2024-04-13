<!-- resources/views/invoice.blade.php -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #FAFAFA;
            font: 12pt "Tahoma";
        }

        * {
            box-sizing: border-box;
            -moz-box-sizing: border-box;
        }

        .page {
            width: 21cm;
            overflow: hidden;
            min-height: 297mm;
            padding: 2.5cm;
            margin-left: auto;
            margin-right: auto;
            background: white;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }

        .header {
            overflow: hidden;
        }

        .logo {
            background-color: #FFFFFF;
            text-align: left;
            float: left;
        }

        .company {
            padding-top: 24px;
            text-transform: uppercase;
            background-color: #FFFFFF;
            text-align: right;
            float: right;
            font-size: 16px;
        }

        .title {
            text-align: center;
            position: relative;
            color: #0000FF;
            font-size: 24px;
            top: 1px;
        }

        .TableData {
            background: #ffffff;
            font: 11px;
            width: 100%;
            border-collapse: collapse;
            font-family: Verdana, Arial, Helvetica, sans-serif;
            font-size: 12px;
            border: thin solid #d3d3d3;
        }

        .TableData th {
            background: rgba(0, 0, 255, 0.1);
            text-align: center;
            font-weight: bold;
            color: #000;
            border: solid 1px #ccc;
            height: 24px;
        }

        .TableData tr {
            height: 24px;
            border: thin solid #d3d3d3;
        }

        .TableData tr:hover {
            background: rgba(0, 0, 0, 0.05);
        }

        .TableData tr td {
            padding-right: 2px;
            padding-left: 2px;
            border: thin solid #d3d3d3;
        }

        .TableData .cotSTT {
            text-align: center;
            width: 10%;
        }

        .TableData .cotTenSanPham {
            text-align: left;
            width: 40%;
        }

        .TableData .cotGia {
            text-align: right;
            width: 120px;
        }

        .TableData .cotSoLuong {
            text-align: center;
            width: 50px;
        }

        .TableData .cotSo {
            text-align: right;
            width: 120px;
        }

        .TableData .tong {
            text-align: right;
            font-weight: bold;
            text-transform: uppercase;
            padding-right: 4px;
        }

        .footer-left {
            text-align: center;
            text-transform: uppercase;
            padding-top: 24px;
            position: relative;
            height: 150px;
            width: 50%;
            color: #000;
            float: left;
            font-size: 12px;
            bottom: 1px;
        }

        .footer-right {
            text-align: center;
            text-transform: uppercase;
            padding-top: 24px;
            position: relative;
            height: 150px;
            width: 50%;
            color: #000;
            font-size: 12px;
            float: right;
            bottom: 1px;
        }

        @media print {
            @page {
                margin: 0;
                border: initial;
                border-radius: initial;
                width: initial;
                min-height: initial;
                box-shadow: initial;
                background: initial;
                page-break-after: always;
            }
        }
    </style>
</head>

<body onload="window.print();">
    <div id="page" class="page">
        <div class="header">
            <!-- <div class="logo"><img src="{{ asset('images/logo.jpg') }}" alt="Logo"></div> -->
            <div class="company">Shop Books Store</div>
        </div>
        <br />
        <div class="title">
            HÓA ĐƠN THANH TOÁN
            <br />
            -------oOo-------
        </div>
        <br />
        <br />
        <div>
            <p>Dear {{ $data['fullName'] }},</p>
            <p>Thank you for your purchase. Below are the details of your order:</p>
            <table class="TableData">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                    $tongsotien = 0;
                    @endphp
                    @foreach($data['items'] as $index => $item)
                    @php
                    $tongsotien += $item['quantity'] * $item['unit_price'];
                    @endphp
                    <tr>
                        <td class="cotSTT">{{ $index + 1 }}</td>
                        <td class="cotTenSanPham">{{ $item['product_name'] }}</td>
                        <td class="cotGia">{{ number_format($item['unit_price'], 0, ",", ".") }}</td>
                        <td class="cotSoLuong" align='center'>{{ $item['quantity'] }}</td>
                        <td class="cotSo">{{ number_format(($item['quantity'] * $item['unit_price']), 0, ",", ".") }}</td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" class="tong">Tổng cộng</td>
                        <td class="cotSo">{{ number_format(($tongsotien), 0, ",", ".") }}</td>
                    </tr>
                </tfoot>
            </table>
            <p>Thank you for shopping with us.</p>
            <p>Regards,<br>Shop Books Store</p>
        </div>
    </div>
</body>

</html>