<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Upload Image</title>
</head>

<body>
    <form action="index.php" method="POST" enctype="multipart/form-data">
        <div>
            <label for="image"></label>
            <input type="file" name="image" id="image">
        </div>
        <button type="submit">submit</button>
    </form>
    <img src="" alt="">
    <?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $imagepath = "image/";
        @mkdir("image/", 0777, true);
        $filename = basename($_FILES["image"]["name"]);
        $targetPath = $imagepath . $filename;
        $filetype = strtolower(pathinfo($targetPath, PATHINFO_EXTENSION));
        $allowedFileType = ["png", "jpg", "jpeg", "svg"];
        if (!in_array($filetype, $allowedFileType)) {
            echo "tipe gambar harus png, jpg, jpeg, atau svg";
            return;
        }

        if ($_FILES["image"]["size"] > 2 * 1024 * 1024) {
            echo "ukuran gambar terlalu besar, max 2mb";
            return;
        }
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetPath)) {
            echo $_FILES['image']['type'];
            echo "sukses mengupload gambar!";
            echo "<br/>";
            echo "<img src='$targetPath' alt='img 1'>";
        }
    } else {
        echo "request method not alllowed!";
    }
    ?>

</body>

</html>