var player;

Entity = function (type, id, x, y, width, height, img) {
  var self = {
    type: type,
    id: id,
    x: x,
    y: y,
    width: width,
    height: height,
    img: img,
  };
  self.update = function () {
    self.updatePosition();
    self.draw();
  };
  self.draw = function () {
    ctx.save();
    var x = self.x - player.x;
    var y = self.y - player.y;

    x += WIDTH / 2;
    y += HEIGHT / 2;

    x -= self.width / 2;
    y -= self.height / 2;

    ctx.drawImage(
      self.img,
      0,
      0,
      self.img.width,
      self.img.height,
      x,
      y,
      self.width,
      self.height
    );

    ctx.restore();
  };
  self.getDistance = function (entity2) {
    //return distance (number)
    var vx = self.x - entity2.x;
    var vy = self.y - entity2.y;
    return Math.sqrt(vx * vx + vy * vy);
  };

  self.testCollision = function (entity2) {
    //return if colliding (true/false)
    var rect1 = {
      x: self.x - self.width / 2,
      y: self.y - self.height / 2,
      width: self.width,
      height: self.height,
    };
    var rect2 = {
      x: entity2.x - entity2.width / 2,
      y: entity2.y - entity2.height / 2,
      width: entity2.width,
      height: entity2.height,
    };
    return testCollisionRectRect(rect1, rect2);
  };
  self.updatePosition = function () {};

  return self;
};

Player = function () {
  var self = Actor("player", "myId", 420, 350, 50, 70, Img.player, 10, 1);

  var super_update = self.update;
  self.update = function () {
    super_update();
    if (self.pressingMouseLeft) self.performAttack();
    if (self.pressingMouseRight) self.performSpecialAttack();
  };

  self.updatePosition = function () {
    if (self.pressingRight) self.x += 10;
    if (self.pressingLeft) {
		if(self.y < 115 && self.x < 228) {

		}
		else {
			self.x -= 10;
		}
	}
    if (self.pressingDown) self.y += 10;
    if (self.pressingUp) {
		if(self.x < 200 && self.y < 118) {

		}
		else {
			self.y -= 10;
		}
	}

    //ispositionvalid
    if (self.x < self.width / 2) self.x = self.width / 2;
    if (self.x > Maps.current.width - self.width / 2)
      self.x = Maps.current.width - self.width / 2;
    if (self.y < self.height / 2) self.y = self.height / 2;
    if (self.y > Maps.current.height - self.height / 2)
      self.y = Maps.current.height - self.height / 2;
  };
  self.onDeath = function () {
    var timeSurvived = Date.now() - timeWhenGameStarted;
    console.log("You lost! You survived for " + timeSurvived + " ms.");
    startNewGame();
  };
  self.pressingDown = false;
  self.pressingUp = false;
  self.pressingLeft = false;
  self.pressingRight = false;

  self.pressingMouseLeft = false;
  self.pressingMouseRight = false;

  return self;
};

Actor = function (type, id, x, y, width, height, img, hp, atkSpd) {
  var self = Entity(type, id, x, y, width, height, img);

  self.hp = hp;
  self.hpMax = hp;
  self.atkSpd = atkSpd;
  self.attackCounter = 0;
  self.aimAngle = 0;

  var super_update = self.update;
  self.update = function () {
    super_update();
    self.attackCounter += self.atkSpd;
    if (self.hp <= 0) self.onDeath();
  };
  self.onDeath = function () {};

  self.performAttack = function () {
    if (self.attackCounter > 25) {
      //every 1 sec
      self.attackCounter = 0;
      Bullet.generate(self);
    }
  };

  self.performSpecialAttack = function () {
    if (self.attackCounter > 50) {
      //every 1 sec
      self.attackCounter = 0;
      /*
			for(var i = 0 ; i < 360; i++){
				Bullet.generate(self,i);
			}
			*/
      Bullet.generate(self, self.aimAngle - 5);
      Bullet.generate(self, self.aimAngle);
      Bullet.generate(self, self.aimAngle + 5);
    }
  };

  return self;
};

//#####
Upgrade = function (id, x, y, width, height, category, img) {
  var self = Entity("upgrade", id, x, y, width, height, img);

  self.category = category;
  self.fresh = true;
  Upgrade.list[id] = self;
};

Upgrade.list = {};
popupActive = false;



function togglePopup1() {
  document.getElementById("popup-1").classList.toggle("active");
  popupActive = !popupActive;
}

function togglePopup2() {
  document.getElementById("popup-2").classList.toggle("active");
  popupActive = !popupActive;
}

function togglePopup3() {
  document.getElementById("popup-3").classList.toggle("active");
  popupActive = !popupActive;
}

function togglePopup4() {
  document.getElementById("popup-4").classList.toggle("active");
  popupActive = !popupActive;
}

Upgrade.update = function () {
  if (frameCount % 125 === 0 && !popupActive) {
    // wait every 5s
    for (var key in Upgrade.list) {
      Upgrade.list[key].fresh = true;
    }
  }

  for (var key in Upgrade.list) {
    Upgrade.list[key].update();
    var isColliding = player.testCollision(Upgrade.list[key]);
    if (isColliding && Upgrade.list[key].fresh) {
      Upgrade.list[key].fresh = false;
      if (Upgrade.list[key].category === "popUp1") {
        togglePopup1();
      }
      if (Upgrade.list[key].category === "popUp2") {
        togglePopup2();
      }
      if (Upgrade.list[key].category === "popUp3") {
        togglePopup3();
      }
      if (Upgrade.list[key].category === "popUp4") {
        togglePopup4();
      }
    }
  }
};

Upgrade.generatePlaceHolder = function (x, y, Cat, img) {
  var x = x;
  var y = y;
  var height = 32*2;
  var width = 32*2;
  var id = Math.random();
  var category = Cat;
  var img = img;

  Upgrade(id, x, y, width, height, category, img);
};

//#####
Bullet = function (id, x, y, spdX, spdY, width, height, combatType) {
  var self = Entity("bullet", id, x, y, width, height, Img.bullet);

  self.timer = 0;
  self.combatType = combatType;
  self.spdX = spdX;
  self.spdY = spdY;

  self.updatePosition = function () {
    self.x += self.spdX;
    self.y += self.spdY;

    if (self.x < 0 || self.x > Maps.current.width) {
      self.spdX = -self.spdX;
    }
    if (self.y < 0 || self.y > Maps.current.height) {
      self.spdY = -self.spdY;
    }
  };

  Bullet.list[id] = self;
};

Bullet.list = {};

Bullet.update = function () {
  for (var key in Bullet.list) {
    var b = Bullet.list[key];
    b.update();

    var toRemove = false;
    b.timer++;
    if (b.timer > 75) {
      toRemove = true;
    }

    if (b.combatType === "player") {
      //bullet was shot by player
      for (var key2 in Enemy.list) {
        if (b.testCollision(Enemy.list[key2])) {
          toRemove = true;
          Enemy.list[key2].hp -= 1;
        }
      }
    } else if (b.combatType === "enemy") {
      if (b.testCollision(player)) {
        toRemove = true;
        player.hp -= 1;
      }
    }

    if (toRemove) {
      delete Bullet.list[key];
    }
  }
};

Bullet.generate = function (actor, aimOverwrite) {
  //Math.random() returns a number between 0 and 1
  var x = actor.x;
  var y = actor.y;
  var height = 24;
  var width = 24;
  var id = Math.random();

  var angle;
  if (aimOverwrite !== undefined) angle = aimOverwrite;
  else angle = actor.aimAngle;

  var spdX = Math.cos((angle / 180) * Math.PI) * 5;
  var spdY = Math.sin((angle / 180) * Math.PI) * 5;
  Bullet(id, x, y, spdX, spdY, width, height, actor.type);
};
