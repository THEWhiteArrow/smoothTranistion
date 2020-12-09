let left, img, lx, ly, ix, iy;
let tlx, tly, tix, tiy;
let allowParallax = true;
let doParallax = true;

const parallaxSetUp = () => {
   left = document.querySelector('.left');
   img = document.querySelector('img');

   lx = left.offsetParent.offsetLeft + left.offsetWidth / 2;
   ly = left.offsetParent.offsetTop + left.offsetHeight / 2;
   ix = left.offsetParent.offsetLeft + left.offsetWidth / 2;
   iy = left.offsetParent.offsetTop + left.offsetHeight / 2;
}

const handleMousemovement = (e) => {
   if (doParallax && allowParallax && window.innerWidth >= 938) {
      doParallax = false;
      setTimeout(() => {
         doParallax = true;
         console.log(e)
      }, 50);
      moveItems(e);
   }
}

const moveItems = e => {
   tlx = -1 * (e.x - lx) / 160;
   tly = -1 * (e.y - ly) / 160;
   tix = 1 * (e.x - ix) / 410;
   tiy = 1 * (e.y - iy) / 410;
   left.style.transform = `translate(${tlx}px,${tly}px)`;
   img.style.transform = `translate(${tix}px,${tiy}px)`;
}

const resizedWindow = () => {
   if (!isMobile()) {
      allowParallax = true;
      parallaxSetUp();
      setTimeout(() => {
         document.addEventListener('mousemove', handleMousemovement);
      }, 1400)
   } else {
      allowParallax = false;
      document.removeEventListener('mousemove', handleMousemovement);
   }
}

const isMobile = () => {
   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}






const delay = (n) => {
   n = n || 2000;
   return new Promise(resolve => {
      setTimeout(resolve, n)
   })
}
const pageTransition = () => {
   const tl = gsap.timeline();

   tl.to('ul.transition li', { duration: .5, ease: 'sine', scaleY: 1, transformOrigin: 'bottom left', stagger: .2 })
   tl.to('ul.transition li', { duration: .4, ease: 'sine', scaleY: 0, transformOrigin: 'bottom left', stagger: .1, delay: .1 })
}
const contentAnimation = () => {
   const tl = gsap.timeline();

   tl.from('.left', { duration: 1.5, translateY: 65, opacity: 0, delay: .2 })
   tl.to('img', { duration: .8, ease: 'sine', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }, "-=1.1")
}













barba.init({
   sync: true,
   transitions: [{
      once(data) {
         window.addEventListener('resize', resizedWindow)
         resizedWindow();
         setTimeout(() => {
            left.classList.add('parallax');
         }, 1400)
         contentAnimation();
      },

      async leave(data) {
         pageTransition();

         allowParallax = false;

         left.classList.remove('parallax');
         await delay(1300);
      },

      enter(data) {
         contentAnimation();
      },

      async after(data) {
         parallaxSetUp();
         await delay(1400);
         allowParallax = true;
         left.classList.add('parallax');
      }


   }]
});

