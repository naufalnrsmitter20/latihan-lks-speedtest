<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>D1</title>
</head>

<body>
    <form method="POST" enctype="multipart/form-data">
        <div style="display: flex; flex-direction: column;">
            <label for="img">upload file</label>
            <input type="file" name="img" id="img">
        </div>
        <button type="submit">submit</button>
    </form>
</body>

</html>

<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["img"])) {
    $file = $_FILES["img"];
    $filename = basename($file["name"]);
    $targetDir = "img/";
    $targetResized = "img/resized/";
    $targetPath = $targetDir . $filename;
    $temp_name = $file["tmp_name"];
    $typeAllowed = ["png", "jpg", "jpeg"];
    $filetype = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));
    if (in_array($filetype, $typeAllowed)) {
        move_uploaded_file($temp_name, $targetPath);
        if ($filetype === "png") {
            $image = imagecreatefrompng($targetPath);
        } else {
            $image = imagecreatefromjpeg($targetPath);
        }
        $img_width = imagesx($image);
        $img_height = imagesy($image);
        $new_width = $img_width / 8;
        $new_height = $img_height / 8;
        $new_image = imagecreatetruecolor($new_width, $new_height);
        imagecopyresampled($new_image, $image, 0, 0, 0, 0, $new_width, $new_height, $img_width, $img_height);
        $resizedPath = $targetResized . pathinfo($filename, PATHINFO_FILENAME) . "_resized." . $filetype;
        @mkdir($targetResized, 0777, true);
        if ($filetype === "png") {
            imagepng($new_image, $resizedPath);
        } else {
            imagejpeg($new_image, $resizedPath);
        }
        imagedestroy($image);
        imagedestroy($new_image);
        echo "gambar yang sudah di resize berhasil di upload";
        echo "<img src='$resizedPath'/>";
    } else {
        echo "tipe gambar harus jpg, jpeg, atau png";
    }
} else {
    echo "Silahkan pilih file terlebih dahulu!";
}


?>