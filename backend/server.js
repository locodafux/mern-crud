import express from 'express'; 
import cors from 'cors';
import { readFile } from 'fs'; 
import path from 'path';  
import userRoute from './routes/User.js'
const app = express();
app.options('*', cors());

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your Vue app's origin
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }));

app.use('/api',userRoute)

// Create a server to listen at port 8080
const server = app.listen(8080, '127.0.0.1', function(){
    const host = server.address().address;
    const port = server.address().port;
    console.log(`REST API demo app listening at http://${host}:${port}`);
});