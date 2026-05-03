const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'MELL Kompresör | Endüstriyel Hava Çözümleri',
        company: {
            name: 'MELL Kompresör',
            founded: 1998,
            phone: '+90 (212) 555 00 00',
            email: 'info@mellkompresor.com.tr',
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