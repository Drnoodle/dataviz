function initMap() {
    var styledMapType = new google.maps.StyledMapType(
        [
            {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
            {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
            }
        ],
        {name: 'Styled Map'});
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
        }
    });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    return map

}
// Use the DOM setInterval() function to change the offset of the symbol
// at fixed intervals.



function visualize_crash(leftPoint,rightPoint,crashPoint,map){

    var planeSymbol = {
        path: 'M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684',
        scale: 0.05,
        strokeOpacity: 0.5,
        color: "#0FF",
        strokeWeight: 1
    };

    var dashSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 0.3,
        scale: 1
    };
    var departure = "depature aiport"
    var arrival = "arrival airport"
    var bounds = new google.maps.LatLngBounds(leftPoint,crashPoint);
    var latitude = Math.max(leftPoint.lat(), crashPoint.lat());
    var longitude = bounds.getCenter().lng();
    var new_long = 0.8*crashPoint.lng()+0.2*longitude;
    var lapse_point = new google.maps.LatLng(latitude,new_long);

    var startImg = 'http://weclipart.com/gimg/3BC3CC456E859095/33-512.png';
    var startMarker = put_marker(startImg,leftPoint,map,false,departure);
    var destImg = 'https://cdn4.iconfinder.com/data/icons/maps-and-navigation-solid-icons-vol-3/72/115-128.png';
    var destMarker= put_marker(startImg,rightPoint,map,false,arrival);


    var flight_line = new google.maps.Polyline({
        path:[leftPoint,lapse_point,rightPoint],
        strokeColor: "black",
        strokeOpacity: 0,
        map: map,
        icons: [{
            icon: dashSymbol,
            offset: '0',
            repeat: '10px'
        }],
        geodesic:true,
        strokeWeight: 1
    });

    var normal_line = new google.maps.Polyline({
        path:[leftPoint,lapse_point],
        strokeColor: "black",
        strokeOpacity: 0.3,
        map: map,
        icons: [{
            icon: planeSymbol,
            offset: '100%'
        }],
        geodesic:true,
        strokeWeight: 1
    });

    contentString = "fuck"

    setListener(flight_line,contentString ,crashPoint,map);

    setListener(normal_line,contentString ,crashPoint,map);

    setListener(startMarker,contentString ,crashPoint,map);

    setListener(destMarker,contentString ,crashPoint,map);

    var vitesse = 500000;
    animate_normal(normal_line,vitesse).then(function(res,err){
        animate_crash([lapse_point,crashPoint],planeSymbol,vitesse,crashPoint,map,contentString);
    });
}

function setListener(object,message,position,map){
    var infowindow = new google.maps.InfoWindow({
        content: message,
        position: position
    });

    google.maps.event.addListener(object, 'mouseover', function () {
        infowindow.open(map);
    });

    google.maps.event.addListener(object, 'mouseout', function () {
            infowindow.close(map);
        });
}

function animate_normal(normal_line,vitesse) {
    var path = normal_line.getPath().getArray();
    var dist = google.maps.geometry.spherical.computeDistanceBetween(path[0],path[1]);
    var t = dist/vitesse ;
    return new Promise(function(resolve,reject){
        var count = 0;
        var anim = window.setInterval(function() {
            count = (count + 1) % 100;
            var icons = normal_line.get('icons');
            icons[0].offset = count + '%';
            normal_line.set('icons', icons);

            if(count == 99){
                window.clearInterval(anim);
                normal_line.set('icons', []);
                resolve()
            }
        }, t);
    });
}

    function animate_crash(path,plane_symbol,vitesse,crashPoint,map,contentString) {
        var dist = google.maps.geometry.spherical.computeDistanceBetween(path[0],path[1]);
        var t = dist/vitesse ;
        var crash_line = new google.maps.Polyline({
            path:path,
            strokeColor: "red",
            strokeOpacity: 0.3,
            map: map,
            strokeWeight: 1,
            icons: [{
                icon: plane_symbol,
                offset: '0'
            }],
        });

        return new Promise(function(resolve,reject){
            var count = 0;
            var anim = window.setInterval(function() {
                count = (count + 1) % 100;
                var icons = crash_line.get('icons');
                icons[0].offset = count + '%';
                crash_line.set('icons', icons);

                if(count == 99){
                    window.clearInterval(anim);
                    crash_line.set('icons', []);
                    crashImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Skull_%26_crossbones.svg/513px-Skull_%26_crossbones.svg.png';
                    crashMarker = put_marker(crashImg,crashPoint,map,true,"");
                    setListener(crashMarker,contentString ,path[1],map);
                    setListener(crashMarker,contentString ,path[1]),map;
                    resolve()
                }
            }, t);
        });

}

function put_marker(imgUrl, latlng,map,drop,label){

    var destImg = {
        url: imgUrl,
        size: new google.maps.Size(20,40),
        origin: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(20, 40)



    };
    var drop_ =  null;
    if (drop) drop_= google.maps.Animation.DROP;

    var marker = new google.maps.Marker({
        position: latlng,
        icon:destImg,
        map: map,
        title: label,
        animation: drop_

    });
    return marker;
}
