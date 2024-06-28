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
        <h1 class="title">Tentang K-Food</h1>

        <p class="description">
          Selamat datang di K-Food, situs yang didedikasikan untuk menghadirkan pengalaman terbaik
          dalam menjelajahi berbagai makanan Korea. Kami menghadirkan berbagai informasi terkini
          tentang hidangan khas Korea, resep-resep menarik, serta cerita dibalik kelezatan makanan
          yang kami cintai.
        </p>

        <p class="description">
          Di K-Food, kami percaya bahwa makanan bukan hanya sekadar kebutuhan, tetapi juga merupakan
          jendela budaya yang membawa orang-orang bersama-sama. Melalui artikel-artikel kami, kami
          ingin menginspirasi Anda untuk mengeksplorasi dan mencoba berbagai hidangan Korea yang
          menggugah selera.
        </p>

        <p class="footer">
          <span>&copy; K-Food 2024</span>
          <Suspense fallback={<span>...</span>}>
            <span class="name">&nbsp;{name()}</span>
          </Suspense>
        </p>
      </div>
    </section>
  );
};

export default About;
