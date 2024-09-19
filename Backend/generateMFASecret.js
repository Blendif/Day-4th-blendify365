const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// Endpoint to enable MFA (for users to scan the QR code with an authenticator app)
app.get('/enable-mfa', authenticateToken, async (req, res) => {
    const secret = speakeasy.generateSecret({ name: 'Blendify365' });
    const user = await User.findByIdAndUpdate(req.user.id, { totpSecret: secret.base32 });

    qrcode.toDataURL(secret.otpauth_url, (err, data) => {
        res.json({ qrCode: data });
    });
});
