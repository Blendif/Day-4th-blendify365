// Include CSRF protection in forms
app.post('/submit-product', csrfProtection, (req, res) => {
    const csrfToken = req.csrfToken();
    res.render('submit-product', { csrfToken });
});
