import { uploadProcessedData, getCollection } from "../lib/firebase.js";

export const getRoles = async (req, res) => {
    const data = await getCollection('roles');
    console.log('data: ' + data)
    res.json({ message: "Success", data});
}

export const addRole = (req, res) => {
    const { roleName, slug } = req.body;

    console.log('New role added:', roleName, slug);
    const msg = uploadProcessedData('roles', {role_name: roleName, slug})
    
    res.json({ message: msg, roleName, slug });
};