import express from 'express'; 
var app = express();
import { readFile } from 'fs'; 
import path from 'path';  

const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
})

// Create a server to listen at port 8080
const server = app.listen(8080, '127.0.0.1', function(){
    const host = server.address().address;
    const port = server.address().port;
    console.log(`REST API demo app listening at http://${host}:${port}`);
});