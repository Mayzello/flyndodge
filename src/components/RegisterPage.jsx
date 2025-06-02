import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, googleProvider, database } from "../firebase";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(database, "users/" + user.uid), {
        username: username,
        email: email,
      });

      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        username,
      }));

      navigate("/");
    } catch (err) {
      setError("Registrasi gagal: " + err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await set(ref(database, "users/" + user.uid), {
        username: user.displayName,
        email: user.email,
      });

      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        username: user.displayName,
      }));

      navigate("/");
    } catch (err) {
      setError("Google Sign Up gagal: " + err.message);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <img src="/flynogaris.png" alt="Logo" className="login-logo" />
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="login-btn">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="divider">or sign up with</div>
        <button className="google-btn" onClick={handleGoogleRegister}>
          <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" />
          Sign up with Google
        </button>
        <p className="register-link">Already have an account? <span onClick={() => navigate("/login")}>Log In</span></p>
        <p className="back-home" onClick={() => navigate("/")}>← Back to Home</p>
      </div>
    </div>
  );
};

export default RegisterPage;
