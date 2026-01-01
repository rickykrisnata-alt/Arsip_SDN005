# QUICK DEPLOYMENT GUIDE
## Sistem Kearsipan Surat SDN 005

---

## ⚡ FAST SETUP (15 Menit)

### 📋 PREREQUISITES
- Google Account (sekolah)
- Akses ke Google Sheets & Drive
- GitHub Account (untuk hosting)

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### STEP 1: GOOGLE APPS SCRIPT SETUP (5 Menit)

1. **Buka Google Apps Script**
   - Kunjungi: https://script.google.com
   - Login dengan email sekolah

2. **Buat Project Baru**
   - Klik "New Project"
   - Nama: `Sistem Kearsipan SDN 005`

3. **Copy-Paste Code**
   ```javascript
   // Copy semua isi dari backend/Code.gs
   // Paste ke editor Apps Script
   ```

4. **Setup Spreadsheet**
   - Jalankan function: `setupCompleteSystem()`
   - Berikan izin (Authorize)
   - Catat Spreadsheet ID & Web App URL

5. **Deploy Web App**
   - Deploy > New Deployment > Web App
   - Execute as: Me
   - Access: Anyone with Google account
   - Copy Web App URL

### STEP 2: FRONTEND SETUP (5 Menit)

1. **GitHub Repository**
   - Buat repo baru: `sistem-kearsipan-sdn005`
   - Upload semua file dari folder `frontend/`

2. **Enable GitHub Pages**
   - Settings > Pages
   - Source: Deploy from branch
   - Branch: main > root folder

3. **Update API URL**
   - Edit `assets/js/app.js`
   - Ganti `YOUR_SCRIPT_ID` dengan Web App URL

### STEP 3: FINAL CONFIGURATION (5 Menit)

1. **Test Login**
   - Buka GitHub Pages URL
   - Login dengan akun demo:
     - Admin: admin@sdn005.sch.id / admin123
     - Pimpinan: kepsek@sdn005.sch.id / pimpinan123
     - User: staff@sdn005.sch.id / user123

2. **Update Email Accounts**
   - Buka Google Sheet USER
   - Ganti email demo dengan email aktual
   - Update password jika perlu

3. **Customize School Info**
   - Update nama sekolah di template
   - Ganti logo jika perlu
   - Sesuaikan kode arsip

---

## 🔧 ESSENTIAL CONFIGURATIONS

### Update Constants (Code.gs)
```javascript
const SPREADSHEET_ID = "PASTE_SPREADSHEET_ID_DISINI";
const DRIVE_FOLDER_ID = "PASTE_FOLDER_ID_DISINI";
```

### Update API URL (app.js)
```javascript
this.apiBase = 'PASTE_WEB_APP_URL_DISINI';
```

### Update School Info (HTML files)
```html
<h1 class="text-xl font-bold text-gray-900">Sistem Kearsipan Surat</h1>
<p class="text-xs text-gray-500">SDN 005</p>
```

---

## ✅ TESTING CHECKLIST

### Basic Functionality
- [ ] Login berhasil dengan semua role
- [ ] Dashboard menampilkan data
- [ ] Buat surat dengan nomor otomatis
- [ ] Upload file surat
- [ ] Template management (admin)
- [ ] User management (admin)
- [ ] Archive system

### Advanced Features
- [ ] Disposisi surat (pimpinan)
- [ ] Export/print surat
- [ ] Search & filter
- [ ] Mobile responsive
- [ ] Charts & statistics

---

## 🚨 COMMON ISSUES & FIXES

### Issue: "Web App URL not working"
**Fix**: Pastikan deploy sebagai "Web App" dan access "Anyone with Google account"

### Issue: "Cannot load spreadsheet"
**Fix**: Check SPREADSHEET_ID di Code.gs, pastikan benar

### Issue: "File upload failed"
**Fix**: Check Google Drive quota dan permissions

### Issue: "Login not working"
**Fix**: Pastikan email & password benar di Google Sheet USER

---

## 📱 MOBILE ACCESS

System sudah responsive untuk mobile:
- Sidebar otomatis collapse
- Touch-friendly buttons
- Optimized tables

---

## 🔐 SECURITY NOTES

### Important:
- Ganti password default akun demo
- Batasi akses Web App jika perlu
- Regular backup data
- Monitor user activities

---

## 📞 SUPPORT NEEDED?

### Quick Help:
1. **Documentation**: Lihat README.md lengkap
2. **Demo Accounts**: Gunakan akun demo untuk testing
3. **Troubleshooting**: Lihat section Common Issues

### Contact:
- **Email IT**: it.support@sdn005.sch.id
- **Documentation**: README.md

---

## 🎉 YOU'RE READY!

Setelah mengikuti steps di atas:
1. ✅ Backend API ready (Google Apps Script)
2. ✅ Frontend live (GitHub Pages)
3. ✅ Database configured (Google Sheets)
4. ✅ File storage ready (Google Drive)
5. ✅ User accounts created

**System siap digunakan!** 🚀

---

*Deployment Time: ~15 menit*
*Requirements: Google Account + GitHub*
*Support: Full documentation available*