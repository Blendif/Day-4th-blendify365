const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');  // For file uploads
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://4ad112cf-2fa3-4d52-bc29-0b7f2ac1cd25:ttiroavf@cluster0.mongodb.net/blendify365', { useNewUrlParser: true, useUnifiedTopology: true });

// Define product schema
const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String
});

const Product = mongoose.model('Product', ProductSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Add a new product
app.post('/add-product', upload.single('productImage'), async (req, res) => {
    const { title, description, price } = req.body;
    const imageUrl = req.file.path;  // Store file path

    const newProduct = new Product({
        title,
        description,
        price,
        imageUrl
    });

    try {
        await newProduct.save();
        res.json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product' });
    }
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Delete product
app.delete('/delete-product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});

// Update product (for simplicity, not handling file updates here)
app.put('/update-product/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;

    try {
        await Product.findByIdAndUpdate(id, { title, description, price });
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
  
