const User = require('../model/userModel');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        return res.status(200).json({
            message: "Login successful!",
            role: user.role,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "An error occurred. Please try again." });
    }
};

module.exports.addUser = async (req, res) => {
    try {
        const { username, email, role, groups } = req.body;

        if (!validateGroups(groups)) {
            return res.status(400).json({ error: 'Invalid groups provided.' });
        }

        const user = new User({ username, email, role, groups });
        await user.save();

        res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user', details: error.message });
    }
};

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
};

module.exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role, groups } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, role, groups },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
};