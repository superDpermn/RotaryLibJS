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

camera.position.set(40, 25, 20);
const orbit = new OrbitControls(camera, renderer.domElement);

orbit.target.set(40, 0, 0);

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

const PowerSource = new ConstantSpeedSource(new Fraction(1, 6000));

const Gear1 = new Gear(32);
Gear1.setPosition({ x: 40, y: 0, z: 0 });
const Gear2 = new Gear(16);
const Gear3 = new Gear(24);
const Gear4 = new Gear(16);
const t = 0;
const g = 40 + 20;
Gear4.setPosition(new THREE.Vector3(g, 0, t));
const Gear5 = new Gear(8);
Gear5.setPosition(new THREE.Vector3(g, 2, t));
const Gear6 = new Gear(64);

const Belt1 = new Belt(Gear1, Gear4);

Gear1.connect(Belt1);
const Shaft1 = new Shaft(Gear5);

Gear1.connect(Gear2, "LEFT");
Gear2.connect(Gear3, "UP");
Gear3.connect(Gear6, "UP");
Gear4.connect(Shaft1);

const gearObjArr = [
  MainGraphicsController.addGearToVisual(Gear1),
  MainGraphicsController.addGearToVisual(Gear2),
  MainGraphicsController.addGearToVisual(Gear3),
  MainGraphicsController.addGearToVisual(Gear4),
  MainGraphicsController.addGearToVisual(Gear5),
  MainGraphicsController.addGearToVisual(Gear6),
];
for (let i = 0; i < gearObjArr.length; i++) {
  for (let j = 0; j < 2; j++) {
    scene.add(gearObjArr[i][j]);
  }
}

const belt1arr = MainGraphicsController.addBeltToVisual(Belt1);
for (let x of belt1arr) {
  for (let y of x) {
    scene.add(y);
  }
}
//
scene.add(MainGraphicsController.addShaftToVisual(Shaft1));

function testUpdate() {
  Gear1.rotateAngle(PowerSource.power);
}

MainGraphicsController.Update();
//---------------------------------------------------------

function testAnimate(time) {
  testUpdate();
  MainGraphicsController.Update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(testAnimate);
