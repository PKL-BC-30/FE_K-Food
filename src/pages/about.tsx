import { Component, createEffect, Suspense } from 'solid-js';
import { useRouteData } from '@solidjs/router';
import type { AboutDataType } from './about.data';
import './about.css';

export default function About() {
  const name = useRouteData<AboutDataType>();

  createEffect(() => {
    console.log(name());
  });

  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-3xl font-bold text-center mb-4">Tentang K-Food</h1>

      <p class="text-lg mb-4">
        Selamat datang di K-Food, situs yang didedikasikan untuk menghadirkan pengalaman terbaik
        dalam menjelajahi berbagai makanan Korea. Kami menghadirkan berbagai informasi terkini
        tentang hidangan khas Korea, resep-resep menarik, serta cerita dibalik kelezatan makanan
        yang kami cintai.
      </p>

      <p class="text-lg mb-4">
        Di K-Food, kami percaya bahwa makanan bukan hanya sekadar kebutuhan, tetapi juga merupakan
        jendela budaya yang membawa orang-orang bersama-sama. Melalui artikel-artikel kami, kami
        ingin menginspirasi Anda untuk mengeksplorasi dan mencoba berbagai hidangan Korea yang
        menggugah selera.
      </p>

      <p class="text-lg">
        <span>@Copyright K-Food 2024</span>
        <Suspense fallback={<span>...</span>}>
          <span>&nbsp;{name()}</span>
        </Suspense>
      </p>
    </section>
  );
}
