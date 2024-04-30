class Gear extends Component {
  constructor(notchCount, source, name_tag = "") {
    super(name_tag);
    this.notchCount = notchCount;
    this.source = source;
    this.rotation = Fraction(0);
    this.isGear = true;
    this.powByTorque = false;
    this.powBySpeed = false;
  }
  get Power() {
    return this.source.Power;
  }
}

class BasicGear extends Gear {
  constructor(notchCount, source, name_tag = "") {
    super(notchCount, source, name_tag);
    if (this.source.isConstSpeedSource || this.source.powBySpeed) {
      this.powBySpeed = true;
    } else if (this.source.isConstTorqueSource || this.source.powByTorque) {
      this.powByTorque = true;
    }
  }
  get Power() {
    let srcPow = this.source.Power;
    if (this.source.isConstSpeedSource) {
      return {
        amount: srcPow.multiply(new Fraction(this.notchCount)),
        unit: srcPow.unit,
      };
    } else if (this.source.isConstTorqueSource) {
      return srcPow; //this type of gear doesn't have resistance or friction.
    } else if (this.source.isGear) {
      if (this.source.powBySpeed) {
        return {
          amount: srcPow.multiply(
            new Fraction(this.notchCount, this.source.notchCount)
          ),
          unit: srcPow.unit,
        };
      } else {
        return srcPow;
      }
    } else {
      return srcPow;
    }
  }
  Update(tickCount = 1) {}
}
