import { uploadProcessedData, getCollection } from "../lib/firebase.js";

export const getRoles = async (req, res) => {
    const data = await getCollection('roles');
    res.json({ message: "Success", data});
}

export const addRole = async (req, res) => {
    const { roleName, slug } = req.body;

    try {
        const msg = await uploadProcessedData('roles', { role_name: roleName, slug });
        const data = await getCollection('roles');
        res.json({ message: msg, roleName, slug, data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add role', error: error.message });
    }
};

export const editRole = async (req, res) => {
    const { id, roleName, slug } = req.body;

    try {
    
    } catch (error) {
        
    }
}