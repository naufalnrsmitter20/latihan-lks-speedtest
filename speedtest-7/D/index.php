<?php

$jsonfile = "data.json";
if (file_exists($jsonfile)) {
    $data = file_get_contents($jsonfile);
    $dataArray = json_decode($data, true);
    $currentPage = $_GET["page"] ?? 0;
    $offsetPage = $currentPage * 5;
    // $offsetPagination = $currentPage - 3 ? $currentPage : $currentPage - 3;
    $offsetPagination = 0;
    if ($currentPage <= 3) {
        $offsetPagination = 0;
    } elseif ($currentPage >= 14) {
        $offsetPagination = 11;
    } else {
        $offsetPagination = $currentPage - 3;
    }
    $totalPage = floor(count($dataArray) / 5);
    $pageGroup = range(1, $totalPage);
    $page5Currently = array_slice($pageGroup, $offsetPagination, 5);
    $currentData = array_slice($dataArray, $offsetPage, 5);
    header("application/json");
    // $currentData = json_encode($dataset, JSON_PRETTY_PRINT);
} else {
    echo "file json not found";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>D</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .container {
            width: 80%;
            height: auto;
            padding: 10px;
            display: grid;
            gap: 24px;
            grid-template-columns: repeat(5, 1fr);
        }

        .pagination-container {
            margin-top: 30px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            gap: 22px;
        }

        .next {
            padding: 16px 8px 16px 14px;
            background-color: lightgray;
            cursor: pointer;
        }

        .next:hover {
            background-color: slategray;
        }

        .next .icon {
            content: "";
            width: 12px;
            height: 12px;
            border-bottom: solid 2px white;
            border-left: solid 2px white;
            transform: rotate(45deg);
        }

        .back {
            padding: 16px 14px 16px 8px;
            background-color: lightgray;
            cursor: pointer;
        }

        .back:hover {
            background-color: slategray;
        }

        .back .icon {
            content: "";
            width: 12px;
            height: 12px;
            border-top: solid 2px white;
            border-right: solid 2px white;
            transform: rotate(45deg);
        }

        .pag-item {
            display: flex;
            gap: 22px;
            justify-content: center;
            align-items: center;
        }

        .pag-item p {
            padding: 16px 20px;
            border-radius: 100%;
            background-color: cornflowerblue;
        }

        .pag-item p:hover {
            background-color: steelblue;
            cursor: pointer;
        }

        .currrent {
            background-color: steelblue;
        }
    </style>
</head>

<body>
    <div class="container">
        <?php
        foreach ($currentData as $item) {
            echo "
        <div class='card'>
        <p>{$item['id']}</p>
        <p>{$item['age']}</p>
        <p>{$item['name']}</p>
        <p>{$item['gender']}</p>
        <p>{$item['company']}</p>
        <p>{$item['email']}</p>
        <p>{$item['phone']}</p>
        <p>{$item['address']}</p>
        </div>
        ";
        }
        ?>
    </div>
    <div class="pagination-container">
        <div onclick="window.location.href = '?page=<?= $currentPage > 0 ? $currentPage - 1 : 0 ?>'" class="next">
            <div class="icon">
            </div>
        </div>
        <div class="pag-item">
            <?php foreach ($page5Currently as $item) {
                if ($item == $item) {
                    echo "<p class='currrent' onclick='window.location.href =\"?page=$item\"'>$item</p>";
                } else {
                    echo "<p onclick='window.location.href =\"?page=$item\"'>$item</p>";
                }
            } ?>
        </div>
        <p></p>
        <div onclick="window.location.href = '?page=<?= $currentPage + 1 ?>'" class="back">
            <div class="icon"></div>
        </div>
    </div>
</body>

</html>