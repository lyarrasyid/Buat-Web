document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. NAV-BAR AUTO-HIDE & SCROLL BACKGROUND
       ========================================================================== */
    const navbar = document.getElementById('mainNavbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Auto-hide saat scroll ke bawah, muncul saat scroll ke atas
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }

        // Tambah efek bayangan jika di-scroll > 50px
        if (currentScrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }

        lastScrollY = currentScrollY;
    });

    /* ==========================================================================
       2. UNIFIED MOBILE MENU & OVERLAY TOGGLE
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuIcon = document.getElementById('mobileMenuIcon');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');
    const navItemLinks = document.querySelectorAll('.nav-item-link');
    
    // Tambahan variabel untuk tombol close di dalam menu
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    const toggleMenu = () => {
        const isOpen = navLinks.classList.contains('show');

        // Toggle kelas menu & overlay
        navLinks.classList.toggle('show');
        navOverlay.classList.toggle('show');

        // Animasi rotasi ikon hamburger ke X (Close)
        mobileMenuIcon.classList.add('rotate-180', 'scale-0');
        setTimeout(() => {
            if (!isOpen) {
                mobileMenuIcon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                mobileMenuIcon.classList.replace('fa-xmark', 'fa-bars');
            }
            mobileMenuIcon.classList.remove('scale-0', 'rotate-180');
        }, 150);
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu); 
    
    // Event listener untuk tombol close yang baru
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', toggleMenu);
    }

    // Auto-close menu saat salah satu link diklik (khusus mobile)
    navItemLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navLinks.classList.contains('show')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       3. DARK / LIGHT MODE TOGGLE
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);

        if (newTheme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    /* ==========================================================================
       4. SCROLLSPY (ACTIVE MENU ON SCROLL)
       ========================================================================== */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItemLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       5. SWIPER SLIDER INITIALIZATION
       ========================================================================== */
    // Hero Swiper
    new Swiper('.heroSwiper', {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });

    // Testimonial Swiper
    new Swiper('.testimonialSwiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: { delay: 4000 },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    /* ==========================================================================
       6. PHOTOSWIPE LIGHTBOX INITIALIZATION
       ========================================================================== */
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#portfolio-gallery',
        children: 'a',
        pswpModule: PhotoSwipe
    });
    lightbox.init();

    /* ==========================================================================
       7. SCROLL TO TOP BUTTON
       ========================================================================== */
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});