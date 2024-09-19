// Approve product (Admin only)
app.put('/approve-product/:id', isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndUpdate(id, { status: 'approved' });
        res.json({ message: 'Product approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving product' });
    }
});

// Reject product (Admin only)
app.put('/reject-product/:id', isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndUpdate(id, { status: 'rejected' });
        res.json({ message: 'Product rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting product' });
    }
});

// Get pending products for admin review
app.get('/pending-products', isAdmin, async (req, res) => {
    try {
        const pendingProducts = await Product.find({ status: 'pending' });
        res.json(pendingProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pending products' });
    }
});
