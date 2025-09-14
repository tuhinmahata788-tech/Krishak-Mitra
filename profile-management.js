// Profile Management JavaScript for Krishi Budhhi
console.log('Profile Management script loaded');

class ProfileManager {
    constructor() {
        this.profile = null;
        this.init();
    }

    init() {
        // Load user profile
        this.loadProfile();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Populate form fields
        this.populateForm();
        
        // Update display elements
        this.updateDisplay();
    }

    loadProfile() {
        this.profile = UserProfile.getProfile();
    }

    setupEventListeners() {
        // Profile form submission
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProfile();
            });
        }

        // Cancel button
        const cancelBtn = document.getElementById('cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.populateForm(); // Reset form to original values
            });
        }

        // Profile picture change
        const changePictureBtn = document.getElementById('change-picture-btn');
        const profilePictureInput = document.getElementById('profile-picture-input');
        
        if (changePictureBtn && profilePictureInput) {
            changePictureBtn.addEventListener('click', () => {
                profilePictureInput.click();
            });

            profilePictureInput.addEventListener('change', (e) => {
                this.handleProfilePictureChange(e);
            });
        }

        // Change password button
        const changePasswordBtn = document.getElementById('change-password-btn');
        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', () => {
                this.showChangePasswordModal();
            });
        }

        // Subscription management buttons
        const upgradePlanBtn = document.getElementById('upgrade-plan-btn');
        const billingHistoryBtn = document.getElementById('billing-history-btn');

        if (upgradePlanBtn) {
            upgradePlanBtn.addEventListener('click', () => {
                this.showUpgradePlans();
            });
        }

        if (billingHistoryBtn) {
            billingHistoryBtn.addEventListener('click', () => {
                this.showBillingHistory();
            });
        }
    }

    populateForm() {
        // Populate form fields with current profile data
        const fields = ['username', 'fullName', 'email', 'phoneNumber', 'location'];
        
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (input && this.profile[field]) {
                input.value = this.profile[field];
            }
        });

        // Update email verification status
        this.updateEmailVerification();
    }

    updateDisplay() {
        // Update display name
        const displayName = document.getElementById('display-name');
        if (displayName) {
            const name = this.profile.fullName || this.profile.username || 'Krishi Budhhi User';
            displayName.textContent = name;
        }

        // Update display email
        const displayEmail = document.getElementById('display-email');
        if (displayEmail) {
            displayEmail.textContent = this.profile.email || 'user@krishibudhhi.com';
        }

        // Update profile initials
        this.updateProfileInitials();

        // Update subscription info
        this.updateSubscriptionDisplay();
    }

    updateProfileInitials() {
        const initialsElement = document.getElementById('profile-initials');
        if (initialsElement) {
            const name = this.profile.fullName || this.profile.username || 'Krishi Budhhi';
            const initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2);
            initialsElement.textContent = initials;
        }
    }

    updateEmailVerification() {
        const emailVerification = document.getElementById('email-verification');
        if (emailVerification) {
            // For demo purposes, mark email as verified if it exists
            if (this.profile.email && this.profile.email.includes('@')) {
                emailVerification.classList.remove('hidden');
            } else {
                emailVerification.classList.add('hidden');
            }
        }
    }

    updateSubscriptionDisplay() {
        const currentPlanBadge = document.getElementById('current-plan-badge');
        const planName = document.getElementById('plan-name');
        const planFeatures = document.getElementById('plan-features');
        const renewalDate = document.getElementById('renewal-date');

        if (currentPlanBadge) {
            currentPlanBadge.textContent = this.profile.subscription.plan;
        }

        if (planName) {
            planName.textContent = this.profile.subscription.plan;
        }

        if (planFeatures && this.profile.subscription.features) {
            planFeatures.innerHTML = this.profile.subscription.features
                .map(feature => `<li>• ${feature}</li>`)
                .join('');
        }

        if (renewalDate) {
            if (this.profile.subscription.renewalDate) {
                const date = new Date(this.profile.subscription.renewalDate);
                renewalDate.textContent = date.toLocaleDateString();
            } else {
                renewalDate.textContent = 'No renewal required';
            }
        }
    }

    saveProfile() {
        // Get form data
        const formData = new FormData(document.getElementById('profile-form'));
        const updatedProfile = { ...this.profile };

        // Update profile with form data
        for (let [key, value] of formData.entries()) {
            updatedProfile[key] = value;
        }

        // Save to UserProfile system
        UserProfile.saveProfile(updatedProfile);
        this.profile = updatedProfile;

        // Update display
        this.updateDisplay();

        // Show success message
        this.showNotification('Profile updated successfully!', 'success');
    }

    handleProfilePictureChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Update profile picture (in a real app, you'd upload to server)
                this.profile.profilePicture = e.target.result;
                UserProfile.saveProfile(this.profile);
                
                // Update display
                const container = document.getElementById('profile-picture-container');
                if (container) {
                    container.innerHTML = `<img src="${e.target.result}" alt="Profile Picture" class="w-full h-full rounded-full object-cover">`;
                }
                
                this.showNotification('Profile picture updated!', 'success');
            };
            reader.readAsDataURL(file);
        }
    }

    showChangePasswordModal() {
        // Create modal for password change
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4" data-i18n="changePassword">Change Password</h3>
                <form id="password-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                        <input type="password" id="current-password" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                        <input type="password" id="new-password" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                        <input type="password" id="confirm-password" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" required>
                    </div>
                    <div class="flex justify-end space-x-3 pt-4">
                        <button type="button" id="cancel-password" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                            <span data-i18n="cancel">Cancel</span>
                        </button>
                        <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Apply translations to modal
        if (window.i18n) {
            window.i18n.translatePage();
        }

        // Handle modal events
        const passwordForm = modal.querySelector('#password-form');
        const cancelBtn = modal.querySelector('#cancel-password');

        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPassword = modal.querySelector('#new-password').value;
            const confirmPassword = modal.querySelector('#confirm-password').value;

            if (newPassword !== confirmPassword) {
                this.showNotification('Passwords do not match!', 'error');
                return;
            }

            // In a real app, you'd validate current password and update on server
            this.showNotification('Password updated successfully!', 'success');
            document.body.removeChild(modal);
        });

        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Close modal on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    showUpgradePlans() {
        // Redirect to subscription management page
        window.location.href = 'subscription-management.html';
    }

    showBillingHistory() {
        // Show billing history modal or redirect
        this.showNotification('Billing history feature coming soon!', 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500'
        }[type] || 'bg-gray-500';

        notification.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize profile manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
});
