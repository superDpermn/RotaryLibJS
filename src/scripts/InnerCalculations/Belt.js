import { Fraction } from "./Fraction.js";

export class Belt {
  constructor(source, ...dest) {
    this.source = source;
    if (this.source.isGear) {
      this.source.connect(this);
    }
    this.connections = dest;
    this.isBelt = true;
    let temp = 0;
    for (let i = 0; i < this.connections.length; i++) {
      temp += this.connections[i].notchCount;
    }
    this.length = this.source.notchCount + temp;
    this.offsetRotation = new Fraction();
    this.lastRotation = new Fraction();
  }

  rotateNotch(amount) {
    if (!amount.isEqual(new Fraction(0))) {
      this.offsetRotation = this.offsetRotation.add(amount);
      this.lastRotation = amount;
      this.connections.forEach((g) => {
        if (g.isGear) {
          g.rotateNotch(amount);
        }
      });
    }
  }
}
