// TODO: 
//  - Add styling requirements for the table
//  - Add color dropdown to the color table

function generateColorTable(colorCountInput) {
    // right column is empty. Directions don't say what is supposed to be in there? 
    // Maybe nothing for just Milestone 1???
    var dropDown = document.createElement("select");
    var colors = ["red", "orange", "yellow", "green", "blue", "purple", "grey", "brown", "black", "teal"]
    for (var i = 0; i < 10; i++) {
      option = document.createElement("option");
      option.setAttribute("value", "Red");  
      option.innerHTML = colors[i];
      dropDown.appendChild(option);
    }

    var colorTable = document.createElement("table");
    for (var i = 1; i <= colorCountInput; i++) {
      var row = colorTable.insertRow();
      var cell1 = row.insertCell(dropDown);
      var cell2 = row.insertCell();
      cell1.appendChild(dropDown);
    }
    return colorTable;
  }
  
  function generateAlphabeticalTable(rowCountInput) {
    var alphabetTable = document.createElement("table");
  
    var headerRow = alphabetTable.insertRow();
    headerRow.insertCell(); 
    for (var i = 0; i < rowCountInput; i++) {
      var headerCell = headerRow.insertCell();
      headerCell.textContent = String.fromCharCode(65 + i);
    }
  
    // cells are empty for now, Milestone 1 directions don't say that we need to 
    // populate them, do we?? Maybe for our next milestone??
    for (var i = 0; i < rowCountInput; i++) {
      var row = alphabetTable.insertRow();
      var labelCell = row.insertCell();
      labelCell.textContent = i + 1; 
      for (var j = 0; j < rowCountInput; j++) {
        var cell = row.insertCell();
      }
    }
    
    return alphabetTable;
  }
  
  function generateTables() {
    var rowCountInput = document.getElementById("rowColCount").value;
    var colorCountInput = document.getElementById("colorCount").value;
    var errorMessage = document.getElementById("errorMessage");
    var tablesContainer = document.getElementById("tablesContainer");
    
    // Clear previous message
    errorMessage.textContent = "";
    
    if (rowCountInput < 1 || rowCountInput > 26 || colorCountInput < 1 || colorCountInput > 10) {
      errorMessage.textContent = "Unsupported value entered, please enter allowed values for rows, columns, and colors.";
      tablesContainer.innerHTML = ""; 
      return;
    }
    
    tablesContainer.innerHTML = ""; 
    
    var colorTable = generateColorTable(colorCountInput);
    var alphabetTable = generateAlphabeticalTable(rowCountInput);
    
    tablesContainer.appendChild(colorTable);
    tablesContainer.appendChild(alphabetTable);
  }
  
  