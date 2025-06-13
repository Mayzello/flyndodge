import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TutorialPage.css";

const TutorialPage = () => {
  const navigate = useNavigate();

  return (
    <div className="tutorial-container">
      <h1 className="tutorial-title">TUTORIAL</h1>
      <div className="tutorial-content">
        <div className="game-image-placeholder">
        </div>
        <div className="instructions">
          <h2>🎮 Tujuan Game</h2>
          <p>Hindari semua roket yang datang dari kanan dan bertahan selama mungkin untuk mendapatkan skor tertinggi.</p>

          <h2>🕹️ Kontrol</h2>
          <ul>
            <li>Tombol Atas: Naik</li>
            <li>Tombol Bawah: Turun</li>
            <li>Tombol Kanan: Kanan</li>
            <li></li>
          </ul>

          <h2>🚀 Aturan Main</h2>
          <ul>
            <li>Roket akan muncul dari sisi kanan layar secara acak.</li>
            <li>Gerakkan karakter ke atas atau bawah untuk menghindar.</li>
            <li>Jika terkena roket, permainan berakhir.</li>
            <li>Skor dihitung berdasarkan waktu bertahan.</li>
          </ul>

          <h2>🔁 Tips</h2>
          <ul>
            <li>Jangan bergerak terlalu sering.</li>
            <li>Perhatikan pola roket sebelum berpindah posisi.</li>
          </ul>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate("/")}>⬅ Kembali ke Beranda</button>
    </div>
  );
};

export default TutorialPage;
