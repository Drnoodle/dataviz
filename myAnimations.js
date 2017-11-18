/**
 * Created by noodle on 14.11.17.
 */

/**
 * Created by noodle on 26.10.17.
 */




function animate(elem, property, fromValue, toValue, unit, duration){


    var frameDuration = 20;

    var totalFrames = duration/frameDuration;

    elem.style[property] = fromValue +unit;


    return new Promise(function(resolve, reject) {

        var currFrame = 0;


        var mon = setInterval(function(){

            var rate = currFrame/totalFrames;
            var newValue = rate*toValue + (1-rate)*fromValue;

            elem.style[property] = newValue+unit;


            if(currFrame>=totalFrames){

                elem.style[property] = toValue+unit;
                clearInterval(mon);
                resolve();
            }

            currFrame+=1;

        },frameDuration);


    });


}




function titleAnim(title, newTitleName, backgroundColor, duration){

    var txtWrapper = document.createElement("span");
    txtWrapper.appendChild(document.createTextNode(newTitleName));

    var colorWrapper = document.createElement("div");


    var paddingTitleTop = parseInt(window.getComputedStyle(title).paddingTop);
    var paddingTitleBottom = parseInt(window.getComputedStyle(title).paddingBottom);

    title.style.paddingTop = "0px";
    title.style.paddingBottom="0px";

    colorWrapper.style.position="absolute";
    colorWrapper.style.width="0px";
    colorWrapper.style.backgroundColor=backgroundColor;
    colorWrapper.style.height=title.clientHeight+"px";

    console.log(paddingTitleTop);
    title.style.paddingTop = paddingTitleTop+"px";
    title.style.paddingBottom = paddingTitleBottom+"px";


    colorWrapper.style.width="0px";
    colorWrapper.style.marginLeft = "0px";

    animate(title, "opacity", 1, 0, "", duration)
        .then(function(res){

            title.style.opacity ="1";
            txtWrapper.style.opacity="0";
            while (title.firstChild) {
                title.removeChild(title.firstChild);
            }
            title.appendChild(colorWrapper);
            title.appendChild(txtWrapper);

            return animate(colorWrapper, "width", 0, title.clientWidth , "px", duration/2);
        })
        .then(function(res){
            txtWrapper.style.opacity="1";

            animate(colorWrapper, "margin-left", 0, title.clientWidth, "px", duration/3)

            return animate(colorWrapper, "width", title.clientWidth, 0, "px", duration/2);
        });



};

