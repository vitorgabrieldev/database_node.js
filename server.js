// configs
const express = require('express');
const path = require('path');
// const { Socket } = require('socket.io');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>
{
    res.render('index.html');
});

let messages = [];

io.on('connection', Socket => 
{
    console.log(`socket conectado: ${Socket.id}`);

    Socket.emit('previousMessages', messages);

    // console.log(messages);

    Socket.on('sendMessage', data =>
    {
        messages.push(data);        
        
        Socket.broadcast.emit('receivedMessage', data);
        
        insertDatabase(data);

    });
});

server.listen(4000);

// --- * --- INSERT --- * ---
async function insertDatabase(data) {
    const db = require("./db");
    console.log('Run Server Mysql! (INSERT)');
    
    // --- * --- Insert DATABASE(query) --- * --- 
    const result = await db.insertCustomer({nome: data.author, message: data.message});
    console.table(result);
};

// --- * --- SELECT --- * ---
async function selectDatabase() {
    console.log('Run Server Mysql! (SELECT)');

    console.log('SELECT * FROM setings');
    const settings = await db.selectCustomers();
    console.log(settings);
};

// --- * --- Select  DATABASE --- * ---
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM settings", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});