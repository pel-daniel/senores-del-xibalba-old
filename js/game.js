var properties = {
  ball: {
    angle: -60,
    startX: 65,
    speed: 300,
  },
  board: {
    width: 800,
    height: 400,
  },
  player: {
    velocity: 400,
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
    this.initKeyboard();
    this.initPhysics();

    game.input.onDown.add(this.startGame, this);
  },

  update: function () {
    this.updatePlayer(
      this.leftPlayerSprite,
      this.leftPlayerUpKey,
      this.leftPlayerDownKey
    );
    this.updatePlayer(
      this.rightPlayerSprite,
      this.rightPlayerUpKey,
      this.rightPlayerDownKey
    );
  },

  initKeyboard: function() {
    this.leftPlayerUpKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.leftPlayerDownKey = game.input.keyboard.addKey(Phaser.Keyboard.S);

    this.rightPlayerUpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.rightPlayerDownKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  },

  initGraphics: function () {
    // this.backgroundGraphics = game.add.graphics(0, 0);
    // this.backgroundGraphics.lineStyle(2, 0xFFFFFF, 1);

    this.ballSprite = game.add.sprite(
      properties.ball.startX,
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

  initPhysics: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(this.ballSprite, Phaser.Physics.ARCADE);

    this.ballSprite.checkWorldBounds = true;
    this.ballSprite.body.collideWorldBounds = true;
    this.ballSprite.body.immovable = true;
    this.ballSprite.body.bounce.set(1);

    this.playersGroup = game.add.group();
    this.playersGroup.enableBody = true;
    this.playersGroup.physicsBodyType = Phaser.Physics.ARCADE;

    this.playersGroup.add(this.leftPlayerSprite);
    this.playersGroup.add(this.rightPlayerSprite);

    this.playersGroup.setAll('checkWorldBounds', true);
    this.playersGroup.setAll('body.collideWorldBounds', true);
    this.playersGroup.setAll('body.immovable', true);
  },

  updatePlayer: function(player, upKey, downKey) {
    if(upKey.isDown) {
      player.body.velocity.y = -properties.player.velocity;
    }
    else if(downKey.isDown) {
      player.body.velocity.y = properties.player.velocity;
    } else {
      player.body.velocity.y = 0;
    }
  },

  startGame: function () {
    game.input.onDown.remove(this.startGame, this);
    game.physics.arcade.velocityFromAngle(
      properties.ball.angle,
      properties.ball.speed,
      this.ballSprite.body.velocity
    );
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
