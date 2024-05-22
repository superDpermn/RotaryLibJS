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

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 15, 10);
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

const PowerSource = new ConstantSpeedSource(new Fraction(1, 600));

const Gear1 = new Gear(8);
const Gear2 = new Gear(8);
const Gear3 = new Gear(12);
const Gear4 = new Gear(16);
Gear4.setPosition(new THREE.Vector3(10, 0, 0));
const Gear5 = new Gear(8);
Gear5.setPosition(new THREE.Vector3(10, 2, 0));

Gear1.connect(new Belt(Gear1, Gear4));
const Shaft1 = new Shaft(Gear5);

Gear1.connect(Gear2, "LEFT");
Gear2.connect(Gear3, "UP");
Gear4.connect(Shaft1);

const gearObjArr = [
  MainGraphicsController.addGearToVisual(Gear1),
  MainGraphicsController.addGearToVisual(Gear2),
  MainGraphicsController.addGearToVisual(Gear3),
  MainGraphicsController.addGearToVisual(Gear4),
  MainGraphicsController.addGearToVisual(Gear5),
];
for (let i = 0; i < gearObjArr.length; i++) {
  for (let j = 0; j < 2; j++) {
    scene.add(gearObjArr[i][j]);
  }
}

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
