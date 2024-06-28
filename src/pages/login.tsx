import { Component, createSignal, onCleanup } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { fetchUsers, User } from '../fetchData';
import CryptoJS from 'crypto-js';
import eyeIcon from '/src/pages/images/eye.png';
import eyeOffIcon from '/src/pages/images/eye-off.png';
import './login.css';

// Dummy user data for authentication (replace with actual JSON data or fetch function)
const users = [
  { username: 'user1', password: 'password123' },
  { username: 'user2', password: 'password456' }
];

interface FormData {
  email: string;
  katasandi: string;
}

const LoginForm: Component = () => {
  const [email, setEmail] = createSignal("");
  const [katasandi, setKataSandi] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const navigate = useNavigate();

  // Cleanup function to handle component unmounting
  onCleanup(() => {
    // Perform cleanup tasks if necessary
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData: FormData = {
      email: email(),
      katasandi: katasandi()
    };

    const hashedPassword = CryptoJS.SHA256(katasandi()).toString(CryptoJS.enc.Hex);

    try {
      const users: User[] = await fetchUsers();
      const foundUser = users.find(user => user.email === email());
      
      // Save the user data to local storage as an array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = [...existingUsers, formData];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Update JSON dummy data (example)
      const dummyData = [...users, formData];
      console.log(dummyData); // Log the updated dummy data

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

  const handleSave = () => {
    const formData: FormData = {
      email: email(),
      katasandi: katasandi()
    };

    // Save the user data to local storage as an array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update JSON dummy data (example)
    const dummyData = [...users, formData];
    console.log(dummyData); // Log the updated dummy data

    alert('Berhasil masuk!');
    navigate('/dashboard');
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
            <button type="button" class="submit-btn" onClick={handleSave}>Masuk</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
