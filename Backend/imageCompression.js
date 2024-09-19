const sharp = require('sharp');

// Compress image before saving
app.post('/submit-product', authenticateToken, isCreatorOrAdmin, upload.single('productImage'), async (req, res) => {
    const { title, description, price } = req.body;
    const imagePath = `uploads/compressed_${req.file.filename}`;

    try {
        // Compress the uploaded image using sharp
        await sharp(req.file.path)
            .resize(800) // Resize to a maximum width of 800px
            .jpeg({ quality: 80 }) // Compress to 80% quality
            .toFile(imagePath);

        const newProduct = new Product({
            title,
            description,
            price,
            imageUrl: imagePath,
            status: 'pending',
            submittedBy: req.user._id
        });

        await newProduct.save();
        res.json({ message: 'Product submitted and image compressed' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing product submission' });
    }
});
