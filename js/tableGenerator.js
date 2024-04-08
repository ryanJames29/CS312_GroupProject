// TODO: 
//  - Add styling requirements for the table

function generateColorTable(colorCountInput) {
  var colorTable = document.createElement("table");

  //use this id for styling
  colorTable.id = "colorTable"; 
 
  // Array of colors based on assignment. Wasn't sure of an "intuitive" way of organizing them 
  // other than from hot colors to cooler colors. Maybe there is a better way???
  var colorOptions = ["Red", "Orange", "Yellow", "Blue", "Teal", "Purple", "Green", "Brown","Grey", "Black"];

  var selectedColors = [];

  for (var i = 0; i < colorCountInput; i++) {
    var row = colorTable.insertRow();
    var colorCell = row.insertCell();
    // For styling
    colorCell.id = "dropDownCell";

    var initialColor = colorOptions[i % colorOptions.length];
    selectedColors.push(initialColor);

    var select = createColorSelect(colorOptions, initialColor, i, selectedColors);
    // For styling
    select.id = "dropDownMenu";

    colorCell.appendChild(select);

    var blankCell = row.insertCell();
    blankCell.textContent = ""; 
    // For styling
    blankCell.id = "colorCell";
  }

  return colorTable;
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

  //for accessing the initial colors in dropdown, and their indices.
  select.setAttribute("color-index", index);
  select.setAttribute("color-initial", initialValue);

  //Added an event listner to look for changes in dropdown box.
  select.addEventListener("change", function(event) {
    var selectedIndex = parseInt(event.target.getAttribute("color-index"));
    var selectedColor = event.target.value;

    var previousValue = event.target.getAttribute("color-initial");

    selectedColors[selectedIndex] = selectedColor;

    var isUnique = isColorUnique(selectedColors, selectedColor, selectedIndex);
    if (!isUnique) {
      // defaults back to what original color was prior to disallowed selection
      event.target.value = previousValue;
      displayErrorMessage(event.target.parentNode, "Color is already selected!");
    } else {
      clearColorErrorMessage(event.target.parentNode);
    }
    event.target.setAttribute("color-initial", event.target.value);
  });

  return select;
}

function isColorUnique(selectedColors, selectedColor, currentIndex) {
  for (var i = 0; i < selectedColors.length; i++) {
    if (i !== currentIndex && selectedColors[i] === selectedColor) {
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
  errorMessage.style.fontSize= "12px";

  cell.appendChild(errorMessage);
}

// clears color error message, 
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
