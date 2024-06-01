import * as SCENARIO from "./RenderingCode/main.js";

export function scenario1(){
    let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 1, "OVER");  
    let g1 = SCENARIO.AddGear(16, s1);
    SCENARIO.AddGear(16, g1, "RIGHT");
    SCENARIO.AddGear(16, SCENARIO.initGear, "DOWN");
}

export function scenario2(){
    let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 1, "OVER");  
    let g1 = SCENARIO.AddGear(16, s1);
   
    SCENARIO.AddGear(16, g1, "RIGHT");
    SCENARIO.AddGear(16, g1, "LEFT");
    SCENARIO.AddGear(16, SCENARIO.initGear, "DOWN");
    SCENARIO.AddGear(16, SCENARIO.initGear, "UP");
}
export function scenario3(){
    let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 2, "OVER");
    SCENARIO.AddGear(8, s1);
    SCENARIO.AddGear(12, s1);
    
    SCENARIO.AddFreeGear(16, { x: 0, y: 4, z: 12 });
    SCENARIO.AddBelt(SCENARIO.gearArr[SCENARIO.gearArr.length - 2], SCENARIO.gearArr[SCENARIO.gearArr.length - 1]); 
    
}

export function scenario4(){
    let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 1, "UNDER");
    let g1 = SCENARIO.AddGear(56, s1);
    SCENARIO.AddGear(24, g1, "LEFT");
    SCENARIO.AddGear(16, SCENARIO.initGear, "DOWN");
}

export function scenario5(){
    let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 1, "OVER");
    let g1 = SCENARIO.AddGear(16, s1);
    let g2 = SCENARIO.AddFreeGear(16, { x: 0, y: 2, z: 12 });
    SCENARIO.AddBelt(g1, g2);

    let s2 = SCENARIO.AddShaft(g2, 1, "OVER");
    let g3 = SCENARIO.AddGear(16, s2);
    let g4 = SCENARIO.AddFreeGear(16, { x: 14, y: 4, z: 12 });
    SCENARIO.AddBelt(g3, g4);

    let g5 = SCENARIO.AddFreeGear(16, { x: -14, y: 0, z: 0 });
    SCENARIO.AddBelt(SCENARIO.initGear, g5);
}

export function scenario6(){
    
}

export function scenario7(){
    
}

export function scenario8(){
   
}