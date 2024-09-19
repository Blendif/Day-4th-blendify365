// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // Attach user info (ID, role) to the request object
        next();
    });
}

// Example of using the middleware for a protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});
// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
}

// Middleware to check if the user is a creator or admin
function isCreatorOrAdmin(req, res, next) {
    if (req.user.role !== 'creator' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Creators or Admins only.' });
    }
    next();
}

// Example usage for product approval route
app.put('/approve-product/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndUpdate(id, { status: 'approved' });
        res.json({ message: 'Product approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving product' });
    }
});
        
      
