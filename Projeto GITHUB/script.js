
/* T11 */
document.addEventListener("DOMContentLoaded", () => {

    /* T9 - Lógica de Filtragem do Cardápio */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuCards = document.querySelectorAll(".menu-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove a classe ativa de todos os botões e ativa o clicado
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.getAttribute("data-category");

            // Exibe ou oculta os cards com base na categoria
            menuCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                
                if (category === "todos" || cardCategory === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    /* Efeitos de Fluidez e Parallax */

    // 1. Parallax Otimizado na Hero
    const heroContent = document.querySelector(".hero-content");
    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.scrollY;
                if (heroContent && scrollPosition < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                    heroContent.style.opacity = `${1 - scrollPosition / 500}`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // 2. Scroll Suave para o Menu
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 3. Animação de Entrada dos Elementos ao Rolar
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    const elementsToReveal = document.querySelectorAll(".menu-card, .section h2, .contact-form");
    elementsToReveal.forEach(el => {
        el.classList.add("reveal-init");
        revealObserver.observe(el);
    });
});