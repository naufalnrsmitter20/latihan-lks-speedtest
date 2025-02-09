<?php
$xmlfile = "example.xml";

if (file_exists($xmlfile)) {
    $openfile = simplexml_load_file($xmlfile);
    $resultfile = json_encode($openfile, JSON_PRETTY_PRINT);
    print_r($resultfile);
}
