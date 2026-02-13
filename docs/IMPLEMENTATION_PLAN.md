# 🗺️ Melovia - Unreal Engine Entegrasyon Uygulama Planı

**TÜBİTAK 2209-A Araştırma Projesi**  
**Tarih:** 13 Şubat 2026  
**Durum:** Aktif Geliştirme

---

## 📐 Mimari Genel Bakış

Melovia **iki modüllü hibrit** bir platformdur:

### Modül 1: Web Dijital Pratik Modülü (MEVCUT - HAZIR)
- **Teknoloji:** HTML5 + CSS3 + JavaScript (ES6+)
- **Görev:** Klavye ile nota çalma, ders sistemi, ses motoru
- **Durum:** ✅ Tamamlandı (index.html, ~5000 satır)
- **TÜBİTAK Karşılığı:** H1 (Universal Note Core web versiyonu) + H2 (Dijital Pratik)

### Modül 2: VR Simülasyon Modülü (YENİ - GELİŞTİRİLECEK)
- **Teknoloji:** C++ / Unreal Engine 5 / Blueprint
- **Görev:** 3D gitar sahnesi, VR el takibi, AI analiz
- **Durum:** ❌ Başlanmadı
- **TÜBİTAK Karşılığı:** H3 (VR Prototipi + AI)

### Köprü: Universal Note Core (PAYLAŞILAN VERİ KATMANI)
- **Web tarafı:** JavaScript objeleri olarak mevcut (lessonsData, openStrings, chordLibrary)
- **UE5 tarafı:** C++ struct/class olarak yazılacak (aynı veri, farklı dil)
- **Senkronizasyon:** JSON formatında veri paylaşımı

---

## 🔄 Neden İki Dil Kullanıyoruz?

| Soru | Cevap |
|------|-------|
| Web versiyonunu C++'a çevirmeli miyiz? | **HAYIR.** Web modülü kendi başına çalışan dijital pratik aracıdır. |
| C++ ne için gerekli? | **VR simülasyonu** için. Unreal Engine 5 C++ ile çalışır. |
| İkisi nasıl konuşacak? | **WebSocket** veya **Web Browser Widget** üzerinden JSON mesajları ile. |
| Veri tekrarı olmayacak mı? | Universal Note Core'un verileri (nota tablosu, akor kütüphanesi) her iki tarafta da bulunacak ama **JSON export/import** ile senkronize tutulacak. |

---

## 📋 Aşama Aşama Uygulama Planı

### AŞAMA 1: Universal Note Core - C++ (1 Hafta)
**Hedef:** Nota-frekans, akor, transpozisyon verilerini C++ struct olarak yazmak

**Dosyalar:**
```
Melovia/
└── unreal/
    └── MeloviaUE5/
        └── Source/
            └── MeloviaCore/
                ├── MeloviaCore.Build.cs
                ├── Public/
                │   ├── UniversalNoteCore.h      ← Nota-frekans API
                │   ├── ChordLibrary.h            ← Akor kütüphanesi
                │   ├── InstrumentModule.h         ← Enstrüman base class
                │   ├── GuitarModule.h             ← Gitar modülü
                │   └── PianoModule.h              ← Piyano modülü
                └── Private/
                    ├── UniversalNoteCore.cpp
                    ├── ChordLibrary.cpp
                    ├── GuitarModule.cpp
                    └── PianoModule.cpp
```

**İçerik:**
- `UniversalNoteCore`: Nota isimleri, frekanslar, oktavlar, transpozisyon formülleri
- `ChordLibrary`: 20+ akor tanımı (Major, Minor, 7th, Maj7)
- `GuitarModule`: 6 tel, akort sistemi, capo, perde hesaplama
- `PianoModule`: Tuş-nota eşleşmeleri, harmonikler

**Başarı Ölçütü:** Tüm nota-frekans hesaplamaları <1ms içinde tamamlanmalı

---

### AŞAMA 2: Unreal Engine 5 Proje Kurulumu (1 Hafta)
**Hedef:** UE5 projesi oluşturmak ve temel sahneyi hazırlamak

**Adımlar:**
1. Unreal Engine 5 projesi oluştur (C++ template)
2. MeloviaCore modülünü projeye ekle
3. Web Browser Plugin'i aktifleştir
4. Temel sahne oluştur:
   - 3D gitar modeli (placeholder)
   - Kamera pozisyonu
   - Aydınlatma
5. Web Browser Widget ile mevcut Melovia web arayüzünü göm
6. MeloviaAPI.js üzerinden JS ↔ Blueprint iletişimini test et

**Başarı Ölçütü:** UE5 içinde web arayüzü görünmeli ve nota basıldığında Blueprint'e sinyal gitmeli

---

### AŞAMA 3: 3D Gitar ve Tel Animasyonları (2 Hafta)
**Hedef:** 3D gitar modelini oluşturmak ve tel titreşim animasyonlarını eklemek

**Bileşenler:**
- 3D Gitar mesh (Blender'dan import veya Marketplace)
- 6 ayrı tel mesh (animasyon için ayrı)
- Tel titreşim material/shader
- Perde highlight sistemi
- Nota basıldığında 3D görsel geri bildirim

**Blueprint:**
```
Web'den "OnNotePressed" geldiğinde:
├── Hangi tel? → İlgili tel mesh'ini titret
├── Hangi perde? → Perde pozisyonunu highlight et
├── Ses → UE5 ses motoru veya web ses motoru
└── Particle → Nota efekti (opsiyonel)
```

---

### AŞAMA 4: VR Desteği (2 Hafta)
**Hedef:** VR gözlük ile 3D gitar çalma deneyimi

**Gereksinimler:**
- Meta Quest / HTC Vive desteği
- VR Pawn setup (el kontrolcüleri)
- El-tel etkileşimi (collision detection)
- Perde seçme mekaniği

**TÜBİTAK Hedefi:** H3 - VR Prototipi

---

### AŞAMA 5: AI Analiz Modülü (2 Hafta)
**Hedef:** Kullanıcı performansını analiz eden AI sistemi

**Algoritmalar:**
- **DTW (Dynamic Time Warping):** Ritim doğruluğu analizi
- **RBF (Radial Basis Function):** Teknik hata sınıflandırma

**Hedef Doğruluk:** ≥ %85

---

## 📊 Zaman Çizelgesi (TÜBİTAK Takvimi ile Uyumlu)

```
Şubat 2026:  [████████░░░░░░░░] Aşama 1 + 2 (UNC + UE5 Kurulum)
Mart 2026:   [████████████████] Aşama 3 (3D Gitar + Animasyonlar)
Nisan 2026:  [████████████████] Aşama 4 + 5 (VR + AI)
Mayıs 2026:  [████████░░░░░░░░] Test + Optimizasyon
Haziran:     [████████████████] Pilot Çalışma + Rapor
```

---

## 🔌 Web ↔ UE5 İletişim Protokolü

### Yöntem 1: Web Browser Widget (Basit)
```
UE5 içinde web sayfası gösterilir
JS → window.ue.interface.broadcast() → Blueprint
Blueprint → ExecuteJavascript() → JS
```

### Yöntem 2: WebSocket (Gelişmiş)
```
Web tarayıcı ←→ WebSocket Server ←→ UE5 Client
Avantaj: Bağımsız çalışabilir, düşük latency
```

### Veri Formatı (JSON)
```json
{
    "event": "OnNotePressed",
    "data": {
        "string": 5,
        "fret": 0,
        "note": "LA (A2)",
        "frequency": 110.0,
        "timestamp": 1707840000000
    }
}
```

---

## 📁 Son Dosya Yapısı (Hedef)

```
Melovia/
├── index.html                  # Web Dijital Pratik Modülü
├── js/
│   ├── audioEngine.js          # Web ses motoru
│   └── noteMapping.js          # Nota-frekans tablosu
│
├── unreal/
│   ├── MeloviaAPI.js           # Web ↔ UE5 köprüsü
│   └── MeloviaUE5/             # Unreal Engine 5 Projesi
│       ├── MeloviaUE5.uproject
│       ├── Source/
│       │   └── MeloviaCore/    # Universal Note Core (C++)
│       │       ├── Public/
│       │       │   ├── UniversalNoteCore.h
│       │       │   ├── ChordLibrary.h
│       │       │   ├── GuitarModule.h
│       │       │   └── PianoModule.h
│       │       └── Private/
│       │           ├── UniversalNoteCore.cpp
│       │           ├── ChordLibrary.cpp
│       │           ├── GuitarModule.cpp
│       │           └── PianoModule.cpp
│       ├── Content/
│       │   ├── Melovia/        # Blueprints, Widgets
│       │   ├── Models/         # 3D Gitar modeli
│       │   └── WebFiles/       # Web arayüzünün kopyası
│       └── Config/
│           └── DefaultGame.ini
│
├── docs/
│   ├── PROJECT_REPORT.md
│   ├── IMPLEMENTATION_PLAN.md  # Bu dosya
│   └── UNREAL_INTEGRATION.md
│
├── README.md
├── DOCUMENTATION.md
└── .gitignore
```

---

## ✅ Sonraki Adım

**AŞAMA 1'e başla: Universal Note Core C++ header dosyalarını oluştur.**

Bu, tüm sisteme temel oluşturacak ortak veri katmanıdır.

---

*Son güncelleme: 13 Şubat 2026*
