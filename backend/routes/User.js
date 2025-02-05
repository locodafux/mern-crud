import express from 'express'; 
import { uploadProcessedData } from '../lib/firebase.js';

const router = express.Router(); 

const friends = {
    'james': 'friend',
    'larry': 'friend',
    'lucy': 'friend',
    'banana': 'enemy',
};

router.get('/friends', async (req, res) => {
    await uploadProcessedData();
    res.status(200).send('success');
});

router.get('/friends/:name', (req, res) => {
    const { name } = req.params;
    if (!name || !(name in friends)) {
        return res.sendStatus(400);
    }
    res.status(200).send({ name: friends[name] });
});

router.post('/addfriend', (req, res) => {
    const { name, status } = req.body;
    if (!name || !status) {
        return res.sendStatus(400); 
    }
    friends[name] = status;
    res.status(200).send(friends);
});

router.patch('/changestatus', (req, res) => {
    const { name, newStatus } = req.body;
    if (!name || !newStatus || !(name in friends)) {
        return res.sendStatus(400); 
    }
    friends[name] = newStatus;
    res.status(200).send(friends);
});

router.delete('/friends', (req, res) => {
    const { name } = req.body;
    if (!name || !(name in friends)) {
        return res.sendStatus(400); 
    }
    delete friends[name];
    res.status(200).send(friends);
});

export default router;
