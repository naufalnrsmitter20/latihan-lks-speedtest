<?php

$gambar = imagecreatefromjpeg("image.jpg");
$watermark = imagecreatefrompng("logo.png");
$image_width = imagesx($gambar);
$image_height = imagesy($gambar);
$watermark_width = imagesx($watermark);
$watermark_height = imagesy($watermark);
$x = $image_width - $watermark_width - 10;
$y = 10;
imagecopy($gambar, $watermark, $x, $y, 0, 0, $watermark_width, $watermark_height);
imagejpeg($gambar, "asset/image_watermark.jpg", 90);
imagedestroy($gambar);
imagedestroy($watermark);
echo "sukses membuat watermark!";
