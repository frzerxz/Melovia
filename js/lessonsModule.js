/**
 * Melovia - Lessons Module
 */

const LessonsModule = {
    lessons: [
        {
            id: 1,
            title: 'Temel Akorlar',
            subtitle: 'Başlangıç Seviyesi',
            icon: '🎸',
            description: 'Am, C, D, E, G gibi temel akorları öğrenin. Gitar çalmaya başlamak için en önemli adım.',
            difficulty: 'easy'
        },
        {
            id: 2,
            title: 'Ritim Kalıpları',
            subtitle: 'Orta Seviye',
            icon: '🥁',
            description: 'Popüler şarkılarda kullanılan temel ritim kalıplarını ve vuruş tekniklerini keşfedin.',
            difficulty: 'medium'
        },
        {
            id: 3,
            title: 'Barre Akorlar',
            subtitle: 'İleri Seviye',
            icon: '💪',
            description: 'F, Bm ve diğer barre akorlarını öğrenerek repertuarınızı genişletin.',
            difficulty: 'hard'
        },
        {
            id: 4,
            title: 'Parmak Egzersizleri',
            subtitle: 'Teknik Geliştirme',
            icon: '✋',
            description: 'Parmak bağımsızlığı ve hız geliştirmek için günlük egzersizler.',
            difficulty: 'easy'
        },
        {
            id: 5,
            title: 'Pentatonik Skalalar',
            subtitle: 'Solo Çalım',
            icon: '🎵',
            description: 'Blues ve rock müziğin temeli olan pentatonik skalaları öğrenin.',
            difficulty: 'medium'
        },
        {
            id: 6,
            title: 'Şarkı Analizi',
            subtitle: 'Uygulama',
            icon: '📝',
            description: 'Popüler şarkıları analiz ederek akorları ve ritim kalıplarını çözümleyin.',
            difficulty: 'medium'
        }
    ],

    init() {
        this.generateLessons();
        console.log('📚 Lessons Module initialized');
    },

    generateLessons() {
        const container = document.getElementById('lessonsGrid');
        if (!container) return;

        let html = '';
        
        this.lessons.forEach(lesson => {
            html += `
                <div class="lesson-card" data-lesson="${lesson.id}">
                    <div class="lesson-header">
                        <div class="lesson-icon">${lesson.icon}</div>
                        <div class="lesson-info">
                            <h3>${lesson.title}</h3>
                            <span>${lesson.subtitle}</span>
                        </div>
                    </div>
                    <p class="lesson-desc">${lesson.description}</p>
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

    startLesson(id) {
        const lesson = this.lessons.find(l => l.id === id);
        if (lesson) {
            alert(`🎸 "${lesson.title}" dersi başlıyor!\n\nBu özellik yakında eklenecek.`);
        }
    },

    showDetails(id) {
        const lesson = this.lessons.find(l => l.id === id);
        if (lesson) {
            alert(`📖 ${lesson.title}\n\n${lesson.description}\n\nZorluk: ${lesson.difficulty}`);
        }
    }
};
