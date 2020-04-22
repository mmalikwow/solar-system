class Vector2 {
  constructor(tx, ty) {
    this.set(tx, ty);
  }

  set(x, y) {
    if ((x && typeof x != "number") || (y && typeof y != "number"))
      throw new Error(
        `${this}.set(x, y) expects two numbers. Note : This function gets call in the constructor`
      );

    this.x = x || 0;
    this.y = y || 0;
  }

  add(v) {
    if (!(v instanceof Vector2))
      throw new Error(`${this}.add(v) expects a Vector2`);

    this.x += v.x;
    this.y += v.y;
  }

  sub(v) {
    if (!(v instanceof Vector2))
      throw new Error(`${this}.sub(v) expects a Vector2`);

    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n) {
    if (typeof n != "number")
      throw new Error(`${this}.mult(n) expects a number`);

    this.x *= n;
    this.y *= n;
  }

  div(n) {
    if (typeof n != "number")
      throw new Error(`${this}.div(n) expects a number`);

    this.x /= n;
    this.y /= n;
  }

  dot(v) {
    if (!(v instanceof Vector2))
      throw new Error(`${this}.dot(v) expects a Vector2`);

    return this.x * v.x + this.y * v.y; //v . u // Dot Product // Produit Scalaire
  }

  equals(v) {
    if (!(v instanceof Vector2))
      throw new Error(`${this}.equals(v) expects a Vector2`);

    return (
      Math.abs(this.x - v.x) < 0.000001 && Math.abs(this.y - v.y) < 0.000001 //allows a small error
    );
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2); //sqrt(x^2+y^2)
  }

  magSq() {
    return this.x ** 2 + this.y ** 2; //x^2+y^2
  }

  setMag(n) {
    if (typeof n != "number")
      throw new Error(`${this}.setMag(n) expects a number`);

    let m = this.mag();
    this.x = (this.x * n) / m; //x = px * newMag / mag
    this.y = (this.y * n) / m; //y = py * newMag / mag

    return this;
  }

  normalize() {
    this.setMag(1); //Make it a unit Vector
    return this;
  }

  dist(v) {
    if (!(v instanceof Vector2))
      throw new Error(`${this}.dist(v) expects a Vector2`);

    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2); //sqrt((v.x - u.x)^2 + (v.x - u.x)^2)
  }

  distSq(v) {
    if (!(v instanceof Vector2))
      throw new ERror(`${this}.distSq(v) expects a Vector2`);

    return (this.x - v.x) ** 2 + (this.y - v.y); //(v.x - u.x)^2 + (v.x - u.x)^2
  }

  angleVec(v) {
    if (!(v instanceof Vector2))
      throw new Error(`${this}.angleVec(v) expects a Vector2`);

    return Math.acos(this.dot(v) / (this.mag() * v.mag())); //cos a = (v . u)||v||||u||
  }

  heading() {
    let angle = this.angleVec(new Vector2(0, -1)); //Gets the angle betweem a fixed Vector <0, -1>

    return this.x < 0 ? 2 * Math.PI - angle : angle;
  }

  setAngle(a) {
    if (typeof a != "number")
      throw new Error(`${this}.setAngle(a) expects a number`);
    //J'ai juste utuliser la formule dans AngleVec pis je l'ai modifié un peu

    const twoPi = 2 * Math.PI;
    a -= twoPi * Math.floor(a / twoPi);

    let m = this.mag();
    this.y = Math.cos(a) * -m;
    this.x = Math.sqrt(m ** 2 - this.y ** 2);
    this.x = a > Math.PI ? -this.x : this.x;
  }

  rotate(a) {
    if (typeof a != "number")
      throw new Error(`${this}.rotate(n) expects a number`);

    this.setAngle(this.heading() + a);
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  array() {
    return [this.x, this.y];
  }

  toString() {
    return `Vector2 : [x:${this.x}, y:${this.y}]`;
  }

  static add(v0, v1) {
    if (!(v0 instanceof Vector2) || !(v1 instanceof Vector2))
      throw new Error(`Vector2.add(v0, v1) expects two Vector2`);

    return new Vector2(v0.x + v1.x, v0.y + v1.y);
  }

  static sub(v0, v1) {
    if (!(v0 instanceof Vector2) || !(v1 instanceof Vector2))
      throw new Error(`Vector2.sub(v0, v1) expects two Vector2`);

    return new Vector2(v0.x - v1.x, v0.y - v1.y);
  }

  static mult(v, n) {
    if (!(v instanceof Vector2) || typeof n != "number")
      throw new Error(`Vector2.mult(v, n) expects a Vector2 and a number`);

    v.x * n;
    v.y * n;
  }

  static div(v, n) {
    if (!(v instanceof Vector2) || typeof n != "number")
      throw new Error(`Vector2.mult(v, n) expects a Vector2 and a number`);

    v.x / n;
    v.y / n;
  }

  static normalize(v) {
    if (!(v instanceof Vector2))
      throw new Error(`Vector2.normalize(v) expects a Vector2`);

    v.setMag(1);
  }

  static fromAngle(a) {
    let v = new Vector2(0, -1); //makes a new unit Vector
    v.setAngle(a); //sets its angle
    return v;
  }

  static random() {
    let v = Vector2.fromAngle(Math.random() * 2 * Math.PI); //Takes a random Angle
    v.x = Math.random() < 0.5 ? -v.x : v.x; //1/2 makes it negative
    v.y = Math.random() < 0.5 ? -v.y : v.y; //1/2 makes it negative
    return v;
  }
}
