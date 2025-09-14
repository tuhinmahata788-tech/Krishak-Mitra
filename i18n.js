// Internationalization (i18n) functionality for Krishi Budhhi
class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.translations = {};
        this.fallbackLanguage = 'en';
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.createLanguageSwitcher();
        this.translatePage();
        this.setupEventListeners();
    }

    async loadTranslations() {
        try {
            // Load English translations
            const enResponse = await fetch('./locales/en.json');
            this.translations.en = await enResponse.json();

            // Load Malayalam translations
            const mlResponse = await fetch('./locales/ml.json');
            this.translations.ml = await mlResponse.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback translations if files can't be loaded
            this.translations.en = { appName: "Krishi Budhhi" };
            this.translations.ml = { appName: "കൃഷി ബുദ്ധി" };
        }
    }

    createLanguageSwitcher() {
        // Create language switcher for all pages
        const headers = document.querySelectorAll('header nav');
        
        headers.forEach(header => {
            const rightSection = header.querySelector('.flex.items-center.space-x-4');
            if (rightSection && !rightSection.querySelector('.language-switcher')) {
                const languageSwitcher = document.createElement('div');
                languageSwitcher.className = 'language-switcher relative';
                languageSwitcher.innerHTML = `
                    <button id="language-button" class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white rounded-full hover:bg-white/20 transition-all duration-300">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                        </svg>
                        <span id="current-language-text">${this.currentLanguage === 'en' ? 'EN' : 'മല'}</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div id="language-dropdown" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 hidden">
                        <div class="py-2">
                            <button class="language-option flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-lang="en">
                                <span class="mr-3">🇺🇸</span>
                                <span>English</span>
                                <span class="ml-auto ${this.currentLanguage === 'en' ? '' : 'hidden'}" id="check-en">✓</span>
                            </button>
                            <button class="language-option flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" data-lang="ml">
                                <span class="mr-3">🇮🇳</span>
                                <span>മലയാളം</span>
                                <span class="ml-auto ${this.currentLanguage === 'ml' ? '' : 'hidden'}" id="check-ml">✓</span>
                            </button>
                        </div>
                    </div>
                `;
                
                // Insert before the dark mode toggle
                const darkModeToggle = rightSection.querySelector('#dark-mode-toggle');
                if (darkModeToggle) {
                    rightSection.insertBefore(languageSwitcher, darkModeToggle);
                } else {
                    rightSection.appendChild(languageSwitcher);
                }
            }
        });

        // Also add to sidebar if it exists
        const sidebar = document.querySelector('#sidebar-menu nav');
        if (sidebar && !sidebar.querySelector('.language-switcher-sidebar')) {
            const languageSwitcherSidebar = document.createElement('div');
            languageSwitcherSidebar.className = 'language-switcher-sidebar mt-4 pt-4 border-t border-gray-200 dark:border-gray-700';
            languageSwitcherSidebar.innerHTML = `
                <div class="px-3 py-2">
                    <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Language</p>
                    <button class="language-option-sidebar w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${this.currentLanguage === 'en' ? 'bg-gray-200 dark:bg-gray-700' : ''}" data-lang="en">
                        <span>🇺🇸</span>
                        <span>English</span>
                    </button>
                    <button class="language-option-sidebar w-full flex items-center space-x-3 px-3 py-2 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${this.currentLanguage === 'ml' ? 'bg-gray-200 dark:bg-gray-700' : ''}" data-lang="ml">
                        <span>🇮🇳</span>
                        <span>മലയാളം</span>
                    </button>
                </div>
            `;
            sidebar.appendChild(languageSwitcherSidebar);
        }
    }

    setupEventListeners() {
        // Header language switcher
        document.addEventListener('click', (e) => {
            const languageButton = document.getElementById('language-button');
            const languageDropdown = document.getElementById('language-dropdown');
            
            if (e.target.closest('#language-button')) {
                e.preventDefault();
                if (languageDropdown) {
                    languageDropdown.classList.toggle('hidden');
                }
            } else if (!e.target.closest('#language-dropdown')) {
                if (languageDropdown) {
                    languageDropdown.classList.add('hidden');
                }
            }

            // Language option selection
            if (e.target.closest('.language-option') || e.target.closest('.language-option-sidebar')) {
                e.preventDefault();
                const option = e.target.closest('.language-option') || e.target.closest('.language-option-sidebar');
                const newLang = option.dataset.lang;
                if (newLang && newLang !== this.currentLanguage) {
                    this.changeLanguage(newLang);
                }
                if (languageDropdown) {
                    languageDropdown.classList.add('hidden');
                }
            }
        });
    }

    changeLanguage(newLanguage) {
        if (this.translations[newLanguage]) {
            this.currentLanguage = newLanguage;
            localStorage.setItem('language', newLanguage);
            this.translatePage();
            this.updateLanguageSwitcher();
        }
    }

    updateLanguageSwitcher() {
        // Update header language switcher
        const currentLangText = document.getElementById('current-language-text');
        if (currentLangText) {
            currentLangText.textContent = this.currentLanguage === 'en' ? 'EN' : 'മല';
        }

        // Update checkmarks
        document.querySelectorAll('[id^="check-"]').forEach(check => {
            check.classList.add('hidden');
        });
        const activeCheck = document.getElementById(`check-${this.currentLanguage}`);
        if (activeCheck) {
            activeCheck.classList.remove('hidden');
        }

        // Update sidebar active state
        document.querySelectorAll('.language-option-sidebar').forEach(option => {
            option.classList.remove('bg-gray-200', 'dark:bg-gray-700');
            if (option.dataset.lang === this.currentLanguage) {
                option.classList.add('bg-gray-200', 'dark:bg-gray-700');
            }
        });
    }

    translatePage() {
        // Update document title
        const titleElement = document.querySelector('title');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-i18n');
            if (titleKey) {
                titleElement.textContent = this.t(titleKey);
            }
        }

        // Translate all elements with data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email')) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Translate elements with data-translate attributes (for nested keys)
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email')) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
    }

    t(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        // Navigate through nested keys
        for (const k of keys) {
            if (translation && typeof translation === 'object' && translation[k] !== undefined) {
                translation = translation[k];
            } else {
                // Fallback to English if key not found
                translation = this.translations[this.fallbackLanguage];
                for (const fallbackK of keys) {
                    if (translation && typeof translation === 'object' && translation[fallbackK] !== undefined) {
                        translation = translation[fallbackK];
                    } else {
                        return key; // Return key if translation not found
                    }
                }
                break;
            }
        }
        
        return typeof translation === 'string' ? translation : key;
    }

    // Method to get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Method to check if RTL language (not needed for Malayalam, but useful for future)
    isRTL() {
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        return rtlLanguages.includes(this.currentLanguage);
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}
