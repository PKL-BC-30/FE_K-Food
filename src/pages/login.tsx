import { Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import eyeIcon from '/src/pages/images/eye.png';
import eyeOffIcon from '/src/pages/images/eye-off.png';
import './login.css';

interface FormData {
  email: string;
  katasandi: string;
}

const LoginForm: Component = () => {
  const [email, setEmail] = createSignal("");
  const [katasandi, setKataSandi] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData: FormData = {
      email: email(),
      katasandi: katasandi()
    };

    try {
      localStorage.setItem('user', JSON.stringify(formData))
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Berhasil Masuk!');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        alert('Gagal Masuk!');
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
          <div class="submit-wrapper">
            <button type="submit" class="submit-btn">Masuk</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
