const header = document.querySelector("header");

/* -------------------> Sticky Navbar <------------------- */
function stickyNavbar() {
    if (header) {
        header.classList.toggle('scrolled', window.pageYOffset > 0);
    }
}

// Optimización del evento de scroll con debounce
const debounce = (func, wait) => {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(), wait);
    };
};

stickyNavbar();

window.addEventListener('scroll', debounce(stickyNavbar, 50));
