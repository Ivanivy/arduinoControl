const socket = io.connect("http://localhost:5000");

var up = document.getElementById("up");
var down = document.getElementById("down");
var left = document.getElementById("left");
var right = document.getElementById("right");
var stop = document.getElementById("stop");
var log = document.getElementById("console");
var logContent = [];
var video = document.getElementById("video");

function shiftLog(logArray){
    'use strict';
    var i = 0;
    for(i=0;i<logArray.length;i++){
        logArray[i]=logArray[i+1];
    }
}


function renderConsole(log,consoleContent,toAdd){
    if(consoleContent.length<10){
        logContent.push(toAdd);
    }
    else{
        shiftLog(logContent);
        logContent[9]= toAdd;       
    }

    log.innerHTML="";
    logContent.forEach(l=>{
        log.innerHTML+=l+"<br>";
    });
}


up.addEventListener("click",(e)=>{
    e.preventDefault();
    socket.emit("move",{
        move:"up"
    });
    renderConsole(log,logContent,"up");
});


down.addEventListener("click",(e)=>{
    e.preventDefault();
    socket.emit("move",{
        move:"down"
    });
    renderConsole(log,logContent,"down");
});

left.addEventListener("click",(e)=>{
    e.preventDefault();
    socket.emit("move",{
        move:"left"
    });
    renderConsole(log,logContent,"left");
});

right.addEventListener("click",(e)=>{
    e.preventDefault();
    socket.emit("move",{
        move:"right"
    });
    renderConsole(log,logContent,"right");
});

stop.addEventListener("click",(e)=>{
    e.preventDefault();
    socket.emit("move",{
        move:"stop"
    });
    renderConsole(log,logContent,"stop");
});


