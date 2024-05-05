
function generateColorTable(colorCountInput) {
  var colorTable = document.createElement("table");
  colorTable.id = "colorTable";

  var colorOptions = ["Red", "Orange", "Yellow", "Blue", "Teal", "Purple", "Green", "Brown", "Grey", "Black"];

  for (var i = 0; i < colorCountInput; i++) {
    var row = colorTable.insertRow();
    var colorCell = row.insertCell();
    // For styling
    colorCell.id = "dropDownCell";
    var initialColor = colorOptions[i % colorOptions.length];

    // Create color selection dropdown
    var select = createColorSelect(colorOptions, initialColor, i, colorTable);
    // For styling
    select.id = "dropDownMenu";
    // Append color selection dropdown to cell
    colorCell.appendChild(select);

    // Create adjacent cell for displaying selected color
    var displayCell = row.insertCell();
    displayCell.style.backgroundColor = initialColor; 

    select.addEventListener("change", function(event) {
      var selectedColor = event.target.value;
      var colorCell = event.target.parentNode.nextElementSibling;
      if (colorCell) {
        // Check if the selected color is unique
        var selectedIndex = parseInt(event.target.getAttribute("color-index"));
        var selectedColors = colorTable.querySelectorAll("select[color-index]");
        var isUnique = isColorUnique(selectedColors, selectedColor, selectedIndex);
        if (!isUnique) {
          // If color selection is not unique, revert back to the previous value
          event.target.value = event.target.getAttribute("color-initial");
          displayErrorMessage(event.target.parentNode, "Color is already selected!");
        } else {
          colorCell.style.backgroundColor = selectedColor;
          clearColorErrorMessage(event.target.parentNode);
        }
      } else {
        console.error("Adjacent color cell not found for index:", selectedIndex);
      }

      // Update the 'color-initial' attribute with the newly selected color
      event.target.setAttribute("color-initial", event.target.value);
    });
  }

  return colorTable;
}

function isColorUnique(selectedColors, selectedColor, currentIndex) {
  for (var i = 0; i < selectedColors.length; i++) {
    if (i !== currentIndex && selectedColors[i] === selectedColor) {
      return false;
    }
  }
  return true;
}

function createColorSelect(options, initialValue, index, selectedColors) {
  var select = document.createElement("select");

  options.forEach(function(color) {
    var option = document.createElement("option");
    option.text = color;
    if (color === initialValue) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  // Set attributes for tracking initial color and index
  select.setAttribute("color-index", index);
  select.setAttribute("color-initial", initialValue);

  return select;
}

function displayErrorMessage(cell, message) {
  clearColorErrorMessage(cell);

  var errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.style.color = "#C7D4D6";
  errorMessage.style.fontSize = "12px";

  cell.appendChild(errorMessage);
}

function clearColorErrorMessage(cell) {
  var errorMessage = cell.querySelector("p");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function createColorSelect(options, initialValue, index, colorTable) {
  var select = document.createElement("select");

  options.forEach(function(color) {
    var option = document.createElement("option");
    option.text = color;
    if (color === initialValue) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  // Set attributes for tracking initial color and index
  select.setAttribute("color-index", index);
  select.setAttribute("color-initial", initialValue);

  return select;
}

function isColorUnique(selectedColors, selectedColor, currentIndex) {
  for (var i = 0; i < selectedColors.length; i++) {
    if (i !== currentIndex && selectedColors[i].value === selectedColor) {
      return false;
    }
  }
  return true;
}

function displayErrorMessage(cell, message) {
  clearColorErrorMessage(cell);

  var errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.style.color = "#C7D4D6";
  errorMessage.style.fontSize = "12px";

  cell.appendChild(errorMessage);
}

function clearColorErrorMessage(cell) {
  var errorMessage = cell.querySelector("p");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function generateAlphabeticalTable(rowCountInput) {
  var alphabetTable = document.createElement("table");
  // For styling
  alphabetTable.id = "alphabetTable";

  var headerRow = alphabetTable.insertRow();
  headerRow.insertCell(); 
  for (var i = 0; i < rowCountInput; i++) {
    var headerCell = headerRow.insertCell();
    headerCell.id = "alphabetTableCell";
    headerCell.textContent = String.fromCharCode(65 + i); 
  }

  for (var i = 0; i < rowCountInput; i++) {
    var row = alphabetTable.insertRow();
    var labelCell = row.insertCell();
    labelCell.id = "alphabetTableCell";
    labelCell.textContent = i + 1; 
    for (var j = 0; j < rowCountInput; j++) {
      var cell = row.insertCell();
      cell.id = "alphabetTableCell";
    }
  }
  return alphabetTable;
}

function generateTables() {
  var rowCountInput = document.getElementById("rowColCount").value;
  var colorCountInput = document.getElementById("colorCount").value;
  var errorMessage = document.getElementById("errorMessage");
  var tablesContainer = document.getElementById("tablesContainer");
  
  errorMessage.textContent = "";
  tablesContainer.innerHTML = ""; 
  
  // User Input Validation for rows/columns and number of colors
  if (rowCountInput < 1 || rowCountInput > 26 || colorCountInput < 1 || colorCountInput > 10) {
    errorMessage.textContent = "Unsupported value entered. Please enter values between 1 and 26 for rows/columns and between 1 and 10 for colors.";
    return;
  }
  
  var colorTable = generateColorTable(colorCountInput);
  var alphabetTable = generateAlphabeticalTable(rowCountInput);
  
  tablesContainer.appendChild(colorTable);
  tablesContainer.appendChild(alphabetTable);
}

function print() {
  var css = '<style type="text/css">' +
            'table' + '{' +
                'border-collapse: collapse;' +
                'margin-bottom: 30px;' +
                'margin-top: 30px;' +
              '}' +
              'td, th' + '{' +
                'border: 2px solid;' +
                'padding: 10px;' +
                'text-align: center;' +
                '}' +
              '#colorTable' + '{' +
                  'width: 80%;' +
              '}' +
              '#dropDownCell' + '{' +
                  'width: 20%;' +
              '}' +
              '#colorCell' + '{' +
                  'width: 80%;' +
              '}' +
              '#dropDownMenu' + '{' +
                  'width: 90%;' +
                  'apperance: none' +
              '}' +
              '#alphabetTableCell' + '{' +
                  'width: 30px;' +
                  'height: 30px;' +
              '}' +
        '</style>';
  var printContents =  css + document.getElementById("tablesContainer").innerHTML;
  w=window.open("");
  w.document.write('<img src="./images/logo.png" width="200px" height="100px" />');
  w.document.write(printContents);
}
