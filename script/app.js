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
  damageHealth(points) {
    this.health -= points;
    return this.health;
  }
}
class Player extends Objects_ {
  constructor(name, health, credits) {
    super(health);
    this.name = name;
    this.credits = credits;
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
    const enemyHealth = enemy.damageHealth(this.firepower);
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
    const health = Math.floor(Math.random() * 100) + 1;
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
  constructor(playerName, numberOfMobs, towerArray, pathArray) {
    this.playerName = playerName;
    this.player = new Player(this.playerName, 10, 0);
    this.numberOfMobs = numberOfMobs;
    this.mobFactory = new MobFactory();
    for (let i = 0; i < this.numberOfMobs; i++) {
      this.mobFactory.generateMob();
    }
    this.towerFactory = new TowerFactory();
    this.towerArray = towerArray;
    for (let i = 0; i < this.towerArray.length; i++) {
      this.towerFactory.generateTower();
    }
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
    $healthInfo.text(this.playerName + "'s health: " + this.player.health);
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
    for (let i = 0; i < this.towerArray.length; i++) {
      const $towerImg = $(
        "<img src='./img/tower.png' width='50px' height='50px'>"
      );
      const $tmp = $selectColumn.eq(this.towerArray[i]).position();
      const $tmpRadius = $("<div></div>").attr("id", "radius");
      $tmpRadius.css({
        "margin-top": $tmp.top - 38 + "px",
        "margin-left": $tmp.left - 38 + "px",
      });
      $selectColumn
        .eq(this.towerArray[i])
        .append($towerImg)
        .click(function () {
          $tmpRadius.css({ display: "block" });
          setTimeout(function () {
            $tmpRadius.css({ display: "none" });
          }, 5000);
        });
      $selectColumn.eq(this.towerArray[i]).attr("id", "tower");
      $("#gameboard > #rows").eq(0).before($tmpRadius);
    }
  }
  towerAttackMob(mob, startTop, startLeft) {
    const $targetMob = $("#gameboard > #mob").eq(mob);
    const $getTower = $("#gameboard > #rows > #tower");
    const $getRadius = $("#gameboard > #radius");
    const constant = 38;

    for (let i = 0; i < this.towerArray.length; i++) {
      if (this.mobFactory.getMob(mob).health > 0) {
        const getTowerPos = $getTower.eq(i).position();
        const towerPosTop_offsetNeg = getTowerPos.top - constant;
        const towerPosLeft_offsetNeg = getTowerPos.left - constant;
        const towerPosTop_offsetPos = getTowerPos.top + constant;
        const towerPosLeft_offsetPos = getTowerPos.left + constant;
        if (
          startLeft >= towerPosLeft_offsetNeg &&
          startLeft <= towerPosLeft_offsetPos
        ) {
          console.log(startLeft);
          console.log(i + " = towerPosLeft_offsetNeg" + towerPosLeft_offsetNeg);
          console.log(i + " = towerPosLeft_offsetPos" + towerPosLeft_offsetPos);
          console.log("health: " + this.mobFactory.getMob(mob).health);
          this.mobFactory.getMob(mob).health--;
          $getRadius.eq(i).css({
            "background-color": "rgba(241, 90, 34, 0.5)",
            display: "block",
          });
          setTimeout(function () {
            $getRadius.eq(i).css({
              "background-color": "rgba(138, 138, 138, 0.5)",
              display: "none",
            });
          }, 5000);
        } else {
          /*  $getRadius.eq(i).css({
            "background-color": "rgba(138, 138, 138, 0.5)",
            display: "none",
          }); */
        }
      } else {
        setTimeout(function () {
          $targetMob.hide();
        }, 5000);
      }
    }
  }
  mobMove(pathArray) {
    const $mobPathway = $("#gameboard > #rows > #path");
    const startingPos = $mobPathway.eq(this.currentActiveMobIndex).position();
    const startLeft = startingPos.left;
    const startTop = startingPos.top + 27 - 10; // 27 is the center of the column div. 10 is half of the mob.
    const endPos = $mobPathway.eq(pathArray.length - 1).position();
    const endLeft = endPos.left + 55;
    let $mobPos = $("#gameboard > #mob");
    for (
      let i = 0;
      i <= endLeft;
      i += this.mobFactory.getMob(this.currentActiveMobIndex).movementSpeed
    ) {
      const startLeftI = startLeft + i;
      if (this.mobFactory.getMob(this.currentActiveMobIndex).health > 0) {
        $mobPos.animate({ left: "+=" + i + "px" }, "300");
        this.towerAttackMob(this.currentActiveMobIndex, startTop, startLeftI);
      } else {
        //$mobPos.css({ display: "none" }).delay("100");
        $mobPos.hide(10);
      }
      if (i == endLeft) {
        this.player.health -= this.mobFactory.getMob(
          this.currentActiveMobIndex
        ).health;
        this.displayPlayerHealth();
      }
      if (!this.isPlayerAlive()) {
        setTimeout(function () {
          alert("You have lost the game!");
          let responds = prompt("Restart the game?", "Yes");

          if (
            responds == null ||
            responds == "" ||
            responds == "No" ||
            responds == "no"
          ) {
          } else {
            location.reload();
          }
        }, 10000);
      }
    }
    if (this.isPlayerAlive()) {
      setTimeout(function () {
        alert("You have won the game!");
        let responds = prompt("Restart the game?", "Yes");
        if (
          responds == null ||
          responds == "" ||
          responds == "No" ||
          responds == "no"
        ) {
        } else {
          location.reload();
        }
      }, 10000);
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
  let getName = prompt("Please enter your name", "");
  if (getName == null || getName == "") {
    getName = prompt("Please enter your name", "");
  }
  alert(
    "Warning! The enemy has random number for health! Place your towers carefully!"
  );
  let playerChooseTower = prompt(
    "Please enter grid numbers where you want to put your towers. \nBetween 0 to 19 and 30 to 99.\nYou may put unlimited* towers, seperate them by comma.",
    "31,32,35,38"
  );
  if (
    playerChooseTower == null ||
    playerChooseTower == "" ||
    playerChooseTower.indexOf(",") <= -1
  ) {
    playerChooseTower = prompt(
      "Please enter grid numbers where you want to put your towers. \nBetween 0 to 19 and 30 to 99.\nYou may put unlimited* towers, seperate them by comma.",
      "31,32,35,38"
    );
  }
  let $towerArray = playerChooseTower.split(",");
  for (let i = 0; i < $towerArray.length; i++) {
    for (let y = 0; y < $pathArray.length; y++) {
      if ($towerArray[i] == $pathArray[y]) {
        playerChooseTower = prompt(
          "Please enter grid numbers where you want to put your towers. \nBetween 0 to 19 and 30 to 99.\nYou may put unlimited* towers, seperate them by comma.",
          "31,32,35,38"
        );
        $towerArray = playerChooseTower.split(",");
      }
    }
  }
  const towerDefence = new TowerDefenceGame(
    getName,
    1,
    $towerArray,
    $pathArray
  );
  towerDefence.setGameBoard();
  towerDefence.placeMob();

  towerDefence.displayPlayerHealth();
  //towerDefence.towerAttackMob(0);
  towerDefence.placeTower();
  towerDefence.mobMove($pathArray);

  // Joke
  console.log(Object.values(JokeAPI));

  // JokeAPI.getJokes().then(r => console.log(r.body))
  JokeAPI.getJokes({
    jokeType: "single",
  })
    .then((r) => r.json())
    .then((data) => {
      updateUI(data);
    });

  // To update the joke on the UI
  function updateUI(jokeData) {
    const $ = (id) => document.getElementById(id);

    $("joke--text").innerHTML = jokeData.joke;
  }
});
