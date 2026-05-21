document.addEventListener("DOMContentLoaded", function() {
    
    // Função para atualizar o texto do carrossel
    function updateDescription(swiperInstance) {
        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        const text = activeSlide.getAttribute('data-description');
        const descContainer = document.querySelector('.carousel-description');

        if (text && text.trim() !== "") {
            descContainer.innerHTML = `<p>${text}</p>`;
            descContainer.style.opacity = '1';
        } else {
            descContainer.innerHTML = "";
            descContainer.style.opacity = '0';
        }
    }

    // Inicialização do Swiper
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        speed: 800,
        spaceBetween: 30,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        keyboard: {
            enabled: true,
        },
        // Eventos para trocar o texto quando o slide mudar
        on: {
            init: function () {
                updateDescription(this);
            },
            slideChange: function () {
                updateDescription(this);
            }
        }
    });

    // Funcionalidade de Share
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert("Link copiado para a área de transferência!");
            }).catch(err => {
                console.error("Erro ao copiar link: ", err);
            });
        });
    });
});