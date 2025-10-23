document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Counter animation for stats section
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('impact');
    let countersActivated = false;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const start = 0;
        const duration = 2000; // 2 seconds
        let startTime = null;

        const updateCount = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;
            const value = Math.min(progress, 1) * target;
            counter.textContent = Math.floor(value);
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target; // Ensure final value is exact
            }
        };
        requestAnimationFrame(updateCount);
    };

    const handleScroll = () => {
        const sectionTop = statsSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 150; // Trigger when section is 150px from bottom of viewport

        if (sectionTop < triggerPoint && !countersActivated) {
            counters.forEach(animateCounter);
            countersActivated = true;
            window.removeEventListener('scroll', handleScroll); // Run once
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load in case section is already in view
});
