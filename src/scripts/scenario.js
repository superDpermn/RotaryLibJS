import * as SCENARIO from "./RenderingCode/main.js";

export function scenario1(){
    let s1 = SCENARIO.AddShaft(SCENARIO.initGear, 2, "OVER");
    SCENARIO.AddGear(8, s1);
    SCENARIO.AddGear(12, s1);
    
    SCENARIO.AddFreeGear(16, { x: 0, y: 4, z: 12 });
    SCENARIO.AddBelt(SCENARIO.gearArr[SCENARIO.gearArr.length - 2], SCENARIO.gearArr[SCENARIO.gearArr.length - 1]);
    
}
