'use strict';

/* =========================================================
   CONFIGURAÇÃO CENTRAL DA DEMO
   Troque os dados abaixo ao adaptar o projeto para um cliente.
========================================================= */

const CONFIG = Object.freeze({
    whatsapp: '5500000000000', // PLACEHOLDER: DDI + DDD + número, somente dígitos.
    phoneDisplay: '(00) 00000-0000',
    phoneHref: '+5500000000000',
    instagram: '@perfil_da_empresa',
    instagramUrl: 'https://www.instagram.com/',
    address: 'Insira aqui o endereço da empresa',
    mapUrl: 'https://maps.google.com/',
    timezone: 'America/Sao_Paulo',
    hours: {
        0: [],
        1: [{ open: '08:00', close: '18:00' }],
        2: [{ open: '08:00', close: '18:00' }],
        3: [{ open: '08:00', close: '18:00' }],
        4: [{ open: '08:00', close: '18:00' }],
        5: [{ open: '08:00', close: '18:00' }],
        6: [{ open: '08:00', close: '13:00' }]
    }
});

const SERVICES = Object.freeze({
    'lavagem-detalhada': {
        name: 'Lavagem Detalhada',
        image: 'assets/images/services/lavagem-detalhada.webp',
        alt: 'Profissional realizando lavagem detalhada em um veículo',
        description: 'Limpeza técnica do exterior e do interior, com atenção aos acabamentos e às áreas que normalmente passam despercebidas.',
        benefits: ['Avaliação individual', 'Limpeza de áreas detalhadas', 'Acabamento cuidadoso', 'Proteção opcional']
    },
    'higienizacao-interna': {
        name: 'Higienização Interna',
        image: 'assets/images/services/higienizacao-interna.webp',
        alt: 'Interior automotivo durante higienização profissional',
        description: 'Limpeza aprofundada de bancos, carpetes, forrações e superfícies internas, de acordo com o material do veículo.',
        benefits: ['Limpeza de tecidos', 'Cuidados com plásticos', 'Atenção aos acabamentos', 'Avaliação do interior']
    },
    'polimento-tecnico': {
        name: 'Polimento Técnico',
        image: 'assets/images/services/polimento-tecnico.webp',
        alt: 'Pintura automotiva durante polimento técnico',
        description: 'Processo de correção e refinamento desenvolvido para recuperar brilho, profundidade e qualidade visual da pintura.',
        benefits: ['Inspeção da pintura', 'Correção compatível com o verniz', 'Refinamento do acabamento', 'Orientação de manutenção']
    },
    'vitrificacao-pintura': {
        name: 'Vitrificação de Pintura',
        image: 'assets/images/services/vitrificacao-pintura.webp',
        alt: 'Aplicação de proteção sobre pintura automotiva',
        description: 'Aplicação de uma camada de proteção para preservar o acabamento e facilitar os cuidados periódicos.',
        benefits: ['Preparação da superfície', 'Proteção da pintura', 'Brilho valorizado', 'Manutenção facilitada']
    },
    'tratamento-bancos': {
        name: 'Tratamento de Bancos',
        image: 'assets/images/services/tratamento-bancos.webp',
        alt: 'Banco automotivo recebendo tratamento',
        description: 'Limpeza e tratamento definidos conforme o revestimento e o estado de conservação dos bancos.',
        benefits: ['Avaliação do material', 'Limpeza cuidadosa', 'Acabamento uniforme', 'Proteção opcional']
    },
    'revitalizacao-plasticos': {
        name: 'Revitalização de Plásticos',
        image: 'assets/images/services/revitalizacao-plasticos.webp',
        alt: 'Acabamento plástico automotivo revitalizado',
        description: 'Tratamento para recuperar a aparência e auxiliar na proteção de componentes plásticos internos e externos.',
        benefits: ['Limpeza da superfície', 'Aparência renovada', 'Acabamento sem excesso', 'Proteção compatível']
    }
});

(() => {
    const $ = (selector, context = document) => context.querySelector(selector);
    const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const state = { lastFocused: null, toastTimer: null, galleryIndex: 0, touchStartX: 0 };

    const normalizePhone = value => String(value || '').replace(/\D/g, '');
    const whatsappUrl = message => `https://wa.me/${normalizePhone(CONFIG.whatsapp)}?text=${encodeURIComponent(message.trim())}`;

    function showFeedback(message, type = 'success', duration = 3200) {
        const region = $('[data-feedback-region]');
        const toast = $('[data-feedback-message]', region || document);
        const text = $('[data-feedback-text]', toast || document);
        if (!region || !toast || !text) return;

        window.clearTimeout(state.toastTimer);
        toast.classList.remove('is-success', 'is-error', 'is-warning');
        toast.classList.add(`is-${type}`);
        text.textContent = message;
        toast.hidden = false;

        state.toastTimer = window.setTimeout(() => {
            toast.hidden = true;
        }, duration);
    }

    function initConfiguration() {
        $$('[data-contact-whatsapp]').forEach(element => {
            element.textContent = CONFIG.phoneDisplay;
        });
        $$('[data-contact-phone]').forEach(element => {
            element.textContent = CONFIG.phoneDisplay;
        });
        $$('[data-contact-phone-link]').forEach(element => {
            element.href = `tel:${CONFIG.phoneHref}`;
        });
        $$('[data-contact-instagram]').forEach(element => {
            element.textContent = CONFIG.instagram;
        });
        $$('[data-contact-instagram-link]').forEach(element => {
            element.href = CONFIG.instagramUrl;
        });
        $$('[data-contact-address]').forEach(element => {
            element.textContent = CONFIG.address;
        });
        $$('[data-contact-map-link]').forEach(element => {
            element.href = CONFIG.mapUrl;
        });
        $$('[data-current-year]').forEach(element => {
            element.textContent = new Date().getFullYear();
        });
    }

    function initHeader() {
        const header = $('[data-header]');
        const floatingButton = $('.floating-whatsapp');
        if (!header && !floatingButton) return;

        let ticking = false;
        const update = () => {
            const scrolled = window.scrollY > 24;
            header?.classList.toggle('is-scrolled', scrolled);
            floatingButton?.classList.toggle('is-visible', window.scrollY > 420);
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(update);
        }, { passive: true });
        update();
    }

    function initMobileMenu() {
        const menu = $('[data-mobile-menu]');
        const openButton = $('[data-menu-open]');
        const closeButtons = $$('[data-menu-close]');
        if (!menu || !openButton) return;

        const panel = $('.mobile-navigation__panel', menu);
        const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

        const open = () => {
            state.lastFocused = document.activeElement;
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            openButton.setAttribute('aria-expanded', 'true');
            document.body.classList.add('menu-open');
            window.setTimeout(() => $(focusableSelector, panel || menu)?.focus(), 30);
        };

        const close = () => {
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            openButton.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            state.lastFocused?.focus?.();
        };

        openButton.addEventListener('click', open);
        closeButtons.forEach(button => button.addEventListener('click', close));
        $$('[data-menu-link]', menu).forEach(link => link.addEventListener('click', close));

        menu.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                event.preventDefault();
                close();
                return;
            }
            if (event.key !== 'Tab' || !panel) return;
            const focusable = $$(focusableSelector, panel).filter(item => item.offsetParent !== null);
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1020 && menu.classList.contains('is-open')) close();
        }, { passive: true });
    }

    function initNavigation() {
        document.addEventListener('click', event => {
            const link = event.target.closest('a[href^="#"]');
            if (!link) return;
            const id = link.getAttribute('href');
            if (!id || id === '#') return;
            const target = $(id);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
            if (history.pushState) history.pushState(null, '', id);
        });

        const sections = $$('main section[id]');
        const links = $$('[data-nav-link], [data-menu-link]');
        if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                links.forEach(link => {
                    const active = link.getAttribute('href') === `#${entry.target.id}`;
                    link.classList.toggle('is-active', active);
                    if (active) link.setAttribute('aria-current', 'page');
                    else link.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
        sections.forEach(section => observer.observe(section));
    }

    function initScrollReveal() {
        const selectors = [
            '.section-heading', '.service-card', '.comparison-card', '.package-card',
            '.product-category', '.space-gallery__item', '.differential-item',
            '.testimonial-card', '.schedule-card', '.contact-item', '.contact-form'
        ];
        const items = $$(selectors.join(','));
        items.forEach((item, index) => {
            item.classList.add('reveal');
            item.classList.add(`reveal-delay-${(index % 3) + 1}`);
        });

        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
            items.forEach(item => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
        items.forEach(item => observer.observe(item));
    }

    function initComparisons() {
        $$('[data-before-after]').forEach(component => {
            const range = $('[data-comparison-range]', component);
            if (!range) return;
            const update = () => {
                const value = Math.min(100, Math.max(0, Number(range.value)));
                component.style.setProperty('--comparison-position', `${value}%`);
                range.setAttribute('aria-valuetext', `${value}% da imagem depois visível`);
            };
            range.addEventListener('input', update, { passive: true });
            range.addEventListener('change', update);
            update();
        });

        const filterBar = $('.filter-list');
        if (!filterBar) return;
        filterBar.addEventListener('click', event => {
            const button = event.target.closest('[data-result-filter]');
            if (!button) return;
            const filter = button.dataset.resultFilter;
            $$('[data-result-filter]', filterBar).forEach(item => {
                const active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });
            $$('[data-result-item]').forEach(item => {
                const categories = (item.dataset.category || '').split(/\s+/);
                item.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
            });
        });
    }

    function openDialog(dialog, trigger) {
        if (!dialog) return;
        state.lastFocused = trigger || document.activeElement;
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
        document.body.classList.add('modal-open');
    }

    function closeDialog(dialog) {
        if (!dialog) return;
        if (typeof dialog.close === 'function' && dialog.open) dialog.close();
        else dialog.removeAttribute('open');
        document.body.classList.remove('modal-open');
        state.lastFocused?.focus?.();
    }

    function initModals() {
        $$('dialog').forEach(dialog => {
            $$('[data-modal-close], [data-lightbox-close]', dialog).forEach(button => {
                button.addEventListener('click', () => closeDialog(dialog));
            });
            dialog.addEventListener('click', event => {
                const rect = dialog.getBoundingClientRect();
                const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
                if (outside) closeDialog(dialog);
            });
            dialog.addEventListener('close', () => {
                document.body.classList.remove('modal-open');
                state.lastFocused?.focus?.();
            });
        });

        const serviceModal = $('[data-service-modal]');
        document.addEventListener('click', event => {
            const trigger = event.target.closest('[data-service-details]');
            if (!trigger || !serviceModal) return;
            const service = SERVICES[trigger.dataset.serviceId];
            if (!service) {
                showFeedback('Não foi possível carregar os detalhes deste serviço.', 'error');
                return;
            }
            const title = $('[data-service-modal-title]', serviceModal);
            const image = $('[data-service-modal-image]', serviceModal);
            const description = $('[data-service-modal-description]', serviceModal);
            const benefits = $('[data-service-modal-benefits]', serviceModal);
            const action = $('[data-service-modal-whatsapp]', serviceModal);
            if (title) title.textContent = service.name;
            if (image) { image.src = service.image; image.alt = service.alt; }
            if (description) description.textContent = service.description;
            if (benefits) {
                benefits.replaceChildren(...service.benefits.map(text => {
                    const li = document.createElement('li');
                    li.textContent = text;
                    return li;
                }));
            }
            if (action) {
                action.dataset.serviceName = service.name;
                action.dataset.whatsappMessage = `Olá! Vi o serviço de ${service.name} no site e gostaria de saber mais informações e verificar disponibilidade.`;
            }
            openDialog(serviceModal, trigger);
        });
    }

    function initWhatsApp() {
        document.addEventListener('click', event => {
            const link = event.target.closest('[data-whatsapp-link]');
            if (!link) return;
            event.preventDefault();

            const service = link.dataset.serviceName;
            const packageName = link.dataset.packageName;
            let message = link.dataset.whatsappMessage || 'Olá! Conheci o site e gostaria de receber mais informações.';
            if (service) message = `Olá! Vi o serviço de ${service} no site e gostaria de saber mais informações e verificar disponibilidade.`;
            if (packageName) message = `Olá! Vi o Pacote ${packageName} no site e gostaria de saber mais informações e consultar disponibilidade.`;

            showFeedback('Abrindo uma conversa no WhatsApp…', 'success', 2200);
            const opened = window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
            if (!opened) window.location.href = whatsappUrl(message);
        });
    }

    function initGallery() {
        const lightbox = $('[data-lightbox]');
        const triggers = $$('[data-lightbox-open]');
        if (!lightbox || !triggers.length) return;

        const items = triggers.map(trigger => {
            const figure = trigger.closest('figure');
            const image = $('img', trigger);
            const caption = $('.space-gallery__caption', figure || trigger);
            return { src: image?.src || '', alt: image?.alt || '', caption: caption?.textContent?.trim() || 'Galeria' };
        });

        const image = $('[data-lightbox-image]', lightbox);
        const title = $('[data-lightbox-title]', lightbox);
        const caption = $('[data-lightbox-caption]', lightbox);
        const current = $('[data-lightbox-current]', lightbox);
        const total = $('[data-lightbox-total]', lightbox);
        if (total) total.textContent = String(items.length);

        const render = index => {
            state.galleryIndex = (index + items.length) % items.length;
            const item = items[state.galleryIndex];
            if (image) { image.src = item.src; image.alt = item.alt; }
            if (title) title.textContent = item.caption;
            if (caption) caption.textContent = item.caption;
            if (current) current.textContent = String(state.galleryIndex + 1);
        };

        triggers.forEach((trigger, index) => trigger.addEventListener('click', () => {
            render(index);
            openDialog(lightbox, trigger);
        }));
        $('[data-lightbox-previous]', lightbox)?.addEventListener('click', () => render(state.galleryIndex - 1));
        $('[data-lightbox-next]', lightbox)?.addEventListener('click', () => render(state.galleryIndex + 1));
        lightbox.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft') render(state.galleryIndex - 1);
            if (event.key === 'ArrowRight') render(state.galleryIndex + 1);
        });
        lightbox.addEventListener('touchstart', event => {
            state.touchStartX = event.changedTouches[0]?.clientX || 0;
        }, { passive: true });
        lightbox.addEventListener('touchend', event => {
            const endX = event.changedTouches[0]?.clientX || 0;
            const distance = endX - state.touchStartX;
            if (Math.abs(distance) < 45) return;
            render(state.galleryIndex + (distance < 0 ? 1 : -1));
        }, { passive: true });
    }

    function getZonedNow(timezone) {
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
        }).formatToParts(new Date());
        const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
        const weekdayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
        return { day: weekdayMap[values.weekday], minutes: Number(values.hour) * 60 + Number(values.minute) };
    }

    const toMinutes = value => {
        const [hours, minutes] = value.split(':').map(Number);
        return hours * 60 + minutes;
    };

    function initBusinessHours() {
        const status = $('[data-business-status]');
        if (!status) return;
        const label = $('[data-business-status-label]', status);
        const detail = $('[data-business-status-detail]', status);
        try {
            const now = getZonedNow(CONFIG.timezone);
            const periods = CONFIG.hours[now.day] || [];
            const active = periods.find(period => now.minutes >= toMinutes(period.open) && now.minutes < toMinutes(period.close));
            const upcoming = periods.find(period => now.minutes < toMinutes(period.open));
            status.classList.toggle('is-open', Boolean(active));
            status.classList.toggle('is-closed', !active);
            if (label) label.textContent = active ? 'ABERTO AGORA' : 'FECHADO AGORA';
            if (detail) {
                if (active) detail.textContent = `Atendimento demonstrativo até ${active.close}.`;
                else if (upcoming) detail.textContent = `Atendimento demonstrativo a partir das ${upcoming.open}.`;
                else detail.textContent = 'Consulte o próximo horário pelo WhatsApp.';
            }
            $$('[data-weekday]').forEach(row => row.classList.toggle('is-today', Number(row.dataset.weekday) === now.day));
        } catch (error) {
            if (label) label.textContent = 'Consulte a disponibilidade';
            if (detail) detail.textContent = 'Confirme o horário pelo WhatsApp.';
        }
    }

    function initForm() {
        const form = $('[data-whatsapp-form]');
        if (!form) return;

        const clearError = field => {
            field.removeAttribute('aria-invalid');
            field.closest('.form-field')?.classList.remove('is-error');
            const error = $(`[data-error-for="${field.name}"]`, form);
            if (error) error.textContent = '';
        };
        const setError = (field, message) => {
            field.setAttribute('aria-invalid', 'true');
            field.closest('.form-field')?.classList.add('is-error');
            const error = $(`[data-error-for="${field.name}"]`, form);
            if (error) error.textContent = message;
        };

        form.addEventListener('input', event => {
            if (event.target.matches('input, select, textarea')) clearError(event.target);
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            const name = form.elements.name;
            const vehicle = form.elements.vehicle;
            const service = form.elements.service;
            const message = form.elements.message;
            [name, vehicle, service].forEach(clearError);
            let firstInvalid = null;
            if (!name.value.trim()) { setError(name, 'Informe seu nome.'); firstInvalid ||= name; }
            if (!vehicle.value.trim()) { setError(vehicle, 'Informe o veículo.'); firstInvalid ||= vehicle; }
            if (!service.value) { setError(service, 'Selecione um serviço.'); firstInvalid ||= service; }
            if (firstInvalid) {
                firstInvalid.focus();
                showFeedback('Revise os campos destacados antes de continuar.', 'error');
                return;
            }

            const text = [
                `Olá! Meu nome é ${name.value.trim()}.`,
                `Veículo: ${vehicle.value.trim()}.`,
                `Serviço de interesse: ${service.value}.`,
                message.value.trim() ? `Informações adicionais: ${message.value.trim()}` : '',
                'Gostaria de receber mais informações e consultar a disponibilidade.'
            ].filter(Boolean).join('\n');
            showFeedback('Informações organizadas. Abrindo o WhatsApp…', 'success');
            const opened = window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
            if (!opened) window.location.href = whatsappUrl(text);
        });
    }

    function initImageFallbacks() {
        document.addEventListener('error', event => {
            const image = event.target;
            if (!(image instanceof HTMLImageElement) || image.dataset.errorHandled) return;
            image.dataset.errorHandled = 'true';
            image.closest('figure, .service-card__media, .before-after__image, .final-cta__media')?.classList.add('is-error');
            image.alt = image.alt || 'Imagem demonstrativa indisponível';
        }, true);
    }

    function initFeedbackClose() {
        $('[data-feedback-close]')?.addEventListener('click', () => {
            const toast = $('[data-feedback-message]');
            if (toast) toast.hidden = true;
            window.clearTimeout(state.toastTimer);
        });
    }

    function init() {
        initConfiguration();
        initHeader();
        initMobileMenu();
        initNavigation();
        initScrollReveal();
        initComparisons();
        initModals();
        initWhatsApp();
        initGallery();
        initBusinessHours();
        initForm();
        initImageFallbacks();
        initFeedbackClose();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
