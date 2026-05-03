const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));

// 404
app.use((req, res) => {
    res.status(404).send('Sayfa bulunamadı');
});

app.listen(PORT, () => {
    console.log(`🚀 MELL Kompresor ${PORT} portunda çalışıyor...`);
    console.log(`🔗 http://localhost:${PORT}`);
});