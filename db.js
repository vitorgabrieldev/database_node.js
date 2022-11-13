// --- * --- Connect DATABASE --- * ---
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:@localhost:3306/users");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
};
connect();

module.exports = {};

// --- * --- SELECT  DATABASE --- * ---
async function selectCustomers() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM users');
    return rows;
};