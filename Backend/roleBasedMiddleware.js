// Middleware to check for Admin role
function isAdmin(req, res, next) {
    const userRole = req.user.role; // Assuming 'req.user' contains the authenticated user info
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
}

// Middleware to check for Creator or Admin role
function isCreatorOrAdmin(req, res, next) {
    const userRole = req.user.role;
    if (userRole !== 'creator' && userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Creators or Admins only.' });
    }
    next();
    }
        
