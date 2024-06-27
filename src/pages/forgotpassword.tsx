import { Component } from 'solid-js';

import './forgotpassword.css';

const ForgotPassword: Component = () => {
  

  const handleResetPassword = (event) => {
    event.preventDefault();
    // Tambahkan logika reset password di sini

    // Mengarahkan kembali ke halaman login setelah reset password berhasil
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('/register/desain_tanpa_judul_12.png');">
      <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-md bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <h2 class="text-3xl font-bold text-center mb-6">Reset Kata Sandi</h2>
        <form onSubmit={handleResetPassword}>
          <div class="mb-4">
            <label for="new-password" class="block text-sm font-medium text-gray-700">Kata Sandi Baru:</label>
            <input type="password" id="new-password" name="new-password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div class="mb-6">
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi Baru:</label>
            <input type="password" id="confirm-password" name="confirm-password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div class="flex flex-col items-center">
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md mb-4">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
