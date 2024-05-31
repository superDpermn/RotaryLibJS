import * as THREE from "./ThreeLib/three.module.min.js";
import { OrbitControls } from "./ThreeLib/OrbitControls.js";
import { GraphicsController } from "./GraphicsController.js";
import { Gear } from "../InnerCalculations/Gear.js";
import { Belt } from "../InnerCalculations/Belt.js";
import { Shaft } from "../InnerCalculations/Shaft.js";
import { Fraction } from "../InnerCalculations/Fraction.js";
import { ConstantSpeedSource } from "../InnerCalculations/Source.js";

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// UI Overlay
const UIOverlay = document.createElement("div");
document.body.appendChild(UIOverlay);

// Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 20);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.target.set(0, 0, 0);
orbit.update();

// Lights
const color = 0xffffff;
const light1 = new THREE.DirectionalLight(color, 3);
light1.position.set(10, 50, 5);
light1.target.position.set(0, 0, 0);
scene.add(light1);

const light2 = new THREE.DirectionalLight(color, 2);
light2.position.set(-10, -50, -5);
light2.target.position.set(0, 0, 0);
scene.add(light2);

// Main Graphics Controller
const MainGraphicsController = new GraphicsController();

// Power Source
let tickSpeed = 3;
const PowerSource = new ConstantSpeedSource(new Fraction(Math.floor(tickSpeed), 3000));

// Arrays to hold gears, shafts, and belts
const gearArr = [new Gear(16)];
const shaftArr = [];
const beltArr = [];

// Initial Gear
const initGear = gearArr[0];
let temp = MainGraphicsController.addGearToVisual(initGear);
scene.add(temp[0]);
scene.add(temp[1]);

// Function to add gear
function AddGear(notchCount, source, direction = "UP", _color = null) {
    const checkIndex = direction === "LEFT" ? 0 : direction === "UP" ? 1 : direction === "RIGHT" ? 2 : direction === "DOWN" ? 3 : 4;
    if (source.isGear && source.occuStatus[checkIndex]) {
        const _G = new Gear(notchCount);
        source.connect(_G, direction);
        gearArr.push(_G);
        if (_color) {
            const temp = MainGraphicsController.addGearToVisual(_G, new THREE.MeshLambertMaterial({ flatShading: true, color: _color }));
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
            const temp = MainGraphicsController.addGearToVisual(_G, new THREE.MeshLambertMaterial({ flatShading: true, color: _color }));
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
function AddFreeGear(notchCount, pos, _color = null) {
    const newGear = new Gear(notchCount, pos);
    gearArr.push(newGear);
    if (_color) {
        const temp = MainGraphicsController.addGearToVisual(newGear, new THREE.MeshLambertMaterial({ flatShading: true, color: _color }));
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
function AddShaft(source, capacity, direction = "OVER", _color = null) {
    if (source.isGear && !source.isShaftConnected) {
        const _S = new Shaft(source, capacity, direction);
        source.connect(_S);
        let dirIndex = direction === "OVER" ? -1 : direction === "UNDER" ? 1 : 0;
        if (_color) {
            scene.add(MainGraphicsController.addShaftToVisual(_S, dirIndex, new THREE.MeshLambertMaterial({ flatShading: true, color: _color })));
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
function AddBelt(source, target, _color = null) {
    if (source.isGear && target.isGear) {
        const _B = new Belt(source, target);
        if (_color) {
            const temp = MainGraphicsController.addBeltToVisual(_B, new THREE.MeshLambertMaterial({ flatShading: true, color: _color }));
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
    const right = new THREE.Vector3().crossVectors(camera.up, direction).normalize().multiplyScalar(speed);

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

// Testing
let s1 = AddShaft(initGear, 2, "OVER");
AddGear(8, s1);
AddGear(12, s1);

AddFreeGear(16, { x: 0, y: 4, z: 12 }, 0xffbbaa);
AddBelt(gearArr[gearArr.length - 2], gearArr[gearArr.length - 1]);

// Test Update
function testUpdate() {
    initGear.rotateAngle(PowerSource.power);
}

MainGraphicsController.Update();

// Animation Loop
function testAnimate(time) {
    testUpdate();
    updateCameraPosition(); // Update camera position based on input
    MainGraphicsController.Update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(testAnimate);
