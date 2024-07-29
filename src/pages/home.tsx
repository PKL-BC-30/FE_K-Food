import { Component } from 'solid-js';
import './home.css';


const Home: Component = () => {
  return (
    <div class="home-container">
      <header>
        <h1 class="title">K-Taste Tally.</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/dashboard">Menu</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/login">Masuk</a></li>
            {/* <li><a href="#">Contact</a></li> */}
          </ul>
        </nav>
      </header>

      <section class="hero">
        <h2>
          <span>Delicious Korean</span>
          <span>Food is Waiting</span>
          <span>For You</span>
        </h2>
        <button>View More</button>
        <img src="/src/pages/images/icon.png" class="img-icon" />
        <img src="/src/pages/images/panah.png" class="panah-ic" alt="Arrow Icon" />
        <br />
        <br />
        <br />
        <br />

      </section>

      <section class="menu">
        <h2>We Have Best Seller Menu</h2>
        <p class= "menu-description">
        Menu best seller jajanan street food Korea seperti tteokbokki, rabboki, dan odeng (sup ikan rebus) menawarkan kombinasi rasa khas Korea, dari pedas dan gurih hingga manis. Ini sangat dicari oleh penggemar street food di seluruh dunia.
        </p>
        <br />
        <br />
        <br />
        <div class="menu-items">
          <div class="menu-item">
            <img src="/src/pages/images/15.png" class="odeng-img" />
            <p>Odeng</p>
            <span>$25.00</span>
          </div>
          <div class="menu-item">
            <img src="/src/pages/images/16.png" class="toppoki-img" />
            <p>Toppoki</p>
            <span>$25.00</span>
          </div>
        </div>
      </section>

      <section class="highlight">
        <h2>Toppoki Temptations: A Spicy Adventure in Korean Cuisine</h2>
        <img src="/src/pages/images/toppoki4.png" alt="Highlight Dish" />
        <p class="harga">$25.89</p>
        <p class="desk">Rasakan kenikmatan Toppoki, hidangan Korea yang pedas dan lezat. Setiap gigitan kue beras pedas ini menawarkan perpaduan rasa tradisional dan modern. Cocok untuk pecinta pedas, K-Taste Tally mengajak Anda menikmati sensasi gochujang yang kaya dan saus yang memanjakan. Petualangan kuliner ini pasti akan membuat Anda ketagihan!</p>
      </section>

      <footer>
        <div class="footer-section">
          <img src="/src/pages/images/K-TasteTally.png" class="img-icon-footer" />
          <h3>&copy; 2024 K-Taste Tally. All rights reserved.</h3>
          {/* <p>Algeria</p>
          <p>+213 99 99 99 99</p>
          <p>email@example.com</p> */}
        </div>
      </footer>
    </div>
  );
};

export default Home;