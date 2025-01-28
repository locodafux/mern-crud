import express from 'express'; 
const app = express();
import { readFile } from 'fs'; 
import path from 'path';  


const friends = {
    'james': 'friend',
    'larry': 'friend',
    'lucy': 'friend',
    'banana': 'enemy',
}


app.get('/friends',(req, res) => {
    res.status(200).send(friends)
})

app.get('/friends/:name', (req, res) => {
    const { name } = req.params
    if(!name || !(name in friends)) {
        return res.sendStatus(400)
    }
    res.status(200).send({name : friends[name]})
})

app.post('addfriend', (req, res) => {
    const { name, status }  = req.body
    friends[name] = status
    res.status(200).send(friends)

})

app.patch('/changestatus', (req, res) => {
    const { name, newStatus } = req.body
    friends[name] = newStatus 
    res.status(200).send(friends)
})

app.delete('/friends', (req, res) => {
    const { name } = req.body
    delete friends[name] 
    res.status(200).send(friends)
})

// Create a server to listen at port 8080
const server = app.listen(8080, '127.0.0.1', function(){
    const host = server.address().address;
    const port = server.address().port;
    console.log(`REST API demo app listening at http://${host}:${port}`);
});