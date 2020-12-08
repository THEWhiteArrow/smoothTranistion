let left, img, lx, ly, ix, iy;
let tlx, tly, tix, tiy;
let parallax;

const parallaxSetUp = () => {

   left = document.querySelector('.left');
   img = document.querySelector('img');

   lx = left.offsetParent.offsetLeft + left.offsetWidth / 2;
   ly = left.offsetParent.offsetTop + left.offsetHeight / 2;
   ix = left.offsetParent.offsetLeft + left.offsetWidth / 2;
   iy = left.offsetParent.offsetTop + left.offsetHeight / 2;

   parallax = true;
}



const moveItems = e => {
   tlx = -1 * (e.x - lx) / 100;
   tly = -1 * (e.y - ly) / 100;
   tix = 1 * (e.x - ix) / 300;
   tiy = 1 * (e.y - iy) / 300;
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
      left.classList.add('parallax');
      document.addEventListener('mousemove', handleMousemovement);
   }, 1400)
}







function delay(n) {
   n = n || 2000;
   return new Promise(resolve => {
      setTimeout(resolve, n)
   })
}

function pageTransition() {
   const tl = gsap.timeline();

   tl.to('ul.transition li', { duration: .45, ease: 'sine', scaleY: 1, transformOrigin: 'bottom left', stagger: .2 })
   tl.to('ul.transition li', { duration: .4, ease: 'sine', scaleY: 0, transformOrigin: 'bottom left', stagger: .1, delay: .1 })
}

function contentAnimation() {
   const tl = gsap.timeline();

   tl.from('.left', { duration: 1.5, translateY: 75, opacity: 0 })
   tl.to('img', { duration: .8, ease: 'sine', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }, "-=1")
}




function isMobile() {
   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (!isMobile()) {
   //place script you don't want to run on mobile here

}



barba.init({
   sync: true,
   transitions: [{
      async once(data) {
         // document.addEventListener('resize', onResize)
         parallaxSetUp();
         startParallax();
         await contentAnimation();
      },

      async leave(data) {
         const done = this.async();
         await pageTransition();
         await delay(1400);
         done();
      },

      async enter(data) {
         await contentAnimation();
      },

      async after(data) {
         parallaxSetUp();
         left.classList.add('parallax');
      }


   }]
});

