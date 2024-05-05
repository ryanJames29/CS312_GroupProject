<?php
// CREATE TABLE colors (id int NOT NULL AUTO_INCREMENT, Name varchar(255) NOT NULL, HexValue varchar(32) NOT NULL, PRIMARY KEY (id));
// insert into colors (Name, HexValue) values ("Red", "FF0000"), ("Orange", "FFA500"), ("Yellow", "FFFF00"), ("Green", "00FF00"), ("Teal", "008080"), ("Blue", "0000FF"), ("Purple", "800080"), ("Brown", "964B00"), ("Grey", "808080"), ("Black", "000000");

$hostname = "faure";
$username = "rm0819";
$password = "835456763";
$database = "rm0819";
$mysqli = new mysqli($hostname, $username, $password, $database);

if(array_key_exists('addColor', $_POST)) { 
    $name = $_POST["colorName"];
    $hex = $_POST["colorHex"];
    addColor($name, $hex); 
}
if(array_key_exists('editColor', $_POST)) { 
    $name = $_POST["colorName"];
    $hex = $_POST["colorHex"];
    $newName = $_POST["newColorName"];
    $newHex = $_POST["newColorHex"];
    editColor($name, $hex, $newName, $newHex); 
}
if(array_key_exists('deleteColor', $_POST)) { 
    $name = $_POST["colorValue"];
    deleteColor($name); 
}

function addColor($name, $hex) {
    global $mysqli;
    // Test for the color already being in the table
    $sql = "SELECT Name, HexValue FROM colors";
    $result = $mysqli->query($sql);
    while ($row = $result->fetch_row()) {
        if ($row[0] == $name) {
            echo "<p class=\"colorErrorMessage\">That name already exists in the list of colors.</p>";
            return;
        }
        if ($row[1] == $hex) {
            echo "<p class=\"colorErrorMessage\">That hex value already exists in the list of colors.</p>";
            return;
        }
    }

    $sql = "INSERT INTO colors(Name, HexValue) VALUES (?, ?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ss", $name, $hex);
    $stmt->execute();
    // $result = $stmt->get_result();
}

function editColor($name, $hex, $newName, $newHex) {
    global $mysqli;

    // Test for the color existing in the table
    $sql = "SELECT Name, HexValue FROM colors";
    $result = $mysqli->query($sql);
    $notInTable = true;
    while ($row = $result->fetch_row()) {
        if ($row[0] == $name || $row[1] == $hex) {
            $notInTable = false;
        }
    }
    if ($notInTable) {
        echo "<p class=\"colorErrorMessage\">That color does not exist in the list of colors.</p>";
        return;
    }

    $sql = "UPDATE colors SET Name=?, HexValue=? WHERE Name=? OR HexValue=?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("ssss", $newName, $newHex, $name, $hex);
    $stmt->execute();
}

function deleteColor($name) {
    global $mysqli;

    // Test for the color existing in the table
    $count = 0;
    $sql = "SELECT Name, HexValue FROM colors";
    $result = $mysqli->query($sql);
    $notInTable = true;
    while ($row = $result->fetch_row()) {
        if ($row[0] == $name) {
            $notInTable = false;
        }
        $count += 1;
    }
    if ($count < 2) {
        echo "<p class=\"colorErrorMessage\">Cannot delete the last color in the list.</p>";
        return;
    }
    if ($notInTable) {
        echo "<p class=\"colorErrorMessage\">That color does not exist in the list of colors.</p>";
        return;
    }

    $sql = "DELETE FROM colors WHERE Name=?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", $name);
    $stmt->execute();
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
    <div class="colorList">
        <h3>Color List:</h3>
        <?php
            $sql = "SELECT Name, HexValue FROM colors";
            $result = $mysqli->query($sql);
            while ($row = $result->fetch_row()) {
                echo $row[0] . " - " . $row[1] . "<br>";
            }
        ?>
    </div>

    <form method="post">
        <h2>Add a color!</h2>
        <label for="colorName">Enter name of color:</label><br>
        <input class="input" type="text" name="colorName" minlength="1" maxlength="20" required><br><br>
        <label for="colorHex">Enter hex code of color:</label><br>
        <input class="input" type="text" name="colorHex" minlength="6" maxlength="6" required>
        <br><br>
        <button name="addColor">Add color</button>
    </form>
    <br>
    <form method="post">
        <h2>Edit a color!</h2>
        <label for="colorName">Enter original name of color:</label><br>
        <input class="input" type="text" name="colorName" minlength="1" maxlength="20" required><br>
        <label for="colorHex">Enter original hex code of color:</label><br>
        <input class="input" type="text" name="colorHex" minlength="6" maxlength="6" required>
        <br><br>
        <label for="colorName">Enter new name of color:</label><br>
        <input class="input" type="text" name="newColorName" minlength="1" maxlength="20" required><br>
        <label for="colorHex">Enter new hex code of color:</label><br>
        <input class="input" type="text" name="newColorHex" minlength="6" maxlength="6" required>
        <br><br>
        <button name="editColor">Edit color</button>
    </form>
    <br>
    <form method="post">
        <h2>Delete a color!</h2>
        <label for="colorValue">Enter the name of color you want to delete:</label><br>
        <input class="input" type="text" name="colorValue" minlength="1" maxlength="20" required>
        <button name="deleteColor">Delete color</button>
    </form>
</body> 