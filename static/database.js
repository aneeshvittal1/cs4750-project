const database = require('mysql')

var sql = database.createConnection({
    host: "35.245.66.156",
    database: "grocerylist-cs4750",
    user: "root",
    password: "cs4750project"
})

sql.connect(function(err){
    if (err) throw error;
    console.log("Connected to database");
})
// sql.query('SELECT * FROM Address', function(error, result){
//     if (error)
//         throw error;
    
//     result.forEach(r => {
//         console.log(r);
//     })
// })

module.exports ={
closeConnection: function (){
    sql.end(() => {
    console.log("DB Connection Closed");
});
},

addUser: function (userID, nameID, addressID, phoneNum, emailAddr, birthday){
    let queryString = `INSERT INTO User VALUES(${userID}, ${nameID}, ${addressID}, ${phoneNum}, ${emailAddr}, ${birthday});`;

    sql.query(queryString, function(error, result){
        if (error)
            throw error;
        
        result.forEach(r => {
            console.log(r);
        })
    })
},

selectAny: function (tableName){
    let queryString = `SELECT * FROM ${tableName};`

    sql.query(queryString, function(error, result){
        if (error)
            throw error;
        
        result.forEach(r => {
            console.log(r);
        })
    })
},
}

//selectAny("Creates");
//closeConnection();
