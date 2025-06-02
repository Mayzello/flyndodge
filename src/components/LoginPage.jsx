import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, database } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = ref(database, `users/${user.uid}`);
     onValue(userRef, (snapshot) => {
  const userData = snapshot.val();
  localStorage.setItem("user", JSON.stringify({
    uid: user.uid,
    email: user.email,
    username: userData?.username || "User",
    photoURL: userData?.photoURL || "", // ambil dari DB
  }));
  navigate("/");
});

    } catch (error) {
      alert("Login gagal: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Simpan user jika baru
      const userRef = ref(database, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        if (!snapshot.exists()) {
          set(userRef, {
            username: user.displayName,
            email: user.email,
          });
        }
        localStorage.setItem("user", JSON.stringify({
          uid: user.uid,
          email: user.email,
          username: user.displayName,
        }));
        navigate("/");
      });
    } catch (err) {
      setError("Login Google gagal: " + err.message);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <img src="/flynogaris.png" alt="Logo" className="login-logo" />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <p className="forgot-password" onClick={() => alert("Lupa password - fitur belum tersedia")}>Forgot password?</p>
          <button type="submit" className="login-btn">Sign In</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="divider">or sign in with</div>
        <button className="google-btn" onClick={handleGoogleLogin}>
          <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" />
          Sign in with Google
        </button>
        <p className="register-link">Don't have an account? <span onClick={() => navigate("/register")}>Register</span></p>
        <p className="back-home" onClick={() => navigate("/")}>← Back to Home</p>
      </div>
    </div>
  );
};

export default LoginPage;
