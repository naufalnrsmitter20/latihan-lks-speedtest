<?php

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $values = $_GET["factor"];
    $num = range(1, 41);
    $numGroup = [];
    for ($i = 1; $i < sizeof($num); $i++) {
        if ($i === 0) {
            array_push($numGroup, "$i");
        } else
        if ($i % $values === 0) {
            array_push($numGroup, "$i is a multiple of $values**");
        } else {
            array_push($numGroup, "$i");
        }
    }
    foreach ($numGroup as $item => $value) {
        echo "[" . $item . "]" . " => " . $value;
        echo "<br/>";
    }
} else {
    echo "silahkan dibuka di browser";
}