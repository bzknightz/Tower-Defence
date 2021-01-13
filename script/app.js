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
    const movementSpeed = 2;
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
  towerAttackMob() {
    const $targetMob = $("#gameboard > #mob").eq(this.currentActiveMobIndex);
    /* if (){

    }*/
  }
  mobMove() {
    const $mobPathway = $("#gameboard > #rows > #path");

    let $mobPos = $("#mob");
    $mobPos.animate({ top: rect.top + "px", left: rect.left + "px" });
    for (let i = 0; i < makePath().$pathArray2.length; i++) {
      //$pathway.eq(i).text("X");
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
    6,
    3,
    $towerArray,
    $pathArray
  );
  towerDefence.setGameBoard();
});
