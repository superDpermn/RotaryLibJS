import { Fraction } from "./Fraction.js";

export class Belt {
  constructor(source, dest) {
    this.isBelt = true;
    this.g1 = source;
    if (this.g1.isGear) {
      this.g1.connect(this);
    }
    this.g2 = dest;
    this.length = this.g1.notchCount + this.g2.notchCount;
    this.offsetRotation = new Fraction();
    this.lastRotation = new Fraction();
    this.fullRotatation = 0;
    this._sum = 0;
    this.resetFlag = false;
  }

  rotateNotch(amount) {
    if (!amount.isEqual(new Fraction(0))) {
      this.offsetRotation = this.offsetRotation.add(amount);
      this.lastRotation = amount;
      this.fullRotatation = this.offsetRotation.normalize();

      if (this.fullRotatation > 0) {
        this._sum += this.fullRotatation;
        if (this._sum >= 1 && !this.resetFlag) {
          this._sum += this._sum > 0 ? -1 : 1;
          this.resetFlag = true;
        }
      }

      if (this.g2.isGear) {
        this.g2.rotateNotch(amount);
      }
    }
  }
}
