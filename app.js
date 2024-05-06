// app.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the menu page
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

// Handle order submission
app.post('/submit-order', (req, res) => {
    const { item1, item2, item3 } = req.body;

    // Validate form data
    if (!isValidFormInput(item1, item2, item3)) {
        return res.status(400).send('Invalid form data');
    }

    // Calculate total amount
    const totalAmount = calculateTotalAmount(item1, item2, item3);

    // Serve the order confirmation page with the total amount
    res.send(`<h1>Order Confirmation</h1><p>Total amount: $${totalAmount.toFixed(2)}</p>`);
});

// Function to validate form input
function isValidFormInput(item1, item2, item3) {
    return item1 > 0 && item2 > 0 && item3 > 0;
}

// Function to calculate total amount
function calculateTotalAmount(item1, item2, item3) {
    const item1Price = parseFloat(item1);
    const item2Price = parseFloat(item2);
    const item3Price = parseFloat(item3);

    return item1Price + item2Price + item3Price;
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
