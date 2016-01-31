var properties = {
    screenWidth: 300,
    screenHeight: 600,
};

var mainState = function(game) { };

mainState.prototype = {
    preload: function () {

    },

    create: function () {

    },

    update: function () {

    },
};

var game = new Phaser.Game(
  properties.screenWidth,
  properties.screenHeight,
  Phaser.AUTO,
  'gameDiv'
);

game.state.add('main', mainState);
game.state.start('main');