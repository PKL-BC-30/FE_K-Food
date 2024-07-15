import { Component } from 'solid-js';
import './home.css';

const Home: Component = () => {
  return (
    <div class="home-container">
      <div class="home-content">
        <div class="home-image-container">
          <img src="https://i.pinimg.com/564x/51/75/eb/5175eb6886e613bbcd78320c04c7a3c2.jpg" alt="Jajanan Korea" class="home-image" />
        </div>
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
        <div class="additional-info">
          <h2 class="additional-title">Kenapa Memilih K-FOOD?</h2>
          <ul class="additional-list">
            <li class="additional-item">Sistem pembayaran yang mudah dan cepat</li>
            <li class="additional-item">Berbagai pilihan jajanan Korea yang lezat</li>
            <li class="additional-item">Dukungan pelanggan 24/7</li>
            <li class="additional-item">Promo dan diskon menarik setiap minggu</li>
          </ul>
        </div>
        <div class="testimonials">
          <h2 class="testimonials-title">Testimoni Pelanggan</h2>
          <div class="testimonial">
            <p class="testimonial-text">"K-FOOD sangat memudahkan saya dalam membeli jajanan favorit saya. Sangat cepat dan praktis!"</p>
            <p class="testimonial-author">- Lisa, Jakarta</p>
          </div>
          <div class="testimonial">
            <p class="testimonial-text">"Pilihan jajanan Korea di K-FOOD sangat lengkap. Saya selalu menemukan camilan baru yang lezat."</p>
            <p class="testimonial-author">- Deni, Bandung</p>
          </div>
        </div>
        <div class="features">
          <h2 class="features-title">Fitur Unggulan Kami</h2>
          <div class="feature-item">
            <h3 class="feature-title">Pembayaran Cepat</h3>
            <p class="feature-description">Dengan sistem pembayaran kami yang cepat dan aman, Anda dapat menikmati jajanan Korea tanpa ribet.</p>
          </div>
          <div class="feature-item">
            <h3 class="feature-title">Beragam Pilihan</h3>
            <p class="feature-description">Kami menawarkan berbagai macam jajanan Korea dari yang manis hingga yang gurih.</p>
          </div>
          <div class="feature-item">
            <h3 class="feature-title">Layanan Pelanggan 24/7</h3>
            <p class="feature-description">Tim dukungan kami siap membantu Anda kapan saja, setiap hari.</p>
          </div>
        </div>
        <div class="contact">
          <h2 class="contact-title">Hubungi Kami</h2>
          <p class="contact-description">Jika Anda memiliki pertanyaan atau butuh bantuan, jangan ragu untuk menghubungi kami melalui:</p>
          <p class="contact-info">Email: support@k-food.com</p>
          <p class="contact-info">Telepon: 021-12345678</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
