/**
 * Travel Dost - Navbar & Scroll Spy Controller (navbarToggle.js)
 * Manages Mobile Drawer, Backdrop, Header Shadow, and Active Nav Scroll Spy
 */
document.addEventListener('DOMContentLoaded', () => {
  const navMenuBtn = document.getElementById('navMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const headerWrapper = document.querySelector('.header-wrapper');
  const navLinks = document.querySelectorAll('.nav__link');

  // Toggle Mobile Drawer
  const toggleMenu = () => {
    if (!navMenu || !navMenuBtn) return;
    const isOpen = navMenu.classList.toggle('is-open');
    navMenuBtn.classList.toggle('is-active');
    if (navBackdrop) {
      navBackdrop.classList.toggle('active', isOpen);
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    if (!navMenu || !navMenuBtn) return;
    navMenu.classList.remove('is-open');
    navMenuBtn.classList.remove('is-active');
    if (navBackdrop) {
      navBackdrop.classList.remove('active');
    }
    document.body.style.overflow = '';
  };

  if (navMenuBtn) {
    navMenuBtn.addEventListener('click', toggleMenu);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMenu);
  }

  // Close drawer on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        closeMenu();
      }
    });
  });

  // Header shadow on scroll & Scroll Spy for Sections
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Sticky header shadow
    if (headerWrapper) {
      if (scrollY > 20) {
        headerWrapper.classList.add('header-scrolled');
      } else {
        headerWrapper.classList.remove('header-scrolled');
      }
    }

    // Scroll spy for navigation items
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  });
});
