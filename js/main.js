document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"], .back-to-top[href^="#"]');
  const yearEl = document.getElementById("currentYear");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const handleHeaderShadow = () => {
    if (window.scrollY > 12) {
      header?.classList.add("is-scrolled");
    } else {
      header?.classList.remove("is-scrolled");
    }
  };

  handleHeaderShadow();
  window.addEventListener("scroll", handleHeaderShadow);

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });

      if (siteNav?.classList.contains("is-open")) {
        siteNav.classList.remove("is-open");
        menuToggle?.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!siteNav || !menuToggle) return;

    const clickedInsideNav = siteNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle && siteNav.classList.contains("is-open")) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});
