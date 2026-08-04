/**
 * Melovia User Management Module
 * Handles profile updates, password changes, and user settings
 */

// Dynamic API URL configuration
const API_BASE_URL = window.API_BASE_URL || 
                      'http://127.0.0.1:8000/api';

class UserManagement {
    constructor() {
        this.auth = auth;
    }

    async updateProfile(userData) {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Oturum açmamışsınız' };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.auth.getToken()}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const error = await response.json();
                
                // Custom error messages based on status code
                if (response.status === 400 || response.status === 422) {
                    throw new Error(error.detail || 'Kullanıcı adı veya tam ad geçersiz.');
                } else if (response.status === 401) {
                    throw new Error('Oturum süreniz doldu, lütfen tekrar giriş yapın.');
                } else if (response.status === 409) {
                    throw new Error('Bu kullanıcı adı zaten kullanımda.');
                } else {
                    throw new Error(error.detail || 'Profil güncelleme başarısız');
                }
            }

            const data = await response.json();
            
            // Update local storage
            localStorage.setItem('melovia_user', JSON.stringify(data));
            this.auth.user = data;

            return { success: true, data };
        } catch (error) {
            // Network error handling
            if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
                return { success: false, error: 'Sunucuya bağlanılamadı, lütfen internet bağlantınızı veya backend durumunu kontrol edin' };
            }
            return { success: false, error: error.message };
        }
    }

    async changePassword(currentPassword, newPassword, confirmPassword) {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Oturum açmamışsınız' };
        }

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            return { success: false, error: 'Yeni şifreler eşleşmiyor' };
        }

        // Validate password strength
        const passwordValidation = validatePasswordStrength(newPassword);
        if (!passwordValidation.isValid) {
            return { success: false, error: passwordValidation.errors.join(', ') };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.auth.getToken()}`
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword
                })
            });

            if (!response.ok) {
                const error = await response.json();
                
                // Custom error messages based on status code
                if (response.status === 400 || response.status === 422) {
                    throw new Error(error.detail || 'Şifre geçersiz veya gereksinimleri karşılamıyor.');
                } else if (response.status === 401) {
                    throw new Error('Mevcut şifreniz hatalı.');
                } else if (response.status === 429) {
                    throw new Error('Çok fazla şifre değiştirme denemesi. Lütfen 15 dakika sonra tekrar deneyin.');
                } else {
                    throw new Error(error.detail || 'Şifre değiştirme başarısız');
                }
            }

            return { success: true, data: await response.json() };
        } catch (error) {
            // Network error handling
            if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
                return { success: false, error: 'Sunucuya bağlanılamadı, lütfen internet bağlantınızı veya backend durumunu kontrol edin' };
            }
            return { success: false, error: error.message };
        }
    }

    async verifyEmail() {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Oturum açmamışsınız' };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/verify-email`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.auth.getToken()}`
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'E-posta doğrulama başarısız');
            }

            const data = await response.json();
            
            // Update user data
            const userData = await this.auth.getCurrentUser();
            if (userData) {
                localStorage.setItem('melovia_user', JSON.stringify(userData));
                this.auth.user = userData;
            }

            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async verifyPhone() {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Oturum açmamışsınız' };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/verify-phone`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.auth.getToken()}`
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Telefon doğrulama başarısız');
            }

            const data = await response.json();
            
            // Update user data
            const userData = await this.auth.getCurrentUser();
            if (userData) {
                localStorage.setItem('melovia_user', JSON.stringify(userData));
                this.auth.user = userData;
            }

            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async deleteAccount() {
        if (!this.auth.isAuthenticated()) {
            return { success: false, error: 'Oturum açmamışsınız' };
        }

        if (!confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
            return { success: false, error: 'İptal edildi' };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.auth.getToken()}`
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Hesap silme başarısız');
            }

            // Logout and redirect
            this.auth.logout();
            return { success: true, data: await response.json() };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// Global user management instance
const userManagement = new UserManagement();
