import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/gameplay1.css";
import saitamaImage from "../assets/map6/charmap6.png";
import rocketImage from "../assets/map1/roket1.png";
import backgroundImage from "../assets/map1/bgmap1.jpg";
import explosionImage from "../assets/map1/meledup.png";


const Gameplay6Page = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [survivalTime, setSurvivalTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let character = {
      x: 50,
      y: 150,
      width: 150,
      height: 100,
      speed: 5,
    };

    let rockets = [];
    let rocketInterval = 1500;
    let lastRocketTime = 0;
    let rocketCount = 1;
    let lastRocketIncreaseTime = Date.now();

    const bg = new Image();
    bg.src = backgroundImage;
    let bgX = 0;
    const bgSpeed = 2;

    const saitama = new Image();
    saitama.src = saitamaImage;

    const rocketImg = new Image();
    rocketImg.src = rocketImage;

    const explosionImg = new Image();
    explosionImg.src = explosionImage;
    const explosionFrameCount = 8;
    const explosionFrameWidth = 128;
    const explosionFrameHeight = 128;
    let explosions = [];

    const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
    const handleKeyDown = (e) => (keys[e.key] = true);
    const handleKeyUp = (e) => (keys[e.key] = false);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let floatingScores = [];
    let frameCount = 0;
    let trails = [];

    const loop = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      bgX -= bgSpeed;
      if (bgX <= -canvas.width) bgX = 0;
      ctx.drawImage(bg, bgX, 0, canvas.width, canvas.height);
      ctx.drawImage(bg, bgX + canvas.width, 0, canvas.width, canvas.height);

      // Trail gaya Nyan Cat (kotak pelangi transparan memanjang)
      if (!gameOver) {
        trails.push({
          x: character.x,
          y: character.y + character.height / 2 - 10,
          width: 30,
          height: 20,
          lifetime: 40,
          hue: frameCount * 10 % 360,
        });
      }

      trails.forEach((trail) => {
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = `hsl(${trail.hue}, 100%, 50%)`;
        ctx.fillRect(trail.x, trail.y, trail.width, trail.height);
        ctx.restore();
        trail.lifetime--;
      });
      trails = trails.filter((t) => t.lifetime > 0);

      // Gerak karakter
      if (!gameOver) {
        if (keys.ArrowUp) character.y -= character.speed;
        if (keys.ArrowDown) character.y += character.speed;
        if (keys.ArrowLeft) character.x -= character.speed;
        if (keys.ArrowRight) character.x += character.speed;

        character.y = Math.max(0, Math.min(canvas.height - character.height, character.y));
        character.x = Math.max(0, Math.min(canvas.width - character.width, character.x));
      }

      // Tambah roket
      if (!gameOver && timestamp - lastRocketTime > rocketInterval) {
        for (let i = 0; i < rocketCount; i++) {
          rockets.push({
            x: canvas.width + i * 100,
            y: Math.random() * (canvas.height - 60),
            width: 60,
            height: 40,
          });
        }
        lastRocketTime = timestamp;
      }

      if (Date.now() - lastRocketIncreaseTime > 5000) {
        rocketCount += 1;
        lastRocketIncreaseTime = Date.now();
      }

      // Roket dan tabrakan
      rockets = rockets.filter((rocket) => {
        rocket.x -= 4;
        ctx.drawImage(rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);

        if (!gameOver) {
          const hit =
            rocket.x < character.x + character.width &&
            rocket.x + rocket.width > character.x &&
            rocket.y < character.y + character.height &&
            rocket.y + rocket.height > character.y;

          if (hit) {
            explosions.push({
              x: character.x,
              y: character.y,
              frame: 0,
              frameTimer: 0,
              frameInterval: 5,
            });
            setGameOver(true);
            setSurvivalTime(Math.floor((Date.now() - startTime) / 1000));
          }
        }

        return rocket.x + rocket.width > 0;
      });

      // Floating score
      if (!gameOver && frameCount % 10 === 0) {
        setScore((prev) => prev + 1);
        floatingScores.push({
          x: character.x + character.width,
          y: character.y,
          value: "+1",
          opacity: 1,
          lifetime: 30,
        });
      }

      floatingScores.forEach((fs) => {
        ctx.globalAlpha = fs.opacity;
        ctx.fillStyle = "yellow";
        ctx.font = "20px Arial";
        ctx.fillText(fs.value, fs.x, fs.y);
        ctx.globalAlpha = 1.0;
        fs.y -= 1;
        fs.opacity -= 0.03;
        fs.lifetime -= 1;
      });
      floatingScores = floatingScores.filter((fs) => fs.lifetime > 0);

      // Gambar karakter
      ctx.drawImage(saitama, character.x, character.y, character.width, character.height);

      // Animasi ledakan
      explosions.forEach((explosion) => {
        const sx = explosion.frame * explosionFrameWidth;
        ctx.drawImage(
          explosionImg,
          sx,
          0,
          explosionFrameWidth,
          explosionFrameHeight,
          explosion.x,
          explosion.y,
          explosionFrameWidth,
          explosionFrameHeight
        );
        explosion.frameTimer++;
        if (explosion.frameTimer >= explosion.frameInterval) {
          explosion.frame++;
          explosion.frameTimer = 0;
        }
      });
      explosions = explosions.filter((e) => e.frame < explosionFrameCount);

      // Stop loop jika gameOver & ledakan selesai
      if (gameOver && explosions.length === 0) {
        cancelAnimationFrame(animationRef.current);
        return;
      }

      frameCount++;
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver]);

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setStartTime(Date.now());
    setSurvivalTime(0);
  };

  return (
    <div className="gameplay-container">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="game-canvas"
      />

      {!gameOver && (
        <div className="hud">
          <p>Score: {score}</p>
          <p>Time: {Math.floor((Date.now() - startTime) / 1000)}s</p>
        </div>
      )}

      {gameOver && (
        <div className="game-over">
          <h1>Game Over</h1>
          <p>Score: {score}</p>
          <p>Waktu Bertahan: {survivalTime} detik</p>
          <button onClick={restartGame}>Restart</button>
          <button onClick={() => navigate("/choosecharacter")}>Pilih Karakter</button>
          <button onClick={() => navigate("/")}>Kembali ke Lobi</button>
        </div>
      )}
    </div>
  );
};

export default Gameplay6Page;
