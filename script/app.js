console.log("link check");

function ready(callbackFunc) {
  if (document.readyState !== "loading") {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener("DOMContentLoaded", callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "complete") {
        callbackFunc();
      }
    });
  }
}
class Objects_ {
  constructor(health) {
    this.health = health;
  }
}
class Player extends Objects_ {
  constructor(name, health, credits) {
    super(health);
    this.name = name;
    this.credits = credits;
  }
  damageHealth(points) {
    this.health -= points;
    return this.health;
  }
}
class Tower {
  constructor(name, firepower, radius, attackSpeed) {
    this.name = name;
    this.firepower = firepower;
    this.radius = radius;
    this.attackSpeed = attackSpeed;
  }
  attack(enemy) {
    const enemyHealth = enemy.health(this.firepower);
  }
}
class TowerFactory {
  constructor() {
    this.tower = [];
  }
  generateTower() {
    const name = "cannon";
    const firepower = 1;
    const radius = 20;
    const attackSpeed = 600; // milliseconds
    const tower = new Tower(name, firepower, radius, attackSpeed);
    this.tower.push(tower);
  }
  getTower(index) {
    if (index >= 0 && index < this.tower.length) return this.tower[index];
    console.log(`There is no tower with this index ${index}`);
    return;
  }
}
class Mobs extends Objects_ {
  constructor(health, movementSpeed) {
    super(health);
    this.movementSpeed = movementSpeed;
  }
}
class MobFactory {
  constructor() {
    this.mob = [];
  }
  generateMob() {
    const health = 1;
    const movementSpeed = 10;
    const mob = new Mobs(health, movementSpeed);
    this.mob.push(mob);
  }
  getMob(index) {
    if (index >= 0 && index < this.mob.length) return this.mob[index];
    console.log(`There is no mob with this index ${index}`);
    return;
  }
}
class TowerDefenceGame {
  constructor(playerName, numberOfMobs, numberOfTower, towerArray, pathArray) {
    this.playerName = playerName;
    this.player = new Player(this.playerName, 10, 0);
    this.numberOfMobs = numberOfMobs;
    this.mobFactory = new MobFactory();
    for (let i = 0; i < this.numberOfMobs; i++) {
      this.mobFactory.generateMob();
    }
    this.numberOfTower = numberOfTower;
    this.towerFactory = new TowerFactory();
    for (let i = 0; i < this.numberOfTower; i++) {
      this.towerFactory.generateTower();
    }
    this.towerArray = towerArray;
    this.pathArray = pathArray;
    this.currentActiveMobIndex = 0;
  }
  isCurrentActiveMobAlive() {
    return this.mobFactory.getMob(this.currentActiveMobIndex).health > 0;
  }
  isPlayerAlive() {
    return this.player.health > 0;
  }
  displayPlayerHealth() {
    const $healthInfo = $("#topbar > h2");
    $healthInfo.text("Health:" + this.player.health);
  }
  placeMob() {
    const $mobPathway = $("#gameboard > #rows > #path");
    const startingPos = $mobPathway.eq(0).position();
    const startLeft = startingPos.left;
    const startTop = startingPos.top + 27 - 10; // 27 is the center of the column div. 10 is half of the mob.
    //let $mobPos = $("#gameboard > #mob");
    const $selectGameboard = $("#gameboard");
    const $mobDiv = $("<div></div>");
    $mobDiv.attr("id", "mob");
    $mobDiv.css({ top: startTop + "px", left: startLeft + "px" });
    $selectGameboard.prepend($mobDiv);
  }
  placeTower() {
    const $selectColumn = $("#gameboard > #rows > .columns");
    for (let i = 0; i < this.numberOfTower; i++) {
      const $towerImg = $(
        "<img src='./img/tower.png' width='50px' height='50px'>"
      );
      const $tmp = $selectColumn.eq(this.towerArray[i]).position();
      $selectColumn
        .eq(this.towerArray[i])
        .append($towerImg)
        .click(function () {
          const $tmpRadius = $("<div></div>").attr("id", "radius");
          $tmpRadius.css({
            "margin-top": $tmp.top - 38 + "px",
            "margin-left": $tmp.left - 38 + "px",
            display: "block",
          });
          $tmpRadius.animate({ display: "none" });
          $("#gameboard").prepend($tmpRadius);

          //console.log("Top: " + $tmp.top + " Left: " + $tmp.left);
        });
      $selectColumn.eq(this.towerArray[i]).attr("id", "tower");
    }
  }
  towerAttackMob(mob) {
    const $targetMob = $("#gameboard > #mob").eq(mob);
    const $targetMobPosition = $targetMob.position();
    console.log($targetMobPosition);
    while (this.mobFactory.getMob(mob).health > 0) {
      for (let i = 0; i < this.towerArray.length; i++) {
        const $getTower = $("#gameboard > #rows > #tower");
        const getTowerPos = $getTower.eq(i).position();
        console.log("i: " + i + " - " + getTowerPos);
        console.log(getTowerPos.top);
        console.log(getTowerPos.left);
      }
      /* console.log(
      i + " - Top: " + getTowerPos.top + " Left: " + getTowerPos.left
    ); */
      this.mobFactory.getMob(mob).health--;
    }

    /* if ($targetMob.top+10>=){

    } */
  }
  mobMove(pathArray) {
    const $mobPathway = $("#gameboard > #rows > #path");
    const startingPos = $mobPathway.eq(0).position();
    const startLeft = startingPos.left;
    const startTop = startingPos.top + 27 - 10; // 27 is the center of the column div. 10 is half of the mob.
    const endPos = $mobPathway.eq(pathArray.length - 1).position();
    const endLeft = endPos.left + 55;
    let $mobPos = $("#gameboard > #mob");
    //$mobPos.animate({ top: startTop + "px", left: startLeft + "px" });
    for (
      let i = 0;
      i <= endLeft;
      i += this.mobFactory.getMob(this.currentActiveMobIndex).movementSpeed
    ) {
      $mobPos.animate({ top: startTop + "px", left: startLeft + i + "px" });
    }
  }
  makePath(pathArray) {
    const $pathway = $("#gameboard > #rows > .columns");
    for (let i = 0; i < pathArray.length; i++) {
      $pathway.eq(pathArray[i]).attr("id", "path");
    }
  }
  setGameBoard() {
    let count = 0;
    const $getGameBoard = $("#gameboard");
    const $boardSize = 10;
    for (let i = 0; i < $boardSize; i++) {
      const rows = $("<div></div>").attr("id", "rows");
      rows.addClass("flex-container");

      $getGameBoard.append(rows);
      for (let j = 0; j < $boardSize; j++) {
        const columns = $("<div></div>").addClass("columns");
        columns.addClass("center");
        $("#gameboard > #rows").eq(i).append(columns);
        count++;
      }
    }
    this.makePath(this.pathArray);
  }
}

ready(function () {
  const $pathArray = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
  const $towerArray = [31, 34, 38];
  const towerDefence = new TowerDefenceGame(
    "Benson",
    1,
    3,
    $towerArray,
    $pathArray
  );
  towerDefence.setGameBoard();
  towerDefence.placeMob();
  towerDefence.mobMove($pathArray);
  towerDefence.placeTower();
  towerDefence.displayPlayerHealth();
  towerDefence.towerAttackMob(0);
});
