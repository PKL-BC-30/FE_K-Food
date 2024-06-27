import type { Component } from 'solid-js';
import { Link, useRoutes, useLocation } from '@solidjs/router';

import { routes } from './routes';

const App: Component = () => {
  const location = useLocation();
  const Route = useRoutes(routes);

  return (
    <>
      <nav class="bg-gray-200 text-gray-900 px-4">
        <ul class="flex items-center">
          <li class="py-2 px-4">
            <Link href="/" class="no-underline hover:underline">
              Home
            </Link>
          </li>
          <li class="py-2 px-4">
            <Link href="/about" class="no-underline hover:underline">
              About
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <Route />
      </main>
    </>
  );
};

export default App;
