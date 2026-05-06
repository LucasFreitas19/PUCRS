// =========================================
// SCRIPT ESPECÍFICO DA LANDING PAGE
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Função para Animação no Scroll (Reveal)
    function reveal() {
        const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            
            // Ponto de gatilho para a animação (100px antes do elemento aparecer totalmente)
            const elementVisible = 100; 
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    
    // Adiciona o evento de scroll
    window.addEventListener("scroll", reveal);
    
    // Dispara a função uma vez assim que a página carrega para os elementos do topo
    reveal();

    // 2. Rolagem suave para os links âncora (Links do Menu e Botões)
    const linksInternos = document.querySelectorAll('a[href^="#"]');
    
    linksInternos.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const destinoID = this.getAttribute('href');
            
            // Verifica se é apenas "#" (para evitar erros)
            if (destinoID === "#") return;
            
            const destinoElement = document.querySelector(destinoID);
            
            if (destinoElement) {
                // Rola suavemente até a seção
                window.scrollTo({
                    top: destinoElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

});
