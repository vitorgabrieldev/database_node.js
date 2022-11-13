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

module.exports = {selectCustomers};

// --- * --- Insert  DATABASE --- * ---
async function insertCustomer(customer){
    const conn = await connect();
    const sql = 'INSERT INTO users(nome,idade) VALUES (?,?);';
    const values = [customer.nome, customer.idade];
    return await conn.query(sql, values);
};

module.exports = {insertCustomer};