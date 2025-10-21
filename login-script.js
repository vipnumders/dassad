// Enhanced Login System with Email Authentication
// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const loginScreen = document.getElementById('login-screen');
const googleLoginBtn = document.getElementById('google-login-btn');
const emailLoginForm = document.getElementById('email-login-form');
const emailRegisterForm = document.getElementById('email-register-form');
const passwordResetForm = document.getElementById('password-reset-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const resetEmailInput = document.getElementById('reset-email');
const loginBtn = document.getElementById('login-btn');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');

const profileCircle = document.getElementById('profile-circle');
const profileImageCircle = document.getElementById('profile-image-circle');
const profileInitialsCircle = document.getElementById('profile-initials-circle');
const profileDropdown = document.getElementById('profile-dropdown');
const profileNameDropdown = document.getElementById('profile-name-dropdown');
const logoutBtnDropdown = document.getElementById('logout-btn-dropdown');

// Authentication form toggle buttons
const registerBtn = document.getElementById('register-btn');
const forgotPasswordBtn = document.getElementById('forgot-password-btn');
const backToLoginFromRegister = document.getElementById('back-to-login-from-register');
const backToLoginFromReset = document.getElementById('back-to-login-from-reset');

// Loading Screen Management
let loadingTimeout;

function showLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
        loadingScreen.style.opacity = '1';
        if (loginScreen) loginScreen.classList.add('hidden');
    }
}

function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 600);
    }
}

function showLoginScreen() {
    // For integrated system, just show the login section
    const loginSection = document.getElementById('login-section');
    const mainContent = document.getElementById('main-content');
    
    if (loginSection) loginSection.style.display = 'block';
    if (mainContent) mainContent.style.display = 'none';
    if (profileCircle) profileCircle.style.display = 'none';
    if (profileDropdown) profileDropdown.style.display = 'none';
    
    // Show login form and hide other forms
    showLoginForm();
}

function showProfileScreen() {
    // For integrated system, show profile and main content
    const loginSection = document.getElementById('login-section');
    const mainContent = document.getElementById('main-content');
    
    if (loginSection) loginSection.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    if (profileCircle) profileCircle.style.display = 'flex';

    // Show all numbers by default
    if (typeof showAllNumbers === 'function') {
        showAllNumbers();
    }
}

// Form Display Management
function showLoginForm() {
    if (emailLoginForm) emailLoginForm.style.display = 'block';
    if (emailRegisterForm) emailRegisterForm.style.display = 'none';
    if (passwordResetForm) passwordResetForm.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'block';
    if (forgotPasswordBtn) forgotPasswordBtn.style.display = 'block';
}

function showRegisterForm() {
    if (emailLoginForm) emailLoginForm.style.display = 'none';
    if (emailRegisterForm) emailRegisterForm.style.display = 'block';
    if (passwordResetForm) passwordResetForm.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    if (forgotPasswordBtn) forgotPasswordBtn.style.display = 'none';
}

function showPasswordResetForm() {
    if (emailLoginForm) emailLoginForm.style.display = 'none';
    if (emailRegisterForm) emailRegisterForm.style.display = 'none';
    if (passwordResetForm) passwordResetForm.style.display = 'block';
    if (registerBtn) registerBtn.style.display = 'none';
    if (forgotPasswordBtn) forgotPasswordBtn.style.display = 'none';
}

// Loading Animation Management
function showButtonLoading(button, textElement, loaderElement) {
    if (button) button.disabled = true;
    if (textElement) textElement.style.opacity = '0';
    if (loaderElement) loaderElement.classList.remove('hidden');
}

function hideButtonLoading(button, textElement, loaderElement) {
    if (button) button.disabled = false;
    if (textElement) textElement.style.opacity = '1';
    if (loaderElement) loaderElement.classList.add('hidden');
}

// Error and Success Message Management
function showMessage(message, type = 'error') {
    // Remove existing messages
    const existingMessage = document.querySelector('.error-message, .success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.textContent = message;

    // Insert message after the logo section
    const logoSection = document.querySelector('.logo-section');
    if (logoSection) {
        logoSection.insertAdjacentElement('afterend', messageDiv);
    }

    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Google Login Handler
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async () => {
        try {
            showButtonLoading(googleLoginBtn, googleLoginBtn, document.createElement('div'));
            
            const result = await window.signInWithPopup(window.auth, window.googleProvider);
            const user = result.user;
            
            console.log('Google login successful:', user);
            updateProfileDisplay(user);
            showProfileScreen();
            handlePostLoginRedirect(user);
            
        } catch (error) {
            console.error('Google login error:', error);
            showMessage(getErrorMessage(error), 'error');
        } finally {
            hideButtonLoading(googleLoginBtn, googleLoginBtn, document.createElement('div'));
        }
    });
}

// Email/Password Login Handler
if (emailLoginForm) {
    emailLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        try {
            showButtonLoading(loginBtn, btnText, btnLoader);
            
            const result = await window.signInWithEmailAndPassword(window.auth, email, password);
            const user = result.user;
            
            console.log('Email login successful:', user);
            updateProfileDisplay(user);
            showProfileScreen();
            handlePostLoginRedirect(user);
            
        } catch (error) {
            console.error('Email login error:', error);
            showMessage(getErrorMessage(error), 'error');
        } finally {
            hideButtonLoading(loginBtn, btnText, btnLoader);
        }
    });
}

// User Registration Handler
if (emailRegisterForm) {
    emailRegisterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = registerEmailInput.value.trim();
        const password = registerPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        
        if (!email || !password || !confirmPassword) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long', 'error');
            return;
        }
        
        try {
            const registerBtn = emailRegisterForm.querySelector('.login-btn');
            const registerBtnText = registerBtn.querySelector('.btn-text');
            const registerBtnLoader = registerBtn.querySelector('.btn-loader');
            
            showButtonLoading(registerBtn, registerBtnText, registerBtnLoader);
            
            const result = await window.createUserWithEmailAndPassword(window.auth, email, password);
            const user = result.user;
            
            console.log('User registration successful:', user);
            showMessage('Account created successfully! Welcome to Global VIP Numbers!', 'success');
            updateProfileDisplay(user);
            showProfileScreen();
            handlePostLoginRedirect(user);
            
        } catch (error) {
            console.error('Registration error:', error);
            showMessage(getErrorMessage(error), 'error');
        } finally {
            const registerBtn = emailRegisterForm.querySelector('.login-btn');
            const registerBtnText = registerBtn.querySelector('.btn-text');
            const registerBtnLoader = registerBtn.querySelector('.btn-loader');
            hideButtonLoading(registerBtn, registerBtnText, registerBtnLoader);
        }
    });
}

// Password Reset Handler
if (passwordResetForm) {
    passwordResetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = resetEmailInput.value.trim();
        
        if (!email) {
            showMessage('Please enter your email address', 'error');
            return;
        }
        
        try {
            const resetBtn = passwordResetForm.querySelector('.login-btn');
            const resetBtnText = resetBtn.querySelector('.btn-text');
            const resetBtnLoader = resetBtn.querySelector('.btn-loader');
            
            showButtonLoading(resetBtn, resetBtnText, resetBtnLoader);
            
            await window.sendPasswordResetEmail(window.auth, email);
            showMessage('Password reset email sent! Check your inbox and follow the instructions.', 'success');
            
            // Clear the form
            resetEmailInput.value = '';
            
            // Show login form after 3 seconds
            setTimeout(() => {
                showLoginForm();
            }, 3000);
            
        } catch (error) {
            console.error('Password reset error:', error);
            showMessage(getErrorMessage(error), 'error');
        } finally {
            const resetBtn = passwordResetForm.querySelector('.login-btn');
            const resetBtnText = resetBtn.querySelector('.btn-text');
            const resetBtnLoader = resetBtn.querySelector('.btn-loader');
            hideButtonLoading(resetBtn, resetBtnText, resetBtnLoader);
        }
    });
}

// Logout Handler
if (logoutBtnDropdown) {
    logoutBtnDropdown.addEventListener('click', async () => {
        try {
            await window.signOut(window.auth);
            console.log('Logout successful');
            showLoginScreen();
            clearForm();
        } catch (error) {
            console.error('Logout error:', error);
            showMessage('Error logging out. Please try again.', 'error');
        }
    });
}

// Form Toggle Event Listeners
if (registerBtn) {
    registerBtn.addEventListener('click', showRegisterForm);
}

if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', showPasswordResetForm);
}

if (backToLoginFromRegister) {
    backToLoginFromRegister.addEventListener('click', showLoginForm);
}

if (backToLoginFromReset) {
    backToLoginFromReset.addEventListener('click', showLoginForm);
}

// Update Profile Display
function updateProfileDisplay(user) {
    if (user.photoURL && profileImageCircle) {
        profileImageCircle.src = user.photoURL;
        profileImageCircle.style.display = 'block';
        profileInitialsCircle.style.display = 'none';
    } else if (profileInitialsCircle) {
        profileImageCircle.style.display = 'none';
        profileInitialsCircle.textContent = getInitials(user.displayName || user.email);
        profileInitialsCircle.style.display = 'block';
    }
    
    if (profileNameDropdown) {
        profileNameDropdown.textContent = user.displayName || 'User';
    }
}

// Get User Initials
function getInitials(name) {
    if (!name) return 'U';
    
    const words = name.trim().split(' ');
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }
    
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

// Clear Form
function clearForm() {
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (registerEmailInput) registerEmailInput.value = '';
    if (registerPasswordInput) registerPasswordInput.value = '';
    if (confirmPasswordInput) confirmPasswordInput.value = '';
    if (resetEmailInput) resetEmailInput.value = '';
    
    // Remove any error messages
    const existingMessage = document.querySelector('.error-message, .success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Show login form
    showLoginForm();
}

// Error Message Helper
function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/user-not-found':
            return 'No account found with this email address.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your connection.';
        case 'auth/popup-closed-by-user':
            return 'Login cancelled. Please try again.';
        case 'auth/cancelled-popup-request':
            return 'Login cancelled. Please try again.';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists. Please use a different email or try logging in.';
        case 'auth/weak-password':
            return 'Password is too weak. Please choose a stronger password.';
        case 'auth/invalid-credential':
            return 'Invalid email or password. Please check your credentials and try again.';
        case 'auth/operation-not-allowed':
            return 'Email/password authentication is not enabled. Please contact support.';
        default:
            return 'An error occurred. Please try again.';
    }
}

// Auth State Listener
if (window.onAuthStateChanged && window.auth) {
    window.onAuthStateChanged(window.auth, (user) => {
        if (user) {
            console.log('User is signed in:', user);
            updateProfileDisplay(user);
            showProfileScreen();
            handlePostLoginRedirect(user);
        } else {
            console.log('User is signed out');
            showLoginScreen();
        }
    });
}

// Initialize App
function initializeApp() {
    // Check if user is already logged in
    if (window.auth && window.auth.currentUser) {
        const user = window.auth.currentUser;
        updateProfileDisplay(user);
        showProfileScreen();
        handlePostLoginRedirect(user);
    } else {
        showLoginScreen();
    }
}

// Post-login routing to admin panel if email is in admin list
const ADMIN_EMAILS = [
    'admin@gmail.com'
];

function handlePostLoginRedirect(user) {
    try {
        const email = user?.email || '';
        const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
        if (isAdmin) {
            window.location.href = 'admin.html';
        }
    } catch (e) {
        console.warn('Post-login redirect skipped:', e?.message || e);
    }
}

// Add smooth transitions for form inputs
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !loginBtn?.disabled) {
        if (emailInput === document.activeElement || passwordInput === document.activeElement) {
            if (emailLoginForm) {
                emailLoginForm.dispatchEvent(new Event('submit'));
            }
        }
    }
});

// Add form validation
if (emailInput) {
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = 'rgba(255, 107, 107, 0.6)';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
}

if (passwordInput) {
    passwordInput.addEventListener('input', function() {
        if (this.value && this.value.length < 6) {
            this.style.borderColor = 'rgba(255, 107, 107, 0.6)';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
}

// Password confirmation validation
if (confirmPasswordInput && registerPasswordInput) {
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value && this.value !== registerPasswordInput.value) {
            this.style.borderColor = 'rgba(255, 107, 107, 0.6)';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
    
    registerPasswordInput.addEventListener('input', function() {
        if (confirmPasswordInput.value && this.value !== confirmPasswordInput.value) {
            confirmPasswordInput.style.borderColor = 'rgba(255, 107, 107, 0.6)';
        } else {
            confirmPasswordInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
}

// Add click effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Profile dropdown functionality
if (profileCircle) {
    profileCircle.addEventListener('click', () => {
        const isHidden = profileDropdown.style.display === 'none' || !profileDropdown.style.display;
        profileDropdown.style.display = isHidden ? 'block' : 'none';
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (profileCircle && profileDropdown) {
        if (!profileCircle.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.style.display = 'none';
        }
    }
});

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause any animations
        clearTimeout(loadingTimeout);
    } else {
        // Page is visible again, resume if needed
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingTimeout = setTimeout(() => {
                if (window.auth && window.auth.currentUser) {
                    const user = window.auth.currentUser;
                    updateProfileDisplay(user);
                    showProfileScreen();
                } else {
                    showLoginScreen();
                }
            }, 1000);
        }
    }
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch feedback for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showLoadingScreen,
        hideLoadingScreen,
        showLoginScreen,
        showProfileScreen,
        updateProfileDisplay,
        getInitials,
        getErrorMessage,
        showLoginForm,
        showRegisterForm,
        showPasswordResetForm
    };
}