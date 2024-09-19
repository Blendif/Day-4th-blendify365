// Update Product Schema to include a status field
const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    status: { type: String, default: 'pending' }, // New field for review status
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Track the creator
});

const Product = mongoose.model('Product', ProductSchema);

// Product submission by creators (Creator or Admin)
app.post('/submit-product', isCreatorOrAdmin, upload.single('productImage'), async (req, res) => {
    const { title, description, price } = req.body;
    const imageUrl = req.file.path;
    const submittedBy = req.user._id;

    const newProduct = new Product({
        title,
        description,
        price,
        imageUrl,
        status: 'pending', // Product starts as pending
        submittedBy
    });

    try {
        await newProduct.save();
        res.json({ message: 'Product submitted successfully and is pending review' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting product' });
    }
});
      
