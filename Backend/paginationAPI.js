// Get products with pagination
app.get('/products', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find().skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments();
        res.json({ products, totalPages: Math.ceil(totalProducts / limit), currentPage: page });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});
