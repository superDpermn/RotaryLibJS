import * as THREE from "./ThreeLib/three.module.min.js";
import * as CUSTOM_MODELS from "./3D_Models.js";
import { Fraction } from "../InnerCalculations/Fraction.js";

export class GraphicsController {
  constructor() {
    this.gears = [];
    this.gearMeshArr = [];
    this.shafts = [];
    this.shaftMeshArr = [];
    this.belts = [];
    this.beltCorners = [];
    this.beltLinears = [];
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

  addBeltToVisual(belt, material = null) {
    const parts = CUSTOM_MODELS.getBeltGeometries(belt.g1, belt.g2);
    const customMaterial =
      material ||
      new THREE.MeshLambertMaterial({
        color: 0x555555,
        flatShading: true,
      });
    const corners = [
      new THREE.Mesh(parts[0][0], customMaterial),
      new THREE.Mesh(parts[0][1], customMaterial),
    ];
    const linears = [
      new THREE.Mesh(parts[1][0], customMaterial),
      new THREE.Mesh(parts[1][1], customMaterial),
    ];
    this.belts.push(belt);

    if (
      !(
        belt.g1.position.x == 0 &&
        belt.g1.position.y == 0 &&
        belt.g1.position.z == 0
      )
    ) {
      corners[0].translateOnAxis(
        new THREE.Vector3(
          belt.g1.position.x,
          belt.g1.position.y,
          belt.g1.position.z
        ).normalize(),
        Math.sqrt(
          belt.g1.position.x * belt.g1.position.x +
            belt.g1.position.y * belt.g1.position.y +
            belt.g1.position.z * belt.g1.position.z
        )
      );
    }
    if (
      !(
        belt.g2.position.x == 0 &&
        belt.g2.position.y == 0 &&
        belt.g2.position.z == 0
      )
    ) {
      corners[1].translateOnAxis(
        new THREE.Vector3(
          belt.g2.position.x,
          belt.g2.position.y,
          belt.g2.position.z
        ).normalize(),
        Math.hypot(belt.g2.position.x, belt.g2.position.y, belt.g2.position.z)
      );
    }

    const relAngle = Math.atan2(
      belt.g2.position.z - belt.g1.position.z,
      belt.g2.position.x - belt.g1.position.x
    );

    linears[0].translateOnAxis(
      new THREE.Vector3(
        belt.g1.position.x - (Math.sin(relAngle) * belt.g1.notchCount) / 4,
        belt.g1.position.y,
        belt.g1.position.z + (Math.cos(relAngle) * belt.g1.notchCount) / 4
      ).normalize(),
      Math.hypot(
        belt.g1.position.x - (Math.sin(relAngle) * belt.g1.notchCount) / 4,
        belt.g1.position.y,
        belt.g1.position.z + (Math.cos(relAngle) * belt.g1.notchCount) / 4
      )
    );

    linears[1].translateOnAxis(
      new THREE.Vector3(
        belt.g2.position.x + (Math.sin(relAngle) * belt.g2.notchCount) / 4,
        belt.g2.position.y,
        belt.g2.position.z - (Math.cos(relAngle) * belt.g2.notchCount) / 4
      ).normalize(),
      Math.hypot(
        belt.g2.position.x + (Math.sin(relAngle) * belt.g2.notchCount) / 4,
        belt.g2.position.y,
        belt.g2.position.z - (Math.cos(relAngle) * belt.g2.notchCount) / 4
      )
    );

    const angleOffset = Math.atan2(
      belt.g1.notchCount - belt.g2.notchCount,
      4 *
        Math.hypot(
          belt.g1.position.x - belt.g2.position.x,
          belt.g1.position.z - belt.g2.position.z
        )
    );

    linears[0].rotateY(-relAngle + angleOffset);
    linears[1].rotateY(-relAngle + Math.PI - angleOffset);

    corners[0].rotateY(-Math.PI / 2 - relAngle);
    corners[1].rotateY(Math.PI / 2 - relAngle);

    this.beltCorners.push(...corners);
    this.beltLinears.push(...linears);

    return [corners, linears];
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
    for (let i = 0; i < this.belts.length; i++) {
      let beltDir = this.belts[i].lastRotation.isGreaterThan(new Fraction())
        ? -1
        : 1;
      if (this.belts[i].resetFlag) {
        this.beltCorners[i * 2].rotateY(
          new Fraction(beltDir, this.belts[i].g1.notchCount).toRadianAngle()
        );
        this.beltCorners[i * 2 + 1].rotateY(
          new Fraction(beltDir, this.belts[i].g2.notchCount).toRadianAngle()
        );
        this.beltLinears[i * 2].translateX(2 * beltDir);
        this.beltLinears[i * 2 + 1].translateX(2 * beltDir);
        this.belts[i].resetFlag = false;
      }
      this.beltCorners[i * 2].rotateY(
        this.belts[i].g1.lastRotation.toRadianAngle()
      );
      this.beltCorners[i * 2 + 1].rotateY(
        this.belts[i].g2.lastRotation.toRadianAngle()
      );
      //---------------------
      this.beltLinears[i * 2].translateX(
        (this.belts[i].g1.notchCount *
          this.belts[i].g1.lastRotation.toRadianAngle()) /
          Math.PI
      );
      this.beltLinears[i * 2 + 1].translateX(
        (this.belts[i].g1.notchCount *
          this.belts[i].g1.lastRotation.toRadianAngle()) /
          Math.PI
      );
    }
  }
}
