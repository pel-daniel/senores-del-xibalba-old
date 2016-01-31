var properties = {
  board: {
    width: 800,
    height: 400,
  },
  leftPlayer: {
    x: 50,
  },
  rightPlayer: {
    x: 750
  },
};

var graphicAssets = {
  ball: {
    name: 'ball',
    url: 'assets/ball.png'
  },
  player: {
    name: 'player',
    url: 'assets/player.png'
  },
};

var mainState = function(game) {
  this.ballSprite;
  this.leftPlayerSprite;
  this.rightPlayerSprite;
};

mainState.prototype = {
  preload: function () {
    game.load.image(graphicAssets.ball.name, graphicAssets.ball.url);
    game.load.image(graphicAssets.player.name, graphicAssets.player.url);
  },

  create: function () {
    this.initGraphics();
  },

  update: function () {

  },

  initGraphics: function () {
    // this.backgroundGraphics = game.add.graphics(0, 0);
    // this.backgroundGraphics.lineStyle(2, 0xFFFFFF, 1);

    this.ballSprite = game.add.sprite(
      game.world.centerX,
      game.world.centerY,
      graphicAssets.ball.name
    );
    this.ballSprite.anchor.set(0.5, 0.5);

    this.leftPlayerSprite = game.add.sprite(
      properties.leftPlayer.x,
      game.world.centerY,
      graphicAssets.player.name
    );
    this.leftPlayerSprite.anchor.set(0.5, 0.5);

    this.rightPlayerSprite = game.add.sprite(
      properties.rightPlayer.x,
      game.world.centerY,
      graphicAssets.player.name
    );
    this.rightPlayerSprite.anchor.set(0.5, 0.5);
  },
};

var game = new Phaser.Game(
  properties.board.width,
  properties.board.height,
  Phaser.AUTO,
  'gameDiv'
);

game.state.add('main', mainState);
game.state.start('main');
