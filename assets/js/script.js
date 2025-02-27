if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log("Service Worker Registered!", reg))
        .catch(err => console.log("Service Worker Failed!", err));
}

let heroAnimationInterval = null;
let isMenuOpen = false;
let timeout = null;

// Create an array of image objects
  // { src: 'assets/images/gallery/kitchen3.jpg', alt: 'Image 1' },
  // { src: 'assets/images/gallery/bath3.jpg', alt: 'Bath 2' },
  // { src: 'assets/images/gallery/sit3.jpg', alt: 'Image 3' },
  // { src: 'assets/images/gallery/study3.jpg', alt: 'Study 4' },
  // { src: 'assets/images/recent-projects/recent_0_before.jpg', alt: 'Recent Project 1 Before' },
  // { src: 'assets/images/recent-projects/recent_0_after.jpg', alt: 'Recent Project 1 After' },
  // { src: 'assets/images/recent-projects/recent_1_before.jpg', alt: 'Recent Project 2 Before' },
  // { src: 'assets/images/recent-projects/recent_1_after.jpg', alt: 'Recent Project 2 After' },
const images = [
  { src: 'assets/images/recent-projects/recent3.jpg', alt: 'Recent Project 3' },
  { src: 'assets/images/recent-projects/recent4.jpg', alt: 'Recent Project 4' },
  { src: 'assets/images/testimonials/testimonial_img1.png', alt: 'Shameema Arendse' },
  { src: 'assets/images/testimonials/testimonialJpsSimons.jpg', alt: 'Jps Simons' },
];

// Function to load images dynamically
function loadImages() {
  const imageContainer = document.getElementById('image-container');
  if (imageContainer) {
    images.forEach((image) => {
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      imageContainer.appendChild(img);
    });
  } else {
    console.error('Image container element not found');
  }
}

let loadingElement;

timeout = setTimeout(() => {
    if (!loadingElement) {
        loadingElement = document.getElementById("loading");
    }
    if (loadingElement) {
        loadingElement.style.transition = "opacity 0.5s";
        loadingElement.style.opacity = "0";
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 500);
    } else {
        alert('Call the developer');
    }
}, 5000); // 5 seconds timeout

document.addEventListener('DOMContentLoaded', function () {
    
    initSectionAnimations();
    initHeroAnimation();
    initScrollEffects();
    initIntoViewAnim();

    observeElements('caption');
    
    loadImages();
});

const observeElements = (className) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.5,
  });

  const elements = document.querySelectorAll(`.${className}`);
  elements.forEach((element) => {
    observer.observe(element);
  });
};


function toggleMenu() {
    const sideMenu = document.querySelector(".side-menu");
    if (sideMenu) {
        sideMenu.style.width = isMenuOpen ? "0" : "250px";
        isMenuOpen = !isMenuOpen;
    }
}

function initSectionAnimations() {
    const sectionTitles = document.querySelectorAll('.section-title');
    if (!sectionTitles.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle('anim-title', entry.isIntersecting);
        });
    }, { threshold: 0.1 });

    sectionTitles.forEach(section => observer.observe(section));
}

function initHeroAnimation() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const observerHero = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroAnimationInterval) {
                animateHero();
            } else if (!entry.isIntersecting && heroAnimationInterval) {
                clearInterval(heroAnimationInterval);
                heroAnimationInterval = null;
            }
        });
    }, { threshold: 0.1 });

    observerHero.observe(heroSection);
}

function animateHero() {
    const selector = '.gallery-image-hero';
    const images = document.querySelectorAll(selector);
    if (!images.length) return;

    const newImageSources = [
        'assets/images/gallery/kitchen',
        'assets/images/gallery/bath',
        'assets/images/gallery/sit',
        'assets/images/gallery/study'
    ];

    let count = 1;

    heroAnimationInterval = setInterval(() => {
        count = (count % 4) + 1; // Loop between 1 and 4

        images.forEach((img, i) => {
            setTimeout(() => {
                img.style.opacity = 0;
            }, i * 200);
        });

        setTimeout(() => {
            images.forEach((img, i) => {
                setTimeout(() => {
                    img.src = `${newImageSources[i]}${count}.jpg`;
                    img.style.opacity = 1;
                }, i * 200);
            });
        }, 1000);

    }, 7000);
}

function initIntoViewAnim() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("fadeInUp", entry.isIntersecting);
        });
    });

    document.querySelectorAll(".section-title").forEach(content => observer.observe(content));
}

function initScrollEffects() {
    let lastScrollTop = 0;
    const topNav = document.querySelector('.top_nav');
    const navBar = document.getElementById("navBar");

    if (!topNav || !navBar) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      if (window.innerWidth >= 768) {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
        if (currentScroll > lastScrollTop) {
          // Scrolling down
          topNav.classList.add('hidden');
          navBar.classList.add('show');
          navBar.style.transform = "translateY(0px)";
        } else if (currentScroll <= 0) {
          // At the top of the page
          topNav.classList.remove('hidden');
          navBar.classList.remove('show');
          navBar.style.transform = "translateY(40px)";
        } else {
          // Scrolling up
          navBar.classList.add('show');
        }
    
        lastScrollTop = currentScroll;
      }
    });
}

function openModal() {
    const overlay = document.getElementById('modalk-overlay');
    if (!overlay) return;

    const modal = overlay.querySelector('.modalk');
    overlay.style.display = 'flex';

    requestAnimationFrame(() => {
        overlay.classList.add('show');
        modal.classList.add('show');
    });
}

function closeModal() {
    const overlay = document.getElementById('modalk-overlay');
    if (!overlay) return;

    const modal = overlay.querySelector('.modalk');
    modal.classList.remove('show');
    overlay.classList.remove('show');

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 400);
}
