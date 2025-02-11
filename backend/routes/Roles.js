import express from 'express';
import { addRole, getRoles, editRole, deleteRole } from '../controllers/RoleController.js';
const router = express.Router();

//Roles 
router.post('/addRole',addRole);
router.get('/getRoles', getRoles);
router.put('/editRole/:id', editRole);
router.delete('/deleteRole/:id', deleteRole);

export default router;