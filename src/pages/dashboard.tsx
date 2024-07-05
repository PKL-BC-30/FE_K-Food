import { Component, createSignal, onCleanup, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import './dashboard.css';
import html2canvas from 'html2canvas'; // Import html2canvas
import jsPDF from 'jspdf'; // Import jspdf

const Dashboard: Component = () => {
  const [cart, setCart] = createSignal<{ name: string, price: number, qty: number, img: string }[]>([]);
  const [total, setTotal] = createSignal(0);
  const [orderSuccess, setOrderSuccess] = createSignal(false);
  const [printVisible, setPrintVisible] = createSignal(false);
  const [pendingOrder, setPendingOrder] = createSignal(false);
  const navigate = useNavigate(); // Use navigate for routing

  // Define foodItems with stock from localStorage or default
  let foodItems: { name: string, price: number, stock: number, img: string }[] = [
    { name: 'Dumpling Keju', price: 2000, stock: 10, img: './src/pages/images/dumpling keju.png' },
    { name: 'Odeng', price: 3000, stock: 10, img: './src/pages/images/odeng.png' },
    { name: 'Crabstik', price: 2500, stock: 12, img: './src/pages/images/crabstick.png' },
    { name: 'Chikuwa', price: 2000, stock: 12, img: './src/pages/images/chikuwa.png' },
    { name: 'Toppoki', price: 1000, stock: 12, img: './src/pages/images/toppoki.png' },
  ];

  // Retrieve foodItems from localStorage if available
  const storedItems = localStorage.getItem('foodItems');
  if (storedItems) {
    foodItems = JSON.parse(storedItems);
  } else {
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
  }

  // Update localStorage when foodItems change
  onCleanup(() => {
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
  });

  const addToCart = (item: { name: string, price: number, stock: number, img: string }) => {
    const existingItem = cart().find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      const updatedCart = cart().map((cartItem) =>
        cartItem.name === item.name ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart(), { ...item, qty: 1 }]);
    }
    setTotal(total() + item.price);
  };

  const removeFromCart = (index: number) => {
    const item = cart()[index];
    setCart(cart().filter((_, i) => i !== index));
    setTotal(total() - item.price * item.qty);
  };

  const handleOrderNow = () => {
    if (cart().length === 0) {
      alert('Silakan pilih makanan terlebih dahulu!');
      return;
    }

    // Deduct stock when placing order
    cart().forEach(item => {
      const foodIndex = foodItems.findIndex(food => food.name === item.name);
      if (foodIndex !== -1) {
        foodItems[foodIndex].stock -= item.qty;
      }
    });

    setOrderSuccess(true);
    setPendingOrder(true);
  };

  const handlePrint = () => {
    const element = document.getElementById('printContent'); // Id of the element to print
    if (!element) return;
    navigate('/cetakstruk', { state: { cart: cart(), total: total() } });

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // PDF document width in mm
      const imgHeight = canvas.height * imgWidth / canvas.width; // Scale height based on canvas width
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('struk_pembelian.pdf');

      // navigate('/cetakstruk', { state: { cart: cart(), total: total() } });
    });
  };

  const handleOk = () => {
    setPendingOrder(false); // Setel pendingOrder kembali ke false setelah stok berkurang
    setPrintVisible(true); // Tampilkan tombol "Print Struk"
  };

  return (
    <div class="min-h-screen bg-gray-100">
      <div class="navbar">
        <img src="./src/pages/images/K-Food_Logo.png" alt="Logo" />
        <ul>
          <li><a href="./dashboard">Daftar Makanan</a></li>
          <li><a href="./about">Tentang Kami</a></li>
        </ul>
      </div>
      <div class="main">
        <div class="content" id="foodList">
          {foodItems.map((item) => (
            <div class="card" key={item.name}>
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
              <p>Rp {item.price},00 | Stok: {item.stock}</p>
              <button class="pesan" onClick={() => addToCart(item)}>Pesan</button>
            </div>
          ))}
        </div>
        <div class="sidebar" id="cartList">
          <div class="total">
            <h1>Total: Rp {total()},00</h1>
            <hr />
          </div>
          {cart().map((item, index) => (
            <div class="card-order" key={item.name}>
              <div class="detail">
                <img src={item.img} alt={item.name} />
                <p>{item.name}</p>
                <span>{item.qty}</span>
              </div>
              <button onClick={() => removeFromCart(index)}><i class="fas fa-trash"></i> Hapus</button>
            </div>
          ))}
          <div class="card-finish">
            {orderSuccess() ? (
              <>
                <p>Pesanan berhasil!</p>
                <button onClick={handleOk}>OK</button>
              </>
            ) : (
              <button onClick={handleOrderNow}>ORDER SEKARANG</button>
            )}
            {printVisible() && !pendingOrder() && (
              <button style={{ "margin-top": '10px' }} onClick={handlePrint}>Print Struk</button>
            )}
          </div>
        </div>
      </div>
      {/* Element untuk menampilkan struk pembelian */}
      <div id="printContent" style={{ display: 'none' }}>
        <h2>Struk Pembelian</h2>
        <hr />
        <h3>Total Pembelian: Rp {total()},00</h3>
        <ul>
          {cart().map(item => (
            <li key={item.name}>
              <p>Nama: {item.name}</p>
              <p>Jumlah: {item.qty}</p>
              <p>Harga Satuan: Rp {item.price},00</p>
              <p>Subtotal: Rp {item.price * item.qty},00</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
