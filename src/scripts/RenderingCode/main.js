import * as THREE from "./ThreeLib/three.module.min.js";
import * as CUSTOM_MODELS from "./3D_Models.js";
import { OrbitControls } from "./ThreeLib/OrbitControls.js";
import * as GEAR from "../InnerCalculations/Gear.js";
import * as FRACTION from "../InnerCalculations/Fraction.js";

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

camera.position.set(0, 2, 5);
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

const testMaterial = new THREE.MeshLambertMaterial({
  color: 0x897351,
  flatShading: true,
});

//define notch counts
const notchCount1 = 10;
const notchCount2 = 17;

//create the custom Gear objects to calculate rotation
const testGear1 = new GEAR.Gear(notchCount1);
const testGear2 = new GEAR.Gear(notchCount2);

//makes gear1 rotate gear2 recursively (do not connect both, you will create an infinite recursion)
testGear1.connect(testGear2);

//creates the geometry part of the gear mesh objects
//these values can be used for duplicate gears (exact same dimensions)
const gear1Geometry = CUSTOM_MODELS.getCogwheelGeometry(notchCount1, 0.3);
const gear2Geometry = CUSTOM_MODELS.getCogwheelGeometry(notchCount2, 0.3);

//creates the mesh objects that graphically represent the gears
const gear1Mesh = new THREE.Mesh(gear1Geometry, testMaterial);
//add the mesh to the scene
scene.add(gear1Mesh);
//create offset from the origin so that the gears don't overlap each other (formula is exact)
//formula: offset = otherGear.center +-(notchCount/4 + 1)
gear1Mesh.translateOnAxis(new THREE.Vector3(1, 0, 0), notchCount1 / 4 + 1);

//another mesh for the second gear
const gear2Mesh = new THREE.Mesh(gear2Geometry, testMaterial);
scene.add(gear2Mesh);
gear2Mesh.translateOnAxis(new THREE.Vector3(1, 0, 0), -notchCount2 / 4);

//create half a notch of rotational offset (converted to radians) to match gear teeth
gear2Mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / notchCount2);

// end

function animate(time) {
  testGear1.rotateAngle(new FRACTION.Fraction(1, 600));

  gear1Mesh.rotateOnAxis(
    new THREE.Vector3(0, 1, 0),
    testGear1.lastRotation.toRadianAngle()
  );
  gear2Mesh.rotateOnAxis(
    new THREE.Vector3(0, 1, 0),
    testGear2.lastRotation.toRadianAngle()
  );

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
