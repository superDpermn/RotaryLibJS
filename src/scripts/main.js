import * as THREE from "./three.module.min.js";
import * as CUSTOM from "./helperFunctions.js";
import { OrbitControls } from "./OrbitControls.js";

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

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

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

const testGeometry = CUSTOM.getCogwheel(8, 0.3);
const testMaterial = new THREE.MeshLambertMaterial({
  color: 0xbbaa00,
  flatShading: true,
});
const testObject = new THREE.Mesh(testGeometry, testMaterial);
scene.add(testObject);

const otherTestGeometry = CUSTOM.getCogwheel(12, 0.3);
const otherTestObject = new THREE.Mesh(otherTestGeometry, testMaterial);
scene.add(otherTestObject);

testObject.position.copy(new THREE.Vector3(-2.5, 0, 0));
otherTestObject.position.copy(new THREE.Vector3(3.5, 0, 0));
otherTestObject.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 12);

const yAxis = new THREE.Vector3(0, 1, 0);

const rotateAmount = Math.PI / 360;

function animate(time) {
  testObject.rotateOnAxis(yAxis, rotateAmount);
  otherTestObject.rotateOnAxis(yAxis, (-rotateAmount * 2) / 3);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
