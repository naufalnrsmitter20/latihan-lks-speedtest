<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Data in CSV</title>
</head>

<body>
    <div>
        <h1>Daftar siswa</h1>
        <br>
        <a href="tambah.php">Tambahkan siswa</a>
        <br><br>
        <table border="1" ccellpadding="10" cellspacing="0">
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Umur</th>
                <th>Kelas</th>
                <th>action</th>
            </tr>
            <!-- <a >a</a> -->
            <?php
            $filename = "data.csv";
            if (file_exists($filename)) {
                $file = fopen($filename, "r");
                fgetcsv($file, 1000, ";");
                while (($data = fgetcsv($file, 1000, ";")) !== false) {
                    if (isset($data)) {
                        echo "<tr>
                                <td>$data[0]</td>
                                <td>$data[1]</td>
                                <td>$data[2]</td>
                                <td>$data[3]</td>
                                <td><a href='hapus.php?no={$data[0]}' onclick='return confirm(\"Yakin ingin menghapus data ini?\")' >hapus</a></td>
                            </tr>
                            ";
                    } else {
                        echo "<tr>
                                <td colspan='5'>tidak ada data yang ditemukan</td>
                                </tr>
                            ";
                    }
                }
                fclose($file);
            }
            ?>

        </table>
    </div>
</body>

</html>