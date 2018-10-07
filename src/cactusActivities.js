import game from './game';

export default function($cactuses) {
  // di chuyển xương rồng
  const visibleGroups = [];
  game.cactus.right = 0;
  for (let group of game.cactus.groups) {
    group.left -= game.speed;
    // tính toán vị trị cây xương rồng cuối cùng
    game.cactus.right = group.left + group.width;
    group.element.style.left = group.left + 'px';
    if (game.cactus.right <= 0) {
      // nhóm xương rồng đã vượt khỏi màn hình
      // xóa element
      game.cactus.right = 0;
      $cactuses.removeChild(group.element);
    } else {
      let left = group.left;
      for (let item of group.items) {
        // tính toán va chạm giữa trex và xương rồng
        const middleOfItem = left + item.width * 0.5;
        // nếu xương rồng đang ở giữa thân trex
        if (
          middleOfItem >= game.trex.left &&
          middleOfItem <
            game.trex.left + game.trex.width - game.trex.width * 0.3
        ) {
          // và trex chưa nhảy qua chiều cao của nhóm xương rồng
          if (item.height > game.trex.elevation) {
            game.status = 'over';
            return;
          }
        }

        left += item.width;
      }

      // vẫn còn nằm trong màn hình
      visibleGroups.push(group);
    }
  }

  game.cactus.groups = visibleGroups;

  // tạo thêm nhóm xương rồng mới nếu số lượng nhóm chưa vượt qua max
  const cactusTypes = Object.keys(game.cactus.types);
  while (game.cactus.maxGroup > game.cactus.groups.length) {
    const group = {
      element: document.createElement('DIV'),
      width: 0,
      height: 0,
      left: !game.cactus.right
        ? window.innerWidth
        : game.cactus.right + game.cactus.distance,
      items: []
    };

    const count = Math.floor(1 + Math.random() * (game.cactus.maxCactus - 1));
    for (let i = 0; i < count; i++) {
      // tạo ngẫu nhiên loại xương rồng
      const type = cactusTypes[Math.floor(Math.random() * cactusTypes.length)];
      // tạo element chứa đồ họa cho xương rồng
      const $cactus = document.createElement('DIV');
      $cactus.className = type;
      group.items.push(game.cactus.types[type]);
      // tính toán lại kích thước của nhóm xương rồng
      group.width += game.cactus.types[type].width;
      group.height = Math.max(group.height, game.cactus.types[type].height);
      group.element.appendChild($cactus);
    }

    $cactuses.appendChild(group.element);
    group.element.className = 'cactus';
    game.cactus.right = group.left + group.width;

    Object.assign(group.element.style, {
      left: group.left + 'px',
      width: group.width + 'px',
      height: group.height + 'px'
    });

    // tạo các cây xương rồng
    game.cactus.groups.push(group);
  }
}
