import * as THREE from "./ThreeLib/three.module.min.js";

//--------------defining custom geometry-------------------
export function getCogwheelGeometry(notchCount, halfWidth = 0.5) {
  if (notchCount < 5) {
    return null;
  }

  const notchAngle = (Math.PI * 2) / notchCount;
  const innerRadius = 0.25 * notchCount;
  const outerRadius = innerRadius + 1;

  const vertices = [];
  const indices = [];
  for (let i = 0; i < notchCount; i++) {
    let innerAngle1 = i * notchAngle - Math.PI / (notchCount * 1.8);
    let innerAngle2 = i * notchAngle + Math.PI / (notchCount * 1.8);
    let outerAngle1 = i * notchAngle - Math.PI / (notchCount * 4);
    let outerAngle2 = i * notchAngle + Math.PI / (notchCount * 4);
    vertices.push(
      //---------------------------------- 0 & 1

      Math.cos(innerAngle1) * innerRadius,
      -halfWidth,
      Math.sin(innerAngle1) * innerRadius,

      Math.cos(innerAngle1) * innerRadius,
      halfWidth,
      Math.sin(innerAngle1) * innerRadius,

      //---------------------------------- 2 & 3

      Math.cos(outerAngle1) * outerRadius,
      halfWidth,
      Math.sin(outerAngle1) * outerRadius,

      Math.cos(outerAngle1) * outerRadius,
      -halfWidth,
      Math.sin(outerAngle1) * outerRadius,

      //---------------------------------- 4 & 5

      Math.cos(outerAngle2) * outerRadius,
      -halfWidth,
      Math.sin(outerAngle2) * outerRadius,

      Math.cos(outerAngle2) * outerRadius,
      halfWidth,
      Math.sin(outerAngle2) * outerRadius,

      //---------------------------------- 6 & 7

      Math.cos(innerAngle2) * innerRadius,
      halfWidth,
      Math.sin(innerAngle2) * innerRadius,

      Math.cos(innerAngle2) * innerRadius,
      -halfWidth,
      Math.sin(innerAngle2) * innerRadius
    );
  }

  vertices.push(0, -halfWidth, 0, 0, halfWidth, 0);
  const vLen = vertices.length / 3;

  for (let i = 0; i < 8 * notchCount; i += 8) {
    indices.push(
      i % (8 * notchCount),
      (i + 2) % (8 * notchCount),
      (i + 3) % (8 * notchCount),
      //
      (i + 2) % (8 * notchCount),
      i % (8 * notchCount),
      (i + 1) % (8 * notchCount),
      //
      (i + 3) % (8 * notchCount),
      (i + 5) % (8 * notchCount),
      (i + 4) % (8 * notchCount),
      //
      (i + 5) % (8 * notchCount),
      (i + 3) % (8 * notchCount),
      (i + 2) % (8 * notchCount),
      //
      (i + 4) % (8 * notchCount),
      (i + 6) % (8 * notchCount),
      (i + 7) % (8 * notchCount),
      //
      (i + 6) % (8 * notchCount),
      (i + 4) % (8 * notchCount),
      (i + 5) % (8 * notchCount),
      //

      (i + 7) % (8 * notchCount),
      (i + 9) % (8 * notchCount),
      (i + 8) % (8 * notchCount),
      //
      (i + 9) % (8 * notchCount),
      (i + 7) % (8 * notchCount),
      (i + 6) % (8 * notchCount),
      //

      //
      i % (8 * notchCount),
      (i + 3) % (8 * notchCount),
      vLen - 2,

      //
      (i + 1) % (8 * notchCount),
      vLen - 1,
      (i + 2) % (8 * notchCount),

      //
      (i + 3) % (8 * notchCount),
      (i + 4) % (8 * notchCount),
      vLen - 2,

      //
      (i + 2) % (8 * notchCount),
      vLen - 1,
      (i + 5) % (8 * notchCount),

      //
      (i + 4) % (8 * notchCount),
      (i + 7) % (8 * notchCount),
      vLen - 2,

      //
      (i + 5) % (8 * notchCount),
      vLen - 1,
      (i + 6) % (8 * notchCount),

      //
      (i + 7) % (8 * notchCount),
      (i + 8) % (8 * notchCount),
      vLen - 2,

      //
      (i + 6) % (8 * notchCount),
      vLen - 1,
      (i + 9) % (8 * notchCount)
    );
  }

  const geometry = new THREE.BufferGeometry();
  const arrayVertices = new Float32Array(vertices);
  geometry.setIndex(indices);
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(arrayVertices, 3)
  );
  const lineGeometry = new THREE.EdgesGeometry(geometry);

  return [geometry, lineGeometry];
}
//------------------------------------------

export function getShaftGeometry(length = 2) {
  const vertices = [];
  const indices = [];
  const radius = 0.5;
  const newLength = length;
  const halfLength = newLength / 2;
  for (let i = 0; i < 6; i++) {
    let angle = (Math.PI * i) / 3;
    vertices.push(
      Math.cos(angle) * radius,
      -halfLength,
      Math.sin(angle) * radius,
      //
      Math.cos(angle) * radius,
      halfLength,
      Math.sin(angle) * radius
    );
  }
  vertices.push(0, -halfLength, 0, 0, halfLength, 0);

  const vLen = vertices.length / 3;

  for (let i = 0; i < 12; i += 2) {
    indices.push(
      i % 12,
      (i + 1) % 12,
      (i + 2) % 12,

      //
      (i + 2) % 12,
      (i + 1) % 12,
      (i + 3) % 12,
      //

      i % 12,
      (i + 2) % 12,
      vLen - 2,
      //
      (i + 1) % 12,
      vLen - 1,
      (i + 3) % 12
    );
  }

  const geometry = new THREE.BufferGeometry();
  const arrayVertices = new Float32Array(vertices);
  geometry.setIndex(indices);
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(arrayVertices, 3)
  );

  return geometry;
}
