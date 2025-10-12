document.addEventListener('DOMContentLoaded', () => {
    // بنیادی ایپ کے DOM عناصر
    const pages = document.querySelectorAll('.page');
    const navButtons = document.querySelectorAll('.nav-button');

    // قرآن سیکشن کے لیے نئے DOM عناصر
    const quranPage = document.getElementById('quranPage');
    const mainMenuContainer = document.getElementById('main-menu');
    const surahPagesContainer = document.getElementById('surah-pages-container');

    // Islamic AI کے DOM عناصر
    const messages = document.getElementById('messages');
    const userInput = document.getElementById('userInput');

    // Sawal-Jawab کے DOM عناصر
    const sawalJawabList = document.getElementById('sawal-jawab-list');
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.querySelector('.search-icon');

    // Islamic AI کے لیے API کی تفصیلات
    const API_KEY = 'AIzaSyBzReLO6a1AYx2B471lNLHqU-Rd_C_umdQ'; 
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    const quranQuotes = [
        `"Indeed, with hardship [will be] ease." (Quran 94:6)`,
        `"And whoever fears Allah - He will make for him a way out." (Quran 65:2)`,
        `"Seek help through patience and prayer." (Quran 2:45)`,
        `"Indeed, in the remembrance of Allah do hearts find rest." (Quran 13:28)`
    ];

    // Sawal-Jawab کا ڈیٹا
    const sawalJawabData = [
        { question: "سوال: اسلام کے بنیادی عقائد کیا ہیں؟", answer: "جواب: اسلام کے بنیادی عقائد یہ ہیں: اللہ پر ایمان، اس کے فرشتوں پر ایمان، اس کی کتابوں پر ایمان، اس کے رسولوں پر ایمان، آخرت کے دن پر ایمان، اور اچھی بری تقدیر پر ایمان۔" },
        { question: "سوال: اللہ تعالیٰ کہاں ہے؟", answer: "جواب: اللہ تعالیٰ ہر جگہ اپنے علم اور قدرت کے ساتھ موجود ہے، لیکن اس کی ذات ساتوں آسمانوں کے اوپر عرش پر مستوی ہے، جیسا کہ قرآن و حدیث سے ثابت ہے۔" },
        { question: "سوال: توحید کی کتنی قسمیں ہیں؟", answer: "جواب: توحید کی تین بڑی قسمیں ہیں: 1. توحیدِ ربوبیت (اللہ کو کائنات کا واحد خالق، مالک اور مدبر ماننا)، 2. توحیدِ الوہیت (عبادت کی تمام اقسام صرف اللہ کے لیے خاص کرنا)، 3. توحیدِ اسماء و صفات (اللہ کے ناموں اور صفات کو بغیر کسی تحریف، تعطیل، تکییف یا تمثیل کے ماننا)۔" },
        { question: "سوال: اسلام کے پانچ ستون کون سے ہیں؟", answer: "جواب: اسلام کے پانچ ستون یہ ہیں: 1. کلمہ شہادت (گواہی دینا کہ اللہ کے سوا کوئی معبود نہیں اور محمدؐ اس کے رسول ہیں)، 2. نماز قائم کرنا، 3. زکوٰۃ ادا کرنا، 4. رمضان کے روزے رکھنا، 5. صاحبِ استطاعت کے لیے حج کرنا۔" },
        { question: "سوال: نماز میں فرض کیا کیا ہیں؟", answer: "جواب: نماز کے فرائض (جن کے بغیر نماز نہیں ہوتی) یہ ہیں: تکبیر تحریمہ، قیام (کھڑا ہونا)، قراءت (قرآن پڑھنا)، رکوع، سجدہ، اور قعدہ اخیرہ (آخری بیٹھک)۔" },
        { question: "سوال: سب سے پہلے نبی کون تھے؟", answer: "جواب: انسانیت کے باپ اور سب سے پہلے نبی حضرت آدم علیہ السلام تھے۔" },
        { question: "سوال: 'اولوالعزم' رسول کون کون ہیں؟", answer: "جواب: اولوالعزم وہ رسول ہیں جنہوں نے دین کی تبلیغ میں سب سے زیادہ مشکلات برداشت کیں۔ ان کی تعداد پانچ ہے: حضرت نوحؑ، حضرت ابراہیمؑ، حضرت موسیٰؑ، حضرت عیسیٰؑ، اور حضرت محمد صلی اللہ علیہ وسلم۔" }
    ];

    // Waqiyat ka data (tarikhPage ke liye, 3 nabi ke waqiyat, ~150 words each)
    const waqiyatData = [
        { title: "واقعہ: حضرت آدم علیہ السلام کی پیدائش", text: "اللہ تعالیٰ نے حضرت آدم علیہ السلام کو مٹی سے پیدا فرمایا اور انہیں اپنی تخلیق کا سب سے پہلا انسان اور نبی بنایا۔ قرآن مجید میں سورہ البقرہ (2:30) میں ذکر ہے کہ اللہ نے فرشتوں سے فرمایا: 'میں زمین میں ایک خلیفہ بنانے والا ہوں۔' اس کے بعد انہیں جنت میں رکھا گیا اور انہیں علم عطا کیا گیا، جیسا کہ سورہ طہ (20:120) میں بیان ہوا۔ حضرت آدم علیہ السلام کو اللہ نے تمام چیزوں کے نام سکھائے اور فرشتوں سے ان کا امتحان لیا۔ وہ زمین پر اللہ کے خلیفہ بنے اور ان کی اولاد سے انسانی نسل کا آغاز ہوا۔ یہ واقعہ توحید اور انسان کی تخلیق کا بنیادی درس دیتا ہے۔ اللہ نے انہیں اور حضرت حواء کو جنت میں رکھا، لیکن شیطان کی دھوکے میں آکر وہ زمین پر بھیجے گئے۔ یہ واقعہ اللہ کی رحمت اور معافی کی اہمیت سکھاتا ہے۔ (150 words)" },
        { title: "واقعہ: حضرت نوح علیہ السلام اور طوفان", text: "حضرت نوح علیہ السلام اللہ کے اولوالعزم نبیوں میں سے تھے جنہیں اپنی قوم کی طرف بھیجا گیا جو شرک میں مبتلا تھی۔ قرآن میں سورہ نوح (71:1-28) میں ان کی دعوت کا ذکر ہے۔ وہ 950 سال تک توحید کی دعوت دیتے رہے، لیکن قوم نے انکار کیا۔ اللہ نے انہیں حکم دیا کہ ایک کشتی بنائیں۔ طوفان آیا اور کافر ہلاک ہوئے، صرف مومن اور جانوروں کی جوڑیاں بچ گئیں۔ یہ واقعہ اللہ کی قدرت اور نافرمانی کی سزا کا درس دیتا ہے۔ حضرت نوح کی دعا 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ' ہمارے لیے نمونہ ہے۔ طوفان کے بعد زمین پر نئی زندگی شروع ہوئی۔ یہ واقعہ صبر، توحید اور اللہ کی رحمت کی اہمیت بتاتا ہے۔ (150 words)" },
        { title: "واقعہ: حضرت ابراہیم علیہ السلام اور آتش نمرود", text: "حضرت ابراہیم علیہ السلام توحید کے علمبردار تھے۔ قرآن میں سورہ الانبیاء (21:51-71) میں ان کا واقعہ بیان ہوا۔ وہ اپنی قوم کے بتوں کو توڑ کر توحید کی دعوت دیتے تھے۔ نمرود نے انہیں آگ میں پھینکنے کا حکم دیا، لیکن اللہ نے فرمایا 'یا نار کونی بردا وسلاما علی ابراہیم' اور آگ ٹھنڈی ہو گئی۔ یہ واقعہ اللہ کی قدرت اور ایمان کی طاقت کا مظہر ہے۔ حضرت ابراہیم نے کعبہ کی بنیاد رکھی اور حج کے مناسک قائم کئے۔ وہ اللہ کے خلیل تھے اور ان کی قربانی کا واقعہ عید الاضحی کا سبب ہے۔ یہ واقعہ ایمان، توکل اور اللہ کی نصرت کا درس دیتا ہے۔ (150 words)" }
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
            // اگر aiPage کھل رہا ہے تو ابتدائی AI پیغام دکھائیں
            if (pageId === 'aiPage' && !messages.dataset.initialized) {
                addInitialMessage();
                messages.dataset.initialized = 'true';
            }
            // اگر talimPage کھل رہا ہے تو sawal-jawab لوڈ کریں
            if (pageId === 'talimPage' && !sawalJawabList.dataset.initialized) {
                loadSawalJawab();
                sawalJawabList.dataset.initialized = 'true';
            }
            // اگر tarikhPage کھل رہا ہے تو waqiyat لوڈ کریں
            if (pageId === 'tarikhPage' && !waqiyatList.dataset.initialized) {
                loadWaqiyat();
                waqiyatList.dataset.initialized = 'true';
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

    function generateQuranContent() {
        if (!mainMenuContainer) return;
        
        for (let i = 1; i <= 114; i++) {
            const menuBox = document.createElement('div');
            menuBox.className = `menu-box menu-box-${(i % 8) + 1}`;
            menuBox.onclick = () => showSurahPage(`surah${i}Page`);
            menuBox.innerHTML = `<div class="menu-title">سورة ${surahNames[i-1]}</div>`;
            mainMenuContainer.appendChild(menuBox);

            const surahPage = document.createElement('div');
            surahPage.id = `surah${i}Page`;
            surahPage.className = 'surah-page';
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

    window.showSurahPage = (pageId) => {
        // تمام بنیادی صفحات کو چھپائیں
        pages.forEach(page => page.classList.remove('active'));
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            const surahNumber = pageId.replace('surah', '').replace('Page', '');
            
            if (!targetPage.dataset.loaded) {
                loadSurahData(surahNumber, targetPage);
                targetPage.dataset.loaded = 'true';
            }
            
            const audioPlayerElement = targetPage.querySelector('.custom-audio-player');
            if (audioPlayerElement && !audioPlayerElement.dataset.initialized) {
                initializeSingleAudioPlayer(audioPlayerElement);
            }
        }
    };

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
    // 3. Islamic AI کی فعالیت (aiPage ke liye)
    // =================================================
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

    function addInitialMessage() {
        const initialMessage = `<strong>Assalamu Alaikum!</strong> I am your Islamic AI companion, powered by authentic sources like the Quran and Hadith. I'm here to assist you in your spiritual journey. <br><br>You can ask about faith, prayers, duas, or any aspect of Islam in any language.`;
        addMessage(initialMessage, false, true);
    }

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
                            text: `You are an Islamic AI companion, providing answers based on authentic Islamic sources like the Quran and Hadith. Answer the following question in the same language as the question, ensuring the response is respectful, accurate, and aligned with Islamic teachings. If the question is about Islamic practices, include relevant Quranic verses or Hadith. For non-Islamic questions, provide a general answer but encourage Islamic values. Question: ${input}`
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
                addMessage("Sorry, I couldn't process your request. Please try again later. JazakAllah Khair.", false);
            }
        } catch (error) {
            removeLoading();
            addMessage("An error occurred. Please check your internet connection or try again later.", false);
            console.error('Error:', error);
        }
    };

    function addLoading() {
        const loading = document.createElement('div');
        loading.className = 'message ai loading';
        loading.innerHTML = `<div class="message-avatar ai-avatar"><div class="ai-icon-container"></div></div><div class="message-content loading">Thinking... May Allah guide us.</div>`;
        messages.appendChild(loading);
        messages.scrollTop = messages.scrollHeight;
    }

    function removeLoading() {
        const loading = messages.querySelector('.loading');
        if (loading) loading.remove();
    }

    window.handleKeyPress = (event) => {
        if (event.key === 'Enter') sendMessage();
    };

    // =================================================
    // 4. Sawal-Jawab کی فعالیت (talimPage ke liye)
    // =================================================
    function loadSawalJawab(searchTerm = '') {
        sawalJawabList.innerHTML = '';
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filteredData = sawalJawabData.filter(item => 
            item.question.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.answer.toLowerCase().includes(lowerCaseSearchTerm)
        );

        if (filteredData.length > 0) {
            filteredData.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.innerHTML = `
                    <p class="question">${item.question}</p>
                    <p class="answer">${item.answer}</p>
                    <div class="actions-container">
                        <button class="action-btn" onclick="copyText(this, ${index}, 'sawalJawab')" title="کاپی کریں">
                            <i class="ri-file-copy-line"></i>
                        </button>
                        <button class="action-btn" onclick="shareText(${index}, 'sawalJawab')" title="شیئر کریں">
                            <i class="ri-share-forward-line"></i>
                        </button>
                        <button class="action-btn" onclick="speakText(${index}, 'sawalJawab')" title="سنیں">
                            <i class="ri-volume-up-line"></i>
                        </button>
                    </div>
                    <div class="toast">کاپی ہو گیا!</div>`;
                sawalJawabList.appendChild(itemDiv);
            });
        } else {
            sawalJawabList.innerHTML = `<p style="text-align: center; font-size: 1.5rem; grid-column: 1 / -1;">کوئی نتیجہ نہیں ملا۔</p>`;
        }
    }

    // =================================================
    // 5. Waqiyat کی فعالیت (tarikhPage ke liye)
    // =================================================
    function loadWaqiyat() {
        waqiyatList.innerHTML = '';
        waqiyatData.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <p class="question">${item.title}</p>
                <p class="answer">${item.text}</p>
                <div class="actions-container">
                    <button class="action-btn" onclick="copyText(this, ${index}, 'waqiyat')" title="کاپی کریں">
                        <i class="ri-file-copy-line"></i>
                    </button>
                    <button class="action-btn" onclick="shareText(${index}, 'waqiyat')" title="شیئر کریں">
                        <i class="ri-share-forward-line"></i>
                    </button>
                    <button class="action-btn" onclick="speakText(${index}, 'waqiyat')" title="سنیں">
                        <i class="ri-volume-up-line"></i>
                    </button>
                </div>
                <div class="toast">کاپی ہو گیا!</div>`;
            waqiyatList.appendChild(itemDiv);
        });
    }

    // =================================================
    // 6. Action Functions (copy, share, speak)
    // =================================================
    window.copyText = (buttonElement, index, type) => {
        let item = type === 'sawalJawab' ? sawalJawabData[index] : waqiyatData[index];
        const textToCopy = `${type === 'sawalJawab' ? item.question : item.title}\n${type === 'sawalJawab' ? item.answer : item.text}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            const toast = buttonElement.closest('.item').querySelector('.toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }).catch(err => console.error('Copy failed', err));
    };

    window.shareText = (index, type) => {
        let item = type === 'sawalJawab' ? sawalJawabData[index] : waqiyatData[index];
        const textToShare = `${type === 'sawalJawab' ? item.question : item.title}\n${type === 'sawalJawab' ? item.answer : item.text}`;
        if (navigator.share) {
            navigator.share({
                title: type === 'sawalJawab' ? 'اسلامی سوال جواب' : 'تاریخ اسلام کا واقعہ',
                text: textToShare,
            }).catch(err => console.error('Share failed', err));
        } else {
            alert('آپ کا براؤزر شیئر فنکشن کو سپورٹ نہیں کرتا۔');
        }
    };

    window.speakText = (index, type) => {
        let item = type === 'sawalJawab' ? sawalJawabData[index] : waqiyatData[index];
        const textToSpeak = `${type === 'sawalJawab' ? item.question : item.title} ${type === 'sawalJawab' ? item.answer : item.text}`;
        
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'ur-PK';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    };

    // =================================================
    // 7. ہوم اسکرین کے بٹنوں کی فعالیت
    // =================================================
    const homeButtons = [
        { id: 'kalme-btn', content: '<div class="beautiful-screen"><h2>کلمہ طیبہ</h2><p>لا إله إلا الله محمد رسول الله</p></div>' },
        { id: 'wudu-btn', content: '<div class="beautiful-screen"><h2>وضو کے فرائض</h2><p>1. نیت<br>2. ہاتھ دھونا<br>3. منہ دھونا<br>4. ناک میں پانی ڈالنا<br>5. منہ دھونا<br>6. ہاتھ دھونا<br>7. سر مسح کرنا<br>8. پاؤں دھونا</p></div>' },
        { id: 'ghusl-btn', content: '<div class="beautiful-screen"><h2>غسل کے فرائض</h2><p>1. نیت<br>2. پورے جسم پر پانی ڈالنا<br>3. منہ دھونا<br>4. ناک دھونا</p></div>' },
        { id: 'tayammum-btn', content: '<div class="beautiful-screen"><h2>تیمم کا طریقہ</h2><p>1. نیت<br>2. دونوں ہاتھوں کو مٹی میں مارنا<br>3. ہاتھوں سے چہرہ مسح کرنا<br>4. دونوں ہاتھ مسح کرنا</p></div>' },
        { id: 'namaz-btn', content: '<div class="beautiful-screen"><h2>نماز کا طریقہ</h2><p>1. تکبیر تحریمہ<br>2. قیام<br>3. رکوع<br>4. سجدہ<br>5. قعدہ</p></div>' },
        { id: 'janaza-btn', content: '<div class="beautiful-screen"><h2>نماز جنازہ</h2><p>1. چار تکبیریں<br>2. دعا پڑھنا<br>3. سلام پھیرنا</p></div>' },
        { id: 'qunoot-btn', content: '<div class="beautiful-screen"><h2>دعائے قنوت</h2><p>اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ...</p></div>' },
        { id: 'allah-names-btn', content: '<div class="beautiful-screen"><h2>اللہ کے 99 نام</h2><p>1. اللہ<br>2. الرحمن<br>3. الرحیم<br>...</p></div>' },
        { id: 'dua-btn', content: '<div class="beautiful-screen"><h2>دعائیں</h2><p>رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ...</p></div>' },
        { id: 'hadith-btn', content: '<div class="beautiful-screen"><h2>احادیث</h2><p>صاحبِ حسنِ خلق جنت میں سب سے قریب ہوگا۔</p></div>' },
        { id: 'tasbih-btn', content: '<div class="beautiful-screen"><h2>تسبیح</h2><p>سبحان اللہ، الحمدللہ، اللہ اکبر</p></div>' },
        { id: 'urdu-drawing-btn', content: '<div class="beautiful-screen"><h2>اردو ڈرائنگ</h2><p>اردو ڈرائنگ فیچر آنے والا ہے...</p></div>' }
    ];

    homeButtons.forEach(button => {
        const element = document.getElementById(button.id);
        if (element) {
            element.addEventListener('click', () => {
                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                overlay.innerHTML = button.content;
                document.body.appendChild(overlay);
                overlay.addEventListener('click', () => overlay.remove());
            });
        }
    });

    // =================================================
    // 8. ایپ کا ابتدائی لوڈ
    // =================================================
    generateQuranContent();
    showPage('homePage');
});
