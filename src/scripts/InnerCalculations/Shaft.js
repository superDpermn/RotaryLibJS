import { Fraction } from "./Fraction.js";

export class Shaft {
  constructor(source, capacity = 1, direction = "OVER") {
    this.isShaft = true;
    this.parentComponent = source;
    if (source.isGear) {
      let temp =
        direction == "OVER"
          ? capacity * 2
          : direction == "UNDER"
          ? capacity * -2
          : 0;
      let _position = this.parentComponent.position;
      this.position = {
        x: _position.x,
        y: _position.y + temp,
        z: _position.z,
      };
    } else {
      this.position = { x: 0, y: 0, z: 0 };
    }
    this.dir = direction;
    this.capacity = capacity > 1 ? Math.floor(capacity) : 1;
    this.connections = [];
    this.offsetRotation = this.parentComponent.offsetRotation || new Fraction();
    this.lastRotation = new Fraction();
    this.fullRotation = new Fraction();
  }

  connect(g) {
    if (this.connections.length >= this.capacity) {
      return false;
    }
    if (g.isGear && !g.isShaftConnected) {
      this.connections.push(g);
      if (this.dir == "OVER") {
        g.setPosition({
          x: this.position.x,
          y: this.parentComponent.position.y + this.connections.length * 2,
          z: this.position.z,
        });
      } else if (this.dir == "UNDER") {
        g.setPosition({
          x: this.position.x,
          y: this.parentComponent.position.y - this.connections.length * 2,
          z: this.position.z,
        });
      }

      g.isShaftConnected = true;
      return true;
    } else {
      return false;
    }
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
