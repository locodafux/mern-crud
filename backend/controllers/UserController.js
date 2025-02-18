export const registerUser = async (req, res) => {
    const { fullName } = req.body;

    console.log(req.body);

       return res.json({ message: 'connected'});
    try {
        const msg = await uploadProcessedData('roles', { role_name , slug });
        res.json({ message: msg });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add role', error: error.message });
    }
};