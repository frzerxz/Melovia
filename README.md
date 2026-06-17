# 🎸 Melovia - Dijital Müzik Eğitim Platformu

**Melovia**, bilgisayar klavyesini enstrüman perdesine eşleyerek gitar ve piyano çalmayı öğreten web tabanlı interaktif bir müzik eğitim platformudur.

🔗 **Canlı Demo:** [https://frzerxz.github.io/Melovia/](https://frzerxz.github.io/Melovia/)  
📋 **TÜBİTAK 2209-A Projesi** | Balıkesir Üniversitesi Mühendislik Fakültesi  
📄 **Bitirme tezi rehberi:** [docs/THESIS_GUIDE.md](docs/THESIS_GUIDE.md)

## ✨ Özellikler (v0.3)

### 🎸 Klasik Gitar (öncelikli geliştirme)
- **Pair Zone klavye eşlemesi:** QWERTY tuşları → tel/perde
- **Akor sistemi:** Diyagram, tel tel görünüm, otomatik susturma (×)
- **Sol el / sağ el:** Perde tuşları sessiz; **Strum** ile ses
- **Tablature oynatıcı:** 8+ şarkı, playhead, scroll senkronu
- **Loop:** Seçili nota aralığını tekrar (ders + practice + tab)
- **Tab hızı:** 0.5× – 1.5× (yavaş pratik)

### 🔊 Ses Motoru
- **Karplus-Strong** gitar sentezi
- 6 amp preset, reverb, chorus, delay, EQ, metronom

### 🎓 Eğitim
- İnteraktif dersler (HUD + timeline)
- Practice mode (fretboard hedefli)
- Tamamlama overlay (istatistik + tekrar)

### 🎹 Diğer
- Piyano modu
- Kayıt & playback, backing track paneli
- Elektro / bas gitar modları (temel; akor entegrasyonu sırada)

## 🚀 Kurulum

```bash
git clone https://github.com/frzerxz/Melovia.git
cd Melovia
npx http-server -p 8080 -c-1
```

Tarayıcı: `http://localhost:8080`

## 🎮 Hızlı kullanım

### Gitar
- **Klasik Gitar** seçili olsun (üst menü)
- Pair Zone tuşları ile tek nota çal
- **Am** → mor tuşları bas → **Strum**
- Tablature: loop + hız → **▶ Çal**

### Kısayollar
- **Space:** Sesi durdur
- **+ / -:** Pair değiştir
- **[ / ]:** Zone kaydır

## 🛠️ Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Ses | Web Audio API, Karplus-Strong |
| Dağıtım | GitHub Pages |
| Veri | `noteMapping.js`, `fullSongData.js`, `guitarModule.js` |
| Deneysel | Unreal Engine 5 (`unreal/` — arşiv prototip) |

## 📁 Proje Yapısı

```
Melovia/
├── index.html              # Ana uygulama (UI + mantık)
├── js/
│   ├── audioEngine.js      # Ses sentezi ve efektler
│   ├── guitarModule.js     # Akor kütüphanesi, akort
│   ├── noteMapping.js      # Nota frekans / Türkçe ad
│   ├── fullSongData.js     # Tam şarkı tab verileri
│   └── lessonsModule.js    # Ders modülü
├── docs/
│   ├── PROJECT_REPORT.md   # Proje raporu
│   └── THESIS_GUIDE.md     # Bitirme tezi yazım rehberi
├── DOCUMENTATION.md        # Teknik dokümantasyon
├── unreal/MeloviaUE5/      # UE5 prototip (aktif geliştirme dışı)
└── README.md
```

## 📚 Dokümantasyon

| Dosya | İçerik |
|-------|--------|
| [DOCUMENTATION.md](DOCUMENTATION.md) | Modül modül teknik açıklama |
| [docs/PROJECT_REPORT.md](docs/PROJECT_REPORT.md) | Proje raporu, sürüm notları |
| [docs/THESIS_GUIDE.md](docs/THESIS_GUIDE.md) | Tez yapısı, sayfa sayısı, Melovia iskeleti |

## 🗺️ Yol Haritası

- [x] Web platform (gitar, piyano, dersler)
- [x] Tablature + loop + tab hızı
- [x] Klasik gitar akor–klavye entegrasyonu
- [x] GitHub Pages dağıtımı
- [ ] Elektro/bas akor entegrasyonu
- [ ] Kullanılabilirlik testi (tez bölümü)
- [ ] Mobil / PWA
- [ ] UE5 arşiv (opsiyonel VR)

---
*Melovia v0.3 | Firuze Eroğlu | Balıkesir Üniversitesi*
