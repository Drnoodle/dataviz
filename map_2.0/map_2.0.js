
function init_map (config){
    /**
     * Create the map
     */
    var map = AmCharts.makeChart( "chartdiv", config );
    return map;

}

function animateCrash(dep,arr,crash,targetSVG, planeSVG,depLabel, arrLabel, crashDescription,map,crashId){
    /**
     * Animate single crash
     */
    return new Promise(function(resolve,reject){

        var arc = -0.8;
        var shadowAlpha = 0.3;
        var planeScale = 0.05;
        var dashLength = 2;
        var flightLineAlpha = 0.5;
        var initialImgAlpha = 1;
        var afterAnimImgAlpha = 0.5;
        var positionScale = 2;
        var flightLineArc = {
            "id": "flightLineArc"+crashId,
            "dashLength": dashLength,
            //"arc": arc,
            "alpha": flightLineAlpha,
            "arrowAlpha": flightLineAlpha,
            "latitudes": [dep[0],arr[0]],
            "longitudes": [dep[1],arr[1]]
        };

        var crashLine = {
            "id": "crashLine"+crashId,
            "arrowAlpha":0,
            "color":'#FF0000',
            "alpha": 0,
            "latitudes": [dep[0],crash[0]],
            "longitudes": [dep[1],crash[1]]
        };
        var crashLineArc = {
            "color":'#FF0000',
            "id": "crashLineArc"+crashId,
            "alpha": 0,
            "arrowAlpha":0,
            "arc": arc,
            "latitudes": [dep[0],crash[0]],
            "longitudes": [dep[1],crash[1]]
        };

        /*map["dataProvider"]["lines"].push(crashLine);
        map["dataProvider"]["lines"].push(crashLineArc);*/

        // Create images (with and without animation)
        var crashImg=  {
            "id": "crash"+crashId,
            "imageURL":'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Skull_%26_crossbones.svg/513px-Skull_%26_crossbones.svg.png',
            "title": crashDescription,
            "latitude": crash[0],
            "longitude": crash[1],
            "rollOverScale":3,
            "alpha":initialImgAlpha
            //"linkToObject": ["arrTarget"+crashId,"depTarget"+crashId]
        };

        var depTarget=  {
            "id": "depTarget"+crashId,
            "svgPath": targetSVG,
            "title": depLabel,
            "latitude": dep[0],
            "longitude": dep[1],
            "rollOverScale":2,
            "alpha":initialImgAlpha,
            "LinkToObject":"crash"+crashId
        };
        var arrTarget=  {
            "id": "arrTarget"+crashId,
            "svgPath": targetSVG,
            "title": arrLabel,
            "latitude": arr[0],
            "longitude":arr[1],
            "rollOverScale":2,
            "alpha":initialImgAlpha,
            "LinkToObject":"crash"+crashId
        };

        var crashPathShadow = {
            "svgPath": planeSVG,
            "positionOnLine": 0,
            "color": "#585869",
            "alpha": shadowAlpha,
            "animateAlongLine": true,
            "lineId": "crashLine"+crashId,
            "flipDirection": false,
            "loop": false,
            "scale": planeScale,
            "positionScale": positionScale
        };
        var flightCrash = {
            "svgPath": planeSVG,
            "positionOnLine": 0,
            "color": "#a20819",
            "alpha": 0.7,
            "animateAlongLine": true,
            "lineId": "crashLineArc"+crashId,
            "flipDirection": false,
            "loop": false,
            "scale": planeScale,
            "positionScale": positionScale
        };

        /*var crash_descriptor = {
            id:crashId,
            lines: lines.slice(),
            images: images.slice()
        };*/


        var animDuration = map["imagesSettings"]["animationDuration"]*1500;


        map["dataProvider"]["lines"].push(flightLineArc,crashLine,crashLineArc);
        map["dataProvider"]["images"].push(depTarget,arrTarget,crashImg,flightCrash,crashPathShadow);
        setTimeout(function(){
            //if(map["dataProvider"]["lines"].length>3)
            map.validateData();
            map["dataProvider"]["images"].pop();
            map["dataProvider"]["images"].pop();
            var len =  (map["dataProvider"]["images"]).length;
            map["dataProvider"]["images"][len-1]["alpha"]= afterAnimImgAlpha;
            map["dataProvider"]["images"][len-2]["alpha"]= afterAnimImgAlpha;
            map["dataProvider"]["images"][len-3]["alpha"]= afterAnimImgAlpha;
            resolve();
        },animDuration);

    });
}


//TODO
function load_data_for_range(beginYear,endYear){
    /**
     * Load data into an array
     */

    var crash1 = {
        id:'crash1',
        dep_lat:43.8163,dep_long:-79.4287,
        arr_lat:48.8567,arr_long:41.484375,
        crash_lat:48.856614,crash_long:2.352222,
        description:'accident1',nb_a_bord:6,nb_mort:3,year:2008
    };
    var crash2 = {
        id:'crash2',
        dep_lat:59.91,dep_long:10.73,
        arr_lat:55.75,arr_long:41.484375,
        crash_lat:58.328241,crash_long:26.279297,
        description:'accident2',nb_a_bord:80,nb_mort:12,year:2009
    };
    var crash3 = {
        id:'crash3',
        dep_lat:40.712775,dep_long:-74.005973,
        arr_lat:40.712775,arr_long:74.005973,
        crash_lat:41.484375,crash_long:-30.9375,
        description:'accident3',nb_a_bord:50,nb_mort:20,year:2011
    };
    return [crash1,crash2,crash3]
}


function visualiseData(data,map,targetSVG,planeSVG){
    /**
     * visualise the all the crashes
     */
    return new Promise(function(resolve,reject){
    if (data.length==0) {
        return;}
    var crash = data.shift();
    var dep = [crash["dep_lat"],crash["dep_long"]];
    var arr = [crash["arr_lat"],crash["arr_long"]];
    var crashPos = [crash["crash_lat"],crash["crash_long"]];
    var depLabel= "paris";
    var arrLabel = "Singapour";
    var crashDescription= crash["description"];
    var crashId = crash['id'];
    animateCrash
    (dep,arr,crashPos,targetSVG, planeSVG,depLabel, arrLabel, crashDescription,map,crashId)
        .then(function(res,err){
            visualiseData(data,map,targetSVG,planeSVG);
        }) ;
    });
}

async function animateRange (){
    map["dataProvider"]["images"]=[];
    map["dataProvider"]["lines"]=[];
    map.validateData();
    var dataCopy = JSON.parse( JSON.stringify( data) );
    await visualiseData(dataCopy,map,targetSVG,planeSVG);
    showCrashes();
}

function init_range_selector(begin,end){
    $( function() {
        $( "#slider-range" ).slider({
            range: true,
            min: 1908,
            max: 2008,
            animate: true,
            values: [ begin, end ],
            slide: function( event, ui ) {
                var beginYear = ui.values[ 0 ];
                var endYear = ui.values[ 1 ];
                $( "#amount" ).val( beginYear + "," + endYear );
                data = load_data_for_range(beginYear,endYear);
                map["dataProvider"]["images"]=[];
                map["dataProvider"]["lines"]=[];
                map.validateData();
                showCrashes();
            }
        });
        $( "#amount" ).val(   $( "#slider-range" ).slider( "values", 0 ) +
            " - " + $( "#slider-range" ).slider( "values", 1 ) );
    } );
}



function showCrashes(){
    map["dataProvider"]["images"]=[];
    map["dataProvider"]["lines"]=[];
    map.validateData();
    var dataCopy = JSON.parse( JSON.stringify( data) );
    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
        var crash = dataCopy.shift();
        var dep = [crash["dep_lat"],crash["dep_long"]];
        var arr = [crash["arr_lat"],crash["arr_long"]];
        var crashPos = [crash["crash_lat"],crash["crash_long"]];
        var depLabel= "paris";
        var arrLabel = "Singapour";
        var crashDescription= crash["description"];
        var crashId = crash['id'];
        staticCrash(dep,arr,crashPos,targetSVG, planeSVG,depLabel, arrLabel, crashDescription,map,crashId);
        //Do something
    }
}

function staticCrash(dep,arr,crash,targetSVG, planeSVG,depLabel, arrLabel, crashDescription,map,crashId) {
    var arc = -0.8;
    var shadowAlpha = 0.3;
    var planeScale = 0.05;
    var dashLength = 2;
    var flightLineAlpha = 0.5;
    var initialImgAlpha = 1;
    var afterAnimImgAlpha = 0.5;
    var positionScale = 2;
    var flightLineArc = {
        "id": "flightLineArc"+crashId,
        "dashLength": dashLength,
        //"arc": arc,
        "alpha": flightLineAlpha,
        "arrowAlpha": flightLineAlpha,
        "latitudes": [dep[0],arr[0]],
        "longitudes": [dep[1],arr[1]]
    };

    var crashLineArc = {
        "color":'#FF0000',
        "id": "crashLineArc"+crashId,
        "alpha": flightLineAlpha,
        "arrowAlpha":flightLineAlpha,
        "arc": arc,
        "latitudes": [dep[0],crash[0]],
        "longitudes": [dep[1],crash[1]]
    };
    var crashImg=  {
        "id": "crash"+crashId,
        "imageURL":'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Skull_%26_crossbones.svg/513px-Skull_%26_crossbones.svg.png',
        "title": crashDescription,
        "latitude": crash[0],
        "longitude": crash[1],
        "rollOverScale":3,
        "alpha":initialImgAlpha
        //"linkToObject": ["arrTarget"+crashId,"depTarget"+crashId]
    };

    var depTarget=  {
        "id": "depTarget"+crashId,
        "svgPath": targetSVG,
        "title": depLabel,
        "latitude": dep[0],
        "longitude": dep[1],
        "rollOverScale":2,
        "alpha":initialImgAlpha,
        "LinkToObject":"crash"+crashId
    };
    var arrTarget=  {
        "id": "arrTarget"+crashId,
        "svgPath": targetSVG,
        "title": arrLabel,
        "latitude": arr[0],
        "longitude":arr[1],
        "rollOverScale":2,
        "alpha":initialImgAlpha,
        "LinkToObject":"crash"+crashId
    };

    map["dataProvider"]["lines"].push(flightLineArc,crashLineArc);
    map["dataProvider"]["images"].push(depTarget,arrTarget,crashImg);
    map.validateData();
}