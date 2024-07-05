import { Component, createSignal } from 'solid-js';
import CryptoJS from 'crypto-js';
import { useNavigate } from '@solidjs/router';
import './register.css';

interface User {
  namaDepan: string;
  namaBelakang: string;
  email: string;
  katasandi: string;
}

const RegisterForm: Component = () => {
  const [namaDepan, setNamaDepan] = createSignal("");
  const [namaBelakang, setNamaBelakang] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [katasandi, setKataSandi] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!namaDepan() || !namaBelakang() || !email() || !katasandi()) {
      alert("Semua kolom harus diisi!");
      return;
    }

    if (katasandi().length < 8) {
      alert("Kata sandi harus terdiri dari minimal 8 karakter!");
      return;
    }

    const hashedPassword = CryptoJS.SHA256(katasandi()).toString(CryptoJS.enc.Hex);

    const newUser: User = {
      namaDepan: namaDepan(),
      namaBelakang: namaBelakang(),
      email: email(),
      katasandi: hashedPassword
    };

    // Save to local storage
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Berhasil Daftar!');
    
    // Redirect to login page
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div class="background-container">
      <div class="form-container">
        <h2 class="form-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="namaDepan" class="form-label">Nama Depan:</label>
            <input 
              type="text" 
              id="namaDepan" 
              name="namaDepan" 
              class="form-input" 
              value={namaDepan()} 
              onInput={(e) => setNamaDepan(e.target.value)} 
              required 
            />
          </div>
          <div class="form-group">
            <label for="namaBelakang" class="form-label">Nama Belakang:</label>
            <input 
              type="text" 
              id="namaBelakang" 
              name="namaBelakang" 
              class="form-input" 
              value={namaBelakang()} 
              onInput={(e) => setNamaBelakang(e.target.value)} 
              required 
            />
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              class="form-input" 
              value={email()} 
              onInput={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div class="form-group">
            <label for="katasandi" class="form-label">Kata Sandi:</label>
            <input 
              type="password" 
              id="katasandi" 
              name="katasandi" 
              class="form-input" 
              value={katasandi()} 
              onInput={(e) => setKataSandi(e.target.value)} 
              required 
            />
          </div>
          <div class="submit-wrapper">
            <button type="submit" class="submit-btn">Daftar</button>
          </div>
          <div class="login-link">
            <p>Sudah memiliki akun? <a href="/login">Masuk</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
