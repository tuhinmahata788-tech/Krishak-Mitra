console.log('Script.js loaded successfully!');

// Language translations
const translations = {
    en: {
        // Navigation
        home: "Home",
        diseaseDetection: "Disease Detection",
        cropPrediction: "Crop Prediction",
        aiChat: "AI Chat",
        profile: "Profile",
        
        // Main content
        welcomeTitle: "Krishi Budhhi",
        welcomeSubtitle: "Your AI-powered digital farming assistant for disease detection, crop prediction, and smart agricultural solutions.",
        
        // Section Headers
        smartFarmingSolutions: "🌾 Smart Farming Solutions",
        smartFarmingDesc: "Harness the power of AI to revolutionize your farming practices with cutting-edge technology.",
        
        // Feature Cards
        diseaseDetectionCard: "Disease Detection",
        diseaseDetectionDesc: "Identify plant diseases instantly with our AI-powered image recognition system. Get accurate diagnoses and treatment recommendations.",
        cropPredictionCard: "Crop Prediction",
        cropPredictionDesc: "Discover the best crops for your land based on soil type, climate conditions, and market demand using our predictive analytics.",
        farmingTipsCard: "Farming Tips",
        farmingTipsDesc: "Access personalized farming advice, seasonal recommendations, and best practices from agricultural experts.",
        
        // Call to Action
        chatNow: "Chat Now",
        learnMore: "Learn More",
        
        // AI Chat Section
        aiChatTitle: "Krishi Budhhi AI",
        aiChatSubtitle: "Your farming assistant",
        chatPlaceholder: "Ask me about farming, crops, diseases...",
        sendButton: "Send",
        chatOnlineStatus: "Online",
        
        // About Section
        aboutTitle: "About Krishi Budhhi",
        aboutSubtitle: "Empowering farmers with AI-driven technology for sustainable and profitable agriculture.",
        ourMission: "Our Mission",
        missionText: "To revolutionize agriculture by providing farmers with intelligent, accessible, and actionable insights that increase productivity, reduce costs, and promote sustainable farming practices.",
        ourTechnology: "Our Technology",
        technologyText: "Powered by advanced machine learning algorithms, computer vision, and agricultural expertise, Krishi Budhhi delivers precise crop recommendations and disease detection capabilities.",
        
        // Features Section
        featuresTitle: "Key Features",
        
        // Testimonials
        testimonialsTitle: "What Farmers Say",
        
        // Contact Section
        contactTitle: "Get In Touch",
        contactSubtitle: "Have questions or feedback? We'd love to hear from you!",
        
        // Quick actions
        quickActions: "Quick Actions",
        cropRecommendation: "Crop Recommendation",
        weatherInfo: "Weather Info",
        marketPrices: "Market Prices",
        farmingTips: "Farming Tips",
        
        // About section
        aboutTitle: "About Krishi Budhhi",
        aboutSubtitle: "Empowering farmers with AI-driven technology for sustainable and profitable agriculture.",
        missionTitle: "Our Mission",
        missionText: "To revolutionize agriculture by providing farmers with intelligent, accessible, and actionable insights that increase productivity, reduce costs, and promote sustainable farming practices.",
        technologyTitle: "Our Technology",
        technologyText: "Powered by advanced machine learning algorithms, computer vision, and agricultural expertise, Krishi Budhhi delivers precise crop recommendations and disease detection capabilities.",
        
        // Disease Detection
        diseaseDetectionTitle: "Plant Disease Detection",
        uploadImage: "Upload Plant Image",
        analyzeButton: "Analyze Disease",
        commonDiseases: "Common Plant Diseases",
        
        // Crop Prediction
        cropPredictionTitle: "Smart Crop Prediction",
        environmentalData: "Environmental Data",
        predictButton: "Predict Best Crops",
        
        // Login
        loginTitle: "Welcome to Krishi Budhhi",
        loginSubtitle: "Your smart farming companion",
        username: "Username",
        password: "Password",
        loginButton: "Login",
        
        // Profile dropdown
        switchAccount: "Switch Account",
        logout: "Logout",
        
        // Additional UI elements
        about: "About",
        diseaseDetectionSubtitle: "Get an instant diagnosis for crop diseases. Our AI analyzes leaf images to identify issues and recommend solutions.",
        analyzeButton: "Analyze Image",
        clickToLearnMore: "Click on any disease to learn more about symptoms and treatment"
    },
    hi: {
        // Navigation
        home: "होम",
        diseaseDetection: "रोग पहचान",
        cropPrediction: "फसल भविष्यवाणी",
        aiChat: "एआई चैट",
        profile: "प्रोफाइल",
        
        // Main content
        welcomeTitle: "कृषि बुद्धि",
        welcomeSubtitle: "रोग पहचान, फसल भविष्यवाणी, और स्मार्ट कृषि समाधानों के लिए आपका एआई-संचालित डिजिटल कृषि सहायक।",
        
        // Section Headers
        smartFarmingSolutions: "🌾 स्मार्ट खेती समाधान",
        smartFarmingDesc: "अत्याधुनिक तकनीक के साथ अपनी खेती की प्रथाओं में क्रांति लाने के लिए एआई की शक्ति का उपयोग करें।",
        
        // Feature Cards
        diseaseDetectionCard: "रोग पहचान",
        diseaseDetectionDesc: "हमारी एआई-संचालित छवि पहचान प्रणाली के साथ पौधों के रोगों को तुरंत पहचानें। सटीक निदान और उपचार सिफारिशें प्राप्त करें।",
        cropPredictionCard: "फसल भविष्यवाणी",
        cropPredictionDesc: "मिट्टी के प्रकार, जलवायु परिस्थितियों और बाजार की मांग के आधार पर अपनी भूमि के लिए सर्वोत्तम फसलों की खोज करें।",
        farmingTipsCard: "खेती के सुझाव",
        farmingTipsDesc: "व्यक्तिगत खेती सलाह, मौसमी सिफारिशें और कृषि विशेषज्ञों से सर्वोत्तम प्रथाओं तक पहुंचें।",
        
        // Call to Action
        chatNow: "अभी चैट करें",
        learnMore: "और जानें",
        
        // AI Chat Section
        aiChatTitle: "कृषि बुद्धि एआई",
        aiChatSubtitle: "आपका कृषि सहायक",
        chatPlaceholder: "कृषि, फसलों, बीमारियों के बारे में पूछें...",
        sendButton: "भेजें",
        chatOnlineStatus: "ऑनलाइन",
        
        // About Section
        aboutTitle: "कृषि बुद्धि के बारे में",
        aboutSubtitle: "टिकाऊ और लाभदायक कृषि के लिए किसानों को एआई-संचालित तकनीक से सशक्त बनाना।",
        ourMission: "हमारा मिशन",
        missionText: "किसानों को बुद्धिमान, सुलभ और क्रियाशील अंतर्दृष्टि प्रदान करके कृषि में क्रांति लाना जो उत्पादकता बढ़ाती है, लागत कम करती है और टिकाऊ कृषि प्रथाओं को बढ़ावा देती है।",
        ourTechnology: "हमारी तकनीक",
        technologyText: "उन्नत मशीन लर्निंग एल्गोरिदम, कंप्यूटर विजन और कृषि विशेषज्ञता द्वारा संचालित, कृषि बुद्धि सटीक फसल सिफारिशें और रोग पहचान क्षमताएं प्रदान करती है।",
        
        // Features Section
        featuresTitle: "मुख्य विशेषताएं",
        
        // Testimonials
        testimonialsTitle: "किसान क्या कहते हैं",
        
        // Contact Section
        contactTitle: "संपर्क करें",
        contactSubtitle: "कोई प्रश्न या प्रतिक्रिया है? हम आपसे सुनना चाहेंगे!",
        
        // Quick actions
        quickActions: "त्वरित कार्य",
        cropRecommendation: "फसल सिफारिश",
        weatherInfo: "मौसम की जानकारी",
        marketPrices: "बाजार भाव",
        farmingTips: "खेती के टिप्स",
        
        // About section
        aboutTitle: "कृषि बुद्धि के बारे में",
        aboutSubtitle: "टिकाऊ और लाभदायक कृषि के लिए एआई-संचालित तकनीक के साथ किसानों को सशक्त बनाना।",
        missionTitle: "हमारा मिशन",
        missionText: "उत्पादकता बढ़ाने, लागत कम करने और टिकाऊ कृषि प्रथाओं को बढ़ावा देने वाली बुद्धिमान, सुलभ और कार्यात्मक अंतर्दृष्टि प्रदान करके कृषि में क्रांति लाना।",
        technologyTitle: "हमारी तकनीक",
        technologyText: "उन्नत मशीन लर्निंग एल्गोरिदम, कंप्यूटर विज़न और कृषि विशेषज्ञता द्वारा संचालित, कृषि बुद्धि सटीक फसल सिफारिशें और रोग पहचान क्षमताएं प्रदान करती है।",
        
        // Disease Detection
        diseaseDetectionTitle: "पौधों की बीमारी की पहचान",
        uploadImage: "पौधे की तस्वीर अपलोड करें",
        analyzeButton: "बीमारी का विश्लेषण करें",
        commonDiseases: "आम पौधों की बीमारियां",
        
        // Crop Prediction
        cropPredictionTitle: "स्मार्ट फसल भविष्यवाणी",
        environmentalData: "पर्यावरणीय डेटा",
        predictButton: "सर्वोत्तम फसलों की भविष्यवाणी करें",
        
        // Login
        loginTitle: "कृषि बुद्धि में आपका स्वागत है",
        loginSubtitle: "आपका स्मार्ट कृषि साथी",
        username: "उपयोगकर्ता नाम",
        password: "पासवर्ड",
        loginButton: "लॉगिन",
        
        // Profile dropdown
        switchAccount: "खाता बदलें",
        logout: "लॉगआउट",
        
        // Additional UI elements
        about: "के बारे में",
        diseaseDetectionSubtitle: "फसल की बीमारियों के लिए तुरंत निदान प्राप्त करें। हमारा AI समस्याओं की पहचान करने और समाधान सुझाने के लिए पत्ती की छवियों का विश्लेषण करता है।",
        analyzeButton: "छवि का विश्लेषण करें",
        clickToLearnMore: "लक्षण और उपचार के बारे में अधिक जानने के लिए किसी भी बीमारी पर क्लिक करें"
    },
    ml: {
        // Navigation
        home: "ഹോം",
        diseaseDetection: "രോഗ നിർണയം",
        cropPrediction: "വിള പ്രവചനം",
        aiChat: "എഐ ചാറ്റ്",
        profile: "പ്രൊഫൈൽ",
        
        // Main content
        welcomeTitle: "കൃഷി ബുദ്ധി",
        welcomeSubtitle: "രോഗ നിർണയം, വിള പ്രവചനം, സ്മാർട്ട് കാർഷിക പരിഹാരങ്ങൾക്കായി നിങ്ങളുടെ AI-പവർഡ് ഡിജിറ്റൽ കാർഷിക സഹായി.",
        
        // AI Chat
        aiChatTitle: "കൃഷി ബുദ്ധി AI",
        aiChatSubtitle: "നിങ്ങളുടെ കാർഷിക സഹായി",
        chatPlaceholder: "കൃഷി, വിളകൾ, രോഗങ്ങളെക്കുറിച്ച് ചോദിക്കുക...",
        sendButton: "അയയ്ക്കുക",
        
        // Quick actions
        quickActions: "പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ",
        cropRecommendation: "വിള ശുപാർശ",
        weatherInfo: "കാലാവസ്ഥാ വിവരങ്ങൾ",
        marketPrices: "മാർക്കറ്റ് വിലകൾ",
        farmingTips: "കാർഷിക നുറുങ്ങുകൾ",
        
        // About section
        aboutTitle: "കൃഷി ബുദ്ധിയെക്കുറിച്ച്",
        aboutSubtitle: "സുസ്ഥിരവും ലാഭകരമായ കൃഷിക്കായി AI-ഡ്രിവൻ സാങ്കേതികവിദ്യ ഉപയോഗിച്ച് കർഷകരെ ശാക്തീകരിക്കുന്നു.",
        missionTitle: "ഞങ്ങളുടെ ദൗത്യം",
        missionText: "ഉൽപ്പാദനക്ഷമത വർധിപ്പിക്കുകയും ചെലവ് കുറയ്ക്കുകയും സുസ്ഥിര കാർഷിക രീതികൾ പ്രോത്സാഹിപ്പിക്കുകയും ചെയ്യുന്ന ബുദ്ധിപരവും ആക്സസ് ചെയ്യാവുന്നതും പ്രവർത്തനക്ഷമവുമായ ഉൾക്കാഴ്ചകൾ കർഷകർക്ക് നൽകിക്കൊണ്ട് കൃഷിയിൽ വിപ്ലവം സൃഷ്ടിക്കുക.",
        technologyTitle: "ഞങ്ങളുടെ സാങ്കേതികവിദ്യ",
        technologyText: "വിപുലമായ മെഷീൻ ലേണിംഗ് അൽഗോരിതങ്ങൾ, കമ്പ്യൂട്ടർ വിഷൻ, കാർഷിക വൈദഗ്ധ്യം എന്നിവയാൽ പ്രവർത്തിക്കുന്ന കൃഷി ബുദ്ധി കൃത്യമായ വിള ശുപാർശകളും രോഗ നിർണയ കഴിവുകളും നൽകുന്നു.",
        
        // Disease Detection
        diseaseDetectionTitle: "സസ്യ രോഗ നിർണയം",
        uploadImage: "സസ്യ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
        analyzeButton: "രോഗം വിശകലനം ചെയ്യുക",
        commonDiseases: "സാധാരണ സസ്യ രോഗങ്ങൾ",
        
        // Crop Prediction
        cropPredictionTitle: "സ്മാർട്ട് വിള പ്രവചനം",
        environmentalData: "പാരിസ്ഥിതിക ഡാറ്റ",
        predictButton: "മികച്ച വിളകൾ പ്രവചിക്കുക",
        
        // Login
        loginTitle: "കൃഷി ബുദ്ധിയിലേക്ക് സ്വാഗതം",
        loginSubtitle: "നിങ്ങളുടെ സ്മാർട്ട് കാർഷിക കൂട്ടാളി",
        username: "ഉപയോക്തൃനാമം",
        password: "പാസ്‌വേഡ്",
        loginButton: "ലോഗിൻ",
        
        // Profile dropdown
        switchAccount: "അക്കൗണ്ട് മാറുക",
        logout: "ലോഗൗട്ട്",
        
        // Additional UI elements
        about: "കുറിച്ച്",
        diseaseDetectionSubtitle: "വിള രോഗങ്ങൾക്ക് തൽക്ഷണ രോഗനിർണയം നേടുക. പ്രശ്നങ്ങൾ തിരിച്ചറിയാനും പരിഹാരങ്ങൾ ശുപാർശ ചെയ്യാനും ഞങ്ങളുടെ AI ഇല ചിത്രങ്ങൾ വിശകലനം ചെയ്യുന്നു.",
        analyzeButton: "ചിത്രം വിശകലനം ചെയ്യുക",
        clickToLearnMore: "ലക്ഷണങ്ങളും ചികിത്സയും കുറിച്ച് കൂടുതലറിയാൻ ഏതെങ്കിലും രോഗത്തിൽ ക്ലിക്ക് ചെയ്യുക"
    }
};

// Current language state
let currentLanguage = localStorage.getItem('krishiBudhhiLanguage') || 'en';

// Language switching function
function switchLanguage(lang) {
    console.log('Switching language to:', lang);
    currentLanguage = lang;
    localStorage.setItem('krishiBudhhiLanguage', lang);
    console.log('Language set in localStorage:', localStorage.getItem('krishiBudhhiLanguage'));
    updateLanguageDisplay();
    translatePage();
    console.log('Language switched to:', lang);
}

// Update language toggle display
function updateLanguageDisplay() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        }
    });
}

// Translate page elements
function translatePage() {
    console.log('Translating page to:', currentLanguage);
    const elements = document.querySelectorAll('[data-translate]');
    console.log('Found elements with data-translate:', elements.length);
    
    elements.forEach((element, index) => {
        const key = element.getAttribute('data-translate');
        console.log(`Element ${index + 1}:`, {
            nodeName: element.nodeName,
            key: key,
            currentText: element.textContent || element.placeholder,
            hasTranslation: !!(translations[currentLanguage] && translations[currentLanguage][key])
        });
        
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translations[currentLanguage][key];
                console.log(`Updated input placeholder for key '${key}':`, element.placeholder);
            } else {
                element.textContent = translations[currentLanguage][key];
                console.log(`Updated text for key '${key}':`, element.textContent);
            }
        } else {
            console.warn(`No translation found for key '${key}' in language '${currentLanguage}'`);
        }
    });
    
    console.log('Translation complete');
}

// Initialize page function
function initializePage() {
    // Check if user is logged in (only for non-login pages)
    if (!window.location.pathname.includes('login.html')) {
        const isLoggedIn = localStorage.getItem('krishiBudhhiLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'login.html';
            return;
        }
    }

    // --- COMMON ELEMENTS (for all pages) ---
    const htmlElement = document.documentElement;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const themeIconMoon = document.getElementById('theme-icon-moon');
    const themeIconSun = document.getElementById('theme-icon-sun');
    const languageToggle = document.getElementById('language-toggle');
    const languageToggleSwitch = document.getElementById('language-toggle-switch');
    const langEN = document.getElementById('lang-en');
    const langHI = document.getElementById('lang-hi');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const logoutButton = document.getElementById('logout-button');

    // --- PAGE-SPECIFIC ELEMENTS ---
    const pageContainer = document.getElementById('page-container');
    const homePageTemplate = document.getElementById('home-page-template');
    
    // Disease Detection Page
    const diseaseUploadInput = document.getElementById('disease-upload-input');
    const uploadButton = document.getElementById('upload-button');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    const analyzeButton = document.getElementById('analyze-button');
    const resultContainer = document.getElementById('result-container');

    // Crop Prediction Page
    const cropForm = document.getElementById('crop-form');
    const cropResultContainer = document.getElementById('crop-result-container');

    // --- State Management ---
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    // --- COMMON FUNCTIONS (for all pages) ---
    const applyDarkMode = () => {
        if (isDarkMode) {
            htmlElement.classList.add('dark');
            if (themeIconMoon) themeIconMoon.classList.add('hidden');
            if (themeIconSun) themeIconSun.classList.remove('hidden');
        } else {
            htmlElement.classList.remove('dark');
            if (themeIconMoon) themeIconMoon.classList.remove('hidden');
            if (themeIconSun) themeIconSun.classList.add('hidden');
        }
    };
    
    const setActiveLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('header a.nav-link, header a.px-3').forEach(link => {
             const linkPage = (link.getAttribute('href') || '').split('/').pop();
             if (linkPage === currentPage) {
                 link.classList.add('active');
             } else {
                 link.classList.remove('active');
             }
        });
    };

    // --- EVENT LISTENERS (for all pages) ---
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            localStorage.setItem('darkMode', isDarkMode);
            applyDarkMode();
        });
    }

    // Initialize language on page load
    updateLanguageDisplay();
    translatePage();

    // Add event listeners for language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const lang = btn.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            switchLanguage(lang);
        });
    });
    
    console.log('Language buttons initialized:', langButtons.length);

    // Profile dropdown functionality
    const profileButton = document.getElementById('profile-button');
    const profileDropdown = document.getElementById('profile-dropdown');
    const logoutOption = document.getElementById('logout-option');
    
    if (profileButton && profileDropdown) {
        profileButton.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }

    // Profile dropdown button functionality
    const profileManagementBtn = document.getElementById('profile-management-btn');
    const manageSubscriptionBtn = document.getElementById('manage-subscription-btn');
    const switchAccountBtn = document.getElementById('switch-account-btn');
    
    if (switchAccountBtn) {
        switchAccountBtn.addEventListener('click', function() {
            localStorage.removeItem('krishiBudhhiLoggedIn');
            localStorage.removeItem('krishiBudhhiUsername');
            window.location.href = 'login.html';
        });
    }
    
    // Logout functionality (for both old logout button and new dropdown option)
    if (logoutOption) {
        logoutOption.addEventListener('click', function() {
            localStorage.removeItem('krishiBudhhiLoggedIn');
            localStorage.removeItem('krishiBudhhiUsername');
            window.location.href = 'login.html';
        });
    }
    
    if(logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('krishakMitraLoggedIn');
            window.location.href = 'login.html';
        });
    }
    
    // --- PAGE-SPECIFIC LOGIC ---

    // 1. Home Page Logic (index.html)
    if (pageContainer && homePageTemplate) {
        const renderPlaceholderPage = (title, description) => {
            pageContainer.innerHTML = `<div class="page w-full h-screen flex items-center justify-center pt-16 text-center" style="display: flex;"><div class="fade-in"><h1 class="text-4xl font-bold">${title}</h1><p class="mt-4 text-lg text-gray-600 dark:text-gray-400">${description}</p></div></div>`;
        };
        
        const renderHomePage = () => {
            pageContainer.innerHTML = '';
            const homePageContent = homePageTemplate.content.cloneNode(true);
            pageContainer.appendChild(homePageContent);
            
            const homePageDiv = document.getElementById('home-page');
            homePageDiv.style.display = 'flex';
            
            // Update greeting with actual username
            const greetingMessage = document.getElementById('greeting-message');
            const storedUsername = localStorage.getItem('krishiBudhhiUsername');
            if (greetingMessage && storedUsername) {
                greetingMessage.textContent = `Hello ${storedUsername}!`;
            }
            
            // --- SLIDESHOW LOGIC ---
            const slideshowImages = document.querySelectorAll('.slideshow-image');
            let currentSlideIndex = 0;

            if (slideshowImages.length > 1) {
                // Initialize: make first image visible, others hidden
                slideshowImages.forEach((img, index) => {
                    if (index === 0) {
                        img.classList.remove('opacity-0');
                        img.classList.add('opacity-30');
                    } else {
                        img.classList.add('opacity-0');
                        img.classList.remove('opacity-30');
                    }
                });

                setInterval(() => {
                    // Hide current slide
                    slideshowImages[currentSlideIndex].classList.add('opacity-0');
                    slideshowImages[currentSlideIndex].classList.remove('opacity-30');
                    
                    // Move to the next slide
                    currentSlideIndex = (currentSlideIndex + 1) % slideshowImages.length;
                    
                    // Show the new slide
                    slideshowImages[currentSlideIndex].classList.remove('opacity-0');
                    slideshowImages[currentSlideIndex].classList.add('opacity-30');

                }, 4000); // Change image every 4 seconds
            }
            
            const chatForm = document.getElementById('chat-form');
            const userInput = document.getElementById('user-input');
            const chatMessagesContainer = document.getElementById('chat-messages');
            const fileUploadBtn = document.getElementById('file-upload-btn');
            const chatFileInput = document.getElementById('chat-file-input');
            const voiceInputBtn = document.getElementById('voice-input-btn');
            
            // Auto-resize textarea
            if (userInput && userInput.tagName === 'TEXTAREA') {
                userInput.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = Math.min(this.scrollHeight, 128) + 'px';
                });
                
                // Handle Enter key for sending messages
                userInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        chatForm.dispatchEvent(new Event('submit'));
                    }
                });
            }
            
            // Voice recognition setup
            let recognition = null;
            let isListening = false;
            
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';
                
                recognition.onstart = () => {
                    isListening = true;
                    voiceInputBtn.classList.add('text-red-500', 'animate-pulse');
                    voiceInputBtn.classList.remove('text-gray-400');
                };
                
                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    userInput.value = transcript;
                    // Auto-submit the transcribed text
                    setTimeout(() => {
                        if (userInput.value.trim()) {
                            chatForm.dispatchEvent(new Event('submit'));
                        }
                    }, 500);
                };
                
                recognition.onend = () => {
                    isListening = false;
                    voiceInputBtn.classList.remove('text-red-500', 'animate-pulse');
                    voiceInputBtn.classList.add('text-gray-400');
                };
                
                recognition.onerror = (event) => {
                    isListening = false;
                    voiceInputBtn.classList.remove('text-red-500', 'animate-pulse');
                    voiceInputBtn.classList.add('text-gray-400');
                    console.error('Speech recognition error:', event.error);
                };
            }

            const addMessage = (text, sender, isFile = false, fileName = '') => {
                const wrapper = document.createElement('div');
                wrapper.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`;
                const bubble = document.createElement('div');
                bubble.className = `max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow ${sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-800 dark:text-gray-200 rounded-bl-none'}`;
                
                if (isFile) {
                    bubble.innerHTML = `
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                            <span class="text-sm">${fileName}</span>
                        </div>
                        ${text ? `<p class="mt-2">${text}</p>` : ''}
                    `;
                } else {
                    bubble.textContent = text;
                }
                
                wrapper.appendChild(bubble);
                if (chatMessagesContainer) {
                    chatMessagesContainer.appendChild(wrapper);
                    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
                }
            };

            // File upload functionality
            if (fileUploadBtn && chatFileInput) {
                fileUploadBtn.addEventListener('click', () => {
                    chatFileInput.click();
                });
                
                chatFileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const fileName = file.name;
                        const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
                        addMessage(`Uploaded: ${fileName} (${fileSize} MB)`, 'user', true, fileName);
                        
                        // Simulate AI response for file upload
                        setTimeout(() => {
                            if (file.type.startsWith('image/')) {
                                addMessage("I can see your image! If this is a plant photo, I can help identify diseases or provide care advice. What would you like to know about it?", 'bot');
                            } else {
                                addMessage(`I've received your file: ${fileName}. How can I help you with this document?`, 'bot');
                            }
                        }, 1000);
                        
                        // Clear the input
                        chatFileInput.value = '';
                    }
                });
            }
            
            // Voice input functionality
            if (voiceInputBtn) {
                voiceInputBtn.addEventListener('click', () => {
                    if (!recognition) {
                        addMessage("Voice input is not supported in your browser. Please try typing your message.", 'bot');
                        return;
                    }
                    
                    if (isListening) {
                        recognition.stop();
                    } else {
                        try {
                            recognition.start();
                        } catch (error) {
                            console.error('Speech recognition error:', error);
                            addMessage("Unable to start voice recognition. Please check your microphone permissions.", 'bot');
                        }
                    }
                });
            }
            
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const userText = userInput.value.trim();
                if (userText) {
                    addMessage(userText, 'user');
                    userInput.value = '';
                    setTimeout(() => addMessage("Thank you for your query. I am processing...", 'bot'), 1000);
                }
            });

            // Quick question buttons functionality
            const quickQuestionButtons = document.querySelectorAll('.quick-question');
            quickQuestionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const question = button.getAttribute('data-question');
                    if (question) {
                        addMessage(question, 'user');
                        setTimeout(() => {
                            let response = "Thank you for your question. I'm processing your request...";
                            if (question.includes('crops')) {
                                response = "Based on your location and season, I recommend considering crops like wheat, rice, or vegetables. For specific recommendations, please provide your soil type and climate conditions.";
                            } else if (question.includes('diseases')) {
                                response = "To identify plant diseases, look for symptoms like discolored leaves, spots, wilting, or unusual growth. You can also use our Disease Detection feature to upload plant images for AI analysis.";
                            } else if (question.includes('weather')) {
                                response = "Weather planning is crucial for farming success. Monitor rainfall patterns, temperature changes, and seasonal forecasts. I can help you plan irrigation and planting schedules based on weather data.";
                            } else if (question.includes('soil')) {
                                response = "Improving soil quality involves regular testing, adding organic matter, proper crop rotation, and balanced fertilization. Consider composting and cover crops to enhance soil health naturally.";
                            }
                            addMessage(response, 'bot');
                        }, 1500);
                    }
                });
            });

            // Add suggestion button functionality
            const suggestionButtons = document.querySelectorAll('.suggestion-btn');
            suggestionButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const question = button.textContent.trim();
                    userInput.value = question;
                    chatForm.dispatchEvent(new Event('submit'));
                });
            });
            
            // Initialize chat with welcome message if no messages exist
            if (chatMessagesContainer && chatMessagesContainer.children.length === 1) {
                // Keep the existing welcome message structure
            }
        };

        allNavLinks.forEach(link => {
            if (link.href && link.href.includes('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderPlaceholderPage(link.hash.substring(1), 'This feature is under development.');
                });
            }
        });
        renderHomePage();
    }

    // 2. Disease Detection Page Logic
    if (uploadButton && diseaseUploadInput) {
        uploadButton.addEventListener('click', () => diseaseUploadInput.click());
        diseaseUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                imagePreview.src = URL.createObjectURL(file);
                previewContainer.classList.remove('hidden');
                resultContainer.classList.add('hidden');
            }
        });
        analyzeButton.addEventListener('click', () => {
            resultContainer.innerHTML = `
                <div class="fade-in p-4 border rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Analysis Result:</h2>
                    <p class="mt-2 text-lg text-red-600 dark:text-red-400 font-semibold">Potato Late Blight</p>
                    <p class="mt-2 text-gray-600 dark:text-gray-400">Our analysis indicates a 95% probability of Late Blight. Apply a fungicide containing mancozeb or chlorothalonil immediately. Ensure proper plant spacing for better air circulation.</p>
                </div>
            `;
            resultContainer.classList.remove('hidden');
        });
    }
    
    // 3. Crop Prediction Page Logic
    if (cropForm) {
        cropForm.addEventListener('submit', (e) => {
            e.preventDefault();
            cropResultContainer.innerHTML = `
                <div class="fade-in p-4 border rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Prediction Result:</h2>
                    <p class="mt-2 text-3xl text-green-600 dark:text-green-400 font-bold">Rice (Paddy)</p>
                    <p class="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Based on the data, Rice is the most suitable crop. This choice is supported by the high rainfall and balanced soil nutrient levels provided.</p>
                </div>
            `;
            cropResultContainer.classList.remove('hidden');
        });
    }

    // --- INITIALIZE ON ALL PAGES ---
    applyDarkMode();
    setActiveLink();
    
    // Initialize language
    updateLanguageDisplay();
    translatePage();
}

// Chat input functionality
function setupChatInput() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const fileInput = document.getElementById('chat-file-input');
    const attachFileBtn = document.getElementById('attach-file-btn');
    const filePreview = document.getElementById('file-preview');
    const fileName = document.getElementById('file-name');
    const removeFileBtn = document.getElementById('remove-file-btn');
    let selectedFile = null;

    // Auto-resize textarea as user types
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Handle file selection
    attachFileBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            selectedFile = e.target.files[0];
            fileName.textContent = selectedFile.name;
            filePreview.classList.remove('hidden');
            userInput.placeholder = 'Add a message (optional)';
        }
    });

    // Remove selected file
    removeFileBtn.addEventListener('click', () => {
        selectedFile = null;
        fileInput.value = '';
        filePreview.classList.add('hidden');
        userInput.placeholder = 'Ask me about farming, crops, diseases...';
    });

    // Handle form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        
        if (!message && !selectedFile) return;

        // Here you would typically send the message and/or file to your backend
        console.log('Message:', message);
        if (selectedFile) {
            console.log('File selected:', selectedFile.name);
            // Reset file input after submission
            selectedFile = null;
            fileInput.value = '';
            filePreview.classList.add('hidden');
        }

        // Clear input and reset height
        userInput.value = '';
        userInput.style.height = 'auto';
        userInput.placeholder = 'Ask me about farming, crops, diseases...';
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    setupChatInput();
});
