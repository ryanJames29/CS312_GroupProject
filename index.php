<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="author" content="">
  <meta name="description" content="CS312 Group Project">
  <meta name="keywords" content="">
  <title>CS312</title>
  <link rel="stylesheet" href="./style.css">
  <script src="./js/tableGenerator.js"></script>
</head>

<body class="home-content">
    <?php include 'navbar.php'; ?>  
    <h1>Team 18 LLC</h1>
    <img src="Image Name" alt="Image Discription" width="" height="">

    <h2>Table Generator</h2>

    <label for="rowColCount">Enter number for Rows & Columns (1-26)</label>
    <input type="number" id="rowColCount" min="1" max="26">
    <br>
    <label for="colorCount">Enter number of Colors (1-10)</label>
    <input type="number" id="colorCount" min="1" max="10">
    <br>
    <button onclick="generateTables()">Generate Tables</button>
   

    <div id="errorMessage" class="errorMessage"></div>
    <div id="tablesContainer"></div>  

</body> 
