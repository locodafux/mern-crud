import { uploadProcessedData } from "../lib/firebase.js";

export const addRole = (req, res) => {
    const { roleName, slug } = req.body;

    console.log('New role added:', roleName, slug);
    const msg = uploadProcessedData('roles', {role_name: roleName, slug})
    
    res.json({ message: msg, roleName, slug });
};