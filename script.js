<script>

function AddTrip()
    {
     var id = document.getElementById("id").value; 
    var status = document.getElementById("status").value;
     var driver = document.getElementById("driver").value;
    var origin = document.getElementById("origin").value;
    var destination = document.getElementById("destination").value;
    var phone = document.getElementById("phone").value;
    var price = document.getElementById("price").value;
   
   var date = document.getElementById("date").value;

   

   


     
      if (origin==""|| destination=="" || price=="") {

      alert("Incomplet trip info!");
      }else {

      google.script.run.Record( id, status, driver, origin, destination, phone, price, date);
      document.getElementById("origin").style.display="none";
      document.getElementById("destination").style.display="none";
      document.getElementById("inter").style.display="none";
      document.getElementById("map").style.height="200px";
     document.getElementById("active").style.display="block";
     document.getElementById("searchtext").innerHTML = id;
     document.getElementById("price").style.display="none";
     document.getElementById("much").style.display="none";
     document.getElementById("wa").style.display="block";

     }

  }

 

  
 

 

     // This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center: { lat: -25.731340, lng: 28.218370 },
    zoom: 17,
   
});


var geocoder = new google.maps.Geocoder();
  var infowindow = new google.maps.InfoWindow();

  document.getElementById("submit").addEventListener("click", () => {
    geocodeLatLng(geocoder, map, infowindow);
});


new AutocompleteDirectionsHandler(map);


  

}

 






class AutocompleteDirectionsHandler {
  map;
  originPlaceId;
  destinationPlaceId;
  travelMode;
  directionsService;
  directionsRenderer;

 
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
   
    
   

    const originInput = document.getElementById("origin");
    const destinationInput = document.getElementById("destination");
    
    
        
    
    
    
    
    
   // const modeSelector = document.getElementById("mode-selector");
    const originAutocomplete = new google.maps.places.Autocomplete(originInput);

    // Specify just the place data fields that you need.
    originAutocomplete.setFields(["place_id"]);

    const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);

    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(["place_id"]);
   // this.setupClickListener(
   //   "changemode-walking",
    //  google.maps.TravelMode.WALKING
 //   );
  //  this.setupClickListener(
  //    "changemode-transit",
  //    google.maps.TravelMode.TRANSIT
//    );
 //   this.setupClickListener(
 //     "changemode-driving",
 //     google.maps.TravelMode.DRIVING
 //   );
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(destinationInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);




}
    



  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id, mode) {
    const radioButton = document.getElementById(id);

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }
  
  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }
  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
          
        unitSystem: google.maps.UnitSystem.metric, //IMPERIAL
        avoidHighways: false,
        avoidTolls: false
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
            
            document.getElementById("dist1").innerHTML = response.routes[0].legs[0].duration.text;
            document.getElementById("dist2").innerHTML = response.routes[0].legs[0].distance.value /1000 + "km";
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

   

}



function geocodeLatLng(geocoder, map, infowindow) {
  var input = document.getElementById("latlng").value;
  var latlngStr = input.split(",", 2);
  var latlng = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1]),
  };

  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        map.setZoom(17);

        var marker = new google.maps.Marker({
          position: latlng,
          map: map,
        });

        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
        document.getElementById("origin").innerHTML = response.results[0].formatted_address;
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}




</script>
