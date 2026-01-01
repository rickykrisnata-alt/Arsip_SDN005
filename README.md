# SISTEM KEARSIPAN SURAT - SDN 005
## Dokumentasi Lengkap Implementasi & Deployment

---

## 📋 OVERVIEW SISTEM

Sistem Kearsipan Surat Digital adalah aplikasi web berbasis **Google Apps Script** dan **GitHub Pages** yang dirancang khusus untuk lingkungan Sekolah Dasar Negeri. Sistem ini menyediakan solusi lengkap untuk manajemen surat masuk, surat keluar, template surat, dan arsip digital.

### 🎯 Fitur Utama
- ✅ Manajemen surat masuk & keluar otomatis
- ✅ Sistem penomoran surat otomatis dengan format standar
- ✅ Template surat dinamis yang dapat dikustomisasi
- ✅ Sistem arsip digital dengan retensi management
- ✅ Dashboard statistik & grafik real-time
- ✅ Multi-role user authentication (Admin, Pimpinan, User)
- ✅ Upload & management file surat
- ✅ Disposisi surat digital
- ✅ Export & print functionality

---

## 🏗️ ARSITEKTUR SISTEM

### Teknologi Stack
```
FRONTEND:
- HTML5 + CSS3 (Tailwind CSS)
- JavaScript (Alpine.js)
- Chart.js (untuk grafik)
- Font Awesome (icons)
- Hosting: GitHub Pages

BACKEND:
- Google Apps Script
- Google Spreadsheet (Database)
- Google Drive (File Storage)
- Google Apps Script Web App (API)

AUTHENTICATION:
- Session-based authentication
- Password hashing (SHA-256)
- Role-based access control
```

### Alur Data
```
Frontend (GitHub Pages) 
    ↓ HTTPS Request
Google Apps Script Web App
    ↓ CRUD Operations
Google Spreadsheet (Database)
    ↓ File Operations
Google Drive (Storage)
```

---

## 📁 STRUKTUR PROJECT

```
surat-app/
├── frontend/
│   ├── index.html              # Halaman utama dashboard
│   ├── login.html              # Halaman login
│   ├── pengguna.html           # Manajemen pengguna
│   ├── arsip.html              # Manajemen arsip
│   ├── template.html           # Manajemen template
│   └── assets/
│       ├── js/
│       │   └── app.js          # JavaScript utama
│       ├── css/
│       └── images/
├── backend/
│   ├── Code.gs                 # Main backend API
│   └── setup.gs                # Setup & initialization script
└── docs/
    ├── README.md               # Dokumentasi ini
    └── deployment.md           # Panduan deployment
```

---

## 🚀 LANGKAH DEPLOYMENT

### 1. PERSIAPAN GOOGLE ACCOUNT

1. **Pastikan memiliki Google Account**
   - Gunakan account sekolah (@sdn005.sch.id)
   - Pastikan memiliki akses ke Google Workspace

2. **Enable Google Apps Script**
   - Kunjungi [script.google.com](https://script.google.com)
   - Sign in dengan Google account

### 2. SETUP BACKEND (GOOGLE APPS SCRIPT)

#### Langkah 1: Buat Project Baru
1. Buka [Google Apps Script](https://script.google.com)
2. Klik "New Project"
3. Beri nama: "Sistem Kearsipan Surat SDN 005"

#### Langkah 2: Import Code
1. Copy semua kode dari `backend/Code.gs`
2. Paste ke editor Apps Script
3. Copy kode dari `backend/setup.gs`
4. Paste sebagai file baru (File > New > Script file)

#### Langkah 3: Setup Spreadsheet
1. Jalankan function `setupCompleteSystem()` dari `setup.gs`
2. Berikan izin yang diminta (Authorize)
3. Tunggu hingga setup selesai
4. Catat informasi yang ditampilkan:
   - Spreadsheet ID
   - Folder ID
   - Web App URL

#### Langkah 3.1: Update Configuration
Di file `Code.gs`, update konstanta berikut:
```javascript
const SPREADSHEET_ID = "GANTI_DENGAN_SPREADSHEET_ID_ANDA";
const DRIVE_FOLDER_ID = "GANTI_DENGAN_FOLDER_ID_ANDA";
```

#### Langkah 4: Deploy Web App
1. Klik "Deploy" > "New deployment"
2. Pilih type: "Web app"
3. Configuration:
   - Description: "API Sistem Kearsipan"
   - Execute as: "Me"
   - Who has access: "Anyone with Google account" (atau sesuaikan)
4. Klik "Deploy"
5. Copy Web App URL yang dihasilkan

### 3. SETUP FRONTEND (GITHUB PAGES)

#### Langkah 1: Buat Repository GitHub
1. Buat repository baru di GitHub
2. Nama: `sistem-kearsipan-sdn005`
3. Set sebagai Public

#### Langkah 2: Upload Frontend Files
1. Upload semua file dari folder `frontend/`
2. Pastikan struktur folder tetap terjaga

#### Langkah 3: Enable GitHub Pages
1. Go to Settings > Pages
2. Source: Deploy from a branch
3. Branch: `main` / `master`
4. Folder: `/ (root)`
5. Save

#### Langkah 3.1: Update API URL
Edit file `frontend/assets/js/app.js`:
```javascript
this.apiBase = 'GANTI_DENGAN_WEB_APP_URL_ANDA';
```

### 4. KONFIGURASI AKUN DEMO

System sudah include akun demo:
- **Admin**: admin@sdn005.sch.id / admin123
- **Pimpinan**: kepsek@sdn005.sch.id / pimpinan123
- **User**: staff@sdn005.sch.id / user123

Ubah email dan password sesuai kebutuhan di Google Sheet USER.

---

## 🔧 KONFIGURASI LANJUTAN

### Custom Domain (Opsional)
1. Di GitHub Pages settings, tambahkan custom domain
2. Setup DNS records (CNAME)
3. Update base URL jika perlu

### Email Notifications
1. Di Google Apps Script, tambahkan function `sendEmail()`
2. Setup trigger untuk notifikasi otomatis

### Backup & Recovery
1. Google Sheet auto-backup oleh Google
2. Export regular data ke CSV
3. Setup Google Drive backup schedule

---

## 📊 STRUKTUR DATABASE

### Google Sheet Tables

#### 1. SHEET: USER
```
NO | NAMA | JABATAN | NIP/NIPPPK | EMAIL | PASSWORD | ROLE | PANGKAT-GOLONGAN | STATUS | CREATED_AT | UPDATED_AT
```

#### 2. SHEET: AGENDA_SURAT_MASUK
```
No | Tgl Kirim | No Agenda | No Surat | Tgl Surat | Tujuan Surat | Perihal | Kode Arsip | Sifat Surat | Media | Penandatangan | Pengolah | Lokasi Arsip | Ket | FILE_ID | FILE_URL | DISPOSISI_STATUS | DISPOSISI_BY | DISPOSISI_DATE | CREATED_BY | CREATED_AT
```

#### 3. SHEET: AGENDA_SURAT_KELUAR
```
No | Tgl Terima | No Agenda | Tgl Surat | No Surat | Asal Surat | Perihal | Kode Arsip | Jenis Penerimaan | Sifat | Tujuan | Disposisi Kepala Sekolah | Tindak Lanjut | Pelaksana | Lokasi Arsip | Ket | FILE_ID | FILE_URL | NOMOR_OTOMATIS | TEMPLATE_ID | CREATED_BY | CREATED_AT
```

#### 4. SHEET: TEMPLATE_SURAT
```
ID | NAMA_TEMPLATE | KATEGORI | ISI_TEMPLATE | VARIABLES | STATUS | CREATED_BY | CREATED_AT | UPDATED_AT
```

#### 5. SHEET: ARSIP
```
ID | NOMOR_SURAT | JUDUL | KODE_ARSIP | TANGGAL | FILE_ID | FILE_URL | DESKRIPSI | STATUS | CREATED_BY | CREATED_AT
```

#### 6. SHEET: LOG_AKTIVITAS
```
ID | USER_EMAIL | ACTION | DESCRIPTION | IP_ADDRESS | USER_AGENT | TIMESTAMP | ADDITIONAL_DATA
```

#### 7. SHEET: KODE_ARSIP
```
NO | KATEGORI | KODE_KLASIFIKASI | JENIS_ARSIP | CONTOH_DOKUMEN | TINGKAT_KEAMANAN | STATUS | RETENTION_SCHEDULE
```

---

## 🔐 SISTEM PENOMORAN SURAT

### Format Otomatis
```
[KODE_ARSIP]/[NOMOR_URUT_3_DIGIT]/SDN.005.TPTM/[BULAN_ROMAWI]/[TAHUN_4_DIGIT]
```

### Contoh
```
400.1.1/023/SDN.005.TPTM/III/2026
```

### Komponen:
- **KODE_ARSIP**: Diambil dari tabel KODE_ARSIP
- **NOMOR_URUT**: Auto increment (001-999), reset per kode+tahun
- **BULAN_ROMAWI**: I, II, III, ..., XII
- **TAHUN**: Format 4 digit

### Implementasi:
- Gunakan `LockService` untuk mencegah conflict
- Simpan counter di PropertiesService atau Sheet
- Auto-reset setiap tahun baru per kode arsip

---

## 👥 USER ROLES & PERMISSIONS

### 1. ADMIN
- ✅ CRUD User Management
- ✅ CRUD Template Surat
- ✅ CRUD Kode Arsip
- ✅ Full access ke semua menu
- ✅ System configuration
- ✅ Backup & restore

### 2. PIMPINAN (Kepala Sekolah/Wakasek)
- ✅ View Dashboard
- ✅ Disposisi surat masuk
- ✅ Monitoring surat & arsip
- ✅ View laporan
- ❌ Edit user/template

### 3. USER (Staff/Guru)
- ✅ Buat surat keluar
- ✅ Upload surat masuk/keluar
- ✅ View data sesuai kewenangan
- ✅ Print surat
- ❌ Akses admin

---

## 📱 RESPONSIVE DESIGN

### Breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md-lg)
- **Desktop**: > 1024px (xl)

### Features:
- Collapsible sidebar (mobile)
- Touch-friendly buttons (min 44px)
- Optimized tables (horizontal scroll)
- Adaptive layouts

---

## 🔧 MAINTENANCE & TROUBLESHOOTING

### Daily Tasks
- Monitor system logs
- Check file storage quota
- Review user activities

### Weekly Tasks
- Backup data export
- Update template if needed
- Review retention schedule

### Monthly Tasks
- System performance review
- Security audit
- User access review

### Common Issues & Solutions

#### 1. Web App Timeout
- **Problem**: Request timeout > 30 seconds
- **Solution**: Optimize queries, use pagination

#### 2. File Upload Failed
- **Problem**: File size > limit
- **Solution**: Compress files, increase Google Drive quota

#### 3. Authentication Issues
- **Problem**: Session expired
- **Solution**: Clear browser cache, re-login

#### 4. Number Generation Conflict
- **Problem**: Duplicate nomor surat
- **Solution**: Check LockService implementation

---

## 📈 PERFORMANCE OPTIMIZATION

### Frontend
- Minify CSS/JS files
- Optimize images
- Use CDN for libraries
- Implement lazy loading

### Backend
- Cache frequently accessed data
- Optimize Google Sheet queries
- Use batch operations
- Implement rate limiting

### Database
- Regular cleanup of old logs
- Archive old records
- Optimize sheet structure

---

## 🔒 SECURITY CONSIDERATIONS

### Authentication
- Password hashing (SHA-256)
- Session timeout
- Rate limiting login attempts

### Data Protection
- HTTPS enforcement
- Input validation
- XSS prevention
- CSRF protection

### Access Control
- Role-based permissions
- IP restrictions (optional)
- Audit logging

---

## 📞 SUPPORT & CONTACT

### Technical Support
- **Email**: it.support@sdn005.sch.id
- **Phone**: [Nomor IT Support]
- **Documentation**: [Link ke dokumentasi online]

### Training Resources
- User manual (PDF)
- Video tutorials
- Workshop schedule

---

## 📝 CHANGE LOG

### v1.0.0 (2026-03-15)
- Initial release
- Core functionality implemented
- Basic user management
- Template system
- Archive management

### Future Updates
- Mobile app version
- Advanced reporting
- Integration with other systems
- AI-powered features

---

## 📄 LICENSE & COPYRIGHT

© 2026 SDN 005 - All Rights Reserved

Developed by: Tim IT SDN 005
Technology Stack: Google Apps Script + GitHub Pages

---

*Last Updated: 15 Maret 2026*
*Document Version: 1.0*