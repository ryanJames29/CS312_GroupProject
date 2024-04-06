<?php
    error_reporting (E_ALL ^ E_NOTICE);
    $rowsAndColumns = 0;
    $colors = 0;
    $useRowsAndColumns = false;
    $useColors = false;
    /*
    if ($_GET["rows"] > 0) {
        $useRowsAndColumns = true;
    }
    if ($_GET["colors"] > 0) {
        $useColors = true;
    }
    */
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="author" content="">
    <meta name="description" content="CS312 Group Project, team 18">
    <meta name="keywords" content="">
    <title>Table Generator</title>
    <link rel="stylesheet" href="./style.css">
    <script src="./js/tableGenerator.js"></script>
</head>

<body class="home-content">
    <?php include 'navbar.php'; ?>
    <h2>Table Generator</h2>

    <label for="rowColCount">Enter number for Rows & Columns (1-26)</label><br>
    <input class="input" type="number" id="rowColCount" min="1" max="26">
    <br><br>
    <label for="colorCount">Enter number of Colors (1-10)</label><br>
    <input class="input" type="number" id="colorCount" min="1" max="10">
    <br><br>
    <button onclick="generateTables()">Generate Tables</button><br>

    <div id="errorMessage" class="errorMessage"></div>
    <div id="tablesContainer"></div>  
</body>