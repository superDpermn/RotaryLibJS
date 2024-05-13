import { Fraction } from "./Fraction.js";

export class Gear {
  constructor(notchCount, position = { x: 0, y: 0, z: 0 }) {
    this.notchCount = notchCount;
    this.connections = [];
    this.fullRotation = 0;
    this.offsetRotation = new Fraction();
    this.lastRotation = new Fraction();
    this.position = position;
  }

  setPosition(newPosition) {
    this.position = newPosition;
  }

  connect(otherGear, angle = new Fraction()) {
    this.connections.push(otherGear);
    //---------------------------------------------------------
    const distance = (this.notchCount + otherGear.notchCount) / 4 + 1;
    const angleRadian = angle.toRadianAngle();
    const newPosition = {
      x: this.position.x + Math.cos(angleRadian) * distance,
      y: this.position.y,
      z: this.position.z + Math.sin(angleRadian) * distance,
    };
    otherGear.setPosition(newPosition);
  }

  rotateNotch(amount) {
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
