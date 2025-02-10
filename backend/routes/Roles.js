import express from 'express';
import { addRole,getRoles } from '../controllers/RoleController.js';
const router = express.Router();

router.post('/addRole',addRole);
router.get('/getRoles', getRoles);

export default router;