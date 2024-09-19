const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// Apply CSRF protection
app.use(csrfProtection);

// Include CSRF token in forms
app.get('/form', (req, res) => {
    res.render('form', { csrfToken: req.csrfToken() });
});
