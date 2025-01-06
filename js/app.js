const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span")

window.addEventListener('scroll', () => {
    if(!skillsPlayed) skillsCounter();
    if(!mlPlayed)mlCounter()
})

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

/* -------------------> Reveal Animation <------------------- */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600})
sr.reveal(".showcase-image", {origin: "top", delay: 700})

/* -------------------> Skills Progress Bar Animation <------------------- */
function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    
    if (window.innerHeight >= topPosition + el.offsetHeight) return true
    return false
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;
    
    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12)
    }
}

let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_skill)) return;

    let skillsPlayed = true;

    sk_counters.forEach((counter, i) =>{
        let target = counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue)
    
        setTimeout(() => {
            updateCount(counter, target)
        }, 400)
    })

    progress_bars.forEach( p => (p.style.animation = "progress 2s ease-in-out forwards") )
}

/* -------------------> Services Counter Animation <------------------- */
let mlPlayed = false;

function mlCounter() {
    if (!hasReached(ml_section)) return;

    let mlPlayed = true;

    ml_counters.forEach(ctr =>{
        let target = +ctr.dataset.target;

        setTimeout(() =>{
            updateCount(ctr, target)
        }, 400)
    })
}