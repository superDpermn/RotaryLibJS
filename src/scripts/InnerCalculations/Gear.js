import { Fraction } from "./Fraction.js";

export class Gear {
  constructor(notchCount) {
    this.notchCount = notchCount;
    this.connections = [];
    this.fullRotation = 0;
    this.offsetRotation = new Fraction();
    this.lastRotation = new Fraction();
    this.position = { x: 0, y: 0, z: 0 };
  }

  setPosition(newPosition) {
    this.position = newPosition;
  }

  connect(otherGear) {
    this.connections.push(otherGear);
  }

  rotateNotch(amount) {
    this.offsetRotation.simplify();
    if (!amount.isEqual(new Fraction(0))) {
      const addAmount = amount.divide(new Fraction(this.notchCount));
      this.offsetRotation = this.offsetRotation.add(addAmount);
      this.lastRotation = addAmount;
    }
    this.fullRotation = this.offsetRotation.normalize();
    this.connections.forEach((g) => {
      g.rotateNotch(amount.negate());
    });
  }

  rotateAngle(angleFraction) {
    this.offsetRotation.simplify();
    this.offsetRotation = this.offsetRotation.add(angleFraction);
    this.lastRotation = angleFraction;
    this.fullRotation = this.offsetRotation.normalize();
    const NC = angleFraction.multiply(new Fraction(-this.notchCount));
    this.connections.forEach((g) => {
      g.rotateNotch(NC);
    });
  }
}
