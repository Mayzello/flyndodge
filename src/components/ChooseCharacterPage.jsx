import "../styles/ChooseCharacterPage.css";
import { useNavigate } from "react-router-dom";
import char1Image from "../assets/char/char1chs.png";
import char2Image from "../assets/char/char2chs.png";
import char3Image from "../assets/char/char3chs.png";
import char4Image from "../assets/char/char4chs.png";
import char5Image from "../assets/char/char5chs.png";
import char6Image from "../assets/char/char6chs.png";

const characters = [
  { id: 1, name: "Character 1", image: char1Image, route: "/Gameplay1" },
  { id: 2, name: "Character 2", image: char2Image, route: "/gameplay2" },
  { id: 3, name: "Character 3", image: char3Image, route: "/gameplay3" },
  { id: 4, name: "Character 4", image: char4Image, route: "/gameplay4" },
  { id: 5, name: "Character 5", image: char5Image, route: "/gameplay5" },
  { id: 6, name: "Character 6", image: char6Image, route: "/gameplay6" },
 
  // Tambah karakter lainnya jika perlu
];

const ChooseCharacterPage = () => {
  const navigate = useNavigate();

  const handleSelect = (route) => {
    navigate(route);
  };

  return (
    <div className="choose-character-container">
      <button className="back-button" onClick={() => navigate("/")}>Kembali</button>
      <h1 className="choose-character-title">Choose Character</h1>
      <div className="character-grid">
        {characters.map((char) => (
          <div
            key={char.id}
            className="character-card"
            onClick={() => handleSelect(char.route)}
          >
            <img src={char.image} alt={char.name} className="character-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseCharacterPage;
