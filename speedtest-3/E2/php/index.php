<?php
$jsonfile = file_get_contents("result.json");
$data = json_decode($jsonfile, true, 512);
$messages = $data["messages"];

$totalMessageSend = 0;
$totalMessageReceived = 0;
$totalCharactersLengthSent = 0;
$totalCharactersLengthReceived = 0;

$wordFrequency = [];

foreach ($messages as $message) {
    if ($message["from"] === "Budi") {
        $totalMessageSend++;
        $totalCharactersLengthSent += strlen($message["text"]);
        $words = str_word_count(strtolower($message["text"]), 1);
        foreach ($words as $word) {
            if (isset($wordFrequency[$word])) {
                $wordFrequency[$word]++;
            } else {
                $wordFrequency[$word] = 1;
            }
        }
    } elseif ($message["from"] === "Bot") {
        $totalMessageReceived++;
        $totalCharactersLengthReceived += strlen($message["text"]);
    }
}

$avgMessageSend = $totalMessageSend > 0 ? floor($totalCharactersLengthSent / $totalMessageSend) : 0;
$avgMessageReceived = $totalMessageReceived > 0 ? floor($totalCharactersLengthReceived / $totalMessageReceived) : 0;

arsort($wordFrequency);
$top5word = array_slice($wordFrequency, 0, 5, true);

foreach ($top5word as $word => $count) {
    echo "- $word: $count\n";
}

echo "Total Message Send: $totalMessageSend
Total Message Received: $totalMessageReceived
Average character length sent $avgMessageSend
Average character length received $avgMessageReceived
";
