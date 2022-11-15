
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

// --- * --- Insert  DATABASE --- * ---
async function insertCustomer(data){
    const conn = await connect();
    const sql = 'INSERT INTO settings(nome,mensagem) VALUES (?,?);';
    const values = [data.nome, data.message];
    return await conn.query(sql, values);
};
module.exports = {insertCustomer};

