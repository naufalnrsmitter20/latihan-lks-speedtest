<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>D1</title>
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <form action="upload.php" method="POST" enctype="multipart/form-data">
        <label for="image">Pilih Gambar:</label>
        <input type="file" accept="image/*" name="image" id="image" />
        <br />
        <label for="watermark">
            <input type="checkbox" name="watermark" id="watermark" value="1" />
            Tambahkan Watermark
        </label>
        <br />
        <button type="submit">SUBMIT</button>
    </form>

    <div id="image-preview">
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
            $uploadDir = 'upload/';
            $thumbDir = $uploadDir . 'thumbnails/';
            @mkdir($uploadDir, 0777, true);
            @mkdir($thumbDir, 0777, true);

            $file = $_FILES['image'];
            $fileName = basename($file['name']);
            $filePath = $uploadDir . $fileName;
            $fileType = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));

            $allowedTypes = ['jpg', 'jpeg', 'png'];
            if (!in_array($fileType, $allowedTypes)) {
                die("File harus berupa JPG, JPEG, atau PNG!");
            }

            if (move_uploaded_file($file['tmp_name'], $filePath)) {
                echo "<p>File berhasil diunggah!</p>";
                echo "<img src='$filePath' alt='Gambar Asli' style='max-width: 100%;'><br>";

                // Tambahkan watermark jika dicentang
                if (isset($_POST['watermark'])) {
                    $watermarkText = "WATERMARK";

                    [$image, $width, $height] = createImage($filePath);
                    if ($image) {
                        $fontSize = 100; // Ukuran font
                        $textColor = imagecolorallocate($image, 255, 255, 255); // Warna putih
                        $textX = $width - (imagefontwidth($fontSize) * strlen($watermarkText)) - 10;
                        $textY = $height - imagefontheight($fontSize) - 10;

                        imagestring($image, $fontSize, $textX, $textY, $watermarkText, $textColor);
                        if ($fileType === 'jpg' || $fileType === 'jpeg') {
                            imagejpeg($image, $filePath, 90);
                        } elseif ($fileType === 'png') {
                            imagepng($image, $filePath, 9);
                        }

                        imagedestroy($image);

                        echo "<p>Watermark berhasil ditambahkan!</p>";
                        echo "<img src='$filePath' alt='Gambar dengan Watermark' style='max-width: 100%;'><br>";
                    }
                }

                // Buat thumbnail
                foreach ([100] as $size) {
                    $thumbPath = $thumbDir . "{$size}px_" . $fileName;

                    [$image, $width, $height] = createImage($filePath);
                    if (!$image) continue;

                    $thumb = imagecreatetruecolor($size, $size);
                    imagecopyresampled($thumb, $image, 0, 0, 0, 0, $size, $size, $width, $height);
                    imagejpeg($thumb, $thumbPath, 90);
                    imagedestroy($thumb);
                    imagedestroy($image);

                    echo "<p>Thumbnail ukuran {$size}px berhasil dibuat!</p>";
                    echo "<img src='$thumbPath' alt='Thumbnail' style='max-width: 100%;'><br>";
                }
            } else {
                die("Gagal mengunggah file.");
            }
        }

        function createImage($filePath)
        {
            $fileType = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
            if ($fileType === 'jpg' || $fileType === 'jpeg') {
                $image = imagecreatefromjpeg($filePath);
            } elseif ($fileType === 'png') {
                $image = imagecreatefrompng($filePath);
            } else {
                return [null, 0, 0];
            }
            return [$image, imagesx($image), imagesy($image)];
        }
        ?>

    </div>
</body>

</html>