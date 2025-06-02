import "../styles/LeaderboardPage.css";
import { useNavigate } from "react-router-dom";

const players = [
  { name: "Player", score: 100000 },
  { name: "Player", score: 80000 },
  { name: "Player", score: 70000 },
  { name: "Player", score: 60000 },
  { name: "Player", score: 50000 },
  { name: "Player", score: 40000 },
  { name: "Player", score: 30000 },
  { name: "Player", score: 20000 },
  { name: "Player", score: 10000 },
  { name: "Player", score: 500 },
];

const LeaderboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title slide-up">LEADERBOARD</h1>
      <div className="top-three">
        <div className="player-card second second-place slide-up">
          <div className="avatar" />
          <h3>2nd</h3>
          <p>{players[1].name}</p>
          <p>{players[1].score}</p>
        </div>
        <div className="player-card first first-place slide-up">
          <div className="avatar large" />
          <h2>1st</h2>
          <p>{players[0].name}</p>
          <p>{players[0].score}</p>
        </div>
        <div className="player-card third third-place slide-up">
          <div className="avatar" />
          <h3>3rd</h3>
          <p>{players[2].name}</p>
          <p>{players[2].score}</p>
        </div>
      </div>
      <div className="other-players">
        {players.slice(3).map((player, index) => (
          <div key={index} className="row-player slide-up">
            <div className="avatar small" />
            <p>{index + 4}th</p>
            <p className="name">{player.name}</p>
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
