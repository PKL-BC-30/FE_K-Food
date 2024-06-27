import { Component } from 'solid-js';
import './login.css';

const LoginForm: Component = () => {
  return (
    <div class="min-h-screen flex items-center justify-end bg-cover bg-center" style="background-image: url('/src/pages/images/background.png');">
      <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-md bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <h2 class="text-3xl font-bold text-center mb-6">K-FOOD</h2>
        <div class="flex items-center justify-center mb-6">
          <a href="https://accounts.google.com/AccountChooser" class="google-signup-btn">
            <img src="/src/pages/images/Google.png" alt="google-signup" class="google-signup"/>
            <span class="text-gray-700 ml-2">Daftar menggunakan akun Google</span>
          </a>
        </div>
        <form>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" name="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Kata Sandi:</label>
            <input type="password" id="password" name="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div class="flex flex-col items-center">
            <a href="/dashboard"></a><button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md mb-4">Masuk</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
