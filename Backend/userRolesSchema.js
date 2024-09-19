// User Schema (mongoose)
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' } // Default role is 'user'
});

const User = mongoose.model('User', UserSchema);
  
