import game from './game';

export default function($trex, $ground) {
  document.addEventListener('keydown', e => {
    if (e.keyCode === game.jumpKey) {
      keyPress();
    }
  });
  document.addEventListener('keyup', e => {
    if (e.keyCode === game.jumpKey) {
      keyRelease();
    }
  });
  document.addEventListener('touchstart', keyPress);
  document.addEventListener('touchend', keyRelease);
  document.addEventListener('mousedown', keyPress);
  document.addEventListener('mouseup', keyRelease);
  document.addEventListener(
    'focus',
    () => game.status === 'pause' && (game.status = 'play')
  );
  document.addEventListener(
    'blur',
    () => game.status !== 'over' && (game.status = 'pause')
  );
  window.addEventListener('resize', restartGame);

  function keyPress() {
    if (game.status === 'over') {
      return restartGame();
    }

    // nếu trex sẽ nhảy lên, trừ khi nó đang rơi
    if (game.trex.status !== 'falling') {
      game.trex.status = 'jumping';
    }
  }

  function keyRelease() {
    if (game.trex.status === 'jumping') {
      game.trex.status = 'falling';
    }
  }

  function restartGame() {
    // bắt đầu lại sau 1 giây
    setTimeout(function() {
      game.speed = game.defaultSpeed;
      game.length = 0;
      game.lastSpeedUpLength = 0;
      
      game.status = 'play';
    }, 500);
  }
}
