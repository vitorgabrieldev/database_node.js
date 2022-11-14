//index.js
(async () => {
    const db = require("./db");
    console.log('Começou!');
    
    const result = await db.insertCustomer({nome: "Vitor Gabriel De Oliveira", idade: 15});
    console.log(result);
})();