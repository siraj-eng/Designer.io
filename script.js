function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll with proper settings
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        multiplier: 0.8, // Makes scrolling slightly slower for better feel
        smartphone: {
            smooth: true,
            breakpoint: 768 // Matches common tablet breakpoint
        },
        tablet: {
            smooth: true
        },
        getDirection: true,
        offset: ['-15%', 0] // Adjusts scroll position to account for fixed header
    });

     // Sync ScrollTrigger with Locomotive Scroll
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { 
                top: 0, 
                left: 0, 
                width: window.innerWidth, 
                height: window.innerHeight 
            };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

     // Refresh ScrollTrigger and Locomotive Scroll
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

     // Custom cursor effect
    const cursor = document.querySelector(".cursor");
    const links = document.querySelectorAll("a, button, .portfolio-item");

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            cursor.style.transform = "scale(2)";
            cursor.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        });
        
        link.addEventListener("mouseleave", () => {
            cursor.style.transform = "scale(1)";
            cursor.style.backgroundColor = "var(--primary-color)";
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector("#nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
    
    // Handle navigation link clicks with proper offset
    document.querySelectorAll('#nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate proper offset based on viewport height
                const offset = window.innerHeight * 0.15; // 15% of viewport height
                
                locoScroll.scrollTo(targetElement, {
                    offset: -offset,
                    duration: 1.5,
                    easing: [0.25, 0.0, 0.35, 1.0],
                    disableLerp: true // For more precise positioning
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector("#nav-part2");
                navMenu.classList.remove("active");
            }
        });
    })

    // Page animations
    gsap.from("#nav", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".hero-content h1", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
    });

    gsap.from(".hero-content h2", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: "power3.out"
    });

    gsap.from(".hero-content p", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: "power3.out"
    });

    gsap.from(".hero-content .cta-button", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.1,
        ease: "power3.out"
    });

    // Portfolio item animations
    gsap.utils.toArray(".portfolio-item").forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                scroller: ".main",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    // Studio section animation
    gsap.from(".studio-left h2", {
        scrollTrigger: {
            trigger: ".studio-left",
            scroller: ".main",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".studio-left p", {
        scrollTrigger: {
            trigger: ".studio-left",
            scroller: ".main",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });

    gsap.from(".stat-item", {
        scrollTrigger: {
            trigger: ".stats",
            scroller: ".main",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
    });

    gsap.from(".studio-right img", {
        scrollTrigger: {
            trigger: ".studio-right",
            scroller: ".main",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // Contact form animation
    gsap.from(".contact-left h2", {
        scrollTrigger: {
            trigger: ".contact-left",
            scroller: ".main",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".contact-left p", {
        scrollTrigger: {
            trigger: ".contact-left",
            scroller: ".main",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
    });

    gsap.from(".contact-info p", {
        scrollTrigger: {
            trigger: ".contact-info",
            scroller: ".main",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
    });

    gsap.from(".social-links a", {
        scrollTrigger: {
            trigger: ".social-links",
            scroller: ".main",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });

    gsap.from(".contact-right form", {
        scrollTrigger: {
            trigger: ".contact-right",
            scroller: ".main",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    init();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector("#nav-part3");
    const navMenu = document.querySelector("#nav-part2");
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});

// Reinitialize on window resize
window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});

// Back-to-top button
document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.scrollTo('top', {
        duration: 1.5,
        easing: [0.25, 0.0, 0.35, 1.0]
    });
});