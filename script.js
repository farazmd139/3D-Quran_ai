document.addEventListener('DOMContentLoaded', () => {
    // بنیادی ایپ کے DOM عناصر
    const pages = document.querySelectorAll('.page');
    const navButtons = document.querySelectorAll('.nav-button');

    // قرآن سیکشن کے لیے نئے DOM عناصر
    const quranPage = document.getElementById('quranPage');
    const mainMenuContainer = document.getElementById('main-menu');
    const surahPagesContainer = document.getElementById('surah-pages-container');

    // Islamic AI کے DOM عناصر (aiPage ke liye)
    const messages = document.getElementById('messages');
    const userInput = document.getElementById('userInput');

    // Sawal-Jawab اور Waqiyat کے DOM عناصر
    const sawalJawabList = document.getElementById('sawal-jawab-list');
    const waqiyatList = document.getElementById('waqiyat-list');
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

    // Sawal-Jawab کا ڈیٹا (talimPage ke liye)
    const sawalJawabData = [
        { question: "سوال: اسلام کے بنیادی عقائد کیا ہیں؟", answer: "جواب: اسلام کے بنیادی عقائد یہ ہیں: اللہ پر ایمان، اس کے فرشتوں پر ایمان، اس کی کتابوں پر ایمان، اس کے رسولوں پر ایمان، آخرت کے دن پر ایمان، اور اچھی بری تقدیر پر ایمان۔" },
        { question: "سوال: اللہ تعالیٰ کہاں ہے؟", answer: "جواب: اللہ تعالیٰ ہر جگہ اپنے علم اور قدرت کے ساتھ موجود ہے، لیکن اس کی ذات ساتوں آسمانوں کے اوپر عرش پر مستوی ہے، جیسا کہ قرآن و حدیث سے ثابت ہے۔" },
        { question: "سوال: توحید کی کتنی قسمیں ہیں؟", answer: "جواب: توحید کی تین بڑی قسمیں ہیں: 1. توحیدِ ربوبیت (اللہ کو کائنات کا واحد خالق، مالک اور مدبر ماننا)، 2. توحیدِ الوہیت (عبادت کی تمام اقسام صرف اللہ کے لیے خاص کرنا)، 3. توحیدِ اسماء و صفات (اللہ کے ناموں اور صفات کو بغیر کسی تحریف، تعطیل، تکییف یا تمثیل کے ماننا)۔" },
        { question: "سوال: اسلام کے پانچ ستون کون سے ہیں؟", answer: "جواب: اسلام کے پانچ ستون یہ ہیں: 1. کلمہ شہادت (گواہی دینا کہ اللہ کے سوا کوئی معبود نہیں اور محمدؐ اس کے رسول ہیں)، 2. نماز قائم کرنا، 3. زکوٰۃ ادا کرنا، 4. رمضان کے روزے رکھنا، 5. صاحبِ استطاعت کے لیے حج کرنا۔" },
        { question: "سوال: نماز میں فرض کیا کیا ہیں؟", answer: "جواب: نماز کے فرائض (جن کے بغیر نماز نہیں ہوتی) یہ ہیں: تکبیر تحریمہ، قیام (کھڑا ہونا)، قراءت (قرآن پڑھنا)، رکوع، سجدہ، اور قعدہ اخیرہ (آخری بیٹھک)۔" },
        { question: "سوال: سب سے پہلے نبی کون تھے؟", answer: "جواب: انسانیت کے باپ اور سب سے پہلے نبی حضرت آدم علیہ السلام تھے۔" },
        { question: "سوال: 'اولوالعزم' رسول کون کون ہیں؟", answer: "جواب: اولوالعزم وہ رسول ہیں جنہوں نے دین کی تبلیغ میں سب سے زیادہ مشکلات برداشت کیں۔ ان کی تعداد پانچ ہے: حضرت نوحؑ، حضرت ابراہیمؑ، حضرت موسیٰؑ، حضرت عیسیٰؑ، اور حضرت محمد صلی اللہ علیہ وسلم۔" }
    ];

    // Waqiyat ka data (tarikhPage ke liye)
    const waqiyatData = [
        { title: "واقعہ: حضرت آدم علیہ السلام کی پیدائش", text: "جواب: اللہ تعالیٰ نے حضرت آدم علیہ السلام کو مٹی سے پیدا فرمایا اور انہیں اپنی تخلیق کا سب سے پہلا انسان اور نبی بنایا۔ قرآن مجید میں سورہ البقرہ (2:30) میں ذکر ہے کہ اللہ نے فرشتوں سے فرمایا: 'میں زمین میں ایک خلیفہ بنانے والا ہوں۔' اس کے بعد انہیں جنت میں رکھا گیا اور انہیں علم عطا کیا گیا، جیسا کہ سورہ طہ (20:120) میں بیان ہوا۔" }
    ];

    // =================================================
    // 1. بنیادی پیج نیویگیشن کا فنکشن
    // =================================================
    window.showPage = (pageId) => {
        pages.forEach(page => page.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));

        const activePage = document.getElementById(pageId);
        const activeButton = document.querySelector(`.nav-button[data-page="${pageId}"]`);
        
        if (activePage) {
            activePage.classList.add('active');
            if (pageId === 'aiPage' && !messages.dataset.initialized) {
                addInitialMessage();
                messages.dataset.initialized = 'true';
            }
            if (pageId === 'talimPage' && !sawalJawabList.dataset.initialized) {
                loadSawalJawab();
                sawalJawabList.dataset.initialized = 'true';
            }
            if (pageId === 'tarikhPage' && !waqiyatList.dataset.initialized) {
                loadWaqiyat();
                waqiyatList.dataset.initialized = 'true';
            }
        }
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        const playingAudio = document.querySelector('#surah-pages-container audio.playing');
        if (playingAudio) playingAudio.pause();
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.dataset.page;
            if (pageId) showPage(pageId);
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
    // 4. Sawal-Jawab اور Waqiyat کی فعالیت (talimPage aur tarikhPage ke liye)
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

    function loadWaqiyat(searchTerm = '') {
        waqiyatList.innerHTML = '';
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filteredData = waqiyatData.filter(item => 
            item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.text.toLowerCase().includes(lowerCaseSearchTerm)
        );

        if (filteredData.length > 0) {
            filteredData.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.innerHTML = `
                    <p class="waqiya-title">${item.title}</p>
                    <p class="waqiya-text">${item.text}</p>
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
        } else {
            waqiyatList.innerHTML = `<p style="text-align: center; font-size: 1.5rem; grid-column: 1 / -1;">کوئی واقعہ نہیں ملا۔</p>`;
        }
    }

    window.copyText = (buttonElement, index, type) => {
        let textToCopy = '';
        if (type === 'sawalJawab') {
            const item = sawalJawabData[index];
            textToCopy = `${item.question}\n${item.answer}`;
        } else if (type === 'waqiyat') {
            const item = waqiyatData[index];
            textToCopy = `${item.title}\n${item.text}`;
        }
        navigator.clipboard.writeText(textToCopy).then(() => {
            const toast = buttonElement.closest('.item').querySelector('.toast');
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }).catch(err => console.error('Copy failed', err));
    };

    window.shareText = (index, type) => {
        let textToShare = '';
        if (type === 'sawalJawab') {
            const item = sawalJawabData[index];
            textToShare = `${item.question}\n${item.answer}`;
        } else if (type === 'waqiyat') {
            const item = waqiyatData[index];
            textToShare = `${item.title}\n${item.text}`;
        }
        if (navigator.share) {
            navigator.share({
                title: type === 'sawalJawab' ? 'اسلامی سوال جواب' : 'واقعہ نبی',
                text: textToShare,
            }).catch(err => console.error('Share failed', err));
        } else {
            alert('آپ کا براؤزر شیئر فنکشن کو سپورٹ نہیں کرتا۔');
        }
    };

    window.speakText = (index, type) => {
        let textToSpeak = '';
        if (type === 'sawalJawab') {
            const item = sawalJawabData[index];
            textToSpeak = `${item.question} ${item.answer}`;
        } else if (type === 'waqiyat') {
            const item = waqiyatData[index];
            textToSpeak = `${item.title} ${item.text}`;
        }

        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'ur-PK';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    };

    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', () => {
            searchInput.parentElement.style.display = (searchInput.parentElement.style.display === 'block') ? 'none' : 'block';
            if (searchInput.parentElement.style.display === 'block') searchInput.focus();
        });

        searchInput.addEventListener('input', function() {
            loadSawalJawab(this.value);
        });
    }

    // =================================================
    // 5. ہوم اسکرین کے بٹنوں کی فعالیت
    // =================================================
    const homeButtons = {
        'kalme-btn': () => alert('کلمہ طیبہ: لا إله إلا الله محمد رسول الله'),
        'wudu-btn': () => alert('وضو کے فرائض:\n1. نیت\n2. ہاتھ دھونا\n3. منہ دھونا\n4. ناک میں پانی ڈالنا\n5. منہ دھونا\n6. ہاتھ دھونا\n7. سر مسح کرنا\n8. پاؤں دھونا'),
        'ghusl-btn': () => alert('غسل کے فرائض:\n1. نیت\n2. پورے جسم پر پانی ڈالنا\n3. منہ دھونا\n4. ناک دھونا'),
        'tayammum-btn': () => alert('تیمم کا طریقہ:\n1. نیت\n2. دونوں ہاتھوں کو مٹی میں مارنا\n3. ہاتھوں سے چہرہ مسح کرنا\n4. دونوں ہاتھ مسح کرنا'),
        'namaz-btn': () => alert('نماز کا طریقہ:\n1. تکبیر تحریمہ\n2. قیام\n3. رکوع\n4. سجدہ\n5. قعدہ'),
        'janaza-btn': () => alert('نماز جنازہ:\n1. چار تکبیریں\n2. دعا پڑھنا\n3. سلام پھیرنا'),
        'qunoot-btn': () => alert('دعائے قنوت:\nاللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ...'),
        'allah-names-btn': () => alert('اللہ کے 99 ناموں کی فہرست آنے والی ہے...'),
        'dua-btn': () => alert('دعائیں:\nرَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ...'),
        'hadith-btn': () => alert('احادیث:\nصاحبِ حسنِ خلق جنت میں سب سے قریب ہوگا۔'),
        'tasbih-btn': () => alert('تسبیح:\nسبحان اللہ، الحمدللہ، اللہ اکبر'),
        'urdu-drawing-btn': () => alert('اردو ڈرائنگ فیچر آنے والا ہے...')
    };

    Object.keys(homeButtons).forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', () => {
                button.classList.add('active');
                homeButtons[id]();
                setTimeout(() => button.classList.remove('active'), 500);
            });
        }
    });

    // =================================================
    // 6. ایپ کا ابتدائی لوڈ
    // =================================================
    generateQuranContent();
    showPage('homePage');
});
