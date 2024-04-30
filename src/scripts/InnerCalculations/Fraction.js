class Fraction {
  constructor(numerator = 0, denominator = 1) {
    this.numerator = numerator;
    this.denominator = denominator === 0 ? 1 : denominator;
    this.simplify();
  }

  gcd(a, b) {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  simplify() {
    const divisor = this.gcd(this.numerator, this.denominator);
    this.numerator /= divisor;
    this.denominator /= divisor;
    // Make sure denominator is positive
    if (this.denominator < 0) {
      this.numerator *= -1;
      this.denominator *= -1;
    }
  }

  add(other) {
    const newNumerator =
      this.numerator * other.denominator + other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    return new Fraction(newNumerator, newDenominator);
  }

  subtract(other) {
    const newNumerator =
      this.numerator * other.denominator - other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;
    return new Fraction(newNumerator, newDenominator);
  }

  multiply(other) {
    const newNumerator = this.numerator * other.numerator;
    const newDenominator = this.denominator * other.denominator;
    return new Fraction(newNumerator, newDenominator);
  }

  divide(other) {
    const newNumerator = this.numerator * other.denominator;
    const newDenominator = this.denominator * other.numerator;
    return new Fraction(newNumerator, newDenominator);
  }

  reciprocal() {
    return new Fraction(this.denominator, this.numerator);
  }

  isEqual(other) {
    return (
      this.numerator === other.numerator &&
      this.denominator === other.denominator
    );
  }

  isGreaterThan(other) {
    return (
      this.numerator * other.denominator > other.numerator * this.denominator
    );
  }

  isLessThan(other) {
    return (
      this.numerator * other.denominator < other.numerator * this.denominator
    );
  }

  toString() {
    return `${this.numerator}/${this.denominator}`;
  }
}

const UNIT = {
  NONE: "none",
  SPEED: "speed",
  TORQUE: "torque",
  FORCE: "force",
};
