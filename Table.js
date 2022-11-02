    
      
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>
        
        <!--##JAVASCRIPT FUNCTIONS ---------------------------------------------------- -->
        <script>
          //PREVENT FORMS FROM SUBMITTING / PREVENT DEFAULT BEHAVIOUR
          function preventFormSubmit() {
            var forms = document.querySelectorAll('form');
            for (var i = 0; i < forms.length; i++) {
              forms[i].addEventListener('submit', function(event) {
              event.preventDefault();
              });
            }
          }
          window.addEventListener("load", preventFormSubmit, true); 
             
          
          //HANDLE FORM SUBMISSION
          function handleFormSubmit(formObject) {
            google.script.run.withSuccessHandler(createTable).processForm(formObject);
            document.getElementById("search-form");
          }
        
          //CREATE THE DATA TABLE
          function createTable(dataArray) {
            if(dataArray && dataArray !== undefined && dataArray.length != 0){
              var result = "<table class='table table-sm table-striped' id='dtable' style='font-size:0.8em'>"+
                           "<thead style='white-space: nowrap'>"+
                             "<tr>"+                               //Change table headings to match witht he Google Sheet
                              "<th scope='col'>ID</th>"+
                              "<th scope='col'>STATUS</th>"+
                              "<th scope='col'>DRIVER</th>"+
                              "<th scope='col'>ORIGIN</th>"+
                              "<th scope='col'>DESTINATION</th>"+
                              "<th scope='col'>PHONE</th>"+
                              "<th scope='col'>PRICE</th>"+
                              
                             "<th scope='col'>DATE</th>"+
                            "</tr>"+
                          "</thead>";
              for(var i=0; i<dataArray.length; i++) {
                  result += "<tr>";
                  for(var j=0; j<dataArray[i].length; j++){
                      result += "<td>"+dataArray[i][j]+"</td>";
                  }
                  result += "</tr>";
              }
              result += "</table>";
              var div = document.getElementById('search-results');
              div.innerHTML = result;
            }else{
              var div = document.getElementById('search-results');
              //div.empty()
              div.innerHTML = "Data not found!";
            }
          }
        </script>
        <!--##JAVASCRIPT FUNCTIONS ~ END ---------------------------------------------------- -->
        
    
  
        <div class="container">
            <br>
            <div class="row">
              <div class="col">
            
                  <!-- ## SEARCH FORM ------------------------------------------------ -->
                  <form id="search-form" class="form-inline" onsubmit="handleFormSubmit(this)">
                    <div class="form-group mb-2">
                     
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                      <output type="text" class="form-control" id="searchtext" name="searchtext" style="display:none;">
                    </div>
                    <button type="submit"  class="btn btn-primary btn-lg"><span onclick="confirm()" >UPDATE</span></button>
                  </form>
                  <!-- ## SEARCH FORM ~ END ------------------------------------------- -->
              
              </div>
              <!-- <a id="req" href="https://wa.me/27783640463?text=Hi%20Vouga!%20I%20need%20a%20taxi"> Switch to Whatsapp </a> -->
            </div>
            <br>
            <div class="row">
              <div class="col">
            
                <!-- ## TABLE OF SEARCH RESULTS ------------------------------------------------ -->
                <div id="search-results" class="table-responsive" style="none;">
                  <!-- The Data Table is inserted here by JavaScript -->
                </div>
                <!-- ## TABLE OF SEARCH RESULTS ~ END ------------------------------------------------ -->
                  
              </div>
            </div>
        </div>
        <script>
var myVar;

function confirm() {
  myVar = setTimeout(showPage, 15000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("search-results").style.display = "block";
}
</script>
