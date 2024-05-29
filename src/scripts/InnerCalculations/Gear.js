import { Fraction } from "./Fraction.js";

function getAngleFr(direction) {
  switch (direction) {
    case "LEFT":
      return new Fraction(1, 2);
    case "RIGHT":
      return new Fraction();
    case "UP":
      return new Fraction(3, 4);
    case "DOWN":
      return new Fraction(1, 4);
    default:
      return new Fraction();
  }
}

export class Gear {
  constructor(notchCount, position = { x: 0, y: 0, z: 0 }) {
    this.notchCount = notchCount;
    this.connections = [];
    this.fullRotation = 0;
    this.offsetRotation = new Fraction();
    this.lastRotation = new Fraction();
    this.position = position;
    this.angle = new Fraction();
    this.isGear = true;
    this.isShaftConnected = false;
    this.occuStatus = [true, true, true, true];
  }

  setPosition(newPosition) {
    this.position = newPosition;
  }

  connect(otherGear, angle = "RIGHT") {
    this.connections.push(otherGear);
    this.angle = getAngleFr(angle);
    //---------------------------------------------------------
    const distance = (this.notchCount + otherGear.notchCount) / 4 + 1;
    const angleRadian = this.angle.toRadianAngle();
    const newPosition = {
      x: this.position.x + Math.cos(angleRadian) * distance,
      y: this.position.y,
      z: this.position.z + Math.sin(angleRadian) * distance,
    };
    if (otherGear.isGear) {
      otherGear.setPosition(newPosition);
      otherGear.align(this);
    }
    const arrayIndex =
      angle == "LEFT"
        ? 0
        : angle == "TOP"
        ? 1
        : angle == "RIGHT"
        ? 2
        : angle == "DOWN"
        ? 3
        : 4;
    this.occuStatus[arrayIndex] = false;
  }

  align(parent) {
    this.offsetRotation = new Fraction(parent.notchCount, this.notchCount)
      .multiply(parent.offsetRotation.subtract(this.angle))
      .add(new Fraction(1, 2 * this.notchCount));
  }

  rotateNotch(amount) {
    if (!amount.isEqual(new Fraction(0))) {
      const addAmount = amount.divide(new Fraction(this.notchCount));
      this.offsetRotation = this.offsetRotation.add(addAmount);
      this.lastRotation = addAmount;
      this.fullRotation = this.offsetRotation.normalize();
      this.connections.forEach((g) => {
        if (g.isGear) {
          g.rotateNotch(amount.negate());
        } else if (g.isBelt) {
          g.rotateNotch(amount);
        } else if (g.isShaft) {
          g.rotateAngle(addAmount);
        }
      });
    }
  }

  rotateAngle(angleFraction) {
    this.offsetRotation.simplify();
    this.offsetRotation = this.offsetRotation.add(angleFraction);
    this.lastRotation = angleFraction;
    this.fullRotation = this.offsetRotation.normalize();
    const NC = angleFraction.multiply(new Fraction(-this.notchCount));
    this.connections.forEach((g) => {
      if (g.isGear) {
        g.rotateNotch(NC);
      } else if (g.isBelt) {
        g.rotateNotch(NC.negate());
      } else if (g.isShaft) {
        g.rotateAngle(angleFraction);
      }
    });
  }
}
