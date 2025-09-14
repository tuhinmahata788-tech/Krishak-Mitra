// Subscription Management JavaScript for Krishi Budhhi
console.log('Subscription Management script loaded');

class SubscriptionManager {
    constructor() {
        this.profile = null;
        this.plans = {
            free: {
                name: 'Free Plan',
                price: 0,
                currency: '₹',
                period: 'month',
                features: [
                    'Basic Disease Detection',
                    '5 AI Chat Messages/Day',
                    'Weather Updates',
                    'Basic Crop Predictions'
                ]
            },
            premium: {
                name: 'Premium Plan',
                price: 299,
                currency: '₹',
                period: 'month',
                features: [
                    'Advanced Disease Detection',
                    'Unlimited AI Chat',
                    'Detailed Weather Forecasts',
                    'Advanced Crop Analytics',
                    'Market Price Alerts',
                    'Priority Support'
                ]
            },
            professional: {
                name: 'Professional Plan',
                price: 599,
                currency: '₹',
                period: 'month',
                features: [
                    'Everything in Premium',
                    'Multi-field Management',
                    'Team Collaboration',
                    'Advanced Analytics',
                    'API Access',
                    '24/7 Dedicated Support'
                ]
            }
        };
        this.init();
    }

    init() {
        // Load user profile
        this.loadProfile();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update display
        this.updateCurrentPlanDisplay();
        
        // Load billing history
        this.loadBillingHistory();
        
        // Load payment methods
        this.loadPaymentMethods();
    }

    loadProfile() {
        this.profile = UserProfile.getProfile();
    }

    setupEventListeners() {
        // Add payment method button
        const addPaymentBtn = document.getElementById('add-payment-method');
        if (addPaymentBtn) {
            addPaymentBtn.addEventListener('click', () => {
                this.showAddPaymentMethodModal();
            });
        }

        // Plan selection buttons are handled by global selectPlan function
        window.selectPlan = (planType) => {
            this.selectPlan(planType);
        };
    }

    updateCurrentPlanDisplay() {
        const currentPlan = this.profile.subscription.plan.toLowerCase().replace(' ', '');
        const planData = this.plans[currentPlan] || this.plans.free;

        // Update current plan name
        const planNameElement = document.getElementById('current-plan-name');
        if (planNameElement) {
            planNameElement.textContent = planData.name;
        }

        // Update renewal info
        const renewalInfoElement = document.getElementById('renewal-info');
        if (renewalInfoElement) {
            if (this.profile.subscription.renewalDate) {
                const renewalDate = new Date(this.profile.subscription.renewalDate);
                renewalInfoElement.textContent = renewalDate.toLocaleDateString();
            } else {
                renewalInfoElement.textContent = 'No Expiry';
            }
        }

        // Update plan status
        const statusElement = document.getElementById('current-plan-status');
        if (statusElement) {
            statusElement.textContent = this.profile.subscription.status || 'Active';
        }
    }

    loadBillingHistory() {
        const tableBody = document.getElementById('billing-history-table');
        if (!tableBody) return;

        // Sample billing history (in a real app, this would come from server)
        const billingHistory = this.profile.subscription.billingHistory || [];

        if (billingHistory.length === 0) {
            tableBody.innerHTML = `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4 text-center text-gray-500 dark:text-gray-400" colspan="5">
                        No billing history available
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = billingHistory.map(record => `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    ${new Date(record.date).toLocaleDateString()}
                </td>
                <td class="px-6 py-4">${record.plan}</td>
                <td class="px-6 py-4">₹${record.amount}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${
                        record.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                    }">
                        ${record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <button class="text-blue-600 hover:text-blue-800 text-sm" onclick="downloadInvoice('${record.id}')">
                        Download
                    </button>
                </td>
            </tr>
        `).join('');
    }

    loadPaymentMethods() {
        const paymentMethodsList = document.getElementById('payment-methods-list');
        if (!paymentMethodsList) return;

        const paymentMethods = this.profile.subscription.paymentMethods || [];

        if (paymentMethods.length === 0) {
            paymentMethodsList.innerHTML = `
                <div class="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
                    <div class="text-center">
                        <svg class="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        <p>No payment methods added yet</p>
                        <p class="text-sm mt-1">Add a payment method to upgrade your plan</p>
                    </div>
                </div>
            `;
            return;
        }

        paymentMethodsList.innerHTML = paymentMethods.map(method => `
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        ${method.type.toUpperCase()}
                    </div>
                    <div>
                        <p class="font-medium text-gray-900 dark:text-white">
                            **** **** **** ${method.last4}
                        </p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Expires ${method.expiryMonth}/${method.expiryYear}
                        </p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    ${method.isDefault ? '<span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Default</span>' : ''}
                    <button class="text-red-600 hover:text-red-800 text-sm" onclick="removePaymentMethod('${method.id}')">
                        Remove
                    </button>
                </div>
            </div>
        `).join('');
    }

    selectPlan(planType) {
        const plan = this.plans[planType];
        if (!plan) return;

        // Show confirmation modal
        this.showPlanConfirmationModal(planType, plan);
    }

    showPlanConfirmationModal(planType, plan) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirm Plan Upgrade</h3>
                <div class="mb-6">
                    <p class="text-gray-700 dark:text-gray-300 mb-2">
                        You are about to upgrade to:
                    </p>
                    <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 class="font-semibold text-gray-900 dark:text-white">${plan.name}</h4>
                        <p class="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                            ${plan.currency}${plan.price}/${plan.period}
                        </p>
                        <ul class="mt-3 space-y-1">
                            ${plan.features.slice(0, 3).map(feature => `
                                <li class="text-sm text-gray-600 dark:text-gray-400">• ${feature}</li>
                            `).join('')}
                            ${plan.features.length > 3 ? `<li class="text-sm text-gray-600 dark:text-gray-400">• And ${plan.features.length - 3} more...</li>` : ''}
                        </ul>
                    </div>
                </div>
                
                <div class="flex justify-end space-x-3">
                    <button id="cancel-upgrade" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                        Cancel
                    </button>
                    <button id="confirm-upgrade" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                        Upgrade Now
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Apply translations
        if (window.i18n) {
            window.i18n.translatePage();
        }

        // Handle modal events
        const confirmBtn = modal.querySelector('#confirm-upgrade');
        const cancelBtn = modal.querySelector('#cancel-upgrade');

        confirmBtn.addEventListener('click', () => {
            this.processPlanUpgrade(planType, plan);
            document.body.removeChild(modal);
        });

        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    processPlanUpgrade(planType, plan) {
        // Update user profile with new plan
        const updatedProfile = { ...this.profile };
        updatedProfile.subscription.plan = plan.name;
        updatedProfile.subscription.status = 'Active';
        updatedProfile.subscription.renewalDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days from now
        updatedProfile.subscription.features = plan.features;

        // Add billing record
        if (!updatedProfile.subscription.billingHistory) {
            updatedProfile.subscription.billingHistory = [];
        }
        
        updatedProfile.subscription.billingHistory.unshift({
            id: Date.now().toString(),
            date: new Date().toISOString(),
            plan: plan.name,
            amount: plan.price,
            status: 'paid'
        });

        // Save updated profile
        UserProfile.saveProfile(updatedProfile);
        this.profile = updatedProfile;

        // Update display
        this.updateCurrentPlanDisplay();
        this.loadBillingHistory();

        // Show success notification
        this.showNotification(`Successfully upgraded to ${plan.name}!`, 'success');
    }

    showAddPaymentMethodModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Payment Method</h3>
                <form id="payment-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                        <input type="text" id="card-number" placeholder="1234 5678 9012 3456" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" required>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                            <input type="text" id="expiry-date" placeholder="MM/YY" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                            <input type="text" id="cvv" placeholder="123" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cardholder Name</label>
                        <input type="text" id="cardholder-name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white" required>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="make-default" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded">
                        <label for="make-default" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Make this my default payment method
                        </label>
                    </div>
                    <div class="flex justify-end space-x-3 pt-4">
                        <button type="button" id="cancel-payment" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                            Add Payment Method
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle form submission
        const paymentForm = modal.querySelector('#payment-form');
        const cancelBtn = modal.querySelector('#cancel-payment');

        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addPaymentMethod(modal);
        });

        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    addPaymentMethod(modal) {
        const cardNumber = modal.querySelector('#card-number').value;
        const expiryDate = modal.querySelector('#expiry-date').value;
        const makeDefault = modal.querySelector('#make-default').checked;

        // Create new payment method
        const newPaymentMethod = {
            id: Date.now().toString(),
            type: 'card',
            last4: cardNumber.slice(-4),
            expiryMonth: expiryDate.split('/')[0],
            expiryYear: expiryDate.split('/')[1],
            isDefault: makeDefault
        };

        // Update profile
        const updatedProfile = { ...this.profile };
        if (!updatedProfile.subscription.paymentMethods) {
            updatedProfile.subscription.paymentMethods = [];
        }

        // If making this default, remove default from others
        if (makeDefault) {
            updatedProfile.subscription.paymentMethods.forEach(method => {
                method.isDefault = false;
            });
        }

        updatedProfile.subscription.paymentMethods.push(newPaymentMethod);
        UserProfile.saveProfile(updatedProfile);
        this.profile = updatedProfile;

        // Update display
        this.loadPaymentMethods();

        // Close modal
        document.body.removeChild(modal);

        // Show success notification
        this.showNotification('Payment method added successfully!', 'success');
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

// Global functions for button handlers
window.downloadInvoice = (invoiceId) => {
    // In a real app, this would download the actual invoice
    console.log('Downloading invoice:', invoiceId);
    alert('Invoice download feature coming soon!');
};

window.removePaymentMethod = (methodId) => {
    if (confirm('Are you sure you want to remove this payment method?')) {
        // Remove payment method logic here
        console.log('Removing payment method:', methodId);
        alert('Payment method removal feature coming soon!');
    }
};

// Initialize subscription manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SubscriptionManager();
});
