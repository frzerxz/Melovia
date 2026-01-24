# Melovia - Dijital Gitar Simülatörü
## Proje Raporu v1.0

**Tarih:** 22 Ocak 2026  
**Versiyon:** 0.1  
**GitHub:** https://github.com/frzerxz/Melovia

---

## 📋 İçindekiler

1. [Proje Genel Bakış](#proje-genel-bakış)
2. [Teknoloji Stack](#teknoloji-stack)
3. [Dosya Yapısı](#dosya-yapısı)
4. [UI/UX Tasarım Sistemi](#uiux-tasarım-sistemi)
5. [Renk Paleti](#renk-paleti)
6. [Bileşenler](#bileşenler)
7. [Klavye Entegrasyonu](#klavye-entegrasyonu)
8. [Ses Motoru](#ses-motoru)
9. [Unreal Engine Entegrasyonu](#unreal-engine-entegrasyonu)
10. [Gelecek Planları](#gelecek-planları)

---

## 🎯 Proje Genel Bakış

**Melovia**, bilgisayar klavyesi kullanarak gitar çalmayı öğreten interaktif bir web tabanlı müzik eğitim platformudur.

### Temel Özellikler:
- **6 Telli Gitar Simülasyonu** - Klasik, Elektro ve Bas- **HUD (Heads-Up Display) Geliştirmesi:**
  - "Dersi Başlat" özelliği ile gitar sekmesinde açılan interaktif ders arayüzü.
  - **Kompakt Tasarım:** Şarkı bilgisi, aktif nota detayları ve kontroller tek bir yatay şeritte toplandı.
  - **Auto-Focus Timeline:** Gelecek notaların kayan bir şerit üzerinde gösterildiği ve aktif notanın her zaman merkezde olduğu dinamik akış.
  - **Ders Verisi Doğrulaması:** "Arkadaşım Eşek" dersi için notalar, gitarın S6-S1 (Kalın-İnce) tel yapısına ve doğru perdelere göre yeniden düzenlendi. Özellikle Outro kısmı kalın tonlara (4. ve 5. teller) taşındı.
  - **Tamamlama Mantığı:** Şarkı bittiğinde başarı mesajı ve dersi sonlandırma akışı eklendi.
- **Tasarım İyileştirmeleri:** Ders kartları simetrik hale getirildi, butonlar ve ikonlar hizalandı.
- **Klavye Entegrasyonu** - QWERTY klavye ile nota çalma
- **Zone Sistemi** - 6 bölgeli tuş haritalaması
- **Pair Sistemi** - Perde gruplarını yönetme
- **Görsel Fretboard** - İnteraktif perde görselleştirmesi
- **Piyano Modu** - Alternatif enstrüman desteği
- **Ders Modülü** - Şarkı öğrenme sistemi

### Hedef Kitle:
- Müzik öğrencileri
- Hobi müzisyenler
- Gitar öğrenmek isteyenler
- Oyun geliştiricileri (Unreal Engine entegrasyonu)

---

## 🛠️ Teknoloji Stack

### Frontend
| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| HTML5 | - | Yapısal içerik |
| CSS3 | - | Stil ve animasyonlar |
| JavaScript (ES6+) | - | İnteraktivite ve mantık |
| Web Audio API | - | Ses sentezleme |

### Geliştirme Araçları
| Araç | Kullanım Amacı |
|------|----------------|
| http-server | Yerel geliştirme sunucusu |
| Git | Versiyon kontrolü |
| VS Code | Kod editörü |

### Harici Bağımlılıklar
- **Google Fonts (Inter)** - Tipografi
- Başka harici bağımlılık yok (vanilla JS)

---

## 📁 Dosya Yapısı

```
Melovia/
├── index.html          # Ana uygulama dosyası (tüm CSS ve JS dahil)
├── docs/
│   ├── PROJECT_REPORT.md    # Bu dosya
│   └── UNREAL_INTEGRATION.md # Unreal Engine rehberi
├── unreal/
│   ├── MeloviaAPI.js        # Unreal için API wrapper
│   └── WebBrowserWidget.md  # Widget kurulum rehberi
├── css/
│   ├── guitar.css      # Gitar bileşen stilleri (gelecek)
│   ├── lessons.css     # Ders modülü stilleri (gelecek)
│   ├── piano.css       # Piyano stilleri (gelecek)
│   └── styles.css      # Genel stiller (gelecek)
├── js/
│   ├── app.js          # Ana uygulama mantığı (gelecek)
│   ├── audioEngine.js  # Ses motoru
│   ├── guitarModule.js # Gitar modülü (gelecek)
│   ├── lessonModule.js # Ders modülü (gelecek)
│   └── pianoModule.js  # Piyano modülü
└── assets/
    └── sounds/         # Ses dosyaları (gelecek)
```

---

## 🎨 UI/UX Tasarım Sistemi

### Tasarım İlkeleri

1. **Koyu Tema** - Göz yorgunluğunu azaltmak için
2. **Soft Renkler** - Göz yormayan pastel tonlar
3. **Oval Köşeler** - Modern ve yumuşak görünüm
4. **Gradient Geçişler** - Mavi → Mor renk akışı
5. **Tutarlılık** - Tüm bileşenlerde aynı stil dili

### Grid Sistemi

```
┌─────────────────────────────────────────────────────────┐
│ HEADER (border-radius: 0 0 16px 16px)                   │
├─────────────────────────────────────────────────────────┤
│ FRETBOARD TOOLBAR                                       │
│ [Dropdown] [Spacer] [Label] [◀] [Range] [▶]            │
├─────────────────────────────────────────────────────────┤
│ FRETBOARD (19-24 perde)                                 │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ E ─────●─────────────────●─────────────────────     │ │
│ │ A ───────────────────────────────────────────────   │ │
│ │ D ─────────────●─────────────────●─────────────     │ │
│ │ G ───────────────────────────────────────────────   │ │
│ │ B ───────────────────────────────────────────────   │ │
│ │ E ─────────────────────────────────────────────●    │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ NOTE BAR (Nota | Pozisyon)                              │
├─────────────────────────────────────────────────────────┤
│ PAIR ROW                                                │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐          │
│ │ Pair 1 │ │ Pair 2 │ │ Pair 3 │ │Kontroller│          │
│ │ [1][2] │ │ [3][4] │ │ [5][6] │ │ [+][-]   │          │
│ └────────┘ └────────┘ └────────┘ └──────────┘          │
├─────────────────────────────────────────────────────────┤
│ ZONES                                                   │
│ ┌─────────────────────┐ ┌─────────────────────┐        │
│ │ Zone 1 (0-3)        │ │ Zone 2 (4-7)        │        │
│ │ Primary Grid        │ │ Vertical Cluster    │        │
│ │ ┌─┬─┬─┬─┬─┬─┐      │ │ ┌─┬─┬─┬─┬─┬─┐      │        │
│ │ │1│2│3│4│5│6│      │ │ │7│8│9│0│-│=│      │        │
│ │ ├─┼─┼─┼─┼─┼─┤      │ │ ├─┼─┼─┼─┼─┼─┤      │        │
│ │ │Q│W│E│R│T│Y│      │ │ │U│I│O│P│Ğ│Ü│      │        │
│ │ └─┴─┴─┴─┴─┴─┘      │ │ └─┴─┴─┴─┴─┴─┘      │        │
│ └─────────────────────┘ └─────────────────────┘        │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Renk Paleti

### CSS Değişkenleri

```css
:root {
    --bg: #0c0c12;           /* Ana arka plan */
    --panel: #13131a;        /* Panel arka planı */
    --card: #1a1a24;         /* Kart arka planı */
    --accent: #8b5cf6;       /* Vurgu rengi (mor) */
    --accent-dim: rgba(139, 92, 246, 0.3);
    --cyan: #06b6d4;         /* Turkuaz */
    --pink: #ec4899;         /* Pembe */
    --text: #e0e0e8;         /* Ana metin */
    --dim: #707080;          /* Soluk metin */
    --muted: #404050;        /* Çok soluk metin */
    --border: rgba(255, 255, 255, 0.06);
}
```

### Tel Renkleri (Zone 1 - Soğuk Tonlar)

| Tel | Renk | Hex | Kullanım |
|-----|------|-----|----------|
| E1 (ince) | Pembe | #f472b6 | String 1 |
| B | Turuncu | #fb923c | String 2 |
| G | Sarı | #facc15 | String 3 |
| D | Yeşil | #4ade80 | String 4 |
| A | Cyan | #22d3ee | String 5 |
| E6 (kalın) | Mor | #a78bfa | String 6 |

### Tel Renkleri (Zone 2 - Sıcak Tonlar)

| Tel | Renk | Hex | Kullanım |
|-----|------|-----|----------|
| E1 | Kırmızı | #fca5a5 | String 1 |
| B | Amber | #fcd34d | String 2 |
| G | Lime | #bef264 | String 3 |
| D | Teal | #5eead4 | String 4 |
| A | İndigo | #a5b4fc | String 5 |
| E6 | Pembe | #f472b6 | String 6 |

### Zone Renkleri

| Zone | Ana Renk | Kullanım |
|------|----------|----------|
| Zone 1 | Yeşil (#4ade80) | Primary Grid |
| Zone 2 | Pembe (#f472b6) | Vertical Cluster |

### Gradient Kullanımları

```css
/* Navigasyon okları - Mavi → Mor geçişi */
.fb-btn:first-of-type  { /* Mavi */ }
.fb-range              { /* Mavi → Mor gradient */ }
.fb-btn.accent         { /* Mor */ }

/* Dropdown seçim */
background: linear-gradient(90deg, 
    rgba(59, 130, 246, 0.3),   /* Mavi */
    rgba(168, 85, 247, 0.35)   /* Mor */
);

/* Fretboard tel renkleri - Bronz ve Gümüş */
E6, A, D: Bronz tonları (kalın teller)
G, B, E1: Gümüş tonları (ince teller)
```

---

## 🧩 Bileşenler

### 1. Header

```html
<header class="header">
    <div class="logo">🎵 Melovia v0.1</div>
    <nav class="nav">...</nav>
    <div class="header-right">...</div>
</header>
```

**Özellikler:**
- Alt köşeler oval: `border-radius: 0 0 16px 16px`
- Logo gradient: Lila → Turkuaz
- Versiyon badge: Soft turkuaz

### 2. Guitar Dropdown (Custom)

```html
<div class="guitar-dropdown">
    <button class="guitar-dropdown-btn">
        <span>🎸 Klasik Gitar</span>
    </button>
    <div class="guitar-dropdown-menu">
        <button class="guitar-dropdown-item active">🎸 Klasik Gitar</button>
        <button class="guitar-dropdown-item">⚡ Elektro Gitar</button>
        <button class="guitar-dropdown-item">🎸 Bas Gitar</button>
    </div>
</div>
```

**Özellikler:**
- Oval köşeler: `border-radius: 20px` (buton), `12px` (menü)
- Gri arka plan: `rgba(100, 100, 120, 0.12)`
- Hover/Active: Mavi-mor gradient
- Blur efekti: `backdrop-filter: blur(10px)`

### 3. Fretboard

```html
<div class="fretboard-container">
    <div class="string-labels">E, A, D, G, B, E</div>
    <div class="fretboard-nut"></div>
    <div class="fretboard">
        <div class="fret-col">
            <div class="string-cell">...</div>
            <div class="inlay single"></div>
        </div>
    </div>
</div>
```

**Özellikler:**
- 19-24 perde (gitar tipine göre)
- Inlay işaretleri: 3, 5, 7, 9, 12, 15, 17, 19
- Çift inlay: 12. perde
- Tel kalınlıkları: 1.5px - 3.5px

### 4. Pair Cards

```html
<div class="pair-card active" data-pair="1">
    <div class="pair-title">Pair 1</div>
    <div class="pair-frets">0 - 7. Perde</div>
    <div class="pair-nums">
        <span>1</span>  <!-- Yeşil -->
        <span>2</span>  <!-- Pembe -->
    </div>
</div>
```

**Özellikler:**
- Arka plan: `rgba(100, 100, 120, 0.08)`
- Border: Cyan `rgba(6, 182, 212, 0.4)`
- Pair numaraları: Yeşil (tek) + Pembe (çift)

### 5. Zone Panels

```html
<div class="zone-panel">
    <div class="zone-head">
        <span class="zone-tag z1">Zone 1 (0-3)</span>
        <span class="zone-type">🎸 Primary Grid</span>
    </div>
    <div class="key-grid">...</div>
</div>
```

**Özellikler:**
- Sol kenarlık: Zone 1 = Yeşil, Zone 2 = Pembe
- Arka plan: `rgba(100, 100, 120, 0.08)`
- Grid gap: `8px 10px`

### 6. Key Buttons

```html
<button class="key-btn s1" data-s="1" data-f="0">1</button>
```

**Özellikler:**
- Boyut: 36x36px
- Soft renkler: `0.12` background, `0.35` border
- Active state: Daha parlak renkler

---

## ⌨️ Klavye Entegrasyonu

### Zone 1 - Primary Grid (Perde 0-3)

```
Açık Tel: 1 2 3 4 5 6
Perde 1:  Q W E R T Y
Perde 2:  A S D F G H
Perde 3:  < Z X C V B
```

### Zone 2 - Vertical Cluster (Perde 4-7)

```
Perde 4: 7 8 9 0 * -
Perde 5: U I O P Ğ Ü
Perde 6: J K L Ş İ ,
Perde 7: N M Ö Ç . "
```

### Tuş Haritalaması

```javascript
const oddZoneKeys = [
    ['1', '2', '3', '4', '5', '6'],
    ['Q', 'W', 'E', 'R', 'T', 'Y'],
    ['A', 'S', 'D', 'F', 'G', 'H'],
    ['<', 'Z', 'X', 'C', 'V', 'B']
];

const evenZoneKeys = [
    ['7', '8', '9', '0', '*', '-'],
    ['U', 'I', 'O', 'P', 'Ğ', 'Ü'],
    ['J', 'K', 'L', 'Ş', 'İ', ','],
    ['N', 'M', 'Ö', 'Ç', '.', '"']
];
```

### Türkçe Karakter Dönüşümü

```javascript
const turkishKeyMap = {
    'ı': 'I', 'i': 'İ',
    'ğ': 'Ğ', 'ü': 'Ü',
    'ş': 'Ş', 'ö': 'Ö', 'ç': 'Ç'
};
```

---

## 🔊 Ses Motoru

### Web Audio API Kullanımı

```javascript
const audioEngine = {
    ctx: null,
    
    async init() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },
    
    playNote(frequency, duration = 0.5) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.value = frequency;
        
        // ADSR envelope
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
};
```

### Gitar Akort Frekansları

| Tel | Nota | Frekans (Hz) |
|-----|------|--------------|
| E6 | Mi (E2) | 82.41 |
| A | La (A2) | 110.00 |
| D | Re (D3) | 146.83 |
| G | Sol (G3) | 196.00 |
| B | Si (B3) | 246.94 |
| E1 | Mi (E4) | 329.63 |

### Fret Frekans Hesaplama

```javascript
function getFrequency(baseFreq, fret) {
    return baseFreq * Math.pow(2, fret / 12);
}
```

---

## 🎮 Unreal Engine Entegrasyonu

Detaylı bilgi için: [UNREAL_INTEGRATION.md](./UNREAL_INTEGRATION.md)

### Genel Bakış

Melovia, Unreal Engine 5'e **Web Browser Widget** kullanılarak entegre edilebilir.

### Entegrasyon Yöntemleri

1. **Web Browser Widget** - HTML/CSS/JS direkt gösterimi
2. **JavaScript ↔ Blueprint** - İki yönlü iletişim
3. **WebSocket** - Gerçek zamanlı veri aktarımı

### API Fonksiyonları

```javascript
// Unreal'a mesaj gönder
window.ue?.interface?.broadcast('NotePressed', {
    string: 1,
    fret: 5,
    frequency: 440
});

// Unreal'dan mesaj al
window.receiveFromUnreal = function(data) {
    console.log('Unreal:', data);
};
```

---

## 🚀 Gelecek Planları

### v0.2 - Ders Modülü
- [ ] Şarkı listesi
- [ ] Tab gösterimi
- [ ] İlerleme takibi
- [ ] Ritim modu

### v0.3 - Ses Geliştirmeleri
- [ ] Gerçek gitar örnekleri
- [ ] Efektler (reverb, delay)
- [ ] MIDI desteği

### v0.4 - Unreal Entegrasyonu
- [ ] Blueprint API
- [ ] 3D gitar modeli senkronizasyonu
- [ ] Oyun modu

### v1.0 - Tam Sürüm
- [ ] Kullanıcı hesapları
- [ ] Bulut senkronizasyonu
- [ ] Topluluk şarkıları

---

## 📞 İletişim

**GitHub:** https://github.com/frzerxz/Melovia  
**Geliştirici:** frzerxz

---

*Bu belge otomatik olarak oluşturulmuştur. Son güncelleme: 22 Ocak 2026*
