import * as SCENARIO from "./RenderingCode/main.js";

export function scenario1() {
  let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 1, "OVER");
  let g1 = SCENARIO.AddGear(16, s1);
  SCENARIO.AddGear(16, g1, "RIGHT");
  SCENARIO.AddGear(16, SCENARIO.initGear, "DOWN");
}

export function scenario2() {
  let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 1, "OVER");
  let g1 = SCENARIO.AddGear(16, s1);

  SCENARIO.AddGear(16, g1, "RIGHT");
  SCENARIO.AddGear(16, g1, "LEFT");
  SCENARIO.AddGear(16, SCENARIO.initGear, "DOWN");
  SCENARIO.AddGear(16, SCENARIO.initGear, "UP");
}

export function scenario3() {
  let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 1, "OVER");
  let g1 = SCENARIO.AddGear(16, s1);
  SCENARIO.AddGear(24, g1, "RIGHT");
  SCENARIO.AddGear(32, g1, "LEFT");
  SCENARIO.AddGear(16, g1, "UP");
  SCENARIO.AddGear(12, SCENARIO.initGear, "DOWN");
  let s2 = SCENARIO.AddShaft(g1, 2, "OVER");
  let g2 = SCENARIO.AddGear(20, s2);
  SCENARIO.AddGear(12, g2, "RIGHT");  
}

export function scenario4() {
  let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 2, "OVER");
  SCENARIO.AddGear(8, s1);
  SCENARIO.AddGear(12, s1);

  SCENARIO.AddFreeGear(16, { x: 0, y: 4, z: 12 });
  SCENARIO.AddBelt(
    SCENARIO.gearArr[SCENARIO.gearArr.length - 2],
    SCENARIO.gearArr[SCENARIO.gearArr.length - 1]
);  
}

export function scenario5() {
  let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 1, "UNDER");
  let g1 = SCENARIO.AddGear(56, s1);
  SCENARIO.AddGear(24, g1, "LEFT");
  SCENARIO.AddGear(16, SCENARIO.initGear, "DOWN");
}

export function scenario6() {
  const g10 = SCENARIO.AddGear(24, SCENARIO.initGear, "LEFT");
  const g6 = SCENARIO.AddGear(16, g10, "UP");
  let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 1, "OVER");
  let g1 = SCENARIO.AddGear(16, s1);
  let g2 = SCENARIO.AddFreeGear(16, { x: 0, y: 2, z: 12 });
  SCENARIO.AddBelt(g1, g2);
}

export function scenario7() {
  let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 1, "OVER");
  let g1 = SCENARIO.AddGear(16, s1);
  let g2 = SCENARIO.AddFreeGear(16, { x: 0, y: 2, z: 12 });
  SCENARIO.AddBelt(g1, g2, 0x103070);

  let s2 = SCENARIO.AddShaft(g2, 1, "OVER");
  let g3 = SCENARIO.AddGear(16, s2);
  let g4 = SCENARIO.AddFreeGear(16, { x: 14, y: 4, z: 12 });
  SCENARIO.AddBelt(g3, g4);

  let g5 = SCENARIO.AddFreeGear(16, { x: -14, y: 0, z: 0 });
  SCENARIO.AddBelt(SCENARIO.initGear, g5);
}

export function scenario8() {
  const g1 = SCENARIO.AddGear(28, SCENARIO.initGear, "LEFT");
  const g2 = SCENARIO.AddGear(16, g1, "UP");
  //
  const s1 = SCENARIO.AddShaft(g2, 2, "OVER");
  const g3 = SCENARIO.AddGear(12, s1);
  const g4 = SCENARIO.AddGear(8, s1);
  //
  const g5 = SCENARIO.AddFreeGear(16, {
    x: g4.position.x - 20,
    y: g4.position.y,
    z: g4.position.z,
  });
  const b1 = SCENARIO.AddBelt(g4, g5, 0x601010);
  //
  const g6 = SCENARIO.AddFreeGear(24, {
    x: g3.position.x,
    y: g3.position.y,
    z: g3.position.z - 25,
  });
  const b2 = SCENARIO.AddBelt(g3, g6, 0x103070);
  //
  const s2 = SCENARIO.AddShaft(g6, 1, "UNDER");
  const g7 = SCENARIO.AddGear(36, s2);
  const g8 = SCENARIO.AddGear(12, g7, "RIGHT");
  const s3 = SCENARIO.AddShaft(g8, 1, "UNDER");
  const g9 = SCENARIO.AddGear(24, s3);
  const g10 = SCENARIO.AddFreeGear(20, {
    x: g9.position.x,
    y: g9.position.y,
    z: g9.position.z + 20,
  });
  const b3 = SCENARIO.AddBelt(g9, g10);
  //
  const g12 = SCENARIO.AddGear(24, SCENARIO.initGear, "RIGHT");
}
