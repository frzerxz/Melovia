# Melovia - Dijital Gitar Simülatörü
## Proje Raporu v0.2

**Tarih:** 10 Şubat 2026  
**Versiyon:** 0.2  
**GitHub:** https://github.com/frzerxz/Melovia  
**Canlı Demo:** https://frzerxz.github.io/Melovia/

---

## 📋 İçindekiler

1. [Proje Genel Bakış](#proje-genel-bakış)
2. [Son Güncelleme Özeti (v0.2)](#son-güncelleme-özeti-v02)
3. [Teknoloji Stack](#teknoloji-stack)
4. [Dosya Yapısı](#dosya-yapısı)
5. [Ses Motoru v3](#ses-motoru-v3)
6. [Efekt Kontrol Paneli](#efekt-kontrol-paneli)
7. [Gitar Modülü v4](#gitar-modülü-v4)
8. [Ders Sistemi v2](#ders-sistemi-v2)
9. [Practice Mode (Şarkı Pratikleri)](#practice-mode-şarkı-pratikleri)
10. [Sayfa Davranışları](#sayfa-davranışları)
11. [UI/UX Tasarım Sistemi](#uiux-tasarım-sistemi)
12. [Klavye Entegrasyonu](#klavye-entegrasyonu)
13. [Gelecek Planları](#gelecek-planları)

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
- **8 İnteraktif Ders** - 5 temel ders + 3 ünlü şarkı pratiği
- **Practice Mode** - Smoke on the Water, Seven Nation Army, Come As You Are
- **HUD ve Timeline** ile interaktif nota takibi
- **Klavye Entegrasyonu** - QWERTY klavye ile nota çalma
- **6-Zone Sistemi** - 6 bölgeli tuş haritalaması (24 perde kaplama)
- **Piyano Modu** - Alternatif enstrüman desteği
- **Tablature Görüntüleyici** - Tab okuma ve takip
- **Backing Track Player** - Blues, Pop Rock, Metal jam track'leri
- **Kayıt & Playback** - Çalmalarınızı kaydedin ve dinleyin

### Hedef Kitle:
- Müzik öğrencileri
- Hobi müzisyenler
- Gitar öğrenmek isteyenler
- Müzik eğitmenleri

---

## 🆕 Son Güncelleme Özeti (v0.2)

### ✅ v0.2 ile Eklenen Özellikler (10 Şubat 2026):

#### İnteraktif Ders İçerikleri:
- **Ders 2: Temel Akorlar** - Hayat Bayram Olsa (Şenay, 1972) songData eklendi
  - Am→E→Dm akor progresyonu, 18 nota, akor tonları aşağıdan yukarıya
- **Ders 3: Palm Mute** - Kesme Ritim Tekniği songData eklendi
  - E5→A5→D5 power chord root+5th pattern, 20 nota
- **Ders 4: Arpej Tekniği** - Caddelerde Rüzgar (Nilüfer, 1978) songData eklendi
  - P-I-M-A-M-I arpej kalıbı (Am→Dm→E), 22 nota
- **Ders 5: Hızlı Geçişler** - Akdeniz Akşamları (Haluk Levent, 1998) songData eklendi
  - Am→G→F→E akor tonları (F barre dahil), 28 nota

#### Ders Açıklamaları Zenginleştirildi:
- Her ders için **araştırmaya dayalı** kapsamlı açıklamalar yazıldı
- Şarkı tarihleri, orijinal tonları, kullanılan teller ve perde aralıkları eklendi
- Her ders için detaylı pratik ipuçları (BPM önerileri, parmak teknikleri) eklendi
- HTML kartlarındaki kısa açıklamalar da güncellendi

#### Sayfa Davranışları Düzeltildi:
- **Scroll Sıfırlama:** Sayfa yenilendiğinde her zaman en üste scroll edilir
  - `<head>` içinde erken `history.scrollRestoration = 'manual'`
  - `document.documentElement.scrollTop = 0` fallback
  - `load` ve `beforeunload` event listener'ları
- **Ders/Practice Başlatma Scroll'u:** 4 kademeli scroll (hemen, 50ms, 200ms, 400ms)
- **Section Geçiş Scroll'u:** `showSection()` içinde `scrollTo(0, 0)`
- **Nota Göstergesi Sıfırlama:** Varsayılan "--" (belirli nota göstermez)
- **Pozisyon Göstergesi Sıfırlama:** Varsayılan "--" (belirli tel/perde göstermez)

### ✅ v0.1 ile Eklenen Özellikler (6 Şubat 2026):

#### Ses Motoru Geliştirmeleri:
- **6 Amplifikatör Preset:** Clean, Crunch, High Gain, Acoustic, Jazz, Metal
- **Metronom:** 40-220 BPM arası ayarlanabilir tempo
- **Distortion/Reverb kontrolleri** her preset için optimize edildi

#### Gitar Modülü v4:
- **20+ Akor Kütüphanesi** (Major, Minor, 7th, Maj7)
- **Alternatif Akortlar:** Standard, Drop D, Open G, Open D, DADGAD, Half Step Down
- **Sanal Capo:** 1-12 perde arası destek

#### Efekt Kontrol Paneli (UI):
- Sağdan kayarak açılan floating panel
- Amp preset butonları, Master Volume, Reverb, Chorus, Delay, EQ, Metronom

#### Ders Sistemi v1:
- İlk interaktif ders: Arkadaşım Eşek (Barış Manço) - 40 nota
- 3 şarkı pratiği: Smoke on the Water, Seven Nation Army, Come As You Are
- Live Lesson HUD sistemi

#### Görsel İyileştirmeler:
- Tel titreşim animasyonu
- Chord highlight stili
- Nota press animasyonu

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
| Git/GitHub | Versiyon kontrolü |
| GitHub Pages | Canlı demo barındırma |
| VS Code | Kod editörü |

---

## 📁 Dosya Yapısı

```
Melovia/
├── index.html              # Ana uygulama (~5068 satır)
│                            # HTML + inline CSS + JavaScript
│                            # Tüm UI, stiller, lessonsData ve mantık
│
├── js/
│   ├── audioEngine.js      # Ses motoru v3 (Karplus-Strong + Efektler)
│   └── noteMapping.js      # Nota-frekans dönüşüm tablosu
│
├── docs/
│   └── PROJECT_REPORT.md   # Bu dosya
│
├── README.md               # Proje genel açıklaması
├── DOCUMENTATION.md        # Kapsamlı teknik dokümantasyon
└── .gitignore              # Git dışı tutulacak dosyalar
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
│ Rate / Depth / Mix                  │
├─────────────────────────────────────┤
│ 🔁 DELAY                     [OFF]  │
│ Time / Feedback / Mix               │
├─────────────────────────────────────┤
│ 📊 EQUALIZER                        │
│ Low / Mid / High                    │
├─────────────────────────────────────┤
│ 🥁 METRONOM                         │
│ [▶ Başlat]     120 BPM             │
└─────────────────────────────────────┘
```

---

## 🎸 Gitar Modülü v4

### Akor Kütüphanesi

#### Major Akorlar
| Akor | Perde Pozisyonları |
|------|-------------------|
| C | x-3-2-0-1-0 |
| D | x-x-0-2-3-2 |
| E | 0-2-2-1-0-0 |
| F | 1-3-3-2-1-1 (Barre) |
| G | 3-2-0-0-0-3 |
| A | x-0-2-2-2-0 |

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

---

## 📚 Ders Sistemi v2

### Genel Bakış
Melovia'nın ders sistemi 8 interaktif ders içerir: 5 temel ders ve 3 şarkı pratiği. Her ders araştırmaya dayalı, kapsamlı açıklamalar ve pratik ipuçları ile donatılmıştır.

### Temel Dersler

| # | Ders | Şarkı/Konu | Nota | Zorluk | Teknik |
|---|------|-----------|------|--------|--------|
| 1 | İlk Melodim | Arkadaşım Eşek - Barış Manço (1975) | 40 | ★☆☆ | Tek parmak melodi, Em tonu |
| 2 | Temel Akorlar | Hayat Bayram Olsa - Şenay (1972) | 18 | ★★☆ | Am-E-Dm akor geçişleri |
| 3 | Palm Mute | Kesme Ritim Tekniği | 20 | ★★☆ | E5-A5-D5 power chord |
| 4 | Arpej Tekniği | Caddelerde Rüzgar - Nilüfer (1978) | 22 | ★★★ | P-I-M-A parmak arpej |
| 5 | Hızlı Geçişler | Akdeniz Akşamları - Haluk Levent (1998) | 28 | ★★★ | Am-G-F-E, F barre |

### Ders Detayları

#### Ders 1: İlk Melodim - Arkadaşım Eşek
- **Orijinal Ton:** Em (Mi minör)
- **Kullanılan Teller:** 4. tel (D) ve 3. tel (G), perde 0-3 aralığı
- **Teknik:** Tek parmak ile çalınabilen basit nota dizilişi
- **İpuçları:** 50 BPM'de başlayın, RE-LA-Sİ geçişini pratik edin

#### Ders 2: Temel Akorlar - Hayat Bayram Olsa
- **Orijinal Ton:** Gm, gitarda Am'a transpose
- **Akorlar:** Am → E → Dm üçlü progresyon
- **Ritim:** 4/4, A-AY-Y-AY (Aşağı-Aşağı Yukarı-Yukarı-Aşağı Yukarı) vuruş
- **İpuçları:** Am→E geçişinde parmak kaydırma, 10 dk/gün pratik

#### Ders 3: Palm Mute - Kesme Ritim
- **Teknik:** Sağ el avuç içi kenarını köprü üzerine yerleştirme
- **Akorlar:** E5, A5, D5 power chord'lar
- **Kalıp:** Root-root-5th-root (her power chord için)
- **İpuçları:** Hafif temas yeterli, Green Day/Blink-182 örnekleri

#### Ders 4: Arpej Tekniği - Caddelerde Rüzgar
- **Teknik:** P-I-M-A klasik gitar parmak tekniği
  - P (Pulgar): Başparmak → kalın teller (6-5-4)
  - I (Indice): İşaret parmağı → 3. tel
  - M (Medio): Orta parmak → 2. tel
  - A (Anular): Yüzük parmağı → 1. tel
- **Kalıp:** P-I-M-A-M-I (yükselen-alçalan)
- **İpuçları:** Tenis topu tutuşu, 60 BPM başlangıç

#### Ders 5: Hızlı Geçişler - Akdeniz Akşamları
- **Ton:** La minör (Am→G→F→E) veya Em tonunda Em→D→C→B7
- **F Barre:** İşaret parmağı 6 teli 1. perdede kapatır
- **İpuçları:** Parmak kenar kemiği kullanımı, G→F en zor geçiş, 80 BPM başlangıç

---

## 🎵 Practice Mode (Şarkı Pratikleri)

### Şarkı Pratikleri

| # | Şarkı | Sanatçı | Nota | Teknik |
|---|-------|---------|------|--------|
| 6 | Smoke on the Water | Deep Purple | 12 | G telinde 0-3-5 perde, power chord temeli |
| 7 | Seven Nation Army | The White Stripes | 13 | 5. tel (A) üzerinde tek tel riff |
| 8 | Come As You Are | Nirvana | 13 | 5. ve 4. tel geçişleri, grunge riff |

### songData Formatı
Her nota için:
```javascript
{
    note: 'SOL (G3)',    // Görüntülenen nota adı
    s: 3,                // Tel numarası (1-6)
    f: 0,                // Perde numarası (0-19)
    key: '3'             // Basılacak klavye tuşu
}
```

---

## 🔄 Sayfa Davranışları

### Scroll Yönetimi

| Olay | Davranış | Yöntem |
|------|----------|--------|
| Sayfa yüklenme | En üste scroll | `history.scrollRestoration='manual'` + `scrollTo(0,0)` |
| Sayfa yenileme (F5) | En üste scroll | `<head>` script + `load` event |
| Section geçişi | En üste scroll | `showSection()` içinde `scrollTo(0,0)` |
| Ders başlatma | En üste scroll | 4 kademeli (0ms, 50ms, 200ms, 400ms) |
| Nota/Pozisyon | Varsayılan: "--" | Tuşa basınca güncellenir |

### 3 Katmanlı Scroll Engelleme
1. **`<head>` script'i:** Browser body'i parse etmeden önce çalışır
2. **Ana script başlangıcı:** `scrollTo(0,0)` + `scrollTop = 0`
3. **`load` event:** Sayfa tamamen yüklendikten sonra final scroll

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

### Ders Kartı Kategorileri
| Kategori | CSS Class | Renk |
|----------|-----------|------|
| Melodi Çalışması | `.melodi` | Mor |
| Ritim Çalışması | `.ritim` | Turuncu |
| Teknik Alıştırma | `.teknik` | Yeşil |
| Parmak Çalışması | `.parmak` | Mavi |
| Klasik Türk Şarkısı | `.sarki` | Pembe |
| Rock Klasik | `.rock` | Kırmızı |

---

## ⌨️ Klavye Entegrasyonu

### Zone 1 - Primary Grid (Perde 0-3)
```
Açık Tel: 1 2 3 4 5 6   → e1,B,G,D,A,E6 - Perde 0
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

### Özel Tuşlar
- **Space:** Tüm sesleri durdur
- **+/-:** Zone değiştir
- **←/→:** Perde görünümünü kaydır

---

## 🚀 Gelecek Planları

### v0.3 - Ses Geliştirmeleri
- [ ] Gerçek Chorus/Delay ses efektleri
- [ ] Palm Mute ve Hammer-on teknikleri
- [ ] MIDI desteği

### v0.4 - Ders İçerikleri
- [ ] Yeni Türkçe şarkılar ekleme
- [ ] Zorluk seviyelerine göre sıralama
- [ ] Ders tamamlama ve puan sistemi
- [ ] Yıldız bazlı değerlendirme

### v0.5 - Sosyal Özellikler
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
**Canlı Demo:** https://frzerxz.github.io/Melovia/  
**Geliştirici:** frzerxz

---

*Son güncelleme: 10 Şubat 2026 - v0.2*
