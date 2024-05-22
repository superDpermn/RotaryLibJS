import * as THREE from "./ThreeLib/three.module.min.js";
import { OrbitControls } from "./ThreeLib/OrbitControls.js";
import { GraphicsController } from "./GraphicsController.js";
import { Gear } from "../InnerCalculations/Gear.js";
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
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 5, 10);
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

Gear1.connect(Gear2, "LEFT");
Gear2.connect(Gear3, "UP");

scene.add(MainGraphicsController.addGearToVisual(Gear1));
scene.add(MainGraphicsController.addGearToVisual(Gear2));
scene.add(MainGraphicsController.addGearToVisual(Gear3));

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
