import { Fraction } from "./Fraction.js";

class Source {
  constructor(pow) {
    this.power = pow;
  }
}

export class ConstantSpeedSource extends Source {
  constructor(pow) {
    super(pow);
  }
}
