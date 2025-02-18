import express from 'express'; 
import { uploadProcessedData } from '../lib/firebase.js';
import { registerUser } from '../controllers/UserController.js';
const router = express.Router(); 


router.post('/registerUser',registerUser);


export default router;
