/**
 * MeloviaAPI.js
 * Unreal Engine 5 ile iletişim için API wrapper
 * 
 * Bu dosya Melovia web arayüzü ile Unreal Engine arasında
 * köprü görevi görür.
 */

const MeloviaAPI = {
    // Unreal Engine bağlantı durumu
    isConnected: false,

    // Event listeners
    listeners: {},

    /**
     * API'yi başlat
     */
    init() {
        this.isConnected = !!(window.ue && window.ue.interface);
        console.log('MeloviaAPI initialized. Unreal connected:', this.isConnected);

        // Unreal'dan gelen mesajları dinle
        window.receiveFromUnreal = this.handleUnrealMessage.bind(this);

        return this.isConnected;
    },

    /**
     * Unreal'a mesaj gönder
     * @param {string} eventName - Event adı
     * @param {object} data - Gönderilecek veri
     */
    send(eventName, data) {
        if (!this.isConnected) {
            console.warn('Unreal Engine bağlı değil. Mesaj gönderilmedi:', eventName);
            return false;
        }

        try {
            const payload = typeof data === 'object' ? JSON.stringify(data) : data;
            window.ue.interface.broadcast(eventName, payload);
            console.log('Unreal\'a gönderildi:', eventName, data);
            return true;
        } catch (error) {
            console.error('Unreal mesaj hatası:', error);
            return false;
        }
    },

    /**
     * Unreal'dan gelen mesajları işle
     * @param {object} data - Gelen veri
     */
    handleUnrealMessage(data) {
        console.log('Unreal\'dan mesaj:', data);

        const { action, ...params } = data;

        // Kayıtlı listener'ları çağır
        if (this.listeners[action]) {
            this.listeners[action].forEach(callback => callback(params));
        }

        // Built-in aksiyonlar
        switch (action) {
            case 'highlight':
                this.highlightFret(params.fret);
                break;
            case 'playNote':
                this.triggerPlayNote(params.string, params.fret);
                break;
            case 'loadLesson':
                this.triggerLoadLesson(params.lessonId);
                break;
            case 'setGuitarType':
                this.triggerSetGuitarType(params.type);
                break;
            case 'setPair':
                this.triggerSetPair(params.pair);
                break;
        }
    },

    /**
     * Event listener ekle
     * @param {string} action - Aksiyon adı
     * @param {function} callback - Callback fonksiyonu
     */
    on(action, callback) {
        if (!this.listeners[action]) {
            this.listeners[action] = [];
        }
        this.listeners[action].push(callback);
    },

    /**
     * Event listener kaldır
     * @param {string} action - Aksiyon adı
     * @param {function} callback - Callback fonksiyonu
     */
    off(action, callback) {
        if (this.listeners[action]) {
            this.listeners[action] = this.listeners[action].filter(cb => cb !== callback);
        }
    },

    // ==================== OUTGOING EVENTS ====================

    /**
     * Nota basıldığında Unreal'a bildir
     * @param {number} stringNum - Tel numarası (1-6)
     * @param {number} fret - Perde numarası (0-24)
     * @param {number} frequency - Notanın frekansı (Hz)
     */
    onNotePressed(stringNum, fret, frequency) {
        this.send('OnNotePressed', {
            string: stringNum,
            fret: fret,
            frequency: frequency,
            timestamp: Date.now()
        });
    },

    /**
     * Nota bırakıldığında Unreal'a bildir
     * @param {number} stringNum - Tel numarası
     * @param {number} fret - Perde numarası
     */
    onNoteReleased(stringNum, fret) {
        this.send('OnNoteReleased', {
            string: stringNum,
            fret: fret
        });
    },

    /**
     * Gitar tipi değiştiğinde Unreal'a bildir
     * @param {string} type - "classic" | "electric" | "bass"
     */
    onGuitarTypeChanged(type) {
        this.send('OnGuitarTypeChanged', type);
    },

    /**
     * Pair değiştiğinde Unreal'a bildir
     * @param {number} pairNum - Pair numarası (1-3)
     */
    onPairChanged(pairNum) {
        this.send('OnPairChanged', pairNum.toString());
    },

    /**
     * Zone değiştiğinde Unreal'a bildir
     * @param {number} zoneNum - Zone numarası (1-2)
     */
    onZoneChanged(zoneNum) {
        this.send('OnZoneChanged', zoneNum.toString());
    },

    /**
     * Ders başladığında Unreal'a bildir
     * @param {string} lessonId - Ders ID
     * @param {string} songName - Şarkı adı
     */
    onLessonStarted(lessonId, songName) {
        this.send('OnLessonStarted', {
            lessonId: lessonId,
            songName: songName
        });
    },

    /**
     * Ders ilerlemesi güncellendiğinde Unreal'a bildir
     * @param {number} progress - İlerleme yüzdesi (0-100)
     * @param {number} score - Mevcut skor
     */
    onLessonProgress(progress, score) {
        this.send('OnLessonProgress', {
            progress: progress,
            score: score
        });
    },

    /**
     * Ders tamamlandığında Unreal'a bildir
     * @param {string} lessonId - Ders ID
     * @param {number} score - Final skor
     * @param {number} accuracy - Doğruluk yüzdesi
     */
    onLessonCompleted(lessonId, score, accuracy) {
        this.send('OnLessonCompleted', {
            lessonId: lessonId,
            score: score,
            accuracy: accuracy
        });
    },

    // ==================== INCOMING ACTIONS ====================

    /**
     * Fret'i vurgula (highlight)
     * @param {number} fretNum - Perde numarası
     */
    highlightFret(fretNum) {
        const fretCols = document.querySelectorAll(`[data-f="${fretNum}"]`);
        fretCols.forEach(col => {
            col.classList.add('highlighted');
            setTimeout(() => col.classList.remove('highlighted'), 500);
        });
    },

    /**
     * Tel'i vurgula
     * @param {number} stringNum - Tel numarası
     */
    highlightString(stringNum) {
        const stringCells = document.querySelectorAll(`[data-s="${stringNum}"]`);
        stringCells.forEach(cell => {
            cell.classList.add('highlighted');
            setTimeout(() => cell.classList.remove('highlighted'), 500);
        });
    },

    /**
     * Nota çalma tetikle
     * @param {number} stringNum - Tel numarası
     * @param {number} fret - Perde numarası
     */
    triggerPlayNote(stringNum, fret) {
        // Global playNote fonksiyonunu çağır
        if (typeof playNote === 'function') {
            playNote(stringNum, fret);
        } else if (typeof playFretCellByData === 'function') {
            playFretCellByData(stringNum, fret);
        }
    },

    /**
     * Ders yükleme tetikle
     * @param {string} lessonId - Ders ID
     */
    triggerLoadLesson(lessonId) {
        if (typeof loadLesson === 'function') {
            loadLesson(lessonId);
        }
    },

    /**
     * Gitar tipi değiştirme tetikle
     * @param {string} type - Gitar tipi
     */
    triggerSetGuitarType(type) {
        if (typeof selectGuitarType === 'function') {
            const labels = {
                classic: '🎸 Klasik Gitar',
                electric: '⚡ Elektro Gitar',
                bass: '🎸 Bas Gitar'
            };
            selectGuitarType(type, labels[type] || type);
        }
    },

    /**
     * Pair değiştirme tetikle
     * @param {number} pairNum - Pair numarası
     */
    triggerSetPair(pairNum) {
        if (typeof setPair === 'function') {
            setPair(pairNum);
        }
    }
};

// Sayfa yüklendiğinde otomatik başlat
document.addEventListener('DOMContentLoaded', () => {
    MeloviaAPI.init();
});

// Global erişim için
window.MeloviaAPI = MeloviaAPI;

// Export (ES6 modül desteği için)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MeloviaAPI;
}
