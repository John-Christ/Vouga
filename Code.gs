function doGet(e) {
  var x = HtmlService.createTemplateFromFile("home");
  var y = x.evaluate();
  var z = y.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return z;
}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}









function checkLogin(tel) {
  var url = 'https://docs.google.com/spreadsheets/d/1xE_ML2MF1IhuXVF8ShdaKp9qrWEMK2nTNnUgNdBMomY/edit#gid=0';
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("DATA");
  var getLastRow =  webAppSheet.getLastRow();
  var found_record = '';
  for(var i = 1; i <= getLastRow; i++)
  {
   if(webAppSheet.getRange(i, 1).getValue() == tel)
   {
     found_record = 'TRUE';
   }    
  }
  if(found_record == '')
  {
    found_record = 'FALSE'; 
  }
  
  return found_record;
  
}

function AddRecord(tel, usernamee, emaill,time ) {
  var url = 'https://docs.google.com/spreadsheets/d/1xE_ML2MF1IhuXVF8ShdaKp9qrWEMK2nTNnUgNdBMomY/edit#gid=0';
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("DATA");
  webAppSheet.appendRow([tel,usernamee, emaill,time]);
  
}
