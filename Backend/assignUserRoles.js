// Assign role to a user (Admin only)
app.put('/assign-role/:userId', isAdmin, async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body; // role should be 'creator', 'admin', or 'user'

    try {
        await User.findByIdAndUpdate(userId, { role });
        res.json({ message: 'Role updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role' });
    }
});
