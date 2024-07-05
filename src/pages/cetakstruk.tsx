import { Component } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import './cetakstruk.css'; // Pastikan Anda mengimpor file CSS yang sesuai
import jsPDF from 'jspdf'; // Import jspdf
import html2canvas from 'html2canvas'; // Import html2canvas

const CetakStruk: Component = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pastikan location.state tidak kosong sebelum mencoba mengakses data
  const { cart, total } = location.state || { cart: [], total: 0 };

  const handleBack = () => {
    navigate('/dashboard'); // Ganti dengan rute yang sesuai
  };

  const handlePrint = async () => {
    try {
      const canvas = await html2canvas(document.body, { scale: 1 }); // Capture entire page
      const imgData = canvas.toDataURL('image/png');

      // Tampilkan preview dalam sebuah iframe
      const previewWindow = window.open('', '_blank');
      if (!previewWindow) {
        throw new Error('Failed to open preview window');
      }

      const previewDocument = previewWindow.document;
      previewDocument.open();
      previewDocument.write(`<img src="${imgData}" style="width:100%;" />`);
      previewDocument.close();

      // Simpan sebagai PDF setelah menampilkan preview
      const pdf = new jsPDF();
      const imgWidth = 210; // PDF document width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('struk_pembelian.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div class="min-h-screen bg-gray-100">
      <div class="main">
        <div class="content">
          <div class="struk">
            <h2>Struk Pembelian</h2>
            <hr />
            <div class="box" id="printContent">
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    <div class="item">
                      <p>Nama: {item.name}</p>
                      <p>Jumlah: {item.qty}</p>
                      <p>Harga: Rp {item.price},00</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <h3>Total Pembelian: Rp {total},00</h3>
            <div class="button-group">
              <button class="print-btn" onClick={handlePrint}>Print Struk</button>
              <button class="back-btn" onClick={handleBack}>Kembali</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CetakStruk;
