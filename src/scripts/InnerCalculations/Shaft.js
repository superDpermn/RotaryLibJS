import { Fraction } from "./Fraction.js";

export class Shaft {
  constructor(...targets) {
    this.isShaft = true;
    this.parentComponent = null;
    this.connections = targets;
    this.offsetRotation = new Fraction();
    this.lastRotation = new Fraction();
    this.fullRotation = new Fraction();
  }

  rotateAngle(angleFraction) {
    this.offsetRotation.simplify();
    this.offsetRotation = this.offsetRotation.add(angleFraction);
    this.lastRotation = angleFraction;
    this.fullRotation = this.offsetRotation.normalize();
    this.connections.forEach((g) => {
      if (g.isGear) {
        g.rotateAngle(angleFraction);
      } else if (g.isShaft) {
        g.rotateAngle(angleFraction);
      }
      // shafts can't connect to belts by itself
    });
  }
}
