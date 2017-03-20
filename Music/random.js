function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var i;

for (i=1; i<100; i++) {
  console.log(rnd(100000,999999));
}