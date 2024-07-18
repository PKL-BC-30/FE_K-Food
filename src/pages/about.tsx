import { Component, createEffect, Suspense } from 'solid-js';
import { useRouteData } from '@solidjs/router';
import type { AboutDataType } from './about.data';
import './about.css';

const About: Component = () => {
  const name = useRouteData<AboutDataType>();

  createEffect(() => {
    console.log(name());
  });

  return (
    <section class="about-section">
      <div class="content-container">
        <h1 class="title">Tentang K-Taste Tally</h1>

        <p class="description">
          Selamat datang di K-Taste Tally, situs yang didedikasikan untuk menghadirkan pengalaman terbaik
          dalam menjelajahi berbagai makanan Korea. Kami menghadirkan berbagai informasi terkini
          tentang hidangan khas Korea, resep-resep menarik, serta cerita dibalik kelezatan makanan
          yang kami cintai.
        </p>

        <p class="description">
        K-Taste Tally adalah aplikasi web kasir yang diciptakan khusus untuk pedagang Korean Food, 
        dirancang untuk menyederhanakan pengelolaan bisnis Anda. Dengan antarmuka yang intuitif dan 
        ramah pengguna, aplikasi ini memungkinkan staf kasir untuk dengan mudah mencatat pesanan pelanggan 
        dan mengelola transaksi penjualan. Anda dapat dengan cepat menambahkan, mengedit, atau menghapus 
        item menu, lengkap dengan deskripsi, harga, dan gambar. Dengan dukungan untuk berbagai metode 
        pembayaran seperti tunai, kartu kredit, dan e-wallet, serta integrasi dengan perangkat keras 
        seperti printer struk dan scanner barcode, K-Taste Tally mengoptimalkan efisiensi operasional 
        dan memastikan pengalaman pelanggan yang mulus di restoran Anda.
        </p>

        <p class="footer">
          <span>&copy; K-Taste Tally 2024</span>
          <Suspense fallback={<span>...</span>}>
            <span class="name">&nbsp;{name()}</span>
          </Suspense>
        </p>
      </div>
    </section>
  );
};

export default About;