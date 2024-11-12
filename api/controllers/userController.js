const User = require('../models/User');

module.exports = {
    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch user' });
        }
    },


    deleteUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) return res.status(404).json({ error: 'User not found' });

            await user.destroy();
            res.status(204).json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete user' });
        }
    },
}
