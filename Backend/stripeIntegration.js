const express = require('express');
const mongoose = require('mongoose');
const Stripe = require('stripe');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const stripe = Stripe('sk_test_51PtIrFRqT2Ka3Rrje6IGVTi967U0AkSPHdBexEwiPVvOlxL73D3vXdr0YBVrHGQXL5EvWaP8dfgZurJ2LIACF5d200YF8zhMuj');

// MongoDB Connection
mongoose.connect('mongodb+srv://4ad112cf-2fa3-4d52-bc29-0b7f2ac1cd25:ttiroavf@cluster0.mongodb.net/blendify365', { useNewUrlParser: true, useUnifiedTopology: true });

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    currency: String,
    imageUrl: String
});

const Product = mongoose.model('Product', ProductSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Stripe Checkout Session
app.post('/checkout', async (req, res) => {
    const { productId, currency } = req.body;
    const product = await Product.findById(productId);
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: currency,
                    product_data: {
                        name: product.name,
                        description: product.description,
                        images: [product.imageUrl]
                    },
                    unit_amount: product.price * 100, // Stripe expects price in cents
                },
                quantity: 1
            }],
            mode: 'payment',
            success_url: 'http://localhost:5000/success',
            cancel_url: 'http://localhost:5000/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating checkout session' });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
  
