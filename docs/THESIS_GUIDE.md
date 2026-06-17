# Melovia — Bitirme Tezi Yazım Rehberi

**Proje:** Melovia — Dijital Müzik Eğitim Platformu  
**Öğrenci:** Firuze Eroğlu  
**Kurum:** Balıkesir Üniversitesi Mühendislik Fakültesi  
**Son güncelleme:** Haziran 2026

> ⚠️ **Önce resmi kılavuzu alın.** Sayfa sayısı, kapak ve format **bölümünüzün güncel “Bitirme Projesi / Tez Yazım Kılavuzu”** dosyasına göre değişir. Danışmanınız (Doç. Dr. Hüseyin Güneş) ve bölüm sekreterliği esas alınır.

---

## 1. Tez mi, bitirme projesi mi?

Birçok üniversitede **aynı iş farklı adla** anılır:

| Kavram | Anlam |
|--------|--------|
| **Bitirme projesi** | Lisans sonu tasarım/uygulama çalışması, rapor + sunum |
| **Bitirme tezi** | Aynı çalışmanın akademik formatta yazılmış hali |

Sizin bölümde “tez” istenmesi, genelde **daha formal rapor + literatür + test bölümü** beklentisi demektir. Melovia zaten uygulama ağırlıklı bir proje; tez metninde **“ne yaptık, neden, nasıl, sonuç”** akademik dilde anlatılır.

---

## 2. Sayfa sayısı — 90–100 sayfa gerçek mi?

**Tek ulusal standart yok.** Kaynaklara göre tipik aralıklar:

| Kaynak / durum | Önerilen aralık |
|----------------|-----------------|
| Genel lisans tez pratiği | **40–60 sayfa** (metin gövdesi) |
| Bazı danışmanlar / bölümler | **70–100+ sayfa** (geniş literatür, çok ekran görüntüsü, ekler) |
| KTÜ Yazılım Müh. örneği | Yazılım yaşam döngüsü bölümleri + test dokümanları (sayfa üst sınırı kılavuzda net değil) |

**Arkadaşlarının 90–100 sayfası** genelde şunlardan gelir:

- Uzun **literatür taraması** (15–25 sayfa)
- **Ekler**: kaynak kod listeleri, ekran görüntüleri, tablolar, poster
- **Tekrarlayan şablon metinler** (SDLC, test planı şablonu)
- Danışmanın **“detaylı olsun”** beklentisi

**Sizin için gerçekçi hedef:**

| Senaryo | Sayfa (tahmini) |
|---------|-----------------|
| Minimum kabul edilebilir (sıkı, net) | **45–55** |
| Dengeli (önerilen) | **55–75** |
| Danışman “çok detaylı” istiyorsa | **75–95** (ekler dahil) |

**Asıl kural:** Bölüm kılavuzu + danışman onayı. 90 sayfa **şart değil**; boş dolgu kötü not alır. **Kaliteli 60 sayfa**, tekrarlı 100 sayfadan iyidir.

---

## 3. Resmi format — mutlaka kontrol edin

Balıkesir Üniversitesi için:

1. **Bilgisayar Mühendisliği Bölümü** web sitesi / öğrenci işleri  
2. **Mühendislik Fakültesi bitirme projesi esasları** (PDF)  
3. Danışmanınızdan **Word şablonu** (iç/dış kapak, onay sayfası)

Genelde istenen teknik kurallar:

- **A4**, tek taraf baskı (bölüme göre çift taraf olabilir)
- Kenar boşlukları: sol 3.5 cm, sağ 2 cm, üst/alt 2.5 cm (örnek — kılavuza bakın)
- **Yazı:** Times New Roman 12 pt, 1.5 satır aralığı
- **Ön sayfalar:** Romen rakamı (i, ii, iii…)
- **Metin:** Arap rakamı (1, 2, 3…), 1. bölümden başlar
- **Kaynakça:** IEEE veya APA (bölüm hangisini istiyorsa)
- **Şekil/tablo:** Numaralı, kaynaklı, “Şekil 3.1: …” formatı

---

## 4. Önerilen tez iskeleti (Melovia için)

Aşağıdaki yapı **bilgisayar mühendisliği bitirme tezi** mantığına uygundur; başlık numaralarını bölüm kılavuzunuza göre uyarlayın.

### Ön bölümler (sayfa numarası yok / Romen)

1. Dış kapak  
2. İç kapak  
3. Onay sayfası  
4. Özet (Türkçe, ~150–250 kelime) + anahtar kelimeler  
5. Abstract (İngilizce) + keywords  
6. Teşekkür (opsiyonel)  
7. İçindekiler  
8. Şekiller listesi  
9. Tablolar listesi  
10. Kısaltmalar (Web Audio API, UE5, BPM vb.)

### 1. GİRİŞ (8–12 sayfa)

- Problem tanımı: Dijital müzik eğitiminde klavye–enstrüman eşlemesi eksikliği  
- Amaç ve kapsam: Melovia ne sunuyor, ne sunmuyor  
- Projenin özgün değeri: Pair Zone, nota mapping, çok enstrüman, loop, akor–klavye entegrasyonu  
- Varsayımlar ve kısıtlar: Web tabanlı, tarayıcı, klasik gitar önceliği  
- Tezin organizasyonu: “2. bölümde literatür…”  

### 2. LİTERATÜR TARAMASI (12–18 sayfa)

Karşılaştırmalı tablo önerisi:

| Platform | Tür | Güçlü yan | Melovia farkı |
|----------|-----|-----------|---------------|
| GarageBand | DAW / prodüksiyon | Kayıt, loop | Öğrenme + mapping yok |
| FL Studio | DAW | Prodüksiyon | Gitar pedagojisi değil |
| Guitario | Mobil öğrenme | AI ses puanlama, şarkı kütüphanesi | Mikrofon tabanlı; klavye–perde simülasyonu yok |
| Yousician / Simply Guitar | Gamification | Geniş kütüphane | Web simülasyon + akademik proje |

Alt başlıklar:

- Müzik eğitim teknolojileri (M-Learning, gamification)  
- Gitar öğretim yazılımları  
- Web Audio API ve tarayıcı tabanlı sentez  
- (Kısa) UE5 / 3D prototip denemesi — **ana ürün değil, ek/ gelecek çalışma**

### 3. MATERYAL VE YÖNTEM (10–15 sayfa)

- Gereksinim analizi (fonksiyonel / fonksiyonel olmayan)  
- Kullanılan teknolojiler: HTML/CSS/JS, Web Audio API, Karplus-Strong  
- Sistem mimarisi (modül diyagramı)  
- Geliştirme yöntemi: iteratif, GitHub, GitHub Pages  
- Nota eşleme (noteMapping) ve Pair Zone tasarım kararları  

### 4. SİSTEM TASARIMI VE UYGULAMA (18–28 sayfa)

Alt bölümler (Melovia modülleriyle eşle):

4.1. Ses motoru (`audioEngine.js`)  
4.2. Klavye–perde haritalama (`noteMapping.js`, Pair Zone)  
4.3. Gitar modülü — klasik gitar odaklı özellikler  
4.4. Tablature oynatıcı, loop, hız ayarı  
4.5. Akor sistemi — diyagram, otomatik susturma, sol el / sağ el strum  
4.6. Ders ve practice modları  
4.7. Piyano modülü (kısa)  
4.8. Kullanıcı arayüzü  

Her alt bölümde: **Amaç → Tasarım → Ekran görüntüsü → Kısa kod/snippet (ekte tam hali)**

### 5. TEST VE DEĞERLENDİRME (8–12 sayfa)

- Test stratejisi (birim / kullanılabilirlik)  
- Senaryo tablosu: ders tamamlama, akor çalma, loop, tab hızı  
- Performans: ses gecikmesi, tarayıcı uyumluluğu (Chrome, Edge, Firefox)  
- Sınırlılıklar: mikrofon geri bildirimi yok, mobil optimizasyon eksik  
- (Varsa) 3–5 kişilik kısa kullanıcı geri bildirimi — poster sunumundan alıntı  

### 6. SONUÇ VE ÖNERİLER (3–5 sayfa)

- Hedeflere ne ölçüde ulaşıldı  
- Bilimsel/teknik katkı  
- Gelecek çalışmalar: mobil, AI geri bildirim, teknokent / ticarileşme (isteğe bağlı kısa)

### KAYNAKLAR

- En az **20–30 akademik ve teknik kaynak** (IEEE, ACM, müzik pedagojisi, Web Audio dokümantasyonu)

### EKLER

- Ek A: Kaynak kod yapısı  
- Ek B: Tam şarkı/tablature veri örnekleri  
- Ek C: Ekran görüntüleri  
- Ek D: Poster sunumu  
- Ek E: (Opsiyonel) UE5 prototip notları  

---

## 5. Yazım ipuçları

1. **“Biz yaptık”** değil **“Geliştirilen sistem …”** (pasif/nesnel akademik dil)  
2. Her iddia için **kaynak veya kendi testiniz**  
3. Ekran görüntüsü = **Şekil**; mutlaka metinde referans verin  
4. Kodu teze **tom tom yapıştırmayın**; akış pseudocode veya 10–15 satırlık örnek  
5. Özet ve sonuç **birbirini tekrar etmesin**  
6. Jüri/poster geri bildirimlerini **“Geliştirme önerileri”** veya test bölümüne yansıtın (loop, akor, rakip analizi)

---

## 6. Melovia için zaman planı (bitirime ~2–3 ay)

| Hafta | İş |
|-------|-----|
| 1 | Bölüm kılavuzu + şablon; 1. Giriş taslağı |
| 2 | Literatür taraması + karşılaştırma tablosu |
| 3 | Materyal-yöntem + mimari diyagramlar |
| 4–5 | Uygulama bölümü (modül modül) |
| 6 | Test bölümü + ekran görüntüleri |
| 7 | Sonuç, kaynakça, özet/abstract |
| 8 | Danışman revizyonu, format, cilt |

---

## 7. Projeyle eşleşen “özgünlük” cümlesi (özet için taslak)

> Melovia, bilgisayar klavyesini gitar perdesine eşleyen Pair Zone mimarisi ile web tabanlı çok enstrümanlı müzik eğitimi sunan bir platformdur. Gitar öğrenme uygulamalarının aksine mikrofon tabanlı puanlama yerine klavye–fretboard–tablature bütünleşik simülasyonu hedefler; bölüm tekrarı (loop), tab hız ayarı ve akor çalımında otomatik tel susturma ile pedagojik pratik akışını destekler.

---

## 8. Faydalı linkler

- Canlı demo: https://frzerxz.github.io/Melovia/  
- Teknik dokümantasyon: [DOCUMENTATION.md](../DOCUMENTATION.md)  
- Proje raporu: [PROJECT_REPORT.md](./PROJECT_REPORT.md)  
- Balıkesir Üniv. bölüm sayfası: danışmanınızdan güncel bitirme tezi PDF’i isteyin  

---

*Bu rehber genel akademik pratik ve Melovia projesine özel taslaktır; resmi bölüm kılavuzunun yerini tutmaz.*
