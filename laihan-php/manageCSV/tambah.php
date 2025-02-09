<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambahkan data siswa</title>
</head>

<body>
    <form action="tambah.php" method="POST" enctype="multipart/form-data">
        <div>
            <label for="no">no</label>
            <input type="text" name="no" id="no">
        </div>
        <div>
            <label for="nama">nama</label>
            <input type="text" name="nama" id="nama">
        </div>
        <div>
            <label for="umur">umur</label>
            <input type="number" name="umur" id="umur">
        </div>
        <div>
            <label for="kelas">kelas</label>
            <input type="text" name="kelas" id="kelas">
        </div>
        <button type="submit">submit</button>
    </form>
    <?php

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $filename = "data.csv";
        $no = $_POST["no"];
        $nama = $_POST["nama"];
        $kelas = $_POST["kelas"];
        $umur = $_POST["umur"];

        $file = fopen($filename, "a");
        if ($file === false) {
            die('Gagal membuka file. Pastikan file ada dan memiliki izin akses yang sesuai.');
        }
        fputcsv($file, [$no, $nama, $umur, $kelas], ";");
        fclose($file);
        header("Location: index.php");
        exit;
    }

    ?>

</body>

</html>