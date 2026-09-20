const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve everything in this folder (html, css, assets) as static files
app.use(express.static(path.join(__dirname)));

// Explicit routes so /groceries and /restaurant work without .html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/groceries', (req, res) => res.sendFile(path.join(__dirname, 'groceries.html')));
app.get('/restaurant', (req, res) => res.sendFile(path.join(__dirname, 'restaurant.html')));

app.listen(PORT, () => {
  console.log(`Namaste Spiceland running at http://localhost:${PORT}`);
});
