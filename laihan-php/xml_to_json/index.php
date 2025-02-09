<?php
$file = "example.xml";
if (isset($file)) {
    $xml_content = simplexml_load_file($file);
    if ($xml_content === false) {
        header("Content-type: application/json");
        echo json_encode(["error" => "error parsing data"]);
        exit();
    }
    $result = json_encode($xml_content, JSON_PRETTY_PRINT);
    header("Content-type: application/json");
    print_r($result);
} else {
    echo "error";
}
