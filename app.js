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

// socket connection 
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
    // send welcome message to new user
    socket.emit("newUserConnect",{message:"Hi Welcome Dear!"})
    // only show total number of user in other user and new user
    socket.broadcast.emit("newUserConnect",{message:users + " "  + "User connected"})


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