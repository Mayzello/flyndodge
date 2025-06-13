import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored);

    if (stored && stored.uid) {
      const userRef = ref(database, `leaderboard/${stored.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserData(data);
        }
      });
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src={user?.photoURL || "https://assets-a1.kompasiana.com/items/album/2021/03/24/blank-profile-picture-973460-1280-605aadc08ede4874e1153a12.png?t=o&v=1200"}
          alt="Profile"
          className="profile-img"
        />
        <h2>{user?.username || "Guest"}</h2>
        <p>Email: {user?.email || "guest@example.com"}</p>
        <p>Skor Tertinggi: {userData.score || 0}</p>
        <p>Waktu Bertahan: {userData.survivalTime || "0:00"}</p>

        <button className="back-button" onClick={() => navigate("/")}>
          ⬅ Kembali
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
