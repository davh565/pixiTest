var connect = require('connect');
var serveStatic = require('serve-static');
const { v4: uuidv4 } = require('uuid');
connect().use(serveStatic(__dirname)).listen(8080, function(){
console.log(uuidv4()); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    console.log('Server running on 8080...');
});