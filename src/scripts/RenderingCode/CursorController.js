import { handleCursorAnimation } from "./Cursor.js";
import { gearArr, shaftArr, beltArr } from "./main.js";

const UP = document.getElementById("cpUP");
const DOWN = document.getElementById("cpDOWN");
const LEFT = document.getElementById("cpLEFT");
const RIGHT = document.getElementById("cpRIGHT");
const OVER = document.getElementById("cpOVER");
const UNDER = document.getElementById("cpUNDER");
let selectedObj = gearArr[0];
let onElement = true;

function moveCursor(pos) {
  //unfinished
  handleCursorAnimation(pos);
}
//

function doOnClick(directionStr) {
  let didBreak = false;
  if (selectedObj.isGear) {
    for (let i = 0; i < selectedObj.connections.length; i++) {
      if (selectedObj.connections[i].direction == directionStr) {
        let t = selectedObj.connections[i];
        if (t.isGear) {
          selectedObj = t;
          moveCursor(selectedObj.position);
          didBreak = true;
          onElement = true;
          break;
        } else if (t.isShaft) {
          if (directionStr === t.direction) {
            selectedObj = t.connections[0];
            moveCursor(selectedObj.position);
            didBreak = true;
            onElement = true;
            break;
          } else if (
            (directionStr == "OVER" && t.direction == "UNDER") ||
            (directionStr == "UNDER" && t.direction == "OVER")
          ) {
            selectedObj = t.connections[t.connections.length - 1];
            moveCursor(selectedObj.position);
            didBreak = true;
            onElement = true;
            break;
          }
        }
      }
    }
  }
  if (!didBreak) {
    let posAdjusted =
      directionStr == "UP"
        ? {
            x: selectedObj.position.x,
            y: selectedObj.position.y,
            z: selectedObj.position.z - selectedObj.notchCount / 4 - 3,
          }
        : directionStr == "DOWN"
        ? {
            x: selectedObj.position.x,
            y: selectedObj.position.y,
            z: selectedObj.position.z + selectedObj.notchCount / 4 + 3,
          }
        : directionStr == "LEFT"
        ? {
            x: selectedObj.position.x - selectedObj.notchCount / 4 - 3,
            y: selectedObj.position.y,
            z: selectedObj.position.z,
          }
        : directionStr == "RIGHT"
        ? {
            x: selectedObj.position.x + selectedObj.notchCount / 4 + 3,
            y: selectedObj.position.y,
            z: selectedObj.position.z,
          }
        : directionStr == "OVER"
        ? {
            x: selectedObj.position.x,
            y: selectedObj.position.y + 1.1,
            z: selectedObj.position.z,
          }
        : directionStr == "UNDER"
        ? {
            x: selectedObj.position.x,
            y: selectedObj.position.y - 1.1,
            z: selectedObj.position.z,
          }
        : selectedObj.position;

    if (selectedObj.isGear) {
      if (onElement) {
        moveCursor(posAdjusted);
        onElement = false;
      } else {
        moveCursor(selectedObj.position);
        onElement = true;
      }
    }
  }
}

UP.addEventListener("click", () => {
  doOnClick("UP");
});
DOWN.addEventListener("click", () => {
  doOnClick("DOWN");
});
LEFT.addEventListener("click", () => {
  doOnClick("LEFT");
});
RIGHT.addEventListener("click", () => {
  doOnClick("RIGHT");
});
OVER.addEventListener("click", () => {
  doOnClick("OVER");
});
UNDER.addEventListener("click", () => {
  doOnClick("UNDER");
});
