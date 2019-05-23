const express = require("express");
const socket = require("socket.io");
const {exec} = require("child_process");



const app = express();
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,()=>{
  console.log("the server is running on "+PORT);
});

const io = socket(server);

const moveCommand = (command)=>{
  exec("echo '"+command+"' > /dev/rfcomm0");
}


io.on('connect',(socket)=>{
  console.log("a new connection was found");
  socket.on('move',(data)=>{
    console.log("move:"+data.move);
    exec("echo \""+data.move+"\" >> ./log.txt",(error,stdout,stderr)=>{
      if(error){
        console.log("something went wrong"+error);
      }
    });
    switch(data.move){
      case 'up':
      moveCommand('f');
      break;
      case 'down':
      moveCommand('b');
      break;
      case 'left':
      moveCommand('l');
      break;
      case 'right':
      moveCommand('r');
      case 'stop':
      moveCommand('s');
      break;
    }

  });
});