import express from 'express'; 
import cors from 'cors';
import userRoute from './routes/User.js'
import roleRoute from './routes/Roles.js'
const app = express();
app.options('*', cors());

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }));

  app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api',userRoute)
app.use('/api',roleRoute)

const server = app.listen(8080, '127.0.0.1', function(){
    const host = server.address().address;
    const port = server.address().port;
    console.log(`REST API demo app listening at http://${host}:${port}`);
});