class Source extends Component {
  constructor(name_tag = "") {
    super(name_tag);
    this.rpm = null;
    this.torque = null;
    this.isConstSpeedSource = false;
    this.isConstTorqueSource = false;
    this.max_speed = null;
    this.max_torque = null;
  }
  get Power() {
    return { amount: Fraction(0), unit: UNIT.NONE };
  }
}

class ConstantSpeedSource extends Source {
  constructor(rpm, max_torque = new Fraction(50), name_tag = "") {
    super(name_tag);
    this.rpm = rpm;
    this.max_torque = max_torque;
    this.isConstSpeedSource = true;
  }
  get Power() {
    return { amount: this.rpm, unit: UNIT.SPEED };
  }
}

class ConstantTorqueSource extends Source {
  constructor(torque, max_speed = new Fraction(60), name_tag = "") {
    super(name_tag);
    this.torque = torque;
    this.max_speed = max_speed;
    this.isConstTorqueSource = true;
  }
  get Power() {
    return { amount: this.torque, unit: UNIT.TORQUE };
  }
}
