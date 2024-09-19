const cors = require('cors');

// Allow specific domains only
app.use(cors({
    origin: ['https://your-domain.com'], // Add your domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
