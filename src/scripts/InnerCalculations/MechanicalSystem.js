import { Fraction } from "./Fraction.js";
import { Gear } from "./Gear.js";
import { ConstantSpeedSource } from "./Source.js";

class MechanicalSystem {
  constructor() {
    this.mainGear = new Gear(10);
    this.gearArray = [];
  }

  connect(newGear, oldGearIndex, relativeAngleFraction) {
    let oldGear;
    if (oldGearIndex >= 0 && oldGearIndex < this.gearArray.length) {
      oldGear = this.gearArray[oldGearIndex];
    } else if (this.gearArray.length == 0) {
      oldGear = this.mainGear;
    }
    oldGear.connect(newGear);
    this.gearArray.push(newGear);
    let oldPosition = oldGear.position;
    let distance = (oldGear.notchCount + newGear.notchCount) / 4 + 1;
    let newPosition = {
      x:
        oldPosition.x +
        Math.cos(relativeAngleFraction.toRadianAngle()) * distance,
      z:
        oldPosition.z +
        Math.sin(relativeAngleFraction.toRadianAngle()) * distance,
      y: 0,
    };
    newGear.setPosition(newPosition);
    //rotation offset algorithm here
  }
}

export class MechanicalSystemAdapter extends MechanicalSystem {
  constructor() {
    super();
    this.source = new ConstantSpeedSource(new Fraction(1, 600));
    this.mainGear = new Gear(10);
  }

  simulate(simulationTick = new Fraction(1)) {
    this.mainGear.rotateAngle(this.source.power.multiply(simulationTick));
  }

  addLeftToLastGear(notchCount) {
    const newGear = new Gear(notchCount);
    this.connect(newGear, this.gearArray.length - 1, new Fraction());
  }
}
