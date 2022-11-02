function doPost(e) {
  return HtmlService.createTemplateFromFile('home').evaluate().setXFrameOptionsMode(HtmlService.
XFrameOptionsMode.ALLOWALL);
  
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}





/* PROCESS FORM */
function processForm(formObject){  
  var result = "";
  if(formObject.searchtext){//Execute if form passes search text
      result = search(formObject.searchtext);
  }
  return result;
}

//SEARCH FOR MATCHED CONTENTS 
function search(searchtext){
  var spreadsheetId   = '1xE_ML2MF1IhuXVF8ShdaKp9qrWEMK2nTNnUgNdBMomY'; //** CHANGE !!!
  var dataRage        = 'TRIP!A2:H';                                    //** CHANGE !!!
  var data = Sheets.Spreadsheets.Values.get(spreadsheetId, dataRage).values;
  var ar = [];
  
  data.forEach(function(f) {
    if (~f.indexOf(searchtext)) {
      ar.push(f);
    }
  });
  return ar;
}




function Record(id,  status, driver, origin, destination, phone, price, date) {
  var url = 'https://docs.google.com/spreadsheets/d/1xE_ML2MF1IhuXVF8ShdaKp9qrWEMK2nTNnUgNdBMomY/edit#gid=2125228001';
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("TRIP");
  var message = GmailApp.getInboxThreads(0, 1)[0].getMessages()[0];
  webAppSheet.appendRow([id, status, driver, origin, destination, phone, price, date]);
  
 GmailApp.markMessageUnread(message).sendEmail("johnnybrozer@gmail.com", "Alert on Vouga App", "There is some money to make on the app!");
 GmailApp.markMessageUnread(message).sendEmail("johnchristbouma@gmail.com", "Alert on Vouga App", "There is some money to make on the app. Get connected on the Driver interface!");
 GmailApp.markMessageUnread(message).sendEmail("teegatwin@gmail.com", "Alert on Vouga App", "There is some money to make on the app. Get connected on the Driver interface!");
  GmailApp.markMessageUnread(message).sendEmail("ulrichelohim@hotmail.com", "Alert on Vouga App", "There is some money to make on the app. Get connected on the Driver interface!");
  GmailApp.markMessageUnread(message).sendEmail("thabanipatrickthabaninsele@gmail.com", "Alert on Vouga App", "There is some money to make on the app. Get connected on the Driver   interface!");
  GmailApp.markMessageUnread(message).sendEmail("jcb403@hotmail.com", "Alert on Vouga App", "There is some money to make on the app. Get connected on the Driver interface!");



}
