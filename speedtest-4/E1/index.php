<?php
$xmlfile = "example.xml";
if (file_exists($xmlfile)) {
    $getxml = simplexml_load_file($xmlfile);
    $parser = json_encode($getxml, JSON_PRETTY_PRINT);
    print_r($parser);
}
