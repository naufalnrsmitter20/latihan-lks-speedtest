<?php
date_default_timezone_set("Asia/Jakarta");

$month = isset($_GET["month"]) ? (int) $_GET["month"] : date("n");
$year = isset($_GET["year"]) ? (int) $_GET["year"] : date("Y");

if ($month < 1) {
    $month = 12;
    $year--;
} elseif ($month > 12) {
    $month = 1;
    $year++;
}

$firstDayOnMonth = strtotime("$year-$month-01");
$daysInMonth = date("t", $firstDayOnMonth);
$firstDayOnWeek = date("w", $firstDayOnMonth);

$today = date("j");
$currentMonth = date("n");
$currentYear = date("Y");

$monthArray = [1 => "January", 2 =>  "February", 3 => "March", 4 => "April", 5 =>  "May", 6 => "June", 7 => "July", 8 => "August", 9 => "September", 10 => "Oktober", 11 => "November", 12 => "December"];

?>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>D1</title>
    <link rel="stylesheet" href="calendar.css">
</head>

<body>
    <div class="custom-calendar-wrap">
        <div class="custom-inner">
            <div class="custom-header clearfix">
                <nav>
                    <a href="?month=<?= $month - 1 ?>&year=<?= $year ?>" class="custom-btn custom-prev"></a>
                    <a href="?month=<?= $month + 1 ?>&year=<?= $year ?>" class="custom-btn custom-next"></a>
                </nav>
                <h2 id="custom-month" class="custom-month"><?= $monthArray[$month] ?></h2>
                <h3 id="custom-year" class="custom-year"><?= $year ?></h3>
            </div>
            <div id="calendar" class="fc-calendar-container">
                <div class="fc-calendar fc-five-rows">
                    <div class="fc-head">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div class="fc-body">
                        <?php
                        $day = 1;

                        for ($row = 0; $row < 6; $row++) {
                            echo '<div class="fc-row">';
                            for ($col = 0; $col < 7; $col++) {
                                if ($row == 0 && $col < $firstDayOnWeek) {
                                    echo "<div><span class='fc-date'>" . "</span></div>";
                                } elseif ($day <= $daysInMonth) {
                                    $isToday = ($day == $today && $month == $currentMonth && $year == $currentYear);
                                    $class = $isToday ? "fc-today" : "";
                                    echo "<div class='$class'><span class='fc-date'>$day</span></div>";
                                    $day++;
                                } else {
                                    echo ' <div><span class="fc-date"></span></div>';
                                }
                            }
                            echo '</div>';
                            if ($day > $daysInMonth)
                                break;
                        }
                        ?>

                    </div>
                </div>
            </div>
        </div>
</body>

</html>