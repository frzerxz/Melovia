# 🎸 Melovia Projesi - Kapsamlı Teknik Dokümantasyon

Bu doküman, Melovia projesindeki tüm kavramları, teknolojileri ve yapıları **hiç bilmeyen birine anlatır gibi** açıklamaktadır.

---

## 📚 İÇİNDEKİLER

1. [Proje Nedir?](#proje-nedir)
2. [Temel Kavramlar](#temel-kavramlar)
3. [Ses Motoru (Audio Engine)](#ses-motoru-audio-engine)
4. [Efekt Sistemi](#efekt-sistemi)
5. [Gitar Modülü](#gitar-modülü)
6. [Piyano Modülü](#piyano-modülü)
7. [Ders Sistemi](#ders-sistemi)
8. [Kullanıcı Arayüzü (UI)](#kullanıcı-arayüzü-ui)
9. [Klavye Haritalama](#klavye-haritalama)
10. [Dosya Yapısı](#dosya-yapısı)

---

## 🎯 Proje Nedir?

**Melovia**, bilgisayar klavyesi kullanarak sanal gitar ve piyano çalmayı öğreten bir web uygulamasıdır.

### Ne Yapar?
- Klavye tuşlarına bastığınızda gerçekçi gitar/piyano sesi çıkarır
- İnteraktif derslerle müzik çalmayı öğretir
- Çeşitli ses efektleri uygulayabilirsiniz

### Nasıl Çalışır?
Tarayıcınızda açarsınız, hiçbir şey yüklemenize gerek yok. Tuşlara basarsınız, ses çıkar.

---

## 📖 Temel Kavramlar

### Frekans (Hz - Hertz)
Ses dalgalarının saniyede kaç kez titreştiğini gösterir.
- **Düşük frekans** = Kalın ses (bas gitar sesi gibi)
- **Yüksek frekans** = İnce ses (kuş cıvıltısı gibi)

**Örnek:**
- La notası (A4) = 440 Hz (saniyede 440 titreşim)
- Do notası (C4) = 261.63 Hz

### Nota
Müzikte belirli bir frekanstaki sese verilen isim.
```
Do  Re  Mi  Fa  Sol  La  Si  Do
C   D   E   F   G    A   B   C
```

### Oktav
Aynı notanın farklı kalınlık/incelik seviyeleri.
- C3 = Kalın Do
- C4 = Orta Do (genelde piyano ortası)
- C5 = İnce Do

Bir üst oktav = Frekansın 2 katı

### Perde (Fret)
Gitarın sapındaki metal çubuklar. Her perde sesi yarım ton yükseltir.
- 0. perde = Açık tel (hiçbir yere basmadan)
- 12. perde = Bir oktav yukarı

### Tel (String)
Gitarda 6 tel vardır:
```
Tel 1 (en ince): E4 - Mi
Tel 2: B3 - Si
Tel 3: G3 - Sol
Tel 4: D3 - Re
Tel 5: A2 - La
Tel 6 (en kalın): E2 - Mi
```

### Akor (Chord)
Birden fazla notanın aynı anda çalınması.
- **C Major (Do Majör):** Do-Mi-Sol notaları birlikte
- **Am (La minör):** La-Do-Mi notaları birlikte

---

## 🔊 Ses Motoru (Audio Engine)

Ses motoru, bilgisayarın hoparlöründen ses çıkarmasını sağlayan yazılım parçasıdır.

### Web Audio API Nedir?
Tarayıcıların içinde gelen, JavaScript ile ses üretmemizi sağlayan araç kutusu.

**Basit Analoji:** 
- Web Audio API = Mutfak
- Bizim kodumuz = Tarif
- Ses = Yemek

### AudioContext
Ses işlemlerinin yapıldığı "çalışma alanı". Her şey burada başlar.

```javascript
const audioContext = new AudioContext();
```

### Karplus-Strong Algoritması
Gerçekçi gitar sesi üretmek için kullanılan matematiksel yöntem.

**Nasıl Çalışır?**
1. Rastgele gürültü oluştur (tele vurma simülasyonu)
2. Bu gürültüyü sürekli tekrarla (telin titreşmesi)
3. Her tekrarda sesi biraz azalt (sesin sönmesi)
4. Yanyana örneklerin ortalamasını al (düzgünleştirme)

**Gerçek Hayat Karşılığı:**
Bir tele vurunca:
- Önce sert bir ses çıkar (attack)
- Sonra tel titreşmeye devam eder
- Yavaşça ses kaybolur (decay)

### Buffer
Ses verilerinin saklandığı hafıza alanı. Saniyede binlerce sayı içerir.
- 44100 Hz sample rate = Saniyede 44100 sayı

### Gain Node
Ses seviyesini kontrol eden düğme.
- `gain.value = 1.0` → Normal ses
- `gain.value = 0.5` → Yarı ses
- `gain.value = 0` → Sessiz

### Filter (Filtre)
Belirli frekansları kesen veya yükselten araç.

**Türleri:**
| Filtre Tipi | Ne Yapar? | Kullanım Alanı |
|-------------|-----------|----------------|
| **Lowpass** | Yüksek frekansları keser | Sesi boğuklaştırma |
| **Highpass** | Düşük frekansları keser | Bass'ı azaltma |
| **Bandpass** | Sadece belirli aralığı geçirir | Telefon sesi efekti |
| **Lowshelf** | Düşük frekansları yükseltir/azaltır | Bass boost |
| **Highshelf** | Yüksek frekansları yükseltir/azaltır | Parlaklık ekleme |
| **Peaking** | Belirli frekansı yükseltir/azaltır | Mid boost |

### Oscillator
Sürekli ses dalgası üreten kaynak.

**Dalga Tipleri:**
- **Sine (Sinüs):** Saf, yumuşak ses
- **Sawtooth (Testere):** Keskin, harmoniklerle dolu
- **Square (Kare):** Elektronik, dijital ses
- **Triangle (Üçgen):** Sine ile square arası

---

## 🎛️ Efekt Sistemi

Efektler, orijinal sesi değiştirerek farklı karakterler kazandırır.

### Efekt Zinciri
Ses sırayla efektlerden geçer:
```
Kaynak → Distortion → Compressor → [Dry + Reverb] → Master → Hoparlör
```

### Distortion (Bozulma)
Sinyali aşırı güçlendirerek "kırpar". Rock/metal gitarların sert sesi.

**Nasıl Çalışır?**
Normal sinyal: -1 ile +1 arasında dalgalanır
Distortion: Sinyali yükseltir, sınırları aşan kısımlar kesilir

```
Normal:    ~~~∿~~~
Distorted: ‾‾‾▔▔▔‾‾‾
```

**Waveshaper:** Sinyali matematiksel formülle bozan araç.

### Compressor (Sıkıştırıcı)
Yüksek sesleri alçaltır, alçak sesleri yükseltir. Sonuç: Daha dengeli ses.

**Parametreler:**
- **Threshold:** Bu seviyenin üstündeki sesler sıkıştırılır
- **Ratio:** Ne kadar sıkıştırılacağı (6:1 = 6 dB yükselişi 1 dB'e düşürür)
- **Attack:** Sıkıştırmanın ne kadar hızlı başlayacağı
- **Release:** Sıkıştırmanın ne kadar hızlı biteceği
- **Knee:** Geçişin ne kadar yumuşak olacağı

### Reverb (Yankı)
Sesin bir odada yankılanmasını simüle eder.

**Convolution Reverb:** Gerçek bir odanın akustik parmak izini kullanır.

**Impulse Response:** Odanın ses karakterini temsil eden kısa ses kaydı.

**Parametreler:**
- **Duration:** Yankının ne kadar süreceği
- **Decay:** Ne kadar hızlı söneceği
- **Mix:** Orijinal sesle ne kadar karışacağı

### Chorus
Sesin kopyasını alıp hafifçe frekansını değiştirerek karıştırır.

**Sonuç:** Daha geniş, zengin ses. Sanki birden fazla enstrüman çalıyormuş gibi.

**LFO (Low Frequency Oscillator):** Çok yavaş salınan dalga. Chorus efektinin "hareket"ini sağlar.

**Parametreler:**
- **Rate:** LFO hızı (Hz)
- **Depth:** Frekans kaymasının miktarı
- **Mix:** Efektli sesin oranı

### Delay (Gecikme/Eko)
Sesi belirli bir süre sonra tekrar çalar.

**Parametreler:**
- **Time:** Tekrarlar arası süre (ms veya saniye)
- **Feedback:** Tekrarların kendini beslemesi (dikkat: %100 = sonsuz eko!)
- **Mix:** Ekolu sesin seviyesi

### EQ (Equalizer)
Farklı frekans bölgelerini ayrı ayrı ayarlama.

**3-Band EQ:**
- **Low (Bass):** 320 Hz altı - Kalın sesler
- **Mid:** 1000 Hz civarı - Vokal, gitar gövdesi
- **High (Treble):** 3200 Hz üstü - Parlaklık

**dB (Desibel):** Ses seviyesi birimi. Her 3 dB = 2 kat güç.

---

## 🎸 Amplifikatör (Amp) Presets

Gerçek hayatta elektro gitar bir amplifikatöre bağlanır. Amp sadece sesi yükseltmez, karakter de verir.

### Preset'ler

| Preset | Distortion | Karakter | Müzik Türü |
|--------|------------|----------|------------|
| **Clean** | 0% | Saf, temiz | Jazz, Pop |
| **Crunch** | 30% | Hafif kırık | Blues, Classic Rock |
| **High Gain** | 70% | Ağır bozulma | Hard Rock, Metal |
| **Acoustic** | 0% | Sıcak, ahşap | Folk, Akustik |
| **Jazz** | 5% | Yumuşak, yuvarlak | Jazz |
| **Metal** | 85% | Maksimum sertlik | Heavy Metal |

---

## 🎸 Gitar Modülü

### Akort (Tuning)
Tellerin hangi notalara ayarlandığı.

**Standart Akort:**
```
Tel 1: E4 (329.63 Hz)
Tel 2: B3 (246.94 Hz)
Tel 3: G3 (196.00 Hz)
Tel 4: D3 (146.83 Hz)
Tel 5: A2 (110.00 Hz)
Tel 6: E2 (82.41 Hz)
```

**Alternatif Akortlar:**
| İsim | Teller | Kullanım |
|------|--------|----------|
| **Drop D** | E-A-D-G-B-D | Metal, ağır riff'ler |
| **Open G** | D-G-D-G-B-D | Blues, slide gitar |
| **DADGAD** | D-A-D-G-A-D | Celtic müzik |

### Capo
Gitarın sapına takılan kelepçe. Tüm telleri aynı perdede bastırarak tonu yükseltir.

### Perde Hesaplama
```
Yeni Frekans = Açık Tel Frekansı × 2^(perde/12)
```

Örnek: A2 teli (110 Hz), 5. perde:
```
110 × 2^(5/12) = 110 × 1.335 = 146.83 Hz = D3
```

### Inlay (Perde İşaretleri)
Gitarın sapındaki konum göstergeleri.
- Tek nokta: 3, 5, 7, 9, 15, 17, 19. perdeler
- Çift nokta: 12. perde (bir oktav)

### Strum (Tarama)
Tüm telleri sırayla hızlıca çalmak.
- **Down strum:** Kalın telden inceye doğru
- **Up strum:** İnce telden kalına doğru

---

## 🎹 Piyano Modülü

### Harmonikler
Bir nota çaldığınızda sadece o frekans değil, katları da duyulur:
- Temel frekans (1x) = En güçlü
- 2. harmonik (2x) = Yarı güçte
- 3. harmonik (3x) = Çeyrek güçte
- ...devam eder

**Neden Önemli?** Her enstrümanın karakterini verir.

### Piyano Sesi Oluşturma
```javascript
harmonikler = [
    { oran: 1, güç: 1.0 },   // Temel
    { oran: 2, güç: 0.6 },   // 2. harmonik
    { oran: 3, güç: 0.4 },   // 3. harmonik
    ...
]
```

Her harmonik için ayrı sinüs dalgası oluşturulup karıştırılır.

---

## 📚 Ders Sistemi

### Ders Yapısı
Her ders şunları içerir:
- **Başlık:** Dersin adı
- **Sanatçı:** Örnek şarkı/parça
- **Akorlar:** Gerekli akorlar
- **Adımlar:** Sırayla basılacak notalar
- **İpuçları:** Yardımcı bilgiler

### HUD (Heads-Up Display)
Ders sırasında ekranda görünen bilgi paneli:
- İlerleme çubuğu
- Aktif nota
- Basılacak tuş
- Şarkı bilgisi

### Timeline (Zaman Çizelgesi)
Notaların sırayla kaydığı görsel şerit. Hedef çizgiye gelince basmanız gerekir.

### Skor Sistemi
- Doğru nota = Puan kazanma
- Yanlış nota = Puan kaybı
- Combo: Arka arkaya doğru basışlar bonus verir

---

## 🖥️ Kullanıcı Arayüzü (UI)

### CSS Değişkenleri
Renk ve değerleri tek yerden yönetmek için:
```css
:root {
    --bg: #0c0c12;        /* Arkaplan */
    --panel: #13131a;     /* Panel rengi */
    --accent: #8b5cf6;    /* Vurgu (mor) */
    --cyan: #06b6d4;      /* Cyan */
    --pink: #ec4899;      /* Pembe */
    --text: #e0e0e8;      /* Metin */
}
```

### Animasyonlar

**Keyframes:** CSS animasyonunun aşamalarını tanımlar.
```css
@keyframes vibrate {
    0%, 100% { transform: translateY(-50%) }
    50% { transform: translateY(calc(-50% + 2px)) }
}
```

### Flexbox ve Grid
Sayfa düzeni için kullanılan CSS sistemleri.

**Flexbox:** Tek boyutlu düzenleme (satır VEYA sütun)
**Grid:** İki boyutlu düzenleme (satır VE sütun)

### Responsive Tasarım
Ekran boyutuna göre değişen düzen.
```css
@media (max-width: 600px) {
    .grid { grid-template-columns: 1fr; }
}
```

---

## ⌨️ Klavye Haritalama

### Zone Sistemi
Klavye 6x4 matris olarak düşünülür (6 tel × 4 perde).

**Zone 1 (Perde 0-3):**
```
1  2  3  4  5  6   → Tel 6, 5, 4, 3, 2, 1 - Perde 0
Q  W  E  R  T  Y   → Perde 1
A  S  D  F  G  H   → Perde 2
Z  X  C  V  B  N   → Perde 3
```

**Zone 2 (Perde 4-7):**
```
7  8  9  0  *  -   → Perde 4
U  I  O  P  Ğ  Ü   → Perde 5
J  K  L  Ş  İ  ,   → Perde 6
M  Ö  Ç  .  -  "   → Perde 7
```

### Özel Tuşlar
- **Space:** Tüm sesleri durdur
- **+/-:** Zone değiştir
- **←/→:** Perde görünümünü kaydır

---

## 📁 Dosya Yapısı

```
Melovia/
├── index.html          # Ana sayfa (HTML + inline CSS + JS)
├── README.md           # Proje açıklaması
├── DOCUMENTATION.md    # Bu dosya
│
├── js/
│   ├── audioEngine.js  # Ses motoru
│   ├── guitarModule.js # Gitar mantığı
│   ├── noteMapping.js  # Nota-frekans dönüşümü
│   ├── lessonsModule.js# Ders sistemi
│   └── pianoModule.js  # Piyano mantığı
│
├── css/
│   ├── styles.css      # Genel stiller
│   ├── guitar.css      # Gitar UI stilleri
│   └── lessons.css     # Ders UI stilleri
│
└── docs/
    └── ...             # Ek dokümanlar
```

---

## 🔧 Teknik Terimler Sözlüğü

| Terim | Açıklama |
|-------|----------|
| **API** | Application Programming Interface - Yazılımların birbirleriyle konuşmasını sağlayan arayüz |
| **Buffer** | Verilerin geçici olarak tutulduğu hafıza alanı |
| **Callback** | Bir işlem bitince çağrılacak fonksiyon |
| **DOM** | Document Object Model - HTML'i JavaScript'ten kontrol etme yöntemi |
| **Event** | Kullanıcı etkileşimi (tıklama, tuşa basma vb.) |
| **Frequency** | Ses dalgasının saniyedeki titreşim sayısı (Hz) |
| **Gain** | Ses seviyesi çarpanı |
| **Latency** | Gecikme süresi (tuşa basma → ses çıkması arası) |
| **Node** | Web Audio API'de ses işleme birimi |
| **Oscillator** | Ses dalgası üreten kaynak |
| **Sample Rate** | Saniyede alınan ses örnekleri (genelde 44100 Hz) |
| **Synthesis** | Sesın matematiksel olarak üretilmesi |

---

## 🎓 Öğrenme Kaynakları

### Web Audio API
- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

### Müzik Teorisi
- Nota isimleri ve frekansları
- Akor yapıları
- Skala sistemi

### JavaScript
- ES6+ özellikleri (class, arrow functions, async/await)
- DOM manipülasyonu
- Event handling

---

*Bu doküman Melovia projesi için hazırlanmıştır. Herhangi bir sorunuz varsa kodu inceleyebilirsiniz.*
