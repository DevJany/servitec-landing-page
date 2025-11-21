// Configuração do WhatsApp
const WHATSAPP_NUMBER = '5583991216618';

// ========================================
// WhatsApp Integration
// ========================================

function abrirWhatsApp(mensagem) {
    const mensagemEncoded = encodeURIComponent(mensagem);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemEncoded}`;
    window.open(url, '_blank');
}

// ========================================
// Modo Claro/Escuro
// ========================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Verificar tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
    }

    // Toggle do tema
    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================

function initNavbarScroll() {
    const navbar = document.getElementById('mainNav');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// Smooth Scroll para Links Âncora
// ========================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Fechar menu mobile após clicar
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// ========================================
// Botão Voltar ao Topo
// ========================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Formulário de Contato
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Mostrar mensagem de envio
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
            submitBtn.disabled = true;

            // O FormSubmit irá processar o envio
            // Após o envio, o usuário será redirecionado
        });
    }
}

// ========================================
// Animação de Entrada dos Elementos
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar cards de serviços
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => observer.observe(card));

    // Observar itens do portfólio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => observer.observe(item));
}

// ========================================
// Ano Atual no Rodapé
// ========================================

function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ========================================
// Fechar Menu Mobile ao Clicar Fora
// ========================================

function initMobileMenuClose() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    document.addEventListener('click', function (event) {
        const isClickInsideNav = navbarCollapse.contains(event.target) ||
            navbarToggler.contains(event.target);

        if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
}

// ========================================
// Validação de Formulário Customizada
// ========================================

function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

// ========================================
// Inicialização
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todas as funcionalidades
    initTheme();
    initNavbarScroll();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initScrollAnimations();
    updateCurrentYear();
    initMobileMenuClose();
    initFormValidation();

    console.log('Servitec - Site carregado com sucesso!');
});