// --- 1. Lógica de Login Fake ---
function fazerLogin() {
    const userNameInput = document.getElementById('login-user').value;
    const nomeUsuario = userNameInput.trim() !== "" ? userNameInput : "Leitor Oculto";
    
    // Atualiza os nomes na interface
    document.getElementById('display-username').innerText = nomeUsuario;
    document.getElementById('perfil-nome').innerText = nomeUsuario;

    // Transição de Views
    document.getElementById('login-view').classList.remove('active');
    document.getElementById('app-view').classList.add('active');
}

// --- 2. Lógica de Abas (Navegação Interna) ---
function mudarAba(idAba, elementoClicado) {
    // Esconde todas as abas
    const abas = document.querySelectorAll('.tab-content');
    abas.forEach(aba => aba.classList.remove('active'));

    // Remove o estilo ativo dos links no header
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        link.classList.remove('nav-link-custom');
        link.style.backgroundColor = 'transparent';
        link.style.color = 'var(--cor-escura)';
    });

    // Mostra a aba desejada
    document.getElementById(idAba).classList.add('active');
    
    // Configura o visual da aba clicada
    if(elementoClicado && elementoClicado.classList.contains('nav-link')) {
        elementoClicado.classList.add('active');
        elementoClicado.classList.add('nav-link-custom');
    }

    // Se estiver no mobile, fecha a sidebar ao clicar nas abas
    if (window.innerWidth <= 768) { 
        toggleSidebar(false); 
    }
}

// --- 3. Lógica do Mobile (Sidebar Toggle) ---
function toggleSidebar(forceClose = false) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');
    
    if (forceClose || sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
    } else {
        sidebar.classList.add('show');
        overlay.classList.add('show');
    }
}

// --- 4. Exibir Audio-book ---
function toggleAudio() {
    const container = document.getElementById('audio-container');
    container.classList.toggle('d-none');
}

// --- 5. Lógica da Newsletter Dinâmica ---
function carregarMateria(titulo, imagem) {
    document.getElementById('modal-blog-titulo').innerText = titulo;
    
    const imgElement = document.getElementById('modal-blog-img');
    imgElement.src = imagem;
    imgElement.onerror = function() {
        this.src = 'https://via.placeholder.com/800x400?text=' + encodeURI(titulo);
    };
}
// --- 6. Lógica de Favoritar Livro ---
function favoritar(botao) {
    const icone = botao.querySelector('i');
    
    // Alterna entre o coração vazio (far) e o cheio (fas)
    if (icone.classList.contains('far')) {
        icone.classList.remove('far');
        icone.classList.add('fas');
        // Efeito de pulo (opcional)
        icone.style.transform = "scale(1.2)";
        setTimeout(() => icone.style.transform = "scale(1)", 200);
    } else {
        icone.classList.remove('fas');
        icone.classList.add('far');
    }
}

// --- 7. Lógica de Classificação (Estrelas) ---
const notasMockadas = {
    1: { mediaBase: 4.8, totalVotos: 4 },
    2: { mediaBase: 2.9, totalVotos: 2 }
};

function avaliarLivro(livroId, notaUsuario) {
    // 1. Pinta as estrelas
    const container = document.getElementById(`stars-${livroId}`);
    if (!container) return; // Trava de segurança
    
    const estrelas = container.querySelectorAll('.fa-star');
    estrelas.forEach((estrela, index) => {
        if (index < notaUsuario) {
            estrela.classList.remove('far');
            estrela.classList.add('fas');
        } else {
            estrela.classList.remove('fas');
            estrela.classList.add('far');
        }
    });

    // 2. Calcula a nova média mockada
    const dados = notasMockadas[livroId];
    const novaMedia = ((dados.mediaBase * dados.totalVotos) + notaUsuario) / (dados.totalVotos + 1);
    
    // 3. Atualiza o badge na tela com animação rápida
    const badge = document.getElementById(`badge-nota-${livroId}`);
    if (badge) { // Trava de segurança
        badge.innerHTML = `<i class="fas fa-star"></i> ${novaMedia.toFixed(1)}`; 
        
        // Efeito visual de sucesso (Fica verde rapidamente)
        badge.classList.remove('bg-warning', 'text-dark');
        badge.classList.add('bg-success', 'text-white');
        
        setTimeout(() => {
            badge.classList.remove('bg-success', 'text-white');
            badge.classList.add('bg-warning', 'text-dark');
        }, 1000);
    }
}
// --- 8. Lógica de Favoritar e Enviar para "Minha Coleção" ---
function toggleFavorito(livroId) {
    const coracao = document.getElementById(`coracao-${livroId}`);
    const gridFavoritos = document.getElementById('grid-favoritos');
    const msgVazio = document.getElementById('msg-sem-favoritos');
    const cardOriginal = document.getElementById(`col-livro-${livroId}`);

    // Se o coração estiver vazio (far), vamos favoritar
    if (coracao.classList.contains('far')) {
        coracao.classList.remove('far');
        coracao.classList.add('fas');
        
        // Efeito visual de pulsar
        coracao.style.transform = "scale(1.3)";
        setTimeout(() => coracao.style.transform = "scale(1)", 200);

        // Clona o card inteiro
        const clone = cardOriginal.cloneNode(true);
        clone.id = `clone-livro-${livroId}`; // Muda o ID para não dar conflito
        
        // Configura o botão de favoritar DENTRO do clone para remover ele mesmo se clicado
        const btnClone = clone.querySelector('.text-danger');
        btnClone.onclick = () => toggleFavorito(livroId);

        // Adiciona na aba "Minha Coleção" e esconde a mensagem de vazio
        gridFavoritos.appendChild(clone);
        msgVazio.style.display = 'none';

    } else {
        // Se já for favorito, vamos desfavoritar
        coracao.classList.remove('fas');
        coracao.classList.add('far');

        // Procura a fotocópia na aba de favoritos e deleta
        const cloneRemover = document.getElementById(`clone-livro-${livroId}`);
        if (cloneRemover) {
            cloneRemover.remove();
        }

        // Se a aba de favoritos ficar vazia de novo, mostra a mensagem
        if (gridFavoritos.children.length === 0) {
            msgVazio.style.display = 'block';
        }
    }
}

// --- 9. Lógica de Publicar Comentário ---
function publicarComentario() {
    const textarea = document.getElementById('texto-novo-comentario');
    const texto = textarea.value.trim(); // Pega o texto e remove espaços em branco extras

    if (texto === "") return; // Se estiver vazio, não faz nada

    // Pega o nome do usuário que fez o login
    const nomeUsuario = document.getElementById('display-username').innerText;
    const areaComentarios = document.getElementById('area-comentarios');

    // Cria a estrutura HTML do novo comentário (repare na borda esquerda colorida para destacar)
    const htmlComentario = `
        <div class="d-flex gap-3 mb-4" style="animation: fadeIn 0.4s;">
            <img src="https://placehold.co/40x40" class="rounded-circle" width="40" height="40" alt="Avatar">
            <div class="bg-white p-3 rounded shadow-sm w-100 border-start border-4 border-principal">
                <h6 class="mb-1 fw-bold text-principal">${nomeUsuario}</h6>
                <p class="mb-0 text-escura">${texto}</p>
                <small class="text-muted mt-2 d-block">Agora mesmo</small>
            </div>
        </div>
    `;

    // Injeta o novo comentário no TOPO da lista (afterbegin)
    areaComentarios.insertAdjacentHTML('afterbegin', htmlComentario);

    // Limpa a caixa de texto
    textarea.value = "";
}