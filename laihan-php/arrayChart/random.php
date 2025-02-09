<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <?php
    $data = [
        ["name" => "Charlotte", "value" => 380, "color" => "blue"],
        ["name" => "Joshua", "value" => 330, "color" => "red"],
        ["name" => "Olivia", "value" => 390, "color" => "yellow"],
        ["name" => "Daisy", "value" => 340, "color" => "green"],
        ["name" => "Samuel", "value" => 300, "color" => "orange"],
        ["name" => "Michael", "value" => 370, "color" => "violet"],
        ["name" => "Shopie", "value" => 390, "color" => "cyan"],
    ]
    ?>
    <div class="container">
        <div class="num-container">
            <?php
            $num = 150;
            for ($i = 750; $i >= 150; $i -= $num) {
                echo '<div style="height: ' . $num . 'px;">';
                echo "<p>" . $i . "</p>";
                echo "</div>";
            } ?>
            <div>
                <p>0</p>
            </div>
        </div>
        <div class="chart-container">
            <?php foreach ($data as $row => $value) {
                echo '<div class="sub">';
                echo '<div style="height:' . $value["value"] . 'px; background-color:' . $value['color'] . ' ;" class="bar"></div> ';
                echo '<div class="label">' . $value['name'] . '</div>';
                echo '</div>';
            }
            ?>
        </div>
    </div>




</body>

</html>