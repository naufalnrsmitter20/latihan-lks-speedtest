// /**@type {HTMLCanvasElement} */
// const canvas = document.querySelector("canvas");
// /**@type {CanvasRenderingContext2D} */
// const ctx = canvas.getContext("2d");

// canvas.width = innerWidth;
// canvas.height = innerHeight;

// class Character {
//   constructor(x, y, image) {
//     this.x = x;
//     this.y = y;
//     this.image = new Image();
//     this.image.src = image;
//     this.speed = 3;
//     this.image.onload = () => {
//       this.isLoaded = true;
//     };
//   }
//   start() {
//     if (this.isLoaded) {
//       ctx.drawImage(this.image, this.x, this.y);
//     }
//   }
//   update() {
//     this.x += this.speed;
//     if (this.x > canvas.width - 480) {
//       this.x = 0;
//     }
//   }
// }
// const char = new Character(0, (canvas.height - 360) / 2, "./walk.gif");
// const animate = () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   char.start();
//   char.update();
//   requestAnimationFrame(animate);
// };
// animate();

// const imgContent = document.getElementById("char");

// const imgPositionX = imgContent.getBoundingClientRect();
// let xposition = imgPositionX.left;
// if (xposition >= window.innerWidth) {
//   let xposition = 0;
//   imgContent.style.transform`translatex${xposition}px`;
// }
