<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>validateCSV</title>
</head>

<body>
    <table border="2">
        <tr>
            <th>Question</th>
            <th>Actual Answer</th>
            <th>Submitted Answer</th>
        </tr>
        <?php
        $actualFile = "actual.csv";
        $suubmittedFile = "submitted.csv";
        $actualGroup = [];
        $submittedGroup = [];
        $currValue = 0;
        $totalValue = 10;
        $result = [];
        if (file_exists($actualFile) && file_exists($suubmittedFile)) {
            $file1 = fopen($actualFile, "r");
            $file2 = fopen($suubmittedFile, "r");
            fgetcsv($file1, 1000, ";");
            fgetcsv($file2, 1000, ";");
            while (($dataActual = fgetcsv($file1, 1000, ";")) !== false && ($dataSubumitted = fgetcsv($file2, 1000, ";")) !== false) {
                if (isset($dataActual)) {
                    echo "<tr>
                            <td>$dataActual[0]</td>
                            <td>$dataActual[1]</td>
                            <td>$dataSubumitted[1]</td>
                        </tr>";
                }
                array_push($actualGroup, $dataActual[1]);
                array_push($submittedGroup, $dataSubumitted[1]);
            }
            for ($i = 0; $i < min(count($actualGroup), count($submittedGroup)); $i++) {
                if ($actualGroup[$i] === $submittedGroup[$i]) {
                    $result[] = $actualGroup[$i];
                }
            }
            $currValue =  count($result);
        }
        ?>
    </table>
    <p>score <?= $currValue . "/" . $totalValue ?></p>
</body>

</html>