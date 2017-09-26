/**
 * Created by noodle on 26/09/17.
 */



var animations = new function(){


    var frameDuration = 20;


    this.opacityAnimation = function(elemNode, duration, toOpacity, callback){

        var currFrame = 0;

        var totalFrames = duration/frameDuration;

        var fromOpacity = parseInt(elemNode.style.opacity);

        var animation = setInterval(function(){

            currFrame += 1;

            elemNode.style.opacity = currFrame/totalFrames*toOpacity + (1.0 - currFrame/totalFrames)*fromOpacity;
            console.log(elemNode.style.opacity);

            if(currFrame >= totalFrames) {
                clearInterval(animation);
                callback();
            }

        }.bind(this), frameDuration);

    };



    this.fadeOut = function(elementNode, duration){

        return function(callback){
            this.opacityAnimation(elementNode,duration,0, callback);
        }.bind(this)

    }.bind(this);


    this.noAnimation = function(callback){
        callback();
    }



};