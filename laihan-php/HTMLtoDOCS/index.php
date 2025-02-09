<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $htmlContent = $_POST["htmlContent"];
    // Pastikan ada konten
    if (empty($htmlContent)) {
        die("Silakan masukkan HTML sebelum mengunduh.");
    }
    // Nama file yang akan diunduh
    $fileName = $_POST["title"] . ".doc";
    // Header agar browser memproses sebagai file unduhan
    header("Content-Type: application/vnd");
    header("Content-Disposition: inline; filename=\"$fileName\"");
    echo "<html><body>";
    echo $htmlContent;
    echo "</body></html>";
    exit;
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Convert HTML Input to DOC</title>
</head>

<body>
    <h2>Convert HTML Input to DOC</h2>
    <form method="post">
        <input type="text" required name="title" placeholder="nama file">
        <textarea name="htmlContent" placeholder="Tulis HTML di sini..."></textarea><br />
        <button type="submit">Download as DOC</button>
    </form>
</body>

</html>