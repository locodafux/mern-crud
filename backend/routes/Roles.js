import express from 'express';
const router = express.Router();

router.get('/roles/:name', (req, res) => {
    const { name } = req.params;
    if (!name || !(name in friends)) {
        return res.sendStatus(400);
    }
    res.status(200).send({ name: friends[name] });
});

router.post('/addrole', (req, res) => {
    // const { role_name, } = req.body;
    // if (!name || !status) {
    //     return res.sendStatus(400); 
    // }
    // friends[name] = status;
    // res.status(200).send(friends);

});

export default router;