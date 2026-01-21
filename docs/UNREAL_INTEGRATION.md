# Melovia - Unreal Engine 5 Entegrasyon Rehberi

## 📋 İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Web Browser Widget Kurulumu](#web-browser-widget-kurulumu)
3. [JavaScript ↔ Blueprint İletişimi](#javascript--blueprint-iletişimi)
4. [API Referansı](#api-referansı)
5. [Örnek Kullanımlar](#örnek-kullanımlar)
6. [Sorun Giderme](#sorun-giderme)

---

## 🔧 Gereksinimler

### Unreal Engine
- Unreal Engine 5.0 veya üzeri
- Web Browser Plugin (varsayılan olarak dahil)

### Proje Ayarları
```
Edit → Plugins → Built-in → Web Browser → Enabled ✓
```

### Dosya Yapısı
```
YourProject/
├── Content/
│   └── Melovia/
│       ├── WBP_MeloviaWidget.uasset
│       └── BP_MeloviaController.uasset
└── Source/
    └── WebFiles/
        └── Melovia/
            └── index.html (ve diğer dosyalar)
```

---

## 🌐 Web Browser Widget Kurulumu

### Adım 1: Widget Blueprint Oluşturma

1. Content Browser'da sağ tık → User Interface → Widget Blueprint
2. İsim: `WBP_MeloviaWidget`
3. Açın ve Designer'a geçin

### Adım 2: Web Browser Ekleme

1. Palette'den `Web Browser` arayın
2. Canvas'a sürükleyin
3. Anchors: Stretch (tüm ekranı kaplasın)

### Adım 3: URL Ayarlama

**Yerel Dosya (Paketlenmiş):**
```
file:///$(ProjectDir)/Content/WebFiles/Melovia/index.html
```

**HTTP Sunucusu (Geliştirme):**
```
http://localhost:8080
```

**Online (Yayınlanmış):**
```
https://frzerxz.github.io/Melovia
```

### Blueprint Kodu

```cpp
// Event BeginPlay
void WBP_MeloviaWidget::NativeConstruct()
{
    Super::NativeConstruct();
    
    if (WebBrowser)
    {
        // URL'yi ayarla
        WebBrowser->LoadURL(TEXT("http://localhost:8080"));
        
        // JavaScript bağlantısını etkinleştir
        WebBrowser->BindUObject(TEXT("ue"), this);
    }
}
```

---

## 🔗 JavaScript ↔ Blueprint İletişimi

### JavaScript'ten Unreal'a Mesaj Gönderme

**JavaScript Tarafı:**
```javascript
// MeloviaAPI.js dosyasındaki fonksiyonlar

// Nota basıldığında
function sendNoteToUnreal(stringNum, fret, frequency) {
    if (window.ue && window.ue.interface) {
        window.ue.interface.broadcast('OnNotePressed', JSON.stringify({
            string: stringNum,
            fret: fret,
            frequency: frequency,
            timestamp: Date.now()
        }));
    }
}

// Gitar tipi değiştiğinde
function sendGuitarTypeToUnreal(type) {
    if (window.ue && window.ue.interface) {
        window.ue.interface.broadcast('OnGuitarTypeChanged', type);
    }
}

// Pair değiştiğinde
function sendPairChangeToUnreal(pairNum) {
    if (window.ue && window.ue.interface) {
        window.ue.interface.broadcast('OnPairChanged', pairNum.toString());
    }
}
```

**Blueprint Tarafı:**

1. Widget Blueprint'i açın
2. Web Browser'ı seçin
3. Details'de "On Browser Message" eventini bağlayın

```
Event On Browser Message (String: Message, String: Component)
├── Switch on String (Component)
│   ├── "OnNotePressed" → Parse JSON → Play Sound
│   ├── "OnGuitarTypeChanged" → Update Guitar Model
│   └── "OnPairChanged" → Update Fret Highlight
```

### Unreal'dan JavaScript'e Mesaj Gönderme

**Blueprint Tarafı:**
```cpp
// Web Browser referansı ile
WebBrowser->ExecuteJavascript(TEXT("receiveFromUnreal({action: 'highlight', fret: 5})"));
```

**JavaScript Tarafı:**
```javascript
// index.html'de global fonksiyon tanımla
window.receiveFromUnreal = function(data) {
    console.log('Unreal mesajı:', data);
    
    switch(data.action) {
        case 'highlight':
            highlightFret(data.fret);
            break;
        case 'playNote':
            playNote(data.string, data.fret);
            break;
        case 'loadLesson':
            loadLesson(data.lessonId);
            break;
    }
};

function highlightFret(fretNum) {
    // Fret'i vurgula
    const fretCol = document.querySelector(`[data-f="${fretNum}"]`);
    if (fretCol) {
        fretCol.classList.add('highlighted');
        setTimeout(() => fretCol.classList.remove('highlighted'), 500);
    }
}
```

---

## 📚 API Referansı

### JavaScript → Unreal Events

| Event | Payload | Açıklama |
|-------|---------|----------|
| `OnNotePressed` | `{string, fret, frequency, timestamp}` | Nota çalındığında |
| `OnNoteReleased` | `{string, fret}` | Nota bırakıldığında |
| `OnGuitarTypeChanged` | `"classic" \| "electric" \| "bass"` | Gitar tipi değiştiğinde |
| `OnPairChanged` | `"1" \| "2" \| "3"` | Pair değiştiğinde |
| `OnZoneChanged` | `"1" \| "2"` | Zone değiştiğinde |
| `OnLessonStarted` | `{lessonId, songName}` | Ders başladığında |
| `OnLessonProgress` | `{progress, score}` | Ders ilerlemesinde |
| `OnLessonCompleted` | `{lessonId, score, accuracy}` | Ders tamamlandığında |

### Unreal → JavaScript Functions

| Function | Parameters | Açıklama |
|----------|------------|----------|
| `receiveFromUnreal(data)` | `{action, ...params}` | Ana mesaj alıcı |
| `highlightFret(fret)` | `number` | Fret'i vurgula |
| `highlightString(string)` | `number` | Tel'i vurgula |
| `playNote(string, fret)` | `number, number` | Nota çal |
| `loadLesson(lessonId)` | `string` | Ders yükle |
| `setGuitarType(type)` | `string` | Gitar tipini ayarla |
| `setPair(pair)` | `number` | Pair'i ayarla |

---

## 💡 Örnek Kullanımlar

### 1. 3D Gitar Modeli Senkronizasyonu

**Senaryo:** Kullanıcı web arayüzünde nota çaldığında, 3D gitar modelinde tel titreşim animasyonu oynasın.

**JavaScript:**
```javascript
function playFretCell(cell) {
    const string = parseInt(cell.dataset.s);
    const fret = parseInt(cell.dataset.f);
    const freq = getFrequency(openStrings[6 - string], fret);
    
    // Ses çal
    audioEngine.playNote(freq);
    
    // Unreal'a bildir
    sendNoteToUnreal(string, fret, freq);
}
```

**Blueprint:**
```
OnNotePressed Event
├── Parse JSON
│   ├── Get String → string (int)
│   └── Get Fret → fret (int)
├── Get Guitar Actor Reference
└── Call "PlayStringAnimation" (string, fret)
```

### 2. Ders İlerleme Takibi

**Senaryo:** Oyuncu dersi tamamladığında Achievement ve XP kazansın.

**JavaScript:**
```javascript
function completeLesson(lessonId, score, accuracy) {
    if (window.ue && window.ue.interface) {
        window.ue.interface.broadcast('OnLessonCompleted', JSON.stringify({
            lessonId: lessonId,
            score: score,
            accuracy: accuracy
        }));
    }
}
```

**Blueprint:**
```
OnLessonCompleted Event
├── Parse JSON
│   ├── Get Score → score (int)
│   └── Get Accuracy → accuracy (float)
├── Add Experience Points (score * accuracy)
├── Check Achievements
└── Save Progress to Save Game
```

### 3. Unreal'dan Ders Yükleme

**Senaryo:** Oyun menüsünden seçilen şarkı Melovia arayüzüne yüklensin.

**Blueprint:**
```
On Song Selected (String: SongId)
├── Get Web Browser Widget Reference
├── Format String: "loadLesson('{SongId}')"
└── Execute JavaScript
```

**JavaScript:**
```javascript
window.loadLesson = function(lessonId) {
    // Dersi API'den yükle
    fetch(`/api/lessons/${lessonId}`)
        .then(res => res.json())
        .then(lesson => {
            currentLesson = lesson;
            displayLesson(lesson);
        });
};
```

---

## 🛠️ Sorun Giderme

### Web Browser Gösterilmiyor

1. Plugin'in aktif olduğunu kontrol edin
2. Widget'ın viewport'a eklendiğini doğrulayın
3. URL'nin erişilebilir olduğunu test edin

### JavaScript Mesajları Gelmiyor

1. `window.ue.interface` kontrolünü ekleyin
2. Browser Console'da hata olup olmadığını kontrol edin
3. Event binding'in doğru yapıldığını doğrulayın

```javascript
// Debug için
console.log('UE Interface:', window.ue?.interface);
```

### Ses Çalmıyor (Packaged Build)

Web Audio API bazı durumlarda kullanıcı etkileşimi gerektirir:

```javascript
document.addEventListener('click', () => {
    audioEngine.init();
}, { once: true });
```

### Türkçe Karakterler Bozuk

Blueprint'te JSON parse ederken UTF-8 encoding kullanın:

```cpp
FString DecodedMessage = FBase64::Decode(Message);
```

---

## 📦 Paketleme

### Dosyaların Dahil Edilmesi

**DefaultGame.ini:**
```ini
[/Script/UnrealEd.ProjectPackagingSettings]
+DirectoriesToAlwaysCook=/Game/WebFiles
```

### Web Dosyalarının Kopyalanması

**Build.cs:**
```csharp
RuntimeDependencies.Add("$(ProjectDir)/Content/WebFiles/...");
```

---

## 📞 Destek

Sorularınız için:
- GitHub Issues: https://github.com/frzerxz/Melovia/issues
- Unreal Forums: Melovia konusu

---

*Bu belge Melovia v0.1 için hazırlanmıştır. Son güncelleme: 22 Ocak 2026*
