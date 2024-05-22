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
