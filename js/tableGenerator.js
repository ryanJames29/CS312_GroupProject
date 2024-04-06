// TODO: 
//  - Add styling requirements for the table

function generateColorTable(colorCountInput) {
  var colorTable = document.createElement("table");

  //use this id for styling
  colorTable.id = "colorTable"; 

  var colorOptions = ["Red", "Orange", "Yellow", "Blue", "Teal", "Purple", "Green", "Brown", "Black"];

  var selectedColors = [];

  for (var i = 0; i < colorCountInput; i++) {
    var row = colorTable.insertRow();
    var colorCell = row.insertCell();

    var initialColor = colorOptions[i % colorOptions.length];
    selectedColors.push(initialColor);

    var select = createColorSelect(colorOptions, initialColor, i, selectedColors);

    colorCell.appendChild(select);

    var blankCell = row.insertCell();
    blankCell.textContent = ""; 
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

  select.setAttribute("data-index", index);

  select.setAttribute("data-initial", initialValue);

  select.addEventListener("change", function(event) {
    var selectedIndex = parseInt(event.target.getAttribute("data-index"));
    var selectedColor = event.target.value;

    var previousValue = event.target.getAttribute("data-initial");

    selectedColors[selectedIndex] = selectedColor;

    var isUnique = isColorUnique(selectedColors, selectedColor, selectedIndex);
    if (!isUnique) {
      event.target.value = previousValue;

      displayErrorMessage(event.target.parentNode, "Color must be unique!");
    } else {
      clearErrorMessage(event.target.parentNode);
    }
    event.target.setAttribute("data-initial", event.target.value);
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
  clearErrorMessage(cell);

  var errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.style.color = "#C7D4D6";
  errorMessage.style.fontSize= "12px";

  cell.appendChild(errorMessage);
}

function clearErrorMessage(cell) {
  var errorMessage = cell.querySelector("p");
  if (errorMessage) {
    errorMessage.remove();
  }
}


function generateAlphabeticalTable(rowCountInput) {
  var alphabetTable = document.createElement("table");

  var headerRow = alphabetTable.insertRow();
  headerRow.insertCell(); 
  for (var i = 0; i < rowCountInput; i++) {
    var headerCell = headerRow.insertCell();
    headerCell.textContent = String.fromCharCode(65 + i); 
  }

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
  
  errorMessage.textContent = "";
  tablesContainer.innerHTML = ""; 
  
  // Input Validation
  if (rowCountInput < 1 || rowCountInput > 26 || colorCountInput < 1 || colorCountInput > 10) {
    errorMessage.textContent = "Unsupported value entered. Please enter values between 1 and 26 for rows/columns and between 1 and 10 for colors.";
    return;
  }
  
  var colorTable = generateColorTable(colorCountInput);
  var alphabetTable = generateAlphabeticalTable(rowCountInput);
  
  tablesContainer.appendChild(colorTable);
  tablesContainer.appendChild(alphabetTable);
}
