var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {
    var losAngeles = {
        lat: 34.063380,
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
        mapTypeId: 'roadmap',
        mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU }
    });

    infoWindow = new google.maps.InfoWindow();

    showStoreMarkers();
    displayStores();
}

function displayStores(){
    var storesHTML = '';
    stores.forEach(function(store, index){
        storesHTML += `
            <div class="store-container">
                <div class="store-container-background">
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>257 S. La Cienega Blvd.</span>
                            <span>Beverly Hills, CA 90211</span>
                        </div>

                        <div class="store-phone-number">243-2363-334</div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">1</div>
                    </div>
                    
                </div>
            </div>
        `
    });

    document.querySelector('.stores-list').innerHTML = storesHTML;
}


function showStoreMarkers(){
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store, index){
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);

        var name = store.name;
        var address = store.addressLines[0];
        createMarker(latlng, name, address, index);
        bounds.extend(latlng);
    })
    map.fitBounds(bounds);

}

function createMarker(latlng, name, address, index){
    var html = "<b>" + name + "</b> <br/>" + address;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: `${index+1}`
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}