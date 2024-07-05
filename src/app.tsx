import type { Component } from 'solid-js';
import { Link, useRoutes, useLocation } from '@solidjs/router';
import Dashboard from './pages/dashboard';

import { routes } from './routes';

const App: Component = () => {
  const location = useLocation();
  const Route = useRoutes(routes);

  return (
    <>
      <nav class="bg-gray-200 text-gray-900 px-4">
      </nav>

      <main>
        <Route />

        
      </main>
    </>
  );
};

export default App;
