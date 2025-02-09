<?php

$imagefile = imagecreatefromjpeg("image.jpg");
$watermarkfile = imagecreatefrompng("logo.png");

if (isset($imagefile) && isset($watermarkfile)) {
    $imagewidth = imagesx($imagefile);
    $imageheight = imagesy($imagefile);
    $wmwidth = imagesx($watermarkfile);
    $wmheight = imagesy($watermarkfile);
    $x = $imagewidth - $wmwidth - 10;
    $y = 10;
    imagecopy($imagefile, $watermarkfile, $x, $y, 0, 0, $wmwidth, $wmheight);
    imagejpeg($imagefile, "asset/image_watermark.jpg", 90);
    imagedestroy($imagefile);
    imagedestroy($watermarkfile);
    echo "sukses mennambahkan watermark";
}
