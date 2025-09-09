document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Element References ---
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const micBtn = document.getElementById('mic-btn');
    const menuBtn = document.getElementById('menu-btn');
    const chatMenu = document.getElementById('chat-menu');
    const historyContainer = document.getElementById('history-container');
    const faqContainer = document.getElementById('faq-container');
    const menuUsername = document.getElementById('menu-username');
    const headerProfileBtn = document.getElementById('header-profile-btn');
    const detectDiseaseBtn = document.getElementById('detect-disease-btn');
    const diseaseImageUpload = document.getElementById('disease-image-upload');

    // Modals
    const settingsModal = document.getElementById('settings-modal');
    const profileModal = document.getElementById('profile-modal');
    const loginModal = document.getElementById('login-modal');

    // Buttons
    const settingsBtn = document.getElementById('settings-btn');
    const personaliseBtn = document.getElementById('personalise-btn');
    const settingsBackBtn = document.getElementById('settings-back-btn');
    const manageProfileBtn = document.getElementById('manage-profile-btn');
    const clearChatBtn = document.getElementById('clear-chat-btn');
    const addAccountBtn = document.getElementById('add-account-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Modal Views
    const settingsMainView = document.getElementById('settings-main-view');
    const settingsPersonaliseView = document.getElementById('settings-personalise-view');
    
    // Forms & Inputs
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const languageSelect = document.getElementById('language-select');
    const accountList = document.getElementById('account-list');
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');

    // --- 2. State, Constants & Translations ---
    let savedAccounts = [];
    let activeAccountEmail = null;
    const ACCOUNTS_KEY = 'krishak_mitra_accounts';
    const ACTIVE_ACCOUNT_KEY = 'krishak_mitra_active_account';
    const CHAT_HISTORY_KEY = 'krishak_mitra_history';
    const THEME_KEY = 'krishak_mitra_theme';
    const LANGUAGE_KEY = 'krishak_mitra_language';

    const faqData = [
        { question: "What is the market price for jute today?", key: "price" },
        { question: "What is the weather forecast?", key: "weather" },
        { question: "How to treat pests on my paddy crop?", key: "pest" }
    ];

    const translations = {
        en: {
            welcome: "Welcome,", faq: "Frequently Asked Questions", activity: "Activity", settings: "Settings", inputPlaceholder: "Ask a question...",
            signIn: "Sign In", email: "Email", password: "Password", accounts: "Accounts", addAccount: "Add Account",
            logout: "Logout", personalise: "Personalise", manageProfile: "Manage Profile", clearChat: "Clear Chat",
            theme: "Theme", system: "System", light: "Light", dark: "Dark", language: "Language", systemDefault: "System Default",
            noAccounts: "No accounts have been added.",
            weather: "The current weather in Kolkata is 29°C and cloudy. Heavy rain is expected around 3:00 AM tonight.",
            price: "As of today, the market price for jute in West Bengal is around ₹7,200 per quintal.",
            pest: "For common pests on paddy, a neem oil solution can be effective. Can you describe the pest?",
            greeting: "Hello! How can I help with your farming needs today?",
            default: "I can help with weather, crop prices, and pest control."
        },
        hi: {
            welcome: "स्वागत है,", faq: "अक्सर पूछे जाने वाले प्रश्न", activity: "गतिविधि", settings: "सेटिंग्स", inputPlaceholder: "एक सवाल पूछो...",
            signIn: "साइन इन करें", email: "ईमेल", password: "पासवर्ड", accounts: "अकाउंट", addAccount: "अकाउंट जोड़ें",
            logout: "लॉग आउट", personalise: "निजीकृत करें", manageProfile: "प्रोफ़ाइल प्रबंधित करें", clearChat: "चैट साफ़ करें",
            theme: "थीम", system: "सिस्टम", light: "लाइट", dark: "डार्क", language: "भाषा", systemDefault: "सिस्टम डिफॉल्ट",
            noAccounts: "कोई अकाउंट नहीं जोड़ा गया है।",
            weather: "कोलकाता में वर्तमान मौसम 29°C और बादल छाए हुए हैं। आज देर रात 3:00 बजे के आसपास भारी बारिश की उम्मीद है।",
            price: "आज, पश्चिम बंगाल में जूट का बाजार मूल्य लगभग ₹7,200 प्रति क्विंटल है।",
            pest: "धान पर आम कीटों के लिए, नीम के तेल का घोल प्रभावी हो सकता है। क्या आप कीट का वर्णन कर सकते हैं?",
            greeting: "नमस्ते! मैं आपकी खेती की जरूरतों में कैसे मदद कर सकता हूँ?",
            default: "मैं मौसम, फसल की कीमतों और कीट नियंत्रण में मदद कर सकता हूँ।"
        },
        ml: {
            welcome: "സ്വാഗതം,", faq: "പതിവുചോദ്യങ്ങൾ", activity: "പ്രവർത്തനം", settings: "ക്രമീകരണങ്ങൾ", inputPlaceholder: "ഒരു ചോദ്യം ചോയിക്കൂ...",
            signIn: "സൈൻ ഇൻ ചെയ്യുക", email: "ഇമെയിൽ", password: "പാസ്‌വേഡ്", accounts: "അക്കൗണ്ടുകൾ", addAccount: "അക്കൗണ്ട് ചേർക്കുക",
            logout: "ലോഗ് ഔട്ട്", personalise: "വ്യക്തിഗതമാക്കുക", manageProfile: "പ്രൊഫൈൽ നിയന്ത്രിക്കുക", clearChat: "ചാറ്റ് ക്ലിയർ ചെയ്യുക",
            theme: "തീം", system: "സിസ്റ്റം", light: "ലൈറ്റ്", dark: "ഡാർക്ക്", language: "ഭാഷ", systemDefault: "സിസ്റ്റം ഡിഫോൾട്ട്",
            noAccounts: "അക്കൗണ്ടുകളൊന്നും ചേർത്തിട്ടില്ല.",
            weather: "കൊൽക്കത്തയിൽ ഇപ്പോഴത്തെ കാലാവസ്ഥ 29°C ആണ്, ആകാശം മേഘാവൃതമാണ്. ഇന്ന് രാത്രി 3:00 മണിയോടെ കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു.",
            price: "ഇന്ന്, പശ്ചിമ ബംഗാളിൽ ചണത്തിന്റെ വിപണി വില ക്വിന്റലിന് ഏകദേശം ₹7,200 ആണ്.",
            pest: "നെല്ലിലെ സാധാരണ കീടങ്ങൾക്ക് വേപ്പെണ്ണ ലായനി ഫലപ്രദമാണ്. നിങ്ങൾക്ക് കീടത്തെ വിവരിക്കാമോ?",
            greeting: "നമസ്കാരം! നിങ്ങളുടെ കാർഷിക ആവശ്യങ്ങളിൽ ഞാൻ എങ്ങനെ സഹായിക്കും?",
            default: "എനിക്ക് കാലാവസ്ഥ, വിളകളുടെ വില, കീടനിയന്ത്രണം എന്നിവയിൽ സഹായിക്കാൻ കഴിയും."
        }
    };

    // --- 3. Translation Function ---
    function setLanguage(lang) {
        if (lang === 'system') {
            lang = (navigator.language || navigator.userLanguage).split('-')[0];
        }
        const langPack = translations[lang] || translations['en'];
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (langPack[key]) el.innerText = langPack[key];
        });
        document.querySelectorAll('[data-translate-key-placeholder]').forEach(el => {
            const key = el.dataset.translateKeyPlaceholder;
            if (langPack[key]) el.placeholder = langPack[key];
        });
    }

    // --- 4. Core Functions ---
    function addMessage(text, sender, imageUrl = null) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        if (imageUrl) { const img = document.createElement('img'); img.src = imageUrl; messageElement.appendChild(img); }
        if (text) { const textNode = document.createElement('p'); textNode.innerText = text; messageElement.appendChild(textNode); }
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getSimulatedBotResponse(userText) {
        let lang = localStorage.getItem(LANGUAGE_KEY) || 'en';
        if (lang === 'system') { lang = (navigator.language || navigator.userLanguage).split('-')[0]; }
        const r = translations[lang] || translations['en'];
        const query = userText.toLowerCase();
        const keywords = {
            weather: ['weather', 'मौसम', 'കാലാവസ്ഥ'],
            price: ['price', 'कीमत', 'വില', 'jute'],
            pest: ['pest', 'कीट', 'കീട', 'paddy'],
            greeting: ['hello', 'hi', 'नमस्ते', 'നമസ്കാരം']
        };
        if (keywords.weather.some(k => query.includes(k))) return r.weather;
        if (keywords.price.some(k => query.includes(k))) return r.price;
        if (keywords.pest.some(k => query.includes(k))) return r.pest;
        if (keywords.greeting.some(k => query.includes(k))) return r.greeting;
        return r.default;
    }

    function sendMessage() {
        const userText = userInput.value.trim();
        if (userText === "") return;
        addMessage(userText, 'user');
        saveToHistory(userText);
        userInput.value = '';
        userInput.dispatchEvent(new Event('input'));
        setTimeout(() => { const botText = getSimulatedBotResponse(userText); addMessage(botText, 'bot'); }, 1000);
    }

    // --- 5. Modal Handling ---
    function setupModal(modal, openBtn) {
        const closeBtn = modal.querySelector('.close-btn');
        if (openBtn) {
            openBtn.addEventListener('click', () => {
                if (modal.id === 'settings-modal') {
                    settingsMainView.style.display = 'block';
                    settingsPersonaliseView.style.display = 'none';
                }
                modal.classList.add('show-modal');
                chatMenu.classList.remove('show');
            });
        }
        if (closeBtn) { closeBtn.addEventListener('click', () => modal.classList.remove('show-modal')); }
        window.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('show-modal'); });
    }

    // --- 6. Auth, Profile, History, and Theme ---
    const systemThemeWatcher = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        if (theme === 'system') { systemThemeWatcher.matches ? document.body.classList.add('dark-mode') : document.body.classList.remove('dark-mode'); }
        else if (theme === 'dark') { document.body.classList.add('dark-mode'); }
        else { document.body.classList.remove('dark-mode'); }
    }

    function handleSystemThemeChange() {
        const savedTheme = localStorage.getItem(THEME_KEY) || 'system';
        if (savedTheme === 'system') { applyTheme('system'); }
    }
    
    function loadFAQs() {
        faqContainer.innerHTML = '';
        faqData.forEach(item => {
            const faqItem = document.createElement('a');
            faqItem.href = "#";
            faqItem.className = 'history-item';
            faqItem.innerHTML = `<i class="fas fa-question-circle"></i> ${item.question}`;
            faqItem.addEventListener('click', (e) => {
                e.preventDefault();
                userInput.value = item.question;
                sendMessage();
                chatMenu.classList.remove('show');
            });
            faqContainer.appendChild(faqItem);
        });
    }

    function renderAccountList() {
        accountList.innerHTML = '';
        if (savedAccounts.length === 0) {
            accountList.innerHTML = `<p style="text-align: center; color: var(--text-color-secondary);" data-translate-key="noAccounts"></p>`;
            setLanguage(localStorage.getItem(LANGUAGE_KEY) || 'system');
        }
        savedAccounts.forEach(account => {
            const isActive = account.email === activeAccountEmail;
            const accountItem = document.createElement('div');
            accountItem.className = `account-item ${isActive ? 'active' : ''}`;
            accountItem.dataset.email = account.email;
            let itemHTML = `<i class="fas fa-user-circle"></i><div class="account-details"><span>${account.name}</span><small>${account.email}</small></div>`;
            if (isActive) { itemHTML += `<button class="edit-profile-btn-small" title="Edit Name"><i class="fas fa-pen"></i></button>`; }
            else { itemHTML += `<button class="delete-account-btn" title="Remove Account"><i class="fas fa-trash"></i></button>`; }
            accountItem.innerHTML = itemHTML;
            accountList.appendChild(accountItem);
        });
    }

    function switchAccount(email) {
        if (confirm(`Are you sure you want to switch to ${email}?`)) {
            activeAccountEmail = email;
            localStorage.setItem(ACTIVE_ACCOUNT_KEY, activeAccountEmail);
            updateUIForCurrentUser();
            renderAccountList();
            profileModal.classList.remove('show-modal');
            addMessage(`Switched to ${getCurrentUser().name}.`, 'bot');
        }
    }

    function getCurrentUser() {
        if (!activeAccountEmail) return null;
        return savedAccounts.find(acc => acc.email === activeAccountEmail);
    }

    function updateUIForCurrentUser() {
        const currentUser = getCurrentUser();
        if (currentUser) {
            menuUsername.textContent = currentUser.name;
            headerProfileBtn.classList.add('logged-in');
        } else {
            menuUsername.textContent = 'Guest';
            headerProfileBtn.classList.remove('logged-in');
        }
    }

    function loadChatHistory() {
        historyContainer.innerHTML = '';
        const history = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || [];
        history.forEach(item => { const historyItem = document.createElement('a'); historyItem.href = "#"; historyItem.className = 'history-item'; historyItem.innerHTML = `<i class="fas fa-comment-dots"></i> ${item}`; historyItem.setAttribute('data-command', item); historyContainer.appendChild(historyItem); });
    }

    function saveToHistory(message) {
        let history = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY)) || [];
        history = [message, ...history.filter(item => item !== message)];
        if (history.length > 5) history = history.slice(0, 5);
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
        loadChatHistory();
    }
    
    // --- 7. Voice Recognition ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.onstart = () => micBtn.classList.add('active');
        recognition.onresult = (event) => { userInput.value = event.results[0][0].transcript; userInput.dispatchEvent(new Event('input')); sendMessage(); };
        recognition.onerror = (event) => addMessage(`Voice recognition error: ${event.error}`, 'bot');
        recognition.onend = () => micBtn.classList.remove('active');
    } else {
        micBtn.style.display = 'none';
    }

    // --- 8. Event Listener Setup ---
    setupModal(settingsModal, settingsBtn);
    setupModal(profileModal, null);
    setupModal(loginModal, null);

    headerProfileBtn.addEventListener('click', () => {
        profileModal.classList.add('show-modal');
        renderAccountList();
    });

    menuBtn.addEventListener('click', (event) => { chatMenu.classList.toggle('show'); event.stopPropagation(); });
    window.addEventListener('click', (event) => { if (!chatMenu.contains(event.target) && !menuBtn.contains(event.target)) { chatMenu.classList.remove('show'); } });
    historyContainer.addEventListener('click', (event) => { const commandItem = event.target.closest('.history-item'); if (commandItem) { const command = commandItem.getAttribute('data-command'); userInput.value = command; sendMessage(); chatMenu.classList.remove('show'); } });
    
    personaliseBtn.addEventListener('click', () => { settingsMainView.style.display = 'none'; settingsPersonaliseView.style.display = 'block'; });
    settingsBackBtn.addEventListener('click', () => { settingsPersonaliseView.style.display = 'none'; settingsMainView.style.display = 'block'; });
    manageProfileBtn.addEventListener('click', () => {
        settingsModal.classList.remove('show-modal');
        profileModal.classList.add('show-modal');
        renderAccountList();
    });
    clearChatBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to clear the entire chat history?")) {
            chatMessages.innerHTML = '';
            localStorage.removeItem(CHAT_HISTORY_KEY);
            loadChatHistory();
            addMessage("Chat and history cleared.", 'bot');
            settingsModal.classList.remove('show-modal');
        }
    });

    accountList.addEventListener('click', (event) => {
        const accountItem = event.target.closest('.account-item');
        const editButton = event.target.closest('.edit-profile-btn-small');
        const deleteButton = event.target.closest('.delete-account-btn');
        if (deleteButton) {
            const itemToDelete = deleteButton.parentElement;
            const emailToDelete = itemToDelete.dataset.email;
            if (confirm(`Are you sure you want to remove the account ${emailToDelete}? This cannot be undone.`)) {
                savedAccounts = savedAccounts.filter(acc => acc.email !== emailToDelete);
                localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(savedAccounts));
                renderAccountList();
                addMessage(`Account ${emailToDelete} has been removed.`, 'bot');
            }
        } else if (editButton) {
            const currentUser = getCurrentUser();
            const newName = prompt("Please enter your new name:", currentUser.name);
            if (newName && newName.trim() !== "") {
                currentUser.name = newName.trim();
                localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(savedAccounts));
                updateUIForCurrentUser();
                renderAccountList();
                addMessage(`Profile name updated to ${currentUser.name}.`, 'bot');
            }
        } else if (accountItem) {
            const email = accountItem.dataset.email;
            if (email !== activeAccountEmail) { switchAccount(email); }
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = emailInput.value;
        const password = document.getElementById('password').value;
        if (email && password) {
            let account = savedAccounts.find(acc => acc.email === email);
            if (!account) { const name = email.split('@')[0]; account = { email: email, name: name.charAt(0).toUpperCase() + name.slice(1) }; savedAccounts.push(account); }
            activeAccountEmail = email;
            localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(savedAccounts));
            localStorage.setItem(ACTIVE_ACCOUNT_KEY, activeAccountEmail);
            updateUIForCurrentUser();
            addMessage(`Welcome, ${account.name}! You are now logged in.`, 'bot');
            loginModal.classList.remove('show-modal');
            loginForm.reset();
        } else {
            alert("Please enter both email and password.");
        }
    });
    addAccountBtn.addEventListener('click', () => {
        profileModal.classList.remove('show-modal');
        loginModal.classList.add('show-modal');
    });
    logoutBtn.addEventListener('click', () => {
        if (activeAccountEmail) {
            const loggedOutUser = getCurrentUser().name;
            activeAccountEmail = null;
            localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
            updateUIForCurrentUser();
            addMessage(`You have successfully logged out, ${loggedOutUser}.`, 'bot');
            profileModal.classList.remove('show-modal');
        } else {
            addMessage("You are not currently logged in.", 'bot');
        }
    });
    
    themeRadios.forEach(radio => {
        radio.addEventListener('change', () => { localStorage.setItem(THEME_KEY, radio.value); applyTheme(radio.value); });
    });
    systemThemeWatcher.addEventListener('change', handleSystemThemeChange);
    languageSelect.addEventListener('change', () => {
        const selectedLang = languageSelect.value;
        localStorage.setItem(LANGUAGE_KEY, selectedLang);
        setLanguage(selectedLang);
        addMessage(`Language changed to: ${languageSelect.options[languageSelect.selectedIndex].text}.`, 'bot');
    });
    
    userInput.addEventListener('input', () => {
        if (userInput.value.trim() !== '') {
            sendBtn.classList.add('visible');
            sendBtn.classList.remove('hidden');
        } else {
            sendBtn.classList.add('hidden');
            sendBtn.classList.remove('visible');
        }
    });
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && userInput.value.trim() !== '') {
            sendMessage();
        }
    });
    micBtn.addEventListener('click', () => { if (recognition) { try { recognition.start(); } catch(e) { console.error(e); } } });

    detectDiseaseBtn.addEventListener('click', () => {
        diseaseImageUpload.click();
    });

    diseaseImageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                addMessage(null, 'user', e.target.result);
                setTimeout(() => {
                    addMessage("Thank you for the image. Analyzing for potential diseases...", 'bot');
                }, 1000);
            };
            reader.readAsDataURL(file);
        }
        event.target.value = null;
    });

    // --- 9. Initial Page Load ---
    function initializeApp() {
        savedAccounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
        activeAccountEmail = localStorage.getItem(ACTIVE_ACCOUNT_KEY);
        const savedTheme = localStorage.getItem(THEME_KEY) || 'system';
        const savedLang = localStorage.getItem(LANGUAGE_KEY) || 'system';
        
        document.querySelector(`input[name="theme"][value="${savedTheme}"]`).checked = true;
        languageSelect.value = savedLang;
        
        applyTheme(savedTheme);
        setLanguage(savedLang);
        updateUIForCurrentUser();
        loadChatHistory();
        loadFAQs();

        if (userInput.value.trim() !== '') {
            sendBtn.classList.add('visible');
            sendBtn.classList.remove('hidden');
        } else {
            sendBtn.classList.add('hidden');
            sendBtn.classList.remove('visible');
        }

        addMessage(getSimulatedBotResponse("hello"), 'bot');
    }
    initializeApp();
});