document.addEventListener('DOMContentLoaded', () => {
    // --- AUTHENTICATION CHECK ---
    // This script runs on all pages. We need to enforce the login flow.
    const isLoginPage = window.location.pathname.endsWith('login.html');
    if (!isLoginPage && !localStorage.getItem('krishakMitraLoggedIn')) {
        // If the user is NOT on the login page and is NOT logged in,
        // redirect them to the login page.
        window.location.href = 'login.html';
        return; // Stop the script from running further on this page.
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

    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            languageToggleSwitch.classList.toggle('translate-x-6');
            langEN.classList.toggle('text-green-700');
            langEN.classList.toggle('text-gray-400');
            langHI.classList.toggle('text-green-700');
            langHI.classList.toggle('text-gray-400');

        });
    }

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

    // Logout functionality (for both old logout button and new dropdown option)
    if (logoutOption) {
        logoutOption.addEventListener('click', function() {
            localStorage.removeItem('krishakMitraLoggedIn');
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

            const addMessage = (text, sender) => {
                const wrapper = document.createElement('div');
                wrapper.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
                const bubble = document.createElement('div');
                bubble.className = `max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow ${sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-800 dark:text-gray-200 rounded-bl-none'}`;
                bubble.textContent = text;
                wrapper.appendChild(bubble);
                chatMessagesContainer.appendChild(wrapper);
                chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
            };

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

            addMessage("Hello! I'm your AI farming assistant. How can I help you with your agricultural needs today? 🌱", 'bot');
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
});
