// User Schema: Add TOTP Secret for MFA
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    totpSecret: { type: String } // TOTP secret for MFA
});

const User = mongoose.model('User', UserSchema);
