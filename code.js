function fillTokensInDocs() {
  // Defines the name of the form spreadsheet. Must be named FORM
  var sheetName = "FORM"; 
  
  // Gets the instance of the spreadsheet with the name FORM.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

// Gets the ID of your output template from the S_TEMPLATE cell.
  var docId = sheet.getRange("S_TEMPLATE").getValue();

  // Gets all named cells from the file.
  var namedRanges = sheet.getNamedRanges();
  
  // Create a copy of the Google Docs template document
  var copiedDoc = DriveApp.getFileById(docId).makeCopy();

  // Gets the ID of the copy.
  var newDocId = copiedDoc.getId();
  
  // Get the body of the copied document
  var doc = DocumentApp.openById(newDocId);
  var body = doc.getBody();
  
  // Iterate through the named ranges in the sheet
  for (var i = 0; i < namedRanges.length; i++) {
    var namedRange = namedRanges[i];
    var name = namedRange.getName();
    
    // Check if the named range starts with "T_"
    if (name.startsWith("T_")) {
      var range = namedRange.getRange();
      var value = range.getValue();
      
      // Replace the token with the named cell value in the document
      body.replaceText("{{" + name + "}}", value);
    }
  }
  
  // Save and close the modified document
  doc.saveAndClose();
  
  // Get the URL of the new document
  var newDocUrl = copiedDoc.getUrl();
  
  // Update the "OUTPUT" field in the Sheets document with the new document URL
  var outputCell = sheet.getRange("S_OUTPUT");
  outputCell.setValue(newDocUrl);

  // Done
}