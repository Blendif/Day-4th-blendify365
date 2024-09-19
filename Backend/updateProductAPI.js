// Update existing product
app.put('/update-product/:id', upload.single('productImage'), async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;

    try {
        // Find product by ID and update the details
        const updatedData = { title, description, price };
        if (req.file) {
            updatedData.imageUrl = req.file.path;  // Update image if a new file is uploaded
        }
        await Product.findByIdAndUpdate(id, updatedData);
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
});
              
