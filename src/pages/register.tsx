import { Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import eyeIcon from '/src/pages/images/eye.png';
import eyeOffIcon from '/src/pages/images/eye-off.png';
import './register.css';

interface FormData {
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

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData: FormData = {
      namadepan: namadepan(),
      namabelakang: namabelakang(),
      email: email(),
      katasandi: katasandi()
    };

    try {
      // Simpan data ke localStorage
      localStorage.setItem('user', JSON.stringify(formData));

      // Kirim data ke server
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Registration successful');
        navigate('/dashboard'); // Arahkan ke halaman dashboard setelah pendaftaran berhasil
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div class="background-container">
      <div class="form-container">
        <h2 class="form-title">K-FOOD</h2>
        <div class="google-signup-wrapper">
          <a href="https://accounts.google.com/AccountChooser" class="google-signup-btn">
            <img src="/src/pages/images/Google.png" alt="google-signup" class="google-signup-icon"/>
            <span class="google-signup-text">Daftar menggunakan akun Google</span>
          </a>
        </div>
        <form onSubmit={handleSubmit}>  
          <div class="name-fields">
            <div class="form-group">
              <label for="namadepan" class="form-label">Nama depan:</label>
              <input 
                type="text" 
                id="namadepan" 
                name="namadepan" 
                class="nama-depan" 
                value={namadepan()} 
                onInput={(e) => setNamaDepan(e.target.value)} 
                required 
              />
            </div>
            <div class="form-group">
              <label for="namabelakang" class="form-label">Nama belakang:</label>
              <input 
                type="text" 
                id="namabelakang" 
                name="namabelakang" 
                class="nama-belakang" 
                value={namabelakang()} 
                onInput={(e) => setNamaBelakang(e.target.value)} 
                required 
              />
            </div>
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
          <div class="submit-wrapper">
            <button type="submit" class="submit-btn">Daftar</button>
            <p class="login-link">
              Sudah memiliki akun? <a href="/login" class="login-anchor">Masuk</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
