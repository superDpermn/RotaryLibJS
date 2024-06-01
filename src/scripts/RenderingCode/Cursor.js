import * as THREE from "./ThreeLib/three.module.min.js";

export const Cursor = new THREE.Mesh(
  new THREE.CylinderGeometry(3, 3, 1, 12, 1),
  new THREE.MeshLambertMaterial({
    color: 0x445588,
    flatShading: true,
  })
);

function AnimateCursor(targetPosition = { x: 0, y: 0, z: 0 }) {
  // Calculate the direction vector from the current position to the target position
  const direction = new THREE.Vector3(
    targetPosition.x - Cursor.position.x,
    targetPosition.y - Cursor.position.y,
    targetPosition.z - Cursor.position.z
  );

  // Normalize the direction vector to get the movement step
  const step = direction.normalize().multiplyScalar(0.4);

  // Update the mesh position
  if (
    Cursor.position.distanceTo(
      new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z)
    ) > 0.4
  ) {
    Cursor.position.add(step);
  } else {
    // Snap to target position if very close
    Cursor.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
  }
}

let c = 0;
export function handleCursorAnimation(pos) {
  clearInterval(c);
  c = setInterval(() => {
    AnimateCursor(pos);
  }, 20);
}
