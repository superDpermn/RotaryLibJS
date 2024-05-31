function toggleOverlay() {
  if (document.getElementById("itemSelect").classList.contains("hidden")) {
    document.getElementById("itemSelect").classList.remove("hidden");
    document.getElementById("toggleSelect").style.transform =
      "translateY(0) translateX(-50%)";
    document.getElementById("menu").style.transform = "translateX(0)";
    document.getElementById("deco1").style.transform =
      "translateY(-50%) rotateZ(53deg)";
    document.getElementById("deco2").style.transform =
      "translateY(-50%) rotateZ(127deg)";
  } else {
    document.getElementById("itemSelect").classList.add("hidden");
    document.getElementById("toggleSelect").style.transform =
      "translateY(200px) translateX(-50%)";
    document.getElementById("menu").style.transform = "translateX(-200px)";
    document.getElementById("deco1").style.transform =
      "translateY(-50%) rotateZ(127deg)";
    document.getElementById("deco2").style.transform =
      "translateY(-50%) rotateZ(53deg)";
  }
}

function init() {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  const menu = document.createElement("div");
  menu.id = "menu";

  //
  const backButton = document.createElement("button");
  backButton.id = "back";
  backButton.innerHTML = "Main Menu";

  const backButtonLink = document.createElement("a");
  backButtonLink.href = "./index.html";
  backButtonLink.appendChild(backButton);

  menu.appendChild(backButtonLink);
  //
  const cursorPosControls = document.createElement("div");
  cursorPosControls.id = "cursorPosControls";

  const cpUP = document.createElement("button");
  cpUP.id = "cpUP";
  cpUP.innerHTML = "UP";

  const cpDOWN = document.createElement("button");
  cpDOWN.id = "cpDOWN";
  cpDOWN.innerHTML = "DOWN";

  const cpLEFT = document.createElement("button");
  cpLEFT.id = "cpLEFT";
  cpLEFT.innerHTML = "LEFT";

  const cpRIGHT = document.createElement("button");
  cpRIGHT.id = "cpRIGHT";
  cpRIGHT.innerHTML = "RIGHT";

  cursorPosControls.appendChild(cpUP);
  cursorPosControls.appendChild(cpDOWN);
  cursorPosControls.appendChild(cpLEFT);
  cursorPosControls.appendChild(cpRIGHT);

  menu.appendChild(cursorPosControls);
  //

  const container1 = document.createElement("div");
  container1.id = "container1";

  const delButton = document.createElement("button");
  delButton.id = "delButton";
  delButton.innerHTML = "delete</br>element";

  const addButton = document.createElement("button");
  addButton.id = "addButton";
  addButton.innerHTML = "add</br>element";

  container1.appendChild(addButton);
  container1.appendChild(delButton);

  menu.appendChild(container1);

  //
  const toggleSelect = document.createElement("button");
  toggleSelect.id = "toggleSelect";

  const deco1 = document.createElement("div");
  deco1.id = "deco1";
  const deco2 = document.createElement("div");
  deco2.id = "deco2";

  toggleSelect.appendChild(deco1);
  toggleSelect.appendChild(deco2);

  const itemSelect = document.createElement("div");
  itemSelect.id = "itemSelect";

  overlay.appendChild(menu);
  overlay.appendChild(toggleSelect);
  overlay.appendChild(itemSelect);

  toggleSelect.setAttribute("onclick", "toggleOverlay()");

  return overlay;
}

document.body.appendChild(init());

toggleOverlay();
