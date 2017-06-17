const $gmapWrapper = document.querySelectorAll('.gmaps-wrapper');

console.log('Gmaps ', $gmapWrapper);
class Gmaps {

    constructor(map) {
        this.$map = map;
        this.mapId = this.$map.id;
        this.latitude = parseFloat(this.$map.getAttribute('data-lat'));
        this.longitude = parseFloat(this.$map.getAttribute('data-lng'));

        this.init();
    }

    init() {

        let location = {
            lat: this.latitude,
            lng: this.longitude
        };

        if (google.maps !== undefined) {
            // create map
            const map = new google.maps.Map(document.getElementById(this.mapId), {
                zoom: 8,
                center: location
            });
            // create marker
            let marker = new google.maps.Marker({
                position: location,
                map: map
            });

        }

    }

}


$(document).ready(function() {

    if ($gmapWrapper.length > 0) {

        // attach gmap api to document - with initMap callback
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyC6H-y8Qg_v8yk1ue252aIv8I6i1QwBjXA&callback=App.initMap';
        head.appendChild(script);

    }

});

export function initMap() {
    let gmap = [];
    $gmapWrapper.forEach(($map) => {
        gmap.push(new Gmaps($map));
    });
}