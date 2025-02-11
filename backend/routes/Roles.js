import express from 'express';
import { addRole,getRoles } from '../controllers/RoleController.js';
const router = express.Router();

//Roles 
router.post('/addRole',addRole);
router.get('/getRoles', getRoles);
router.get('/editRole', editRole);

export default router;