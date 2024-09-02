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

// socket connection 
io.on("connection",(socket)=>{
    console.log("A user connected")

    // create prereserved event--------
    // setTimeout(() => {
    //     socket.send("Sent message from server side by prereserved events")
    // }, 3000);

    //create costume events -------------------
    setTimeout(() => {
        socket.emit("myCustomeEvent",{
            description:"A custome message from server side "
        })
    }, 3000);

    // catch custome event
    socket.on("myCustomeEventFromClient",(data)=>{
        console.log(data)
    })
    socket.on("disconnect",()=>{
        console.log("A user is disconnected")
    })
})

http.listen(3000,()=>{
    console.log("server runing on port 3000")
})