import "../styles/LeaderboardPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const leaderboardRef = ref(database, "leaderboard");
    onValue(leaderboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const playerList = Object.values(data);
        playerList.sort((a, b) => b.score - a.score);
        setPlayers(playerList);
      }
    });
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title slide-up">LEADERBOARD</h1>

      <div className="top-three">
        {players.slice(0, 3).map((player, idx) => (
          <div
            key={idx}
            className={`player-card ${
              idx === 0 ? "first first-place" : idx === 1 ? "second second-place" : "third third-place"
            } slide-up`}
          >
            <img
              src={player.photoURL || "https://via.placeholder.com/80"}
              alt="avatar"
              className={`avatar ${idx === 0 ? "large" : ""}`}
            />
            <h3>{idx + 1}st</h3>
            <p>{player.username || "Player"}</p>
            <p>{player.score}</p>
          </div>
        ))}
      </div>

      <div className="other-players">
        {players.slice(3).map((player, index) => (
          <div key={index} className="row-player slide-up">
            <img
              src={player.photoURL || "https://via.placeholder.com/40"}
              alt="avatar"
              className="avatar small"
            />
            <p>{index + 4}th</p>
            <p className="name">{player.username || "Player"}</p>
            <p>{player.score}</p>
          </div>
        ))}
      </div>

      <button className="back-button slide-up" onClick={() => navigate("/")}>
        ⬅ Kembali
      </button>
    </div>
  );
};

export default LeaderboardPage;
