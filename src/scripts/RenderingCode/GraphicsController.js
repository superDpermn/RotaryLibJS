import * as THREE from "./ThreeLib/three.module.min.js";
import * as CUSTOM_MODELS from "./3D_Models.js";

export class GraphicsController {
  constructor() {
    this.gears = [];
    this.gearMeshArr = [];
  }

  addGearToVisual(gear, material = null) {
    const customGeometry = new CUSTOM_MODELS.getCogwheelGeometry(
      gear.notchCount,
      0.3
    );
    const customMaterial =
      material ||
      new THREE.MeshLambertMaterial({
        color: 0x89735b,
        flatShading: true,
      });
    const gearMesh = new THREE.Mesh(customGeometry, customMaterial);
    const pos = gear.position;

    gearMesh.translateOnAxis(
      new THREE.Vector3(pos.x, pos.y, pos.z).normalize(),
      Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z)
    );
    gearMesh.rotateY(gear.offsetRotation.toRadianAngle());
    this.gearMeshArr.push(gearMesh);
    this.gears.push(gear);
    return gearMesh;
  }

  Update() {
    for (let i = 0; i < this.gears.length; i++) {
      this.gearMeshArr[i].rotateOnAxis(
        new THREE.Vector3(0, 1, 0),
        this.gears[i].lastRotation.toRadianAngle()
      );
    }
  }
}
