import express from 'express';
const router = express.Router();

router.get('/roles/:name', (req, res) => {
    const { name } = req.params;
    if (!name || !(name in friends)) {
        return res.sendStatus(400);
    }
    res.status(200).send({ name: friends[name] });
});

router.post('/addRole', (req, res) => {
    const { role_name, slug } = req.body;
 
    console.log('New role added:', role_name, slug);

});

export default router;