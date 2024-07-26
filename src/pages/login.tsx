import { Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import eyeIcon from '/src/pages/images/eye.png';
import eyeOffIcon from '/src/pages/images/eye-off.png';
import './login.css';

interface User {
  email: string;
  katasandi: string;
  role: string;
}

const LoginForm: Component = () => {
  const [email, setEmail] = createSignal("");
  const [katasandi, setKataSandi] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!email() || !katasandi()) {
      alert("Semua kolom harus diisi!");
      return;
    }

    try {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(user => user.email === email());

      if (foundUser && foundUser.katasandi === katasandi()) {
        alert('Berhasil Masuk!');
        
        // Cek role pengguna
        if (foundUser.role === 'Admin') {
          navigate('/useradm'); // Redirect to user admin page
        } else {
          navigate('/dashboard'); // Redirect to dashboard
        }
      } else {
        alert('Email atau kata sandi salah!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan');
    }
  };

  return (
    <div class="background-container">
      <div class="form-container">
        <h2 class="form-title">K-FOOD</h2>
        <div class="google-signup-wrapper">
          <a href="https://accounts.google.com/AccountChooser" class="google-signup-btn">
            <img src="/src/pages/images/Google.png" alt="google-signup" class="google-signup-icon"/>
            <span class="google-signup-text">Masuk menggunakan akun Google</span>
          </a>
        </div>
        <form onSubmit={handleSubmit}>  
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
          <div class="form-group relative">
            <label for="password" class="form-label">Kata Sandi:</label>
            <input 
              type={showPassword() ? "text" : "password"} 
              id="password" 
              name="password" 
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
          <div class="forgot-password">
            <a href="/forgotpassword" class="forgot-password">Lupa kata sandi?</a>
          </div>
          <div class="submit-wrapper">
            <button type="submit" class="submit-btn">Masuk</button>
          </div>
          <div class="register-link">
            Belum memiliki akun? <a href="/register" class="register-link-text">Daftar</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
