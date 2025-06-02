import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <div className="overlay"></div>

      <nav className="navbar">
        <div className="logo">FlynDodge</div>
        <div className="nav-links">
          {!user ? (
            <button onClick={() => navigate("/login")}>Login</button>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
          <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
        </div>
      </nav>

      <div className="landing-content">
        <h1>Selamat Datang di FlynDodge!</h1>
        <p>Game seru menghindar dan terbang sejauh mungkin!</p>
        <div className="center-buttons">
          <button onClick={() => navigate("/choosecharacter")}>Play</button>
          <button onClick={() => navigate("/tutorial")}>Tutorial</button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
