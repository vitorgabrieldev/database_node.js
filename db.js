
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:@localhost:3306/chat");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
};
connect();

module.exports = {};

// --- * --- SELECT  DATABASE --- * ---
async function selectCustomers() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM messages');
    return rows;
};

module.exports = {selectCustomers};

// --- * --- Insert  DATABASE --- * ---
async function insertCustomer(customer){
    const conn = await connect();
    const sql = 'INSERT INTO users(author,message) VALUES (?,?);';
    const values = [customer.author, customer.message];
    return await conn.query(sql, values);
};

module.exports = {insertCustomer};