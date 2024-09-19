// Verify MFA Code on Login
app.post('/verify-mfa', authenticateToken, async (req, res) => {
    const user = await User.findById(req.user.id);
    const { token } = req.body;

    const verified = speakeasy.totp.verify({
        secret: user.totpSecret,
        encoding: 'base32',
        token: token
    });

    if (verified) {
        res.json({ message: 'MFA verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid MFA code' });
    }
});
