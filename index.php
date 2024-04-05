<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="author" content="">
  <meta name="description" content="CS312 Group Project, team 18">
  <meta name="keywords" content="">
  <title>Team 18 LLC</title>
  <link rel="stylesheet" href="./style.css">
  <script src="./js/tableGenerator.js"></script>
  <link rel="icon" type="image/png" sizes="32x32" href="./images/logo.png">
</head>

<body class="home-content">
    <?php include 'navbar.php'; ?>  
    <h1>Team 18 LLC</h1>
    <img src="./images/logo.png" alt="Team 18 LLC" width="300" height="200">

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
