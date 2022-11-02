<script>


    function AddRow()
    {
      var tel = document.getElementById("tel").value;
      var usernamee = document.getElementById("usernamee").value;
      var emaill = document.getElementById("emaill").value;
      var time = document.getElementById("time").value;
      
      
      google.script.run.AddRecord(tel, usernamee,emaill,time);
      document.getElementById("page2_id1").className = "page2_id1-off";
      document.getElementById("page3_id1").className = "page3_id1";
   
    }
    

     function LoginUser()
    {
    var tel = document.getElementById("phone").value;

    google.script.run.withSuccessHandler(function(output) 
    {
      if(output == 'TRUE')
      {
         document.getElementById("contact").innerHTML = tel;
         document.getElementById("page1_id1").className = "page1_class1-off";
         document.getElementById("page4_id1").className = "page4_id1";    
      }
      else if(output == 'FALSE'|| phone == "")
      {
        document.getElementById("errorMessage").innerHTML = " Incorrect phone number or not registered ";     
      }    
    }
    ).checkLogin(tel);
    
    }
    
function function1(){
    document.getElementById("page1_id1").className = "page1_class1-off";
    document.getElementById("page2_id1").className = "page2_id1";
}
 
function function3(){ 
  document.getElementById("page3_id1").className = "page3_id1-off";
  document.getElementById("page1_id1").className = "page1_id1"; 
}


function function4(){ 
  document.getElementById("page2_id1").className = "page2_id1-off";
  document.getElementById("page1_id1").className = "page1_id1"; 
}






</script>
