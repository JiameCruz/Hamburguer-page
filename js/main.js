document.addEventListener("DOMContentLoaded", () => {
    // 1. Instanciar Lenis para Smooth Scroll (Efecto profesional de desplazamiento)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de aceleración
        smooth: true,
    });

    // Actualizar Lenis en cada frame y sincronizar con GSAP ScrollTrigger
    function raf(time) {
        lenis.raf(time);
        ScrollTrigger.update();
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);

    // 2. Animación del Navbar al hacer scroll
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. Animación de Entrada: Hero Section (Timeline)
    const heroTl = gsap.timeline();
    
    // Preparar elementos que antes usaban la clase .fade-in con transform en CSS
    heroTl.to(".hero-content h1", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
    })
    .to(".hero-content p", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8")
    .to(".hero-content .btn", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8");

    // 4. Animaciones en Scroll: Elementos generales .fade-in (secciones y textos)
    // Excluimos los del hero para que no se superpongan con el timeline inicial
    const fadeElements = gsap.utils.toArray('.section .fade-in, .footer .fade-in');
    
    fadeElements.forEach((element) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%", // Inicia cuando el tope del elemento llega al 85% de la ventana
                toggleActions: "play none none reverse" // Se reproduce al entrar, reversa al salir
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // 5. Revealer de Imagen con efecto Parallax sutil (La Experiencia)
    gsap.fromTo(".image-wrapper img", 
        { scale: 1.2, y: -20 },
        {
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".image-wrapper",
                start: "top bottom", // Empieza cuando el top de la imagen toca el bottom del viewport
                end: "bottom top",   // Termina cuando el bottom de la imagen toca el top del viewport
                scrub: 1.5           // Animación vinculada al avance del scroll (más suave)
            }
        }
    );

    // 6. Aparición Escalonada (Stagger) de los items del Menú y Efectos magnéticos
    const menuItems = gsap.utils.toArray('.menu-item');
    
    if(menuItems.length > 0) {
        gsap.to(menuItems, {
            scrollTrigger: {
                trigger: ".carousel-container",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15, // Retardo entre cada item
            ease: "power3.out"
        });
        
        // Efecto Hover 3D ligero para las tarjetas del menú para un toque extra
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, { y: -8, scale: 1.02, duration: 0.4, ease: "power2.out" });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(item, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
            });
        });
    }

    // 7. Botones magnéticos (Hover interactivo extra premium)
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)" // Regreso elástico
            });
        });
    });
});
