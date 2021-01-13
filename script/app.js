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
class Tower extends Objects_ {
  constructor(name, health, firepower, radius, attackSpeed) {
    super(health);
    this.name = name;
    this.firepower = this.firepower;
    this.radius = radius;
    this.attackSpeed = attackSpeed;
  }
  attack(enemy){

  }
}
class Mobs extends Objects_ {
  constructor(health, movementSpeed) {
    super(health);
    this.movementSpeed = movementSpeed;
  }
}
const makePath = () => {
  const $pathArray2 = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
  const $pathway = $("#gameboard > #rows > .columns");
  for (let i = 0; i < $pathArray2.length; i++) {
    $pathway.eq($pathArray2[i]).attr("id", "path");
  }
};
const mobMove = () => {
  const $mobPathway = $("#gameboard > #rows > #path");

  let $mobPos = $("#mob");
  $mobPos.animate({ top: rect.top + "px", left: rect.left + "px" });
  for (let i = 0; i < makePath().$pathArray2.length; i++) {
    //$pathway.eq(i).text("X");
  }
};
const setGameBoard = () => {
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
  makePath();
};

ready(function () {
  setGameBoard();
  mobMove();
});
