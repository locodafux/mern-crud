import { uploadProcessedData, getCollection } from "../lib/firebase.js";

export const getRoles = async (req, res) => {
    const data = await getCollection('roles');
    console.log('data: ' + data)
    res.json({ message: "Success", data});
}

export const addRole = async (req, res) => {
    const { roleName, slug } = req.body;

    console.log('New role added:', roleName, slug);

    try {
        const msg = await uploadProcessedData('roles', { role_name: roleName, slug });

        const data = await getCollection('roles');

        res.json({ message: msg, roleName, slug, data });
    } catch (error) {
        console.error('Error adding role:', error);
        res.status(500).json({ message: 'Failed to add role', error: error.message });
    }
};
