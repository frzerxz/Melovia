/**
 * Melovia - Lessons Module v2
 * Expanded: 12 lessons + 8 song practices
 */

const LessonsModule = {
    lessons: [
        // === BAŞLANGIÇ SEVİYESİ ===
        {
            id: 1, title: 'Temel Akorlar', subtitle: 'Başlangıç Seviyesi', icon: '🎸',
            description: 'Am, C, D, E, G gibi açık akorları öğrenin. Parmak pozisyonları ve geçişler.',
            difficulty: 'easy', duration: '15 dk', steps: [
                'Am akorunun parmak pozisyonu', 'C Major akoru', 'D Major akoru',
                'Am → C geçişi', 'C → G geçişi', 'Akor değiştirme pratiği'
            ]
        },
        {
            id: 2, title: 'Parmak Egzersizleri', subtitle: 'Teknik Geliştirme', icon: '✋',
            description: 'Parmak bağımsızlığı, hız ve dayanıklılık geliştiren kromat egzersizler.',
            difficulty: 'easy', duration: '10 dk', steps: [
                'Kromatik yürüyüş (1-2-3-4)', 'Ters kromatik (4-3-2-1)',
                'Spider egzersizi', 'Hammer-on / Pull-off temelleri'
            ]
        },
        {
            id: 3, title: 'İlk Melodiler', subtitle: 'Tek Tel Çalım', icon: '🎵',
            description: 'Basit melodileri tek tel üzerinde çalmayı öğrenin. Nota okuma temelleri.',
            difficulty: 'easy', duration: '12 dk', steps: [
                'E teli üzerinde notalar', 'B teli üzerinde notalar',
                'Twinkle Twinkle (melodi)', 'Ode to Joy (melodi)'
            ]
        },
        // === ORTA SEVİYE ===
        {
            id: 4, title: 'Ritim Kalıpları', subtitle: 'Orta Seviye', icon: '🥁',
            description: 'Downstroke, upstroke ve popüler ritim kalıplarını keşfedin.',
            difficulty: 'medium', duration: '18 dk', steps: [
                'Düz vuruş (D-D-D-D)', 'Alternatif vuruş (D-U-D-U)',
                'Pop ritmi (D-DU-UDU)', 'Fingerpicking temelleri',
                'Travis picking intro', 'Arpej kalıpları'
            ]
        },
        {
            id: 5, title: 'Pentatonik Skalalar', subtitle: 'Solo Çalım', icon: '🎹',
            description: 'Am Pentatonik skala, 5 pozisyon ve improvizasyon temelleri.',
            difficulty: 'medium', duration: '20 dk', steps: [
                'Am Pentatonik - Pozisyon 1', 'Am Pentatonik - Pozisyon 2',
                'Pozisyon geçişleri', 'Bending tekniği',
                'Vibrato tekniği', 'Basit solo cümleler'
            ]
        },
        {
            id: 6, title: 'Barre Akorlar', subtitle: 'İleri Teknik', icon: '💪',
            description: 'F, Bm ve kaydırılabilir barre akor formlarını öğrenerek repertuarınızı genişletin.',
            difficulty: 'medium', duration: '22 dk', steps: [
                'F Major - E formu barre', 'Bm - A formu barre',
                'Barre ile akor kaydırma', 'Minor barre formları',
                'Barre geçiş egzersizleri', 'Şarkıda barre uygulama'
            ]
        },
        {
            id: 7, title: 'Blues Temelleri', subtitle: 'Tarz Çalışması', icon: '🎷',
            description: '12-bar blues yapısı, blues skalası ve shuffle ritmi.',
            difficulty: 'medium', duration: '25 dk', steps: [
                '12-Bar Blues yapısı', 'Blues skalası (Am)',
                'Shuffle ritmi', 'Blues turnaround',
                'Blues lick\'leri', 'Jam session pratiği'
            ]
        },
        // === İLERİ SEVİYE ===
        {
            id: 8, title: 'Fingerstyle Gitar', subtitle: 'İleri Seviye', icon: '🤌',
            description: 'Klasik fingerpicking, Travis picking ve bağımsız bas çizgisi.',
            difficulty: 'hard', duration: '30 dk', steps: [
                'P-I-M-A parmak isimlendirme', 'Temel arpej kalıpları',
                'Travis picking', 'Bas + melodi ayrımı',
                'Dust in the Wind pattern', 'Blackbird intro'
            ]
        },
        {
            id: 9, title: 'Müzik Teorisi', subtitle: 'Teori + Uygulama', icon: '📐',
            description: 'Aralıklar, akor yapıları, tonalite ve derecelendirme sistemi.',
            difficulty: 'hard', duration: '25 dk', steps: [
                'Aralıklar (Interval)', 'Major skala yapısı',
                'Diyatonik akorlar', 'Nashville sayı sistemi',
                'Akor fonksiyonları (I-IV-V-vi)', 'Transpozisyon'
            ]
        },
        {
            id: 10, title: 'Rock & Metal Teknikleri', subtitle: 'Elektro Gitar', icon: '🤘',
            description: 'Power chord, palm mute, alternate picking ve distortion teknikleri.',
            difficulty: 'hard', duration: '28 dk', steps: [
                'Power chord formları', 'Palm muting',
                'Alternate picking hız çalışması', 'Gallop picking',
                'Pinch harmonics', 'Metal riff yazma'
            ]
        },
        {
            id: 11, title: 'Akor Süslemeleri', subtitle: 'İleri Akor Bilgisi', icon: '✨',
            description: '7li, sus2, sus4, add9 akorları ve voicing teknikleri.',
            difficulty: 'hard', duration: '20 dk', steps: [
                'Dominant 7 akorlar', 'Major 7 akorlar',
                'Sus2 ve Sus4', 'Add9 akorları',
                'Slash akorlar', 'Jazz voicing temelleri'
            ]
        },
        {
            id: 12, title: 'Şarkı Analizi', subtitle: 'Kapsamlı Uygulama', icon: '📝',
            description: 'Popüler şarkıları akor, ritim ve yapı açısından analiz edin.',
            difficulty: 'medium', duration: '15 dk', steps: [
                'Şarkı yapısı (Intro-Verse-Chorus)', 'Akor analizi',
                'Ritim pattern tespiti', 'Duyarak çalma teknikleri'
            ]
        }
    ],

    // === ŞARKI PRATİKLERİ ===
    songPractices: [
        {
            id: 's1', title: 'Smoke on the Water', artist: 'Deep Purple', icon: '🔥',
            difficulty: 'easy', chords: ['G5', 'Bb5', 'C5'], bpm: 112,
            description: 'Gitarın en ikonik riff\'i. Başlangıç için birebir.'
        },
        {
            id: 's2', title: 'Seven Nation Army', artist: 'The White Stripes', icon: '⚡',
            difficulty: 'easy', chords: ['E5', 'G5', 'A5'], bpm: 124,
            description: 'Tek tel üzerinde çalınan etkileyici bir riff.'
        },
        {
            id: 's3', title: 'Come As You Are', artist: 'Nirvana', icon: '🌧️',
            difficulty: 'easy', chords: ['Em', 'G'], bpm: 120,
            description: 'Chorus efektli arpej pattern ve kolay akor geçişleri.'
        },
        {
            id: 's4', title: 'Wish You Were Here', artist: 'Pink Floyd', icon: '🌅',
            difficulty: 'medium', chords: ['Em', 'G', 'A7sus4', 'C', 'D'], bpm: 60,
            description: 'Akustik gitar klasiği. Fingerpicking ve strumming karışımı.'
        },
        {
            id: 's5', title: 'Nothing Else Matters', artist: 'Metallica', icon: '🖤',
            difficulty: 'medium', chords: ['Em', 'D', 'C', 'G', 'B7'], bpm: 69,
            description: 'Arpej intro ve güçlü akor geçişleri ile bir masterpiece.'
        },
        {
            id: 's6', title: 'Stairway to Heaven', artist: 'Led Zeppelin', icon: '🪜',
            difficulty: 'hard', chords: ['Am', 'C', 'D', 'Fmaj7', 'G'], bpm: 63,
            description: 'Gitarın en ünlü şarkısı. Arpej, fingerpicking ve solo.'
        },
        {
            id: 's7', title: 'Hotel California', artist: 'Eagles', icon: '🏨',
            difficulty: 'hard', chords: ['Bm', 'F#7', 'A', 'E', 'G', 'D', 'Em'], bpm: 75,
            description: 'İkonik intro, arpej çalım ve çift gitar solosu.'
        },
        {
            id: 's8', title: 'Wonderwall', artist: 'Oasis', icon: '🧱',
            difficulty: 'easy', chords: ['Em7', 'G', 'Dsus4', 'A7sus4'], bpm: 87,
            description: 'Kamp ateşi klasiği. Basit ama etkileyici ritim kalıbı.'
        }
    ],

    init() {
        this.generateLessons();
        this.generateSongPractices();
        console.log('📚 Lessons Module v2 initialized');
    },

    generateLessons() {
        const container = document.getElementById('lessonsGrid');
        if (!container) return;

        let html = '';
        
        this.lessons.forEach(lesson => {
            const diffColors = { easy: '#22c55e', medium: '#f59e0b', hard: '#ef4444' };
            const diffLabels = { easy: 'Başlangıç', medium: 'Orta', hard: 'İleri' };
            const diffColor = diffColors[lesson.difficulty];
            
            html += `
                <div class="lesson-card" data-lesson="${lesson.id}">
                    <div class="lesson-header">
                        <div class="lesson-icon">${lesson.icon}</div>
                        <div class="lesson-info">
                            <h3>${lesson.title}</h3>
                            <span>${lesson.subtitle}</span>
                        </div>
                        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
                            <span style="font-size:0.7rem;padding:2px 8px;border-radius:12px;background:${diffColor}22;color:${diffColor};border:1px solid ${diffColor}44;">${diffLabels[lesson.difficulty]}</span>
                            <span style="font-size:0.65rem;color:#888;">⏱ ${lesson.duration}</span>
                        </div>
                    </div>
                    <p class="lesson-desc">${lesson.description}</p>
                    <div style="margin:8px 0;display:flex;flex-wrap:wrap;gap:4px;">
                        ${lesson.steps.slice(0, 4).map(s => `<span style="font-size:0.6rem;padding:2px 6px;border-radius:4px;background:rgba(139,92,246,0.12);color:#a78bfa;">• ${s}</span>`).join('')}
                        ${lesson.steps.length > 4 ? `<span style="font-size:0.6rem;padding:2px 6px;color:#666;">+${lesson.steps.length - 4} adım</span>` : ''}
                    </div>
                    <div class="lesson-footer">
                        <button class="lesson-btn primary" onclick="LessonsModule.startLesson(${lesson.id})">
                            Dersi Başlat
                        </button>
                        <button class="lesson-btn secondary" onclick="LessonsModule.showDetails(${lesson.id})">
                            Detay
                        </button>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    },

    generateSongPractices() {
        const container = document.getElementById('songPracticesGrid');
        if (!container) return;

        let html = '';

        this.songPractices.forEach(song => {
            const diffColors = { easy: '#22c55e', medium: '#f59e0b', hard: '#ef4444' };
            const diffLabels = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' };
            const diffColor = diffColors[song.difficulty];
            const stars = song.difficulty === 'easy' ? '⭐' : song.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐';

            html += `
                <div class="lesson-card song-practice-card" data-song="${song.id}" onclick="LessonsModule.startSongPractice('${song.id}')">
                    <div class="lesson-header">
                        <div class="lesson-icon" style="font-size:1.8rem;">${song.icon}</div>
                        <div class="lesson-info">
                            <h3>${song.title}</h3>
                            <span style="color:#a78bfa;">${song.artist}</span>
                        </div>
                        <span style="font-size:0.7rem;padding:2px 8px;border-radius:12px;background:${diffColor}22;color:${diffColor};border:1px solid ${diffColor}44;">${diffLabels[song.difficulty]}</span>
                    </div>
                    <p class="lesson-desc">${song.description}</p>
                    <div style="display:flex;align-items:center;gap:12px;margin-top:6px;">
                        <span style="font-size:0.65rem;color:#888;">🎵 ${song.bpm} BPM</span>
                        <span style="font-size:0.65rem;color:#888;">🎸 ${song.chords.join(', ')}</span>
                        <span style="font-size:0.65rem;margin-left:auto;">${stars}</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    startLesson(id) {
        const lesson = this.lessons.find(l => l.id === id);
        if (!lesson) return;

        let stepsHtml = lesson.steps.map((s, i) => `${i + 1}. ${s}`).join('\n');
        alert(`🎸 "${lesson.title}" dersi başlıyor!\n\nAdımlar:\n${stepsHtml}\n\n⏱ Süre: ${lesson.duration}`);
    },

    showDetails(id) {
        const lesson = this.lessons.find(l => l.id === id);
        if (!lesson) return;

        const diffLabels = { easy: 'Başlangıç', medium: 'Orta', hard: 'İleri' };
        let stepsHtml = lesson.steps.map((s, i) => `  ${i + 1}. ${s}`).join('\n');
        alert(`📖 ${lesson.title}\n\n${lesson.description}\n\nZorluk: ${diffLabels[lesson.difficulty]}\nSüre: ${lesson.duration}\n\nAdımlar:\n${stepsHtml}`);
    },

    startSongPractice(songId) {
        const song = this.songPractices.find(s => s.id === songId);
        if (!song) return;

        alert(`🎵 "${song.title}" - ${song.artist}\n\nAkorlar: ${song.chords.join(' → ')}\nBPM: ${song.bpm}\n\n${song.description}\n\nPratik başlıyor! Tablature bölümüne bakın.`);
        
        // Load tablature if exists
        const tabKey = {
            's1': 'smoke', 's2': 'seven-nation', 's3': 'come-as',
            's4': 'wish-you-were-here', 's5': 'nothing-else-matters',
            's6': 'stairway', 's7': 'hotel-california', 's8': 'wonderwall'
        }[songId];
        
        if (tabKey && typeof loadTablature === 'function') {
            const select = document.querySelector('.tablature-panel .scale-select');
            if (select) {
                select.value = tabKey;
                loadTablature(tabKey);
            }
        }
    }
};
