const app  = require("express")();
const http = require("http").Server(app)
const path = require("path")

// socket 
const io = require("socket.io")(http);

app.get("/",(req,res)=>{
    const options = {
        root:path.join(__dirname)
    }
    const filename = "index.html"
    res.sendFile(filename,options)

})

let users = 0;
let roomNum = 1;
let full = 0;

// socket connection 

// the socket defaul name space is "/". name speace mean the endpoint/path . now we want to make custome name speace

// costume name space 
const cnsp = io.of("/custome-namespace");

// now we can use hee this custome name space ----------

// custome name space-------
// cnsp.on("connection",(socket)=>{
// default name space --------
io.on("connection",(socket)=>{
    console.log("A user connected")


    // create prereserved event--------
    // setTimeout(() => {
    //     socket.send("Sent message from server side by prereserved events")
    // }, 3000);

    // EVENTS---------------------------------------------------------------------------------
    //create costume events -------------------
    // setTimeout(() => {
    //     socket.emit("myCustomeEvent",{
    //         description:"A custome message from server side "
    //     })
    // }, 3000);

    // catch custome event-------------------
    // socket.on("myCustomeEventFromClient",(data)=>{
    //     console.log(data)
    // })
    //-------------------------------------------------------------------------------------------

    // BROADCASTING-------------------------------------------------------------------------------
    users++;
    // use for show user total number for all user--------
    // io.sockets.emit("broadcast",{message:users + "user connected"})
    // send welcome message to new user--------------------
    // socket.emit("newUserConnect",{message:"Hi Welcome Dear!"})
    // only show total number of user in other user and new user---------------
    // socket.broadcast.emit("newUserConnect",{message:users + " "  + "User connected"})
    // -----------------------------------------------------

    // CREATE ROOM ------------------------------------------------------------------------------------
    socket.join("room-",+ roomNum)
    io.sockets.in("room-",+ roomNum).emit("connectedRoom",`You are connected to room no ${roomNum}`);
    // handle room people limit and create new room when the room is full-------------
    full++;
    if(full >= 2){
            full = 0;
            roomNum++;
    }
    //-----------------------------------------------------

    socket.on("disconnect",()=>{
        console.log("A user is disconnected")

       // BROADCASTING-------------------------------------------------------------------------------
        users--;
        // this is for all ------
        // io.sockets.emit("broadcast",{message:users + "user connected"})
        socket.broadcast.emit("newUserConnect",{message:users + " " +  "User connected"})
    })
})

http.listen(3000,()=>{
    console.log("server runing on port 3000")
})