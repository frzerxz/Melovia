/**
 * Melovia Authentication Module
 * Handles user authentication, registration, and session management
 */

// Dynamic API URL configuration
const API_BASE_URL = window.API_BASE_URL || 
                      'http://127.0.0.1:8000/api';

class Auth {
    constructor() {
        this.token = localStorage.getItem('melovia_token');
        this.user = JSON.parse(localStorage.getItem('melovia_user') || 'null');
        
        // Verify token is still valid on page load
        if (this.token) {
            this.getCurrentUser().then(user => {
                if (user) {
                    this.user = user;
                    localStorage.setItem('melovia_user', JSON.stringify(user));
                } else {
                    // Token invalid, clear it
                    this.logout();
                }
            }).catch(() => {
                // Network error or other issue, keep current state
                console.warn('Could not verify token on page load');
            });
        }
    }

    async register(username, email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            if (!response.ok) {
                const error = await response.json();
                
                // Custom error messages based on status code
                if (response.status === 400 || response.status === 422) {
                    throw new Error(error.detail || 'Şifreniz en az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir.');
                } else if (response.status === 409) {
                    throw new Error('Bu e-posta veya kullanıcı adı zaten kayıtlı.');
                } else {
                    throw new Error(error.detail || 'Kayıt başarısız');
                }
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            // Network error handling
            if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
                return { success: false, error: 'Sunucuya bağlanılamadı, lütfen internet bağlantınızı veya backend durumunu kontrol edin' };
            }
            return { success: false, error: error.message };
        }
    }

    async login(email, password) {
        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                
                // Custom error messages based on status code
                if (response.status === 401) {
                    throw new Error('E-posta veya şifre hatalı.');
                } else if (response.status === 429) {
                    throw new Error('Çok fazla hatalı giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.');
                } else {
                    throw new Error(error.detail || 'Giriş başarısız');
                }
            }

            const data = await response.json();
            
            // Store token
            this.token = data.access_token;
            localStorage.setItem('melovia_token', this.token);

            // Fetch user data
            const userData = await this.getCurrentUser();
            this.user = userData;
            localStorage.setItem('melovia_user', JSON.stringify(userData));

            return { success: true, data };
        } catch (error) {
            // Network error handling
            if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
                return { success: false, error: 'Sunucuya bağlanılamadı, lütfen internet bağlantınızı veya backend durumunu kontrol edin' };
            }
            return { success: false, error: error.message };
        }
    }

    async getCurrentUser() {
        if (!this.token) {
            return null;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) {
                this.logout();
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch user:', error);
            this.logout();
            return null;
        }
    }

    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('melovia_token');
        localStorage.removeItem('melovia_user');
        
        // Show auth wall
        if (typeof checkAuthWall === 'function') {
            checkAuthWall();
        } else {
            // Fallback: reload page
            window.location.reload();
        }
    }

    isAuthenticated() {
        return !!this.token;
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return this.token;
    }
}

// Password strength validation
function validatePasswordStrength(password) {
    const errors = [];
    
    if (password.length < 8) {
        errors.push('Şifre en az 8 karakter olmalı');
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push('Şifre en az 1 büyük harf içermeli (A-Z)');
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push('Şifre en az 1 küçük harf içermeli (a-z)');
    }
    
    if (!/[0-9]/.test(password)) {
        errors.push('Şifre en az 1 rakam içermeli (0-9)');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
        errors.push('Şifre en az 1 özel karakter içermeli (!@#$%^&*()_+-=[]{}|;:,.<>?)');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

// Global auth instance
const auth = new Auth();
