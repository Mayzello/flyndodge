import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import LoadingScreen from "./components/LoadingScreen";
import ProfilePage from "./components/ProfilePage";
import LeaderboardPage from "./components/LeaderboardPage";
import TutorialPage from "./components/Tutorial";
import ChooseCharacterPage from "./components/ChooseCharacterPage";


import Gameplay1Page from "./components/Gameplay1Page";
import Gameplay2Page from "./components/Gameplay2Page";
import Gameplay3Page from "./components/Gameplay3Page";
import Gameplay4Page from "./components/Gameplay4Page";
import Gameplay5Page from "./components/Gameplay5Page";
import Gameplay6Page from "./components/Gameplay6Page";


import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/tutorial" element={<TutorialPage />} />
      <Route path="/choosecharacter" element={<ChooseCharacterPage />} />

      <Route path="/gameplay1" element={<Gameplay1Page />} />
      <Route path="/gameplay2" element={<Gameplay2Page />} />
      <Route path="/gameplay3" element={<Gameplay3Page />} />
      <Route path="/gameplay4" element={<Gameplay4Page />} />
      <Route path="/gameplay5" element={<Gameplay5Page />} />
      <Route path="/gameplay6" element={<Gameplay6Page />} />
    </Routes>
  );
}

export default App;
