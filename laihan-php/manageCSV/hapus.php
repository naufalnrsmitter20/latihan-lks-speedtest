<?php
$filename = "data.csv";
$no_todelete = $_GET["no"];
$data = [];
if (file_exists($filename)) {
    $file = fopen($filename, "r");
    $headers = fgetcsv($file, 0, ";");
    while ($row = fgetcsv($file, 0, ";")) {
        if ($row[0] != $no_todelete) {
            $data[] = $row;
        }
    }
    fclose($file);
}

$file = fopen($filename, "w");
fputcsv($file, $headers, ";");
foreach ($data as $row) {
    fputcsv($file, $row, ";");
}
fclose($file);

header("Location: index.php");
exit();