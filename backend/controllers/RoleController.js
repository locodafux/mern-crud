import { deleteDoc } from "firebase/firestore";
import { uploadProcessedData, getCollection, editDocument, deleteDocument} from "../lib/firebase.js";

export const getRoles = async (req, res) => {
    const data = await getCollection('roles');
    res.json({ message: "Success", data});
}

export const addRole = async (req, res) => {
    const { role_name, slug } = req.body;

    try {
        const msg = await uploadProcessedData('roles', { role_name , slug });
        res.json({ message: msg });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add role', error: error.message });
    }
};

export const editRole = async (req, res) => {
    const { roleName, slug } = req.body; 
    const { id } = req.params;

    if (!id || !roleName) {
        return res.status(400).json({ message: 'ID and Role Name are required.' });
    }

    const data = {
        role_name: roleName, 
        slug,
    };

    try {
        const updatedRole = await editDocument("roles", id, data);

        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found.' });
        }

        res.status(200).json({ data: updatedRole, message: 'Role updated successfully.' });
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ message: 'Failed to update role. Please try again.' });
    }
}

export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params; 
        const message = deleteDocument('roles', id);
        res.status(200).json({ message: 'Role deleted successfully.' });
    } catch (error) {
        res.status(200).json({ message: 'Error in deleting role', error });
    }
}