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
8. [Practice Mode (Şarkı Pratikleri)](#practice-mode-şarkı-pratikleri)
9. [Tamamlama Overlay](#tamamlama-overlay)
10. [Sayfa Davranışları](#sayfa-davranışları)
11. [Kullanıcı Arayüzü (UI)](#kullanıcı-arayüzü-ui)
12. [Klavye Haritalama](#klavye-haritalama)
13. [Dosya Yapısı](#dosya-yapısı)
14. [Unreal Engine 5 Entegrasyonu](#unreal-engine-5-entegrasyonu)

---

## 🎯 Proje Nedir?

**Melovia**, bilgisayar klavyesi kullanarak sanal gitar ve piyano çalmayı öğreten bir web uygulamasıdır. Ayrıca **Unreal Engine 5** C++ altyapısı ile 3D görselleştirme ve VR entegrasyonu için temel oluşturulmuştur.

### Ne Yapar?
- Klavye tuşlarına bastığınızda gerçekçi gitar/piyano sesi çıkarır
- **8 interaktif dersle** müzik çalmayı öğretir (5 temel ders + 3 şarkı pratiği)
- Çeşitli ses efektleri uygulayabilirsiniz (distortion, reverb, chorus, delay, EQ)
- Fretboard (perde tahtası) üzerinde notaları görsel olarak takip edebilirsiniz
- Tablature (nota yazısı) ile şarkıları okuyabilirsiniz
- Backing track eşliğinde pratik yapabilirsiniz

### Nasıl Çalışır?
Tarayıcınızda açarsınız, hiçbir şey yüklemenize gerek yok. Tuşlara basarsınız, ses çıkar. Dersler bölümünden bir ders seçersiniz, ekranda hangi tuşa basmanız gerektiği gösterilir.

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

### Power Chord
Sadece kök nota ve 5. derece kullanılarak oluşturulan akor. Rock ve metal müzikte çok yaygın.
- **E5:** E + B (6. tel açık + 5. tel 2. perde)
- **A5:** A + E (5. tel açık + 4. tel 2. perde)

### Barre (Bareli) Akor
İşaret parmağının tüm telleri tek bir perdede kapatarak oluşturduğu akor şekli. F akoru en bilinen barre akordur.

### Arpej
Bir akorun notalarını aynı anda değil, sırayla tek tek çalma tekniği. Klasik gitar müziğinde çok kullanılır.

### Palm Mute
Sağ elin avuç içi kenarının köprü (bridge) üzerine yerleştirilerek tellerin titreşiminin kısılması tekniği. Rock müzikte "chug" sesi elde etmek için kullanılır.

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

### Delay (Gecikme/Eko)
Sesi belirli bir süre sonra tekrar çalar.

### EQ (Equalizer)
Farklı frekans bölgelerini ayrı ayrı ayarlama.

**3-Band EQ:**
- **Low (Bass):** 320 Hz altı - Kalın sesler
- **Mid:** 1000 Hz civarı - Vokal, gitar gövdesi
- **High (Treble):** 3200 Hz üstü - Parlaklık

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

Melovia'nın ders sistemi, kullanıcıları sıfırdan gitar çalmayı öğretmek için tasarlanmıştır. İki ana bölümden oluşur: **Temel Dersler** ve **Şarkı Pratikleri**.

### Ders Yapısı
Her ders bir `lessonsData` nesnesi içinde tanımlanır ve şunları içerir:
- **title:** Dersin adı (örn: "Ders 1: İlk Melodim")
- **artist:** Örnek şarkı ve sanatçı bilgisi
- **desc:** Dersin kapsamlı açıklaması (şarkının tarihi, tonu, kullanılan teller, teknik bilgi)
- **chords:** Gerekli akorlar ve parmak pozisyonları
- **tips:** Pratik ipuçları ve BPM önerileri
- **songData:** İnteraktif nota dizisi (her nota için tel, perde, tuş ve nota adı bilgisi)

### songData Yapısı
`songData`, dersin interaktif kısmını oluşturan nota dizisidir. Her eleman şunları içerir:
```javascript
{
    note: 'LA (A2)',  // Ekranda gösterilen nota adı
    s: 5,             // Tel numarası (1=en ince, 6=en kalın)
    f: 0,             // Perde numarası (0=açık tel)
    key: '5'          // Klavyede basılması gereken tuş
}
```

### Temel Dersler (1-5)

| Ders | Şarkı/Konu | Nota Sayısı | Zorluk | Ne Öğretir? |
|------|-----------|-------------|--------|-------------|
| **Ders 1** | Arkadaşım Eşek - Barış Manço (1975) | 40 nota | ★☆☆ | Tek parmak melodi, Em tonu, 4. ve 3. tel |
| **Ders 2** | Hayat Bayram Olsa - Şenay (1972) | 18 nota | ★★☆ | Am-E-Dm akor geçişleri, 4/4 ritim kalıbı |
| **Ders 3** | Palm Mute Tekniği | 20 nota | ★★☆ | E5-A5-D5 power chord, avuç susturma tekniği |
| **Ders 4** | Caddelerde Rüzgar - Nilüfer (1978) | 22 nota | ★★★ | P-I-M-A parmak arpej tekniği |
| **Ders 5** | Akdeniz Akşamları - Haluk Levent (1998) | 28 nota | ★★★ | Am-G-F-E akor döngüsü, F barre akoru |

### HUD (Heads-Up Display)
Ders sırasında ekranın üst kısmında görünen bilgi paneli:
- **Şarkı bilgisi:** Başlık ve sanatçı
- **Aktif nota:** Şu anda basılması gereken nota ve tuşu (büyük, renkli gösterim)
- **Önizleme notaları:** Sonraki 6 nota (küçük, soluk gösterim)
- **İlerleme:** "3 / 40" gibi mevcut adım ve toplam
- **Geri sayım:** 5 saniyelik başlama geri sayımı
- **Kapatma (X):** Dersi sonlandırma butonu

### Ders Başlatma Akışı
1. Kullanıcı "▶ Dersi Başlat" butonuna tıklar
2. `currentLessonId` set edilir
3. `startLesson()` fonksiyonu çağrılır
4. Sayfa "Gitar" bölümüne geçiş yapar (`showSection('guitar')`)
5. `lessonHud` görünür hale gelir ve ders bilgileri yüklenir
6. Sayfa otomatik olarak **en üste scroll** edilir
7. Fretboard üzerinde hedef nota **vurgulanır** (yeşil nokta)
8. Kullanıcı doğru tuşa basınca sonraki nota aktif olur
9. Tüm notalar tamamlanınca ders biter

### Doğru/Yanlış Nota Kontrolü
- Kullanıcı bir tuşa bastığında, basılan tuş hedef nota ile karşılaştırılır
- **Doğru:** Yeşil animasyon, ilerleme +1, sonraki nota aktif
- **Yanlış:** Kırmızı yanıp sönme, ilerleme değişmez

---

## 🎵 Practice Mode (Şarkı Pratikleri)

Practice mode, ders sisteminin ikinci bölümüdür. Ünlü rock riff'lerini adım adım çalmayı öğretir.

### Şarkı Pratikleri (6-8)

| Pratik | Şarkı | Nota Sayısı | Ne Öğretir? |
|--------|-------|-------------|-------------|
| **Pratik 6** | Smoke on the Water - Deep Purple | 12 nota | G telinde 0-3-5 perde kombinasyonu |
| **Pratik 7** | Seven Nation Army - The White Stripes | 13 nota | 5. tel üzerinde tek tel riff |
| **Pratik 8** | Come As You Are - Nirvana | 13 nota | 5. ve 4. tel geçişleri, grunge riff |

### Pratik Kartları
Hem temel dersler hem de şarkı pratikleri "Dersler" sekmesinde kartlar halinde listelenir:
- **📚 Temel Dersler** bölümü: Ders 1-5
- **🎵 Şarkı Pratikleri** bölümü: Pratik 6-8

Her kart şunları gösterir:
- İkon ve başlık
- Sanatçı bilgisi
- Zorluk yıldızları (★☆☆, ★★☆, ★★★)
- Kategori etiketi (Melodi, Ritim, Teknik, Parmak Çalışması, Klasik Türk Şarkısı)
- Kısa açıklama
- Kullanılan akorlar
- "▶ Dersi Başlat" ve "📄 Detay" butonları

---

## 🔄 Sayfa Davranışları

### Scroll Sıfırlama (Page Load Reset)
Sayfa yenilendiğinde (F5 / Ctrl+R) her şey sıfırlanır:

1. **`<head>` script'i:** Browser body'i parse etmeden önce `history.scrollRestoration = 'manual'` çalışır. Bu, browser'ın eski scroll pozisyonunu hatırlamasını engeller.
2. **Ana script başlangıcı:** Değişkenler tanımlanırken hemen `window.scrollTo(0, 0)` ve `scrollTop = 0` çalışır.
3. **`load` event'i:** Sayfa tamamen yüklendikten sonra son kez `window.scrollTo(0, 0)` çağrılır.
4. **`beforeunload` event'i:** Sayfa kapanmadan/yenilenmeden önce scroll sıfırlanır.

### Nota ve Pozisyon Göstergesi Sıfırlama
Sayfa yüklendiğinde:
- Nota göstergesi: `--` (boş, henüz nota çalınmadı)
- Pozisyon göstergesi: `--` (boş, henüz bir perde seçilmedi)

Kullanıcı bir tuşa bastığında göstergeler güncellenir:
- Nota: `LA (A2) - 110.0 Hz`
- Pozisyon: `Tel 5, Perde 0`

### Section Geçişleri
Gitar, Piyano, Dersler gibi bölümler arasında geçiş yapıldığında:
- İlgili section gösterilir, diğerleri gizlenir
- Navigasyon butonu aktif olarak işaretlenir
- Sayfa otomatik olarak **en üste scroll** edilir

### Ders Başlatma Scroll'u
Bir ders veya pratik başlatıldığında:
- Otomatik olarak "Gitar" bölümüne geçilir
- Sayfa başına scroll edilir (4 kademeli: hemen, 50ms, 200ms, 400ms)
- HUD ve fretboard tam görünür olarak ekranda belirir

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
Klavye 6×4 matris olarak düşünülür (6 tel × 4 perde). Toplam 6 zone bulunur (Zone 1-6), her biri 4 perdeyi kapsar.

**Zone 1 (Perde 0-3) - Primary Grid:**
```
Açık Tel: 1  2  3  4  5  6   → e1(en ince), B, G, D, A, E6(en kalın) - Perde 0
Perde 1:  Q  W  E  R  T  Y
Perde 2:  A  S  D  F  G  H
Perde 3:  <  Z  X  C  V  B
```

**Zone 2 (Perde 4-7) - Vertical Cluster:**
```
Perde 4: 7  8  9  0  *  -
Perde 5: U  I  O  P  Ğ  Ü
Perde 6: J  K  L  Ş  İ  ,
Perde 7: N  M  Ö  Ç  .  "
```

### Pair Sistemi
6 tel, 3 çifte (pair) ayrılır:
- **Pair 1:** Tel 1-2 (ince teller, perde 0-3)
- **Pair 2:** Tel 3-4 (orta teller, perde 6-13)
- **Pair 3:** Tel 5-6 (kalın teller, perde 14-19)

### Özel Tuşlar
- **Space:** Tüm sesleri durdur
- **+/-:** Zone değiştir (aktif perde bölgesi)
- **←/→:** Perde görünümünü kaydır

### Tuş → Nota Eşleşme Örneği
Ders sisteminde her notanın hangi tuşa karşılık geldiği `songData` içinde `key` alanıyla belirtilir:
- `key: '5'` → 5 tuşu → 5. tel açık (LA / A2)
- `key: 'F'` → F tuşu → 4. tel 2. perde (Mİ / E3)
- `key: 'D'` → D tuşu → 3. tel 2. perde (LA / A3)
- `key: 'W'` → W tuşu → 2. tel 1. perde (DO / C4)
- `key: '1'` → 1 tuşu → 1. tel açık (Mİ / E4)

---

## 📁 Dosya Yapısı

```
Melovia/
├── index.html              # Ana sayfa (HTML + inline CSS + JS)
│                            # ~5000+ satır: tüm UI, stiller ve mantık
│
├── js/
│   ├── audioEngine.js      # Ses motoru (Karplus-Strong, efektler)
│   └── noteMapping.js      # Nota-frekans dönüşüm tablosu
│
├── docs/
│   └── PROJECT_REPORT.md   # Proje raporu
│
├── README.md               # Proje genel açıklaması
├── DOCUMENTATION.md        # Bu dosya (kapsamlı teknik dokümantasyon)
└── .gitignore              # Git dışı tutulacak dosyalar
```

### index.html İç Yapısı
Tek dosyada tüm uygulama bulunur:

| Bölüm | Satır Aralığı (yaklaşık) | İçerik |
|-------|--------------------------|--------|
| CSS Stilleri | 1-2670 | Tüm UI stilleri, animasyonlar, responsive kurallar |
| HTML Yapısı | 2670-3430 | Header, fretboard, zone grid, dersler, akorlar, kayıt, efekt paneli |
| JavaScript | 3430-5068 | lessonsData, ses mantığı, ders başlatma, zone grid oluşturma, init |

---

## 🔧 Teknik Terimler Sözlüğü

| Terim | Açıklama |
|-------|----------|
| **API** | Application Programming Interface - Yazılımların birbirleriyle konuşmasını sağlayan arayüz |
| **Arpej** | Bir akorun notalarını sırayla çalma tekniği |
| **Barre** | İşaret parmağının tüm telleri tek perdede kapatması |
| **BPM** | Beats Per Minute - Dakikada vuruş sayısı (tempo birimi) |
| **Buffer** | Verilerin geçici olarak tutulduğu hafıza alanı |
| **Callback** | Bir işlem bitince çağrılacak fonksiyon |
| **DOM** | Document Object Model - HTML'i JavaScript'ten kontrol etme yöntemi |
| **Event** | Kullanıcı etkileşimi (tıklama, tuşa basma vb.) |
| **Frequency** | Ses dalgasının saniyedeki titreşim sayısı (Hz) |
| **Gain** | Ses seviyesi çarpanı |
| **HUD** | Heads-Up Display - Ders sırasında gösterilen bilgi paneli |
| **Latency** | Gecikme süresi (tuşa basma → ses çıkması arası) |
| **Node** | Web Audio API'de ses işleme birimi |
| **Oscillator** | Ses dalgası üreten kaynak |
| **P-I-M-A** | Pulgar-Indice-Medio-Anular: Klasik gitar sağ el parmak tekniği |
| **Palm Mute** | Avuç susturma tekniği (rock/metal müzikte "chug" sesi) |
| **Power Chord** | Kök nota + 5. derece ile oluşturulan basit akor |
| **Sample Rate** | Saniyede alınan ses örnekleri (genelde 44100 Hz) |
| **scrollRestoration** | Browser'ın sayfa yenilendikten sonra eski scroll konumuna dönme davranışı |
| **songData** | Bir dersin interaktif nota dizisini tutan JavaScript dizisi |
| **Synthesis** | Sesin matematiksel olarak üretilmesi |
| **Zone** | Klavye haritalama bölgesi (6 zone × 4 perde = 24 perde kaplama) |

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

*Bu doküman Melovia projesi için hazırlanmıştır. Son güncelleme: 14 Şubat 2026 - v0.1*

---

## 🎮 Tamamlama Overlay

Ders veya pratik tamamlandığında kullanıcıya gösterilen görsel sonuç ekranıdır.

### Önceki Davranış (alert)
Eski versiyonda `alert()` ile basit bir bildirim gösteriliyordu. Kullanıcı OK'a bastığında ders otomatik kapanıyordu.

### Yeni Davranış (Completion Overlay)
- **Animasyonlu modal:** Glassmorphism efektli, ar kapalı overlay
- **İstatistikler:** Doğru/Toplam, %Başarı, Süre (pratikler için)
- **Kullanıcı kontrollü:** Ekran otomatik kapanmaz
  - **↺ Tekrar Çal:** Aynı dersi/pratiği baştan başlatır
  - **✕ Kapat:** HUD'ı kapatır, gitar ekranına döner

### Teknik Detaylar
```javascript
showCompletionOverlay(mode, {
    title: 'Arkadaşım Eşek',  // Şarkı adı
    correct: 40,              // Doğru sayısı
    total: 40,                // Toplam nota
    percent: 100,             // Başarı yüdesi
    time: '2:35'              // Süre (opsiyonel)
});
```
- `completionMode` değişkeni: `'lesson'` veya `'practice'` - hangi modun tamamlandığını takip eder
- `completionReplay()`: Overlay'ı kapatıp aynı dersi yeniden başlatır
- `completionClose()`: Overlay'ı kapatıp normal moda döner

---

## 🎮 Unreal Engine 5 Entegrasyonu

Melovia'nın C++ altyapısı **Unreal Engine 5.7.1** üzerine inşa edilmiştir.

### Neden UE5?
- **3D Görselleştirme:** Gitar ve piyano modellerinin 3D ortamda görüntülenmesi
- **VR Desteği:** OpenXR ile sanal gerçeklik entegrasyonu
- **Yüksek Performans:** C++ ile optimize edilmiş müzik teori hesaplamaları

### C++ Modülleri

#### UniversalNoteCore
12-TET (Eşit Temperli Akort) frekans hesaplama sistemi.
- `GetFrequency(Note, Octave)` - Nota adı ve oktavdan frekans hesaplar
- `GetFrequencyFromMidi(MidiNote)` - MIDI numarasından frekans
- `TransposeFrequency(BaseFreq, Semitones)` - Yarım ton kaydırma
- `GetTurkishNoteName(Note)` - Türkçe nota adı (DO, RE, Mİ...)

#### GuitarModule
6 telli gitar simülasyonu (6 akort tipi, capo 0-12 perde).

#### PianoModule
88 tuşlu piyano simülasyonu (A0-C8, velocity desteği, sustain pedal).

#### ChordLibrary
29 akor veritabanı (Major, Minor, 7th, Maj7, Power Chord).

#### MeloviaGameMode
Tüm modülleri başlatıp yöneten Blueprint-erişilebilir ana oyun modu.

### Derleme Bilgileri
- **Engine:** Unreal Engine 5.7.1
- **BuildSettings:** V6  
- **IncludeOrder:** Unreal5_7
- **Başlatma Süresi:** 0.294 saniye (PIE)
