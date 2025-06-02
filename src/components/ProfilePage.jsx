import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/ProfilePage.css";
import { ref, update, onValue } from "firebase/database";
import { database } from "../firebase";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user")) || {};
    if (stored.uid) {
      const userRef = ref(database, `users/${stored.uid}`);
      onValue(userRef, (snapshot) => {
        const dbUser = snapshot.val();
        const mergedUser = {
          ...stored,
          username: dbUser?.username || stored.username,
          email: dbUser?.email || stored.email,
          photoURL: dbUser?.photoURL || stored.photoURL,
          highScore: dbUser?.highScore || 0,
          survivalTime: dbUser?.survivalTime || "0:00",
        };
        setUser(mergedUser);
        localStorage.setItem("user", JSON.stringify(mergedUser));
      });
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        const updatedUser = { ...user, photoURL: base64 };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        if (user.uid) {
          const userRef = ref(database, `users/${user.uid}`);
          update(userRef, { photoURL: base64 })
            .then(() => console.log("Foto profil berhasil disimpan"))
            .catch((err) =>
              console.error("Gagal menyimpan foto profil:", err)
            );
        } else {
          console.warn("UID tidak ditemukan. Tidak bisa menyimpan ke database.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={user.photoURL || "https://via.placeholder.com/120"}
          alt="Profile"
          className="profile-img"
        />
        <h2>{user.username || "Guest"}</h2>
        <p>Email: {user.email || "guest@example.com"}</p>
        <p>Skor Tertinggi: {user.highScore || 0}</p>
        <p>Waktu Bertahan: {user.survivalTime || "0:00"}</p>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button className="back-button" onClick={() => navigate("/")}>
          ⬅ Kembali
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
