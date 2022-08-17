<?php
function startsWith($haystack, $needle)
{
    $length = strlen($needle);
    return substr($haystack, 0, $length) === $needle;
}
function endsWith($haystack, $needle)
{
    $length = strlen($needle);
    if (!$length) {
        return true;
    }
    return substr($haystack, -$length) === $needle;
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Player</title>
    <link type="text/css" rel="stylesheet" href="styles.css" media="screen">
    <link rel="manifest" href="manifest.json">
    <meta name="apple-mobile-web-app-status-bar" content="default">
    <meta name="theme-color" content="#071026">
</head>

<body>
    <div id="side-bar">
        <div class="toggle-button" id="toggle-button">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <?php
        $dir = '/home/runner/video-player/videos/';
        $files1 = scandir($dir);
        $arrayLength = count($files1);
        $i = 0;
        echo '<div class="container">';
        echo '<div class="select-box">';
        echo '<div class="options-container">';
        while ($i < $arrayLength) {
            if (startsWith($files1[$i], "SAISON")) {
                echo '<div class="option">';
                echo '<input type="radio" class="radio" id="inuput' . $files1[$i] . '" name="category" />';
                echo '<label for="season">' . $files1[$i] . '</label>';
                echo '</div>';
            }
            $i++;
        }

        echo '</div>';
        echo '<div class="selected">Choix de la Saison</div>';
        echo '</div>';
        echo '</div>';
        $i = 0;
        while ($i < $arrayLength) {
            if (startsWith($files1[$i], "SAISON")) {
                $id = $files1[$i];
                ${"dir$i"} = '/home/runner/video-player/videos/' . $files1[$i];
                ${"files$i"} = scandir(${"dir$i"});
                $arrayLength2 = count(${"files$i"});
                $j = 0;
                echo "<ul id='" . $id . "' style='display: none;'>";
                while ($j < $arrayLength2) {
                    if (endsWith(${"files$i"}[$j], 'mp4')) {
                        echo "<li onclick='change_video(this)'>" . substr_replace(${"files$i"}[$j], '', -4) . "</li>";
                    }
                    $j++;
                };
                echo "</ul>";
            }
            $i++;
        }
        ?>
    </div>
    <div id="main"></div>
    <section>
        <div class="title">
            <h1>Video Player</h1>
            <h2 id='title'></h2>
            <img id="next_button" src="img/next_button.png" alt="next">
        </div>
        <div class="image">
            <img id="play_button" src="img/play_button.png" alt="play_button">
            <img id="play-img" src="img/bg.png" alt="play">
            <video id="player" playsinline controls></video>
        </div>

    </section>

    <!-- <div id="news"></div> -->

    <script src="app.js"></script>
    <script src="script.js"></script>
</body>

</html>