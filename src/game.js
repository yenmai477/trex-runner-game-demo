const defaultSpeed = 7;

export default {
  // trạng thái game
  status: 'play',
  // phím dùng để nhảy
  jumpKey: 32,
  // tốc độ game
  speed: defaultSpeed,
  defaultSpeed,
  gravity: 0.5,
  // cấu hình dành cho mặt đất
  ground: {
    // chiều ngang của ảnh mặt đất
    width: 2404,
    position: 0
  },
  // độ dài chạy được
  length: 0,
  lastSpeedUpLength: 0,
  trex: {
    // trạng thái của trex: standing, jumping, falling
    status: 'standing',
    speed: 8,
    // độ cao tối đa mà trex có thể nhảy
    maxElevation: 200,
    // độ cao hiện tại của trex
    elevation: 0
  },
  // cấu hình dành cho xương rồng
  cactus: {
    // khoảng cách giữa các nhóm xương rồng
    distance: 450,
    // các loại xương rồng
    types: {
      small: { width: 35, height: 70 },
      big: { width: 50, height: 95 }
    },
    // số lượng nhóm xương rồng tối đa
    maxGroup: 3,
    // số lương cây xương rồng tối đa
    maxCactus: 3,
    groups: []
  }
};
