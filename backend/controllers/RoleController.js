

export const addRole = (req, res) => {
    const { roleName, slug } = req.body;

    console.log('New role added:', roleName, slug);
    
    res.json({ message: 'Role added successfully!', roleName, slug });
};