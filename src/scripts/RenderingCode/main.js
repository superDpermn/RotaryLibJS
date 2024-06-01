import * as THREE from "./ThreeLib/three.module.min.js";
import { OrbitControls } from "./ThreeLib/OrbitControls.js";
import { GraphicsController } from "./GraphicsController.js";
import { Gear } from "../InnerCalculations/Gear.js";
import { Belt } from "../InnerCalculations/Belt.js";
import { Shaft } from "../InnerCalculations/Shaft.js";
import { Fraction } from "../InnerCalculations/Fraction.js";
import { ConstantSpeedSource } from "../InnerCalculations/Source.js";
import * as SC from "../scenario.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(new THREE.Color(0x10161c));

// UI Overlay
const UIOverlay = document.createElement("div");
document.body.appendChild(UIOverlay);

//------------------------------------------------------------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 20, 20);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.target.set(0, 0, 0);
orbit.update();

// Lights
const color = 0xffffff;

const ambientLight = new THREE.AmbientLight(color, 3);
scene.add(ambientLight);

const light1 = new THREE.DirectionalLight(color, 15);
light1.position.set(30, 50, 0);
light1.target.position.set(0, 0, 0);
scene.add(light1);

const light2 = new THREE.DirectionalLight(color, 8);
light2.position.set(0, -50, -30);
light2.target.position.set(0, 0, 0);
scene.add(light2);

// Main Graphics Controller
const MainGraphicsController = new GraphicsController();

// Power Source
let tickSpeed = 3;
const PowerSource = new ConstantSpeedSource(
  new Fraction(Math.floor(tickSpeed), 3000)
);

// Arrays to hold gears, shafts, and belts
export const gearArr = [new Gear(16)];
export const shaftArr = [];
export const beltArr = [];

// Initial Gear
export const initGear = gearArr[0];
let temp = MainGraphicsController.addGearToVisual(initGear);
scene.add(temp[0]);
scene.add(temp[1]);

// Function to add gear
export function AddGear(notchCount, source, direction = "NONE", _color = null) {
  const checkIndex =
    direction === "LEFT"
      ? 0
      : direction === "UP"
      ? 1
      : direction === "RIGHT"
      ? 2
      : direction === "DOWN"
      ? 3
      : 4;
  if (source.isGear && source.occuStatus[checkIndex]) {
    const _G = new Gear(notchCount);
    source.connect(_G, direction);
    gearArr.push(_G);
    if (_color) {
      const temp = MainGraphicsController.addGearToVisual(
        _G,
        new THREE.MeshLambertMaterial({ flatShading: true, color: _color })
      );
      scene.add(temp[0]);
      scene.add(temp[1]);
    } else {
      const temp = MainGraphicsController.addGearToVisual(_G);
      scene.add(temp[0]);
      scene.add(temp[1]);
    }
    return _G;
  } else if (source.isShaft) {
    const _G = new Gear(notchCount);
    source.connect(_G);
    gearArr.push(_G);
    if (_color) {
      const temp = MainGraphicsController.addGearToVisual(
        _G,
        new THREE.MeshLambertMaterial({ flatShading: true, color: _color })
      );
      scene.add(temp[0]);
      scene.add(temp[1]);
    } else {
      const temp = MainGraphicsController.addGearToVisual(_G);
      scene.add(temp[0]);
      scene.add(temp[1]);
    }
    return _G;
  }
  return false;
}

// Function to add free gear
export function AddFreeGear(notchCount, pos, _color = null) {
  const newGear = new Gear(notchCount, pos);
  gearArr.push(newGear);
  if (_color) {
    const temp = MainGraphicsController.addGearToVisual(
      newGear,
      new THREE.MeshLambertMaterial({ flatShading: true, color: _color })
    );
    scene.add(temp[0]);
    scene.add(temp[1]);
  } else {
    const temp = MainGraphicsController.addGearToVisual(newGear);
    scene.add(temp[0]);
    scene.add(temp[1]);
  }
  return newGear;
}

// Function to add shaft
export function AddShaft(source, capacity, direction = "OVER", _color = null) {
  if (source.isGear && !source.isShaftConnected) {
    const _S = new Shaft(source, capacity, direction);
    source.connect(_S);
    let dirIndex = direction === "OVER" ? -1 : direction === "UNDER" ? 1 : 0;
    if (_color) {
      scene.add(
        MainGraphicsController.addShaftToVisual(
          _S,
          dirIndex,
          new THREE.MeshLambertMaterial({ flatShading: true, color: _color })
        )
      );
    } else {
      scene.add(MainGraphicsController.addShaftToVisual(_S, dirIndex));
    }
    shaftArr.push(_S);
    return _S;
  } else {
    return false;
  }
}

// Function to add belt
export function AddBelt(source, target, _color = null) {
  if (source.isGear && target.isGear) {
    const _B = new Belt(source, target);
    if (_color) {
      const temp = MainGraphicsController.addBeltToVisual(
        _B,
        new THREE.MeshLambertMaterial({ flatShading: true, color: _color })
      );
      for (let arr of temp) {
        for (let obj of arr) {
          scene.add(obj);
        }
      }
    } else {
      const temp = MainGraphicsController.addBeltToVisual(_B);
      for (let arr of temp) {
        for (let obj of arr) {
          scene.add(obj);
        }
      }
    }
    beltArr.push(_B);
    return _B;
  } else {
    return false;
  }
}

// Keyboard Controls
const keys = { w: false, a: false, s: false, d: false };
document.addEventListener("keydown", (event) => {
  if (event.key in keys) keys[event.key] = true;
});
document.addEventListener("keyup", (event) => {
  if (event.key in keys) keys[event.key] = false;
});

// Update Camera Position based on keyboard input
function updateCameraPosition() {
  const speed = 0.5;
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);

  // Calculate movement direction vectors
  const forward = direction.clone().normalize().multiplyScalar(speed);
  const right = new THREE.Vector3()
    .crossVectors(camera.up, direction)
    .normalize()
    .multiplyScalar(speed);

  if (keys.w) {
    camera.position.add(forward);
  }
  if (keys.s) {
    camera.position.sub(forward);
  }
  if (keys.a) {
    camera.position.add(right);
  }
  if (keys.d) {
    camera.position.sub(right);
  }

  orbit.update(); // Update the OrbitControls
}

//Loading the scenario from URL parameter
function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get the variable from the URL
const ScenarioIndex = getParameterByName("scenario");
function loadScenario() {
  switch (parseInt(ScenarioIndex)) {
    case 1:
      SC.scenario1();
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;
    case 7:
      break;
    case 8:
      break;
  }
}

loadScenario();

// Update method
function Update() {
  initGear.rotateAngle(PowerSource.power);
}

MainGraphicsController.Update();

// Animation Loop
function Animate(time) {
  Update();
  updateCameraPosition(); // Update camera position based on input
  MainGraphicsController.Update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(Animate);
