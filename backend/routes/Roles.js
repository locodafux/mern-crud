import express from 'express';
import { addRole } from '../controllers/RoleController.js';
const router = express.Router();

router.get('/roles/:name', (req, res) => {
    const { name } = req.params;
    if (!name || !(name in friends)) {
        return res.sendStatus(400);
    }
    res.status(200).send({ name: friends[name] });
});

router.post('/addRole',addRole);

export default router;