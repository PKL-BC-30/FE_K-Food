import { Component } from 'solid-js';
import './forgotpassword.css';

const ForgotPassword: Component = () => {
  const handleResetPassword = (event) => {
    event.preventDefault();

    const email = event.target['email'].value;
    const newPassword = event.target['new-password'].value;
    const confirmPassword = event.target['confirm-password'].value;

    if (newPassword !== confirmPassword) {
      alert("Kata sandi baru dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    // Mengambil data pengguna dari local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Mencari pengguna berdasarkan email
    const updatedUsers = users.map(user => {
      if (user.email === email) {
        return { ...user, katasandi: newPassword };
      }
      return user;
    });

    // Memvalidasi apakah email ditemukan atau tidak
    const userExists = users.some(user => user.email === email);

    if (!userExists) {
      alert("Email tidak ditemukan.");
      return;
    }

    // Menyimpan data pengguna yang telah diperbarui ke local storage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Mengarahkan kembali ke halaman login setelah reset password berhasil
    window.location.href = '/login';
  };

  return (
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('/register/desain_tanpa_judul_12.png');">
      <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-md bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <h2 class="reset">Reset Kata Sandi</h2>
        <form onSubmit={handleResetPassword}>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" name="email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div class="mb-4">
            <label for="new-password" class="block text-sm font-medium text-gray-700">Kata Sandi Baru:</label>
            <input type="password" id="new-password" name="new-password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div class="mb-6">
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi Baru:</label>
            <input type="password" id="confirm-password" name="confirm-password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          </div>
          <div class="flex flex-col items-center">
            <button type="submit" class="button">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
