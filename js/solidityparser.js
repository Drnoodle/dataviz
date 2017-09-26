/**
 * Created by noodle on 26/09/17.
 */


var aaa = 1;


var SolidityEnlighter = new function(){


    var createLineId = function(lineId){

        var lineId = document.createTextNode(lineId);
        var lineSpan = document.createElement("span");
        lineSpan.className = "lineId";
        lineSpan.appendChild(lineId);

        return lineSpan;
    };


    var isComment = function(wordsInLine){

        console.log(wordsInLine);
        return wordsInLine[0] == '//';
    };

    var createSpan = function(className, text){
        var word = document.createTextNode(text);
        var wordSpan = document.createElement("span");
        wordSpan.className += " " + className;
        wordSpan.appendChild(word);
        return wordSpan;
    };

    var wrapWord = function(wordStr, isComment){

        if(isComment){
            return document.createTextNode(" "+wordStr);
        }

        switch (wordStr){
            case "function" :return createSpan("keyword", " "+wordStr);
            case "solidity" : return createSpan("keyword", " "+wordStr);
            case "constant" : return createSpan("keyword", " "+wordStr);
            case "uint" : return createSpan("keyword", " "+wordStr);
            case "return" : return createSpan("keyword", " "+wordStr);
            case "bool" : return createSpan("keyword", " "+wordStr);
            case "mapping" : return createSpan("keyword", " "+wordStr);
            case "contract" : return createSpan("keyword", " "+wordStr);
        }


        return document.createTextNode(" "+wordStr);
    };



    function parse(nodeElement) {

        var lines = nodeElement.textContent.split(/\n/gi);

        lines = lines.map(function (line) {
            return line.replace(/  +/g, ' ').trim();
        });

        console.log(lines);

        var lineWrapperOrigin = document.createElement("span");
        lineWrapperOrigin.className = "line";

        var content = document.createElement("div");
        content.className = "solidityCode";


        for (var lineId = 0; lineId < lines.length; lineId++) {

            var lineWrapper = lineWrapperOrigin.cloneNode(true);

            var words = lines[lineId].split(" ");

            lineWrapper.appendChild(createLineId(lineId));

            if(isComment(words)){
                lineWrapper.className += " comment";
            }

            for (var wordId = 0; wordId < words.length; wordId++) {

                lineWrapper.appendChild(wrapWord(words[wordId]), isComment(words));
            }

            content.appendChild(lineWrapper);
        }

        nodeElement.parentNode.insertBefore(content, nodeElement);
        nodeElement.parentNode.removeChild(nodeElement);
    }


    this.update = function(){
        var allSolidity = document.querySelectorAll(".solidityCode");

        for(var i = 0; i<allSolidity.length; i++){

            console.log("aa");
            parse(allSolidity[i]);
        }
    };



};