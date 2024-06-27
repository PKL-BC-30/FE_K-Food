import { Component } from 'solid-js';
import './home.css';

const Home: Component = () => {
  return (
    <div class="home-container">
      <div class="home-content">
        <div class="home-text">
          <h1 class="home-title">Selamat Datang di K-FOOD</h1>
          <p class="home-description">
            Rasakan kemudahan sistem pembayaran kami yang dirancang khusus untuk pecinta jajanan Korea. Jika anda pecinta Tteokbokki, Hotteok, atau camilan lezat lainnya, K-FOOD memudahkan Anda untuk memenuhi keinginan Anda.
          </p>
          <div class="home-buttons">
            <a href="/register" class="home-button primary-button">Mulai Sekarang</a>
            <a href="/about" class="home-button secondary-button">Pelajari Lebih Lanjut</a>
          </div>
        </div>
        <div class="home-image-container">
          <img src="https://i.pinimg.com/564x/51/75/eb/5175eb6886e613bbcd78320c04c7a3c2.jpg" alt="Jajanan Korea" class="home-image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
