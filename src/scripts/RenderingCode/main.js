import * as THREE from "./ThreeLib/three.module.min.js";
import * as CUSTOM_MODELS from "./3D_Models.js";
import { OrbitControls } from "./ThreeLib/OrbitControls.js";
import * as GEAR from "../InnerCalculations/Gear.js";
import * as FRACTION from "../InnerCalculations/Fraction.js";
import { GraphicsController } from "./GraphicsController.js";
import { MechanicalSystemAdapter } from "../InnerCalculations/MechanicalSystem.js";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);

camera.position.set(0, 5, 15);
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

//define a material for use with the gears
const testMaterial = new THREE.MeshLambertMaterial({
  color: 0x897351,
  flatShading: true,
});

//test2 start

const MainSystem = new MechanicalSystemAdapter();
for (let x = 10; x < 15; x++) {
  MainSystem.addLeftToLastGear(x);
}
const MainGraphicsController = new GraphicsController();
scene.add(MainGraphicsController.addGearToVisual(MainSystem.mainGear));
MainSystem.gearArray.forEach((g) => {
  scene.add(MainGraphicsController.addGearToVisual(g));
});

//test2 end

// function animate(time) {
//   testGear1.rotateAngle(new FRACTION.Fraction(1, 600));

//   gear1Mesh.rotateOnAxis(
//     new THREE.Vector3(0, 1, 0),
//     testGear1.lastRotation.toRadianAngle()
//   );
//   gear2Mesh.rotateOnAxis(
//     new THREE.Vector3(0, 1, 0),
//     testGear2.lastRotation.toRadianAngle()
//   );

//   renderer.render(scene, camera);
// }

function testAnimate(time) {
  MainSystem.simulate();
  MainGraphicsController.Update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(testAnimate);
