const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>
{
    res.render('index.html');
});

io.on('connection', Socket => 
{
    console.log(`socket conectados: ${Socket.id}`);

    Socket.emit('previousMessages', messages);

    Socket.on('sendMessage', data =>
    {
        start_database(data);
        Socket.broadcast.emit('receivedMessage', data)
    });
});

server.listen(4000);

async function start_database(data) {
    const db = require("./db");
    console.log('Começou!');
    
    const result = await db.insertCustomer({nome: data.author, idade: data.message});
    console.log(result);
};

// --- * --- Start Server--- * ---