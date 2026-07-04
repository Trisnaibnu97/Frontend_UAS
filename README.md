# 🛍️ Frontend Online Store & Admin Dashboard - Bang IB Shop

Repository ini memuat antarmuka pengguna (UI/UX) Frontend untuk e-commerce **Bang IB Shop** dan **Dashboard Admin**, lengkap dengan desain responsif mobile, navigasi ala aplikasi (Bottom Navigation Bar & Drawer Sidebar), serta fitur upload foto produk langsung.

---

## 📁 Struktur Halaman Frontend
```text
Bang_IB-shop/
├── index.html         # Halaman Login Admin & Pengguna
├── register.html      # Pendaftaran Pengguna Baru
├── shop.html          # Katalog Produk Utama (Storefront)
├── cart.html          # Keranjang Belanja
├── checkout.html      # Pengisian Alamat & Pemilihan Kurir Ongkir
├── payment.html       # Simulasi Pembayaran & Konfirmasi WhatsApp
├── orders.html        # Riwayat Pesanan Pelanggan
├── wishlist.html      # Daftar Produk Favorit (Wishlist)
├── admin.html         # Dashboard Admin (Kelola Produk, Pesanan & Kategori)
└── js/                # Logika Integrasi API & State Management
    ├── utils.js       # Konfigurasi API Base URL & Helper UI Responsif
    ├── admin.js       # CRUD Produk (Base64 Image Upload), Pesanan, Kategori
    ├── products.js    # Fetch & Render Produk Toko
    └── ...
```

---

## 🔗 Konfigurasi URL API Backend

Secara default, frontend ini terhubung dengan backend API yang di-host di Railway.
Jika kamu ingin menghubungkan ke backend lokal atau server backend milikmu sendiri yang terpisah, buka file `js/utils.js` dan ubah `API_BASE_URL`:

```javascript
// Di file js/utils.js:
API_BASE_URL: 'https://trisnaibnumutsweb2-production.up.railway.app/api', 
// Jika lokal: 'http://localhost:5000/api'
```

---

## 🌟 Fitur Unggulan UI/UX
* **100% Mobile Responsive:** Dilengkapi *Bottom Navigation Bar* untuk pembeli di layar HP dan *Slide-over Drawer Menu* untuk admin.
* **Upload Foto Produk (Base64):** Admin dapat mengunggah file foto produk langsung dari galeri ponsel/laptop dengan fitur pratinjau (*live preview*).
* **Mode Gelap (Dark Mode):** Tersedia di seluruh halaman toko maupun admin dashboard.
