import * as THREE from "./ThreeLib/three.module.min.js";
import * as CUSTOM_MODELS from "./3D_Models.js";

export class GraphicsController {
  constructor() {
    this.gears = [];
    this.gearMeshArr = [];
    this.shafts = [];
    this.shaftMeshArr = [];
  }

  addGearToVisual(gear, material = null) {
    const geo = new CUSTOM_MODELS.getCogwheelGeometry(gear.notchCount, 0.3);
    const customGeometry = geo[0];
    const edges = geo[1];
    const customMaterial =
      material ||
      new THREE.MeshLambertMaterial({
        color: 0x717f98,
        flatShading: true,
      });
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xddffff,
      linewidth: 1,
    });
    const gearMesh = new THREE.Mesh(customGeometry, customMaterial);
    const gearOutline = new THREE.LineSegments(edges, lineMaterial);
    const pos = gear.position;

    gearMesh.translateOnAxis(
      new THREE.Vector3(pos.x, pos.y, pos.z).normalize(),
      Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z)
    );
    gearOutline.translateOnAxis(
      new THREE.Vector3(pos.x, pos.y, pos.z).normalize(),
      Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z)
    );
    gearMesh.rotateY(gear.offsetRotation.toRadianAngle());
    gearOutline.rotateY(gear.offsetRotation.toRadianAngle());

    this.gearMeshArr.push(gearMesh);
    this.gears.push(gear);
    this.gearMeshArr.push(gearOutline);
    return [gearMesh, gearOutline];
  }

  addShaftToVisual(shaft, material = null) {
    const customGeometry = new CUSTOM_MODELS.getShaftGeometry(5);
    const customMaterial =
      material ||
      new THREE.MeshLambertMaterial({
        color: 0xaaaaaa,
        flatShading: true,
      });
    const shaftMesh = new THREE.Mesh(customGeometry, customMaterial);
    const pos = shaft.parentComponent.position || { x: 5, y: -5, z: 0 };
    shaftMesh.translateOnAxis(
      new THREE.Vector3(pos.x, pos.y, pos.z).normalize(),
      Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z)
    );
    this.shafts.push(shaft);
    this.shaftMeshArr.push(shaftMesh);
    return shaftMesh;
  }

  Update() {
    for (let i = 0; i < this.gears.length; i++) {
      this.gearMeshArr[i * 2].rotateOnAxis(
        new THREE.Vector3(0, 1, 0),
        this.gears[i].lastRotation.toRadianAngle()
      );
      this.gearMeshArr[i * 2 + 1].rotateOnAxis(
        new THREE.Vector3(0, 1, 0),
        this.gears[i].lastRotation.toRadianAngle()
      );
    }
    for (let i = 0; i < this.shafts.length; i++) {
      this.shaftMeshArr[i].rotateY(this.shafts[i].lastRotation.toRadianAngle());
    }
  }
}
