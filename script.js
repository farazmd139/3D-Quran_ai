document.addEventListener('DOMContentLoaded', () => {
    // بنیادی ایپ کے DOM عناصر
    const pages = document.querySelectorAll('.page');
    const navButtons = document.querySelectorAll('.nav-button');

    // قرآن سیکشن کے لیے نئے DOM عناصر
    const quranPage = document.getElementById('quranPage');
    const mainMenuContainer = document.getElementById('main-menu');
    const surahPagesContainer = document.getElementById('surah-pages-container');

    // Islamic AI کے DOM عناصر (Talim Page ke liye)
    const messages = document.getElementById('messages');
    const userInput = document.getElementById('userInput');

    // Islamic AI کے لیے API کی تفصیلات
    const API_KEY = 'AIzaSyBzReLO6a1AYx2B471lNLHqU-Rd_C_umdQ'; 
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    const quranQuotes = [
        `"بے شک مشکل کے ساتھ آسانی ہے۔" (قرآن 94:6)`,
        `"اور جو کوئی اللہ سے ڈرتا ہے، وہ اس کے لیے نکلنے کا راستہ بناتا ہے۔" (قرآن 65:2)`,
        `"اور صبر اور نماز کے ذریعے مدد مانگو۔" (قرآن 2:45)`,
        `"بے شک اللہ کے ذکر سے دلوں کو سکون ملتا ہے۔" (قرآن 13:28)`
    ];

    // =================================================
    // 1. بنیادی پیج نیویگیشن کا فنکشن
    // =================================================
    window.showPage = (pageId) => {
        // تمام صفحات کو چھپائیں
        pages.forEach(page => page.classList.remove('active'));
        // تمام سورتوں کے صفحات کو بھی چھپائیں
        document.querySelectorAll('.surah-page').forEach(page => page.style.display = 'none');
        
        // نیویگیشن بٹن سے 'active' کلاس ہٹائیں
        navButtons.forEach(btn => btn.classList.remove('active'));

        const activePage = document.getElementById(pageId);
        const activeButton = document.querySelector(`.nav-button[data-page="${pageId}"]`);
        
        if (activePage) {
            activePage.classList.add('active');
            // اگر Talim Page کھل رہا ہے تو ابتدائی AI پیغام دکھائیں
            if (pageId === 'talimPage' && !messages.dataset.initialized) {
                addInitialMessage();
                messages.dataset.initialized = 'true';
            }
        }
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // اگر کوئی سورت چل رہی ہو تو اسے روک دیں
        const playingAudio = document.querySelector('#surah-pages-container audio.playing');
        if (playingAudio) {
            playingAudio.pause();
        }
    };

    // نیویگیشن بٹنوں پر ایونٹ لسنر
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.dataset.page;
            if (pageId) {
                showPage(pageId);
            }
        });
    });

    // =================================================
    // 2. قرآن سیکشن کی مکمل فعالیت
    // =================================================
    const surahNames = [
        "الفاتحہ", "البقرہ", "آل عمران", "النساء", "المائدہ", "الأنعام", "الأعراف", "الأنفال", "التوبہ", "یونس", "ہود", "یوسف", "الرعد", "ابراہیم", "الحجر", "النحل", "الإسراء", "الکہف", "مریم", "طہ", "الأنبیاء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنکبوت", "الروم", "لقمان", "السجدہ", "الأحزاب", "سبا", "فاطر", "یٰسٓ", "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشوریٰ", "الزخرف", "الدخان", "الجاثیہ", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الذاریات", "الطور", "النجم", "القمر", "الرحمٰن", "الواقعہ", "الحدید", "المجادلہ", "الحشر", "الممتحنہ", "الصف", "الجمعہ", "المنافقون", "التغابن", "الطلاق", "التحریم", "الملک", "القلم", "الحاقہ", "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القیامہ", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التکویر", "الإنفطار", "المطففین", "الإنشقاق", "البروج", "الطارق", "الأعلیٰ", "الغاشیہ", "الفجر", "البلد", "الشمس", "اللیل", "الضحیٰ", "الشرح", "التین", "العلق", "القدر", "البینہ", "الزلزلہ", "العادیات", "القارعہ", "التکاثر", "العصر", "الہمزہ", "الفیل", "قریش", "الماعون", "الکوثر", "الکافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس"
    ];

    // سورتوں کی فہرست اور ان کے صفحات بنانے کا فنکشن
    function generateQuranContent() {
        if (!mainMenuContainer) return; // اگر قرآن پیج پر نہیں تو کچھ نہ کریں
        
        for (let i = 1; i <= 114; i++) {
            // سورتوں کی فہرست کے لیے مینو باکس
            const menuBox = document.createElement('div');
            menuBox.className = `menu-box menu-box-${(i % 8) + 1}`;
            menuBox.onclick = () => showSurahPage(`surah${i}Page`);
            menuBox.innerHTML = `<div class="menu-title">سورة ${surahNames[i-1]}</div>`;
            mainMenuContainer.appendChild(menuBox);

            // ہر سورت کے لیے ایک الگ صفحہ
            const surahPage = document.createElement('div');
            surahPage.id = `surah${i}Page`;
            surahPage.className = 'surah-page'; // یہ کلاس اسے ابتدائی طور پر چھپا دے گی
            const audioSurahNumber = String(i).padStart(3, '0');
            surahPage.innerHTML = `
                <button class="back-button" onclick="showPage('quranPage')">⇦ تمام سورتیں</button>
                <header class="header">
                    ${i !== 1 && i !== 9 ? '<h1>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>' : ''}
                    <h1>سورة ${surahNames[i-1]}</h1>
                </header>
                <div class="audio-player-wrapper">
                    <div class="custom-audio-player" data-audio-src="https://server7.mp3quran.net/basit/murattal/${audioSurahNumber}.mp3">
                        <p style="text-align:center; padding: 10px 0;">آڈیو پلیئر لوڈ ہو رہا ہے...</p>
                    </div>
                </div>
                <main class="surah-container">
                    <p style="text-align: center; font-size: 1.5rem;">آیات لوڈ ہو رہی ہیں...</p>
                </main>`;
            surahPagesContainer.appendChild(surahPage);
        }
    }

    // کسی خاص سورت کا صفحہ دکھانے کا فنکشن
    window.showSurahPage = (pageId) => {
        // تمام بنیادی صفحات کو چھپائیں
        pages.forEach(page => page.classList.remove('active'));
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            const surahNumber = pageId.replace('surah', '').replace('Page', '');
            
            // اگر ڈیٹا پہلے لوڈ نہیں ہوا تو API سے لوڈ کریں
            if (!targetPage.dataset.loaded) {
                loadSurahData(surahNumber, targetPage);
                targetPage.dataset.loaded = 'true';
            }
            
            // اگر آڈیو پلیئر پہلے نہیں بنا تو اسے بنائیں
            const audioPlayerElement = targetPage.querySelector('.custom-audio-player');
            if (audioPlayerElement && !audioPlayerElement.dataset.initialized) {
                initializeSingleAudioPlayer(audioPlayerElement);
            }
        }
    };

    // API سے سورت کا ڈیٹا لوڈ کرنے کا فنکشن
    async function loadSurahData(surahNumber, pageElement) {
        const container = pageElement.querySelector('.surah-container');
        try {
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            renderSurah(data.data.ayahs, container);
        } catch (error) {
            console.error('Failed to fetch surah data:', error);
            container.innerHTML = `<p style="text-align: center; color: #e74c3c;">سورة لوڈ کرنے میں ناکامی ہوئی۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں۔</p>`;
        }
    }

    // آیات کو صفحے پر دکھانے کا فنکشن
    function renderSurah(ayahs, container) {
        let surahHTML = '';
        ayahs.forEach(ayah => {
            surahHTML += `
                <div class="ayah-box">
                    <p class="ayah-text">
                        ${ayah.text}
                        <span class="ayah-number">﴿${ayah.numberInSurah}﴾</span>
                    </p>
                </div>`;
        });
        container.innerHTML = surahHTML;
        setupIntersectionObserver();
    }
    
    // آیات کو اسکرول پر ظاہر کرنے کا فنکشن
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.ayah-box:not(.visible)').forEach(box => {
            observer.observe(box);
        });
    }

    // آڈیو پلیئر بنانے کا فنکشن
    function initializeSingleAudioPlayer(player) {
        const audioSrc = player.dataset.audioSrc;
        if (!audioSrc) return;
        player.dataset.initialized = 'true';
        player.innerHTML = `
            <button class="play-pause-btn">
                <svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                <svg class="pause-icon" viewBox="0 0 24 24" style="display:none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>
            </button>
            <div class="progress-container"><div class="progress-bar"></div></div>
            <div class="time-display">00:00 / 00:00</div>`;

        const audio = new Audio(audioSrc);
        audio.preload = 'metadata';
        const playPauseBtn = player.querySelector('.play-pause-btn');
        const playIcon = player.querySelector('.play-icon');
        const pauseIcon = player.querySelector('.pause-icon');
        const progressContainer = player.querySelector('.progress-container');
        const progressBar = player.querySelector('.progress-bar');
        const timeDisplay = player.querySelector('.time-display');

        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) audio.play(); else audio.pause();
        });
        audio.addEventListener('play', () => { 
            document.querySelectorAll('#surah-pages-container audio').forEach(a => {
                if (a !== audio) a.pause();
            });
            audio.classList.add('playing');
            playIcon.style.display = 'none'; 
            pauseIcon.style.display = 'block'; 
        });
        audio.addEventListener('pause', () => { 
            audio.classList.remove('playing');
            playIcon.style.display = 'block'; 
            pauseIcon.style.display = 'none'; 
        });
        
        const formatTime = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.floor(s%60)).padStart(2,'0')}`;
        audio.addEventListener('loadedmetadata', () => { timeDisplay.textContent = `00:00 / ${formatTime(audio.duration)}`; });
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
                timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
            }
        });
        progressContainer.addEventListener('click', (e) => {
            if (audio.duration) audio.currentTime = (e.offsetX / progressContainer.clientWidth) * audio.duration;
        });
        player.closest('.surah-page').appendChild(audio);
        audio.style.display = 'none';
    }

    // =================================================
    // 3. Islamic AI کی فعالیت (Talim Page ke liye)
    // =================================================
    // Islamic AI کے پیغام کو چیٹ میں شامل کرنے کا فنکشن
    function addMessage(content, isUser, includeQuote = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
        const aiIcon = '<div class="ai-icon-container"></div>'; 
        const userIcon = '👤';

        const avatarContent = isUser ? userIcon : aiIcon;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = content;
        
        if (!isUser && includeQuote && Math.random() > 0.6) {
            const quote = document.createElement('div');
            quote.className = 'quran-quote';
            quote.textContent = quranQuotes[Math.floor(Math.random() * quranQuotes.length)];
            messageContent.appendChild(quote);
        }

        messageDiv.innerHTML = `<div class="message-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}">${avatarContent}</div>`;
        messageDiv.appendChild(messageContent);
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // ابتدائی AI خوش آمدید پیغام شامل کرنے کا فنکشن
    function addInitialMessage() {
        const initialMessage = `<strong>السلام علیکم!</strong> میں آپ کا اسلامی AI ساتھی ہوں۔ قرآن اور حدیث جیسے مستند ذرائع سے تقویت یافتہ، میں آپ کے روحانی سفر میں مدد کے لیے موجود ہوں۔ <br><br>آپ ایمان، نماز، دعاؤں، یا اسلام کے کسی بھی پہلو کے بارے میں کسی بھی زبان میں پوچھ سکتے ہیں۔`;
        addMessage(initialMessage, false, true);
    }

    // پیغام بھیجنے کا فنکشن
    window.sendMessage = async () => {
        const input = userInput.value.trim();
        if (!input) return;

        addMessage(input, true);
        userInput.value = '';
        addLoading();

        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `آپ ایک اسلامی AI ساتھی ہیں، جو قرآن اور حدیث جیسے مستند اسلامی ذرائع پر مبنی جوابات دیتے ہیں۔ مندرجہ ذیل سوال کا جواب اسی زبان میں دیں جس میں سوال ہے، اس بات کو یقینی بنائیں کہ جواب احترام کے ساتھ، درست، اور اسلامی تعلیمات کے مطابق ہو۔ اگر سوال اسلامی طریقوں کے بارے میں ہے، تو متعلقہ قرآن کی آیات یا حدیث شامل کریں۔ غیر اسلامی سوالات کے لیے، عمومی جواب دیں لیکن اسلامی اقدار کی حوصلہ افزائی کریں۔ سوال: ${input}`
                        }]
                    }]
                })
            });

            const data = await response.json();
            removeLoading();
            if (data.candidates && data.candidates[0].content) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                addMessage(aiResponse, false, true);
            } else {
                addMessage("معاف کیجیے، آپ کی درخواست پر عمل نہیں ہو سکا۔ براہ کرم بعد میں دوبارہ کوشش کریں۔ جزاک اللہ خیر۔", false);
            }
        } catch (error) {
            removeLoading();
            addMessage("ایک خرابی پیش آئی۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں یا بعد میں دوبارہ کوشش کریں۔", false);
            console.error('Error:', error);
        }
    };

    // لوڈنگ انڈیکیٹر شامل کرنے کا فنکشن
    function addLoading() {
        const loading = document.createElement('div');
        loading.className = 'message ai loading';
        loading.innerHTML = `<div class="message-avatar ai-avatar"><div class="ai-icon-container"></div></div><div class="message-content loading">سوچ رہا ہوں... اللہ ہماری رہنمائی فرمائے۔</div>`;
        messages.appendChild(loading);
        messages.scrollTop = messages.scrollHeight;
    }

    // لوڈنگ انڈیکیٹر ہٹانے کا فنکشن
    function removeLoading() {
        const loading = messages.querySelector('.loading');
        if (loading) loading.remove();
    }

    // Enter کی دبانے پر ہینڈل کرنے کا فنکشن
    window.handleKeyPress = (event) => {
        if (event.key === 'Enter') sendMessage();
    };

    // =================================================
    // 4. ایپ کا ابتدائی لوڈ
    // =================================================
    generateQuranContent(); // قرآن کا مواد تیار کریں
    showPage('homePage'); // سب سے پہلے ہوم پیج دکھائیں
});
