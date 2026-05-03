// PRELOADER
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 2000);
});

// CUSTOM CURSOR
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursorDot.style.left = e.clientX - 3 + 'px';
        cursorDot.style.top = e.clientY - 3 + 'px';
    });

    document.querySelectorAll('a, button, .product-card, .service-box, .f-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
});

// PARTICLES
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
}

// COUNTER ANIMATION
const counters = document.querySelectorAll('.h-number');
const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// SCROLL REVEAL
const revealElements = document.querySelectorAll('.section-header, .product-card, .service-box, .testimonial-card, .about-grid, .contact-grid');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s ease';
    revealObserver.observe(el);
});

// MOBILE MENU
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// CONTACT FORM
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('/iletisim', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        showToast(result.message);
        e.target.reset();
    } catch (error) {
        showToast('Bir hata oluştu!', 'error');
    }
});

// TOAST
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.style.background = type === 'error' ? '#e74c3c' : '#27ae60';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// PRODUCT MODAL DATA
const productData = {
    vidali: {
        title: 'Vidalı Kompresörler',
        content: '7.5 HP\'den 500 HP\'ye kadar yağsız ve yağlı vidalı kompresör sistemleri. Endüstriyel üretim tesisleri için ideal çözüm.',
        specs: ['Güç: 7.5 - 500 HP', 'Basınç: 0.8 - 13 bar', 'Hava Debisi: 0.8 - 85 m³/dk', 'Verimlilik: %95+', 'Garanti: 5 Yıl'],
        code: `// Vidalı Kompresör API - Node.js/Express
const express = require('express');
const router = express.Router();

const vidalilar = [
  { id: 1, model: 'MELL-VS-75', guc: '75 HP', basinc: '8 bar', debi: '10.5 m³/dk' },
  { id: 2, model: 'MELL-VS-150', guc: '150 HP', basinc: '10 bar', debi: '22 m³/dk' },
  { id: 3, model: 'MELL-VS-500', guc: '500 HP', basinc: '13 bar', debi: '85 m³/dk' }
];

// Tüm vidalı kompresörleri getir
router.get('/api/urunler/vidali', (req, res) => {
  res.json({
    success: true,
    count: vidalilar.length,
    data: vidalilar
  });
});

// ID'ye göre getir
router.get('/api/urunler/vidali/:id', (req, res) => {
  const urun = vidalilar.find(u => u.id === parseInt(req.params.id));
  if (!urun) return res.status(404).json({ success: false, message: 'Ürün bulunamadı' });
  res.json({ success: true, data: urun });
});

module.exports = router;`
    },
    pistonlu: {
        title: 'Pistonlu Kompresörler',
        content: 'Atölye ve küçük ölçekli üretimler için ekonomik pistonlu kompresörler. Dayanıklı ve düşük bakım maliyetli.',
        specs: ['Güç: 2 - 20 HP', 'Basınç: 8 - 12 bar', 'Tank: 100 - 500 L', 'Verimlilik: %85+', 'Ses: <75 dB'],
        code: `// Pistonlu Kompresör API - Node.js/Express
const express = require('express');
const router = express.Router();

const pistonlular = [
  { id: 1, model: 'MELL-PS-55', guc: '5.5 HP', basinc: '10 bar', tank: '200 L' },
  { id: 2, model: 'MELL-PS-100', guc: '10 HP', basinc: '12 bar', tank: '300 L' },
  { id: 3, model: 'MELL-PS-200', guc: '20 HP', basinc: '12 bar', tank: '500 L' }
];

router.get('/api/urunler/pistonlu', (req, res) => {
  res.json({ success: true, data: pistonlular });
});

router.post('/api/urunler/pistonlu', (req, res) => {
  const yeniUrun = { id: Date.now(), ...req.body };
  pistonlular.push(yeniUrun);
  res.status(201).json({ success: true, data: yeniUrun });
});

module.exports = router;`
    },
    scroll: {
        title: 'Scroll Kompresörler',
        content: '%100 yağsız hava üreten, medikal ve gıda sektörüne özel scroll sistemler. ISO 8573-1 Class 0 kalite.',
        specs: ['Güç: 3 - 30 HP', 'Sınıf: ISO 8573-1 Class 0', 'Basınç: 7 - 10 bar', 'Gürültü: <65 dB', 'Yağsız: %100'],
        code: `// Scroll Kompresör API - Node.js/Express
const express = require('express');
const router = express.Router();

const scrollar = [
  { id: 1, model: 'MELL-SC-30', guc: '30 HP', sinif: 'Class 0', uygulama: 'Medikal' },
  { id: 2, model: 'MELL-SC-15', guc: '15 HP', sinif: 'Class 0', uygulama: 'Gıda' }
];

// Filtreleme örneği
router.get('/api/urunler/scroll', (req, res) => {
  const { uygulama } = req.query;
  let sonuc = scrollar;
  
  if (uygulama) {
    sonuc = scrollar.filter(s => 
      s.uygulama.toLowerCase() === uygulama.toLowerCase()
    );
  }
  
  res.json({ success: true, count: sonuc.length, data: sonuc });
});

module.exports = router;`
    },
    kurutucu: {
        title: 'Hava Kurutucuları',
        content: 'Soğutmalı ve adsorpsiyon kurutucular ile basınçlı hava kalitesini artırın. Enerji verimli modeller.',
        specs: ['Kapasite: 10 - 5000 m³/h', 'PDP: -20°C / -70°C', 'Tip: Soğutmalı/Adsorpsiyon', 'Enerji: %30 tasarruf', 'IE3 Motor'],
        code: `// Kurutucu API - Node.js/Express
const express = require('express');
const router = express.Router();

const kurutucular = [
  { id: 1, model: 'MELL-HK-500', tip: 'Soğutmalı', kapasite: '500 m³/h', pdp: '-40°C' },
  { id: 2, model: 'MELL-HK-2000', tip: 'Adsorpsiyon', kapasite: '2000 m³/h', pdp: '-70°C' }
];

// Tip'e göre filtrele
router.get('/api/urunler/kurutucu/:tip', (req, res) => {
  const { tip } = req.params;
  const sonuc = kurutucular.filter(k => 
    k.tip.toLowerCase() === tip.toLowerCase()
  );
  res.json({ success: true, data: sonuc });
});

module.exports = router;`
    },
    tank: {
        title: 'Basınçlı Hava Tankları',
        content: 'CE sertifikalı, galvanizli ve boyalı basınçlı hava tankları. PED 2014/68/EU uyumlu.',
        specs: ['Hacim: 100 - 10.000 L', 'Basınç: 11 - 16 bar', 'Sertifika: CE/PED', 'Malzeme: Çelik/Galvaniz', 'Boya: Epoksi'],
        code: `// Tank API - Node.js/Express
const express = require('express');
const router = express.Router();

const tanklar = [
  { id: 1, model: 'MELL-TK-1000', hacim: '1000 L', basinc: '11 bar', malzeme: 'Çelik' },
  { id: 2, model: 'MELL-TK-5000', hacim: '5000 L', basinc: '16 bar', malzeme: 'Galvaniz' }
];

// Hacim aralığına göre filtrele
router.get('/api/urunler/tank', (req, res) => {
  const { min, max } = req.query;
  let sonuc = tanklar;
  
  if (min && max) {
    sonuc = tanklar.filter(t => {
      const hacim = parseInt(t.hacim);
      return hacim >= parseInt(min) && hacim <= parseInt(max);
    });
  }
  
  res.json({ success: true, data: sonuc });
});

module.exports = router;`
    },
    filtre: {
        title: 'Hava Filtreleri',
        content: 'Partikül, aktif karbon ve mikro filtreler ile hava kalitesi garantisi. ISO 8573-1 1.2.1 sınıfı.',
        specs: ['Filtrasyon: 0.01 μm', 'Sınıf: ISO 8573-1 1.2.1', 'Akış: 35 - 5500 m³/h', 'Debi: Yüksek verim', 'Ömür: 8000 saat'],
        code: `// Filtre API - Node.js/Express
const express = require('express');
const router = express.Router();

const filtreler = [
  { id: 1, model: 'MELL-FK-100', tip: 'Aktif Karbon', filtrasyon: '0.01 μm', degisim: '8000 saat' },
  { id: 2, model: 'MELL-FK-500', tip: 'Mikro Filtre', filtrasyon: '0.01 μm', degisim: '4000 saat' }
];

// MongoDB ile CRUD örneği
const mongoose = require('mongoose');

const filtreSchema = new mongoose.Schema({
  model: String,
  tip: String,
  filtrasyon: String,
  degisimSuresi: String,
  fiyat: Number,
  stok: { type: Number, default: 0 }
});

const Filtre = mongoose.model('Filtre', filtreSchema);

router.get('/api/urunler/filtre', async (req, res) => {
  try {
    const filtreler = await Filtre.find();
    res.json({ success: true, count: filtreler.length, data: filtreler });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;`
    }
};

// MODAL FUNCTIONS
function openProductModal(type) {
    const modal = document.getElementById('productModal');
    const content = document.getElementById('modalContent');
    const data = productData[type];
    
    if (!data) return;
    
    content.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.content}</p>
        <div class="modal-specs">
            ${data.specs.map(s => `<span><i class="fas fa-check-circle"></i> ${s}</span>`).join('')}
        </div>
        <div class="modal-code">
            <h4 style="color:var(--white);margin-bottom:15px;"><i class="fas fa-code"></i> Node.js API Kodu:</h4>
            <pre>${data.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
        </div>
        <a href="#iletisim" class="btn btn-primary" onclick="closeModal()" style="margin-top:10px;">
            <i class="fas fa-phone"></i> Teklif Al
        </a>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') closeModal();
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navMenu.classList.remove('active');
        }
    });
});

// ESC ile modal kapat
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
