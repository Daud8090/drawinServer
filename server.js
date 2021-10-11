var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "*",
    }
});

var port = process.env.YOUR_PORT || process.env.port || 5000;

const { addUser,getUser}=require('./users');

app.get("/", (req, res) => {
    res.send("<h1>you are on the server go to ui</h1>")
});
// creating web socket server whenever user iss connect to the socket it will log the result as user online

io.on('connection', (socket) => {
    console.log("user online");

    //joining room
    socket.on("joinRoom", (obj) => {
        // console.log("dkjfhdsjkhfkjdshjkf")
        console.log(obj)
        // console.log("dkjfhdsjkhfkjdshjkf#######")
        Name = obj.name
        room = obj.room
        const user=addUser(socket.id,Name,room)
        // console.log(Name,room)
        socket.join(user.Room);

        socket.to(user.Room).emit('message',`${user.Name} has joined`)
    });

    // socket.emit('wlcm','wlcome to the app')
    // socket.broadcast.emit('wlcm','a user has joined the chat')

    // now if the soccket receives any event with name canvas data then it will broadcast data to all the connected users
    socket.on('canvas-data', (data) => {
        const user=getUser(socket.id)
        // console.log(user);
        // io.to(user.Room).emit('canvas-data', data)

        io.to(user.Room).emit('canvas-data', data);
    });
    socket.on('message', data => {
        const user=getUser(socket.id)
        
        // console.log("your msg : ", data)
        // console.log("your msg as: ", user)
        io.to(user.Room).emit('message', data)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})



http.listen(port, () => {
    console.log("listening on port : " + port);
})