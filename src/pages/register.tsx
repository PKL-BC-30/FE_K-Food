import { Component, createSignal } from 'solid-js';
import CryptoJS from 'crypto-js';
import { useNavigate } from '@solidjs/router';
import eyeIcon from '/src/pages/images/eye.png';
import eyeOffIcon from '/src/pages/images/eye-off.png';
import './register.css';

interface User {
  namadepan: string;
  namabelakang: string;
  email: string;
  katasandi: string;
}

const RegisterForm: Component = () => {
  const [namadepan, setNamaDepan] = createSignal("");
  const [namabelakang, setNamaBelakang] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [katasandi, setKataSandi] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const navigate = useNavigate();

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!namadepan() || !namabelakang() || !email() || !katasandi()) {
      alert("Semua kolom harus diisi!");
      return;
    }

    if (katasandi().length < 8) {
      alert("Kata sandi harus terdiri dari minimal 8 karakter!");
      return;
    }

    // const hashedPassword = CryptoJS.SHA256(katasandi()).toString(CryptoJS.enc.Hex);

    const newUser: User = {
      namadepan: namadepan(),
      namabelakang: namabelakang(),
      email: email(),
      katasandi: katasandi()
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
            <label for="namadepan" class="form-label">Nama Depan:</label>
            <input 
              type="text" 
              id="namadepan" 
              name="namadepan" 
              class="form-input" 
              value={namadepan()} 
              onInput={(e) => setNamaDepan(e.target.value)} 
              required 
            />
          </div>
          <div class="form-group">
            <label for="namabelakang" class="form-label">Nama Belakang:</label>
            <input 
              type="text" 
              id="namabelakang" 
              name="namabelakang" 
              class="form-input" 
              value={namabelakang()} 
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
              type={showPassword() ? "text" : "password"} 
              id="katasandi" 
              name="katasandi" 
              class="form-input" 
              value={katasandi()} 
              onInput={(e) => setKataSandi(e.target.value)} 
              required 
            />
            <img 
              src={showPassword() ? eyeIcon : eyeOffIcon} 
              alt="Toggle visibility" 
              class="password-toggle-icon" 
              onClick={togglePasswordVisibility} 
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
