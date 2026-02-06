# 🎸 Melovia - Digital Guitar Simulator

**Melovia**, bilgisayar klavyesi kullanarak gitar çalmayı öğreten interaktif, web tabanlı bir müzik eğitim platformudur. Gerçekçi gitar, piyano modları ve interaktif ders sistemi içerir.

🔗 **Canlı Demo (Live Demo):** [https://frzerxz.github.io/Melovia/](https://frzerxz.github.io/Melovia/)

## ✨ Özellikler

### 🎸 Gitar Modülü v4
- **6 Telli Gitar Simülasyonu:** Klasik, Elektro ve Bas gitar modları
- **20+ Akor Kütüphanesi:** Major, Minor, 7th, Maj7 akorları (C, D, E, F, G, A, B ve varyasyonları)
- **Alternatif Akortlar:** Standard, Drop D, Open G, Open D, DADGAD, Half Step Down
- **Sanal Capo:** 1-12 perde arası capo desteği
- **Strum Modu:** Yukarı/aşağı strum yönü

### 🔊 Gelişmiş Ses Motoru v4
- **Karplus-Strong Sentezi:** Gerçekçi gitar tını simülasyonu
- **6 Amplifikatör Preset'i:** Clean, Crunch, High Gain, Acoustic, Jazz, Metal
- **Efekt Zinciri:**
  - 💫 Chorus (Rate, Depth, Mix kontrolleri)
  - 🔁 Delay/Echo (Time, Feedback, Mix)
  - 📊 3-Band EQ (Low, Mid, High)
  - 🌊 Reverb
  - ⚡ Distortion/Overdrive
- **🥁 Metronom:** 40-220 BPM arası ayarlanabilir tempo
- **Palm Mute:** Bastırılmış tel sesi

### 🎹 Piyano Modu
- Temel piyano tuşları entegrasyonu
- Klavye ile çalma desteği

### 🎓 İnteraktif Dersler
- **Ders 1: Arkadaşım Eşek:** 40 adımlık, senkronize, oyunlaştırılmış ders deneyimi
- **HUD (Heads-Up Display):** Kayan nota şeridi (Timeline) ve anlık geri bildirim
- **İlerleme Takibi:** Ders tamamlama ve başarı sistemi

### 🎨 Modern UI/UX
- **Efekt Kontrol Paneli:** Sağdan kayarak açılan floating panel
- **Görsel Geri Bildirim:** Nota çalındığında dalga efekti animasyonu
- **Responsive Tasarım:** Farklı ekran boyutlarına uyumlu
- **Koyu Tema:** Göz yormayan karanlık arayüz

## 🚀 Kurulum

Projeyi yerel makinenizde çalıştırmak için:

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/frzerxz/Melovia.git
   ```
2. Klasöre girin:
   ```bash
   cd Melovia
   ```
3. Bir yerel sunucu başlatın (Örn: VS Code Live Server veya http-server):
   ```bash
   npx http-server -p 8080 -c-1
   ```
4. Tarayıcıda açın: `http://localhost:8080`

## 🎮 Nasıl Oynanır?

### Gitar Modu
- Klavye tuşları (1-6, Q-Y, A-H, Z-N) gitar tellerine ve perdelere haritalanmıştır
- **Space:** Tüm sesleri durdur
- **+ / -:** Zone değiştir
- **← / →:** Perde görünümünü kaydır

### Efekt Paneli
- Sağ üstteki ⚙️ butonuna tıklayarak efekt panelini açın
- Amp preset'lerini, EQ'yu ve efektleri ayarlayın
- Metronom ile tempo tutun

### Dersler
- "Dersler" sekmesinden bir ders seçin
- HUD üzerindeki yönergeleri takip edin
- Doğru tuşlara basarak ilerleyin

## 🛠️ Teknolojiler

- **HTML5 / CSS3 / Vanilla JavaScript**
- **Web Audio API:** Gerçek zamanlı ses sentezi
- **Karplus-Strong Algoritması:** Fiziksel modelleme ile gitar sesi

## 📁 Proje Yapısı

```
Melovia/
├── index.html          # Ana sayfa
├── css/
│   ├── styles.css      # Ana stiller
│   ├── guitar.css      # Gitar stilleri
│   ├── lessons.css     # Ders stilleri
│   └── piano.css       # Piyano stilleri
├── js/
│   ├── app.js          # Ana uygulama
│   ├── audioEngine.js  # Ses motoru v4
│   ├── guitarModule.js # Gitar modülü v4
│   ├── lessonsModule.js # Ders sistemi
│   ├── noteMapping.js  # Nota-frekans eşleştirmesi
│   └── pianoModule.js  # Piyano modülü
└── docs/               # Dokümantasyon
```

---
*Developed by Melovia Team - v0.4*
