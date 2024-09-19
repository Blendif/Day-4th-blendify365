const axios = require('axios');
const exchangeAPIKey = '8b021ab8968644a891e2631cc4006a22';

// Convert price to different currency using Open Exchange Rates
app.post('/convert-currency', async (req, res) => {
    const { amount, currency } = req.body;
    
    try {
        const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${exchangeAPIKey}`);
        const rates = response.data.rates;
        const convertedAmount = (amount * rates[currency]).toFixed(2);
        res.json({ convertedAmount });
    } catch (error) {
        res.status(500).json({ message: 'Error converting currency' });
    }
});
                                                                                                 
