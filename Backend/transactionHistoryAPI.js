const stripe = require('stripe')('sk_test_51PtIrFRqT2Ka3Rrje6IGVTi967U0AkSPHdBexEwiPVvOlxL73D3vXdr0YBVrHGQXL5EvWaP8dfgZurJ2LIACF5d200YF8zhMuj');

// Fetch recent transactions
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await stripe.paymentIntents.list({ limit: 10 });
        res.json(transactions.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
});
