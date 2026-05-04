const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'MELL Kompresör | Endüstriyel Hava Çözümleri',
        company: {
            name: 'MELL Kompresör',
            founded: 1998,
            phone: '+90 542 394 98 85',
            email: 'info@mellkompresor.com',
            address: 'İstanbul, Türkiye'
        }
    });
});

router.post('/iletisim', (req, res) => {
    const { ad, email, telefon, mesaj } = req.body;
    console.log('Yeni mesaj:', { ad, email, telefon, mesaj });
    res.json({ success: true, message: 'Mesajınız alındı!' });
});

module.exports = router;