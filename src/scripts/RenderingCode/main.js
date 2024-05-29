import * as THREE from "./ThreeLib/three.module.min.js";
import { OrbitControls } from "./ThreeLib/OrbitControls.js";
import { GraphicsController } from "./GraphicsController.js";
import { Gear } from "../InnerCalculations/Gear.js";
import { Belt } from "../InnerCalculations/Belt.js";
import { Shaft } from "../InnerCalculations/Shaft.js";
import { Fraction } from "../InnerCalculations/Fraction.js";
import { ConstantSpeedSource } from "../InnerCalculations/Source.js";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//------------------------------------------------------------

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

const color = 0xffffff;

const light1 = new THREE.DirectionalLight(color, 3);
light1.position.set(10, 50, 5);
light1.target.position.set(0, 0, 0);
scene.add(light1);

const light2 = new THREE.DirectionalLight(color, 2);
light2.position.set(-10, -50, -5);
light2.target.position.set(0, 0, 0);
scene.add(light2);

const MainGraphicsController = new GraphicsController();

//---------------------------------------------------------

let tickSpeed = 3;

const PowerSource = new ConstantSpeedSource(
  new Fraction(Math.floor(tickSpeed), 3000)
);

const gearArr = [new Gear(16)];
const shaftArr = [];
const beltArr = [];

const initGear = gearArr[0];
const temp = MainGraphicsController.addGearToVisual(initGear);
scene.add(temp[0]);
scene.add(temp[1]);

function AddGear(notchCount, source, direction = "UP", _color = null) {
  const checkIndex =
    direction == "LEFT"
      ? 0
      : direction == "TOP"
      ? 1
      : direction == "RIGHT"
      ? 2
      : direction == "DOWN"
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

function AddFreeGear(notchCount, pos, _color = null) {
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

function AddShaft(source, capacity, direction = "OVER", _color = null) {
  if (source.isGear && !source.isShaftConnected) {
    const _S = new Shaft(source, capacity, direction);
    source.connect(_S);
    let dirIndex = direction == "OVER" ? -1 : direction == "UNDER" ? 1 : 0;
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

function AddBelt(source, target, _color = null) {
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

/**
 * Testing
 */
let s1 = AddShaft(initGear, 2, "OVER");
AddGear(8, s1);
AddGear(12, s1);

AddFreeGear(16, { x: 0, y: 4, z: 12 }, 0xffbbaa);
AddBelt(gearArr[gearArr.length - 2], gearArr[gearArr.length - 1]);

/**
 * Testing end
 */

function testUpdate() {
  initGear.rotateAngle(PowerSource.power);
}

MainGraphicsController.Update();
//---------------------------------------------------------

function testAnimate(time) {
  testUpdate();
  MainGraphicsController.Update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(testAnimate);

/**
 
GearArray = [];
GearArray.push(Connect(Gear1, new Gear(16)));

.
.
.

TargetGear = new Gear(24);
TargetSpeed = new Fraction(1,16);

 */
