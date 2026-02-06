# Melovia - Dijital Gitar Simülatörü
## Proje Raporu v1.0

**Tarih:** 6 Şubat 2026  
**Versiyon:** 0.1  
**GitHub:** https://github.com/frzerxz/Melovia

---

## 📋 İçindekiler

1. [Proje Genel Bakış](#proje-genel-bakış)
2. [Son Güncelleme Özeti](#son-güncelleme-özeti)
3. [Teknoloji Stack](#teknoloji-stack)
4. [Dosya Yapısı](#dosya-yapısı)
5. [Ses Motoru v3](#ses-motoru-v3)
6. [Efekt Kontrol Paneli](#efekt-kontrol-paneli)
7. [Gitar Modülü v4](#gitar-modülü-v4)
8. [UI/UX Tasarım Sistemi](#uiux-tasarım-sistemi)
9. [Klavye Entegrasyonu](#klavye-entegrasyonu)
10. [Ders Sistemi](#ders-sistemi)
11. [Unreal Engine Entegrasyonu](#unreal-engine-entegrasyonu)
12. [Gelecek Planları](#gelecek-planları)

---

## 🎯 Proje Genel Bakış

**Melovia**, bilgisayar klavyesi kullanarak gitar çalmayı öğreten interaktif bir web tabanlı müzik eğitim platformudur.

### Temel Özellikler:
- **6 Telli Gitar Simülasyonu** - Klasik, Elektro ve Bas gitar modları
- **Gelişmiş Ses Motoru** - Karplus-Strong algoritması ile gerçekçi gitar sesi
- **20+ Akor Kütüphanesi** - Major, Minor, 7th, Maj7 akorları
- **6 Amplifikatör Preset** - Clean, Crunch, High Gain, Acoustic, Jazz, Metal
- **Efekt Kontrol Paneli** - Chorus, Delay, EQ, Metronom
- **Alternatif Akortlar** - Drop D, Open G, DADGAD ve daha fazlası
- **Sanal Capo Desteği** - 1-12 perde arası
- **İnteraktif Ders Sistemi** - HUD ve Timeline ile şarkı öğrenme
- **Klavye Entegrasyonu** - QWERTY klavye ile nota çalma
- **Zone Sistemi** - 6 bölgeli tuş haritalaması
- **Piyano Modu** - Alternatif enstrüman desteği

### Hedef Kitle:
- Müzik öğrencileri
- Hobi müzisyenler
- Gitar öğrenmek isteyenler
- Oyun geliştiricileri (Unreal Engine entegrasyonu)

---

## 🆕 Son Güncelleme Özeti

### ✅ Eklenen Özellikler:

#### Ses Motoru Geliştirmeleri:
- **6 Amplifikatör Preset:** Clean, Crunch, High Gain, Acoustic, Jazz, Metal
- **Metronom:** 40-220 BPM arası ayarlanabilir tempo
- **Distortion/Reverb kontrolleri** her preset için optimize edildi

#### Gitar Modülü v4:
- **20+ Akor Kütüphanesi:**
  - Major: C, D, E, F, G, A, B
  - Minor: Am, Bm, Cm, Dm, Em, Fm, Gm
  - 7th: A7, B7, C7, D7, E7, G7
  - Maj7: Amaj7, Cmaj7, Dmaj7, Fmaj7, Gmaj7
- **Alternatif Akortlar:** Standard, Drop D, Open G, Open D, DADGAD, Half Step Down
- **Sanal Capo:** 1-12 perde arası destek
- **SVG Akor Diyagramları:** Görsel akor gösterimi

#### Efekt Kontrol Paneli (UI):
- Sağdan kayarak açılan floating panel
- Amp preset butonları
- Master Volume ve Reverb slider'ları
- Chorus efekti (Rate, Depth, Mix kontrolleri)
- Delay efekti (Time, Feedback, Mix kontrolleri)
- 3-Band EQ (Low, Mid, High slider'ları)
- Metronom (Play/Pause + BPM ayarı)

#### Görsel İyileştirmeler:
- Tel titreşim animasyonu geliştirildi
- Chord highlight stili eklendi
- Nota press animasyonu eklendi
- Görsel animasyonlar geliştirildi

#### Dokümantasyon:
- `DOCUMENTATION.md` oluşturuldu - Tüm kavramların detaylı açıklaması
- `README.md` güncellendi

---

## 🛠️ Teknoloji Stack

### Frontend
| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| HTML5 | - | Yapısal içerik |
| CSS3 | - | Stil ve animasyonlar |
| JavaScript (ES6+) | - | İnteraktivite ve mantık |
| Web Audio API | - | Gerçek zamanlı ses sentezleme |

### Ses Teknolojileri
| Özellik | Açıklama |
|---------|----------|
| Karplus-Strong | Fiziksel modelleme ile gitar sesi |
| ADSR Envelope | Attack-Decay-Sustain-Release zarfı |
| Waveshaper | Distortion efekti için |
| Convolver | Reverb (impulse response) |
| BiquadFilter | EQ ve frekans filtreleme |

### Geliştirme Araçları
| Araç | Kullanım Amacı |
|------|----------------|
| http-server | Yerel geliştirme sunucusu |
| Git/GitHub | Versiyon kontrolü |
| VS Code | Kod editörü |

---

## 📁 Dosya Yapısı

```
Melovia/
├── index.html              # Ana uygulama (HTML + inline CSS + JS)
├── README.md               # Proje açıklaması
├── DOCUMENTATION.md        # Kapsamlı teknik dokümantasyon
│
├── js/
│   ├── audioEngine.js      # Ses motoru v3 (Karplus-Strong + Efektler)
│   ├── guitarModule.js     # Gitar modülü v4 (Akorlar + Akortlar + Capo)
│   ├── noteMapping.js      # Nota-frekans dönüşümü
│   ├── lessonsModule.js    # Ders sistemi
│   └── pianoModule.js      # Piyano modülü
│
├── css/
│   ├── styles.css          # Genel stiller
│   ├── guitar.css          # Gitar bileşen stilleri
│   ├── lessons.css         # Ders modülü stilleri
│   └── piano.css           # Piyano stilleri
│
├── docs/
│   ├── PROJECT_REPORT.md   # Bu dosya
│   └── UNREAL_INTEGRATION.md # Unreal Engine rehberi
│
└── unreal/
    ├── MeloviaAPI.js       # Unreal için API wrapper
    └── WebBrowserWidget.md # Widget kurulum rehberi
```

---

## 🔊 Ses Motoru v3

### Mimari Genel Bakış

```
Kaynak → Distortion → Compressor → [Dry + Reverb] → Master → Hoparlör
```

### Karplus-Strong Algoritması

Gerçekçi gitar sesi üretimi için fiziksel modelleme:

1. **Excitation (Uyarım):** Rastgele gürültü + harmonikler
2. **Delay Line:** Periyodik tekrar (tel uzunluğu simülasyonu)
3. **Low-pass Filter:** Her tekrarda yumuşatma (enerji kaybı)
4. **Decay Envelope:** Üstel sönümleme

```javascript
// Karplus-Strong döngüsü
for (let i = 0; i < totalSamples; i++) {
    if (i < periodSamples) {
        data[i] = noiseBuffer[i];
    } else {
        const prev = data[i - periodSamples];
        const next = data[i - periodSamples + 1] || prev;
        data[i] = decay * (blend * prev + (1 - blend) * next);
    }
}
```

### Tel Parametreleri

| Tel | Decay | Blend | Brightness | Attack | Bass Boost |
|-----|-------|-------|------------|--------|------------|
| 1 (E4) | 0.998 | 0.5 | 1.0 | 0.8 | 0 dB |
| 2 (B3) | 0.997 | 0.5 | 0.9 | 0.7 | 0 dB |
| 3 (G3) | 0.996 | 0.48 | 0.8 | 0.6 | +2 dB |
| 4 (D3) | 0.994 | 0.45 | 0.6 | 0.5 | +4 dB |
| 5 (A2) | 0.992 | 0.42 | 0.4 | 0.4 | +6 dB |
| 6 (E2) | 0.990 | 0.40 | 0.3 | 0.35 | +8 dB |

### Amplifikatör Presets

| Preset | Distortion | Reverb | Karakter |
|--------|------------|--------|----------|
| Clean | 0% | 20% | Saf, temiz |
| Crunch | 30% | 15% | Hafif kırık, sıcak |
| High Gain | 70% | 10% | Ağır distortion |
| Acoustic | 0% | 25% | Sıcak, ahşap tını |
| Jazz | 5% | 30% | Yumuşak, yuvarlak |
| Metal | 85% | 5% | Maksimum sertlik |

---

## 🎛️ Efekt Kontrol Paneli

### Panel Yapısı

```
┌─────────────────────────────────────┐
│ ⚙️ Efekt Kontrolleri           [X] │
├─────────────────────────────────────┤
│ 🎸 AMPLİFİKATÖR                     │
│ [Clean][Crunch][High Gain]          │
│ [Acoustic][Jazz][Metal]             │
├─────────────────────────────────────┤
│ 🔊 MASTER                           │
│ Volume: ═══════════●═══ 75%        │
│ Reverb: ═══●═════════════ 20%      │
├─────────────────────────────────────┤
│ 💫 CHORUS                    [OFF]  │
│ Rate:  ═══●════════════════        │
│ Depth: ═══●════════════════        │
│ Mix:   ═══●════════════════        │
├─────────────────────────────────────┤
│ 🔁 DELAY                     [OFF]  │
│ Time:     ═══●═════════════        │
│ Feedback: ═══●═════════════        │
│ Mix:      ═══●═════════════        │
├─────────────────────────────────────┤
│ 📊 EQUALIZER                        │
│   Low    Mid    High                │
│    │      │      │                  │
│    ●      ●      ●                  │
│    │      │      │                  │
├─────────────────────────────────────┤
│ 🥁 METRONOM                         │
│ [▶ Başlat]     120 BPM             │
│ ════════════●══════════════        │
└─────────────────────────────────────┘
```

### Efekt Parametreleri

#### Chorus
- **Rate:** 0.1 - 5 Hz (LFO hızı)
- **Depth:** 0 - 10 ms (frekans sapması)
- **Mix:** 0 - 100% (efekt oranı)

#### Delay
- **Time:** 50 - 1000 ms (gecikme süresi)
- **Feedback:** 0 - 90% (tekrar sayısı)
- **Mix:** 0 - 100% (echo oranı)

#### 3-Band EQ
- **Low:** -12 ile +12 dB (320 Hz altı)
- **Mid:** -12 ile +12 dB (1000 Hz civarı)
- **High:** -12 ile +12 dB (3200 Hz üstü)

#### Metronom
- **BPM:** 40 - 220 (dakikada vuruş)
- **Time Signature:** 4/4 (varsayılan)

---

## 🎸 Gitar Modülü v4

### Akor Kütüphanesi

#### Major Akorlar
| Akor | Perde Pozisyonları | Parmaklar |
|------|-------------------|-----------|
| C | x-3-2-0-1-0 | x-3-2-0-1-0 |
| D | x-x-0-2-3-2 | x-x-0-1-3-2 |
| E | 0-2-2-1-0-0 | 0-2-3-1-0-0 |
| F | 1-3-3-2-1-1 | Barre |
| G | 3-2-0-0-0-3 | 2-1-0-0-0-3 |
| A | x-0-2-2-2-0 | x-0-1-2-3-0 |
| B | x-2-4-4-4-2 | Barre |

#### Minor Akorlar
| Akor | Perde Pozisyonları |
|------|-------------------|
| Am | x-0-2-2-1-0 |
| Dm | x-x-0-2-3-1 |
| Em | 0-2-2-0-0-0 |

### Alternatif Akortlar

| Akort | Teller (6→1) | Kullanım Alanı |
|-------|--------------|----------------|
| Standard | E-A-D-G-B-E | Genel kullanım |
| Drop D | D-A-D-G-B-E | Metal, power chord |
| Open G | D-G-D-G-B-D | Blues, slide |
| Open D | D-A-D-F#-A-D | Folk, slide |
| DADGAD | D-A-D-G-A-D | Celtic, akustik |
| Half Step Down | Eb-Ab-Db-Gb-Bb-Eb | Daha koyu ton |

### Capo Desteği

```javascript
// Capo ile frekans hesaplama
const actualFret = userFret + capoPosition;
const frequency = baseFreq * Math.pow(2, actualFret / 12);
```

---

## 🎨 UI/UX Tasarım Sistemi

### Renk Paleti

```css
:root {
    --bg: #0c0c12;           /* Ana arka plan */
    --panel: #13131a;        /* Panel arka planı */
    --card: #1a1a24;         /* Kart arka planı */
    --accent: #8b5cf6;       /* Vurgu rengi (mor) */
    --cyan: #06b6d4;         /* Turkuaz */
    --pink: #ec4899;         /* Pembe */
    --text: #e0e0e8;         /* Ana metin */
    --dim: #707080;          /* Soluk metin */
}
```

### Animasyonlar

#### Tel Titreşimi
```css
@keyframes vibrate {
    0%, 100% { transform: translateY(-50%) }
    10% { transform: translateY(calc(-50% + 2px)) }
    25% { transform: translateY(calc(-50% - 2px)) }
    /* ... sönümlenme devam eder */
}
```

#### Nota Basım
```css
@keyframes notePress {
    0% { transform: translate(-50%, -50%) scale(0.9) }
    50% { transform: translate(-50%, -50%) scale(1.05) }
    100% { transform: translate(-50%, -50%) scale(1) }
}
```

---

## ⌨️ Klavye Entegrasyonu

### Zone 1 - Primary Grid (Perde 0-3)
```
Açık Tel: 1 2 3 4 5 6   → Tel 6,5,4,3,2,1 - Perde 0
Perde 1:  Q W E R T Y
Perde 2:  A S D F G H
Perde 3:  Z X C V B N
```

### Zone 2 - Vertical Cluster (Perde 4-7)
```
Perde 4: 7 8 9 0 * -
Perde 5: U I O P Ğ Ü
Perde 6: J K L Ş İ ,
Perde 7: M Ö Ç . - "
```

### Özel Tuşlar
- **Space:** Tüm sesleri durdur
- **+/-:** Zone değiştir
- **←/→:** Perde görünümünü kaydır

---

## 📚 Ders Sistemi

### Ders Yapısı
- **Başlık ve Sanatçı**
- **Kullanılan Akorlar**
- **Adım Adım Notalar**
- **İpuçları**

### HUD Bileşenleri
- İlerleme çubuğu
- Aktif nota göstergesi
- Basılacak tuş
- Timeline (kayan nota şeridi)

### Mevcut Dersler
1. **Arkadaşım Eşek** - 40 adım, başlangıç seviyesi

---

## 🎮 Unreal Engine Entegrasyonu

Detaylı bilgi için: [UNREAL_INTEGRATION.md](./UNREAL_INTEGRATION.md)

### Entegrasyon Yöntemleri
1. **Web Browser Widget** - HTML/CSS/JS direkt gösterimi
2. **JavaScript ↔ Blueprint** - İki yönlü iletişim
3. **WebSocket** - Gerçek zamanlı veri aktarımı

---

## 🚀 Gelecek Planları

### v0.5 - Ses Geliştirmeleri
- [ ] Gerçek Chorus/Delay ses efektleri
- [ ] Palm Mute ve Hammer-on teknikleri
- [ ] MIDI desteği

### v0.6 - Ders İçerikleri
- [ ] Yeni şarkılar ekleme
- [ ] Zorluk seviyeleri
- [ ] Skor sistemi

### v0.7 - Sosyal Özellikler
- [ ] Kullanıcı hesapları
- [ ] İlerleme kaydetme
- [ ] Topluluk şarkıları

### v1.0 - Tam Sürüm
- [ ] Mobil uyumluluk
- [ ] Bulut senkronizasyonu
- [ ] Çoklu dil desteği

---

## 📞 İletişim

**GitHub:** https://github.com/frzerxz/Melovia  
**Geliştirici:** frzerxz

---

*Son güncelleme: 6 Şubat 2026 - v0.1*
