let left = document.querySelector('.left');
let img = document.querySelector('img');

let lx = left.offsetParent.offsetLeft + left.offsetWidth / 2;
let ly = left.offsetParent.offsetTop + left.offsetHeight / 2;
let ix = left.offsetParent.offsetLeft + left.offsetWidth / 2;
let iy = left.offsetParent.offsetTop + left.offsetHeight / 2;

let tlx, tly, tix, tiy;
let parallax = true;



const moveItems = e => {
   tlx = -1 * (e.x - lx) / 30;
   tly = -1 * (e.y - ly) / 30;
   tix = -1 * (e.x - ix) / 100;
   tiy = -1 * (e.y - iy) / 100;
   left.style.transform = `translate(${tlx}px,${tly}px)`;
   img.style.transform = `translate(${tix}px,${tiy}px)`;
}

const handleMousemovement = (e) => {
   if (parallax) {
      parallax = false;
      setTimeout(() => {
         parallax = true;
         console.log(e)
      }, 30);

      moveItems(e);

   }
}


const startParallax = () => {
   setTimeout(() => {
      left.classList.add('parallax')
      img.classList.add('parallax')
      document.addEventListener('mousemove', handleMousemovement);
   }, 1000)
}

startParallax()