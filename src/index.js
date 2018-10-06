import './../src/style.css';
import spriteFile from './sprites.png';
import game from './game';
import groundActivities from './groundActivities';

(function() {
  document.getElementById('app').innerHTML = `
    <div id="trex"></div>
    <div id="cactuses"></div>
    <div id="ground"></div>
    <div id="info"></div>
  `;

  // element chứa đồ họa cho mặt đất
  const $ground = document.getElementById('ground');
  // element chứa đồ họa cho trex
  const $trex = document.getElementById('trex');
  // element chứa tất cả xương rồng
  const $cactuses = document.getElementById('cactuses');
  // element hiển thị thông tin game
  const $info = document.getElementById('info');


  function gameStory() {
    groundActivities($ground);
  }

  function gameLoop() {
    if (game.status === 'pause') return;
    const lastScore = game.length / 10;
    if (game.status !== 'over') {
      gameStory();
      const newScore = game.length / 10;
      if (newScore !== lastScore) {
        $info.innerHTML = `Score: <span>${newScore.toFixed(0)}</span> miles`;
      }
    } else {
      $info.innerHTML = `GAME OVER: <span>${lastScore.toFixed(0)}</span> miles`;
    }

    // đẩy vào hàng đợi chờ xử lý lần sau
    requestAnimationFrame(gameLoop);
  }

  // chắn chắn rằng hình ảnh được tải đầy đủ rồi mới start game
  const img = new Image();
  img.onload = gameLoop;
  img.src = spriteFile;
})();
