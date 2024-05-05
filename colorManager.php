<?php
// CREATE TABLE colors (id int NOT NULL AUTO_INCREMENT, Name varchar(255) NOT NULL, HexValue varchar(32) NOT NULL, PRIMARY KEY (id));
// insert into colors (Name, HexValue) values ("Red", "FF0000"), ("Orange", "FFA500"), ("Yellow", "FFFF00"), ("Green", "00FF00"), ("Teal", "008080"), ("Blue", "0000FF"), ("Purple", "800080"), ("Brown", "964B00"), ("Grey", "808080"), ("Black", "000000");

if(array_key_exists('addColor', $_POST)) { 
    $name = $_POST["colorName"];
    $hex = $_POST["colorHex"];
    addColor($name, $hex); 
} 

function addColor($name, $hex) {
    $hostname = "faure";
    $username = "rm0819";
    $password = "835456763";
    $database = "rm0819";
    $mysqli = new mysqli($hostname, $username, $password, $database);

    // Test for the color already being in the table
    $sql = "SELECT Name, HexValue FROM colors";
    $result = $mysqli->query($sql);
    while ($row = $result->fetch_row()) {
        if ($row[0] == $name) {
            echo "<p class=\"errorMessage\">That name already exists in the list of colors.</p>";
            return;
        }
        if ($row[1] == $hex) {
            echo "<p class=\"errorMessage\">That hex value already exists in the list of colors.</p>";
            return;
        }
    }

    $sql = "INSERT INTO colors(Name, HexValue) VALUES (?, ?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ss", $name, $hex);
    $stmt->execute();
    // $result = $stmt->get_result();
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