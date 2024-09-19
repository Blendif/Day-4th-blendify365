const redis = require('redis');
const redisClient = redis.createClient();

// Middleware to check cache before fetching from MongoDB
function checkCache(req, res, next) {
    const page = req.query.page || 1;
    redisClient.get(`products_page_${page}`, (err, data) => {
        if (err) throw err;
        if (data) {
            return res.json(JSON.parse(data)); // Return cached data
        }
        next(); // Proceed to fetch from MongoDB if not cached
    });
}

// Get products with caching
app.get('/products', checkCache, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find().skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments();

        const responseData = { products, totalPages: Math.ceil(totalProducts / limit), currentPage: page };
        redisClient.setex(`products_page_${page}`, 3600, JSON.stringify(responseData)); // Cache data for 1 hour

        res.json(responseData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});
