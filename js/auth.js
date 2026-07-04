// Authentication logic

const Auth = {
  getUsers() {
    return JSON.parse(localStorage.getItem('tektok_users') || '[]');
  },

  saveUsers(users) {
    localStorage.setItem('tektok_users', JSON.stringify(users));
  },

  async register(name, email, password) {
    if (password.length < 6) {
      return { ok: false, msg: 'Password minimal 6 karakter.' };
    }
    try {
      const res = await fetch(`${Utils.API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'Pelanggan', status: 'Aktif' })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { ok: false, msg: data.message || 'Gagal mendaftar ke server.' };
      }
      const users = this.getUsers();
      users.push({ name, email, password, role: 'Pelanggan', status: 'Aktif' });
      this.saveUsers(users);
      return { ok: true };
    } catch (err) {
      console.warn('⚡ API Backend offline, mendaftar di localStorage.');
      const users = this.getUsers();
      if (users.find(u => u.email === email)) {
        return { ok: false, msg: 'Email sudah terdaftar.' };
      }
      users.push({ name, email, password, role: 'Pelanggan', status: 'Aktif' });
      this.saveUsers(users);
      return { ok: true };
    }
  },

  async login(email, password) {
    try {
      const res = await fetch(`${Utils.API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { ok: false, msg: data.message || 'Email atau password salah.' };
      }
      localStorage.setItem('tektok_user', JSON.stringify({ name: data.data.name, email: data.data.email, role: data.data.role }));
      return { ok: true };
    } catch (err) {
      console.warn('⚡ API Backend offline, cek login di localStorage.');
      const users = this.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return { ok: false, msg: 'Email atau password salah.' };
      localStorage.setItem('tektok_user', JSON.stringify({ name: user.name, email: user.email, role: user.role }));
      return { ok: true };
    }
  },

  logout() {
    localStorage.removeItem('tektok_user');
    window.location.href = 'index.html';
  }
};

// Login page logic
function initLogin() {
  Utils.applyDark();
  const user = Utils.getCurrentUser();
  if (user) { window.location.href = 'shop.html'; return; }

  document.getElementById('login-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const result = await Auth.login(email, password);
    if (result.ok) {
      Utils.showToast('Login berhasil! Selamat datang 👋', 'success');
      setTimeout(() => window.location.href = 'shop.html', 800);
    } else {
      Utils.showToast(result.msg, 'error');
    }
  });
}

// Register page logic
function initRegister() {
  Utils.applyDark();
  document.getElementById('register-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    if (password !== confirm) {
      Utils.showToast('Password tidak cocok.', 'error');
      return;
    }
    const result = await Auth.register(name, email, password);
    if (result.ok) {
      Utils.showToast('Registrasi berhasil! Silakan login.', 'success');
      setTimeout(() => window.location.href = 'index.html', 1000);
    } else {
      Utils.showToast(result.msg, 'error');
    }
  });
}
