const Queue = require('bull');
const emailQueue = new Queue('emailQueue');

// Approve product and add email notification to queue
app.put('/approve-product/:id', authenticateToken, isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndUpdate(id, { status: 'approved' });
        res.json({ message: 'Product approved successfully' });

        // Add email notification job to queue
        emailQueue.add({ email: product.submittedBy.email, productTitle: product.title });
    } catch (error) {
        res.status(500).json({ message: 'Error approving product' });
    }
});

// Process email jobs
emailQueue.process(async (job) => {
    const { email, productTitle } = job.data;
    console.log(`Sending email to ${email} about product approval: ${productTitle}`);
    // Add actual email sending logic here (e.g., using nodemailer)
});
