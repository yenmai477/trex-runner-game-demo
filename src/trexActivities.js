import game from './game';

export default function($trex) {
  const lastElevation = game.trex.elevation;

  // xử lý trex khi không đứng yên
  if (game.trex.status !== 'standing') {
    game.trex.elevation +=
      game.trex.status === 'jumping'
        ? // đang nhảy thì tăng độ cao
          game.trex.speed
        : // đang rơi thì giảm độ cao
          -game.trex.speed;

    if (game.trex.elevation <= 0) {
      // nếu đã chạm đất thì chuyển về đứng yên
      game.trex.status = 'standing';
      game.trex.elevation = 0;
    } else if (game.trex.elevation >= game.trex.maxElevation) {
      game.trex.status = 'falling';
      game.trex.elevation = game.trex.maxElevation;
    }
  }
  // nếu độ cao của trex thay đổi thì mới cập nhật vị trí element
  if (lastElevation !== game.trex.elevation) {
    $trex.style.bottom = game.trex.elevation + 'px';
  }
}
