// Main application JavaScript
class SuratApp {
    constructor() {
        this.apiBase = 'https://script.google.com/macros/s/AKfycbxtLfyDfzhDiQvU2saKpU0zIRPQKCQyj46Fs4tLK7r8nt3LoHNSbMFd0vRkYXavSJfc/exec'; // Replace with actual Apps Script URL
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check authentication
        this.checkAuth();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Load initial data
        this.loadInitialData();
    }

    checkAuth() {
        const user = sessionStorage.getItem('user');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.updateUserRole();
        } else {
            // Redirect to login if not on login page
            if (!window.location.pathname.includes('login.html')) {
                window.location.href = 'login.html';
            }
        }
    }

    updateUserRole() {
        if (this.currentUser && window.Alpine) {
            Alpine.store('user', {
                role: this.currentUser.role,
                name: this.currentUser.name,
                email: this.currentUser.email
            });
        }
    }

    initEventListeners() {
        // Add global event listeners
        document.addEventListener('click', (e) => {
            // Handle logout
            if (e.target.closest('[data-action="logout"]')) {
                this.logout();
            }
        });
    }

    async loadInitialData() {
        // Load dashboard data, etc.
        if (window.location.pathname.includes('index.html')) {
            await this.loadDashboardData();
        }
    }

    logout() {
        sessionStorage.removeItem('user');
        window.location.href = 'login.html';
    }

    // API Methods
    async apiCall(endpoint, data = {}) {
        try {
            const formData = new FormData();
            formData.append('action', endpoint);
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });

            const response = await fetch(this.apiBase, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.status === 'error') {
                throw new Error(result.message);
            }
            
            return result;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Authentication
    async login(email, password) {
        return await this.apiCall('login', { email, password });
    }

    // Dashboard
    async loadDashboardData() {
        try {
            const data = await this.apiCall('getDashboardStats');
            return data.data;
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            return null;
        }
    }

    // Letter Management
    async generateNomorSurat(kodeArsip, tanggalSurat) {
        try {
            const result = await this.apiCall('generateNomorSurat', {
                kodeArsip,
                tanggalSurat
            });
            return result.nomorSurat;
        } catch (error) {
            console.error('Failed to generate nomor surat:', error);
            throw error;
        }
    }

    async saveSurat(suratData) {
        return await this.apiCall('saveSurat', suratData);
    }

    async getAgendaSurat(tipe, filters = {}) {
        return await this.apiCall('getAgendaSurat', { tipe, ...filters });
    }

    async uploadSurat(file, suratData) {
        const formData = new FormData();
        formData.append('action', 'uploadSurat');
        formData.append('file', file);
        Object.keys(suratData).forEach(key => {
            formData.append(key, suratData[key]);
        });

        try {
            const response = await fetch(this.apiBase, {
                method: 'POST',
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    }

    // Template Management
    async getTemplates() {
        return await this.apiCall('getTemplates');
    }

    async saveTemplate(templateData) {
        return await this.apiCall('saveTemplate', templateData);
    }

    // User Management (Admin only)
    async getUsers() {
        return await this.apiCall('getUsers');
    }

    async saveUser(userData) {
        return await this.apiCall('saveUser', userData);
    }

    // Archive Management
    async getArsip(filters = {}) {
        return await this.apiCall('getArsip', filters);
    }

    async saveArsip(arsipData) {
        return await this.apiCall('saveArsip', arsipData);
    }

    // Utility Functions
    formatDate(date) {
        return new Date(date).toLocaleDateString('id-ID');
    }

    formatDateTime(date) {
        return new Date(date).toLocaleString('id-ID');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            type === 'warning' ? 'bg-yellow-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${
                    type === 'success' ? 'fa-check-circle' :
                    type === 'error' ? 'fa-exclamation-circle' :
                    type === 'warning' ? 'fa-exclamation-triangle' :
                    'fa-info-circle'
                } mr-2"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Form Validation
    validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('border-red-500');
                isValid = false;
            } else {
                input.classList.remove('border-red-500');
            }
        });

        return isValid;
    }

    // File Upload Helper
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Export to PDF (placeholder)
    exportToPDF(elementId, filename) {
        // This would use a library like jsPDF or html2canvas
        console.log('Exporting to PDF:', elementId, filename);
        this.showNotification('Fitur export PDF akan segera tersedia', 'info');
    }

    // Print functionality
    printElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Cetak Surat</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            @media print { body { margin: 0; } }
                        </style>
                    </head>
                    <body>
                        ${element.innerHTML}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.suratApp = new SuratApp();
});

// Alpine.js components
document.addEventListener('alpine:init', () => {
    // Global data store
    Alpine.store('app', {
        loading: false,
        notifications: [],
        
        showNotification(message, type = 'info') {
            this.notifications.push({ message, type, id: Date.now() });
            setTimeout(() => {
                this.notifications = this.notifications.filter(n => n.id !== this.notifications[0].id);
            }, 3000);
        }
    });

    // Letter form component
    Alpine.data('letterForm', () => ({
        form: {
            template: '',
            kodeArsip: '',
            tanggalSurat: '',
            perihal: '',
            tujuan: '',
            isiSurat: ''
        },
        generatedNomorSurat: '',
        loading: false,

        async generateNomorSurat() {
            if (!this.form.kodeArsip || !this.form.tanggalSurat) {
                Alpine.store('app').showNotification('Pilih kode arsip dan tanggal surat terlebih dahulu', 'warning');
                return;
            }

            this.loading = true;
            try {
                const nomorSurat = await window.suratApp.generateNomorSurat(
                    this.form.kodeArsip, 
                    this.form.tanggalSurat
                );
                this.generatedNomorSurat = nomorSurat;
                Alpine.store('app').showNotification('Nomor surat berhasil digenerate', 'success');
            } catch (error) {
                Alpine.store('app').showNotification('Gagal generate nomor surat', 'error');
            } finally {
                this.loading = false;
            }
        },

        async saveSurat() {
            if (!window.suratApp.validateForm(document.querySelector('form'))) {
                Alpine.store('app').showNotification('Mohon lengkapi semua field yang wajib diisi', 'warning');
                return;
            }

            this.loading = true;
            try {
                await window.suratApp.saveSurat({
                    ...this.form,
                    nomorSurat: this.generatedNomorSurat
                });
                Alpine.store('app').showNotification('Surat berhasil disimpan', 'success');
                // Reset form
                this.resetForm();
            } catch (error) {
                Alpine.store('app').showNotification('Gagal menyimpan surat', 'error');
            } finally {
                this.loading = false;
            }
        },

        resetForm() {
            this.form = {
                template: '',
                kodeArsip: '',
                tanggalSurat: '',
                perihal: '',
                tujuan: '',
                isiSurat: ''
            };
            this.generatedNomorSurat = '';
        }
    }));

    // File upload component
    Alpine.data('fileUpload', () => ({
        files: [],
        dragOver: false,

        handleDrop(e) {
            e.preventDefault();
            this.dragOver = false;
            this.addFiles(e.dataTransfer.files);
        },

        handleFileSelect(e) {
            this.addFiles(e.target.files);
        },

        addFiles(fileList) {
            for (let file of fileList) {
                if (file.type.startsWith('image/') || file.type === 'application/pdf') {
                    this.files.push(file);
                } else {
                    Alpine.store('app').showNotification('Hanya file PDF dan gambar yang diperbolehkan', 'error');
                }
            }
        },

        removeFile(index) {
            this.files.splice(index, 1);
        },

        formatFileSize(bytes) {
            return window.suratApp.formatFileSize(bytes);
        }
    }));
});