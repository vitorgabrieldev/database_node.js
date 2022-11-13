//index.js
(async () => {
    const db = require("./db");
    console.log('Começou!');
    
    console.log('INSERT INTO users;');
    const result = await db.insertCustomer({nome: "Zé", idade: 18});
    console.log(result);
 
    console.log('SELECT * FROM users;');
    const clientes = await db.selectCustomers();
    console.log(clientes);
})();