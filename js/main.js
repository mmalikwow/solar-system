const sprites = {
  earth: new Image(),
  moon: new Image(),
  sun: new Image()
};
function preload() {
  sprites.earth.src = "../assets/Astres/earth.png";
  sprites.moon.src = "../assets/Astres/moon.png";
  sprites.sun.src = "../assets/Astres/sun.png";
}

let cv;
function init() {
  cv = new Vector2(canvas.width / 2, canvas.height / 2);
  mv = new Vector2();
}

let earthOrbitAngle = 0,
  moonOrbitAngle = 0;
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "white";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.save();

  ctx.translate(cv.x, cv.y);

  //sun
  ctx.drawImage(sprites.sun, -50, -50, 100, 100);

  //Earth Orbit
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.arc(0, 0, 200, 0, 2 * Math.PI);
  ctx.stroke();

  //Earth
  let Ev = Vector2.fromAngle(earthOrbitAngle);
  Ev.setMag(200);

  ctx.drawImage(sprites.earth, Ev.x - 25, Ev.y - 25, 50, 50);

  //Moon Orbit
  ctx.translate(Ev.x, Ev.y);
  ctx.beginPath();
  ctx.arc(0, 0, 50, 0, 2 * Math.PI);
  ctx.stroke();

  //Moon
  let Mv = Vector2.fromAngle(moonOrbitAngle);
  Mv.setMag(50);

  ctx.drawImage(sprites.moon, Mv.x - 17.5, Mv.y - 12.5, 35, 25);

  ctx.restore();

  let twoPi = 2 * Math.PI;
  let Einc = Math.PI / 200;
  let Minc = Math.PI / 100;
  earthOrbitAngle = earthOrbitAngle > twoPi ? 0 : earthOrbitAngle + Einc;
  moonOrbitAngle = moonOrbitAngle > twoPi ? 0 : moonOrbitAngle + Minc;
}

window.onload = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  preload();
  init();
  setInterval(loop, 1000 / 60);
};
