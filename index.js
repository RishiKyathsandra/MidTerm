var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";

var WIDTH = 500;
var HEIGHT = 500;
var timeWhenGameStarted = Date.now(); //return time in ms

let resizeCanvas = function () {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
};
resizeCanvas();

window.addEventListener("resize", function () {
  resizeCanvas();
});

var frameCount = 0;

var score = 0;

var paused = false;

var Img = {};
Img.player = new Image();
Img.player.src = "img/Guts.png";

Img.cap = new Image();
Img.cap.src = "img/CAP1.png";
Img.shoes = new Image();
Img.shoes.src = "img/SHOE1.png";
Img.jacket = new Image();
Img.jacket.src = "img/JACKET1.png";
Img.pants = new Image();
Img.pants.src = "img/PANTS1.png";

testCollisionRectRect = function (rect1, rect2) {
  return (
    rect1.x <= rect2.x + rect2.width &&
    rect2.x <= rect1.x + rect1.width &&
    rect1.y <= rect2.y + rect2.height &&
    rect2.y <= rect1.y + rect1.height
  );
};

document.onmousedown = function (mouse) {
  if (mouse.which === 1) player.pressingMouseLeft = true;
  else player.pressingMouseRight = true;
};
document.onmouseup = function (mouse) {
  if (mouse.which === 1) player.pressingMouseLeft = false;
  else player.pressingMouseRight = false;
};
document.oncontextmenu = function (mouse) {
  mouse.preventDefault();
};

document.onmousemove = function (mouse) {
  var mouseX = mouse.clientX - canvas.getBoundingClientRect().left;
  var mouseY = mouse.clientY - canvas.getBoundingClientRect().top;

  mouseX -= WIDTH / 2;
  mouseY -= HEIGHT / 2;

  player.aimAngle = (Math.atan2(mouseY, mouseX) / Math.PI) * 180;
};

document.onkeydown = function (event) {
  if (event.keyCode === 68)
    //d
    player.pressingRight = true;
  else if (event.keyCode === 83)
    //s
    player.pressingDown = true;
  else if (event.keyCode === 65)
    //a
    player.pressingLeft = true;
  else if (event.keyCode === 87)
    // w
    player.pressingUp = true;
  else if (event.keyCode === 80)
    //p
    paused = !paused;
};

document.onkeyup = function (event) {
  if (event.keyCode === 68)
    //d
    player.pressingRight = false;
  else if (event.keyCode === 83)
    //s
    player.pressingDown = false;
  else if (event.keyCode === 65)
    //a
    player.pressingLeft = false;
  else if (event.keyCode === 87)
    // w
    player.pressingUp = false;
};

update = function () {
  if (paused) {
    ctx.fillText("Paused", WIDTH / 2, HEIGHT / 2);
    return;
  }

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  Maps.current.draw();
  frameCount++;
  score++;

  //   Bullet.update();
  Upgrade.update();
  //   Enemy.update();

  player.update();

  //   ctx.fillText(player.hp + " Hp", 0, 30);
  //   ctx.fillText("Score: " + score, 200, 30);

  //   if (!popup && player.x > 500) {
  // 	popup = true;
  //     togglePopup();
  //   }

//   console.log("Test x");
//   console.log(player.x);
//   console.log(player.y);
};

startNewGame = function () {
  player.hp = 10;
  timeWhenGameStarted = Date.now();
  frameCount = 0;
  score = 0;
  Upgrade.list = {};
  Bullet.list = {};
  Upgrade.generatePlaceHolder(65, 200, "popUp1", Img.cap);
  Upgrade.generatePlaceHolder(60, 290, "popUp2", Img.jacket);
  Upgrade.generatePlaceHolder(775, 245, "popUp3", Img.pants);
  Upgrade.generatePlaceHolder(780, 320, "popUp4", Img.shoes);
};

Maps = function (id, imgSrc, width, height) {
  var self = {
    id: id,
    image: new Image(),
    width: width,
    height: height,
  };
  self.image.src = imgSrc;

  self.draw = function () {
    // var x = WIDTH / 2 - player.x;
    // var y = HEIGHT / 2 - player.y;
    var x = WIDTH / 2 - player.x;
    var y = HEIGHT / 2 - player.y;
    ctx.drawImage(
      self.image,
      0,
      0,
      self.image.width,
      self.image.height,
      x - 50, // edit image drawing starting point
      y - 340,
      self.image.width,
      self.image.height
    );
  };
  return self;
};

Maps.current = Maps("field", "img/ClothingStore.webp", 842, 385);
player = Player();
startNewGame();

setInterval(update, 30);