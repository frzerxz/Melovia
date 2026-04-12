# 🎸 Melovia - Dijital Enstrüman Simülatörü

**Melovia**, bilgisayar klavyesi kullanarak gitar ve piyano çalmayı öğreten interaktif bir müzik eğitim platformudur. Web tabanlı arayüz ve **Unreal Engine 5** C++ altyapısı ile profesyonel düzeyde ses sentezi ve 3D görselleştirme sunar.

🔗 **Canlı Demo:** [https://frzerxz.github.io/Melovia/](https://frzerxz.github.io/Melovia/)  
📋 **TÜBİTAK 2209-A Projesi** | Balıkesir Üniversitesi Mühendislik Fakültesi

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
- 88 tuşlu piyano simülasyonu
- Klavye ile çalma desteği
- Velocity (basma şiddeti) desteği
- Sustain pedal fonksiyonu

### 🎓 İnteraktif Dersler & Şarkı Pratikleri
- **5 Temel Ders + 3 Şarkı Pratiği:** Toplam 8 interaktif öğrenme modülü
- **HUD (Heads-Up Display):** Kayan nota şeridi (Timeline) ve anlık geri bildirim
- **Tamamlama Overlay:** Animasyonlu sonuç ekranı - istatistikler, Tekrar Çal / Kapat butonları
- **İlerleme Takibi:** Doğru/Toplam, %Başarı, Süre gösterimi

### 🎨 Modern UI/UX
- **Efekt Kontrol Paneli:** Sağdan kayarak açılan floating panel
- **Görsel Geri Bildirim:** Nota çalındığında dalga efekti animasyonu
- **Glassmorphism Tasarım:** Blur arka plan, gradient renkler, animasyonlar
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

### Web (Frontend)
- **HTML5 / CSS3 / Vanilla JavaScript**
- **Web Audio API:** Gerçek zamanlı ses sentezi
- **Karplus-Strong Algoritması:** Fiziksel modelleme ile gitar sesi

### C++ / Unreal Engine 5.7.1
- **Universal Note Core:** 12-TET frekans hesaplama sistemi
- **GuitarModule:** 6 telli gitar simülasyonu (6 akort tipi, capo desteği)
- **PianoModule:** 88 tuşlu piyano (velocity + sustain pedal)
- **ChordLibrary:** 29 akor veritabanı (Major, Minor, 7th, Maj7, Power Chord)
- **MeloviaGameMode:** Blueprint-erişilebilir oyun modu
- **GuitarActor:** 3D gitar aktörü (6 procedural mesh tel, titreşim animasyonu)
- **MeloviaSceneManager:** Kamera sistemi (5 preset) + 3-point ışıklandırma
- **MeloviaPlayerController:** Klavye girdi yönetimi (13 perde + 6 tel)

## 📁 Proje Yapısı

```
Melovia/
├── index.html              # Ana web uygulaması
├── css/                    # Web stilleri
│   ├── styles.css, guitar.css, lessons.css, piano.css
├── js/                     # Web JavaScript modülleri
│   ├── app.js, audioEngine.js, guitarModule.js
│   ├── lessonsModule.js, noteMapping.js, pianoModule.js
├── docs/                   # Dokümantasyon
│   └── PROJECT_REPORT.md
├── unreal/MeloviaUE5/      # Unreal Engine 5 Projesi
│   ├── MeloviaUE5.uproject
│   ├── Source/
│   │   ├── MeloviaCore/    # C++ Universal Note Core
│   │   │   ├── Public/     # UniversalNoteCore.h, GuitarModule.h, PianoModule.h, ChordLibrary.h
│   │   │   └── Private/    # .cpp implementasyonlar
│   │   └── MeloviaUE5/     # Ana oyun modülü
│   │       ├── MeloviaGameMode.h/.cpp
│   │       ├── GuitarActor.h/.cpp          # 3D gitar aktörü
│   │       ├── MeloviaSceneManager.h/.cpp  # Kamera + ışık
│   │       └── MeloviaPlayerController.h/.cpp  # Girdi
│   └── Config/             # UE5 konfigürasyonları
├── DOCUMENTATION.md        # Kapsamlı teknik dokümantasyon
└── README.md               # Bu dosya
```

## 🗺️ Yol Haritası

- [x] Web uygulaması (Gitar, Piyano, Dersler)
- [x] Ses motoru v4 (Karplus-Strong + Efektler)
- [x] C++ Universal Note Core (UE5)
- [x] UE5 proje entegrasyonu ve derleme
- [x] 3D gitar görselleri (GuitarActor + procedural mesh)
- [x] Kamera ve ışık sistemi (SceneManager)
- [x] Oyuncu girdi sistemi (PlayerController)
- [ ] VR desteği (OpenXR)
- [ ] AI analiz modülü
- [ ] Mobil uyumluluk

---
*TÜBİTAK 2209-A Projesi - Melovia v0.2 | Geliştirici: Firuze Eroğlu | Balıkesir Üniversitesi*
