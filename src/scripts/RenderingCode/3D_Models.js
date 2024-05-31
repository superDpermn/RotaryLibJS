import * as THREE from "./ThreeLib/three.module.min.js";

//--------------defining custom geometry-------------------
export function getCogwheelGeometry(notchCount, halfWidth = 0.5) {
  if (notchCount < 5) {
    return null;
  }

  const notchAngle = (Math.PI * 2) / notchCount;
  const innerRadius = 0.25 * notchCount;
  const outerRadius = innerRadius + 1;

  const _theta = Math.asin(0.8 / (notchCount + 4));
  const _alpha = 2 * Math.asin(0.25 / outerRadius);

  const vertices = [];
  const indices = [];
  for (let i = 0; i < notchCount; i++) {
    let innerAngle1 = i * notchAngle - _alpha;
    let innerAngle2 = i * notchAngle + _alpha;
    let outerAngle1 = i * notchAngle - _theta;
    let outerAngle2 = i * notchAngle + _theta;
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

function beltCornerGeometry(angle, notchCount) {
  const vertices = [];
  const indices = [];

  const innerRadius = notchCount * 0.25 + 0.1;
  const outerRadius = innerRadius + 1;
  const outerRadius2 = outerRadius + 0.5;
  const notchAngle = (Math.PI * 2) / notchCount;
  let lastNotchIndex = notchCount;

  const _theta = Math.asin(0.8 / (notchCount + 4));
  const _alpha = 2 * Math.asin(0.25 / outerRadius);

  for (let i = 0; i < notchCount; i++) {
    const currentAngle = i * notchAngle;
    if (currentAngle > angle) {
      lastNotchIndex = i;
      break;
    }

    const innerAngle1 = currentAngle - _alpha;
    const innerAngle2 = currentAngle + _alpha;
    const outerAngle1 = currentAngle - _theta;
    const outerAngle2 = currentAngle + _theta;
    vertices.push(
      //---------------------------------- 0
      innerRadius * Math.cos(innerAngle1),
      -0.5,
      innerRadius * Math.sin(innerAngle1),

      //---------------------------------- 1
      innerRadius * Math.cos(innerAngle1),
      0.5,
      innerRadius * Math.sin(innerAngle1),

      //---------------------------------- 2
      outerRadius * Math.cos(outerAngle1),
      0.5,
      outerRadius * Math.sin(outerAngle1),

      //---------------------------------- 3
      outerRadius * Math.cos(outerAngle1),
      -0.5,
      outerRadius * Math.sin(outerAngle1),

      //---------------------------------- 4
      outerRadius * Math.cos(outerAngle2),
      -0.5,
      outerRadius * Math.sin(outerAngle2),

      //---------------------------------- 5
      outerRadius * Math.cos(outerAngle2),
      0.5,
      outerRadius * Math.sin(outerAngle2),

      //---------------------------------- 6
      innerRadius * Math.cos(innerAngle2),
      0.5,
      innerRadius * Math.sin(innerAngle2),

      //---------------------------------- 7
      innerRadius * Math.cos(innerAngle2),
      -0.5,
      innerRadius * Math.sin(innerAngle2),

      //----------------------------------

      //---------------------------------- 8
      outerRadius2 * Math.cos(innerAngle1),
      -0.5,
      outerRadius2 * Math.sin(innerAngle1),

      //---------------------------------- 9
      outerRadius2 * Math.cos(innerAngle1),
      0.5,
      outerRadius2 * Math.sin(innerAngle1),

      //---------------------------------- 10
      outerRadius2 * Math.cos(innerAngle2),
      0.5,
      outerRadius2 * Math.sin(innerAngle2),

      //---------------------------------- 11
      outerRadius2 * Math.cos(innerAngle2),
      -0.5,
      outerRadius2 * Math.sin(innerAngle2)
    );
  }

  for (let i = 0; i < 12 * lastNotchIndex; i += 12) {
    indices.push(
      i,
      i + 3,
      i + 2,
      //
      i + 2,
      i + 1,
      i,
      //
      i + 3,
      i + 4,
      i + 5,
      //
      i + 5,
      i + 2,
      i + 3,
      //
      i + 4,
      i + 7,
      i + 6,
      //
      i + 6,
      i + 5,
      i + 4,
      //--------------------------------
      // -v-
      i + 11,
      i + 9,
      i + 10,
      // -v-
      i + 9,
      i + 11,
      i + 8,
      //--------------------------------

      //--------------------------------
      i + 1,
      i + 2,
      i + 9,
      //
      i + 5,
      i + 10,
      i + 9,
      //
      i + 5,
      i + 9,
      i + 2,
      //
      i + 6,
      i + 10,
      i + 5,
      //--------------------------------
      i,
      i + 8,
      i + 3,
      //
      i + 4,
      i + 8,
      i + 11,
      //
      i + 4,
      i + 3,
      i + 8,
      //
      i + 7,
      i + 4,
      i + 11

      //--------------------------------
    );
    if (i < 12 * lastNotchIndex - 12) {
      indices.push(
        // -x-
        i + 7,
        i + 12,
        i + 13,
        // -x-f
        i + 13,
        i + 6,
        i + 7,
        // -x-f
        i + 11,
        i + 10,
        i + 20,
        // -x-
        i + 20,
        i + 10,
        i + 21,
        // -x-f
        i + 6,
        i + 13,
        i + 10,
        // -x-
        i + 10,
        i + 13,
        i + 21,
        // -x-f
        i + 7,
        i + 11,
        i + 12,
        // -x-
        i + 11,
        i + 20,
        i + 12
      );
    }
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

function beltLinearGeometry(length) {
  const vertices = [];
  const indices = [];

  const notchLength = 1;
  const grooveLength = 0.5;
  const repeatPeriod = 2 * notchLength;
  let counter = 0;

  for (let i = 0; i < length - repeatPeriod; i += repeatPeriod) {
    counter++;
    vertices.push(
      i,
      -0.5,
      0.1,
      //
      i,
      0.5,
      0.1,
      //
      i + grooveLength,
      0.5,
      0.1,
      //
      i + grooveLength,
      -0.5,
      0.1,
      //----------------------------------
      i + notchLength,
      -0.5,
      1.1,
      //
      i + notchLength,
      0.5,
      1.1,
      //
      i + grooveLength + notchLength,
      0.5,
      1.1,
      //
      i + grooveLength + notchLength,
      -0.5,
      1.1,
      //----------------------------------
      i,
      -0.5,
      1.5,
      //
      i,
      0.5,
      1.5,
      //
      i + grooveLength,
      0.5,
      1.5,
      //
      i + grooveLength,
      -0.5,
      1.5,
      //
      i + grooveLength + notchLength,
      -0.5,
      1.5,
      //
      i + grooveLength + notchLength,
      0.5,
      1.5
    );
  }

  const vLen = vertices.length / 3;

  for (let i = 0; i < vLen; i += 14) {
    indices.push(
      i,
      i + 11,
      i + 8,
      //
      i,
      i + 3,
      i + 11,
      //
      i + 3,
      i + 4,
      i + 11,
      //
      i + 4,
      i + 12,
      i + 11,
      //
      i + 4,
      i + 7,
      i + 12,
      //----------------------------------
      i + 1,
      i + 9,
      i + 10,
      //
      i + 1,
      i + 10,
      i + 2,
      //
      i + 10,
      i + 5,
      i + 2,
      //
      i + 5,
      i + 10,
      i + 13,
      //
      i + 5,
      i + 13,
      i + 6,
      //----------------------------------
      i + 0,
      i + 1,
      i + 2,
      //
      i + 2,
      i + 3,
      i + 0,
      //
      i + 2,
      i + 5,
      i + 4,
      //
      i + 4,
      i + 3,
      i + 2,
      //
      i + 5,
      i + 6,
      i + 7,
      //
      i + 7,
      i + 4,
      i + 5,
      //----------------------------------
      i + 9,
      i + 8,
      i + 10,
      //
      i + 10,
      i + 8,
      i + 11,
      //
      i + 11,
      i + 13,
      i + 10,
      //
      i + 13,
      i + 11,
      i + 12
    );
    if (i < vLen - 14) {
      indices.push(
        i + 22,
        i + 12,
        i + 7,
        //
        i + 7,
        i + 14,
        i + 22,
        //
        i + 6,
        i + 13,
        i + 23,
        //
        i + 6,
        i + 23,
        i + 15,
        //--------------------------------
        i + 13,
        i + 12,
        i + 22,
        //
        i + 22,
        i + 23,
        i + 13,
        //
        i + 6,
        i + 15,
        i + 14,
        //
        i + 14,
        i + 7,
        i + 6
      );
    }
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

export function getBeltGeometries(G1, G2) {
  if (G1 == null || G2 == null) {
    return null;
  }

  const roundParts = [
    beltCornerGeometry(Math.PI, G1.notchCount),
    beltCornerGeometry(Math.PI, G2.notchCount),
  ];

  const tempLength = Math.abs(G1.notchCount - G2.notchCount) / 4;
  const xDiff = G1.position.x - G2.position.x;
  const zDiff = G1.position.z - G2.position.z;
  const dist = Math.sqrt(xDiff * xDiff + zDiff * zDiff);
  const finalLength = Math.hypot(xDiff, zDiff, tempLength);

  const linearParts = [
    beltLinearGeometry(finalLength),
    beltLinearGeometry(finalLength),
  ];

  return [roundParts, linearParts];
}
