<?php

namespace App\Http\Controllers;

// use GuzzleHttp\Psr7\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Traits\GeneralTrait;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, GeneralTrait;

    public function uploadImage(Request $request)
    {
        try {
            $detailImages = $request->file('file');
            $imageURLs = [];
            foreach ($detailImages as $detail_image) {
                $img_URL = cloudinary()->upload($detail_image->getRealPath())->getSecurePath();
                $imageURLs[] = $img_URL;
            }
            return $imageURLs;
        } catch (\Exception $e) {
            return $this->returnError(201, $e->getMessage());
        }
    }
}
