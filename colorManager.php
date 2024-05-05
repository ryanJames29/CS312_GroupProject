<?php
$hostname = "faure";
$username = "rm0819";
$password = "835456763";
$database = "rm0819";
$mysqli = new mysqli($hostname, $username, $password, $database);

// insert into colors values (0, "Red", "FF0000"), (1, "Orange", "FFA500"), (2, "Yellow", "FFFF00"), (3, "Green", "00FF00"), (4, "Teal", "008080"), (5, "Blue", "0000FF"), (6, "Purple", "800080"), (7, "Brown", "964B00"), (8, "Grey", "808080"), (9, "Black", "000000");

$sql = "SELECT * FROM colors"; 

$result = $mysqli->query($sql);

while ($row = $result->fetch_row()) {
    //echo "<p>Row: " . $row[1] . "</p>";
}

if(array_key_exists('addColor', $_POST)) { 
    $name = $_POST["colorName"];
    $hex = $_POST["colorHex"];
    addColor($name, $hex); 
} 

function addColor($name, $hex) {
    echo $name . $hex;
    $sql = "";
}


?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="author" content="">
  <meta name="description" content="CS312 Group Project, team 18">
  <meta name="keywords" content="">
  <title>Color Manager</title>
  <link rel="stylesheet" href="./style.css">
  <link rel="icon" type="image/png" sizes="32x32" href="./images/logo.png">
  <script src="./js/colorManager.js"></script>
</head>

<body class="home-content">
    <?php include 'navbar.php'; ?>  
    <h1>Color Manager</h1>

    <form method="post">
        <label for="colorName">Enter name of color:</label><br>
        <input class="input" type="text" name="colorName" minlength="1" maxlength="20"><br><br>
        <label for="colorHex">Enter hex code of color:</label><br>
        <input class="input" type="text" name="colorHex" minlength="6" maxlength="6">
        <br><br>
        <button name="addColor">Add color</button><br>
    </form>

</body> 