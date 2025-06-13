import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import "../styles/LeaderboardPage.css";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const leaderboardRef = ref(database, "leaderboard");

    const unsubscribe = onValue(leaderboardRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data)
          .sort((a, b) => b.score - a.score)
          .slice(0, 10); // ambil 10 besar
        setPlayers(list);
      } else {
        setPlayers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title slide-up">LEADERBOARD</h1>

      {players.length >= 3 && (
        <div className="top-three">
          <div className="player-card second second-place slide-up">
            <img src={players[2].photoURL || "https://assets-a1.kompasiana.com/items/album/2021/03/24/blank-profile-picture-973460-1280-605aadc08ede4874e1153a12.png?t=o&v=1200"} alt="Avatar" className="avatar" />
            <h3>2nd</h3>
            <p>{players[1]?.username || "Player"}</p>
            <p>{players[1]?.score}</p>
          </div>
          <div className="player-card first first-place slide-up">
            <img src={players[1].photoURL || "https://assets-a1.kompasiana.com/items/album/2021/03/24/blank-profile-picture-973460-1280-605aadc08ede4874e1153a12.png?t=o&v=1200"} alt="Avatar" className="avatar large" />
            <h2>1st</h2>
            <p>{players[0]?.username || "Player"}</p>
            <p>{players[0]?.score}</p>
          </div>
          <div className="player-card third third-place slide-up">
            <img src={players[3].photoURL || "https://assets-a1.kompasiana.com/items/album/2021/03/24/blank-profile-picture-973460-1280-605aadc08ede4874e1153a12.png?t=o&v=1200"} alt="Avatar" className="avatar" />
            <h3>3rd</h3>
            <p>{players[2]?.username || "Player"}</p>
            <p>{players[2]?.score}</p>
          </div>
        </div>
      )}

      <div className="other-players">
        {players.slice(3).map((player, index) => (
          <div key={index} className="row-player slide-up">
            <div className="avatar small" />
            <p>{index + 4}th</p>
            <p className="name">{player.username}</p>
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
