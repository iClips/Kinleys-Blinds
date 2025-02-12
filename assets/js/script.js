let heroAnimationInterval = null;
let isMenuOpen = false;

document.addEventListener('DOMContentLoaded', function () {
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
        const timeout = setTimeout(() => {
            console.warn('Page load timeout reached.');
            loadingElement.style.transition = "opacity 0.5s";
            loadingElement.style.opacity = "0";
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 500);
        }, 10000); // 10 seconds timeout

        window.addEventListener("load", () => {
            console.log('Page loaded successfully');
            clearTimeout(timeout); // Cancel the timeout if the page loads in time
            loadingElement.style.transition = "opacity 0.5s";
            loadingElement.style.opacity = "0";
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 500);
        });
    } else {
        console.log('no loading elem');
    }

    initSectionAnimations();
    initHeroAnimation();
    initScrollEffects();
    initIntoViewAnim();
});

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

    window.addEventListener('scroll', () => {
        if (window.innerWidth >= 768) {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop) {
                topNav.classList.add('hidden');
                navBar.classList.add('show');
                navBar.style.top = "0px";
            } else if (currentScroll <= 0) {
                topNav.classList.remove('hidden');
                navBar.classList.remove('show');
            } else {
                navBar.classList.add('show');
            }

            lastScrollTop = Math.max(0, currentScroll);
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
